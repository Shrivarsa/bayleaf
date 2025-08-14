import fs from 'fs';
import path from 'path';

// Types
interface Route {
  url: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod?: string;
}

// Configuration
const DOMAIN = 'https://www.bay-leaf.eu'; // Your actual domain
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

// Define your routes here - Single Page App with sections
const routes: Route[] = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: '/#hero',
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    url: '/#about',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/#menu',
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/#gallery',
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/#contact',
    changefreq: 'monthly',
    priority: '0.8'
  }
];

// Generate sitemap XML
function generateSitemap(): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  routes.forEach(route => {
    const lastmod = route.lastmod || currentDate;
    sitemap += `  <url>
    <loc>${DOMAIN}${route.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
}

// Write sitemap to file
async function writeSitemap(): Promise<void> {
  try {
    const sitemapContent = generateSitemap();
    
    // Ensure public directory exists
    const publicDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    await fs.promises.writeFile(OUTPUT_PATH, sitemapContent);
    console.log(`✅ Sitemap generated successfully at ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    throw error;
  }
}

// Add to package.json scripts
function addToPackageJson(): void {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      
      packageJson.scripts['generate-sitemap'] = 'tsx scripts/generate-sitemap.ts';
      packageJson.scripts['build:sitemap'] = 'npm run generate-sitemap && npm run build';
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Added sitemap scripts to package.json');
    } catch (error) {
      console.error('❌ Error updating package.json:', error);
    }
  }
}

// Run the generator
if (require.main === module) {
  writeSitemap()
    .then(() => {
      console.log('Sitemap generation completed!');
    })
    .catch((error) => {
      console.error('Sitemap generation failed:', error);
      process.exit(1);
    });
}

export { generateSitemap, writeSitemap, routes };