# Audyt EN spójności writeback.pl — 2026-07
**Data:** 8 lipca 2026  
**Status ogólny: WYMAGA UWAGI**

---

## Landing page PL vs EN

### Sekcje obecne w PL i ich odpowiedniki w EN

| Sekcja PL | Status EN |
|-----------|-----------|
| Hero | ✓ — równorzędny, dobrze zaadaptowany |
| Trust strip | ✓ — w pełni przetłumaczony |
| Jak to działa (3 kroki) | ✓ |
| **Social proof / case studies (4 przypadki z cytatami)** | ❌ **BRAK** |
| Dlaczego to działa (before/after) | ✓ |
| Cena / porównanie (0 zł / 29 zł / 300+ zł) | ✓ |
| Jakie pisma piszemy (9 typów) | ✓ |
| FAQ | ✓ — inne pytania, właściwie zaadaptowane dla EN |
| CTA | ✓ |
| Footer | ⚠️ — uproszczony (brak kolumn Pisma / Poradniki / Serwis) |

**Brakująca sekcja EN:** Social proof — 4 case studies z wynikami ("Pełny zwrot 1 240 zł w 8 dni" itp.) i cytatami. EN użytkownik nie widzi żadnego dowodu skuteczności pisma.

### Headline EN

- PL: *"Zignorowali Cię? Napisz pismo, które muszą przeczytać."*
- EN: *"Polish store ignored you? Write a letter they must respond to."*

Ocena: równorzędnie przekonujący ✓

### Cena

- PL: `29 zł` ✓
- EN: `PLN 29` w hero/CTA + `PLN 29 (approx. €7)` w FAQ ✓ — poprawna adaptacja

### FAQ w EN vs PL

EN ma 6 pytań, wszystkie inne niż PL — świadomie zaadaptowane pod odbiorców anglojęzycznych (np. "I don't speak Polish — can I still use Writeback?"). Brakuje odpowiednika PL pytania o bezpieczeństwo danych.

---

## Formularz zamówienia — język

**Status: TYLKO POLSKU (z angielskim banerem)**

- Kroki: `Typ pisma`, `Co się stało`, `Twoje dane`, `Podgląd`, `Płatność` → **polskie**
- Etykiety typów dokumentów: wszystkie polskie
- Placeholdery: polskie (np. `"np. Słuchawki Sony WH-1000XM5"`)
- Nazwy miesięcy w datowniku: polskie (`Styczeń`, `Luty`...)
- Komunikaty błędów: polskie (`"To pole jest wymagane"`, `"Wpisz pełny adres z kodem pocztowym"`)
- Zgody: polskie

**Obsługa EN:** Formularz `FormWizard` przyjmuje parametr `lang`. Gdy `lang === "en"` (URL: `/zamow?lang=en`), wyświetla baner:
> *"You can fill this form in English. Describe your situation in English — we'll generate the Polish letter for you."*

Baner jest jedyną angielską treścią w całym formularzu. Cała reszta UI pozostaje polska.

**Problem:** Zagraniczni użytkownicy trafiający z Google na formularz (przez PL URL `/zamow`) nie otrzymują nawet tego banera — `lang` nie jest ustawiony.

---

## Nawigacja i header

**SiteHeader (używany na stronach PL) — wszystkie polskie:**
- Linki: `Poradniki`, `Jak to działa`, `FAQ`
- CTA: `Napisz pismo — 29 zł`
- Mobilne menu: polskie
- Przełącznik PL/EN: ✓ DZIAŁA — widoczny `PL | EN` z linkiem do `/en`

**EnNav (używany na stronie EN):** osobny komponent — nie sprawdzano, ale EN strona działa poprawnie z własną nawigacją.

**Brak:** W SiteHeader (PL) CTA button `"Napisz pismo — 29 zł"` jest hardcoded po polsku. Nie ma wpływu na EN ścieżkę, bo EN używa EnNav.

---

## Artykuły bloga — PL vs EN

### Podsumowanie: 18/19 artykułów ma wersję EN

| Artykuł | .en.tsx | faqEn w posts.ts | Długość EN vs PL |
|---------|---------|-----------------|-----------------|
| reklamacja-zalando | ✓ | ❌ | 85/92 = 92% ✓ |
| reklamacja-do-ubezpieczyciela | ✓ | ❌ | ~OK |
| reklamacja-dewelopera | ✓ | ❌ | ~OK |
| odwolanie-od-decyzji-zus | ✓ | ❌ | ~OK |
| wezwanie-do-zaplaty | ✓ | ❌ | ~OK |
| reklamacja-uslugi | ✓ | ❌ | 61/58 = 105% ✓ |
| odszkodowanie-za-opozniony-lot | ✓ | ❌ | ~OK |
| **reklamacja-odrzucona** | **❌ BRAK** | **❌ BRAK** | — |
| reklamacja-sklep-internetowy | ✓ | ✓ | 96/113 = 85% ✓ |
| reklamacja-allegro | ✓ | ❌ | 79/96 = 82% ✓ |
| bank-odmawia-zwrotu | ✓ | ❌ | 78/99 = 79% ⚠️ |
| wypowiedzenie-umowy-abonamentowej | ✓ | ✓ | 89/106 = 84% ✓ |
| reklamacja-media-expert | ✓ | ✓ | 78/96 = 81% ✓ |
| reklamacja-rtv-euro-agd | ✓ | ✓ | 63/73 = 86% ✓ |
| **reklamacja-telefonu** | ✓ | ✓ | **59/79 = 75% ❌** |
| **zwrot-od-kuriera** | ✓ | ✓ | **64/85 = 75% ❌** |
| wypowiedzenie-silownia | ✓ | ✓ | 64/72 = 89% ✓ |
| reklamacja-firmy-energetycznej | ✓ | ❌ | ~OK |
| reklamacja-operatora | ✓ | ❌ | 70/67 = 104% ✓ |

