import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://rindow.github.io',
  output: 'static',
  build: { format: 'file' },
  markdown: { remarkPlugins: [remarkMath, remarkToc], rehypePlugins: [rehypeKatex] },
  integrations: [sitemap()],
});
