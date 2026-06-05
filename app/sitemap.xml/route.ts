export function GET() {
  const urls = [
    { loc: "https://writeback.pl", priority: "1.0", changefreq: "weekly" },
    { loc: "https://writeback.pl/zamow", priority: "0.9", changefreq: "monthly" },
    { loc: "https://writeback.pl/jak-napisac-reklamacje", priority: "0.8", changefreq: "monthly" },
    { loc: "https://writeback.pl/wzor-reklamacji", priority: "0.8", changefreq: "monthly" },
    { loc: "https://writeback.pl/reklamacja-allegro", priority: "0.8", changefreq: "monthly" },
    { loc: "https://writeback.pl/regulamin", priority: "0.3", changefreq: "yearly" },
    { loc: "https://writeback.pl/polityka", priority: "0.3", changefreq: "yearly" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
