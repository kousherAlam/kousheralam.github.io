import type { APIRoute } from 'astro';
import { requireSession } from '@/lib/auth';
import { savePost } from '@/lib/github';
import { slugify, type Frontmatter } from '@/lib/types';

export const prerender = false;

interface PublishBody {
  id?: string;
  slug?: string;
  frontmatter: Frontmatter;
  body: string;
  publish: boolean;
}

function validate(fm: any): string | null {
  if (!fm || typeof fm !== 'object') return 'Missing frontmatter';
  if (!fm.title || typeof fm.title !== 'string') return 'Title is required';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fm.published ?? '')) return 'published must be YYYY-MM-DD';
  if (!fm.thumbnail?.src) return 'Thumbnail source is required';
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

  try {
    const result = await savePost({
      id,
      frontmatter: {
        ...payload.frontmatter,
        draft: payload.publish ? false : Boolean(payload.frontmatter.draft),
      },
      body: payload.body ?? '',
      publish: payload.publish,
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
