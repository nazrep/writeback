import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Anthropic from "@anthropic-ai/sdk";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);
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

  const session = event.data.object as Stripe.Checkout.Session;
  const m = session.metadata!;
  const docType = m.doc_type || "sklep";

  const today = new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });

  const SYSTEMS: Record<string, string> = {
    sklep: `Jesteś ekspertem prawa konsumenckiego w Polsce. Piszesz profesjonalne pisma reklamacyjne w imieniu konsumentów.
Twoje pisma są formalne, asertywne, powołują się na właściwe przepisy prawa z numerami artykułów.
Używaj przepisów: Ustawa z dnia 30 maja 2014 r. o prawach konsumenta (Dz.U. 2014 poz. 827), art. 43a-43g (niezgodność towaru z umową), art. 556-576 KC (rękojmia), art. 548 KC.
Termin odpowiedzi: 14 dni kalendarzowych (art. 7a UPK). Brak odpowiedzi = uznanie reklamacji za zasadną.`,

    bank: `Jesteś ekspertem prawa bankowego i ubezpieczeniowego w Polsce. Piszesz profesjonalne pisma reklamacyjne do banków i ubezpieczycieli.
Twoje pisma są formalne, asertywne, powołują się na właściwe przepisy.
Używaj przepisów: Ustawa z dnia 5 sierpnia 2015 r. o rozpatrywaniu reklamacji przez podmioty rynku finansowego (Dz.U. 2015 poz. 1348), Ustawa Prawo bankowe (Dz.U. 1997 poz. 939), Ustawa o usługach płatniczych z dnia 19 sierpnia 2011 r.
Podmiot rynku finansowego ma 30 dni na odpowiedź (15 dni w sprawach szczególnie skomplikowanych do 60 dni). Brak odpowiedzi = uznanie reklamacji za zasadną.`,

    zus: `Jesteś ekspertem prawa ubezpieczeń społecznych i administracyjnego w Polsce. Piszesz profesjonalne odwołania od decyzji ZUS i Urzędu Skarbowego.
Twoje pisma są formalne, precyzyjne, powołują się na właściwe przepisy.
Używaj przepisów: Ustawa z dnia 13 października 1998 r. o systemie ubezpieczeń społecznych, Kodeks postępowania administracyjnego (KPA) — art. 127-140 (odwołanie), art. 156 (nieważność decyzji), Ustawa z dnia 17 grudnia 1998 r. o emeryturach i rentach z FUS.
Odwołanie składa się w terminie 30 dni od doręczenia decyzji (art. 129 KPA) za pośrednictwem organu który wydał decyzję.`,

    umowa: `Jesteś ekspertem prawa cywilnego i konsumenckiego w Polsce. Piszesz profesjonalne pisma wypowiadające umowy w imieniu konsumentów.
Twoje pisma są formalne, precyzyjne, powołują się na właściwe przepisy.
Używaj przepisów: Kodeks cywilny art. 746-750 (wypowiedzenie umów zlecenia/o świadczenie usług), art. 365(1) KC (wypowiedzenie umów na czas nieokreślony), Ustawa o prawach konsumenta art. 27-38 (prawo odstąpienia), Ustawa o świadczeniu usług drogą elektroniczną.
Wskazuj konkretną datę skuteczności wypowiedzenia z uwzględnieniem okresu wypowiedzenia.`,

    uokik: `Jesteś ekspertem prawa ochrony konsumentów w Polsce. Piszesz profesjonalne skargi do UOKiK i Rzecznika Praw Konsumentów.
Twoje pisma są formalne, precyzyjne, zawierają kompletny opis naruszeń.
Używaj przepisów: Ustawa z dnia 16 lutego 2007 r. o ochronie konkurencji i konsumentów (Dz.U. 2007 nr 50 poz. 331), Ustawa o prawach konsumenta art. 7a (14-dniowy termin odpowiedzi), Dyrektywa Omnibus 2019/2161.
Skarga powinna zawierać opis naruszenia, dowody, żądanie interwencji i pouczenie o możliwości mediacji.`,
  };

  const PROMPTS: Record<string, string> = {
    sklep: `Napisz pismo reklamacyjne:
KUPUJĄCY: ${m.imie_nazwisko}, ${m.adres}, ${m.email}
ADRESAT: ${m.nazwa_sklepu}${m.adres_sklepu ? ", " + m.adres_sklepu : ""}
PRODUKT: ${m.produkt}${m.cena ? ", " + m.cena + " zł" : ""}, zakup: ${m.data_zakupu}${m.numer_zamowienia ? ", nr zamówienia: " + m.numer_zamowienia : ""}
SYTUACJA: ${m.opis}
${m.podjete_kroki ? "PODJĘTE KROKI: " + m.podjete_kroki : ""}
ŻĄDANIE: ${m.zadanie}
DATA: ${today}`,

    bank: `Napisz reklamację do banku / ubezpieczyciela:
SKŁADAJĄCY: ${m.imie_nazwisko}, ${m.adres}, ${m.email}
ADRESAT: ${m.nazwa_sklepu}${m.adres_sklepu ? ", " + m.adres_sklepu : ""}
PRODUKT/USŁUGA: ${m.produkt}${m.cena ? ", kwota: " + m.cena + " zł" : ""}
DATA ZDARZENIA: ${m.data_zakupu}${m.numer_zamowienia ? ", nr umowy/rachunku: " + m.numer_zamowienia : ""}
SYTUACJA: ${m.opis}
${m.podjete_kroki ? "KONTAKT Z BANKIEM: " + m.podjete_kroki : ""}
ŻĄDANIE: ${m.zadanie}
DATA: ${today}`,

    zus: `Napisz odwołanie od decyzji ZUS/US:
ODWOŁUJĄCY: ${m.imie_nazwisko}, ${m.adres}, ${m.email}
ORGAN: ${m.nazwa_sklepu}${m.adres_sklepu ? ", " + m.adres_sklepu : ""}
PRZEDMIOT: ${m.produkt}
DATA DECYZJI: ${m.data_zakupu}${m.numer_zamowienia ? ", nr decyzji: " + m.numer_zamowienia : ""}
UZASADNIENIE: ${m.opis}
${m.podjete_kroki ? "DOTYCHCZASOWE KROKI: " + m.podjete_kroki : ""}
ŻĄDANIE: ${m.zadanie}
DATA: ${today}`,

    umowa: `Napisz wypowiedzenie umowy:
WYPOWIADAJĄCY: ${m.imie_nazwisko}, ${m.adres}, ${m.email}
FIRMA: ${m.nazwa_sklepu}${m.adres_sklepu ? ", " + m.adres_sklepu : ""}
TYP UMOWY: ${m.produkt}${m.cena ? ", opłata: " + m.cena + " zł/mies." : ""}
DATA ZAWARCIA: ${m.data_zakupu}${m.numer_zamowienia ? ", nr umowy: " + m.numer_zamowienia : ""}
OKOLICZNOŚCI: ${m.opis}
${m.podjete_kroki ? "KONTAKT Z FIRMĄ: " + m.podjete_kroki : ""}
ŻĄDANIE: ${m.zadanie}
DATA: ${today}`,

    uokik: `Napisz skargę do UOKiK / Rzecznika Praw Konsumentów:
SKŁADAJĄCY: ${m.imie_nazwisko}, ${m.adres}, ${m.email}
FIRMA KTÓREJ DOTYCZY: ${m.nazwa_sklepu}${m.adres_sklepu ? ", " + m.adres_sklepu : ""}
PRZEDMIOT: ${m.produkt}${m.cena ? ", wartość sporu: " + m.cena + " zł" : ""}
DATA REKLAMACJI DO FIRMY: ${m.data_zakupu}${m.numer_zamowienia ? ", nr reklamacji: " + m.numer_zamowienia : ""}
OPIS NARUSZENIA: ${m.opis}
HISTORIA KONTAKTU: ${m.podjete_kroki || "Brak odpowiedzi na reklamację"}
ŻĄDANIE: ${m.zadanie}
DATA: ${today}`,
  };

  const systemPrompt = SYSTEMS[docType] ?? SYSTEMS.sklep;
  const imageCtx = m.image_context ? `\nDODATKOWY KONTEKST ZE ZDJĘCIA DOKUMENTU: ${m.image_context}` : "";
  const userPrompt = (PROMPTS[docType] ?? PROMPTS.sklep) + imageCtx + "\n\nTylko gotowe pismo, bez komentarzy. Nie używaj markdownu — zwykły tekst.";

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
    p.drawText("Dokument wygenerowany przez writeback.pl · Narzędzie do tworzenia pism konsumenckich, nie porada prawna", {
      x: marginX, y: marginBottom - 16, size: 6.5, font, color: rgb(...C_GRAY),
    });
  }

  // ── TOP HEADER BAR ──
  const headerH = 40;
  page.drawRectangle({ x: 0, y: H - headerH, width: W, height: headerH, color: rgb(...C_INDIGO_DARK) });
  // Logo square
  page.drawRectangle({ x: marginX, y: H - headerH + 8, width: 24, height: 24, color: rgb(...C_INDIGO) });
  page.drawText("W", { x: marginX + 7, y: H - headerH + 15, size: 12, font: boldFont, color: rgb(1, 1, 1) });
  page.drawText("writeback.pl", { x: marginX + 32, y: H - headerH + 15, size: 11, font: boldFont, color: rgb(1, 1, 1) });
  const dateLabel = `Wygenerowano: ${today}`;
  const dateLabelW = font.widthOfTextAtSize(dateLabel, 8);
  page.drawText(dateLabel, { x: W - marginX - dateLabelW, y: H - headerH + 16, size: 8, font, color: rgb(0.7, 0.68, 1) });

  y = H - headerH - 28;

  // ── DOCUMENT TYPE BADGE ──
  const LABELS: Record<string, string> = {
    sklep: "PISMO REKLAMACYJNE",
    bank: "REKLAMACJA DO BANKU / UBEZPIECZYCIELA",
    zus: "ODWOŁANIE OD DECYZJI",
    umowa: "WYPOWIEDZENIE UMOWY",
    uokik: "SKARGA DO UOKiK / RZECZNIKA",
  };
  const docLabel = LABELS[docType] ?? "PISMO REKLAMACYJNE";
  const badgeW = boldFont.widthOfTextAtSize(docLabel, 9) + 24;
  page.drawRectangle({ x: marginX, y: y - 3, width: badgeW, height: 20, color: rgb(...C_INDIGO_LIGHT) });
  page.drawText(docLabel, { x: marginX + 12, y: y + 4, size: 9, font: boldFont, color: rgb(...C_INDIGO) });
  y -= 28;

  // ── THIN ACCENT LINE ──
  page.drawRectangle({ x: marginX, y: y, width: 36, height: 2.5, color: rgb(...C_INDIGO) });
  y -= 20;

  // ── MAIN LETTER CONTENT ──
  const paragraphs = pismoText.split("\n");
  let firstPara = true;

  for (const para of paragraphs) {
    const trimmed = para.trim();

    if (!trimmed) {
      y -= firstPara ? 0 : 7;
      continue;
    }
    firstPara = false;

    // Detect heading: all uppercase, short, no sentence-ending punctuation mid-line
    const isHeading = trimmed === trimmed.toUpperCase() && trimmed.length > 2 && trimmed.length < 90 && !/[a-z]/.test(trimmed);
    // Detect signature-area lines (short, right-side positioning)
    const isSignatureLine = trimmed.length < 50 && (
      trimmed.startsWith("Z poważaniem") || trimmed.startsWith("Z szacunkiem") ||
      trimmed.startsWith("Podpis") || trimmed.startsWith("..........") ||
      trimmed.startsWith("________________")
    );

    if (isHeading) {
      y -= 6;
      ensureSpace(22);
      page.drawRectangle({ x: marginX - 4, y: y - 3, width: contentW + 8, height: 18, color: rgb(...C_GRAY_LIGHT) });
      drawText(trimmed, { size: 9.5, bold: true, color: C_INDIGO_DARK, lineHeight: 16 });
      y -= 4;
    } else if (isSignatureLine) {
      drawText(trimmed, { size: 10, color: C_BLACK, x: W / 2, maxW: contentW / 2 });
    } else {
      drawText(trimmed, { size: 10, color: C_BLACK, lineHeight: 15.5 });
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
  // EMAIL
  // ─────────────────────────────────────────────────────────────────
  const steps = [
    { n: "1", title: "Otwórz załącznik PDF", desc: "To jest Twoje gotowe pismo reklamacyjne" },
    { n: "2", title: "Wyślij do sklepu", desc: "Emailem na adres obsługi klienta lub listem poleconym" },
    { n: "3", title: "Zachowaj potwierdzenie wysyłki", desc: "Data wysyłki jest kluczowa — od niej biegnie 14-dniowy termin" },
    { n: "4", title: "Czekaj 14 dni", desc: "Brak odpowiedzi = reklamacja uznana za zasadną (art. 7a UPK)" },
  ];

  const stepsHtml = steps.map(s => `
    <tr>
      <td style="padding:0 0 14px 0">
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="36" valign="top" style="padding-top:2px">
              <div style="width:26px;height:26px;background:#4f46e5;border-radius:50%;text-align:center;line-height:26px;font-size:12px;font-weight:700;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,sans-serif">${s.n}</div>
            </td>
            <td style="padding-left:10px">
              <div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:2px;font-family:-apple-system,BlinkMacSystemFont,sans-serif">${s.title}</div>
              <div style="font-size:13px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,sans-serif">${s.desc}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join("");

  const html = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Twoje pismo jest gotowe — Writeback</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px">

        <!-- Header z logo -->
        <tr><td style="padding-bottom:20px">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#4f46e5;width:32px;height:32px;border-radius:8px;text-align:center;vertical-align:middle">
                <span style="font-size:16px;font-weight:800;color:#ffffff;line-height:32px;display:block">W</span>
              </td>
              <td style="padding-left:10px;font-size:18px;font-weight:800;color:#1e1b4b;letter-spacing:-0.5px;vertical-align:middle">writeback</td>
            </tr>
          </table>
        </td></tr>

        <!-- Hero banner -->
        <tr><td style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 100%);border-radius:16px 16px 0 0;padding:36px 36px 32px">
          <div style="display:inline-block;background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.3);border-radius:100px;padding:5px 14px;margin-bottom:16px">
            <span style="font-size:12px;font-weight:600;color:#6ee7b7;font-family:-apple-system,BlinkMacSystemFont,sans-serif">✓ Pismo wygenerowane pomyślnie</span>
          </div>
          <h1 style="margin:0 0 10px;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;font-family:-apple-system,BlinkMacSystemFont,sans-serif">
            Twoje pismo jest gotowe
          </h1>
          <p style="margin:0;font-size:15px;color:#a5b4fc;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,sans-serif">
            Reklamacja do <strong style="color:#e0e7ff">${m.nazwa_sklepu}</strong> czeka w załączniku PDF.<br>
            Sklep ma <strong style="color:#ffffff">14 dni</strong> na odpowiedź — brak reakcji = reklamacja uznana.
          </p>
        </td></tr>

        <!-- Główna karta -->
        <tr><td style="background:#ffffff;border-radius:0 0 16px 16px;padding:0 36px 36px;border:1px solid #e2e8f0;border-top:none">

          <!-- Separator z ikonką -->
          <div style="text-align:center;padding:20px 0 24px">
            <div style="display:inline-block;width:40px;height:40px;background:#eef2ff;border-radius:10px;text-align:center;line-height:40px;font-size:18px">📎</div>
          </div>

          <!-- Szczegóły -->
          <div style="background:#f8fafc;border-radius:12px;padding:20px 22px;margin-bottom:28px;border:1px solid #e2e8f0">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:14px;font-family:-apple-system,BlinkMacSystemFont,sans-serif">Szczegóły zamówienia</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:13px;color:#64748b;padding-bottom:10px;font-family:-apple-system,BlinkMacSystemFont,sans-serif">Produkt</td>
                <td style="font-size:13px;color:#1e293b;font-weight:600;text-align:right;padding-bottom:10px;font-family:-apple-system,BlinkMacSystemFont,sans-serif">${m.produkt}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#64748b;padding-bottom:10px;font-family:-apple-system,BlinkMacSystemFont,sans-serif">Adresat pisma</td>
                <td style="font-size:13px;color:#1e293b;font-weight:600;text-align:right;padding-bottom:10px;font-family:-apple-system,BlinkMacSystemFont,sans-serif">${m.nazwa_sklepu}</td>
              </tr>
              <tr>
                <td style="font-size:13px;color:#64748b;font-family:-apple-system,BlinkMacSystemFont,sans-serif">Żądanie</td>
                <td style="font-size:13px;color:#4f46e5;font-weight:600;text-align:right;font-family:-apple-system,BlinkMacSystemFont,sans-serif">${m.zadanie}</td>
              </tr>
            </table>
          </div>

          <!-- Co dalej -->
          <div style="margin-bottom:28px">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:16px;font-family:-apple-system,BlinkMacSystemFont,sans-serif">Co dalej?</div>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${stepsHtml}
            </table>
          </div>

          <!-- Odwołanie gratis -->
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:18px 20px">
            <div style="font-size:13px;font-weight:700;color:#1d4ed8;margin-bottom:4px;font-family:-apple-system,BlinkMacSystemFont,sans-serif">
              💡 Pismo nie pomogło?
            </div>
            <div style="font-size:13px;color:#1e40af;line-height:1.6;font-family:-apple-system,BlinkMacSystemFont,sans-serif">
              Napisz do nas na <a href="mailto:hello@writeback.pl" style="color:#4f46e5;font-weight:600;text-decoration:none">hello@writeback.pl</a> — odwołanie przygotujemy za darmo.
            </div>
          </div>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:28px 0 8px;text-align:center">
          <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;line-height:1.8;font-family:-apple-system,BlinkMacSystemFont,sans-serif">
            <strong style="color:#64748b">writeback.pl</strong> · Maciej Perzankowski Software Solutions<br>
            ul. 19-go Lutego 8/14, 96-100 Skierniewice · NIP: 8361881457
          </p>
          <p style="margin:0;font-size:12px;color:#94a3b8;font-family:-apple-system,BlinkMacSystemFont,sans-serif">
            <a href="https://writeback.pl/regulamin" style="color:#94a3b8;text-decoration:underline">Regulamin</a>
            &nbsp;·&nbsp;
            <a href="https://writeback.pl/polityka" style="color:#94a3b8;text-decoration:underline">Polityka prywatności</a>
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
    subject: `Twoje pismo reklamacyjne — ${m.nazwa_sklepu}`,
    html,
    attachments: [{
      filename: `reklamacja-${m.nazwa_sklepu.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`,
      content: Buffer.from(pdfBytes).toString("base64"),
    }],
  });

  return NextResponse.json({ ok: true });
}
