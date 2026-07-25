import React, { useMemo, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import MdxPreview from './MdxPreview';
import { slugify, type Frontmatter, type Post } from '@/lib/types';

interface Props {
  initialPost: Post;
  isNew: boolean;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'saving' }
  | { kind: 'ok'; message: string; url?: string }
  | { kind: 'error'; message: string };

const field = 'w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-orange-500';
const label = 'mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400';

export default function Editor({ initialPost, isNew }: Props) {
  const fm = initialPost.frontmatter;
  const [title, setTitle] = useState(fm.title);
  const [description, setDescription] = useState(fm.description ?? '');
  const [published, setPublished] = useState(fm.published);
  const [thumbSrc, setThumbSrc] = useState(fm.thumbnail.src);
  const [thumbAlt, setThumbAlt] = useState(fm.thumbnail.alt);
  const [type, setType] = useState<Frontmatter['type']>(fm.type);
  const [draft, setDraft] = useState(fm.draft);
  const [slug, setSlug] = useState(initialPost.id || '');
  const [body, setBody] = useState(initialPost.body);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const effectiveSlug = (isNew ? slug || slugify(title) : initialPost.id) || slugify(title);

  const frontmatter: Frontmatter = useMemo(
    () => ({
      title,
      description: description || undefined,
      published,
      thumbnail: { src: thumbSrc, alt: thumbAlt },
      draft,
      type,
    }),
    [title, description, published, thumbSrc, thumbAlt, draft, type],
  );

  async function save(publish: boolean) {
    setStatus({ kind: 'saving' });
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id: isNew ? '' : initialPost.id,
          slug: effectiveSlug,
          frontmatter,
          body,
          publish,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: 'error', message: data.error ?? `Request failed (${res.status})` });
        return;
      }
      setStatus({
        kind: 'ok',
        message: publish
          ? data.versioned
            ? 'Published — version bump + deploy triggered.'
            : 'Published.'
          : 'Draft saved.',
        url: data.commitUrl,
      });
      // For a brand-new post, move to its edit URL so subsequent saves update it.
      if (isNew && data.id) {
        window.history.replaceState(null, '', `/edit/${data.id}`);
      }
    } catch (err: any) {
      setStatus({ kind: 'error', message: err?.message ?? 'Network error' });
    }
  }

  const busy = status.kind === 'saving';

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3">
        <div className="min-w-0 text-sm text-slate-400">
          <span className="font-mono text-slate-300">{effectiveSlug || 'new-post'}</span>
          <span className="mx-2 text-slate-600">·</span>
          {draft ? (
            <span className="text-amber-400">draft</span>
          ) : (
            <span className="text-emerald-400">published</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {status.kind === 'ok' && (
            <span className="text-sm text-emerald-400">
              {status.message}{' '}
              {status.url && (
                <a href={status.url} target="_blank" rel="noreferrer" className="underline">
                  commit ↗
                </a>
              )}
            </span>
          )}
          {status.kind === 'error' && (
            <span className="max-w-md truncate text-sm text-red-400" title={status.message}>
              {status.message}
            </span>
          )}
          <button
            onClick={() => save(false)}
            disabled={busy}
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:border-slate-500 disabled:opacity-50"
          >
            {busy ? 'Saving…' : 'Save draft'}
          </button>
          <button
            onClick={() => save(true)}
            disabled={busy || !title}
            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-orange-400 disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>

      {/* Two-pane: form + editor | preview */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Left: metadata + source */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 rounded-lg border border-slate-800 bg-slate-950/40 p-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={label}>Title</label>
              <input className={field} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Description</label>
              <input className={field} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional summary" />
            </div>
            <div>
              <label className={label}>Slug</label>
              <input
                className={field}
                value={isNew ? slug : initialPost.id}
                onChange={(e) => setSlug(slugify(e.target.value))}
                disabled={!isNew}
                placeholder={slugify(title) || 'my-post'}
              />
            </div>
            <div>
              <label className={label}>Published</label>
              <input className={field} type="date" value={published} onChange={(e) => setPublished(e.target.value)} />
            </div>
            <div>
              <label className={label}>Type</label>
              <select className={field} value={type} onChange={(e) => setType(e.target.value as Frontmatter['type'])}>
                <option value="Article">Article</option>
                <option value="Project">Project</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={draft} onChange={(e) => setDraft(e.target.checked)} className="h-4 w-4" />
                Draft (hidden on site)
              </label>
            </div>
            <div>
              <label className={label}>Thumbnail src</label>
              <input className={field} value={thumbSrc} onChange={(e) => setThumbSrc(e.target.value)} placeholder="/assets/blog/…" />
            </div>
            <div>
              <label className={label}>Thumbnail alt</label>
              <input className={field} value={thumbAlt} onChange={(e) => setThumbAlt(e.target.value)} placeholder="Alt text" />
            </div>
          </div>

          <div className="h-[60vh] overflow-hidden rounded-lg border border-slate-800">
            <CodeMirror
              value={body}
              theme="dark"
              height="100%"
              style={{ height: '100%' }}
              extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
              onChange={(v) => setBody(v)}
            />
          </div>
        </div>

        {/* Right: live preview */}
        <div className="h-[calc(60vh+220px)] overflow-hidden rounded-lg border border-slate-800">
          <MdxPreview body={body} frontmatter={frontmatter} />
        </div>
      </div>
    </div>
  );
}
