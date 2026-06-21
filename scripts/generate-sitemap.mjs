import { writeFile } from "node:fs/promises";

const siteUrl = "https://dev2creator-portfolio.vercel.app/";
const lastModified = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

await writeFile(new URL("../public/sitemap.xml", import.meta.url), sitemap, "utf8");
console.log(`Generated sitemap for ${siteUrl}`);