import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { rateLimit } from "@/app/lib/rate-limit";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const blocked = await rateLimit(req, "promo", 10, "1 m");
  if (blocked) return blocked;
  let code: string;
  try {
    ({ code } = await req.json());
  } catch {
    return NextResponse.json({ valid: false, error: "Nieprawidłowe żądanie" }, { status: 400 });
  }

  if (!code?.trim()) {
    return NextResponse.json({ valid: false, error: "Wpisz kod" });
  }

  try {
    const results = await getStripe().promotionCodes.list({
      code: code.trim().toUpperCase(),
      active: true,
      limit: 1,
    });

    if (results.data.length === 0) {
      return NextResponse.json({ valid: false, error: "Nieprawidłowy kod rabatowy" });
    }

    const promoCode = results.data[0];
    const coupon = promoCode.promotion.coupon;

    if (typeof coupon === "string") {
      return NextResponse.json({ valid: false, error: "Błąd weryfikacji kodu" });
    }

    if (!coupon || !coupon.valid) {
      return NextResponse.json({ valid: false, error: "Kod wygasł lub jest nieaktywny" });
    }

    const PRICE = 2900;
    let discountPct = 0;
    let priceAfter = PRICE;

    if (coupon.percent_off) {
      discountPct = coupon.percent_off;
      priceAfter = Math.round(PRICE * (1 - discountPct / 100));
    } else if (coupon.amount_off) {
      priceAfter = Math.max(0, PRICE - coupon.amount_off);
      discountPct = Math.round(((PRICE - priceAfter) / PRICE) * 100);
    }

    return NextResponse.json({
      valid: true,
      discount: discountPct,
      priceAfter,
      promoCodeId: promoCode.id,
      label: discountPct === 100 ? "Gratis!" : `-${discountPct}%`,
    });
  } catch {
    return NextResponse.json({ valid: false, error: "Błąd weryfikacji — spróbuj ponownie" });
  }
}
