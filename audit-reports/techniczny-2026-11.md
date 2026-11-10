# Audyt techniczny writeback.pl — 2026-11-10

## STATUS: KRYTYCZNE — wymagana natychmiastowa aktualizacja Next.js

---

## Wersje zainstalowanych zależności (package.json)

| Pakiet | Zainstalowany | Najnowszy | Różnica |
|---|---|---|---|
| next | ^16.2.12 | **16.4.6** | ⚠️ MAJOR security gap |
| @anthropic-ai/sdk | ^0.100.1 | **1.7.0** | ⚠️ Major bump (0.x → 1.x) |
| stripe | ^22.2.0 | **23.1.0** | ⚠️ Major bump |
| @sentry/nextjs | ^10.69.0 | — | ⚠️ CRITICAL CVE |
| react | 19.2.4 | — | OK |
| pdf-lib | ^1.17.1 | — | OK |
| resend | ^6.12.4 | — | OK |
| posthog-js | ^1.411.0 | — | OK |

---

## Podatności npm (CRITICAL / HIGH / MEDIUM)

**Łącznie: 29 podatności — 3 CRITICAL, 10 HIGH, 16 MODERATE**

### CRITICAL

#### 1. `@sentry/nextjs` 10.0.0-alpha.0 – 10.76.1
- **CVE**: GHSA-mchm-gjx6-7h55
- **Opis**: Middleware bypass gdy używana jest konfiguracja Tunnel route. Atakujący może ominąć middleware Sentry i potencjalnie pominąć autoryzację / logowanie błędów.
- **Fix**: `npm audit fix`

#### 2. `dompurify` <=3.4.16 — 5 podatności XSS
- GHSA-p98j-92pf-mc4p — IN_PLACE: zdarzenia DOM po usunięciu węzła (DOM XSS)
- GHSA-6688-9rhm-gjv2 — IN_PLACE: rawtext root z atakującym znacznikiem
- GHSA-cg2g-xh64-v4q7 — SAFE_FOR_TEMPLATES bypass w shadow root
- GHSA-mrv2-3pqr-j5jr — niekompletny fix dla GHSA-p98j-92pf-mc4p
- GHSA-c6gr-qvv4-5v3f — SMIL attributeName=href bypass dla XHTML
- **Fix**: `npm audit fix`

### HIGH

| Pakiet | Podatność | Opis |
|---|---|---|
| `brace-expansion` | GHSA-q2hr-2g5m-vwhr, GHSA-qhr7-859c-m2p7, GHSA-6j4f-fj2g-mc7p | DoS via quadratic/recursion expansion |
| `browserslist` <=4.28.6 | GHSA-c83g-rgw3-j3cx, GHSA-73wf-gq98-2v4g | Nieograniczony wzrost pamięci + prototype write przez stats.json |
| `fast-uri` 3.0.0–3.1.8 | 10 CVE | SSRF via IPv6, host confusion, scheme injection, percent-encoding |
| `glob` 9.0.0–14.0.1 | GHSA-3g3m-2fjr-6pw4 | AbortSignal cancellation bypass |
| `source-map-js` | GHSA-68fv-2mgg-jv7q | Event-loop DoS przez indexed source-map section offsets |
| `vite` 8.2.0–8.2.2 | GHSA-698v-4r3x-3vcv, GHSA-r825-w8mm-5pxw, GHSA-587h-7wmj-h5pm, GHSA-9jrq-w75r-8gcw, GHSA-rq7h-c2jc-7f22, GHSA-vfpm-58rq-9qcg | Arbitrary command execution, cross-origin script, file access outside fs.allow |
| `zod` <4.6.6 | GHSA-mrhx-c7xc-m3w5 | Memory exhaustion przy walidacji oversized collections |

### MODERATE

- `@vitest/mocker` <=4.1.11 — Path traversal + code injection via mock registration (GHSA-82fw-gwwq-j7x9, GHSA-qxg6-89mg-rqv8)
- `vitest` i `@vitest/coverage-v8` — transitive dependency na vulnerable mocker
- `baseline-browser-mapping` — DoS via invalid input (GHSA-w5vr-8v7q-w6rv)

---

## Nieaktualne zależności — aktualizacje major

### Next.js: 16.2.12 → 16.4.6 — KRYTYCZNE ⚠️

Trzy batche security release pominięto:

**Lipiec 2026 (16.2.11):**
- CVE-2026-64642 (HIGH) — Middleware bypass w Turbopack apps z single locale
- CVE-2026-64641 (HIGH) — Server Actions DoS

**Wrzesień 2026 (16.3.8):**
- SSRF w image optimizer (HIGH)
- Cache poisoning i information disclosure (MEDIUM)

**Październik 2026 (16.4.1) — CRITICAL, CVSS 9.5:**
- **CVE-2026-96889** — Memory corruption w SVG image processing (glibc Linux) → RCE
- **GHSA-673q-mjm6-r5xr** — `"use cache"` functions z multiple typed arrays → RCE

Obecna wersja `^16.2.12` jest podatna na oba krytyczne RCE. Fix: `npm install next@latest`.

### @anthropic-ai/sdk: 0.100.1 → 1.7.0

Skok z 0.x do stabilnego 1.x. Wymaga weryfikacji breaking changes przed aktualizacją. Sprawdzić changelog Anthropic SDK.

