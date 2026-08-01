import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  // Pages carrying a schematic screen are .mdx so they can render the one
  // shared component instead of an inlined copy of its SVG.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    appliesTo: z.string(),
    lastReviewed: z.string(),
  }),
});

export const collections = { docs };
