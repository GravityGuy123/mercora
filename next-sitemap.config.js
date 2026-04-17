/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gravityconcepts.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: './public',
  changefreq: 'daily',
  priority: 0.7,
  autoLastmod: true, // <-- ensures <lastmod> is added automatically
  exclude: ['/404', '/_app', '/_document', '/_error'],
};