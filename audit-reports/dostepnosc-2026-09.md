## Audyt dostępności writeback.pl — 2026-09-15

**Standard:** WCAG 2.1 AA  
**Zakres:** app/page.tsx · app/zamow/FormWizard.tsx · app/blog/page.tsx · app/blog/[slug]/page.tsx · components/SiteHeader.tsx · components/CookieBanner.tsx  
**Poprzedni audyt:** dostepnosc-2026-06.md

---

### Naruszenia WCAG 2.1 AA (krytyczne)

#### 1. Brak zarządzania fokusem po zmianie kroku w wizardzie
**Kryterium:** WCAG 2.4.3 Focus Order / 2.1.1 Keyboard  
**Plik:** `app/zamow/FormWizard.tsx:529`

Funkcja `navigate(newStep)` wywołuje wyłącznie `setStep(newStep)`. Po przejściu do kolejnego kroku fokus pozostaje na przycisku z poprzedniego kroku (który znika z DOM) lub przesuwa się do body. Użytkownik czytnika ekranu nie wie, że treść się zmieniła.

**Poprawka:**
```tsx
// Dodaj ref do nagłówka każdego kroku
const stepHeadingRef = useRef<HTMLHeadingElement>(null);

function navigate(newStep: number) {
  setDirection(newStep > step ? "forward" : "back");
  setStep(newStep);
  // Przesuń fokus na nagłówek nowego kroku po re-renderze
  setTimeout(() => stepHeadingRef.current?.focus(), 50);
  posthog.capture("wizard_step", { step: newStep, ... });
}

// W JSX każdego kroku — np. krok 1:
<h2 ref={stepHeadingRef} tabIndex={-1} className="text-2xl font-bold ...">
  Co się stało?
</h2>
```

---

#### 2. Kontrast kolorów — tekst pomocniczy
**Kryterium:** WCAG 1.4.3 Contrast (Minimum) — wymagane minimum 4,5:1 dla normalnego tekstu

| Klasa Tailwind | Kolor HEX | Tło | Ratio | Wynik |
|---|---|---|---|---|
| `text-gray-400` | `#9ca3af` | `#ffffff` | ~2,85:1 | ❌ FAIL |
| `text-gray-500` | `#6b7280` | `#ffffff` | ~4,48:1 | ❌ FAIL (poniżej 4,5:1) |
| `text-indigo-200` | `#c7d2fe` | `#4f46e5` (indigo-600) | ~3,07:1 | ❌ FAIL |
| `text-indigo-300` | `#a5b4fc` | `#4f46e5` | ~4,13:1 | ❌ FAIL |

`text-gray-400` i `text-gray-500` są używane do treści informacyjnych (podnagłówki, opisy, daty, podpisy). `text-indigo-200`/`indigo-300` to tekst w sekcji CTA (ciemne tło indigo-600).

**Poprawka:**
- Zastąp `text-gray-400` → `text-gray-500` dla ważnych etykiet, lub `text-gray-600` (`#4b5563`, ratio ~5,91:1) dla krytycznych.
- Zastąp `text-gray-500` → `text-gray-600` wszędzie, gdzie to tekst czytelny (nie placeholder).
- W sekcji CTA: `text-indigo-200` → `text-white/80` lub `text-white` dla body copy.

---

#### 3. Banner cookie bez roli i etykiety dla czytnika ekranu
**Kryterium:** WCAG 4.1.3 Status Messages / 4.1.2 Name, Role, Value  
**Plik:** `components/CookieBanner.tsx:60`

```tsx
<div className="fixed bottom-0 ...">  {/* brak role i aria-label */}
```

Banner pojawia się dynamicznie, ale nie jest ogłaszany przez czytniki ekranu. Nie ma `role="dialog"`, `role="alert"` ani `aria-label`.

**Poprawka:**
```tsx
<div
  role="dialog"
  aria-label="Ustawienia plików cookie"
  aria-modal="false"
  className="fixed bottom-0 left-0 right-0 z-50 ..."
>
```

---

#### 4. Input kodu promocyjnego bez etykiety
**Kryterium:** WCAG 1.3.1 Info and Relationships / 4.1.2 Name, Role, Value  
**Plik:** `app/zamow/FormWizard.tsx:1152–1160`

```tsx
<input
  placeholder="KOD PROMOCYJNY"
  className="flex-1 border ..."
  // brak id, brak aria-label, brak powiązanego <label>
/>
```

Placeholder nie jest ekwiwalentem etykiety. Znika gdy użytkownik wpisze tekst.

**Poprawka:**
```tsx
<label htmlFor="promo-code" className="sr-only">Kod promocyjny</label>
<input
  id="promo-code"
  aria-label="Kod promocyjny"
  placeholder="KOD PROMOCYJNY"
  ...
/>
```

