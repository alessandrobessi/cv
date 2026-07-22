import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { renderResume } from '../src/template.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = path.join(ROOT, 'content', 'resume.yaml');
const DIST_DIR = path.join(ROOT, 'dist');
const STYLE_SRC = path.join(ROOT, 'src', 'style.css');

const data = parse(fs.readFileSync(DATA_FILE, 'utf8'));
const html = renderResume(data);

fs.mkdirSync(DIST_DIR, { recursive: true });
fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html, 'utf8');
fs.copyFileSync(STYLE_SRC, path.join(DIST_DIR, 'style.css'));

console.log('Built dist/index.html and copied dist/style.css');
