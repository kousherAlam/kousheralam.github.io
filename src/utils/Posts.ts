import type { CollectionEntry } from 'astro:content';


export const sortByDate = (posts: any[]) => {
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.pubDate).valueOf() -
      new Date(a.frontmatter.pubDate).valueOf()
  );
};


export const fileterPublishedConent = ({ data }: CollectionEntry<"articles">) => {
  if (import.meta.env.DEV) {
    return true;
  }
  return data.draft !== true;
};

