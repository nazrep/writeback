# Audyt techniczny writeback.pl — lipiec 2026

**Data audytu:** 10 lipca 2026  
**Środowisko:** Next.js 16 (App Router) · Vercel · Stripe · Anthropic SDK  
**Status ogólny:** ⚠️ WYMAGA UWAGI

---

## 1. Podatności npm (wynik: `npm audit`)

### MODERATE (3 podatności)

| Pakiet | Wersja | Problem | CVE |
|--------|--------|---------|-----|
| `postcss` (wewnętrzny Next.js) | <8.5.10 | XSS via unescaped `</style>` w CSS Stringify Output | GHSA-qx2v-qp2m-jg93 |
| `next` | 9.3.4-canary.0 – 16.3.0-canary.5 | Zależy od podatnej wersji postcss | — |
| `@vercel/analytics` | ≥1.2.0-beta.1 | Zależy od podatnej wersji next | — |

**Ocena:** Podatność postcss dotyczy wewnętrznego bundla Next.js (nie systemowego `postcss@8.5.15`, który jest zaktualizowany). Ryzyko XSS jest realne tylko przy dynamicznym generowaniu CSS z niezaufanych danych — w tym projekcie nieprawdopodobne. Wymaga aktualizacji Next.js do wersji z załatanym wewnętrznym postcss.

---

## 2. Stan bezpieczeństwa Next.js — maj 2026 (13 CVE)

W maju 2026 Vercel opublikował duże wydanie bezpieczeństwa Next.js z **13 poprawkami**, w tym:

| Severity | Opis |
|----------|------|
| HIGH (×6) | Auth bypass via App Router segment-prefetch URL |
| HIGH | Pages Router i18n default-locale path — obejście autoryzacji proxy |
| HIGH | WebSocket SSRF (CVE-2026-44578) — self-hosted instances |
| HIGH | React Server Components DoS (CVE-2026-23870) |
| MODERATE (×3) | Cache poisoning, middleware bypass |
| LOW (×2) | Drobne wycieki informacji |

**✅ STATUS: BEZPIECZNY**  
Wersja zainstalowana: `next@16.2.7` — patche zawarte od `16.2.6`. Projekt jest chroniony.

---

## 3. Nieaktualne zależności (major/minor updates)

| Pakiet | Zainstalowana | Najnowsza | Pilność |
|--------|--------------|-----------|---------|
| `@anthropic-ai/sdk` | **0.100.1** | **0.110.0** | ⚠️ ŚREDNIA — 10 minor wersji w tyle |
| `stripe` | 22.2.0 | 22.3.0 | 🟢 NISKA — 1 minor wersja |
| `next` | 16.2.7 | — | 🟢 OK (aktualna w linii 16.2.x) |

**Anthropic SDK 0.100.1 → 0.110.0**: 10 minor wersji to istotna różnica — mogą zawierać poprawki błędów, zmiany w obsłudze błędów API, nowe modele lub deprecation warningi. Zalecana aktualizacja przed kolejnym audytem.

---

## 4. Problemy bezpieczeństwa w kodzie

### 🔴 HIGH — Brak limitu rozmiaru pliku w `extract-image/route.ts`

**Plik:** `app/api/extract-image/route.ts:8-15`

```typescript
body = await req.json();
const { image_base64 } = body;
if (!image_base64) return NextResponse.json({ error: "No image" }, { status: 400 });
// ← brak walidacji długości image_base64
```

**Problem:** Endpoint przyjmuje `image_base64` dowolnej długości bez żadnej walidacji rozmiaru. Atakujący może:
- Wysłać wielomegabajtowy payload, powodując nadmierne zużycie pamięci (ryzyko DoS)
- Wygenerować bardzo wysokie koszty Anthropic API (tokeny za duże obrazy)
- Endpoint nie wymaga uwierzytelniania — publicznie dostępny

**Ten sam problem dotyczy** `checkout/route.ts:60` — `data.image_base64` przekazywany do `extractImageContext()` bez walidacji rozmiaru.

**Rekomendacja:**
```typescript
const MAX_IMAGE_B64_BYTES = 1_500_000; // ~1.1 MB oryginalnego obrazu
if (image_base64.length > MAX_IMAGE_B64_BYTES) {
  return NextResponse.json({ error: "Image too large" }, { status: 413 });
}
```

---

### 🟡 MEDIUM — `processedSessions` w pamięci (webhook idempotencja)

**Plik:** `app/api/webhook/stripe/route.ts:13`

```typescript
const processedSessions = new Set<string>();
```

