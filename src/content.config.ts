import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const idFromFilename = ({ entry }: { entry: string }) => entry.replace(/\.(?:md|markdown)$/, '');
const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs', generateId: idFromFilename }),
  schema: z.object({
    title: z.string().optional(),
    meta_description: z.string().optional(),
    math: z.union([z.string(), z.boolean()]).optional(),
    previous_section: z.string().optional(),
    next_section: z.string().optional(),
    upper_section: z.string().optional(),
    grand_upper_section: z.string().optional(),
  }).passthrough(),
});
const pages = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/pages', generateId: idFromFilename }) });
const posts = defineCollection({ loader: glob({ pattern: ['**/*.md', '**/*.markdown'], base: './src/content/posts', generateId: idFromFilename }) });

export const collections = { docs, pages, posts };
