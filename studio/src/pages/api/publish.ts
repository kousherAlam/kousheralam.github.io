import type { APIRoute } from 'astro';
import { requireSession } from '@/lib/auth';
import { savePost, getPost } from '@/lib/github';
import { DEFAULT_THUMBNAIL_SRC, DEFAULT_THUMBNAIL_ALT } from '@/lib/config';
import { ensureComponentImports } from '@/lib/components';
import { slugify, type Frontmatter } from '@/lib/types';

export const prerender = false;

interface PublishBody {
  id?: string;
  slug?: string;
  frontmatter: Frontmatter;
  body: string;
}

function validate(fm: any): string | null {
  if (!fm || typeof fm !== 'object') return 'Missing frontmatter';
  if (!fm.title || typeof fm.title !== 'string') return 'Title is required';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fm.published ?? '')) return 'published must be YYYY-MM-DD';
  // thumbnail is defaulted below when omitted, so it is not required here.
  if (fm.type !== 'Article' && fm.type !== 'Project') return 'type must be Article or Project';
  return null;
}

export const POST: APIRoute = async (context) => {
  const session = await requireSession(context);
  if (session instanceof Response) return session;

  let payload: PublishBody;
  try {
    payload = (await context.request.json()) as PublishBody;
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const fmError = validate(payload.frontmatter);
  if (fmError) return json({ error: fmError }, 400);

  // Determine the content id: existing id, or derive from slug/title for new posts.
  const id =
    payload.id?.trim() ||
    slugify(payload.slug || payload.frontmatter.title);
  if (!id) return json({ error: 'Could not determine a slug for this post' }, 400);

  // Default the thumbnail when none was provided.
  const thumbnail = {
    src: payload.frontmatter.thumbnail?.src?.trim() || DEFAULT_THUMBNAIL_SRC,
    alt: payload.frontmatter.thumbnail?.alt?.trim() || DEFAULT_THUMBNAIL_ALT,
  };

  const isDraft = Boolean(payload.frontmatter.draft);
  const isPublished = !isDraft;

  // Was this post published on the live site before this save?
  let wasPublished = false;
  try {
    const existing = await getPost(id);
    if (existing) wasPublished = existing.frontmatter.draft === false;
  } catch {
    /* treat unknown/new as not previously published */
  }

  // Only bump the version when the change actually affects the published site:
  //   - editing a published post (published -> published)
  //   - draft -> publish
  //   - publish -> draft (unpublish)
  // NOT for a brand-new draft, or a draft -> draft edit.
  const versioned = wasPublished || isPublished;

  const title = payload.frontmatter.title;
  const message =
    isPublished && !wasPublished
      ? `Publish post: ${title}`
      : isPublished && wasPublished
        ? `Update post: ${title}`
        : !isPublished && wasPublished
          ? `Unpublish post: ${title}`
          : `Save draft: ${title}`;

  try {
    const result = await savePost({
      id,
      frontmatter: { ...payload.frontmatter, thumbnail, draft: isDraft },
      // Auto-add imports for any registered components used in the body so the
      // published post renders them on the site.
      body: ensureComponentImports(payload.body ?? ''),
      versioned,
      message,
    });
    return json({ ok: true, ...result });
  } catch (err: any) {
    return json({ error: err?.message ?? 'Failed to save post' }, 500);
  }
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
