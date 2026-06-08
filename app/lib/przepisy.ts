// Live Polish legal texts from ISAP (api.sejm.gov.pl)
// Level 1: all 10 relevant acts covered
// Level 2: dynamic ELI resolution — always picks the most recent consolidated text that has HTML

// ─── Act definitions ──────────────────────────────────────────────────────────

const ACT_DEFS = {
  konsument: { q: "prawach konsumenta",                          name: "ustawa o prawach konsumenta" },
  platnicza: { q: "usługach płatniczych",                        name: "ustawa o usługach płatniczych" },
  kc:        { q: "Kodeks cywilny",                              name: "Kodeks cywilny" },
  kpa:       { q: "Kodeks postępowania administracyjnego",       name: "Kodeks postępowania administracyjnego" },
  kpc:       { q: "Kodeks postępowania cywilnego",               name: "Kodeks postępowania cywilnego" },
  kpw:       { q: "Kodeks postępowania w sprawach o wykroczenia", name: "Kodeks postępowania w sprawach o wykroczenia" },
  sus:       { q: "systemie ubezpieczeń społecznych",            name: "ustawa o systemie ubezpieczeń społecznych" },
  uokik:     { q: "ochronie konkurencji i konsumentów",          name: "ustawa o ochronie konkurencji i konsumentów" },
  rekl_fin:  { q: "reklamacji przez podmioty rynku finansowego", name: "ustawa o rozpatrywaniu reklamacji przez podmioty rynku finansowego" },
  svde:      { q: "usług drogą elektroniczną",                   name: "ustawa o świadczeniu usług drogą elektroniczną" },
  pke:       { q: "prawie komunikacji elektronicznej",           name: "ustawa o prawie komunikacji elektronicznej" },
  pe:        { q: "prawo energetyczne",                          name: "ustawa Prawo energetyczne" },
  pp:        { q: "prawo przewozowe",                            name: "ustawa Prawo przewozowe" },
} as const;

type ActKey = keyof typeof ACT_DEFS;

// ─── Articles per document type ──────────────────────────────────────────────

type Spec = [ActKey, string];

