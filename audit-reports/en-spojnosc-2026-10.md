## Audyt EN spójności writeback.pl — 2026-10-08
### Status ogólny: WYMAGA UWAGI

---

### 1. Landing page PL vs EN

**Sekcje obecne w PL (app/page.tsx):**
- Hero + statystyki (29 zł / 5 min / 14 dni / 100% polskie przepisy)
- Trust strip
- Jak to działa (3 kroki)
- Efekty / case studies (4 prawdziwe przypadki z cytatami)
- Dlaczego to działa (problem/rozwiązanie)
- Cena (porównanie 3 kolumn)
- Jakie pisma (9 typów)
- FAQ (6 pytań)
- CTA
- Rozbudowana stopka z pełną nawigacją (Pisma / Poradniki / Serwis)

**Sekcje w EN (app/en/page.tsx):**
- Hero + statystyki (PLN 29 / 5 min / 14 days / 100% Polish law) ✓
- Trust strip ✓
- How it works (3 kroki) ✓
- Why it works (problem/rozwiązanie) ✓
- Pricing (3 kolumny) ✓
- What letters we write (9 typów) ✓
- FAQ (6 pytań, dostosowanych do EN — pierwsze pytanie: "I don't speak Polish") ✓
- CTA ✓
- Minimalna stopka (brak pełnej nawigacji) ⚠️

**Brakujące sekcje w EN:**
- **Case studies / Efekty** — całkowicie brak; cztery rzeczywiste przypadki z cytatami (Marcin K., Karolina M., Tomasz B., Anna W.) nie mają odpowiednika w EN. To jedna z najbardziej przekonujących sekcji strony PL. *(Problem zgłoszony we wrześniu — bez zmian.)*
- **Pełna stopka** — EN ma jednolinijkową stopkę zamiast 4-kolumnowej nawigacji.

**Cena:** EN poprawnie pokazuje "PLN 29" z przypiskiem "(approx. €7)" w FAQ ✓

**Headline EN:** "Ignored by a store or bank? Write a letter they must respond to." — równorzędnie przekonujący co PL ✓

**FAQ EN vs PL:**
PL FAQ: (1) skuteczność vs Google, (2) brak odpowiedzi w 14 dni, (3) czy to porada prawna?, (4) co jeśli nie pomoże?, (5) ile kosztuje?, (6) bezpieczeństwo danych
EN FAQ: (1) formularz po angielsku?, (2) jakie sklepy/firmy?, (3) brak odpowiedzi w 14 dni, (4) czy to porada prawna?, (5) co jeśli nie pomoże?, (6) ile kosztuje?
**Brak w EN:** pytanie o bezpieczeństwo danych (RODO/GDPR) — warto dodać

**Rozbieżności:**
- PL używa komponentu `AnimateIn` z animacjami wejścia, EN nie — wizualnie uboższy.
- EN footer linkuje do `/regulamin` i `/polityka` (wersje PL) z angielskimi etykietami "Terms of Service" i "Privacy Policy".

---

### 2. Formularz zamówienia

**Status: TYLKO POLSKI — brak obsługi EN** *(bez zmian od września)*

Plik `app/zamow/FormWizard.tsx` (68 KB) jest w całości po polsku:
- Etykiety: "Reklamacja do sklepu internetowego", "Nazwa produktu", "Cena (zł)", "Data zakupu", "Numer zamówienia"
- Opisy typów: "Produkt nie dotarł, uszkodzony, niezgodny z opisem, odmowa zwrotu"
- Placeholdery: "np. Słuchawki Sony WH-1000XM5", "np. TechShop Sp. z o.o."

Strona EN kieruje do `/zamow?lang=en`, ale formularz **nie obsługuje parametru `lang`** — zagraniczni użytkownicy widzą formularz 100% po polsku. Problem krytyczny dla konwersji z EN landing page.

---

### 3. Nawigacja i header

**SiteHeader.tsx (strona PL):**
- Linki: "Poradniki", "Jak to działa", "FAQ" — PL ✓
- Przełącznik PL/EN: ✓ działa (PL aktywny → EN `/en`)
- CTA: "Napisz pismo — 29 zł" — PL ✓
- Mobile menu: identyczny, PL ✓

