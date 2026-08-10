# Audyt techniczny writeback.pl — sierpień 2026

**Data audytu:** 10 sierpnia 2026  
**Środowisko:** Next.js 16 (App Router) · Vercel · Stripe · Anthropic SDK  
**Status ogólny:** ⚠️ WYMAGA UWAGI — 4 podatności HIGH w zależnościach (naprawialne `npm audit fix`)

---

## Postęp od poprzedniego audytu (lipiec 2026)

| Problem z lipca | Status |
|-----------------|--------|
| Webhook Stripe — idempotencja w pamięci (in-memory Set) | ✅ NAPRAWIONE — Redis dedup wdrożony |
| Rate limiting na `/api/extract-image` | ✅ NAPRAWIONE — 10 req/min zaimplementowany |
| Limit rozmiaru `image_base64` (extract-image + checkout) | 🔴 NADAL BRAK |
| Rate limiting na `/api/checkout` | ⚠️ NADAL BRAK |
| Aktualizacja `@anthropic-ai/sdk` (0.100.1 → 0.110.0) | ⚠️ NADAL NIEAKTUALNE — teraz 0.116.0 |

---

## 1. Podatności npm — `npm audit` (sierpień 2026)

**Wynik: 4 HIGH severity** (wzrost z 3 MODERATE w lipcu — nowe CVE i podwyższone oceny severity)

### HIGH — nanoid

| Atrybut | Wartość |
|---------|---------|
| Pakiet | `nanoid < 3.3.17` |
| Severity | **HIGH** |
| Opis | Custom generators can loop indefinitely when size is zero — potencjalny DoS |
| Doradztwo | [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8) |
| Naprawa | `npm audit fix` |

### HIGH — postcss (4 CVE)

| Atrybut | Wartość |
|---------|---------|
| Pakiet | `postcss ≤ 8.5.22` (wewnętrzna zależność Next.js) |
| Severity | **HIGH** |
| CVE #1 | GHSA-qx2v-qp2m-jg93 — XSS via unescaped `</style>` w CSS Stringify Output |
| CVE #2 | GHSA-6g55-p6wh-862q — Arbitrary file read via attacker-controlled `sourceMappingURL` |
| CVE #3 | GHSA-r28c-9q8g-f849 — Path Traversal via `sourceMappingURL` (arbitrary `.map` file disclosure) |
| CVE #4 | GHSA-fxqj-rqcc-2cmp — niekompletna poprawka GHSA-6g55-p6wh-862q (`from` unset) |
| Naprawa | `npm audit fix` (aktualizacja Next.js do 16.3.0) |

### HIGH — sharp + libvips (4 CVE)

| Atrybut | Wartość |
|---------|---------|
| Pakiet | `sharp < 0.35.0` (wewnętrzna zależność Next.js dla Image Optimization) |
| Severity | **HIGH** |
| CVE-2026-33327 | Inherited vulnerability in libvips |
| CVE-2026-33328 | Inherited vulnerability in libvips |
| CVE-2026-35590 | Inherited vulnerability in libvips |
| CVE-2026-35591 | Inherited vulnerability in libvips |
| Doradztwo | [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) |
| Naprawa | `npm audit fix` (aktualizacja Next.js do 16.3.0) |

### Ocena ryzyka

Podatności postcss (XSS, file read, path traversal) dotyczą wewnętrznego bundla Next.js podczas przetwarzania CSS. W tym projekcie CSS pochodzi wyłącznie z plików źródłowych (Tailwind), nie z danych użytkownika — **bezpośrednie ryzyko exploitacji jest niskie** w środowisku produkcyjnym. Jednak formal HIGH severity wymaga szybkiego `npm audit fix`.

Podatności sharp/libvips dotyczą przetwarzania obrazów przez Next.js Image Optimization. Jeśli `next/image` przetwarza obrazy z zewnętrznych URL-i (konfiguracja `remotePatterns`), ryzyko jest realne.

---

## 2. Aktualizacje Next.js — lipiec 2026

Wydanie bezpieczeństwa Next.js z **lipca 2026** usunęło 9 podatności (4 HIGH + 5 MEDIUM) w wersjach 16.2.11 (Active LTS) i 15.5.21 (Maintenance LTS).

