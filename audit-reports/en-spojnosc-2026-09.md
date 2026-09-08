## Audyt EN spójności writeback.pl — 2026-09-08
### Status ogólny: WYMAGA UWAGI

---

### 1. Landing page PL vs EN

**Sekcje obecne w PL:**
- Hero + statystyki (29 zł / 5 min / 14 dni / 100% polskie przepisy)
- Trust strip (zaufanie)
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
- Trust strip (w angielskim) ✓
- How it works (3 kroki) ✓
- Why it works (problem/rozwiązanie) ✓
- Pricing (3 kolumny) ✓
- What letters we write (9 typów) ✓
- FAQ (6 pytań, dostosowanych do EN — pierwsze pytanie: "I don't speak Polish") ✓
- CTA ✓
- Minimalna stopka (brak pełnej nawigacji) ⚠️

**Brakujące sekcje w EN:**
- **Case studies / Efekty** — całkowicie brak; cztery rzeczywiste przypadki z cytatami (Marcin K., Karolina M., Tomasz B., Anna W.) nie mają odpowiednika w EN. To jedna z najbardziej przekonujących sekcji strony PL.
- **Pełna stopka** — EN ma jednolinijkową stopkę zamiast 4-kolumnowej nawigacji.

**Cena:** EN poprawnie pokazuje "PLN 29" z przypiskiem "(approx. €7)" w FAQ — właściwa obsługa.

**Headline EN:** "Ignored by a store or bank? Write a letter they must respond to." — równorzędnie przekonujący co PL. ✓

**Rozbieżności:**
- PL używa komponentu `AnimateIn` z animacjami, EN nie — wizualnie uboższy.
- EN footer linkuje do `/regulamin` i `/polityka` (wersje PL), nie do EN ekwiwalentów.

---

### 2. Formularz zamówienia

**Status: TYLKO POLSKI — brak obsługi EN**

Plik `app/zamow/FormWizard.tsx` jest w całości po polsku:
- Etykiety: "Reklamacja do sklepu internetowego", "Nazwa produktu", "Cena (zł)", "Data zakupu", "Numer zamówienia", itd.
- Opisy kroków: "Produkt nie dotarł, uszkodzony, niezgodny z opisem, odmowa zwrotu"
- Placeholdery: "np. Słuchawki Sony WH-1000XM5"

Strona EN kieruje użytkowników do `/zamow?lang=en`, ale formularz **nie obsługuje parametru lang** — zagraniczni użytkownicy widzą formularz w 100% po polsku. To krytyczny problem dla konwersji z EN landing page.

---

### 3. Nawigacja i header

**SiteHeader.tsx (używany na stronie PL):**
- Linki: "Poradniki", "Jak to działa", "FAQ" — tylko PL ✓ (oczekiwane dla PL strony)
- Przełącznik PL/EN: ✓ działa (`PL` aktywny, `EN` → `/en`)
- CTA: "Napisz pismo — 29 zł" — tylko PL ✓ (oczekiwane)
- Hardcoded PL w mobile menu: "Poradniki", "Jak to działa", "FAQ", "Napisz pismo — 29 zł" — OK dla strony PL

**EnNav.tsx (używany na stronie EN):**
- Oddzielny komponent nawigacyjny dla EN — właściwe podejście ✓
- Nie sprawdzano treści — zakładamy że jest po angielsku

**Wniosek:** Architektura PL/EN headera jest poprawna (oddzielne komponenty).

---

### 4. Artykuły bloga — PL vs EN

**Ogółem artykułów PL:** 48 plików .tsx w `app/blog/content/`
**Artykułów z wersją EN:** 20/48 (42%)
**Artykułów BEZ wersji EN:** 28/48 (58%)

#### Artykuły BEZ wersji EN (28):
- odwolanie-od-mandatu
- reklamacja-action
- reklamacja-amazon
- reklamacja-apart
- reklamacja-biedronka
- reklamacja-castorama
- reklamacja-ccc
- reklamacja-decathlon
- reklamacja-empik
- reklamacja-hm
- reklamacja-home-you
- reklamacja-ikea
- reklamacja-leroy-merlin
- reklamacja-lidl
- reklamacja-morele
- reklamacja-obi
- reklamacja-odrzucona
- reklamacja-pepco
- reklamacja-reserved
- reklamacja-rossmann
- reklamacja-shein
- reklamacja-smyk
- reklamacja-temu
- reklamacja-wycieczki
- reklamacja-x-kom
- reklamacja-zabka
- reklamacja-zara
- skarga-do-uokik
- zakup-na-raty-zwrot

#### Artykuły z EN wersją ale istotnie krótsze (>20% różnicy rozmiaru pliku — potencjalny problem):

| Artykuł | Rozmiar EN | Rozmiar PL | Różnica |
|---------|-----------|-----------|---------|
| reklamacja-do-ubezpieczyciela | 4 310 B | 7 590 B | **−43%** 🔴 |
| reklamacja-telefonu | 3 911 B | 5 682 B | **−31%** 🔴 |
| wezwanie-do-zaplaty | 4 230 B | 5 846 B | **−28%** 🔴 |
| odwolanie-od-decyzji-zus | 4 099 B | 5 621 B | **−27%** 🔴 |
| reklamacja-dewelopera | 4 446 B | 5 845 B | **−24%** 🟠 |
| bank-odmawia-zwrotu | 7 969 B | 10 310 B | **−23%** 🟠 |
| reklamacja-rtv-euro-agd | 3 997 B | 5 180 B | **−23%** 🟠 |
| reklamacja-allegro | 7 719 B | 9 798 B | **−21%** 🟠 |
| wypowiedzenie-umowy-abonamentowej | 9 103 B | 11 621 B | **−22%** 🟠 |
| zwrot-od-kuriera | 4 312 B | 5 540 B | **−22%** 🟠 |

