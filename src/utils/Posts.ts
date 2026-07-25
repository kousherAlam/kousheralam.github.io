import type { CollectionEntry } from 'astro:content';


export const sortByDate = (posts: CollectionEntry<"articles">[]) => {
  return posts.sort(
    (a, b) =>
      new Date(b.data.published).valueOf() -
      new Date(a.data.published).valueOf()
  );
};


export const fileterPublishedConent = ({ data }: CollectionEntry<"articles">) => {
  if (import.meta.env.DEV) {
    return true;
  }
  return data.draft !== true;
};

