import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Anthropic from "@anthropic-ai/sdk";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
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
  const userPrompt = (PROMPTS[docType] ?? PROMPTS.sklep) + "\n\nTylko gotowe pismo, bez komentarzy. Nie używaj markdownu — zwykły tekst.";

  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const pismoText = (msg.content[0] as { type: string; text: string }).text;

  // Generuj PDF
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const fontDir = path.join(process.cwd(), "public", "fonts");
  const regularBytes = fs.readFileSync(path.join(fontDir, "Lato-Regular.ttf"));
  const boldBytes = fs.readFileSync(path.join(fontDir, "Lato-Bold.ttf"));
  const font = await pdfDoc.embedFont(regularBytes);
  const boldFont = await pdfDoc.embedFont(boldBytes);

  const W = 595, H = 842;
  const marginX = 64, marginY = 56;
  const contentW = W - marginX * 2;
  let page = pdfDoc.addPage([W, H]);
  let y = H - marginY;

  const INDIGO: [number, number, number] = [0.31, 0.27, 0.9];
  const GRAY: [number, number, number] = [0.45, 0.45, 0.45];
  const BLACK: [number, number, number] = [0.1, 0.1, 0.1];

  function wrap(text: string, maxW: number, size: number, f: typeof font) {
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

  function newPageIfNeeded(needed: number) {
    if (y - needed < marginY) {
      page = pdfDoc.addPage([W, H]);
      y = H - marginY;
    }
  }

  function drawLine(text: string, opts: { size?: number; bold?: boolean; color?: [number, number, number]; x?: number; maxW?: number } = {}) {
    const size = opts.size ?? 10;
    const f = opts.bold ? boldFont : font;
    const [r, g, b] = opts.color ?? BLACK;
    const x = opts.x ?? marginX;
    const maxW = opts.maxW ?? contentW;
    if (!text) { y -= size * 0.8; return; }
    const lines = wrap(text, maxW, size, f);
    for (const line of lines) {
      newPageIfNeeded(size + 4);
      page.drawText(line, { x, y, size, font: f, color: rgb(r, g, b) });
      y -= size + 4;
    }
  }

  // ── Header bar ──
  page.drawRectangle({ x: 0, y: H - 36, width: W, height: 36, color: rgb(...INDIGO) });
  page.drawText("writeback.pl", { x: marginX, y: H - 24, size: 11, font: boldFont, color: rgb(1, 1, 1) });
  const dateStr = `Wygenerowano: ${today}`;
  const dateW = font.widthOfTextAtSize(dateStr, 8);
  page.drawText(dateStr, { x: W - marginX - dateW, y: H - 23, size: 8, font, color: rgb(0.85, 0.85, 1) });

  y = H - 36 - 32;

  // ── Tytuł ──
  drawLine("PISMO REKLAMACYJNE", { size: 15, bold: true, color: [0.1, 0.1, 0.15] });
  y -= 4;
  page.drawRectangle({ x: marginX, y, width: 48, height: 2, color: rgb(...INDIGO) });
  y -= 18;

  // ── Treść pisma ──
  const paragraphs = pismoText.split("\n");
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) { y -= 6; continue; }
    const isHeading = trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 80;
    if (isHeading) {
      y -= 4;
      drawLine(trimmed, { size: 10, bold: true, color: [0.15, 0.15, 0.2] });
      y -= 2;
    } else {
      drawLine(trimmed, { size: 10, color: BLACK });
    }
  }

  // ── Footer na każdej stronie ──
  const pageCount = pdfDoc.getPageCount();
  for (let i = 0; i < pageCount; i++) {
    const p = pdfDoc.getPage(i);
    p.drawLine({ start: { x: marginX, y: marginY - 8 }, end: { x: W - marginX, y: marginY - 8 }, thickness: 0.5, color: rgb(0.85, 0.85, 0.85) });
    p.drawText("Dokument wygenerowany przez writeback.pl · Narzędzie do tworzenia pism, nie porada prawna", {
      x: marginX, y: marginY - 20, size: 7, font, color: rgb(...GRAY),
    });
    const pageNum = `${i + 1} / ${pageCount}`;
    const pgW = font.widthOfTextAtSize(pageNum, 7);
    p.drawText(pageNum, { x: W - marginX - pgW, y: marginY - 20, size: 7, font, color: rgb(...GRAY) });
  }

  const pdfBytes = await pdfDoc.save();

  // Wyślij email
  await resend.emails.send({
    from: "Writeback <hello@writeback.pl>",
    to: m.email,
    subject: `Twoje pismo reklamacyjne — ${m.nazwa_sklepu}`,
    html: `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">

        <!-- Logo -->
        <tr><td style="padding-bottom:24px">
          <span style="font-size:20px;font-weight:800;color:#1e1b4b;letter-spacing:-0.5px">writeback</span>
        </td></tr>

        <!-- Card główna -->
        <tr><td style="background:#ffffff;border-radius:16px;padding:40px 36px;border:1px solid #e5e7eb">

          <!-- Status badge -->
          <div style="display:inline-block;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:100px;padding:6px 14px;margin-bottom:24px">
            <span style="font-size:12px;font-weight:600;color:#065f46">✓ Pismo wygenerowane</span>
          </div>

          <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;line-height:1.3">
            Twoje pismo jest gotowe do wysłania
          </h1>
          <p style="margin:0 0 28px;font-size:15px;color:#6b7280;line-height:1.6">
            Reklamacja do <strong style="color:#111827">${m.nazwa_sklepu}</strong> czeka w załączniku.<br>
            Sklep ma <strong style="color:#111827">14 dni</strong> na odpowiedź — brak odpowiedzi = reklamacja uznana.
          </p>

          <!-- Separator -->
          <div style="border-top:1px solid #f3f4f6;margin-bottom:28px"></div>

          <!-- Szczegóły zamówienia -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
            <tr>
              <td style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;padding-bottom:12px">Szczegóły zamówienia</td>
            </tr>
            <tr>
              <td style="background:#f9fafb;border-radius:10px;padding:16px 20px">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:13px;color:#6b7280;padding-bottom:8px">Produkt</td>
                    <td style="font-size:13px;color:#111827;font-weight:500;text-align:right;padding-bottom:8px">${m.produkt}</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#6b7280;padding-bottom:8px">Sklep</td>
                    <td style="font-size:13px;color:#111827;font-weight:500;text-align:right;padding-bottom:8px">${m.nazwa_sklepu}</td>
                  </tr>
                  <tr>
                    <td style="font-size:13px;color:#6b7280">Żądanie</td>
                    <td style="font-size:13px;color:#111827;font-weight:500;text-align:right">${m.zadanie}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Co dalej -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
            <tr>
              <td style="font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;padding-bottom:12px">Co dalej?</td>
            </tr>
            ${[
              ["1", "Otwórz załącznik PDF", "To jest Twoje pismo reklamacyjne"],
              ["2", "Wyślij do sklepu", "Emailem na adres obsługi klienta lub listem poleconym"],
              ["3", "Zachowaj potwierdzenie", "Data wysyłki jest ważna — liczy się 14-dniowy termin odpowiedzi"],
              ["4", "Czekaj 14 dni", "Brak odpowiedzi w terminie = reklamacja uznana za zasadną (art. 7a)"],
            ].map(([n, title, desc]) => `
            <tr><td style="padding-bottom:12px">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="width:28px;vertical-align:top;padding-top:1px">
                  <div style="width:22px;height:22px;background:#4f46e5;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:700;color:#fff">${n}</div>
                </td>
                <td style="padding-left:12px">
                  <div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:2px">${title}</div>
                  <div style="font-size:13px;color:#6b7280">${desc}</div>
                </td>
              </tr></table>
            </td></tr>`).join("")}
          </table>

          <!-- Separator -->
          <div style="border-top:1px solid #f3f4f6;margin-bottom:24px"></div>

          <!-- Odwołanie gratis -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:#eff6ff;border-radius:10px;padding:16px 20px">
              <p style="margin:0;font-size:13px;color:#1e40af;line-height:1.6">
                <strong>Pismo nie pomogło?</strong><br>
                Napisz do nas na <a href="mailto:hello@writeback.pl" style="color:#4f46e5;text-decoration:none;font-weight:600">hello@writeback.pl</a> — odwołanie napiszemy za darmo.
              </p>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 0 0;text-align:center">
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.8">
            writeback.pl · Maciej Perzankowski Software Solutions<br>
            ul. 19-go Lutego 8/14, 96-100 Skierniewice · NIP: 8361881457<br>
            <a href="https://writeback.pl/regulamin" style="color:#9ca3af">Regulamin</a> ·
            <a href="https://writeback.pl/polityka" style="color:#9ca3af">Polityka prywatności</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    attachments: [{
      filename: `reklamacja-${m.nazwa_sklepu.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`,
      content: Buffer.from(pdfBytes).toString("base64"),
    }],
  });

  return NextResponse.json({ ok: true });
}
