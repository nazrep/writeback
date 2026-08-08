# Audyt spójności EN — writeback.pl
**Data:** 2026-08-08  
**Status:** WYMAGA UWAGI  
**Audytor:** automatyczny (Claude Code, zadanie cykliczne)

---

## 1. Strona główna — porównanie PL vs EN

| Element | PL (`/`) | EN (`/en`) | Status |
|---|---|---|---|
| Hero z CTA | ✅ | ✅ | OK |
| Trust strip (liczby: 29 zł / 5 min / 14 dni / 100%) | ✅ | ✅ (PLN 29) | OK |
| Jak to działa (3 kroki) | ✅ | ✅ | OK |
| Social proof / case studies (4 opinie) | ✅ | ❌ BRAK | **PROBLEM** |
| Sekcja Problem/Rozwiązanie (4 pary przed/po) | ✅ | ✅ | OK |
| Cena / kalkulator ROI | ✅ | ✅ | OK |
| Jakie pisma (9 typów) | ✅ | ✅ | OK |
| FAQ (6 pytań) | ✅ | ✅ (inne pytania!) | UWAGA |
| Footer z sekcjami nav (Pisma / Poradniki / Serwis) | ✅ | ❌ Minimalny footer | **PROBLEM** |
| Hreflang | ❌ | ❌ | **PROBLEM** |

**Szczegóły:**

- **Brak sekcji social proof na EN:** strona PL zawiera 4 case studies z konkretnymi kwotami i historiami klientów — budują zaufanie. Na EN tej sekcji brakuje, co obniża konwersję dla użytkowników anglojęzycznych.
- **Różne FAQ PL vs EN:** PL FAQ dotyczy "dlaczego lepsze niż Google", "czy dane są bezpieczne", "kiedy nie warto pisać". EN FAQ pyta o "I don't speak Polish", "which stores", "€7". Tematy nie nakładają się — może to być świadoma decyzja (dostosowanie do innej grupy docelowej), ale warto to odnotować.
- **Footer EN jest minimalny:** brak sekcji nawigacyjnych (Pisma / Poradniki / Serwis) dostępnych na PL. Linki do regulamin/polityka istnieją, ale serwis wydaje się niedokończony.
- **Hreflang nie skonfigurowany:** `app/en/page.tsx` ma `alternates: { canonical: "https://writeback.pl/en" }` i `openGraph: { locale: "en_US" }`, ale brakuje `alternates.languages` (`{ "pl": "https://writeback.pl", "en": "https://writeback.pl/en" }`). Google może nie rozpoznać wersji językowych.

---

## 2. Formularz zamówienia (`/zamow`)

| Element | Status |
|---|---|
| Banner informacyjny dla EN | ✅ wyświetlany gdy `?lang=en` |
| Kroki formularza | ❌ Tylko PL |
| Typy dokumentów (etykiety) | ❌ Tylko PL |
| Komunikaty błędów | ❌ Tylko PL |
| Wybieracz daty | ❌ Tylko PL |
| Zgody / tekst prawny | ❌ Tylko PL |
| Przycisk płatności | ❌ "Opłać i pobierz pismo — 29 zł" (PL) |

**Szczegóły:**

Formularz wyświetla baner: *"You can fill this form in English. Describe your situation in English — we'll generate the Polish letter for you."* — to dobry element. Jednak cały interfejs pozostaje po polsku:

- Kroki: "Typ pisma", "Co się stało", "Twoje dane", "Podgląd", "Płatność"
- Typy pism: "Reklamacja do sklepu", "Problem z bankiem", "Odwołanie od ZUS" itp.
- Błędy: "Wybierz typ skargi", "To pole jest wymagane", "Opisz sytuację"
- Przycisk: "Opłać i pobierz pismo — 29 zł"

Anglojęzyczny użytkownik nie zrozumie co wybiera ani jakie błędy popełnia.

---

## 3. Nawigacja i header

| Element | Status |
|---|---|
| PL/EN switcher (desktop) w SiteHeader | ✅ |
| PL/EN switcher (mobile) w SiteHeader | ❌ BRAK |
| EN strona używa osobnego komponentu EnNav | ✅ (świadoma decyzja) |
| Linki nawigacyjne PL w SiteHeader | ✅ PL |

**Szczegóły:**

`SiteHeader` (używany na stronach PL) zawiera przełącznik PL/EN na desktopie (hidden sm:flex), ale w mobilnym menu (`sm:hidden`) przełącznik jest nieobecny. Użytkownik mobilny przeglądający `/` nie może przejść do `/en` przez menu.

---

## 4. Artykuły blogowe — pokrycie EN

**Łączna liczba postów:** 45  
**Posty z plikiem `.en.tsx`:** 20 (44,4%)  
**Posty z metadanymi EN (`titleEn`) ale bez pliku `.en.tsx`:** 3  
**Posty bez jakiegokolwiek EN:** 22 (55,6% bez EN)

