import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'blog');
const dataDir = path.join(root, 'src', 'data');
const publicDir = path.join(root, 'src', 'public');
const siteFile = path.join(dataDir, 'site.json');

const site = JSON.parse(fs.readFileSync(siteFile, 'utf-8'));
const baseUrl = (site.site?.baseUrl || 'https://waltxao.github.io/personal-homepage').replace(/\/+$/, '');

function readTitle(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/<title>(.*?)<\/title>/i);
  return match ? match[1].replace(/\s*\|.*/, '').trim() : path.basename(filePath, '.html');
}

function readDate(filePath) {
  const fileMatch = path.basename(filePath, '.html').match(/(\d{4}-\d{2}-\d{2})/);
  if (fileMatch) return fileMatch[1];
  const content = fs.readFileSync(filePath, 'utf-8');
  const emojiMatch = content.match(/📅\s*(\d{4}-\d{2}-\d{2})/);
  return emojiMatch ? emojiMatch[1] : '';
}

function classify(title, file) {
  const text = `${title} ${file}`;
  if (/财经|盘后|简报/.test(text)) return '财经分析';
  if (/工具|Markdown|DevTools|Skill|Tavily|OpenClaw|效率|指南/.test(text)) return '工具技巧';
  return 'AI大模型';
}

function summary(title) {
  return `围绕「${title}」整理的深度解读，适合快速了解核心观点与应用价值。`;
}

const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html')).sort((a, b) => {
  const dateA = readDate(path.join(blogDir, a));
  const dateB = readDate(path.join(blogDir, b));
  return dateB.localeCompare(dateA);
});

const blog = files.map(file => {
  const filePath = path.join(blogDir, file);
  const title = readTitle(filePath);
  return {
    title,
    file,
    category: classify(title, file),
    date: readDate(filePath),
    summary: summary(title)
  };
});

fs.writeFileSync(path.join(dataDir, 'blog.json'), JSON.stringify(blog, null, 2) + '\n');

const urls = [
  `${baseUrl}/`,
  `${baseUrl}/blog.html`,
  ...blog.map(post => `${baseUrl}/blog/${encodeURI(post.file)}`)
];

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`);
