import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);
const getResend = () => new Resend(process.env.RESEND_API_KEY!);
const getRedis = () =>
  new Redis({
    url: process.env.UPSTASH_REDIS_KV_REST_API_URL!,
    token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN!,
  });

const DOC_TYPE_LABELS: Record<string, string> = {
  sklep: "reklamacji do sklepu",
  bank: "reklamacji do banku",
  zus: "odwołania od decyzji ZUS",
  umowa: "wypowiedzenia umowy",
  uokik: "skargi do UOKiK",
  skarga: "skargi konsumenckiej",
  lot: "odszkodowania za lot",
  wezwanie: "wezwania do zapłaty",
  mandat: "odwołania od mandatu",
};

const FROM = "Writeback <hello@writeback.pl>";

function buildEmail(docType: string) {
  const label = DOC_TYPE_LABELS[docType] || "pisma";
  return {
    subject: `Jak poszło z Twoim pismem? — Writeback`,
    html: `
<div style="background:#f8f9fc;padding:32px 16px;min-height:100vh;">
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
    <div style="background:#4f46e5;padding:24px 32px;text-align:center;">
      <span style="font-size:16px;font-weight:700;color:#fff;letter-spacing:0.02em;">writeback.pl</span>
    </div>
    <div style="padding:32px;">
      <h1 style="font-size:20px;font-weight:700;margin:0 0 16px;color:#111827;">Jak poszło z Twoim pismem?</h1>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
        Dwa tygodnie temu wygenerowaliśmy dla Ciebie pismo dotyczące <strong>${label}</strong>.
        Ustawowy termin na odpowiedź już minął — jak się skończyło?
      </p>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:20px;">
        <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#166534;">✅ Odpowiedzieli pozytywnie?</p>
        <p style="margin:0;font-size:13px;color:#374151;line-height:1.6;">
          Gratulacje! Jeśli Writeback Ci pomógł, będzie nam bardzo miło, jeśli polecisz nas znajomym.
        </p>
      </div>

      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:20px;margin-bottom:20px;">
        <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#991b1b;">❌ Odmowa lub brak odpowiedzi?</p>
        <p style="margin:0;font-size:13px;color:#374151;line-height:1.6;">
          Brak odpowiedzi w ustawowym terminie oznacza uznanie reklamacji za zasadną.
          Możesz teraz przygotować <strong>kolejne pismo eskalacyjne</strong> — np. wezwanie do zapłaty
          lub skargę do UOKiK/Rzecznika Praw Konsumenta.
        </p>
      </div>

      <div style="text-align:center;margin:28px 0 8px;">
        <a href="https://writeback.pl/zamow" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;border-radius:10px;padding:14px 32px;font-size:14px;font-weight:600;">
          Przygotuj kolejne pismo
        </a>
      </div>
      <p style="text-align:center;font-size:12px;color:#9ca3af;margin:8px 0 0;">
        Jedno pismo — 29 zł · Bez subskrypcji
      </p>
    </div>
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.5;">
        Writeback — pisma reklamacyjne z podstawami prawnymi ·
        <a href="https://writeback.pl" style="color:#9ca3af;">writeback.pl</a>
      </p>
    </div>
  </div>
</div>`,
  };
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripe();
  const resend = getResend();
  const redis = getRedis();

  const now = Math.floor(Date.now() / 1000);
  const fourteenDaysAgo = now - 14 * 24 * 60 * 60;
  const fifteenDaysAgo = now - 15 * 24 * 60 * 60;

  const sessions = await stripe.checkout.sessions.list({
    status: "complete",
    created: { gte: fifteenDaysAgo, lte: fourteenDaysAgo },
    limit: 100,
    expand: ["data.customer_details"],
  });

  let sent = 0;
  let skipped = 0;

  for (const session of sessions.data) {
    const email = session.customer_details?.email;
    if (!email) { skipped++; continue; }

    const dedupKey = `followup:${session.id}`;
    const isNew = await redis.set(dedupKey, 1, { nx: true, ex: 30 * 24 * 3600 });
    if (!isNew) { skipped++; continue; }

    const docType = session.metadata?.doc_type || "sklep";
    const { subject, html } = buildEmail(docType);

    await resend.emails.send({ from: FROM, to: email, subject, html });
    sent++;
  }

  return NextResponse.json({ sent, skipped, total: sessions.data.length });
}