const DOC_ARTICLES: Record<string, Spec[]> = {
  sklep: [
    ["konsument", "arti_7a"],   // 14-dniowy termin odpowiedzi + skutek milczenia
    ["konsument", "arti_43b"],  // niezgodność towaru z umową — definicja
    ["konsument", "arti_43c"],  // uprawnienia konsumenta przy niezgodności
    ["konsument", "arti_43d"],  // naprawa i wymiana
    ["konsument", "arti_43e"],  // obniżenie ceny i odstąpienie od umowy
    ["kc",        "arti_556"],  // rękojmia — zakres (dla zakupów sprzed 01.01.2023)
  ],
  bank: [
    ["platnicza",  "arti_44"],  // termin 13 miesięcy na zgłoszenie
    ["platnicza",  "arti_45"],  // ciężar dowodu — bank musi udowodnić autoryzację
    ["platnicza",  "arti_46"],  // obowiązek zwrotu D+1
    ["rekl_fin",   "arti_5"],   // termin odpowiedzi 30 dni (wyjątkowo 60)
    ["rekl_fin",   "arti_6"],   // skutek braku odpowiedzi w terminie
    ["rekl_fin",   "arti_9"],   // forma i treść odpowiedzi
  ],
  zus: [
    ["sus", "arti_83"],         // decyzje ZUS i tryb odwołania
    ["kpa", "arti_127"],        // prawo odwołania od decyzji
    ["kpa", "arti_129"],        // termin odwołania — 14 dni od doręczenia
    ["kpa", "arti_156"],        // stwierdzenie nieważności decyzji
    ["kpc", "arti_477_9"],      // odwołanie do sądu pracy i ubezpieczeń społecznych
  ],
  umowa: [
    ["konsument", "arti_27"],   // prawo odstąpienia od umowy w 14 dniach
    ["konsument", "arti_38"],   // wyjątki od prawa odstąpienia (treści cyfrowe)
    ["kc",        "arti_746"],  // wypowiedzenie umowy zlecenia w każdym czasie
    ["kc",        "arti_365_1"],// wypowiedzenie umowy na czas nieokreślony
    ["kc",        "arti_384_1"],// prawo wypowiedzenia gdy firma jednostronnie zmienia warunki umowy
    ["svde",      "arti_8"],    // regulamin usług elektronicznych
  ],
  uokik: [
    ["konsument", "arti_7a"],   // 14-dniowy termin odpowiedzi
    ["konsument", "arti_43b"],  // niezgodność towaru z umową
    ["uokik",     "arti_23a"],  // zakaz stosowania niedozwolonych postanowień
    ["uokik",     "arti_23b"],  // praktyki naruszające zbiorowe interesy konsumentów
    ["uokik",     "arti_23c"],  // zakazy szczegółowe
    ["uokik",     "arti_23d"],  // działania i zaniechania przedsiębiorcy
    ["kc",        "arti_385_3"],// katalog niedozwolonych klauzul umownych
  ],
  wezwanie: [
    ["kc", "arti_455"],  // termin spełnienia świadczenia — niezwłocznie po wezwaniu
    ["kc", "arti_481"],  // odsetki ustawowe za opóźnienie w spełnieniu świadczenia pieniężnego
    ["kc", "arti_6"],    // ciężar dowodu — wierzyciel udowadnia istnienie zobowiązania
  ],
  mandat: [
    ["kpw", "arti_97"],  // nałożenie grzywny w drodze mandatu karnego; prawo odmowy na miejscu
    ["kpw", "arti_99"],  // uchylenie prawomocnego mandatu — przesłanki (niebędący wykroczeniem / nieodpowiedzialna osoba)
    ["kpw", "arti_101"], // skutek odmowy — skierowanie wniosku o ukaranie do sądu rejonowego
  ],
  // skarga — wspólne przepisy dla wszystkich subtypów; subtyp specyficzne dołączane dynamicznie
  skarga: [
    ["konsument", "arti_7a"],   // 14-dniowy termin odpowiedzi (sklep/usługodawca)
    ["kc",        "arti_385_3"],// klauzule niedozwolone — wszystkie typy umów
    // PKE = ustawa z dnia 12 lipca 2024 r. — Prawo komunikacji elektronicznej (Dz.U. 2024 poz. 1221)
    // Weszła w życie 10 listopada 2024 r. Zweryfikowane w ISAP: api.sejm.gov.pl/eli/acts/DU/2024/1221
    ["pke",       "arti_306"],  // PKE art. 306: jednostronna zmiana warunków gdy wynika z prawa/decyzji UKE; min. 1 miesiąc wyprzedzenia
    ["pke",       "arti_307"],  // PKE art. 307: zmiana warunków (czas określony) z obiektywnych przyczyn; abonent może wypowiedzieć BEZ odszkodowania
    ["pke",       "arti_308"],  // PKE art. 308: zmiana warunków (czas nieokreślony / auto-przedłużona); abonent może wypowiedzieć
    ["pke",       "arti_378"],  // PKE art. 378: reklamacja usługi komunikacji elektronicznej (niedotrzymanie terminu, nienależyte wykonanie, błędne naliczenia); termin 12 mies.
    ["pke",       "arti_380"],  // PKE art. 380: prawo wypowiedzenia umowy z winy dostawcy przy stałych rozbieżnościach w jakości usługi
    ["pe",        "arti_6c"],   // PE: reklamacja do przedsiębiorstwa energetycznego (art. 6c)
    ["pp",        "arti_65"],   // PP: odpowiedzialność przewoźnika za utratę/uszkodzenie
    ["pp",        "arti_75"],   // PP: obowiązek reklamacji przed roszczeniem sądowym
  ],
};

// ─── Module-level caches (persist within a warm Vercel Fluid Compute instance) ─

const eliCache   = new Map<string, { eli: string; ts: number }>();
const htmlCache  = new Map<string, string>();
const textCache  = new Map<string, string>();
const ELI_TTL    = 23 * 60 * 60 * 1000; // 23h — slightly under Next.js 24h fetch cache

// ─── Dynamic ELI resolution ───────────────────────────────────────────────────