**EnNav.tsx (strona EN):**
- Oddzielny komponent nawigacyjny dla EN ✓
- Architektura PL/EN headera poprawna (oddzielne komponenty) ✓

---

### 4. Artykuły bloga — PL vs EN

**Porównanie z poprzednim miesiącem:**

| | Wrzesień 2026 | Październik 2026 | Zmiana |
|---|---|---|---|
| Artykuły PL (łącznie) | 48 | 53 | +5 nowych |
| Artykuły z wersją EN | 20 | 20 | **0 nowych EN** |
| Artykuły bez EN | 28 | 33 | **+5 bez EN** |
| Pokrycie EN | 42% | **38%** | ↓ |

Dodano 5 nowych artykułów PL w październiku — żaden bez wersji EN.

**Nowe artykuły PL bez wersji EN (dodane od września):**
- `odszkodowanie-za-opozniony-pociag` (12 294 B)
- `reklamacja-primark` (10 720 B)
- `reklamacja-vinted-olx` (14 309 B)
- `zwrot-towaru-uzywanego` (11 532 B)
- `reklamacja-smyk` (11 562 B)

**Artykuły BEZ wersji EN (33/53):**
```
odwolanie-od-mandatu, odszkodowanie-za-opozniony-pociag,
reklamacja-action, reklamacja-amazon, reklamacja-apart,
reklamacja-biedronka, reklamacja-castorama, reklamacja-ccc,
reklamacja-decathlon, reklamacja-empik, reklamacja-hm,
reklamacja-home-you, reklamacja-ikea, reklamacja-leroy-merlin,
reklamacja-lidl, reklamacja-morele, reklamacja-obi,
reklamacja-odrzucona, reklamacja-pepco, reklamacja-primark,
reklamacja-reserved, reklamacja-rossmann, reklamacja-shein,
reklamacja-smyk, reklamacja-temu, reklamacja-vinted-olx,
reklamacja-wycieczki, reklamacja-x-kom, reklamacja-zabka,
reklamacja-zara, skarga-do-uokik, zakup-na-raty-zwrot,
zwrot-towaru-uzywanego
```

**Artykuły z EN — istotna różnica rozmiaru (>20%, potencjalnie krótsze):**

| Artykuł | Rozmiar EN | Rozmiar PL | Różnica |
|---------|-----------|-----------|---------|
| reklamacja-do-ubezpieczyciela | 4 310 B | 7 590 B | **−43%** 🔴 |
| reklamacja-telefonu | 3 911 B | 5 682 B | **−31%** 🔴 |
| wezwanie-do-zaplaty | 4 230 B | 5 846 B | **−28%** 🔴 |
| odwolanie-od-decyzji-zus | 4 099 B | 5 621 B | **−27%** 🔴 |
| reklamacja-dewelopera | 4 446 B | 5 845 B | **−24%** 🟠 |
| reklamacja-rtv-euro-agd | 3 997 B | 5 180 B | **−23%** 🟠 |
| wypowiedzenie-umowy-abonamentowej | 9 103 B | 11 621 B | **−22%** 🟠 |
| bank-odmawia-zwrotu | 7 969 B | 10 310 B | **−23%** 🟠 |
| zwrot-od-kuriera | 4 312 B | 5 540 B | **−22%** 🟠 |
| reklamacja-allegro | 7 719 B | 9 798 B | **−21%** 🟠 |

*(Te same problemy co we wrześniu — brak poprawy)*

**Artykuły z EN wersją w normie (≤20% różnicy):**
odszkodowanie-za-opozniony-lot (−17%), reklamacja-firmy-energetycznej (−8%),
reklamacja-kaufland (−2%), reklamacja-media-expert (−17%),
reklamacja-operatora (+1%), reklamacja-samochodu-z-komisu (−10%),
reklamacja-sklep-internetowy (−19%), reklamacja-uslugi (−15%),
reklamacja-zalando (−16%), wypowiedzenie-silownia (−18%) ✓

---

### 5. Strony statyczne EN

| Strona | Wersja PL | Wersja EN |
|--------|----------|----------|
| Polityka prywatności | ✓ `/polityka` | ✗ brak |
| Regulamin | ✓ `/regulamin` | ✗ brak |

