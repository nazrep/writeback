# Audyt techniczny writeback.pl — wrzesień 2026

**Data:** 10 września 2026  
**Status: KRYTYCZNE — wymaga natychmiastowej aktualizacji Next.js**

---

## Podatności npm (wynik: 11 podatności — 1 krytyczna, 6 wysokich, 4 umiarkowane)

### KRYTYCZNE

| Pakiet | Wersja | CVE / Advisory | Opis |
|--------|--------|----------------|------|
| `next` | ^16.2.12 (≤16.3.2) | GHSA-p293-qw3h-jr36 | Unauthenticated Remote Code Execution na serwerach Windows |
| `next` | ^16.2.12 (≤16.3.2) | GHSA-2xp9-vwfh-vxw4 | Unauthenticated RCE w Image Optimization API przy plikach AVIF |

> **Uwaga:** Aplikacja hostowana na Vercel (Linux). CVE dotyczące Windows-hosted servers nie dotyczy Vercela, natomiast podatność AVIF może dotyczyć dowolnego środowiska. Zalecana natychmiastowa aktualizacja do 16.3.3.

### WYSOKIE

| Pakiet | Wersja | Advisory | Opis |
|--------|--------|----------|------|
| `browserslist` | ≤4.28.6 | GHSA-c83g-rgw3-j3cx | Nieograniczony wzrost pamięci (OOM) przy wielu różnych zapytaniach |
| `browserslist` | ≤4.28.6 | GHSA-73wf-gq98-2v4g | Niekontrolowany zapis do prototypu przez browserslist-stats.json |
| `fast-uri` | 3.0.0–3.1.5 | GHSA-f65p-4m7j-42xc | SSRF przez nieprawidłowe IPv6 |
| `fast-uri` | 3.0.0–3.1.5 | GHSA-fph4-wmhf-6fwf | SSRF przez wielokrotne dekodowanie procent-hostname |
| `fast-uri` | 3.0.0–3.1.5 | GHSA-5jgf-p345-68v8, GHSA-jqff-g426-hqxp | Host confusion przez IDN i percent-encoded scheme |
| `js-yaml` | 4.0.0–4.3.1 | GHSA-2883-xcg3-v3hh | CPU DoS przez puste klucze merge (maxTotalMergeKeys) |
| `nanoid` | <3.3.18 | GHSA-2v37-7h3g-55p8 | Nieskończona pętla gdy size=0 w custom generatorach |
| `postcss` | ≤8.5.22 (via next) | GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849 | XSS przez </style>, odczyt plików przez sourceMappingURL |
| `sharp` | ≤0.35.4 (via next) | GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c | Dziedziczone luki w libvips i libheif (CVE-2026-33327, 33328, 35590, 35591) |

### UMIARKOWANE

| Pakiet | Wersja | Advisory | Opis | Środowisko |
|--------|--------|----------|------|------------|
| `@vitest/mocker` | 2.1.0–4.1.10 | GHSA-82fw-gwwq-j7x9 | Path Traversal / Arbitrary File Read w redirect mock | **dev only** |
| `vitest` | (via mocker) | — | Zależność od podatnej wersji @vitest/mocker | **dev only** |
| `@vitest/coverage-v8` | (via vitest) | — | Zależność od podatnej wersji vitest | **dev only** |
| `baseline-browser-mapping` | ≥2.0.0 <2.11.0 | GHSA-w5vr-8v7q-w6rv | DoS przez nieprawidłowe wejście (zakończenie procesu) | build |

---

## Nieaktualne zależności (major/znaczące aktualizacje)

| Pakiet | Wersja w package.json | Najnowsza wersja | Różnica | Priorytet |
|--------|----------------------|------------------|---------|-----------|
| `next` | ^16.2.12 | **16.3.3** | patch (security) | 🔴 KRYTYCZNY |
| `@anthropic-ai/sdk` | ^0.100.1 | **0.124.0** | +24 minor | 🟠 Wysoki |
| `stripe` | ^22.2.0 | **22.6.1** | +4 patch | 🟡 Umiarkowany |

> `npm audit fix` powinno automatycznie zaktualizować większość podatnych zależności pośrednich (browserslist, fast-uri, js-yaml, nanoid, postcss, sharp). Next.js 16.2.12 → 16.3.3 wymaga ręcznej aktualizacji lub `npm audit fix --force`.

---

## Problemy bezpieczeństwa w kodzie

### 1. Brak limitu rozmiaru image_base64 w `/api/extract-image` — ŚREDNI

**Plik:** `app/api/extract-image/route.ts`

Endpoint przyjmuje dowolnie duże pole `image_base64` bez walidacji rozmiaru. Atakujący może:
- Wysłać wielomegabajtowy string zużywając pamięć RAM i czas CPU serwera
- Wielokrotnie wywoływać endpoint (rate limit: 10/min/IP) z dużymi plikami, generując koszty Anthropic API
- Bypass: użycie wielu IP lub różnych nagłówków X-Forwarded-For

**Rekomendacja:** Dodać limit rozmiaru body (np. 2 MB) i sprawdzić długość base64 przed wysłaniem do API.