async function resolveEli(actKey: ActKey): Promise<string | null> {
  const cached = eliCache.get(actKey);
  if (cached && Date.now() - cached.ts < ELI_TTL) return cached.eli;

  const { q } = ACT_DEFS[actKey];
  // No type= filter in URL: ISAP only returns "obowiązujący" acts when filtering by type,
  // which excludes recent TJ with HTML that have been superseded by a newer (HTML-less) TJ.
  // We filter type=Obwieszczenie client-side to catch both statuses.
  const url = `https://api.sejm.gov.pl/eli/acts/search?title=${encodeURIComponent(q)}&publisher=DU`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return null;

  const data = await res.json() as {
    items?: Array<{ ELI?: string; textHTML?: boolean; year?: number; pos?: number; type?: string }>
  };

  // Newest consolidated text (Obwieszczenie) that has HTML published
  const best = (data.items ?? [])
    .filter(i => i.type === "Obwieszczenie")
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || (b.pos ?? 0) - (a.pos ?? 0))
    .find(i => i.textHTML === true);

  if (!best?.ELI) return null;

  eliCache.set(actKey, { eli: best.ELI, ts: Date.now() });
  return best.ELI;
}

// ─── HTML fetch (Next.js data cache + module-level cache) ────────────────────

async function fetchHtml(eli: string): Promise<string> {
  if (htmlCache.has(eli)) return htmlCache.get(eli)!;
  const res = await fetch(`https://api.sejm.gov.pl/eli/acts/${eli}/text.html`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`ISAP HTTP ${res.status} for ${eli}`);
  const html = await res.text();
  htmlCache.set(eli, html);
  return html;
}

// ─── Article text extraction ─────────────────────────────────────────────────

function extractFromHtml(html: string, articleId: string): string {
  const marker = `data-id="${articleId}"`;
  const markerIdx = html.indexOf(marker);
  if (markerIdx === -1) return "";

  const divStart = html.lastIndexOf("<div", markerIdx);
  let depth = 0, pos = divStart;
  while (pos < html.length) {
    const nextOpen  = html.indexOf("<div",  pos);
    const nextClose = html.indexOf("</div>", pos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) { depth++; pos = nextOpen + 4; }
    else { depth--; pos = nextClose + 6; if (depth === 0) break; }
  }

  return html.slice(divStart, pos)
    .replace(/<[^>]+>/g,  " ")
    .replace(/&nbsp;/g,   " ")
    .replace(/&quot;/g,   '"')
    .replace(/&amp;/g,    "&")
    .replace(/&#\d+;/g,   "")
    .replace(/\s+/g,      " ")
    .trim();
}

async function getArticle(actKey: ActKey, articleId: string): Promise<string> {
  const key = `${actKey}::${articleId}`;
  if (textCache.has(key)) return textCache.get(key)!;

  const eli = await resolveEli(actKey);
  if (!eli) return "";

  const html = await fetchHtml(eli);
  const text = extractFromHtml(html, articleId);
  if (text) textCache.set(key, text);
  return text;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchPrzepisy(docType: string): Promise<Record<string, string>> {
  const specs = DOC_ARTICLES[docType];
  if (!specs?.length) return {};

  const results = await Promise.allSettled(
    specs.map(([actKey, articleId]) => getArticle(actKey, articleId))
  );

  const out: Record<string, string> = {};
  specs.forEach(([actKey, articleId], i) => {
    const r = results[i];
    if (r.status === "fulfilled" && r.value) {
      out[`${actKey}::${articleId}`] = r.value;
    } else if (r.status === "rejected") {
      console.error(`[przepisy] ${actKey}::${articleId}:`, r.reason);
    }
  });
  return out;
}

export function formatPrzepisy(articles: Record<string, string>): string {
  if (!Object.keys(articles).length) return "";

  // Group by act
  const byAct = new Map<ActKey, string[]>();
  for (const [key, text] of Object.entries(articles)) {
    const actKey = key.split("::")[0] as ActKey;
    if (!byAct.has(actKey)) byAct.set(actKey, []);
    byAct.get(actKey)!.push(text);
  }

  const sections: string[] = [];
  for (const [actKey, texts] of byAct) {
    const name = ACT_DEFS[actKey]?.name ?? actKey;
    sections.push(`[${name}]\n${texts.join("\n")}`);
  }

  return `\n\nAKTUALNE BRZMIENIE PRZEPISÓW (źródło: ISAP sejm.gov.pl — tekst pobrany ${new Date().toLocaleDateString("pl-PL")}):\n${sections.join("\n\n")}`;
}
