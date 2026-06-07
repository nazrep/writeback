import { NextRequest, NextResponse, after } from "next/server";
import Stripe from "stripe";
import Anthropic from "@anthropic-ai/sdk";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { fetchPrzepisy, formatPrzepisy } from "@/app/lib/przepisy";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);
const processedSessions = new Set<string>();
const getAnthropic = () => new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
const getResend = () => new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  // Ignore events older than 30 minutes — Stripe retries after restarts would otherwise re-send emails
  const eventAgeMs = Date.now() - event.created * 1000;
  if (eventAgeMs > 30 * 60 * 1000) {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (processedSessions.has(session.id)) {
    return NextResponse.json({ received: true });
  }
  processedSessions.add(session.id);

  after(async () => {
  const m = session.metadata!;
  const docType = m.doc_type || "sklep";

  const today = new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });

  const STRUCTURE_RULES = `
OBOWIĄZKOWA STRUKTURA PISMA (zachowaj dokładnie tę kolejność i formatowanie):
UWAGA o adresie nadawcy: jeśli adres zawiera przecinek, rozdziel go na dwie osobne linie — ulica/numer w jednej linii, kod pocztowy i miasto w drugiej.

1. Pierwsza linia: imię i nazwisko nadawcy
2. Druga linia: ulica i numer
3. Trzecia linia: kod pocztowy i miasto
4. Czwarta linia: adres email
5. Pusta linia
6. DATA: [miejscowość], [data w formacie DD MIESIĄC RRRR r.]
7. Pusta linia
8. Nazwa adresata (firmy)
9. Adres adresata (jeśli podano)
10. Pusta linia
11. DOTYCZY: [krótki opis — max 1 zdanie]
12. Pusta linia
13. Szanowni Państwo,
14. Pusta linia
15. Akapity treści pisma (każdy akapit oddzielony pustą linią)
16. Pusta linia
17. ŻĄDANIE
18. Konkretne żądanie z podstawą prawną
19. Pusta linia
20. PODSTAWA PRAWNA
21. Lista przepisów (każdy w osobnej linii, zaczynający się od "- ")
22. Pusta linia
23. TERMIN ODPOWIEDZI
24. Treść o terminie
25. Pusta linia
26. Z poważaniem,
27. Pusta linia
28. [imię i nazwisko]

ZASADY TREŚCI:
- Każde żądanie musi być poparte konkretnym artykułem ustawy z numerem
- Używaj pierwszej osoby liczby pojedynczej (ja, mój, moją)
- Ton: stanowczy, formalny, bez emocji
- Akapity zwykłego tekstu: 3–5 zdań każdy
- Nie stosuj list punktowanych w treści — tylko w sekcji PODSTAWA PRAWNA
- Tylko gotowe pismo. Bez komentarzy. Bez markdown.`;

  const SYSTEMS: Record<string, string> = {
    sklep: `Jesteś ekspertem prawa konsumenckiego w Polsce. Piszesz profesjonalne pisma reklamacyjne oparte na niezgodności towaru z umową.
Przepisy obowiązkowe (dla zakupów B2C po 01.01.2023 — stosuj WYŁĄCZNIE ten reżim, nie art. 556 KC):
- art. 43a: definicja niezgodności towaru z umową
- art. 43b: przesłanki niezgodności (towar nie nadaje się do celu, nie posiada oczekiwanych cech)
- art. 43c ust. 1: 2-letnia odpowiedzialność sprzedawcy + domniemanie, że niezgodność ujawniona w ciągu 2 lat od dostarczenia istniała już w chwili dostarczenia (ciężar dowodu po stronie sprzedawcy)
- art. 43d ust. 1: PODSTAWA ŻĄDANIA naprawy lub wymiany — używaj tego artykułu jako podstawy żądania
- art. 43d ust. 2–6: obowiązki przedsiębiorcy przy naprawie/wymianie: rozsądny czas, na koszt sprzedawcy, bez niedogodności dla konsumenta
- art. 43e ust. 1: prawo do obniżenia ceny lub odstąpienia od umowy, gdy naprawa/wymiana niemożliwa, odmówiona lub nieskuteczna
- art. 7a ust. 1 UPK: 14-dniowy termin odpowiedzi; brak odpowiedzi = reklamacja uznana za zasadną
NIE cytuj art. 556 KC (rękojmia KC) — nie stosuje się do zakupów B2C po 01.01.2023.
Żądanie hierarchiczne: najpierw naprawa lub wymiana (art. 43d ust. 1), potem obniżenie ceny lub odstąpienie od umowy (art. 43e ust. 1).`,

    bank: `Jesteś ekspertem prawa bankowego i ubezpieczeniowego w Polsce. Piszesz profesjonalne reklamacje do podmiotów rynku finansowego.
Przepisy obowiązkowe: ustawa z dnia 5 sierpnia 2015 r. o rozpatrywaniu reklamacji przez podmioty rynku finansowego (Dz.U. 2015 poz. 1348) — 30 dni na odpowiedź, wyjątkowo 60 dni; ustawa o usługach płatniczych art. 44–58 (nieautoryzowane transakcje — 13 miesięcy na zgłoszenie z art. 44 ust. 1, zwrot D+1 z art. 46 ust. 1, ciężar dowodu po stronie banku z art. 45 ust. 1–2).
Brak odpowiedzi = uznanie reklamacji za zasadną.
WAŻNE: Jeśli z kontekstu wynika, że adresat to sklep detaliczny, firma handlowa lub usługowa (nie bank, ubezpieczyciel ani parabank), zastosuj przepisy o niezgodności towaru z umową (art. 43a ustawy o prawach konsumenta) i art. 7a UPK zamiast przepisów o podmiotach rynku finansowego.`,

    zus: `Jesteś ekspertem prawa ubezpieczeń społecznych i administracyjnego w Polsce. Piszesz odwołania od decyzji ZUS/US do właściwego sądu za pośrednictwem organu.
Przepisy obowiązkowe: art. 83 ust. 2 ustawy z dnia 13.10.1998 r. o systemie ubezpieczeń społecznych; art. 477(9)–477(10) KPC — odwołanie do sądu pracy i ubezpieczeń społecznych, termin 1 miesiąc od doręczenia decyzji (art. 477(10) § 1 KPC); art. 127–140 KPA (procedura odwołania administracyjnego); art. 156 KPA (nieważność decyzji).
Wskaż konkretny sąd i podstawę zaskarżenia.`,

    umowa: `Jesteś ekspertem prawa cywilnego w Polsce. Piszesz formalne wypowiedzenia umów z zachowaniem terminów i bez kar umownych.
Przepisy obowiązkowe: art. 746 KC (wypowiedzenie umowy zlecenia); art. 365(1) KC (umowy na czas nieokreślony); art. 3853 KC (klauzule abuzywne); ustawa o prawach konsumenta art. 27 (prawo odstąpienia 14 dni); ustawa o świadczeniu usług drogą elektroniczną art. 8 (regulamin — warunki rozwiązania umowy).
Wskazuj konkretną datę skuteczności wypowiedzenia.`,

    skarga: `Jesteś ekspertem prawa konsumenckiego i administracyjnego w Polsce. Piszesz skargi konsumenckie dopasowane do typu adresata.
Typ skargi określa pole skarga_subtype — zastosuj właściwe przepisy:

KURIER (skarga_subtype=kurier):
Jeśli adresat to sklep: art. 43a–43d UPK + art. 7a UPK (sprzedawca odpowiada za dostawę).
Jeśli adresat to firma kurierska: art. 65 ust. 1–2 Prawa przewozowego (ustawa z 15.11.1984) — odpowiedzialność za utratę/uszkodzenie/opóźnienie; art. 75 ust. 1 PP — obowiązek reklamacji; art. 77 PP — przedawnienie 1 rok; art. 87–92 Prawa pocztowego (ustawa z 23.11.2012) — dla InPost/Poczty Polskiej (art. 87 odpowiedzialność, art. 90 limity odszkodowania, art. 92 termin 30 dni na odpowiedź).

TELECOM (skarga_subtype=telecom):
Stosuj WYŁĄCZNIE ustawę z dnia 16 lipca 2022 r. o prawie komunikacji elektronicznej (PKE, Dz.U. 2022 poz. 1933, obowiązuje od 21.12.2022) — zastąpiła stare Prawo telekomunikacyjne z 2004 r.
- Art. 83 PKE: dostawca musi powiadomić abonenta o zmianie warunków umowy z 30-dniowym wyprzedzeniem
- Art. 84 PKE: abonent ma prawo rozwiązać umowę bez kar, jeśli nie akceptuje zmiany warunków
- Art. 88 PKE: prawo do odszkodowania za niedotrzymanie terminu dostarczenia usługi lub parametrów jakości
- Art. 3853 pkt 10 KC: klauzule abuzywne przy zmianie cen
Regulatorem jest Prezes UKE (Urząd Komunikacji Elektronicznej).

ENERGIA (skarga_subtype=energia):
art. 5 ust. 2 pkt 2 ustawy z 10.04.1997 Prawo energetyczne — umowa dystrybucji/przesyłu musi określać parametry techniczne energii; art. 6c PE — prawo do złożenia reklamacji, 14 dni na rozpatrzenie, brak odpowiedzi = reklamacja uznana; Rozporządzenie ws. szczegółowych zasad kształtowania taryf — przy zawyżonych rachunkach. Regulatorem jest Prezes URE.

INNE (skarga_subtype=inne):
art. 43a–43g UPK (niezgodność towaru/usługi z umową); art. 7a UPK (14-dniowy termin odpowiedzi); art. 3853 KC (klauzule abuzywne); art. 746 KC lub 365(1) KC (wypowiedzenie umowy) — dobierz właściwe w zależności od opisu.`,

    uokik: `Jesteś ekspertem prawa ochrony konsumentów w Polsce. Piszesz skargi do UOKiK i Rzecznika Praw Konsumentów.
Przepisy obowiązkowe: ustawa z dnia 16.02.2007 r. o ochronie konkurencji i konsumentów art. 23a–23d (niedozwolone postanowienia w umowach wzorcowych — rejestr UOKiK); art. 24 ustawy o ochronie konkurencji i konsumentów (zakaz praktyk naruszających zbiorowe interesy konsumentów); art. 7a UPK (obowiązek odpowiedzi w 14 dniach); Dyrektywa Omnibus 2019/2161; art. 3853 KC (klauzule abuzywne).
Skarga powinna żądać: wszczęcia postępowania, nałożenia kary, nakazania zaniechania praktyki.`,
  };

  const PROMPTS: Record<string, string> = {
    sklep: `Napisz reklamację konsumencką.
NADAWCA: ${m.imie_nazwisko} | ${m.adres} | ${m.email}
ADRESAT: ${m.nazwa_sklepu}${m.adres_sklepu ? " | " + m.adres_sklepu : ""}
PRODUKT: ${m.produkt}${m.cena ? " | cena: " + m.cena + " zł" : ""}${m.data_zakupu ? " | zakup: " + m.data_zakupu : ""}${m.numer_zamowienia ? " | nr zam.: " + m.numer_zamowienia : ""}
OPIS WADY: ${m.opis}${m.podjete_kroki ? "\nPODJĘTE KROKI: " + m.podjete_kroki : ""}
ŻĄDANIE: ${m.zadanie}
DATA PISMA: ${today}`,

    bank: `Napisz reklamację do banku / ubezpieczyciela.
NADAWCA: ${m.imie_nazwisko} | ${m.adres} | ${m.email}
ADRESAT: ${m.nazwa_sklepu}${m.adres_sklepu ? " | " + m.adres_sklepu : ""}
PRODUKT/USŁUGA: ${m.produkt}${m.cena ? " | kwota: " + m.cena + " zł" : ""}${m.data_zakupu ? " | data zdarzenia: " + m.data_zakupu : ""}${m.numer_zamowienia ? " | nr umowy: " + m.numer_zamowienia : ""}
OPIS: ${m.opis}${m.podjete_kroki ? "\nKONTAKT Z BANKIEM: " + m.podjete_kroki : ""}
ŻĄDANIE: ${m.zadanie}
DATA PISMA: ${today}`,

    zus: `Napisz odwołanie od decyzji ZUS/US.
NADAWCA: ${m.imie_nazwisko} | ${m.adres} | ${m.email}
ORGAN: ${m.nazwa_sklepu}${m.adres_sklepu ? " | " + m.adres_sklepu : ""}
PRZEDMIOT: ${m.produkt}${m.data_zakupu ? " | data decyzji: " + m.data_zakupu : ""}${m.numer_zamowienia ? " | nr decyzji: " + m.numer_zamowienia : ""}
UZASADNIENIE: ${m.opis}${m.podjete_kroki ? "\nDOTYCHCZASOWE KROKI: " + m.podjete_kroki : ""}
ŻĄDANIE: ${m.zadanie}
DATA PISMA: ${today}`,

    umowa: `Napisz wypowiedzenie umowy.
NADAWCA: ${m.imie_nazwisko} | ${m.adres} | ${m.email}
FIRMA: ${m.nazwa_sklepu}${m.adres_sklepu ? " | " + m.adres_sklepu : ""}
UMOWA: ${m.produkt}${m.cena ? " | opłata: " + m.cena + " zł/mies." : ""}${m.data_zakupu ? " | data zawarcia: " + m.data_zakupu : ""}${m.numer_zamowienia ? " | nr umowy: " + m.numer_zamowienia : ""}
OKOLICZNOŚCI: ${m.opis}${m.podjete_kroki ? "\nKONTAKT Z FIRMĄ: " + m.podjete_kroki : ""}
ŻĄDANIE: ${m.zadanie}
DATA PISMA: ${today}`,

    skarga: `Napisz skargę konsumencką.
NADAWCA: ${m.imie_nazwisko} | ${m.adres} | ${m.email}
ADRESAT: ${m.nazwa_sklepu}${m.adres_sklepu ? " | " + m.adres_sklepu : ""}
TYP SKARGI: ${m.skarga_subtype || "inne"}
PRZEDMIOT: ${m.produkt}${m.cena ? " | wartość sporu: " + m.cena + " zł" : ""}${m.data_zakupu ? " | data zdarzenia: " + m.data_zakupu : ""}${m.numer_zamowienia ? " | nr ref: " + m.numer_zamowienia : ""}
OPIS: ${m.opis}${m.podjete_kroki ? "\nKONTAKT Z FIRMĄ: " + m.podjete_kroki : ""}
ŻĄDANIE: ${m.zadanie}
DATA PISMA: ${today}`,

    uokik: `Napisz skargę do UOKiK / Rzecznika Praw Konsumentów.
NADAWCA: ${m.imie_nazwisko} | ${m.adres} | ${m.email}
FIRMA SKARŻONA: ${m.nazwa_sklepu}${m.adres_sklepu ? " | " + m.adres_sklepu : ""}
PRZEDMIOT: ${m.produkt}${m.cena ? " | wartość sporu: " + m.cena + " zł" : ""}${m.data_zakupu ? " | data reklamacji: " + m.data_zakupu : ""}${m.numer_zamowienia ? " | nr reklamacji: " + m.numer_zamowienia : ""}
OPIS NARUSZENIA: ${m.opis}
HISTORIA: ${m.podjete_kroki || "Brak odpowiedzi na reklamację"}
ŻĄDANIE: ${m.zadanie}
DATA PISMA: ${today}`,
  };

  const przepisy = await fetchPrzepisy(docType);
  const przepisyCtx = formatPrzepisy(przepisy);

  const systemPrompt = (SYSTEMS[docType] ?? SYSTEMS.sklep) + przepisyCtx + "\n\n" + STRUCTURE_RULES;
  const imageCtx = m.image_context ? `\nDODATKOWY KONTEKST ZE ZDJĘCIA DOKUMENTU: ${m.image_context}` : "";
  const userPrompt = (PROMPTS[docType] ?? PROMPTS.sklep) + imageCtx;

  const msg = await getAnthropic().messages.create({
    model: "claude-opus-4-7",
    max_tokens: 2000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const pismoText = (msg.content[0] as { type: string; text: string }).text;

  // ─────────────────────────────────────────────────────────────────
  // PDF GENERATION
  // ─────────────────────────────────────────────────────────────────
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const fontDir = path.join(process.cwd(), "public", "fonts");
  const regularBytes = fs.readFileSync(path.join(fontDir, "Lato-Regular.ttf"));
  const boldBytes = fs.readFileSync(path.join(fontDir, "Lato-Bold.ttf"));
  const font = await pdfDoc.embedFont(regularBytes);
  const boldFont = await pdfDoc.embedFont(boldBytes);

  const W = 595, H = 842;
  const marginX = 60, marginTop = 50, marginBottom = 52;
  const contentW = W - marginX * 2;
  let page = pdfDoc.addPage([W, H]);
  let y = H - marginTop;

  const C_INDIGO: [number, number, number] = [0.31, 0.27, 0.9];
  const C_INDIGO_DARK: [number, number, number] = [0.18, 0.16, 0.55];
  const C_INDIGO_LIGHT: [number, number, number] = [0.93, 0.92, 1.0];
  const C_GRAY: [number, number, number] = [0.5, 0.5, 0.5];
  const C_GRAY_LIGHT: [number, number, number] = [0.96, 0.96, 0.97];
  const C_BLACK: [number, number, number] = [0.1, 0.1, 0.12];
  const C_TEXT_MUTED: [number, number, number] = [0.4, 0.4, 0.45];

  function wrap(text: string, maxW: number, size: number, f: typeof font): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? cur + " " + w : w;
      if (f.widthOfTextAtSize(test, size) > maxW) { if (cur) lines.push(cur); cur = w; }
      else cur = test;
    }
    if (cur) lines.push(cur);
    return lines;
  }

  function ensureSpace(needed: number) {
    if (y - needed < marginBottom + 10) {
      // Draw footer on current page before adding new one
      drawPageFooter(page);
      page = pdfDoc.addPage([W, H]);
      y = H - marginTop;
    }
  }

  function drawText(text: string, opts: {
    size?: number; bold?: boolean;
    color?: [number, number, number];
    x?: number; maxW?: number;
    lineHeight?: number; indent?: number;
  } = {}) {
    const size = opts.size ?? 10;
    const f = opts.bold ? boldFont : font;
    const [r, g, b] = opts.color ?? C_BLACK;
    const x = (opts.x ?? marginX) + (opts.indent ?? 0);
    const maxW = (opts.maxW ?? contentW) - (opts.indent ?? 0);
    const lh = opts.lineHeight ?? (size + 4.5);
    if (!text.trim()) { y -= size * 0.6; return; }
    const lines = wrap(text, maxW, size, f);
    for (const line of lines) {
      ensureSpace(size + 4);
      page.drawText(line, { x, y, size, font: f, color: rgb(r, g, b) });
      y -= lh;
    }
  }

  function drawPageFooter(p: ReturnType<typeof pdfDoc.getPage>) {
    p.drawLine({
      start: { x: marginX, y: marginBottom - 4 },
      end: { x: W - marginX, y: marginBottom - 4 },
      thickness: 0.4,
      color: rgb(0.88, 0.88, 0.9),
    });
    p.drawText("Przygotowano z pomocą writeback.pl · Nie jest to porada prawna", {
      x: marginX, y: marginBottom - 16, size: 7, font, color: rgb(...C_GRAY),
    });
  }

  // ── DOCUMENT TYPE BADGE ──
  const LABELS: Record<string, string> = {
    sklep: "PISMO REKLAMACYJNE",
    bank: "REKLAMACJA DO BANKU / UBEZPIECZYCIELA",
    zus: "ODWOŁANIE OD DECYZJI",
    umowa: "WYPOWIEDZENIE UMOWY",
    uokik: "SKARGA DO UOKiK / RZECZNIKA",
    skarga: "SKARGA KONSUMENCKA",
  };
  let docLabel = LABELS[docType] ?? "PISMO REKLAMACYJNE";
  if (docType === "bank" && !/(bank|ubezpiecz|pkobp|mbank|alior|ing\b|bnp|pzu|aviva|warta|axa|generali|ergo|hestia|skandia|prudential|aegon|metlife|credit\s*agricole|santander|millennium|getin|nest\s*bank|toyota\s*bank|eurobank|plus\s*bank|pocztowy|bph|raiffeisen)/i.test(m.nazwa_sklepu)) {
    docLabel = "PISMO REKLAMACYJNE";
  }
  const badgeW = boldFont.widthOfTextAtSize(docLabel, 9) + 24;
  page.drawRectangle({ x: marginX, y: y - 3, width: badgeW, height: 20, color: rgb(...C_INDIGO_LIGHT) });
  page.drawText(docLabel, { x: marginX + 12, y: y + 4, size: 9, font: boldFont, color: rgb(...C_INDIGO) });
  y -= 28;

  // ── THIN ACCENT LINE ──
  page.drawRectangle({ x: marginX, y: y, width: 36, height: 2.5, color: rgb(...C_INDIGO) });
  y -= 20;

  // ── MAIN LETTER CONTENT ──
  const paragraphs = pismoText.split("\n");
  let inSignatureBlock = false;
  let blankCount = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const trimmed = paragraphs[i].trim();

    if (!trimmed) {
      blankCount++;
      y -= blankCount === 1 ? 9 : 0;
      continue;
    }
    blankCount = 0;

    // Detect section heading: ALL CAPS, 2–80 chars, no lowercase
    const isHeading = (
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 2 && trimmed.length < 80 &&
      !/[a-z]/.test(trimmed) &&
      !trimmed.startsWith("- ")
    );

    // Detect DOTYCZY: line
    const isDotyczy = /^DOTYCZY:/i.test(trimmed);

    // Detect bullet points in PODSTAWA PRAWNA
    const isBullet = trimmed.startsWith("- ");

    // Detect signature zone
    const isSig = trimmed.startsWith("Z poważaniem") || trimmed.startsWith("Z szacunkiem");
    if (isSig) inSignatureBlock = true;

    // Strip DATA: prefix from date line
    if (/^DATA:\s*/i.test(trimmed)) {
      const dateText = trimmed.replace(/^DATA:\s*/i, "");
      ensureSpace(16);
      const dateW = font.widthOfTextAtSize(dateText, 9.5);
      page.drawText(dateText, { x: W - marginX - dateW, y, size: 9.5, font, color: rgb(...C_TEXT_MUTED) });
      y -= 14.5;
      continue;
    }

    // Detect address/date block (first ~8 lines before content)
    const isMetaLine = i < 10 && !isHeading && !isDotyczy;

    if (isDotyczy) {
      y -= 2;
      ensureSpace(24);
      page.drawRectangle({ x: marginX, y: y - 2, width: 3, height: 20, color: rgb(...C_INDIGO) });
      drawText(trimmed, { size: 10, bold: true, color: C_INDIGO_DARK, x: marginX + 10, maxW: contentW - 10, lineHeight: 16 });
      y -= 4;
    } else if (isHeading) {
      y -= 8;
      // TERMIN ODPOWIEDZI is the last section — keep it together with signature block below
      const headingSpace = trimmed.includes("TERMIN") ? 220 : 26;
      ensureSpace(headingSpace);
      page.drawRectangle({ x: marginX, y: y - 4, width: contentW, height: 22, color: rgb(...C_INDIGO_LIGHT) });
      page.drawRectangle({ x: marginX, y: y - 4, width: 3, height: 22, color: rgb(...C_INDIGO) });
      drawText(trimmed, { size: 9.5, bold: true, color: C_INDIGO_DARK, x: marginX + 10, maxW: contentW - 10, lineHeight: 18 });
      y -= 6;
    } else if (isBullet) {
      ensureSpace(18);
      page.drawText("•", { x: marginX + 4, y, size: 10, font, color: rgb(...C_INDIGO) });
      drawText(trimmed.slice(2), { size: 9.5, color: C_BLACK, x: marginX + 16, maxW: contentW - 16, lineHeight: 15 });
    } else if (inSignatureBlock) {
      if (isSig) {
        y -= 4;
        ensureSpace(60);
        drawText(trimmed, { size: 10, color: C_BLACK });
        y -= 24;
        // Signature line
        page.drawLine({
          start: { x: marginX, y },
          end: { x: marginX + 180, y },
          thickness: 0.7,
          color: rgb(...C_GRAY),
        });
        y -= 12;
      } else {
        drawText(trimmed, { size: 10, bold: true, color: C_BLACK });
      }
    } else if (isMetaLine) {
      // Address/date block: slightly muted, smaller
      drawText(trimmed, { size: 9.5, color: C_TEXT_MUTED, lineHeight: 14.5 });
    } else {
      drawText(trimmed, { size: 10, color: C_BLACK, lineHeight: 16 });
    }
  }

  // ── FOOTER ON ALL PAGES ──
  const pageCount = pdfDoc.getPageCount();
  for (let i = 0; i < pageCount; i++) {
    const p = pdfDoc.getPage(i);
    drawPageFooter(p);
    const pageNum = `${i + 1} / ${pageCount}`;
    const pgW = font.widthOfTextAtSize(pageNum, 7);
    p.drawText(pageNum, { x: W - marginX - pgW, y: marginBottom - 16, size: 7, font, color: rgb(...C_GRAY) });
  }

  const pdfBytes = await pdfDoc.save();

  // ─────────────────────────────────────────────────────────────────
  // FAKTURA VAT — clean professional layout
  // ─────────────────────────────────────────────────────────────────
  // || instead of ?? so that amount_total=0 also triggers the fallback
  const grossAmount = (session.amount_total || 2900) / 100;
  const netAmount = Math.round((grossAmount / 1.23) * 100) / 100;
  const vatAmount = Math.round((grossAmount - netAmount) * 100) / 100;

  const invoiceDate = new Date();
  const invoiceYear = invoiceDate.getFullYear();
  const invoiceMonth = String(invoiceDate.getMonth() + 1).padStart(2, "0");
  const invoiceSeq = String(session.created).slice(-6);
  const invoiceNumber = `FV/${invoiceYear}/${invoiceMonth}/${invoiceSeq}`;
  const invDateStr = invoiceDate.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" });
  const fmtPLN = (n: number) => n.toFixed(2).replace(".", ",") + " zł";

  const invDoc = await PDFDocument.create();
  invDoc.registerFontkit(fontkit);
  const iF  = await invDoc.embedFont(regularBytes);
  const iFB = await invDoc.embedFont(boldBytes);
  const IP  = invDoc.addPage([595, 842]);

  // Helper: draw text at absolute (x,y), optional right-align within maxX
  function iT(text: string, x: number, y: number, size = 9, bold = false,
               color: [number,number,number] = [0.1,0.1,0.12], rightAlign = false, maxX = 0) {
    const f = bold ? iFB : iF;
    const dx = rightAlign ? maxX - f.widthOfTextAtSize(text, size) : x;
    IP.drawText(text, { x: dx, y, size, font: f, color: rgb(...color) });
  }
  function iLine(y: number, x1 = 50, x2 = 545) {
    IP.drawLine({ start: { x: x1, y }, end: { x: x2, y }, thickness: 0.4, color: rgb(0.86, 0.86, 0.89) });
  }

  // ── TOP STRIPE ──
  IP.drawRectangle({ x: 0, y: 836, width: 595, height: 6, color: rgb(0.31, 0.27, 0.9) });

  // ── HEADER BAND ──
  IP.drawRectangle({ x: 0, y: 756, width: 595, height: 80, color: rgb(0.97, 0.97, 0.98) });

  // Logo block — center W precisely using font metrics
  IP.drawRectangle({ x: 50, y: 790, width: 32, height: 32, color: rgb(0.31, 0.27, 0.9) });
  const wSize = 15;
  const wW = iFB.widthOfTextAtSize("W", wSize);
  IP.drawText("W", { x: 50 + 16 - wW / 2, y: 801, size: wSize, font: iFB, color: rgb(1, 1, 1) });
  iT("writeback.pl", 90, 809, 11, true, [0.12, 0.12, 0.18]);
  iT("Maciej Perzankowski", 90, 795, 7.5, false, [0.5, 0.5, 0.56]);

  // Document title (right-aligned)
  iT("FAKTURA VAT", 50, 802, 22, true, [0.1, 0.1, 0.12], true, 545);
  iT(invoiceNumber, 50, 784, 9.5, true, [0.31, 0.27, 0.9], true, 545);

  // ── DATES ──
  iT("Data wystawienia:", 50, 742, 8, false, [0.5, 0.5, 0.55]);
  iT(invDateStr, 148, 742, 8, true, [0.15, 0.15, 0.2]);
  iT("Data sprzedaży:", 280, 742, 8, false, [0.5, 0.5, 0.55]);
  iT(invDateStr, 373, 742, 8, true, [0.15, 0.15, 0.2]);

  iLine(726);

  // ── PARTIES ──
  iT("SPRZEDAWCA", 50, 710, 7, true, [0.31, 0.27, 0.9]);
  iT("NABYWCA", 300, 710, 7, true, [0.31, 0.27, 0.9]);

  // Seller rows
  const selRows = [
    ["Maciej Perzankowski", true],
    ["ul. 19-go Lutego 8/14", false],
    ["96-100 Skierniewice", false],
    ["NIP: 8361881457", false],
    ["REGON: 52381424900000", false],
    ["hello@writeback.pl", false],
  ] as [string, boolean][];
  selRows.forEach(([text, bold], i) => iT(text, 50, 696 - i * 14, 8.5, bold, [0.1, 0.1, 0.14]));

  // Buyer — split address on commas
  const buyerName = m.imie_nazwisko ?? "";
  const buyerAddr = (m.adres ?? "").split(",").map((s: string) => s.trim()).filter(Boolean);
  const buyerRows: [string, boolean][] = [[buyerName, true], ...buyerAddr.map(s => [s, false] as [string, boolean])];
  buyerRows.forEach(([text, bold], i) => iT(text, 300, 696 - i * 14, 8.5, bold, [0.1, 0.1, 0.14]));

  const partyEndY = 696 - Math.max(selRows.length, buyerRows.length) * 14 - 14;
  iLine(partyEndY);

  // ── ITEMS TABLE ──
  const TY = partyEndY - 16;

  // Column x positions (right edge for numeric cols) — wider netto/brutto for Lato
  const TC = { name: 50, jm: 288, qty: 325, netto: 412, vpct: 450, vamt: 498, brutto: 545 };

  // Header row
  IP.drawRectangle({ x: 46, y: TY - 3, width: 503, height: 18, color: rgb(0.93, 0.92, 1.0) });
  iT("Nazwa usługi / opis", TC.name + 4, TY + 2, 7.5, true, [0.31, 0.27, 0.9]);
  iT("J.m.", TC.jm, TY + 2, 7.5, true, [0.31, 0.27, 0.9]);
  iT("Ilość", TC.jm, TY + 2, 7.5, true, [0.31, 0.27, 0.9], true, TC.qty);
  iT("Cena netto", TC.qty, TY + 2, 7.5, true, [0.31, 0.27, 0.9], true, TC.netto);
  iT("VAT", TC.netto, TY + 2, 7.5, true, [0.31, 0.27, 0.9], true, TC.vpct);
  iT("Kwota VAT", TC.vpct, TY + 2, 7.5, true, [0.31, 0.27, 0.9], true, TC.vamt);
  iT("Do zapłaty", TC.vamt, TY + 2, 7.5, true, [0.31, 0.27, 0.9], true, TC.brutto);

  // Item row — two explicit lines to avoid any auto-wrapping
  const IY = TY - 22;
  iT("Usługa generowania pisma formalnego", TC.name + 4, IY + 6, 8.5, false, [0.1, 0.1, 0.12]);
  iT("z podstawami prawnymi — writeback.pl", TC.name + 4, IY - 6, 8, false, [0.45, 0.45, 0.5]);
  iT("szt.", TC.jm, IY, 8.5);
  iT("1", TC.jm, IY, 8.5, false, [0.1,0.1,0.12], true, TC.qty);
  iT(fmtPLN(netAmount), TC.qty, IY, 8.5, false, [0.1,0.1,0.12], true, TC.netto);
  iT("23%", TC.netto, IY, 8.5, false, [0.1,0.1,0.12], true, TC.vpct);
  iT(fmtPLN(vatAmount), TC.vpct, IY, 8.5, false, [0.1,0.1,0.12], true, TC.vamt);
  iT(fmtPLN(grossAmount), TC.vamt, IY, 8.5, true, [0.1,0.1,0.12], true, TC.brutto);

  const tableBottomY = IY - 22;
  iLine(tableBottomY);

  // ── SUMMARY ──
  const SX = 360, SY = tableBottomY - 18;

  iT("Razem netto:", SX, SY, 8.5, false, [0.45, 0.45, 0.5]);
  iT(fmtPLN(netAmount), SX, SY, 8.5, false, [0.1,0.1,0.12], true, 545);

  iT("VAT (23%):", SX, SY - 16, 8.5, false, [0.45, 0.45, 0.5]);
  iT(fmtPLN(vatAmount), SX, SY - 16, 8.5, false, [0.1,0.1,0.12], true, 545);

  iLine(SY - 28, SX, 545);

  IP.drawRectangle({ x: SX - 6, y: SY - 50, width: 551 - SX, height: 20, color: rgb(0.18, 0.16, 0.55) });
  iT("DO ZAPŁATY:", SX, SY - 44, 9.5, true, [0.76, 0.74, 1.0]);
  iT(fmtPLN(grossAmount), SX, SY - 44, 9.5, true, [1, 1, 1], true, 545);

  // ── PAYMENT BOX ──
  const PY = SY - 82;
  IP.drawRectangle({ x: 46, y: PY - 6, width: 300, height: 50, color: rgb(0.97, 0.97, 0.98) });
  iT("Forma płatności:", 56, PY + 28, 8, true, [0.15, 0.15, 0.2]);
  iT("Karta płatnicza / BLIK (Stripe)", 155, PY + 28, 8, false, [0.35, 0.35, 0.4]);
  iT("Status:", 56, PY + 14, 8, true, [0.15, 0.15, 0.2]);
  iT("OPŁACONO", 155, PY + 14, 8, true, [0.06, 0.52, 0.32]);
  iT(`Nr ref: ${session.id.slice(0, 38)}`, 56, PY, 6.5, false, [0.55, 0.55, 0.6]);

  // ── FOOTER ──
  iLine(40);
  iT("Faktura wystawiona elektronicznie — nie wymaga podpisu.", 50, 28, 7, false, [0.5, 0.5, 0.55]);
  iT("Maciej Perzankowski · NIP: 8361881457 · REGON: 52381424900000 · hello@writeback.pl · writeback.pl", 50, 16, 7, false, [0.5, 0.5, 0.55]);

  const invoicePdfBytes = await invDoc.save();

  // ─────────────────────────────────────────────────────────────────
  // EMAIL
  // ─────────────────────────────────────────────────────────────────
  const deadlineDate = new Date();
  deadlineDate.setDate(deadlineDate.getDate() + 14);
  const deadline = deadlineDate.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });

  const pdfFilename = `reklamacja-${m.nazwa_sklepu.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`;
  const invoiceFilename = `faktura-${invoiceNumber.replace(/\//g, "-")}.pdf`;

  const stepsData = [
    { emoji: "📄", bg: "#eef2ff", color: "#111827", title: "Otwórz załącznik PDF",            desc: "Twoje gotowe pismo reklamacyjne jest w załączniku do tego emaila." },
    { emoji: "📤", bg: "#eef2ff", color: "#111827", title: "Wyślij pismo do adresata",         desc: "Emailem na adres obsługi klienta lub listem poleconym za potwierdzeniem odbioru." },
    { emoji: "🗓️", bg: "#eef2ff", color: "#111827", title: "Zachowaj potwierdzenie wysyłki",  desc: "Data wysyłki jest kluczowa — od niej biegnie ustawowy termin odpowiedzi." },
    { emoji: "✅", bg: "#f0fdf4", color: "#065f46", title: `Termin mija: ${deadline}`,         desc: "Brak odpowiedzi w 14 dniach = reklamacja uznana za zasadną z mocy prawa (art. 7a UPK)." },
  ];

  const stepsHtml = stepsData.map(s => `
    <tr>
      <td style="padding:0 0 16px 0">
        <table cellpadding="0" cellspacing="0" width="100%"><tr>
          <td width="44" valign="top">
            <div style="width:36px;height:36px;background:${s.bg};border-radius:9px;text-align:center;line-height:36px;font-size:18px">${s.emoji}</div>
          </td>
          <td style="padding-left:12px;vertical-align:top">
            <div style="font-size:14px;font-weight:600;color:${s.color};margin-bottom:3px;font-family:-apple-system,BlinkMacSystemFont,sans-serif">${s.title}</div>
            <div style="font-size:13px;color:#6b7280;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,sans-serif">${s.desc}</div>
          </td>
        </tr></table>
      </td>
    </tr>`).join("");

  const F = `-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;

  const html = `<!DOCTYPE html>