**Problem:** Zbiór sesji przetworzonych przechowywany w pamięci procesu. Na Vercel każda instancja serverless ma osobną pamięć — przy skalowaniu lub ponownym uruchomieniu (zimny start) Set jest pusty. Stripe powtarza webhooki (np. po timeout), co może skutkować **wysłaniem duplikatów emaila z pismem i fakturą**.

Sprawdzenie wieku zdarzenia (30 min) częściowo chroni, ale nie eliminuje ryzyka przy równoległych instancjach.

**Rekomendacja:** Użyć Redis (już jest `@upstash/redis` w projekcie) do śledzenia przetworzonych sesji:
```typescript
const redis = getRedis();
const key = `processed:${session.id}`;
const alreadyDone = await redis.set(key, "1", { nx: true, ex: 3600 });
if (!alreadyDone) return NextResponse.json({ received: true });
```

---

### 🟡 MEDIUM — Brak rate limiting na endpointach API

**Pliki:** `extract-image/route.ts`, `checkout/route.ts`

Oba endpointy są publicznie dostępne bez żadnego rate limiting. Atakujący może:
- Spamować `/api/extract-image` generując koszty Anthropic API
- Masowo tworzyć sesje Stripe (brak limitu wywołań `/api/checkout`)

Projekt ma już `@upstash/redis` — można go użyć do implementacji sliding window rate limit.

---

### ✅ OK — Weryfikacja podpisu webhook Stripe

**Plik:** `app/api/webhook/stripe/route.ts:22-25`

```typescript
event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
```

Poprawna implementacja — webhook odczytywany jako surowy tekst (`req.text()`), podpis weryfikowany przez Stripe SDK. ✅

---

### ✅ OK — Sanitizacja slug w blogu

**Plik:** `app/blog/[slug]/page.tsx:63-65`

```typescript
const post = getPost(slug);
if (!post) notFound();
```

Slug jest weryfikowany przez lookup w statycznej tablicy `POSTS`. Brak dostępu do bazy/systemu plików z wartości slug — bezpieczne. `dangerouslySetInnerHTML` użyty tylko dla JSON-LD generowanego po stronie serwera. ✅

---

### ✅ OK — Walidacja danych w checkout

**Plik:** `app/api/checkout/route.ts:25-27, 81-96`

Wszystkie pola string'owe są przycinane przez `trunc(s, n)` przed przekazaniem do Stripe metadata. Typ dokumentu weryfikowany przez whitelist lookup (`DOC_TYPE_NAMES`). ✅

---

## 5. Rekomendacje (priorytetyzowane)

### 🔴 Priorytet 1 — Natychmiastowy (do 7 dni)

1. **Dodaj limit rozmiaru image_base64** w `extract-image/route.ts` i `checkout/route.ts`  
   Ryzyko: koszty API + potencjalny DoS. Implementacja: 3 linie kodu.

### 🟡 Priorytet 2 — Krótkoterminowy (do 30 dni)

2. **Zastąp in-memory `processedSessions` Redisem** w `webhook/stripe/route.ts`  
   Ryzyko: duplikaty emaili przy ponownych uruchomieniach/skalowaniu. Upstash Redis już w projekcie.

3. **Zaktualizuj `@anthropic-ai/sdk`** z 0.100.1 → 0.110.0  
   `npm update @anthropic-ai/sdk` — 10 minor wersji za aktualną.

4. **Dodaj rate limiting** na `/api/extract-image` i `/api/checkout`  
   Upstash Redis sliding window — gotowe przykłady w dokumentacji Upstash.

### 🟢 Priorytet 3 — Długoterminowy (następny audyt)

5. **Zaktualizuj `stripe`** z 22.2.0 → 22.3.0 — rutynowa aktualizacja.

6. **Monitoruj Next.js 16.x** pod kątem kolejnych wydań bezpieczeństwa — linia 16.2.x aktywnie patchowana.

---

## Podsumowanie

| Obszar | Status |
|--------|--------|
| CVE Next.js maj 2026 (13 poprawek) | ✅ Chroniony (v16.2.7 ≥ v16.2.6) |
| npm audit CRITICAL | ✅ Brak |
| npm audit HIGH | ✅ Brak |
| npm audit MODERATE | ⚠️ 3 (postcss wewnętrzny Next.js) |
| Weryfikacja webhook Stripe | ✅ Poprawna |
| Limit rozmiaru image_base64 | 🔴 Brak — wymaga pilnej naprawy |
| Idempotencja webhook (Redis) | ⚠️ Ryzyko duplikatów |
| Rate limiting API | ⚠️ Brak |
| Sanitizacja slug | ✅ Bezpieczna |
| Anthropic SDK aktualność | ⚠️ 10 minor wersji za aktualną |

**Następny audyt:** sierpień 2026