EN stopka linkuje do `/regulamin` i `/polityka` z angielskimi etykietami ("Privacy Policy", "Terms of Service"), ale docelowe strony są w 100% po polsku. Zagraniczny użytkownik klika w angielski link i trafia na polską stronę bez wyjaśnienia. *(Bez zmian od września.)*

---

### 6. Cookie banner EN

**Status: TYLKO POLSKI** *(bez zmian od września)*

`components/CookieBanner.tsx`:
- Treść: "Używamy technicznych cookies (niezbędne do płatności)"
- Przyciski: "Tylko niezbędne" / "Akceptuj"
- `aria-label`: "Zarządzaj ustawieniami cookies"

Brak detekcji języka — wszyscy użytkownicy (w tym anglojęzyczni) widzą baner po polsku.

---

### 7. Meta tagi SEO (strona EN)

| Tag | Status |
|-----|--------|
| `<title>` EN | ✓ "Writeback — Consumer Complaint Letters for Poland \| PLN 29" |
| `canonical` | ✓ `https://writeback.pl/en` (via `alternates.canonical`) |
| `og:locale` | ✓ `en_US` |
| `og:title` | ✓ po angielsku |
| `og:description` | ✓ po angielsku |
| `twitter:card` | ✓ `summary_large_image` |
| `hreflang` | ✗ **BRAK** |

`layout.tsx`: `<html lang="pl">` hardcoded — EN podstrona nie zmienia atrybutu `lang`.

Brak `hreflang` w obu plikach: `app/page.tsx` (PL) i `app/en/page.tsx` (EN). Google może traktować `/` i `/en` jako duplikaty zamiast odpowiedników językowych. *(Problem zgłoszony we wrześniu — bez zmian.)*

Poprawka:
```typescript
// app/page.tsx i app/en/page.tsx
alternates: {
  canonical: "https://writeback.pl",   // lub /en
  languages: {
    "pl": "https://writeback.pl",
    "en": "https://writeback.pl/en",
  }
}
```

---

### Podsumowanie zmian względem września

| Obszar | Wrzesień | Październik | Trend |
|--------|----------|-------------|-------|
| Case studies w EN | brak | brak | → |
| FormWizard EN | brak | brak | → |
| hreflang | brak | brak | → |
| Cookie banner EN | brak | brak | → |
| Strony statyczne EN | brak | brak | → |
| Pokrycie EN bloga | 42% | 38% | ↓ |

Brak postępów od września. Nowe artykuły PL dodawane bez wersji EN — pokrycie spada.

---

### TOP rekomendacje

1. **[KRYTYCZNE] Przetłumacz FormWizard na EN** — `/zamow?lang=en` trafia do 100% polskiego formularza. To bezpośrednia strata konwersji z ruchu angielskojęzycznego. Priorytet: tytuły typów pism, etykiety pól, komunikaty błędów.

2. **[WYSOKI] Dodaj hreflang PL↔EN** — prosta zmiana w `metadata.alternates.languages` w `app/page.tsx` i `app/en/page.tsx`. Chroni przed duplikacją w Google.

3. **[WYSOKI] Dodaj case studies do EN landing page** — sekcja "Efekty" z 4 przypadkami to najsilniejszy social proof. Jej brak w EN osłabia konwersję.

4. **[ŚREDNI] Uzupełnij EN wersje 4 artykułów z największą luką** — `reklamacja-do-ubezpieczyciela` (−43%), `reklamacja-telefonu` (−31%), `wezwanie-do-zaplaty` (−28%), `odwolanie-od-decyzji-zus` (−27%).

5. **[ŚREDNI] Ustal zasadę: nowy artykuł PL → EN razem** — 5 artykułów dodanych bez EN w październiku. Pokrycie spada z 42% do 38%.

6. **[ŚREDNI] Przetłumacz Cookie Banner** — dodaj detekcję URL `/en` i pokaż angielską wersję banera użytkownikom EN.

7. **[NISKI] Dodaj EN wersje Polityki/Regulaminu** — lub notę w EN wyjaśniającą że dokumenty są po polsku (wymóg prawa polskiego).

---

*Audyt przeprowadzony automatycznie na podstawie kodu źródłowego repo (SHA: e0d907247a4a7e64e58a73e9a9026e23330344a0). Data: 2026-10-08.*
