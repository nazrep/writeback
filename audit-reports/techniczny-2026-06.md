# Audyt techniczny writeback.pl — 14 czerwca 2026

## Podsumowanie

**Status: ⚠️ WYMAGA UWAGI**

Brak podatności CRITICAL/HIGH. Wykryto 3 podatności MODERATE w zależnościach npm (PostCSS wewnątrz Next.js), 2 problemy bezpieczeństwa w kodzie API (brak limitu rozmiaru obrazu), oraz 1 nieaktualną zależność major (@anthropic-ai/sdk). Next.js jest na aktualnej, załatanej wersji.

---

## 1. Podatności npm (wynik: `npm audit`)

### CRITICAL — brak
### HIGH — brak

### MODERATE — 3 podatności

| Pakiet | Wersja | CVE/GHSA | Opis | Możliwa naprawa |
|--------|--------|----------|------|------------------|
| `postcss` (wewnętrzna dep. Next.js) | <8.5.10 | GHSA-qx2v-qp2m-jg93 | XSS via unescaped `</style>` w CSS Stringify Output | **Brak bez breaking change** — `npm audit fix --force` zdegradowałoby Next.js do 9.3.3 |
| `next` | 9.3.4-canary.0 – 16.3.0-canary.5 | jw. | Zależy od podatnej wersji postcss | Jak wyżej |
| `@vercel/analytics` | >=1.2.0-beta.1 | jw. | Zależy od podatnej wersji next | Jak wyżej |

**Ocena:** PostCSS jest bundlowany wewnętrznie przez Next.js. Podatność dotyczy CSS output serwera (nie kodu aplikacji). Ryzyko realne jest niskie dla typowej aplikacji Next.js App Router. Należy śledzić, czy Vercel/Next.js wyda patch.

---

## 2. Stan zależności (major updates)

| Pakiet | Zainstalowana wersja (package.json) | Najnowsza wersja | Status |
|--------|--------------------------------------|-------------------|--------|
| `next` | `16.2.7` | `16.2.7` (+ patche bezpieczeństwa) | ✅ Aktualna |
| `@anthropic-ai/sdk` | `^0.100.1` (→ ~0.100.x) | `0.104.1` | ⚠️ 4 minor wersje za |
| `stripe` | `^22.2.0` | `22.2.0` | ✅ Aktualna |
| `react` | `19.2.4` | — | ✅ OK |
| `@vercel/analytics` | `^2.0.1` | — | ✅ OK |
| `resend` | `^6.12.4` | — | ✅ OK |

### Next.js — historia CVE (maj 2026)

W maju 2026 Vercel wydał skoordynowany release bezpieczeństwa naprawiając **13 CVE** (DoS, SSRF, cache poisoning, XSS, bypass middleware).

- **CVE-2026-44578** — WebSocket SSRF: unauthentykowany atakujący mógł wymusić wewnętrzne żądanie HTTP. Naprawione w `16.2.5`.
- **CVE-2026-23869** — React Server Components. Naprawione w `16.2.6`.
- Wszystkie patche w: `15.5.18` i `16.2.6`.

**Projekt używa `16.2.7` — jest NOWSZY niż wszystkie patchowane wersje. ✅ Bezpieczny.**

### @anthropic-ai/sdk

- `^0.100.1` w semver oznacza `>=0.100.1 <0.101.0` — SDK nie zaktualizuje się automatycznie do 0.104.x.
- Najnowsza: `0.104.1` (opublikowana 3 dni temu).
- **Rekomendacja:** zaktualizować do `^0.104.1` lub `^0.100.1` zmienić na `^0.104.0`.

---

## 3. Problemy bezpieczeństwa w kodzie

### 🔴 MEDIUM — Brak limitu rozmiaru obrazu (base64) w `extract-image/route.ts`

**Plik:** `app/api/extract-image/route.ts`

Endpoint jest **publiczny** (brak auth/rate-limiting) i przyjmuje `image_base64` bez żadnej walidacji rozmiaru.

```ts
const { image_base64 } = body;
if (!image_base64) return NextResponse.json({ error: "No image" }, { status: 400 });
// ← brak: if (image_base64.length > MAX_SIZE) return 413;
```

**Ryzyko:** Atakujący może wysłać kilkadziesiąt MB base64 jednocześnie w wielu requestach, powodując:
- Wysoki koszt Anthropic API (każdy request ≥ tysiące tokenów).
- Potencjalny OOM (out-of-memory) serwera.

**Fix:**
```ts
const MAX_IMAGE_B64 = 1.5 * 1024 * 1024; // ~1 MB obrazu
if (image_base64.length > MAX_IMAGE_B64) {
  return NextResponse.json({ error: "Image too large" }, { status: 413 });
}
```