### stripe: 22.2.0 → 23.1.0

Major version bump. Sprawdzić migrację — potencjalne breaking changes w API typach lub inicjalizacji.

---

## Problemy bezpieczeństwa w kodzie

### 1. `app/api/extract-image/route.ts` — BRAK limitu rozmiaru payload

**Ryzyko**: HIGH

```ts
const { image_base64 } = body;
if (!image_base64) return NextResponse.json({ error: "No image" }, { status: 400 });
```

Brak walidacji długości `image_base64`. Atakujący może wysłać string Base64 o rozmiarze dziesiątek MB, co powoduje:
- OOM/crash procesu
- Wysokie koszty API Anthropic
- Blokadę instancji Vercel

Rate limit (10/min) nie chroni przed dużymi payloadami w dopuszczalnych requestach.

**Rekomendacja**: Dodać walidację przed dekodowaniem:
```ts
if (image_base64.length > 7_000_000) { // ~5 MB po dekodowaniu
  return NextResponse.json({ error: "Image too large" }, { status: 413 });
}
```

### 2. `app/api/checkout/route.ts` — Brak walidacji formatu email

**Ryzyko**: LOW

Pole `email` trafia bezpośrednio do `customer_email` w Stripe bez walidacji formatu. Stripe zwaliduje, ale błąd wraca dopiero po wywołaniu API (200ms opóźnienie). Opcjonalny fix: dodać prostą regex walidację przed wywołaniem Stripe.

### 3. `app/api/checkout/route.ts` — Brak rate limitingu

**Ryzyko**: MEDIUM

Endpoint `/api/checkout` nie ma żadnego rate limitingu. Atakujący może wysyłać wiele żądań z dużymi `image_base64` (wywołanie Anthropic w `extractImageContext`), co może generować wysokie koszty API przed dotarciem do Stripe.

**Rekomendacja**: Dodać `rateLimit()` analogicznie do extract-image (np. 20/min per IP).

### 4. `app/blog/[slug]/page.tsx` — Slug prawidłowo sanitizowany

**Ryzyko**: BRAK

Slug jest walidowany przez `getPost(slug)` zwracający listę znanych wpisów. Nieznany slug → `notFound()`. Użyty w URL-ach tylko przez interpolację template strings w bezpiecznych kontekstach (href, JSON.stringify). Brak podatności.

### 5. `app/api/webhook/stripe/route.ts` — Weryfikacja podpisu poprawna

**Ryzyko**: BRAK

`webhooks.constructEvent(body, sig, secret)` poprawnie weryfikuje HMAC. Raw body czytany przez `req.text()` — bez parsowania JSON przed weryfikacją. Deduplication przez Redis `nx: true`. Wszystko prawidłowo.

---

## Rekomendacje (priorytetyzowane)

### PILNE (tydzień)

1. **Zaktualizować Next.js do 16.4.6**
   ```bash
   npm install next@^16.4.6
   git commit -m "security: update next to 16.4.6 (CVE-2026-96889, GHSA-673q-mjm6-r5xr)"
   ```
   Dwa krytyczne RCE (CVSS 9.5) dotyczą aplikacji Next.js na glibc Linux (Vercel).

2. **Uruchomić `npm audit fix`**
   ```bash
   npm audit fix
   ```
   Powinno naprawić większość z 29 podatności (sentry, dompurify, brace-expansion, browserslist, fast-uri, glob, source-map-js, zod, vite, vitest).

3. **Dodać limit rozmiaru w `app/api/extract-image/route.ts`**
   Walidacja `image_base64.length` przed przetwarzaniem (maks. ~7MB = ~5MB zdekodowane).

### WAŻNE (miesiąc)

4. **Zaktualizować `@anthropic-ai/sdk` do ^1.7.0**
   - Przejrzeć breaking changes 0.x → 1.x
   - Przetestować na dev przed wdrożeniem

5. **Zaktualizować `stripe` do ^23.x**
   - Sprawdzić migration guide Stripe SDK v23
   - Przetestować webhook handling

6. **Dodać rate limiting na `/api/checkout`**
   Dodać `rateLimit(req, "checkout", 20, "1 m")` analogicznie do extract-image.

### NISKIE PRIORYTETY (kwartał)

7. Walidacja formatu email na checkout (lepsza UX + security defence-in-depth)
8. Regularny `npm audit` w CI/CD (GitHub Actions)

---

## Podsumowanie ryzyka

| Kategoria | Ocena | Komentarz |
|---|---|---|
| Next.js CVE | 🔴 KRYTYCZNE | RCE CVSS 9.5, natychmiastowa aktualizacja |
| npm audit | 🔴 KRYTYCZNE | 3 critical, 10 high, `npm audit fix` |
| extract-image payload | 🟠 HIGH | Brak limitu rozmiaru, łatwy fix |
| checkout rate limit | 🟡 MEDIUM | Ryzyko kosztowe przez API abuse |
| Webhook Stripe | 🟢 OK | Poprawna weryfikacja podpisu |
| Blog slug | 🟢 OK | Whitelist lookup, notFound() |
| Dane osobowe w metadanych | 🟢 OK | Truncowane, nie logowane |

---

*Raport wygenerowany: 2026-11-10 przez Claude (automated audit)*
