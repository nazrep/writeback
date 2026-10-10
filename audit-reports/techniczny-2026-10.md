# Audyt techniczny writeback.pl — październik 2026

**Data:** 10 października 2026  
**Status:** ⚠️ WYMAGA UWAGI — 1 KRYTYCZNA podatność w Next.js (RCE)

---

## Podatności npm (CRITICAL/HIGH/MEDIUM)

**Łącznie: 19 podatności (1 low, 4 moderate, 13 high, 1 critical)**

### 🔴 CRITICAL

#### Next.js — wielokrotne RCE i inne CVE (`next ^16.2.12`)
Pakiet Next.js posiada krytyczne podatności wymagające natychmiastowej aktualizacji do **16.3.6**:
- **GHSA-p293-qw3h-jr36** — Unauthenticated RCE na serwerach Windows
- **GHSA-2xp9-vwfh-vxw4** — Unauthenticated RCE w Image Optimization API przy plikach AVIF
- **GHSA-vcvr-r3jv-pc5j** — RCE w `next/og` ImageResponse (patch ze września 2026)
- **GHSA-4jqv-mc3x-m676** — Cache poisoning stron SSG/ISR w aplikacjach self-hosted
- **GHSA-39w2-rjm5-chcv** — Information disclosure w endpoincie MCP serwera deweloperskiego

**Naprawa:** `npm install next@^16.3.6` (nieobsługiwane przez `npm audit fix`, wymaga ręcznej aktualizacji).

---

### 🟠 HIGH

#### `brace-expansion` — DoS przez CPU/stack exhaustion
- GHSA-q2hr-2g5m-vwhr, GHSA-qhr7-859c-m2p7, GHSA-6j4f-fj2g-mc7p
- Wpływa na `@typescript-eslint`, `glob` — zależność dev

#### `braces` — stack exhaustion DoS
- GHSA-vfj7-8cjw-p6xm (zależność `eslint-config-next`, fix wymaga zmiany na 14.x — breaking change)

#### `browserslist` — OOM + crash via prototype write
- GHSA-c83g-rgw3-j3cx, GHSA-73wf-gq98-2v4g
- Fix dostępny via `npm audit fix`

#### `dompurify <=3.4.15` — DOM XSS
- GHSA-p98j-92pf-mc4p — IN_PLACE: armed event handlers po sanitizacji
- GHSA-6688-9rhm-gjv2 — force-removed rawtext root z attacker markup
- Fix dostępny via `npm audit fix`

#### `fast-uri 3.0.0–3.1.7` — SSRF i host confusion (6 CVE)
- GHSA-f65p-4m7j-42xc: SSRF via malformed IPv6
- GHSA-fph4-wmhf-6fwf: SSRF via percent-encoded hostname
- Pozostałe: host confusion, authority injection
- Fix dostępny via `npm audit fix`

#### `js-yaml 4.0.0–4.3.1` — CPU DoS
- GHSA-2883-xcg3-v3hh: maxTotalMergeKeys nie ogranicza CPU

#### `PostCSS` — XSS i arbitrary file read
- GHSA-qx2v-qp2m-jg93: XSS via `</style>` w CSS Stringify
- GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849: arbitrary file read via sourceMappingURL
- Fix dostępny via `npm audit fix`

#### `sharp <=0.35.5-rc.1` — CVE w libvips/libheif/librsvg
- GHSA-f88m-g3jw-g9cj: CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591
- GHSA-rgj7-g3m4-5g8c: GHSA-g89c-p67h-r497, GHSA-2jg2-4ch7-h545 (libheif)
- GHSA-wq5f-xc86-pv6w: CVE-2026-96889 (librsvg)
- Fix dostępny via `npm audit fix`

#### `source-map-js 1.0.0–1.2.1` — event-loop DoS
- GHSA-68fv-2mgg-jv7q
- Fix dostępny via `npm audit fix`

---

### 🟡 MODERATE

- `@vitest/mocker 2.1.0–4.1.10` — Path Traversal / Arbitrary File Read (GHSA-82fw-gwwq-j7x9), **tylko dev/tests**
- `vitest`, `@vitest/coverage-v8` — zależne od powyższego, **tylko dev/tests**
- `baseline-browser-mapping <2.11.0` — DoS via invalid input (GHSA-w5vr-8v7q-w6rv)

---

## Nieaktualne zależności (major updates)

