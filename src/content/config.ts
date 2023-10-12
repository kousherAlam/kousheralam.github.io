// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// 2. Define your collection(s)
const articleCollection = defineCollection({
    type: 'content',
    schema: z.object({
        layout: z.string(),
        title: z.string(),
        description: z.string().optional(),
        published: z.date(),
        thumbnail: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        draft: z.boolean(),
        type: z.enum(["Project", "Article"]).default("Article"),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
    'articles': articleCollection,
};