- **CVE-2026-64647** (HIGH): Server-side fetch z request body może zwrócić cached response body z innego żądania do tego samego URL — możliwe wyciekanie danych między użytkownikami w środowiskach z shared cache.

**Status projektu:** Package.json definiuje `^16.2.12` — `npm outdated` wskazuje, że wymagana jest aktualizacja do `16.3.0`. Aktualizacja rozwiąże też podatności npm z sekcji 1.

```bash
# Naprawa jedną komendą:
npm audit fix
# lub ręcznie:
npm install next@16.3.0
```

---

## 3. Nieaktualne zależności

| Pakiet | Zainstalowana | Najnowsza | Pilność |
|--------|--------------|-----------|---------|
| `next` | 16.2.12 | **16.3.0** | 🔴 WYSOKA — poprawki bezpieczeństwa |
| `@anthropic-ai/sdk` | 0.100.1 | **0.116.0** | ⚠️ ŚREDNIA — 16 minor wersji za aktualną |
| `stripe` | 22.2.0 | **22.4.0** | 🟢 NISKA — 2 patch wersje |
| `react` / `react-dom` | 19.2.4 | **19.2.8** | 🟢 NISKA — minor patch |
| `resend` | 6.12.4 | **6.18.1** | 🟢 NISKA |
| `playwright` | 1.60.0 | **1.62.1** | 🟢 NISKA |
| `@upstash/redis` | 1.38.0 | **1.38.2** | 🟢 NISKA |

**Anthropic SDK 0.100.1 → 0.116.0**: 16 minor wersji — changelog może zawierać zmiany w obsłudze błędów API, nowe modele (Claude Sonnet 5, Haiku 4.5), deprecation warningi. Zalecana aktualizacja. Zainstalowany model `claude-opus-4-7` w webhook i `claude-haiku-4-5-20251001` w checkout — po aktualizacji SDK należy zweryfikować kompatybilność.

---

## 4. Przegląd bezpieczeństwa kodu

### ✅ NAPRAWIONE — Idempotencja webhook Stripe (Redis)

**Plik:** `app/api/webhook/stripe/route.ts:40-43`

W lipcu: in-memory `Set<string>` — nieskuteczne przy wielu instancjach Vercel.  
Sierpień: poprawna implementacja Redis z `nx` (atomic set-if-not-exists):

```typescript
const dedup = await getRedis().set(`webhook:dedup:${session.id}`, 1, { nx: true, ex: 3600 });
if (!dedup) return NextResponse.json({ received: true });
```
✅ Atomowe, odporne na skalowanie, TTL 1h.

---

### ✅ NAPRAWIONE — Rate limiting na `/api/extract-image`

**Plik:** `app/api/extract-image/route.ts:8`

```typescript
const blocked = await rateLimit(req, "extract-image", 10, "1 m");
if (blocked) return blocked;
```
✅ Limit 10 requestów/minutę.

---

### 🔴 HIGH — Brak limitu rozmiaru `image_base64` (nadal nienaprawione)

**Pliki:** `app/api/extract-image/route.ts:17-18` · `app/api/checkout/route.ts:60`

Problem zgłoszony w lipcu — nadal nie naprawiony. Oba endpointy przyjmują `image_base64` dowolnej długości.

```typescript
// extract-image/route.ts:17-18 — brak walidacji:
const { image_base64 } = body;
if (!image_base64) return NextResponse.json({ error: "No image" }, { status: 400 });
// ← brak sprawdzenia długości
```

```typescript
// checkout/route.ts:60 — brak walidacji:
const imageContext = data.image_base64 ? await extractImageContext(data.image_base64) : "";
// ← data.image_base64 może mieć dowolną długość
```

**Skutki:** Nadmierne koszty Anthropic API przy złośliwych requestach, ryzyko memory exhaustion.

**Naprawa (3 linie kodu):**
```typescript
const MAX_IMAGE_B64 = 1_500_000; // ~1.1 MB decoded
if (image_base64.length > MAX_IMAGE_B64) {
  return NextResponse.json({ error: "Image too large" }, { status: 413 });
}
```
Dodaj w obu plikach przed przekazaniem `image_base64` do Anthropic.

---

### ⚠️ MEDIUM — Brak rate limiting na `/api/checkout`

**Plik:** `app/api/checkout/route.ts`