| Pakiet | Zainstalowany | Najnowszy | Uwagi |
|--------|---------------|-----------|-------|
| `next` | ^16.2.12 | 16.3.6 | **KRYTYCZNE** — RCE, aktualizuj natychmiast |
| `@anthropic-ai/sdk` | ^0.100.1 | brak potwierdzenia z npm (sprawdź `npm view @anthropic-ai/sdk version`) | Sprawdź ręcznie |
| `stripe` | ^22.2.0 | 22.x (najnowsza linia) | Wygląda aktualnie |
| `vitest` | ^4.1.10 | 4.x (sprawdź) | Path traversal w 4.1.10, zaktualizuj |
| `@sentry/nextjs` | ^10.69.0 | Sprawdź | Brak danych |

---

## Problemy bezpieczeństwa w kodzie

### 1. Brak limitu rozmiaru `image_base64` — `app/api/extract-image/route.ts`
**Priorytet: WYSOKI**

Endpoint przyjmuje pole `image_base64` bez walidacji rozmiaru. Napastnik może wysłać wielomegabajtowy ciąg base64, powodując nadmierne zużycie pamięci i CPU przy dekodowaniu po stronie serwera.

```ts
const { image_base64 } = body;
if (!image_base64) return NextResponse.json({ error: "No image" }, { status: 400 });
// BRAK: sprawdzenia image_base64.length
```

Rate-limiting (10 req/min) częściowo mityguje problem, ale nie chroni przed jednym dużym requestem.

**Rekomendacja:**
```ts
if (image_base64.length > 2_000_000) { // ~1.5MB po dekodowaniu
  return NextResponse.json({ error: "Image too large" }, { status: 413 });
}
```

### 2. Brak walidacji rozmiaru `image_base64` w checkout — `app/api/checkout/route.ts`
**Priorytet: ŚREDNI**

Analogiczny problem — `image_base64` przesyłany do checkout (i dalej do `extractImageContext()`) nie jest walidowany co do rozmiaru, co może powodować długie przetwarzanie i koszty API Anthropic.

### 3. Brak walidacji formatu email — `app/api/checkout/route.ts`
**Priorytet: NISKI**

`data.email` jest przekazywany bezpośrednio do Stripe jako `customer_email` bez walidacji formatu. Stripe po swojej stronie może to odrzucić, ale warto walidować wcześniej.

### 4. slug w blog/[slug]/page.tsx — BEZPIECZNY
Slug jest walidowany przez `getPost(slug)` i `notFound()`. Wszystkie slugi pochodzą ze statycznej tablicy `POSTS`. Brak ryzyka injection.

### 5. Webhook Stripe — BEZPIECZNY
- Weryfikacja podpisu via `webhooks.constructEvent()` ✅
- Deduplication via Redis (nx: true) ✅
- Sprawdzenie wieku zdarzenia (30 min) ✅
- Przetwarzanie asynchroniczne via `after()` ✅

---

## Rekomendacje (priorytetyzowane)

### P0 — NATYCHMIAST (do 24h)

1. **Zaktualizuj Next.js do 16.3.6** — krytyczne RCE
   ```bash
   cd writeback && npm install next@^16.3.6 eslint-config-next@^16.3.6
   ```

### P1 — PILNE (do 7 dni)

2. **Napraw podatności bez breaking changes**
   ```bash
   npm audit fix
   ```
   Naprawi: PostCSS, browserslist, dompurify, fast-uri, source-map-js, sharp, @vitest/mocker, baseline-browser-mapping.

3. **Dodaj walidację rozmiaru `image_base64`** w `extract-image/route.ts` i `checkout/route.ts`.

### P2 — DO NASTĘPNEGO SPRINTU

4. **Zaktualizuj vitest** do najnowszej wersji po `4.1.10`.
5. **Sprawdź wersję `@anthropic-ai/sdk`** — uruchom `npm view @anthropic-ai/sdk version` i zaktualizuj jeśli dostępna nowa major.
6. **Dodaj walidację email** w checkout endpoint (prosty regex lub biblioteka `zod`).

### P3 — INFORMACYJNE

7. `braces` — fix wymaga obniżenia `eslint-config-next` do 14.x (breaking change), niezalecane bez testów. Można pominąć, bo to narzędzie deweloperskie.
8. `js-yaml` — sprawdź czy jest używany bezpośrednio, czy tylko przez zależność dev.

---

## Podsumowanie

| Kategoria | Ocena |
|-----------|-------|
| Podatności npm | ⚠️ KRYTYCZNE — 1 critical (Next.js RCE), 13 high |
| Aktualizacje major | ⚠️ Next.js 16.2 → 16.3.6 wymagana natychmiast |
| Bezpieczeństwo kodu | ⚠️ Brak limitu rozmiaru image w 2 endpointach |
| Stripe webhook | ✅ Prawidłowa weryfikacja |
| Blog slug | ✅ Bezpieczny |
| Rate limiting | ✅ Skonfigurowany w extract-image |

**Ogólna ocena: WYMAGA UWAGI — aktualizacja Next.js priorytetem #0.**
