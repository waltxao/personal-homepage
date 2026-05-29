import fs from 'node:fs';
import path from 'node:path';

const source = path.resolve('src', 'blog');
const target = path.resolve('dist', 'blog');

fs.cpSync(source, target, { recursive: true, force: true });