---

### Naruszenia WCAG 2.1 AA (średniego priorytetu)

#### 5. Brak `aria-expanded` na przycisku mobilnego menu
**Kryterium:** WCAG 4.1.2 Name, Role, Value  
**Plik:** `components/SiteHeader.tsx:43`

```tsx
<button
  onClick={() => setOpen(o => !o)}
  aria-label="Menu"
  // brak: aria-expanded={open}
>
```

Czytnik ekranu nie informuje, czy menu jest rozwinięte.

**Poprawka:**
```tsx
<button
  onClick={() => setOpen(o => !o)}
  aria-label="Menu"
  aria-expanded={open}
  aria-controls="mobile-nav"
>
...
{open && (
  <div id="mobile-nav" className="sm:hidden ...">
```

---

#### 6. Brak `aria-current="step"` w stepper wizarda
**Kryterium:** WCAG 1.3.1 / 4.1.2  
**Plik:** `app/zamow/FormWizard.tsx:342–390`

Aktywny krok jest wizualnie wyróżniony (ring-4 ring-indigo-100), ale nie ma `aria-current="step"`. Czytniki ekranu (szczególnie NVDA + Chrome) nie informują, który krok jest aktywny.

**Poprawka w ProgressBar:**
```tsx
<div
  className={`w-9 h-9 rounded-full ...`}
  {...(i === step ? { "aria-current": "step" } : {})}
>
```

Warto też dodać `role="list"` na wrapper i `role="listitem"` na każdy krok, lub użyć `<ol>`.

---

#### 7. Brak obsługi klawiatury i ARIA w custom date pickerze
**Kryterium:** WCAG 2.1.1 Keyboard / 2.1.2 No Keyboard Trap / 4.1.2  
**Plik:** `app/zamow/FormWizard.tsx:412–495`

Przycisk otwierający datepicker:
- brak `aria-expanded`
- brak `aria-haspopup="dialog"`

Dropdown kalendarza:
- brak `role="dialog"` lub `role="grid"`
- brak obsługi Escape (zamknięcie klawiszem Esc)
- brak nawigacji strzałkami między dniami
- zamknięcie tylko przez `mousedown` poza elementem — dotykowe i klawiaturowe wykluczone

**Poprawka minimalna:**
```tsx
<button
  type="button"
  onClick={() => setOpen(o => !o)}
  aria-expanded={open}
  aria-haspopup="dialog"
  aria-label={`Wybierz datę${value ? `: ${value}` : ""}`}
>
```

Zalecane: zastąpić custom picker `<input type="date">` (pełna obsługa klawiatury przez przeglądarkę) z wizualną nakładką tylko jako progresywne ulepszenie.

---

#### 8. Filtry kategorii na blogu bez stanu aktywności
**Kryterium:** WCAG 1.3.1  
**Plik:** `app/blog/page.tsx`

Aktywny filtr (np. "Wszystkie") jest wizualnie wyróżniony (bg-indigo-600), ale brak `aria-current="page"` lub `aria-pressed`.

**Poprawka:**
```tsx
<Link
  href={`/blog${langParam}`}
  aria-current={!cat ? "page" : undefined}
  className={`... ${!cat ? "bg-indigo-600 text-white ..." : "..."}`}
>
```

---

#### 9. Ikony gwiazdek bez alternatywy tekstowej
**Kryterium:** WCAG 1.1.1 Non-text Content  
**Plik:** `app/page.tsx:433`

```tsx
{[1,2,3,4,5].map(i => (
  <svg key={i} width="11" height="11" fill="#fbbf24">...</svg>
))}
```

5 ikon gwiazdek renderowanych bez żadnego tekstu alternatywnego. Czytnik ekranu może je pominąć lub odczytać 5 pustych elementów.

**Poprawka:**
```tsx
<div role="img" aria-label="Ocena: 5 gwiazdek" className="flex gap-0.5">
  {[1,2,3,4,5].map(i => (
    <svg key={i} aria-hidden="true" width="11" height="11" fill="#fbbf24">...</svg>
  ))}
</div>
```

---

#### 10. Dekoracyjne SVG bez `aria-hidden` w app/page.tsx
**Kryterium:** WCAG 1.1.1  
**Plik:** `app/page.tsx` — wiele lokalizacji

Następujące SVG nie mają `aria-hidden="true"`:
- Strzałki w przyciskach CTA (linie 251, 390, 453, 546, 645)
- Checkmarki w trust strip (linia 350)
- Strzałka łącząca kroki w sekcji "Jak to działa" (linia 371)
- Ikona wyniku w case studies (linia 414)
- Ikona tarczy w "Podstawa:" (linia 420)
- Strzałka FAQ (linia 613)

