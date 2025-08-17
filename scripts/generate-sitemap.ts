import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSitemap = () => {
  const baseUrl = 'https://www.bay-leaf.eu';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/#about', priority: '0.8', changefreq: 'monthly' },
    { url: '/#menu', priority: '0.9', changefreq: 'weekly' },
    { url: '/#gallery', priority: '0.7', changefreq: 'monthly' },
    { url: '/#contact', priority: '0.8', changefreq: 'monthly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(item => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(__dirname, '..', 'public');
  
  // Create public directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap();
