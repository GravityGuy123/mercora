import fs from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
let xml = fs.readFileSync(sitemapPath, 'utf8');
const now = new Date().toISOString();

xml = xml.replace(
  /<sitemap>\s*<loc>(.*?)<\/loc>\s*<\/sitemap>/g,
  `<sitemap>\n  <loc>$1</loc>\n  <lastmod>${now}</lastmod>\n</sitemap>`
);

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log('✅ sitemap.xml index updated with <lastmod>');