// Live Polish legal texts from ISAP (api.sejm.gov.pl)
// Used to inject accurate article text into Claude's context.
// Fetched with 24h Next.js data cache; module-level Map avoids re-parsing within a warm instance.

const ACTS = {
  konsument: "DU/2024/1796", // ustawa o prawach konsumenta – tekst jednolity 2024
  platnicza: "DU/2024/30",   // ustawa o usługach płatniczych – tekst jednolity 2024
} as const;

const cache = new Map<string, string>();

function extractArticleFromHtml(html: string, articleId: string): string {
  const marker = `data-id="${articleId}"`;
  const markerIdx = html.indexOf(marker);
  if (markerIdx === -1) return "";

  // Find the div opening before the marker
  const divStart = html.lastIndexOf("<div", markerIdx);

  // Track nesting depth to find the closing </div>
  let depth = 0;
  let pos = divStart;
  while (pos < html.length) {
    const nextOpen = html.indexOf("<div", pos);
    const nextClose = html.indexOf("</div>", pos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
      if (depth === 0) break;
    }
  }

  return html
    .slice(divStart, pos)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchActHtml(eli: string): Promise<string> {
  const url = `https://api.sejm.gov.pl/eli/acts/${eli}/text.html`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`ISAP ${eli}: HTTP ${res.status}`);
  return res.text();
}

async function getArticle(eli: string, articleId: string): Promise<string> {
  const key = `${eli}::${articleId}`;
  if (cache.has(key)) return cache.get(key)!;

  const html = await fetchActHtml(eli);
  const text = extractArticleFromHtml(html, articleId);
  if (text) cache.set(key, text);
  return text;
}

export type Przepisy = Partial<{
  art_7a: string;
  art_43b: string; art_43c: string; art_43d: string; art_43e: string;
  art_44: string; art_45: string; art_46: string;
  art_27: string; art_38: string;
}>;

export async function fetchPrzepisy(docType: string): Promise<Przepisy> {
  try {
    const p: Przepisy = {};

    if (docType === "sklep" || docType === "uokik") {
      [p.art_7a, p.art_43b, p.art_43c, p.art_43d, p.art_43e] = await Promise.all([
        getArticle(ACTS.konsument, "arti_7a"),
        getArticle(ACTS.konsument, "arti_43b"),
        getArticle(ACTS.konsument, "arti_43c"),
        getArticle(ACTS.konsument, "arti_43d"),
        getArticle(ACTS.konsument, "arti_43e"),
      ]);
    }

    if (docType === "bank") {
      [p.art_7a, p.art_44, p.art_45, p.art_46] = await Promise.all([
        getArticle(ACTS.konsument, "arti_7a"),
        getArticle(ACTS.platnicza, "arti_44"),
        getArticle(ACTS.platnicza, "arti_45"),
        getArticle(ACTS.platnicza, "arti_46"),
      ]);
    }

    if (docType === "umowa") {
      [p.art_27, p.art_38] = await Promise.all([
        getArticle(ACTS.konsument, "arti_27"),
        getArticle(ACTS.konsument, "arti_38"),
      ]);
    }

    return p;
  } catch (e) {
    console.error("[przepisy] fetch error:", e);
    return {};
  }
}

export function formatPrzepisy(p: Przepisy): string {
  const articles = Object.values(p).filter(Boolean);
  if (!articles.length) return "";
  return `\nAKTUALNE BRZMIENIE PRZEPISÓW (źródło: ISAP sejm.gov.pl, ${new Date().toLocaleDateString("pl-PL")}):\n` +
    articles.map(a => a!).join("\n\n");
}
