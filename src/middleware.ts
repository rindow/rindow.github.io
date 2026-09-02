import { defineMiddleware } from 'astro:middleware';

// `build.format: 'file'` publishes legacy URLs such as /foo/bar.html.
// Astro's dev server internally registers the matching dynamic page as
// /foo/bar, so rewrite only during development to make public URLs testable.
export const onRequest = defineMiddleware((context, next) => {
  if (import.meta.env.DEV && context.url.pathname.endsWith('.html')) {
    const url = new URL(context.url);
    url.pathname = url.pathname.slice(0, -'.html'.length);
    return context.rewrite(url);
  }
  return next();
});