---

### 🔴 MEDIUM — Brak limitu rozmiaru obrazu w `checkout/route.ts`

**Plik:** `app/api/checkout/route.ts` — funkcja `extractImageContext()`

Ten sam problem — `data.image_base64` jest przekazywane do Anthropic bez sprawdzenia rozmiaru, a checkout jest wywoływany przed płatnością (publiczny endpoint).

**Fix:** dodać tę samą walidację co wyżej przed wywołaniem `extractImageContext()`.

---

### 🟡 LOW — Brak walidacji formatu email w `checkout/route.ts`

**Plik:** `app/api/checkout/route.ts`

```ts
customer_email: data.email,  // przekazywane wprost do Stripe
```

Stripe zrezygnuje jeśli email jest nieprawidłowy (zwróci błąd), ale warto walidować wcześniej, żeby unikać zbędnych wywołań API.

**Fix:**
```ts
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (data.email && !emailRegex.test(data.email)) {
  return NextResponse.json({ error: "Invalid email" }, { status: 400 });
}
```

---

### 🟡 LOW — Deduplication webhooka tylko w pamięci

**Plik:** `app/api/webhook/stripe/route.ts`

```ts
const processedSessions = new Set<string>();
```

Set jest in-memory — po restarcie serwera Stripe może ponownie dostarczyć event i email zostanie wysłany dwukrotnie. Redis (`@upstash/redis`) jest już w projekcie i mógłby służyć do persystentnej deduplicacji.

**Fix:** użyć `redis.set(session.id, 1, { ex: 86400, nx: true })` zamiast Set.

---

### ✅ OK — Weryfikacja podpisu webhook Stripe

**Plik:** `app/api/webhook/stripe/route.ts`

Prawidłowa implementacja — body czytane jako raw text (`req.text()`) przed `webhooks.constructEvent()`. Podpis HMAC weryfikowany. Zdarzenia starsze niż 30 min są odrzucane.

---

### ✅ OK — Sanityzacja sluga bloga

**Plik:** `app/blog/[slug]/page.tsx`

`getPost(slug)` odwołuje się do tablicy `POSTS` (whitelist) — nie ma dostępu do systemu plików ani bazy danych przez slug. `notFound()` wywoływany dla nieznanych slugów. `dangerouslySetInnerHTML` użyte tylko dla JSON-LD ze `JSON.stringify` kontrolowanych danych — bezpieczne.

---

## 4. Rekomendacje (priorytetyzowane)

| # | Priorytet | Działanie | Plik | Effort |
|---|-----------|-----------|------|--------|
| 1 | 🔴 HIGH | Dodaj limit rozmiaru `image_base64` (max ~1 MB) | `extract-image/route.ts`, `checkout/route.ts` | 15 min |
| 2 | 🟠 MEDIUM | Zaktualizuj `@anthropic-ai/sdk` do `^0.104.0` | `package.json` | 5 min |
| 3 | 🟠 MEDIUM | Dodaj rate limiting na endpointach API (np. przez Upstash Redis lub middleware Next.js) | `app/api/*` | 2h |
| 4 | 🟡 LOW | Persystentna deduplicacja webhook przez Redis | `webhook/stripe/route.ts` | 30 min |
| 5 | 🟡 LOW | Walidacja formatu email przed wywołaniem Stripe | `checkout/route.ts` | 10 min |
| 6 | ℹ️ INFO | Monitoruj Next.js na kolejne patche PostCSS (śledź GHSA-qx2v-qp2m-jg93) | — | — |

---

## 5. Podsumowanie ocen

| Obszar | Ocena | Uwagi |
|--------|-------|-------|
| Next.js CVE (maj 2026) | ✅ Bezpieczny | Wersja 16.2.7 > wszystkie patchowane |
| npm audit CRITICAL/HIGH | ✅ Brak | — |
| npm audit MODERATE | ⚠️ 3 | PostCSS wewnątrz Next.js — niskie realne ryzyko |
| Weryfikacja webhook Stripe | ✅ Poprawna | HMAC + raw body |
| Sanityzacja slug bloga | ✅ Bezpieczna | Whitelist |
| Limity rozmiaru obrazu API | ❌ Brak | Ryzyko cost/DoS |
| Anthropic SDK | ⚠️ Nieaktualny | 4 minor wersje za |
| Stripe SDK | ✅ Aktualny | 22.2.0 |
| Rate limiting | ❌ Brak | Brak na publicznych endpointach |

---

*Raport wygenerowany automatycznie przez Claude Code — 14 czerwca 2026*
