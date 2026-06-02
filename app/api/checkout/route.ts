import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const data = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "blik", "p24"],
    line_items: [{
      price_data: {
        currency: "pln",
        product_data: {
          name: "Pismo reklamacyjne — Writeback",
          description: `Reklamacja do sklepu: ${data.nazwa_sklepu} · ${data.produkt}`,
        },
        unit_amount: 2900,
      },
      quantity: 1,
    }],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/zamow/gotowe?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/zamow`,
    customer_email: data.email,
    metadata: {
      imie_nazwisko: data.imie_nazwisko,
      adres: data.adres,
      email: data.email,
      produkt: data.produkt,
      cena: data.cena,
      data_zakupu: data.data_zakupu,
      numer_zamowienia: data.numer_zamowienia || "",
      opis: data.opis.slice(0, 500),
      podjete_kroki: (data.podjete_kroki || "").slice(0, 300),
      zadanie: data.zadanie,
      nazwa_sklepu: data.nazwa_sklepu,
      adres_sklepu: data.adres_sklepu || "",
    },
  });

  return NextResponse.json({ url: session.url });
}