<html lang="pl" style="color-scheme:light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Twoje pismo reklamacyjne — Writeback</title>
  <style>
    :root { color-scheme: light; }
    @media (prefers-color-scheme: dark) {
      body, table, td, div { color-scheme: light !important; }
      .em-body { background:#0f172a !important; }
      .em-card { background:#ffffff !important; border-color:#e2e8f0 !important; }
      .em-card-bg { background:#f8fafc !important; }
      .em-text-dark { color:#1e293b !important; }
      .em-text-muted { color:#475569 !important; }
      .em-text-gray { color:#64748b !important; }
      .em-border { border-color:#e2e8f0 !important; }
    }
  </style>
</head>
<body class="em-body" style="margin:0;padding:0;background:#0f172a;font-family:${F};color-scheme:light">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:36px 16px 48px">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">

  <!-- Logo -->
  <tr><td style="padding-bottom:24px">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="background:#4f46e5;width:34px;height:34px;border-radius:9px;text-align:center;vertical-align:middle">
        <span style="font-size:17px;font-weight:800;color:#fff;line-height:34px;display:block;font-family:${F}">W</span>
      </td>
      <td style="padding-left:10px;font-size:18px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;vertical-align:middle;font-family:${F}">writeback</td>
    </tr></table>
  </td></tr>

  <!-- Hero -->
  <tr><td style="background:linear-gradient(145deg,#1e1b4b 0%,#312e81 60%,#4338ca 100%);border-radius:20px 20px 0 0;padding:40px 40px 36px;position:relative">
    <!-- Success badge -->
    <table cellpadding="0" cellspacing="0" style="margin-bottom:20px"><tr>
      <td style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.25);border-radius:100px;padding:5px 13px">
        <span style="font-size:12px;font-weight:600;color:#6ee7b7;font-family:${F};letter-spacing:0.2px">&#10003;&nbsp; Wygenerowano pomyślnie</span>
      </td>
    </tr></table>
    <!-- Heading -->
    <div style="font-size:26px;font-weight:800;color:#ffffff;line-height:1.25;margin-bottom:12px;font-family:${F};letter-spacing:-0.5px">
      Twoje pismo<br>reklamacyjne jest gotowe
    </div>
    <div style="font-size:15px;color:#a5b4fc;line-height:1.65;font-family:${F};margin-bottom:24px">
      Reklamacja do <strong style="color:#e0e7ff;font-weight:700">${m.nazwa_sklepu}</strong> czeka w załączniku.<br>
      Sklep ma <strong style="color:#ffffff;font-weight:700">14 dni</strong> na odpowiedź — brak reakcji = reklamacja uznana z mocy prawa.
    </div>
    <!-- Stats row -->
    <table cellpadding="0" cellspacing="0" width="100%"><tr>
      <td style="background:rgba(255,255,255,0.07);border-radius:12px;padding:14px 18px;width:48%">
        <div style="font-size:11px;color:#818cf8;font-weight:600;text-transform:uppercase;letter-spacing:0.7px;margin-bottom:4px;font-family:${F}">Termin odpowiedzi</div>
        <div style="font-size:15px;font-weight:700;color:#fff;font-family:${F}">${deadline}</div>
      </td>
      <td width="4%"></td>
      <td style="background:rgba(255,255,255,0.07);border-radius:12px;padding:14px 18px;width:48%">
        <div style="font-size:11px;color:#818cf8;font-weight:600;text-transform:uppercase;letter-spacing:0.7px;margin-bottom:4px;font-family:${F}">Żądanie</div>
        <div style="font-size:13px;font-weight:700;color:#c7d2fe;font-family:${F};line-height:1.3">${m.zadanie.length > 40 ? m.zadanie.slice(0, 40) + "…" : m.zadanie}</div>
      </td>
    </tr></table>
  </td></tr>

  <!-- White card -->
  <tr><td style="background:#ffffff;border-radius:0 0 20px 20px;border:1px solid #e2e8f0;border-top:none;padding:0 40px 40px">

    <!-- PDF attachments -->
    <table cellpadding="0" cellspacing="0" width="100%" style="margin:28px 0 0">
      <tr>
        <td style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px 14px 0 0;padding:16px 20px;border-bottom:none">
          <table cellpadding="0" cellspacing="0" width="100%"><tr>
            <td width="44" valign="middle">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="background:#eef2ff;width:44px;height:44px;border-radius:10px;text-align:center;vertical-align:middle">
                  <span style="font-size:9px;font-weight:800;color:#4f46e5;font-family:Arial,sans-serif;letter-spacing:0.5px">PDF</span>
                </td>
              </tr></table>
            </td>
            <td style="padding-left:14px" valign="middle">
              <div style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:2px;font-family:${F}">${pdfFilename}</div>
              <div style="font-size:12px;color:#94a3b8;font-family:${F}">Pismo reklamacyjne PDF · Załącznik do tego emaila</div>
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:0 0 14px 14px;padding:14px 20px;border-top:1px solid #e2e8f0">
          <table cellpadding="0" cellspacing="0" width="100%"><tr>
            <td width="44" valign="middle">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="background:#f0fdf4;width:44px;height:44px;border-radius:10px;text-align:center;vertical-align:middle">
                  <span style="font-size:8px;font-weight:800;color:#059669;font-family:Arial,sans-serif;letter-spacing:0.5px">FV</span>
                </td>
              </tr></table>
            </td>
            <td style="padding-left:14px" valign="middle">
              <div style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:2px;font-family:${F}">${invoiceFilename}</div>
              <div style="font-size:12px;color:#94a3b8;font-family:${F}">Faktura VAT ${invoiceNumber} · ${grossAmount.toFixed(2)} zł brutto</div>
            </td>
          </tr></table>
        </td>
      </tr>
    </table>
    <div style="height:28px"></div>

    <!-- Order summary -->
    <div style="margin-bottom:28px">
      <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:14px;font-family:${F}">Podsumowanie</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f1f5f9">
        <tr>
          <td style="font-size:13px;color:#64748b;padding:10px 0;border-bottom:1px solid #f1f5f9;font-family:${F};width:90px">Produkt</td>
          <td style="font-size:13px;color:#1e293b;font-weight:600;text-align:right;padding:10px 0;border-bottom:1px solid #f1f5f9;font-family:${F};max-width:260px">${m.produkt}${m.cena ? " · " + m.cena + " zł" : ""}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#64748b;padding:10px 0;border-bottom:1px solid #f1f5f9;font-family:${F};width:90px">Adresat</td>
          <td style="font-size:13px;color:#1e293b;font-weight:600;text-align:right;padding:10px 0;border-bottom:1px solid #f1f5f9;font-family:${F};max-width:260px">${m.nazwa_sklepu}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#64748b;padding:10px 0;font-family:${F};width:90px">Żądanie</td>
          <td style="font-size:13px;color:#4f46e5;font-weight:700;text-align:right;padding:10px 0;font-family:${F};word-wrap:break-word;word-break:break-word"><div style="max-width:260px;margin-left:auto">${m.zadanie}</div></td>
        </tr>
      </table>
    </div>

    <!-- Divider -->
    <div style="height:1px;background:#f1f5f9;margin-bottom:28px"></div>

    <!-- Steps -->
    <div style="margin-bottom:28px">
      <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:18px;font-family:${F}">Co dalej?</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${stepsHtml}
      </table>
    </div>

    <!-- Support box -->
    <table cellpadding="0" cellspacing="0" width="100%"><tr>
      <td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid #4f46e5;border-radius:0 12px 12px 0;padding:16px 20px">
        <div style="font-size:13px;font-weight:700;color:#1e293b;margin-bottom:4px;font-family:${F}">Pismo nie pomogło?</div>
        <div style="font-size:13px;color:#475569;line-height:1.6;font-family:${F}">
          Napisz na <a href="mailto:hello@writeback.pl" style="color:#4f46e5;font-weight:600;text-decoration:none">hello@writeback.pl</a> — odwołanie do wyższej instancji przygotujemy za darmo.
        </div>
      </td>
    </tr></table>

  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:28px 4px 0;text-align:center">
    <p style="margin:0 0 6px;font-size:12px;color:#475569;line-height:1.8;font-family:${F}">
      <strong style="color:#94a3b8">writeback.pl</strong> &nbsp;·&nbsp; Maciej Perzankowski<br>
      ul. 19-go Lutego 8/14, 96-100 Skierniewice &nbsp;·&nbsp; NIP: 8361881457
    </p>
    <p style="margin:0;font-size:12px;color:#475569;font-family:${F}">
      <a href="https://writeback.pl/regulamin" style="color:#64748b;text-decoration:underline">Regulamin</a>
      &nbsp;&middot;&nbsp;
      <a href="https://writeback.pl/polityka" style="color:#64748b;text-decoration:underline">Polityka prywatności</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>

</body>
</html>`;

  await getResend().emails.send({
    from: "Writeback <hello@writeback.pl>",
    to: m.email,
    subject: `✓ Pismo do ${m.nazwa_sklepu} gotowe — Writeback`,
    html,
    attachments: [
      {
        filename: pdfFilename,
        content: Buffer.from(pdfBytes).toString("base64"),
      },
      {
        filename: invoiceFilename,
        content: Buffer.from(invoicePdfBytes).toString("base64"),
      },
    ],
  });
  }); // end after()

  return NextResponse.json({ received: true });
}
