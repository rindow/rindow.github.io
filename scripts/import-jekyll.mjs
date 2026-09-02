/* One-time importer. Run from new/: npm run import:jekyll */
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const old = join(root, '..', 'old');
const target = join(root, 'src', 'content');
const collections = ['neuralnetworks', 'mathematics', 'framework'];
const markdown = new Set(['.md', '.markdown']);

async function walk(directory) {
  const items = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(items.map(async (item) => {
    const file = join(directory, item.name);
    return item.isDirectory() ? walk(file) : [file];
  }))).flat();
}

function absoluteLegacyAsset(url, directory) {
  if (!/\.(?:png|jpe?g|gif|svg|webp|ico)(?:[?#].*)?$/i.test(url) || /^(?:https?:|\/|#|data:)/i.test(url)) return url;
  const suffix = url.match(/[?#].*$/)?.[0] || '';
  return `${posix.resolve(directory, url.slice(0, url.length - suffix.length))}${suffix}`;
}

async function copyMarkdown(source, destination, legacyDirectory = '') {
  await mkdir(dirname(destination), { recursive: true });
  let body = await readFile(source, 'utf8');
  if (legacyDirectory) {
    body = body.replace(/(!\[[^\]]*\]\()([^\s)]+)([^)]*\))/g, (_, start, url, end) => `${start}${absoluteLegacyAsset(url, legacyDirectory)}${end}`);
    body = body.replace(/(\bsrc=["'])([^"']+)(["'])/gi, (_, start, url, end) => `${start}${absoluteLegacyAsset(url, legacyDirectory)}${end}`);
  }
  await writeFile(destination, body);
}

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
for (const collection of collections) {
  const source = join(old, `_${collection}`);
  for (const file of await walk(source)) {
    const rel = relative(source, file);
    const relUrl = rel.replaceAll('\\', '/');
    if (markdown.has(extname(file).toLowerCase())) {
      await copyMarkdown(file, join(target, 'docs', collection, rel), `/${collection}/${posix.dirname(relUrl).replace(/^\.$/, '')}`);
    } else {
      // Keep a source-adjacent copy so Astro can resolve legacy relative images
      // embedded in Markdown, while the public copy preserves their old URL.
      const contentAsset = join(target, 'docs', collection, rel);
      await mkdir(dirname(contentAsset), { recursive: true });
      await cp(file, contentAsset);
    }
  }
}
for (const page of ['about.md']) await copyMarkdown(join(old, page), join(target, 'pages', page));
for (const file of await walk(join(old, '_posts'))) {
  if (markdown.has(extname(file).toLowerCase())) {
    const rel = relative(join(old, '_posts'), file).replace(/\.markdown$/i, '.md');
    await copyMarkdown(file, join(target, 'posts', rel));
  }
}

await rm(join(root, 'public', 'assets'), { recursive: true, force: true });
await cp(join(old, 'assets'), join(root, 'public', 'assets'), { recursive: true });
for (const collection of collections) {
  const source = join(old, `_${collection}`);
  const destination = join(root, 'public', collection);
  for (const file of await walk(source)) {
    if (!markdown.has(extname(file).toLowerCase())) {
      const output = join(destination, relative(source, file));
      await mkdir(dirname(output), { recursive: true });
      await cp(file, output);
    }
  }
}
const navigation = {};
for (const collection of collections) {
  navigation[collection] = YAML.parse(await readFile(join(old, '_data', 'widgets', 'navv', `${collection}.yml`), 'utf8')).menu;
}
await mkdir(join(root, 'src', 'data'), { recursive: true });
await writeFile(join(root, 'src', 'data', 'navigation.json'), JSON.stringify(navigation, null, 2));
console.log('Imported Jekyll content, navigation, and public assets.');
