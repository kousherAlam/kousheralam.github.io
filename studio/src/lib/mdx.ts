import matter from 'gray-matter';
import { toDateString, type Frontmatter, type Post } from './types';

export type { Frontmatter, Post } from './types';
export { serializePost, slugify } from './types';

/** Parse a raw .mdx file into structured frontmatter + body. (Server-only: uses gray-matter.) */
export function parsePost(raw: string, id = ''): Post {
  const { data, content } = matter(raw);
  const fm: Frontmatter = {
    title: String(data.title ?? 'Untitled'),
    description: data.description ? String(data.description) : undefined,
    published: toDateString(data.published),
    thumbnail: {
      src: String(data.thumbnail?.src ?? ''),
      alt: String(data.thumbnail?.alt ?? ''),
    },
    draft: data.draft === undefined ? true : Boolean(data.draft),
    type: data.type === 'Project' ? 'Project' : 'Article',
  };
  return { id, frontmatter: fm, body: content.replace(/^\n+/, '') };
}