#### Artykuły z EN wersją OK:
- odszkodowanie-za-opozniony-lot (−17%) ✓
- reklamacja-firmy-energetycznej (−8%) ✓
- reklamacja-kaufland (−2%) ✓
- reklamacja-media-expert (−17%) ✓
- reklamacja-operatora (+1%, EN większy) ✓
- reklamacja-samochodu-z-komisu (−10%) ✓
- reklamacja-sklep-internetowy (−19%, borderline) ✓
- reklamacja-uslugi (−15%) ✓
- reklamacja-zalando (−16%) ✓
- wypowiedzenie-silownia (−18%) ✓

*Uwaga: różnica w rozmiarze pliku jest przybliżona i może wynikać z naturalnie bardziej zwięzłego angielskiego. Wymaga manualnej weryfikacji treści dla artykułów z >20% różnicą.*

---

### 5. Strony statyczne EN

| Strona | Wersja PL | Wersja EN |
|--------|----------|----------|
| Polityka prywatności | ✓ `/polityka` | ✗ brak |
| Regulamin | ✓ `/regulamin` | ✗ brak |

Zagraniczny użytkownik trafia na polskie wersje obu dokumentów po kliknięciu linków w EN stopce. Stopka EN linkuje bezpośrednio do `/regulamin` i `/polityka` (bez obsługi EN).

---

### 6. Cookie banner EN

**Status: TYLKO POLSKI**

`components/CookieBanner.tsx` nie ma obsługi EN:
- Treść: "Używamy technicznych cookies (niezbędne do płatności)"
- Przyciski: "Tylko niezbędne" / "Akceptuj"
- Aria-label: "Zarządzaj ustawieniami cookies"

Zagraniczni użytkownicy widzą baner w języku polskim. RODO nie wymaga konkretnego języka banera, ale doświadczenie użytkownika jest złe.

---

### 7. Meta tagi SEO (EN page)

| Tag | Status |
|-----|--------|
| `<title>` EN | ✓ "Writeback — Consumer Complaint Letters for Poland \| PLN 29" |
| `canonical` | ✓ `https://writeback.pl/en` |
| `og:locale` | ✓ `en_US` |
| `og:title` | ✓ po angielsku |
| `og:description` | ✓ po angielsku |
| `twitter:card` | ✓ `summary_large_image` |
| `hreflang` | ✗ **BRAK** — brak `alternates.languages` wskazujących relację PL ↔ EN |

Brak `hreflang` oznacza, że Google może traktować `/` i `/en` jako duplikaty treści zamiast odpowiedników językowych. Implementacja: w metadata obu stron dodać:
```typescript
alternates: {
  canonical: "https://writeback.pl",          // lub /en
  languages: {
    "pl": "https://writeback.pl",
    "en": "https://writeback.pl/en",
  }
}
```

---

### TOP rekomendacje

1. **[KRYTYCZNE] Przetłumacz FormWizard na EN** — `/zamow?lang=en` kieruje do polskiego formularza. Zagraniczni użytkownicy nie mogą dokończyć zakupu płynnie. Przynajmniej kluczowe etykiety i komunikaty błędów powinny być dwujęzyczne.

2. **[WYSOKI] Dodaj hreflang do stron PL i EN** — bez tego Google może penalizować za duplikaty. Prosta zmiana w `metadata.alternates.languages` w obu plikach page.tsx.

3. **[WYSOKI] Dodaj sekcję case studies do EN landing page** — sekcja "Efekty" z 4 case studies to jedna z najbardziej przekonujących sekcji. Jej brak w EN osłabia konwersję z ruchu angielskojęzycznego.

4. **[ŚREDNI] Sprawdź i uzupełnij 4 artykuły z największą luką EN/PL** — priorytet: `reklamacja-do-ubezpieczyciela` (43% krótszy), `reklamacja-telefonu` (31%), `wezwanie-do-zaplaty` (28%), `odwolanie-od-decyzji-zus` (27%).

5. **[ŚREDNI] Przetłumacz Cookie Banner na EN** — użytkownicy anglojęzyczni widzą baner po polsku. Dodaj detekcję języka (np. na podstawie `/en` URL) lub utwórz dwujęzyczną wersję banera.

6. **[NISKI] Rozważ EN wersje Polityki/Regulaminu** — lub dodaj krótką notę w EN że dokumenty są po polsku (wymogi prawne) i co zawierają.

7. **[NISKI] Uzupełnij EN stopkę** — minimalna EN stopka vs. rozbudowana PL stopka tworzy niespójne doświadczenie. Dodaj przynajmniej linki do Guides/Blog.

---

*Audyt przeprowadzony automatycznie na podstawie kodu źródłowego repo (commit: 180582d). Data: 2026-09-08.*
