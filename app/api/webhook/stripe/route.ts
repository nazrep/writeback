import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Anthropic from "@anthropic-ai/sdk";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Resend } from "resend";

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

  const today = new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });

  // Generuj pismo przez Claude
  const msg = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    system: `Jesteś ekspertem prawa konsumenckiego w Polsce. Piszesz profesjonalne pisma reklamacyjne w imieniu konsumentów.

Twoje pisma są formalne, asertywne, powołują się na właściwe przepisy prawa z numerami artykułów, zawierają precyzyjne żądania z terminem odpowiedzi.

Używaj przepisów:
- Ustawa z dnia 30 maja 2014 r. o prawach konsumenta (Dz.U. 2014 poz. 827)
- Art. 43a-43g Ustawy o prawach konsumenta (niezgodność towaru z umową — zakupy po 1.01.2023)
- Art. 556-576 Kodeksu cywilnego (rękojmia za wady)
- Art. 548 KC (ryzyko utraty przy dostawie)

Termin odpowiedzi: 14 dni kalendarzowych (art. 7a Ustawy o prawach konsumenta). Brak odpowiedzi = uznanie reklamacji za zasadną.`,
    messages: [{
      role: "user",
      content: `Napisz pismo reklamacyjne:

KUPUJĄCY: ${m.imie_nazwisko}, ${m.adres}, ${m.email}
SKLEP: ${m.nazwa_sklepu}${m.adres_sklepu ? ", " + m.adres_sklepu : ""}
PRODUKT: ${m.produkt}, ${m.cena} zł, zakup: ${m.data_zakupu}${m.numer_zamowienia ? ", nr zamówienia: " + m.numer_zamowienia : ""}
SYTUACJA: ${m.opis}
${m.podjete_kroki ? "PODJĘTE KROKI: " + m.podjete_kroki : ""}
ŻĄDANIE: ${m.zadanie}
DATA DZISIEJSZA: ${today}

Tylko gotowe pismo, bez komentarzy. Nie używaj markdownu — zwykły tekst.`,
    }],
  });

  const pismoText = (msg.content[0] as { type: string; text: string }).text;

  // Generuj PDF
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();
  const margin = 60;
  const maxWidth = width - margin * 2;
  const lineHeight = 16;
  let y = height - margin;

  function wrapText(text: string, maxW: number, fontSize: number, f: typeof font) {
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const test = current ? current + " " + word : word;
      if (f.widthOfTextAtSize(test, fontSize) > maxW) {
        if (current) lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function drawText(text: string, opts: { fontSize?: number; bold?: boolean; color?: [number, number, number] } = {}) {
    const fs = opts.fontSize ?? 10;
    const f = opts.bold ? boldFont : font;
    const [r, g, b] = opts.color ?? [0, 0, 0];

    if (text === "") { y -= lineHeight * 0.7; return; }

    const lines = wrapText(text, maxWidth, fs, f);
    for (const line of lines) {
      if (y < margin + lineHeight) {
        pdfDoc.addPage([595, 842]);
        y = height - margin;
      }
      page.drawText(line, { x: margin, y, size: fs, font: f, color: rgb(r, g, b) });
      y -= lineHeight;
    }
  }

  // Header
  drawText("PISMO REKLAMACYJNE", { fontSize: 14, bold: true });
  drawText("Wygenerowane przez writeback.pl", { fontSize: 8, color: [0.6, 0.6, 0.6] });
  y -= 10;

  // Treść pisma
  const paragraphs = pismoText.split("\n");
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) { drawText(""); continue; }
    const isBold = trimmed.toUpperCase() === trimmed && trimmed.length < 60;
    drawText(trimmed, { bold: isBold });
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
