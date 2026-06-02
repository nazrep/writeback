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
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
        <h2 style="font-size:20px;font-weight:700;margin-bottom:8px">Pismo gotowe do wysłania</h2>
        <p style="color:#555;font-size:14px;margin-bottom:24px">
          Twoja reklamacja do <strong>${m.nazwa_sklepu}</strong> jest w załączniku.<br/>
          Sklep ma <strong>14 dni</strong> na odpowiedź.
        </p>
        <div style="background:#f9f9f9;border-radius:12px;padding:16px 20px;margin-bottom:24px;font-size:13px;color:#333">
          <strong>Co dalej:</strong><br/><br/>
          1. Wydrukuj i wyślij listem poleconym <em>lub</em><br/>
          2. Wyślij emailem na adres obsługi klienta sklepu<br/>
          3. Zachowaj potwierdzenie wysyłki<br/>
          4. Jeśli sklep nie odpowie w 14 dniach — napisz do nas
        </div>
        <p style="font-size:12px;color:#999">
          Jeśli pismo nie pomoże — napisz na hello@writeback.pl, odwołanie napiszemy za darmo.
        </p>
      </div>
    `,
    attachments: [{
      filename: `reklamacja-${m.nazwa_sklepu.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`,
      content: Buffer.from(pdfBytes).toString("base64"),
    }],
  });

  return NextResponse.json({ ok: true });
}