Endpoint tworzy sesje Stripe i wywołuje Anthropic API (przetwarzanie obrazów) bez żadnego rate limiting. `extract-image` ma ochronę — `checkout` nie.

**Naprawa:** Użyć tej samej funkcji `rateLimit()` co w `extract-image`:
```typescript
const blocked = await rateLimit(req, "checkout", 20, "1 m");
if (blocked) return blocked;
```

---

### ✅ OK — Weryfikacja podpisu webhook Stripe

**Plik:** `app/api/webhook/stripe/route.ts:23-26`

```typescript
event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
```
✅ Poprawna implementacja — `req.text()` + `constructEvent` + obsługa błędów.

---

### ✅ OK — Sanitizacja slug w blogu

**Plik:** `app/app/blog/[slug]/page.tsx:63-67`

Slug weryfikowany przez lookup w statycznej tablicy `POSTS` → `notFound()` przy nieznanych wartościach. `dangerouslySetInnerHTML` użyty wyłącznie dla JSON-LD po stronie serwera (dane kontrolowane). ✅

---

### ✅ OK — Walidacja danych wejściowych w checkout

**Plik:** `app/api/checkout/route.ts:25-27, 83-99`

Wszystkie pola string'owe przycięte przez `trunc(s, n)`. Typ dokumentu weryfikowany przez whitelist lookup (`DOC_TYPE_NAMES`). ✅

---

## 5. Rekomendacje (priorytetyzowane)

### 🔴 Priorytet 1 — Natychmiastowy (do 7 dni)

**1. Uruchom `npm audit fix` — aktualizacja Next.js 16.2.12 → 16.3.0**
```bash
cd /path/to/writeback && npm audit fix
```
Naprawi 4 HIGH: nanoid, postcss (4 CVE), sharp (4 CVE libvips). Commit + deploy na Vercel.

**2. Dodaj limit rozmiaru `image_base64`** w `extract-image/route.ts` i `checkout/route.ts`  
Implementacja: ~3 linie w każdym pliku (wzorzec powyżej w sekcji 4).

### ⚠️ Priorytet 2 — Krótkoterminowy (do 14 dni)

**3. Rate limiting na `/api/checkout`**  
Skopiuj wzorzec z `extract-image` — `rateLimit(req, "checkout", 20, "1 m")`.

**4. Aktualizuj `@anthropic-ai/sdk`** z 0.100.1 → 0.116.0
```bash
npm install @anthropic-ai/sdk@latest
```
Zweryfikuj obsługę modeli `claude-opus-4-7` i `claude-haiku-4-5-20251001` po aktualizacji.

### 🟢 Priorytet 3 — Rutynowy (do następnego audytu)

**5.** `npm install stripe@latest react@latest react-dom@latest resend@latest` — rutynowe patch updates.

---

## Podsumowanie

| Obszar | Lipiec 2026 | Sierpień 2026 |
|--------|-------------|---------------|
| npm audit CRITICAL | ✅ Brak | ✅ Brak |
| npm audit HIGH | ✅ Brak | 🔴 **4** (nanoid, postcss ×4, sharp ×4) |
| npm audit MODERATE | ⚠️ 3 | ⚠️ Zawarte w HIGH powyżej |
| Next.js bezpieczeństwo | ✅ Chroniony (16.2.7) | ⚠️ Wymaga 16.3.0 |
| Weryfikacja webhook Stripe | ✅ | ✅ |
| Idempotencja webhook (Redis) | ⚠️ Ryzyko | ✅ **NAPRAWIONE** |
| Rate limiting `/api/extract-image` | ⚠️ Brak | ✅ **NAPRAWIONE** |
| Rate limiting `/api/checkout` | ⚠️ Brak | ⚠️ Nadal brak |
| Limit rozmiaru `image_base64` | 🔴 Brak | 🔴 Nadal brak |
| Sanitizacja slug | ✅ | ✅ |
| Walidacja checkout | ✅ | ✅ |
| `@anthropic-ai/sdk` aktualność | ⚠️ 10 wersji za | ⚠️ **16 wersji za** (0.116.0) |
| `stripe` aktualność | ⚠️ 1 wersja za | ⚠️ 2 patch wersje (22.4.0) |

**Następny audyt:** wrzesień 2026