### Posty z metadanymi EN, ale bez treści EN (niekompletne):
- `skarga-do-uokik`
- `odwolanie-od-mandatu`
- `zakup-na-raty-zwrot`

Dla tych postów zdefiniowane jest `titleEn`/`descriptionEn` w `posts.ts`, ale nie istnieje odpowiedni plik `.en.tsx` — jeśli strona `/blog/[slug]/en` próbuje renderować EN, może wyrzucić błąd lub fallback.

### Posty wyłącznie po polsku (brak EN):
reklamacja-wycieczki, reklamacja-pepco, reklamacja-action, reklamacja-apart, reklamacja-biedronka, reklamacja-home-you, reklamacja-amazon, reklamacja-ikea, reklamacja-shein, reklamacja-temu, reklamacja-leroy-merlin, reklamacja-morele, reklamacja-hm, reklamacja-zara, reklamacja-rossmann, reklamacja-lidl, reklamacja-empik, reklamacja-decathlon, reklamacja-reserved, reklamacja-x-kom, reklamacja-castorama, reklamacja-odrzucona

Wiele z tych brakujących to artykuły o konkretnych sklepach (Biedronka, IKEA, Shein, Temu) — duży potencjał dla EN, zwłaszcza dla ekspatów kupujących w polskich sklepach online.

---

## 5. Strony statyczne

| Strona | Wersja PL | Wersja EN |
|---|---|---|
| `/polityka` (Polityka prywatności) | ✅ | ❌ BRAK |
| `/regulamin` (Regulamin) | ✅ | ❌ BRAK |

**Szczegóły:**

EN footer linkuje do `/polityka` z etykietą "Privacy Policy" i do `/regulamin` z etykietą "Terms of Service" — obie prowadzą do stron wyłącznie po polsku. Angielskojęzyczny użytkownik trafia na polskojęzyczne dokumenty prawne po kliknięciu linku opisanego po angielsku.

---

## 6. Cookie banner

| Element | Status |
|---|---|
| Treść po angielsku | ❌ |
| Prop `lang` lub wykrywanie języka | ❌ |
| Przyciski EN | ❌ |

**Szczegóły:**

`CookieBanner.tsx` wyświetla statyczny tekst po polsku dla wszystkich użytkowników, niezależnie od języka strony:
- "Używamy technicznych cookies (niezbędne do płatności)..."
- Przyciski: "Tylko niezbędne" / "Akceptuj"

Na stronie `/en` cookie banner pojawia się po polsku — niespójność.

---

## 7. Meta tagi / SEO

| Element | EN strona (`/en`) | Status |
|---|---|---|
| `<title>` i `description` po angielsku | ✅ | OK |
| `canonical` URL | ✅ `https://writeback.pl/en` | OK |
| `og:locale` | ✅ `en_US` | OK |
| `hreflang` (alternates.languages) | ❌ nieskonfigurowane | **PROBLEM** |
| Artykuły blogowe EN — meta tagi | Częściowe (23/45 mają `titleEn`) | UWAGA |

**Szczegóły:**

Brak hreflang oznacza, że Google nie wie o istnieniu wersji językowych. Wynik: strony PL i EN mogą konkurować ze sobą w wynikach wyszukiwania zamiast uzupełniać.

Poprawka: dodać do `app/en/page.tsx` i `app/page.tsx`:
```ts
alternates: {
  canonical: "https://writeback.pl",        // lub /en
  languages: {
    "pl": "https://writeback.pl",
    "en": "https://writeback.pl/en",
  }
}
```

---

## Priorytety napraw

| # | Problem | Wpływ | Trudność |
|---|---|---|---|
| 1 | Hreflang — dodać `alternates.languages` na PL i EN stronach | SEO wysoki | Niska |
| 2 | CookieBanner — dodać prop `lang` i EN tekst | UX / RODO | Niska |
| 3 | 3 posty z EN metadanymi bez `.en.tsx` (potencjalny błąd 404/crash) | Błąd | Niska |
| 4 | Formularz — tłumaczenie UI gdy `lang=en` | Konwersja | Średnia |
| 5 | SiteHeader — PL/EN switcher w mobile menu | UX | Niska |
| 6 | Sekcja social proof na EN stronie głównej | Konwersja | Średnia |
| 7 | `/en/polityka`, `/en/regulamin` lub przekierowanie z komunikatem | Zaufanie | Średnia |
| 8 | Footer EN — dodać sekcje nawigacyjne jak w PL | UX | Niska |
| 9 | 22 posty blogowe bez EN (szczególnie: ikea, shein, temu, amazon) | SEO / zasięg | Wysoka |

---

## Porównanie z poprzednim miesiącem (2026-07)

Raport `en-spojnosc-2026-07.md` dostępny w repozytorium. Bez automatycznego porównania diff — zalecane ręczne sprawdzenie czy priorytety z poprzedniego miesiąca zostały zaadresowane.

---

*Raport wygenerowany automatycznie · zadanie cykliczne · 2026-08-08*
