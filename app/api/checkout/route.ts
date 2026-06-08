import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Anthropic from "@anthropic-ai/sdk";

let _stripe: Stripe | null = null;
function getStripe() {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  return _stripe;
}

const getAnthropic = () => new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const DOC_TYPE_NAMES: Record<string, string> = {
  sklep: "Reklamacja do sklepu internetowego",
  bank: "Reklamacja do banku / ubezpieczyciela",
  zus: "Odwołanie od decyzji ZUS / US",
  umowa: "Wypowiedzenie umowy",
  uokik: "Skarga do UOKiK / Rzecznika",
  skarga: "Skarga konsumencka",
  lot: "Odszkodowanie za opóźniony / odwołany lot",
  wezwanie: "Wezwanie do zapłaty",
  mandat: "Odwołanie od mandatu",
};

function trunc(s: string | undefined, n: number) {
  return (s ?? "").slice(0, n);
}

async function extractImageContext(image_base64: string): Promise<string> {
  try {
    const msg = await getAnthropic().messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 120,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: image_base64 } },
          { type: "text", text: "Opisz zwięźle (max 150 znaków) co widać na tym dokumencie w kontekście reklamacji. Tylko opis, bez wstępu:" },
        ],
      }],
    });
    const text = msg.content[0].type === "text" ? msg.content[0].text.trim() : "";
    return text.slice(0, 200);
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const docType = data.doc_type || "sklep";
  const docTypeName = DOC_TYPE_NAMES[docType] ?? DOC_TYPE_NAMES.sklep;

  const imageContext = data.image_base64 ? await extractImageContext(data.image_base64) : "";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "pln",
          product_data: {
            name: `${docTypeName} — Writeback`,
            description: trunc(`${data.nazwa_sklepu} · ${data.produkt}`, 200),
          },
          unit_amount: 2900,
        },
        quantity: 1,
      }],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_URL}/zamow/gotowe?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/zamow`,
      customer_email: data.email,
      metadata: {
        doc_type: docType,
        imie_nazwisko: trunc(data.imie_nazwisko, 200),
        adres: trunc(data.adres, 200),
        email: trunc(data.email, 200),
        produkt: trunc(data.produkt, 200),
        cena: trunc(data.cena, 50),
        data_zakupu: trunc(data.data_zakupu, 50),
        numer_zamowienia: trunc(data.numer_zamowienia, 100),
        opis: trunc(data.opis, 450),
        podjete_kroki: trunc(data.podjete_kroki, 300),
        zadanie: trunc(data.zadanie, 200),
        nazwa_sklepu: trunc(data.nazwa_sklepu, 200),
        adres_sklepu: trunc(data.adres_sklepu, 200),
        skarga_subtype: trunc(data.skarga_subtype ?? "", 50),
        image_context: imageContext,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
