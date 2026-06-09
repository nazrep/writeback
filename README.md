# writeback.pl

Narzędzie do generowania formalnych pism konsumenckich z właściwymi podstawami prawnymi. Konsument opisuje sytuację, AI generuje pismo powołujące konkretne artykuły ustaw, PDF trafia na maila w 5 minut.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS 4 · Stripe · Anthropic Claude · Resend · Upstash Redis · Vercel

---

## Szybki start

```bash
cd app
cp .env.example .env.local   # uzupełnij klucze
npm install
npm run dev
```

Aplikacja działa na [http://localhost:3000](http://localhost:3000).

## Zmienne środowiskowe

Skopiuj `.env.example` → `.env.local` i uzupełnij:

| Zmienna | Opis |
|---|---|
| `ANTHROPIC_API_KEY` | Klucz API Anthropic (generowanie pism) |
| `STRIPE_SECRET_KEY` | Klucz sekretny Stripe (płatności) |
| `STRIPE_WEBHOOK_SECRET` | Sekret webhooka Stripe (weryfikacja zdarzeń) |
| `RESEND_API_KEY` | Klucz API Resend (wysyłka PDF emailem) |
| `NEXT_PUBLIC_URL` | Publiczny URL aplikacji (np. `https://writeback.pl`) |
| `UPSTASH_REDIS_KV_URL` | URL Upstash Redis (numeracja faktur) |
| `UPSTASH_REDIS_KV_REST_API_URL` | REST API URL Upstash |
| `UPSTASH_REDIS_KV_REST_API_TOKEN` | Token Upstash REST API |
| `UPSTASH_REDIS_KV_REST_API_READ_ONLY_TOKEN` | Token read-only Upstash |

## Struktura projektu

```
app/
├── app/
│   ├── api/
│   │   ├── checkout/        # Stripe Checkout Session
│   │   ├── preview/         # Podgląd pisma (Anthropic)
│   │   ├── extract-image/   # OCR z paragonu/faktury (Anthropic)
│   │   └── webhook/stripe/  # Webhook: generowanie PDF + wysyłka
│   ├── blog/
│   │   ├── content/         # Artykuły PL (*.tsx) i EN (*.en.tsx)
│   │   ├── posts.ts         # Metadane artykułów i FAQ
│   │   └── [slug]/          # Dynamiczne strony artykułów
│   ├── zamow/               # Formularz 5-krokowy
│   ├── polityka/            # Polityka prywatności
│   └── regulamin/           # Regulamin
├── components/
│   ├── SiteHeader.tsx
│   ├── CookieBanner.tsx
│   └── AnimateIn.tsx
└── public/
    ├── audio/               # Pliki audio do AudioPlayera
    └── fonts/
```

## Jak dodać nowy artykuł na blog

1. Stwórz `app/app/blog/content/nazwa-artykulu.tsx` (wersja PL)
2. Stwórz `app/app/blog/content/nazwa-artykulu.en.tsx` (wersja EN)
3. Dodaj import i wpis do `app/app/blog/content/index.ts`
4. Dodaj metadane (tytuł, opis, data, FAQ) do `app/app/blog/posts.ts`

Wzoruj się na istniejącym artykule, np. `reklamacja-zalando.tsx`.

## Deploy

```bash
vercel          # preview
vercel --prod   # produkcja
```

Projekt jest podpięty pod `writeback.pl` przez Vercel.

## Audyty automatyczne

Cykliczne audyty uruchamiane przez Claude Code Routines (claude.ai/code/routines):

| Audyt | Częstotliwość | Raport |
|---|---|---|
| Prawny | 1. miesiąca | `audit-reports/prawny-YYYY-MM.md` |
| SEO | 5. miesiąca | `audit-reports/seo-YYYY-MM.md` |
| EN spójność | 8. miesiąca | `audit-reports/en-spojnosc-YYYY-MM.md` |
| Techniczny | 10. miesiąca | `audit-reports/techniczny-YYYY-MM.md` |
| Treści | 15. miesiąca | `audit-reports/tresc-YYYY-MM.md` |
| UX formularz | 20. miesiąca | `audit-reports/ux-YYYY-MM.md` |
| RODO | Co kwartał | `audit-reports/rodo-YYYY-MM.md` |
| Konkurencja | Co kwartał | `audit-reports/konkurencja-YYYY-MM.md` |
| Dostępność WCAG | Co kwartał | `audit-reports/dostepnosc-YYYY-MM.md` |
