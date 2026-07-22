import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(ROOT, 'dist');
const HTML_PATH = path.join(DIST_DIR, 'index.html');
const PDF_PATH = path.join(DIST_DIR, 'cv.pdf');

if (!fs.existsSync(HTML_PATH)) {
  console.error('dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(pathToFileURL(HTML_PATH).href, { waitUntil: 'load' });
await page.emulateMedia({ media: 'print' });

await page.pdf({
  path: PDF_PATH,
  printBackground: true,
  preferCSSPageSize: true,
});

await browser.close();
console.log('Generated dist/cv.pdf');
