import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rindow.github.io',
  output: 'static',
  build: { format: 'file' },
  integrations: [sitemap()],
});
