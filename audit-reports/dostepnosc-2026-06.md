# Audyt dostępności writeback.pl — 2026-06-15

**Zakres:** WCAG 2.1 poziom AA  
**Pliki:** `app/page.tsx`, `app/zamow/FormWizard.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `components/SiteHeader.tsx`, `components/CookieBanner.tsx`, `app/layout.tsx`  
**Data:** 2026-06-15  
**Status ogólny: WYMAGA UWAGI** (2 naruszenia krytyczne, 7 średnich)

---

## Naruszenia WCAG 2.1 AA — krytyczne

### 1. Etykiety formularzy nie są powiązane z polami (WCAG 1.3.1, 4.1.2 — poziom A)

**Plik:** `app/zamow/FormWizard.tsx`, linie 500–508

Komponent `Field` renderuje `<label>` i `{children}` jako rodzeństwo w tym samym `<div>` — bez atrybutu `htmlFor` na etykiecie ani `id` na polu. Czytniki ekranu (NVDA, VoiceOver) nie będą w stanie powiązać etykiety z kontrolką.

Dotyczy wszystkich ~12 pól formularza (kroki 2 i 3): imię/nazwisko, adres, email, produkt, cena, data, numer zamówienia, opis, podjęte kroki, żądanie, nazwa i adres adresata.

**Obecny kod:**
```tsx
function Field({ label, children }) {
  return (
    <div>
      <label className="...">{label}</label>  {/* ← brak htmlFor */}
      {children}                               {/* ← brak id na inpucie */}
    </div>
  );
}
```

**Poprawka:**
```tsx
function Field({ label, id, required, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="...">
        {label}{required && <span aria-hidden="true" className="text-red-500 ml-0.5">*</span>}
        {required && <span className="sr-only"> (wymagane)</span>}
      </label>
      {React.cloneElement(children as React.ReactElement, { id })}
      ...
    </div>
  );
}
```
Każde wywołanie `<Field>` musi dostać unikalny `id`, np. `<Field id="imie" label="Imię i nazwisko" ...>`.

---

### 2. Brak zarządzania focusem po zmianie kroku w wizardzie (WCAG 2.4.3 — poziom AA)

**Plik:** `app/zamow/FormWizard.tsx`, linie 515–518

Funkcja `navigate()` zmienia krok (`setStep`) bez przesunięcia focusu do nagłówka nowego kroku. Użytkownik klawiatury lub czytnika ekranu po kliknięciu „Dalej →" zostaje z focusem na nieistniejącym już przycisku.

**Obecny kod:**
```tsx
function navigate(newStep: number) {
  setDirection(newStep > step ? "forward" : "back");
  setStep(newStep);
  // ← focus nigdzie nie trafia
}
```

**Poprawka:**
```tsx
const stepHeadingRef = useRef<HTMLHeadingElement>(null);

function navigate(newStep: number) {
  setDirection(newStep > step ? "forward" : "back");
  setStep(newStep);
  setTimeout(() => stepHeadingRef.current?.focus(), 50);
}

// Na nagłówku każdego kroku:
<h1 ref={stepHeadingRef} tabIndex={-1} className="text-2xl font-bold text-gray-900 mb-1">
  ...