**Artykułów bez wersji EN: 1/19** (`reklamacja-odrzucona` — brak .en.tsx, brak tytułu/opisu EN w posts.ts)

**Artykuły z istotnymi rozbieżnościami (EN >20% krótszy):**
- `reklamacja-telefonu`: EN 59 linii vs PL 79 (–25%)
- `zwrot-od-kuriera`: EN 64 linii vs PL 85 (–25%)

**Artykuły OK:** wszystkie pozostałe 17

**Cytowanie przepisów w EN:** Sprawdzono `reklamacja-zalando.en.tsx` — przepisy są prawidłowo tłumaczone (art. 43b UPK → Art. 43b CRA, art. 7a → Art. 7a CRA, art. 43d → Art. 43d(4) CRA). ✓

**faqEn w posts.ts:** 7/19 artykułów ma przetłumaczone FAQ w metadanych. Pozostałe 11 z .en.tsx ma prawdopodobnie FAQ osadzone w treści pliku lub korzysta z PL FAQ jako fallback — wymaga weryfikacji w renderowaniu `[slug]/page.tsx`.

---

## Strony statyczne EN

| Strona | EN dostępność |
|--------|---------------|
| `/regulamin` | ❌ — tylko PL |
| `/polityka` | ❌ — tylko PL |

**Problem:** Footer strony EN linkuje do `/regulamin` i `/polityka` z angielskimi labelami ("Terms of Service", "Privacy Policy"), ale otwierają polskie strony. Zagraniczny użytkownik nie może przeczytać regulaminu ani polityki prywatności w swoim języku.

---

## Cookie banner EN

**Status: TYLKO POLSKI**

Tekst banera: `"Używamy technicznych cookies (niezbędne do płatności) oraz opcjonalnie Google Analytics 4 do anonimowej analizy ruchu."`

Przyciski: `"Tylko niezbędne"` / `"Akceptuj"`

Brak detekcji języka. Anglojęzyczny użytkownik widzi baner w nieznanym języku. Potencjalny problem z GDPR/RODO jeśli użytkownik nie rozumie na co wyraża zgodę.

---

## Meta tagi SEO — strona EN

| Tag | Status |
|-----|--------|
| `<title>` | ✓ — `"Writeback — Consumer Complaint Letters for Poland | PLN 29"` |
| `description` | ✓ — anglojęzyczny |
| `canonical` | ✓ — `https://writeback.pl/en` |
| `og:locale` | ✓ — `en_US` |
| `og:title/description` | ✓ |
| **`hreflang`** | **❌ BRAK** — brak `alternates.languages` z parą `pl/en` |

Bez hreflang Google może nie łączyć `/` z `/en` jako wariantów językowych tego samego URL.

---

## TOP rekomendacje

1. **[KRYTYCZNE] Dodaj sekcję social proof do EN landing page** — 4 case studies to najsilniejszy element konwersji PL strony. EN użytkownik widzi twierdzenia bez żadnych dowodów. Priorytet: wysoki (bezpośredni wpływ na konwersję EN).

2. **[WYSOKI] Przetłumacz cookie banner na EN** — wymaganie GDPR: zgoda na cookies musi być świadoma. Użytkownik nieczytający polskiego nie może rozumieć na co wyraża zgodę. Rozwiązanie: detekcja języka `navigator.language` lub cookie z wyboru językowego.

3. **[WYSOKI] Dodaj hreflang do PL i EN stron** — w `app/layout.tsx` lub per-page metadata dodać `alternates.languages: { pl: '/', en: '/en' }`. Bez tego Google może indeksować obie wersje jako duplikaty.

4. **[ŚREDNI] Uzupełnij EN treść artykułów `reklamacja-telefonu` i `zwrot-od-kuriera`** — obie wersje EN są o 25% krótsze od PL (59 vs 79 i 64 vs 85 linii). Warto sprawdzić czy brakujące sekcje to celowe skróty czy pominięta treść.

5. **[ŚREDNI] Dodaj EN wersję artykułu `reklamacja-odrzucona`** — jedyny artykuł bez .en.tsx i bez metadanych EN. Temat ("rejected complaint — what next") jest bardzo przydatny dla EN użytkowników.

6. **[NISKI] Rozważ EN wersje `/regulamin` i `/polityka`** — lub minimum przekierowanie z informacją że dokument dostępny jest tylko po polsku, co jest prawnie dopuszczalne dla spółki z PL jurysdykcją. Aktualnie EN footer linkuje te strony po angielsku, ale treść jest polska — mylące.

7. **[NISKI] Formularz zamówienia** — pełne tłumaczenie UI formularza byłoby idealem, ale obecne rozwiązanie (EN baner + możliwość wpisania po angielsku) jest funkcjonalne. Minimalne usprawnienie: tłumaczenie nazw miesięcy i etykiet kroków dla `lang=en`.

---

*Raport wygenerowany automatycznie przez agenta jakości językowej writeback.pl.*
