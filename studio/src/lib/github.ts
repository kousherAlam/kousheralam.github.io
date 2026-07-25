import { Octokit } from 'octokit';
import { createAppAuth } from '@octokit/auth-app';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { config, appConfigured, localMode } from './config';
import { parsePost, serializePost, type Frontmatter, type Post } from './mdx';

// ---------------------------------------------------------------------------
// Octokit (GitHub App installation) — used in production.
// ---------------------------------------------------------------------------
let _octokit: Octokit | null = null;
function octokit(): Octokit {
  if (!appConfigured()) {
    throw new Error(
      'GitHub App is not configured. Set GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY and GITHUB_APP_INSTALLATION_ID.',
    );
  }
  if (_octokit) return _octokit;
  _octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: config.app.appId!,
      privateKey: config.app.privateKey!,
      installationId: config.app.installationId!,
    },
  });
  return _octokit;
}

const { owner, name: repo, branch, contentDir } = config.repo;

function idFromRepoPath(repoPath: string): string {
  const rel = repoPath.slice(contentDir.length + 1);
  return rel.replace(/\.mdx?$/, '');
}
function repoPathFromId(id: string): string {
  return `${contentDir}/${id}.mdx`;
}
/** Public site URL slug is the basename (the site uses flat ids). */
export function slugFromId(id: string): string {
  return id.split('/').pop() ?? id;
}

// ---------------------------------------------------------------------------
// Public API — branches between GitHub and local filesystem.
// ---------------------------------------------------------------------------

export async function listPosts(): Promise<Post[]> {
  const posts = localMode() ? await localListPosts() : await ghListPosts();
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.published).valueOf() -
      new Date(a.frontmatter.published).valueOf(),
  );
}

export async function getPost(id: string): Promise<Post | null> {
  return localMode() ? localGetPost(id) : ghGetPost(id);
}

export interface SaveOptions {
  id: string;
  frontmatter: Frontmatter;
  body: string;
  /** When true, also add a minor changeset so the release pipeline bumps + tags. */
  publish: boolean;
}

export interface SaveResult {
  id: string;
  path: string;
  commitUrl?: string;
  versioned: boolean;
}

export async function savePost(opts: SaveOptions): Promise<SaveResult> {
  return localMode() ? localSavePost(opts) : ghSavePost(opts);
}

// ---------------------------------------------------------------------------
// GitHub-backed implementation.
// ---------------------------------------------------------------------------

async function ghHeadSha(): Promise<string> {
  const ref = await octokit().rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
  return ref.data.object.sha;
}

async function ghListPostFiles(): Promise<string[]> {
  const headSha = await ghHeadSha();
  const commit = await octokit().rest.git.getCommit({ owner, repo, commit_sha: headSha });
  const tree = await octokit().rest.git.getTree({
    owner,
    repo,
    tree_sha: commit.data.tree.sha,
    recursive: 'true',
  });
  return tree.data.tree
    .filter((t) => t.type === 'blob' && t.path?.startsWith(`${contentDir}/`) && /\.mdx?$/.test(t.path))
    .map((t) => t.path!);
}

async function ghReadFile(repoPath: string): Promise<string> {
  const res = await octokit().rest.repos.getContent({ owner, repo, path: repoPath, ref: branch });
  const data = res.data as { content?: string; encoding?: string };
  if (!data.content) throw new Error(`No content for ${repoPath}`);
  return Buffer.from(data.content, (data.encoding as BufferEncoding) ?? 'base64').toString('utf8');
}

async function ghListPosts(): Promise<Post[]> {
  const files = await ghListPostFiles();
  return Promise.all(
    files.map(async (repoPath) => {
      const raw = await ghReadFile(repoPath);
      const post = parsePost(raw, idFromRepoPath(repoPath));
      post.path = repoPath;
      return post;
    }),
  );
}

async function ghGetPost(id: string): Promise<Post | null> {
  const repoPath = repoPathFromId(id);
  try {
    const raw = await ghReadFile(repoPath);
    const post = parsePost(raw, id);
    post.path = repoPath;
    return post;
  } catch (err: any) {
    if (err?.status === 404) return null;
    throw err;
  }
}