```typescript
// Proponowana walidacja (dodać przed wysłaniem do Anthropic):
const MAX_BASE64_BYTES = 2 * 1024 * 1024; // 2 MB
if (Buffer.byteLength(image_base64, 'base64') > MAX_BASE64_BYTES) {
  return NextResponse.json({ error: "Image too large" }, { status: 413 });
}
```

### 2. Brak rate limitingu na `/api/checkout` — NISKI

**Plik:** `app/api/checkout/route.ts`

Endpoint tworzenia sesji Stripe nie ma rate limitingu. Pomimo że tworzenie sesji nie kosztuje kredytów Stripe bez płatności, umożliwia:
- Spam nieopłaconych sesji (każda zawiera wywołanie Anthropic API do analizy obrazu jeśli podano `image_base64`)
- Potencjalne nadużycie kosztów API przy podaniu `image_base64`

**Rekomendacja:** Dodać `rateLimit(req, "checkout", 5, "1 m")` analogicznie jak w extract-image.

### 3. Slug bloga — BEZPIECZNY (brak problemu)

**Plik:** `app/blog/[slug]/page.tsx`

Slug jest walidowany przez `getPost(slug)` — jeśli nie istnieje w statycznej tablicy POSTS, zwracany jest `notFound()`. Strona jest statycznie generowana (`generateStaticParams`), więc slug nie jest używany w zapytaniach DB ani ścieżkach pliku systemowego. Brak ryzyka path traversal ani injection.

### 4. Webhook Stripe — BEZPIECZNY

**Plik:** `app/api/webhook/stripe/route.ts`

- ✅ Weryfikacja podpisu HMAC: `webhooks.constructEvent(body, sig, secret)` — poprawna
- ✅ Deduplikacja przez Redis (NX + TTL 3600s) — zapobiega podwójnemu wysłaniu
- ✅ Sprawdzanie wieku zdarzenia (30 min) — zapobiega ponownemu wysłaniu po restarcie
- ✅ `after()` zapewnia odpowiedź 200 przed generowaniem PDF/email — Stripe nie będzie ponawiał
- ✅ Dane z `session.metadata` są ustawiane wyłącznie przez nasz kod checkout

### 5. Dane użytkownika w promptach LLM — AKCEPTOWALNE RYZYKO

**Plik:** `app/api/webhook/stripe/route.ts` (funkcja generowania pisma)

Dane z Stripe metadata (imię, adres, opis problemu) są interpolowane bezpośrednio do promptu LLM. Nie stanowi to klasycznego injection, ale użytkownik może próbować manipulować treścią pisma przez odpowiednio sformułowany `opis`. Jest to akceptowalne ryzyko w tym kontekście biznesowym — użytkownik sam ponosi odpowiedzialność za treść.

---

## Rekomendacje (priorytetyzowane)

### 🔴 PILNE (do wykonania w ciągu 24h)

1. **Zaktualizuj Next.js do 16.3.3**
   ```bash
   cd /home/user/writeback
   npm install next@16.3.3 eslint-config-next@16.3.3
   ```
   Łata CVE: GHSA-p293-qw3h-jr36, GHSA-2xp9-vwfh-vxw4 (RCE w Image Optimization API)

2. **Uruchom `npm audit fix`**
   ```bash
   npm audit fix
   ```
   Zaktualizuje: browserslist, fast-uri, js-yaml, nanoid, postcss, sharp, baseline-browser-mapping, @vitest/mocker

### 🟠 WAŻNE (do wykonania w ciągu tygodnia)

3. **Zaktualizuj @anthropic-ai/sdk do ^0.124.0**
   ```bash
   npm install @anthropic-ai/sdk@latest
   ```
   Wersja 0.100.1 jest 24 minor wersje za aktualną — mogą być ważne poprawki i nowe możliwości.

4. **Dodaj limit rozmiaru image_base64** w `app/api/extract-image/route.ts` (patrz opis wyżej)

### 🟡 DO ROZWAŻENIA (w ciągu miesiąca)

5. **Dodaj rate limiting na `/api/checkout`** — 5 requestów/minutę na IP

6. **Zaktualizuj Stripe SDK do 22.6.1**
   ```bash
   npm install stripe@22.6.1
   ```

7. **Sprawdź kompatybilność @anthropic-ai/sdk 0.124.0** z modelem `claude-opus-4-7` i `claude-haiku-4-5-20251001` — upewnij się że model IDs są nadal aktualne

---

## Podsumowanie

| Obszar | Status |
|--------|--------|
| Podatności npm | 🔴 1 krytyczna, 6 wysokich — **wymaga działania** |
| Aktualizacje zależności | 🟠 Next.js 3 wersje patch w tyle (security) |
| Weryfikacja webhook | ✅ Poprawna |
| Rate limiting | 🟡 Brak na /api/checkout |
| Walidacja inputu | 🟡 Brak limitu rozmiaru obrazu |
| Blog slug sanitization | ✅ Bezpieczny (statyczna tablica) |
| Sentry monitoring | ✅ Skonfigurowany |
| Deduplicacja płatności | ✅ Redis NX |

**Główne działanie:** `npm install next@16.3.3 eslint-config-next@16.3.3 && npm audit fix` — rozwiązuje krytyczną podatność i większość wysokich.
