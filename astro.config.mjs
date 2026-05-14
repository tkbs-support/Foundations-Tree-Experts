import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://foundationstreeexperts.com',
  integrations: [
    react(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: false,
  },
});