**Poprawka:** dodaj `aria-hidden="true"` do każdego z tych SVG.

---

#### 11. Brak `aria-label` na głównej nawigacji w SiteHeader
**Kryterium:** WCAG 2.4.1 Bypass Blocks  
**Plik:** `components/SiteHeader.tsx:21`

```tsx
<nav className="hidden sm:flex items-center gap-7 text-sm">
```

Na stronie jest 5 elementów `<nav>` (1 header + 4 footer). Footer navs mają `aria-label`, header nav nie.

**Poprawka:**
```tsx
<nav aria-label="Główna nawigacja" className="hidden sm:flex ...">
```

---

### Co jest OK ✓

- **Ikony w STEPS, TYPES, CASES** — wszystkie mają `aria-hidden="true"` w tablicach danych
- **Komponent Field** — prawidłowo wiąże `<label>` z `<input>` przez `useId()` i `htmlFor` (FormWizard.tsx:496–522)
- **Wymagane pola** — mają zarówno wizualny `*` z `aria-hidden="true"`, jak i `<span className="sr-only"> (wymagane)</span>`
- **Komunikaty błędów** — używają `role="alert"` i `aria-describedby` (FormWizard.tsx:520)
- **Przycisk udostępniania Facebook** — ma `aria-label="Udostępnij na Facebooku"` (blog/[slug]/page.tsx)
- **Przycisk hamburger** — ma `aria-label="Menu"` (SiteHeader.tsx:43)
- **Przycisk zarządzania cookies** — ma `aria-label="Zarządzaj ustawieniami cookies"` (CookieBanner.tsx:94)
- **Footer** — ma `role="contentinfo"` (page.tsx:654)
- **Nawigacje w footer** — mają `aria-label` (page.tsx:664, 672, 682)
- **Artykuł bloga** — używa `<article>` z `<header>` (blog/[slug]/page.tsx)
- **FAQ** — native `<details>/<summary>` — dostępne klawiaturowo przez przeglądarkę
- **Główny button CTA** — ma `focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2` (page.tsx:251)
- **indigo-600 na białym** — `#4f46e5` / `#ffffff` → ~4,54:1 — **PASSES** WCAG AA
- **Metadata i lang** — `<html lang>` ustawiony w layout.tsx
- **skip-to-content** — brak (nie sprawdzany w poprzednim audycie)

---

### Konkretne poprawki z linią kodu

| # | Plik | Linia | Zmiana |
|---|---|---|---|
| 1 | FormWizard.tsx | 529 | Dodaj `useRef` + `setTimeout(() => ref.focus(), 50)` w `navigate()` |
| 2 | FormWizard.tsx | 1152 | Dodaj `<label htmlFor="promo-code" className="sr-only">Kod promocyjny</label>` i `id="promo-code"` na input |
| 3 | FormWizard.tsx | 373 | Dodaj `aria-current={i === step ? "step" : undefined}` na div kroku |
| 4 | FormWizard.tsx | 446 | Dodaj `aria-expanded={open}` i `aria-haspopup="dialog"` na przycisk datepickera |
| 5 | SiteHeader.tsx | 43 | Dodaj `aria-expanded={open}` i `aria-controls="mobile-nav"` na przycisk |
| 6 | SiteHeader.tsx | 21 | Dodaj `aria-label="Główna nawigacja"` na `<nav>` |
| 7 | CookieBanner.tsx | 60 | Dodaj `role="dialog"` i `aria-label="Ustawienia plików cookie"` na div bannera |
| 8 | page.tsx | 433 | Opakuj gwiazdki w `<div role="img" aria-label="Ocena: 5 gwiazdek">`, dodaj `aria-hidden="true"` na każde `<svg>` |
| 9 | page.tsx | 251, 350, 371, 390, 414, 420, 453, 546, 613, 645 | Dodaj `aria-hidden="true"` do każdego dekoracyjnego SVG |
| 10 | blog/page.tsx | ~55 | Dodaj `aria-current={!cat ? "page" : undefined}` na aktywny filtr |
| 11 | globals.css / layout.tsx | — | Rozważ dodanie skip-to-content link (`<a href="#main-content" className="sr-only focus:not-sr-only">Przejdź do treści</a>`) |
| 12 | page.tsx | cały plik | Globalnie: `text-gray-500` → `text-gray-600` dla czytelnych opisów; `text-indigo-200` → `text-white` w sekcji CTA |

---

**Priorytet napraw:** Krytyczne (#1–#4) → zaimplementować natychmiast. Średnie (#5–#11) → zaplanować na następny sprint.