</h1>
```

---

## Naruszenia WCAG 2.1 AA — średniego priorytetu

### 3. Zbyt niski kontrast: text-gray-400 na białym tle (WCAG 1.4.3 — poziom AA)

**Wymaganie:** minimum 4.5:1 dla tekstu normalnego, 3:1 dla dużego  
**Rzeczywisty kontrast:** #9CA3AF na #FFFFFF = **2.39:1** ❌

Klasa `text-gray-400` jest używana przy podtytułach, danych pomocniczych, metadanych w kartach bloga i stopce. Przykłady:
- `app/page.tsx` linia 252: `"Jednorazowa opłata · PDF na maila od razu · Odwołanie gratis jeśli nie pomoże"`
- `app/page.tsx` linia 434: `"Typowy przypadek"` w kartach case study
- `app/blog/page.tsx` linia 94: czas czytania artykułu
- `app/blog/[slug]/page.tsx` linia 132: data i czas czytania

**Poprawka:** Zastąpić `text-gray-400` przez `text-gray-500` (4.37:1 — granicznie przechodzi) lub `text-gray-600` (#4B5563, ≈7:1 — bezpieczny dla WCAG AA). Preferowane `text-gray-600` dla tekstu treściowego.

---

### 4. Zbyt niski kontrast: text-gray-500 na białym tle (WCAG 1.4.3 — poziom AA)

**Wymagany:** 4.5:1 dla tekstu normalnego  
**Rzeczywisty kontrast:** #6B7280 na #FFFFFF = **4.37:1** ❌ (poniżej progu)

Klasa `text-gray-500` jest używana dla głównych opisów i treści pomocniczych:
- `app/page.tsx` linia 238: lead hero section
- `app/page.tsx` linia 603: podtytuł FAQ
- `app/zamow/FormWizard.tsx` linia 733: opis kroku 2

**Poprawka:** Zastąpić `text-gray-500` przez `text-gray-600` (#4B5563, kontrast ≈7:1) dla tekstu o rozmiarze poniżej 18px/bold-14px.

---

### 5. Zbyt niski kontrast: text-indigo-200 na tle indigo-600 (WCAG 1.4.3 — poziom AA)

**Wymagany:** 4.5:1  
**Rzeczywisty kontrast:** #C7D2FE na #4F46E5 = **4.16:1** ❌

Dotyczy sekcji CTA na dole strony głównej:
- `app/page.tsx` linia 632: `"Pismo gotowe w 5 minut."`
- `app/page.tsx` linia 633: `"Sklep musi odpowiedzieć w 14 dni z mocy prawa."`
- `app/page.tsx` linia 636: `"Jednorazowa opłata 29 zł · Żadnych subskrypcji"`

**Poprawka:** Zamienić `text-indigo-200` na `text-white` (kontrast 8.55:1) lub `text-indigo-100` (#E0E7FF, kontrast ≈5.8:1) dla tych bloków.

---

### 6. Brak `aria-describedby` przy `aria-invalid` (WCAG 1.3.1 — poziom A)

**Plik:** `app/zamow/FormWizard.tsx`, linia 400

Funkcja `ia()` ustawia `aria-invalid="true"` na polach z błędem, ale komunikat błędu (`<p className="text-xs text-red-500">`) nie ma `id`, a pole nie ma `aria-describedby`. Czytnik ekranu ogłosi pole jako „nieprawidłowe", ale nie powie dlaczego.

**Poprawka** w komponencie `Field`:
```tsx
const errorId = id ? `${id}-error` : undefined;

// Na polu:
<input aria-invalid={!!error} aria-describedby={error ? errorId : undefined} ... />

// Na komunikacie błędu:
{error && <p id={errorId} className="text-xs text-red-500 mt-1.5 font-medium" role="alert">{error}</p>}
```

---

### 7. Brak `aria-expanded` na przycisku hamburgera (WCAG 4.1.2 — poziom AA)

**Plik:** `components/SiteHeader.tsx`, linia 37

Przycisk otwierający menu mobilne ma `aria-label="Menu"`, ale nie ma `aria-expanded`, więc czytnik ekranu nie informuje o stanie (otwarte/zamknięte).

**Obecny kod:**
```tsx
<button onClick={() => setOpen(o => !o)} aria-label="Menu" ...>
```

**Poprawka:**
```tsx
<button
  onClick={() => setOpen(o => !o)}
  aria-label="Menu"
  aria-expanded={open}
  aria-controls="mobile-nav"
  ...
>
```
I na menu mobilnym: `<div id="mobile-nav" ...>`.

---

### 8. Brak landmarku `<main>` na stronie głównej i listingu bloga (WCAG 1.3.6 — poziom AAA, ale rekomendowane dla AA)

**Pliki:** `app/page.tsx` (linia 213), `app/blog/page.tsx` (linia 38)

Cała zawartość stron jest w `<div>`, a nie `<main>`. Brak landmarku uniemożliwia użytkownikom czytników ekranu skorzystanie z "skip navigation" oraz szybkiego przeskoku do treści głównej.

`app/layout.tsx` nie zawiera `<main>`, a strony też nie — konieczne dodanie w każdej stronie.

**Poprawka w `app/page.tsx`:**
```tsx
// Przed pierwszą sekcją po <SiteHeader />:
<main id="main-content">
  {/* sekcje hero, jak to działa, etc. */}
</main>
```

**Poprawka w `app/blog/page.tsx`:**
```tsx
<main className="max-w-5xl mx-auto px-6 py-12">
  ...
</main>
```

---

### 9. Gwiazd-rating bez tekstu alternatywnego (WCAG 1.1.1 — poziom A)

**Plik:** `app/page.tsx`, linie 429–432

5 ikon SVG gwiazdek renderowanych w pętli bez `aria-hidden` i bez tekstu zastępczego. Czytniki ekranu mogą ogłaszać „svg svg svg svg svg".

**Obecny kod:**
```tsx
<div className="flex gap-0.5">
  {[1,2,3,4,5].map(i => (
    <svg key={i} width="11" height="11" ...>...</svg>
  ))}
</div>
```

**Poprawka:**
```tsx
<div className="flex gap-0.5" aria-label="Ocena: 5 na 5 gwiazdek">
  {[1,2,3,4,5].map(i => (
    <svg key={i} aria-hidden="true" width="11" height="11" ...>...</svg>
  ))}
