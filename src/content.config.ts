import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const articleCollection = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
    schema: z.object({
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

export const collections = {
    'articles': articleCollection,
};


