export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://writeback.pl/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