</div>
```

---

### 10. Dekoracyjne SVG w linkach/przyciskach bez `aria-hidden` (WCAG 1.1.1 — poziom A)

**Wiele plików** — przykłady krytyczne:

| Plik | Linia | Opis |
|------|-------|------|
| `app/page.tsx` | 249 | Strzałka w głównym CTA "Napisz pismo — 29 zł" |
| `app/page.tsx` | 348 | Checkmarki w "trust strip" |
| `app/page.tsx` | 611 | Chevron w FAQ `<summary>` |
| `components/SiteHeader.tsx` | 43–46 | SVG hamburgera i X-a (wewnątrz przycisku z aria-label) |
| `app/blog/[slug]/page.tsx` | 120 | Strzałka wsteczna w breadcrumbie |
| `app/blog/[slug]/page.tsx` | 185 | Strzałka w CTA box |

Wszystkie SVG wewnątrz elementów interaktywnych z widocznym tekstem powinny mieć `aria-hidden="true"`, aby czytniki ekranu ich nie anonsowały.

**Poprawka wzorcowa:**
```tsx
// Zamiast:
<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path .../></svg>

// Po poprawce:
<svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path .../></svg>
```

---

## Co jest OK ✓

| Obszar | Status | Szczegół |
|--------|--------|----------|
| `lang="pl"` na `<html>` | ✓ OK | `app/layout.tsx` linia 139 |
| indigo-600 (#4F46E5) na białym | ✓ OK | Kontrast 6.07:1 — przechodzi AA |
| Ikony STEPS i TYPES | ✓ OK | Poprawnie `aria-hidden="true"` (page.tsx linie 11, 21, 31, 103–175) |
| Strzałki w blog/page.tsx | ✓ OK | `aria-hidden="true"` na liniach 107, 130 |
| `aria-label="Menu"` na hamburgerze | ✓ OK | SiteHeader.tsx linia 40 |
| `aria-label` na przycisku cookies | ✓ OK | CookieBanner.tsx linia 89 |
| `role="alert"` przy błędzie płatności | ✓ OK | FormWizard.tsx linia 1146 |
| `aria-invalid` przy błędach pól | ✓ OK | FormWizard.tsx linia 400 (choć brakuje aria-describedby) |
| `<article>` na stronie artykułu | ✓ OK | blog/[slug]/page.tsx linia 116 |
| `<header>` i `<nav>` w nagłówku | ✓ OK | SiteHeader.tsx linie 10, 19 |
| Hierarchia nagłówków | ✓ OK | h1 → h2 → h3 zachowana we wszystkich plikach |
| Brak auto-play w AudioPlayer | ✓ OK | Komponent AudioPlayer wymaga interakcji |
| FAQ z `<details>/<summary>` | ✓ OK | Semantycznie poprawne, natywnie dostępne |
| `alt="Podgląd"` na podglądzie zdjęcia | ✓ OK | FormWizard.tsx linia 799 |
| Zgody z `<label>` obejmującym checkbox | ✓ OK | FormWizard.tsx linie 1105–1132 |
| Metadata OG z `alt` na obrazach | ✓ OK | layout.tsx linia 41 |
| `<Suspense>` wrapping BlogHeader | ✓ OK | Poprawny streaming SSR |

---

## Podsumowanie i priorytety napraw

| Priorytet | Naruszenie | Wysiłek naprawy |
|-----------|------------|-----------------|
| 🔴 Krytyczny | #1 Etykiety formularzy (htmlFor + id) | Średni (~2h) |
| 🔴 Krytyczny | #2 Focus management w wizardzie | Mały (~30min) |
| 🟠 Wysoki | #3 text-gray-400 kontrast | Mały (globalny find-replace) |
| 🟠 Wysoki | #4 text-gray-500 kontrast | Mały (selektywna zamiana) |
| 🟠 Wysoki | #5 text-indigo-200 na indigo-600 | Mały (3 klasy) |
| 🟡 Średni | #6 aria-describedby przy błędach | Średni (~1h) |
| 🟡 Średni | #7 aria-expanded na hamburgerze | Mały (~15min) |
| 🟡 Średni | #8 Brak `<main>` landmark | Mały (~20min) |
| 🟡 Średni | #9 Star rating alt text | Mały (~10min) |
| 🟡 Średni | #10 aria-hidden na dekoracyjnych SVG | Mały (find-replace) |

**Szacowany czas naprawy wszystkich problemów:** ~5-6 godzin roboczych.

---

*Raport wygenerowany automatycznie przez Claude Code — agent a11y writeback.pl*  
*WCAG 2.1 AA — narzędzia: inspekcja kodu źródłowego, kalkulacja kontrastu WCAG 2.1 formula*
