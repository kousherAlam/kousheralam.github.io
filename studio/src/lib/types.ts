// Client-safe types and pure helpers (no Node-only dependencies).
// Safe to import from React islands.

export interface Frontmatter {
  title: string;
  description?: string;
  published: string; // YYYY-MM-DD
  thumbnail: { src: string; alt: string };
  draft: boolean;
  type: 'Article' | 'Project';
}

export interface Post {
  /** Content id / slug relative to the content dir, e.g. "rpc_and_grpc" or "security/pki". */
  id: string;
  /** Repo-relative path, e.g. "src/content/articles/rpc_and_grpc.mdx". */
  path?: string;
  frontmatter: Frontmatter;
  body: string;
}

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function toDateString(value: unknown): string {
  if (value instanceof Date && !isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string') {
    const d = new Date(value);
    if (!isNaN(d.valueOf())) return d.toISOString().slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
}

/** Quote a YAML scalar only when needed (keeps output close to hand-written files). */
export function yamlString(value: string): string {
  if (value === '') return '""';
  const needsQuote =
    /[:#\-?*&!|>'"%@`{}\[\],]/.test(value) ||
    /^\s|\s$/.test(value) ||
    /^(true|false|null|yes|no|on|off)$/i.test(value) ||
    DATE_RE.test(value) ||
    !isNaN(Number(value));
  if (!needsQuote) return value;
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/** Serialize structured frontmatter + body back into a clean .mdx string. */
export function serializePost(fm: Frontmatter, body: string): string {
  const lines: string[] = ['---'];
  lines.push(`title: ${yamlString(fm.title)}`);
  if (fm.description) lines.push(`description: ${yamlString(fm.description)}`);
  lines.push(`published: ${fm.published}`); // bare date -> zod z.date() coerces it
  lines.push('thumbnail:');
  lines.push(`  src: ${yamlString(fm.thumbnail.src)}`);
  lines.push(`  alt: ${yamlString(fm.thumbnail.alt)}`);
  lines.push(`draft: ${fm.draft}`);
  lines.push(`type: ${fm.type}`);
  lines.push('---');
  lines.push('');
  lines.push(body.trimStart());
  lines.push('');
  return lines.join('\n');
}

/** Normalize a user-provided title/slug into a safe content id. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
