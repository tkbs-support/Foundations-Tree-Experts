import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    headline: z.string(),
    description: z.string(),
    tag: z.string(),
    icon: z.string(),
    featureImage: z.string().optional(),
    featureAlt: z.string().optional(),
    featurePosition: z.string().optional(),
    relatedServices: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })),
    process: z.array(z.object({
      step: z.string(),
      text: z.string(),
    })),
  }),
});

const cities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cities' }),
  schema: z.object({
    name: z.string(),
    county: z.string(),
    description: z.string(),
    zipCodes: z.array(z.string()),
    draft: z.boolean().optional(),
    cityImage: z.string().optional(),
    cityImageAlt: z.string().optional(),
    cityImageAttribution: z.string().optional(),
    nearbyAreas: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).optional(),
  }),
});

export const collections = { services, cities };