async function ghSavePost(opts: SaveOptions): Promise<SaveResult> {
  const kit = octokit();
  const repoPath = repoPathFromId(opts.id);
  const content = serializePost(opts.frontmatter, opts.body);

  // Build a single commit (blobs -> tree -> commit -> ref) so the MDX file and the
  // changeset land together atomically.
  const headSha = await ghHeadSha();
  const headCommit = await kit.rest.git.getCommit({ owner, repo, commit_sha: headSha });
  const baseTree = headCommit.data.tree.sha;

  const treeItems: {
    path: string;
    mode: '100644';
    type: 'blob';
    content: string;
  }[] = [{ path: repoPath, mode: '100644', type: 'blob', content }];

  let versioned = false;
  if (opts.publish) {
    const changesetPath = `.changeset/cms-${slugFromId(opts.id)}-${changesetStamp()}.md`;
    treeItems.push({
      path: changesetPath,
      mode: '100644',
      type: 'blob',
      content: changesetBody(opts.frontmatter.title),
    });
    versioned = true;
  }

  const newTree = await kit.rest.git.createTree({ owner, repo, base_tree: baseTree, tree: treeItems });
  const message = opts.publish
    ? `Publish post: ${opts.frontmatter.title}`
    : `Save draft: ${opts.frontmatter.title}`;
  const commit = await kit.rest.git.createCommit({
    owner,
    repo,
    message,
    tree: newTree.data.sha,
    parents: [headSha],
  });
  await kit.rest.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: commit.data.sha });

  return {
    id: opts.id,
    path: repoPath,
    commitUrl: commit.data.html_url,
    versioned,
  };
}

// ---------------------------------------------------------------------------
// Local filesystem implementation (dev only).
// ---------------------------------------------------------------------------

function localContentRoot(): string {
  // studio/ runs with cwd at the studio dir; content lives one level up.
  return path.resolve(process.cwd(), '..', contentDir);
}

async function localWalk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await localWalk(full)));
    else if (/\.mdx?$/.test(e.name)) out.push(full);
  }
  return out;
}

async function localListPosts(): Promise<Post[]> {
  const root = localContentRoot();
  const files = await localWalk(root);
  return Promise.all(
    files.map(async (full) => {
      const raw = await fs.readFile(full, 'utf8');
      const id = path.relative(root, full).replace(/\.mdx?$/, '').split(path.sep).join('/');
      const post = parsePost(raw, id);
      post.path = `${contentDir}/${id}.mdx`;
      return post;
    }),
  );
}

async function localGetPost(id: string): Promise<Post | null> {
  const full = path.join(localContentRoot(), `${id}.mdx`);
  try {
    const raw = await fs.readFile(full, 'utf8');
    const post = parsePost(raw, id);
    post.path = `${contentDir}/${id}.mdx`;
    return post;
  } catch {
    return null;
  }
}

async function localSavePost(opts: SaveOptions): Promise<SaveResult> {
  const full = path.join(localContentRoot(), `${opts.id}.mdx`);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, serializePost(opts.frontmatter, opts.body), 'utf8');
  let versioned = false;
  if (opts.publish) {
    const changesetDir = path.resolve(process.cwd(), '..', '.changeset');
    await fs.mkdir(changesetDir, { recursive: true });
    const file = path.join(changesetDir, `cms-${slugFromId(opts.id)}-${changesetStamp()}.md`);
    await fs.writeFile(file, changesetBody(opts.frontmatter.title), 'utf8');
    versioned = true;
  }
  return { id: opts.id, path: `${contentDir}/${opts.id}.mdx`, versioned };
}

// ---------------------------------------------------------------------------
// Shared helpers.
// ---------------------------------------------------------------------------

function changesetStamp(): string {
  // Date is fine here (not inside a Workflow script sandbox).
  return new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
}

function changesetBody(title: string): string {
  const safe = title.replace(/"/g, '\\"');
  return `---\n"kousheralam.github.io": minor\n---\n\nPublish post: ${safe}\n`;
}
