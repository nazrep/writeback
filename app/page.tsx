import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { AnimateIn } from "../components/AnimateIn";

const STEPS = [
  {
    n: "01",
    title: "Opisz sytuację",
    desc: "Wypełniasz formularz w 3 minuty: co kupiłeś, co poszło nie tak, czego żądasz.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    n: "02",
    title: "Generujemy pismo",
    desc: "Tworzymy pismo powołując się na konkretne artykuły ustaw dopasowane do Twojej sytuacji. Gotowe w 30 sekund.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    n: "03",
    title: "PDF na maila od razu",
    desc: "PDF na Twoją skrzynkę od razu po płatności. Sklep ma ustawowy obowiązek odpowiedzi w 14 dniach (art. 7a UPK).",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

const CASES = [
  {
    category: "Sprzęt elektroniczny",
    situation: `Smartfon kupiony na Allegro przestał ładować się po 6 tygodniach. Sprzedawca odpisał: producent był sprawny przy wysyłce, uszkodzenie po Twojej stronie.`,
    law: "art. 43b ustawy o prawach konsumenta",
    result: "Pełny zwrot 1 240 zł w 8 dni",
    initial: "M",
    name: "Marcin K.",
    city: "Wrocław",
    quote: "Sklep odpowiedział po 3 dniach. Wcześniej przez 3 tygodnie ignorował moje maile.",
  },
  {
    category: "Reklamacja do banku",
    situation: `Z konta zniknęło 890 zł. Transakcja, której nie wykonałam. Bank odpisał, że logowanie było prawidłowe i nie zwróci środków.`,
    law: "art. 45 ustawy o usługach płatniczych",
    result: "Zwrot 890 zł w 6 dni",
    initial: "K",
    name: "Karolina M.",
    city: "Warszawa",
    quote: "Bank twierdził, że nic nie może zrobić. Po piśmie z przepisem zwrócił pieniądze bez słowa.",
  },
  {
    category: "Wypowiedzenie umowy",
    situation: `Chciałem odejść z siłowni po przeprowadzce. Recepcja oznajmiła, że należy się kara umowna 400 zł za wcześniejsze rozwiązanie.`,
    law: "art. 385³ pkt 17 Kodeksu cywilnego",
    result: "Rozwiązanie umowy bez opłat w 4 dni",
    initial: "T",
    name: "Tomasz B.",
    city: "Poznań",
    quote: "Kara umowna na konsumenta przy umowie na czas nieokreślony jest niedozwolona. Siłownia wiedziała o tym lepiej niż ja.",
  },
  {
    category: "Odzież i obuwie",
    situation: `Kurtka zamówiona online. Szwy rozeszły się po 2 praniach. Sklep odmówił reklamacji twierdząc, że to naturalne zużycie i że minęły 30 dni.`,
    law: "art. 43c ustawy o prawach konsumenta",
    result: "Wymiana na nową kurtkę w 11 dni",
    initial: "A",
    name: "Anna W.",
    city: "Kraków",
    quote: "Nie wiedziałam, że na niezgodność towaru mam 2 lata. Sklep liczył na to, że tego nie sprawdzę.",
  },
];

const PROBLEMS = [
  {
    before: `Piszesz „proszę o zwrot". Sklep ignoruje lub odmawia po 3 tygodniach.`,
    after: "Piszesz z art. 43b ustawy. Adresat wie, że brak odpowiedzi = przegrana z mocy prawa.",
  },
  {
    before: "Wzory z Googla są ogólne, nie pasują do Twojej sytuacji",
    after: "Pismo dopasowane do Twojego przypadku z konkretnymi artykułami ustaw",
  },
  {
    before: "Nie wiesz czego możesz żądać: zwrotu, wymiany, odszkodowania?",
    after: "Podpowiadamy co Ci się należy zanim napiszesz pierwsze słowo",
  },
  {
    before: `Sklep twierdzi „towar był używany" lub „termin minął" bez podstawy`,
    after: "Twoje pismo kontruje te argumenty z odwołaniem do przepisów",
  },
];

const TYPES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
    label: "Reklamacja do sklepu / Allegro",
    desc: "Produkt nie dotarł, uszkodzony, niezgodny z opisem, odmowa zwrotu",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    label: "Reklamacja do banku / ubezpieczyciela",
    desc: "Nieautoryzowana transakcja, odmowa wypłaty, błędna opłata",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    label: "Odwołanie od decyzji ZUS / US",
    desc: "Odmowa świadczenia, zawyżona składka, decyzja podatkowa",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    label: "Wypowiedzenie umowy",
    desc: "Internet, gym, prąd, telefon — bez kar umownych",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: "Skarga do UOKiK / Rzecznika",
    desc: "Gdy sklep nie odpowiada na reklamację, nieuczciwe praktyki",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>
    ),
    label: "Odszkodowanie za opóźniony / odwołany lot",
    desc: "Do 600€ odszkodowania — rozporządzenie UE 261/2004",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        <line x1="6" y1="9" x2="18" y2="9"/><line x1="6" y1="13" x2="13" y2="13"/>
      </svg>
    ),
    label: "Wezwanie do zapłaty",
    desc: "Nieopłacona faktura, pożyczka, umowa — odzyskaj należne pieniądze",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    label: "Odwołanie od mandatu",
    desc: "Mandat drogowy lub administracyjny — zakwestionuj go",
  },
];

const FAQS = [
  {
    q: "Dlaczego pismo z Writeback jest skuteczniejsze niż wzór z Googla?",
    a: "Wzory z internetu są szablonowe. Nasze pismo powołuje konkretne artykuły ustaw dopasowane do Twojej sytuacji, np. art. 43b ustawy o prawach konsumenta przy niezgodności towaru. Sklepy traktują takie pisma poważniej.",
  },
  {
    q: "Co jeśli sklep nie odpowie w 14 dniach?",
    a: "Brak odpowiedzi w 14 dniach = uznanie reklamacji za zasadną (art. 7a ustawy o prawach konsumenta). Pismo które generujemy zawiera tę informację wprost. Działa jak presja prawna.",
  },
  {
    q: "Czy to jest porada prawna?",
    a: "Nie. Writeback to narzędzie do tworzenia pism konsumenckich, nie kancelaria prawna. Przy sporach powyżej kilku tysięcy złotych warto skonsultować się z prawnikiem.",
  },
  {
    q: "Co jeśli pismo nie pomoże?",
    a: "Piszemy odwołanie za darmo. Wystarczy napisać na hello@writeback.pl. Przygotujemy kolejne pismo bez dodatkowych opłat.",
  },
  {
    q: "Ile kosztuje i co dokładnie dostaję?",
    a: "29 zł jednorazowo. Dostajesz: pismo PDF z właściwymi przepisami prawnymi, gotowe do wysłania w ciągu 5 minut, na wskazany adres email. Bez subskrypcji, bez ukrytych opłat.",
  },
  {
    q: "Czy moje dane są bezpieczne?",
    a: "Tak. Dane przesyłane są szyfrowanym połączeniem (HTTPS). Płatność obsługuje Stripe, nie widzimy numeru karty. Dane przetwarzamy zgodnie z RODO.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      <SiteHeader />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-white to-white pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/3" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 border border-indigo-100 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                Polskie prawo konsumenta po Twojej stronie
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.06] text-gray-900 mb-6 animate-fade-up delay-100">
                Zignorowali Cię?<br />
                <span className="text-indigo-600">Napisz pismo,<br className="hidden sm:block" /> które muszą przeczytać.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-500 max-w-xl mb-10 leading-relaxed animate-fade-up delay-200">
                Formalne pismo z właściwą podstawą prawną do sklepu, banku, ZUS lub operatora.
                Gotowe w <strong className="text-gray-800 font-semibold">5 minut</strong>, PDF na maila od razu.
              </p>

              <div className="animate-fade-up delay-300">
                <Link
                  href="/zamow"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5 active:scale-95"
                >
                  Napisz pismo — 29 zł
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <p className="text-sm text-gray-400 mt-3">
                  Jednorazowa opłata · PDF na maila od razu · Odwołanie gratis jeśli nie pomoże
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 mt-12 pt-10 border-t border-gray-100 animate-fade-in delay-400">
                {[
                  { val: "29 zł", sub: "jednorazowo" },
                  { val: "5 min", sub: "gotowe pismo" },
                  { val: "14 dni", sub: "sklep musi odpowiedzieć" },
                  { val: "100%", sub: "polskie przepisy" },
                ].map((s, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-gray-900">{s.val}</div>
                    <div className="text-xs text-gray-400 mt-0.5 font-medium">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — letter mockup */}
            <div className="hidden lg:block animate-fade-up delay-200">
              <div className="relative">
                {/* Shadow/glow */}
                <div className="absolute inset-0 bg-indigo-200/30 rounded-3xl blur-2xl scale-95 translate-y-4" />
                {/* Letter card */}
                <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/60 overflow-hidden">
                  {/* Top bar */}
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/25" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/25" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    </div>
                    <span className="text-xs font-bold text-white/80 ml-2 uppercase tracking-wider">reklamacja.pdf</span>
                  </div>
                  {/* Letter body */}
                  <div className="p-6 font-mono text-[11px] leading-relaxed text-gray-700 space-y-3">
                    <div className="text-gray-500 space-y-0.5">
                      <div className="font-bold text-gray-800">Anna Kowalska</div>
                      <div>ul. Kwiatowa 5/12, 00-001 Warszawa</div>
                      <div>anna@example.com</div>
                    </div>
                    <div className="text-right text-gray-400 text-[10px]">Warszawa, {new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })} r.</div>
                    <div className="text-gray-500 space-y-0.5">
                      <div className="font-bold text-gray-800">TechShop Sp. z o.o.</div>
                      <div>ul. Handlowa 1, 00-100 Warszawa</div>
                    </div>
                    <div className="border-l-4 border-indigo-500 pl-3 py-0.5">
                      <div className="font-bold text-indigo-700 text-[10px]">DOTYCZY: Reklamacja — Smartfon Samsung, nr zam. TS/2026/4821</div>
                    </div>
                    <div className="text-gray-600 leading-relaxed">
                      W dniu 10 maja 2026 r. nabyłam w Państwa sklepie smartfon Samsung Galaxy S24 za kwotę 3 499 zł. W dniu 1 czerwca 2026 r. stwierdziłam, że urządzenie jest niezgodne z umową — ekran wykazuje defekty fabryczne bez mechanicznego uszkodzenia.
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-3 space-y-1.5">
                      <div className="font-bold text-indigo-800 text-[10px] uppercase tracking-wide">Żądanie</div>
                      <div className="text-indigo-700">Na podstawie <span className="font-bold">art. 43d ust. 1 UPK</span> żądam wymiany towaru na wolny od wad.</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                      <div className="font-bold text-gray-600 text-[10px] uppercase tracking-wide">Podstawa prawna</div>
                      <div className="text-gray-500">- Art. 43b UPK (odpowiedzialność sprzedawcy)</div>
                      <div className="text-gray-500">- Art. 43c ust. 1 UPK (domniemanie wady — 2 lata)</div>
                      <div className="text-gray-500">- Art. 7a UPK (14-dniowy termin odpowiedzi)</div>
                    </div>
                    <div className="text-gray-500 text-[10px] pt-1">
                      Z poważaniem,<br />
                      <span className="font-bold text-gray-700">Anna Kowalska</span>
                    </div>
                  </div>
                  {/* Footer badge */}
                  <div className="bg-gray-50 border-t border-gray-100 px-6 py-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Wygenerowano przez writeback.pl</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-emerald-600 font-semibold">Gotowe do wysłania</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-gray-400 font-medium">
          {[
            "Płatność przez Stripe",
            "Szyfrowane HTTPS",
            "Zgodne z RODO",
            "Polskie przepisy prawa",
            "BLIK · karta · Przelewy24",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Jak działa */}
      <section id="jak-to-dziala" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Jak to działa</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Od problemu do pisma<br className="hidden sm:block" /> w 5 minut</h2>
            <p className="text-gray-500 text-sm">Bez rejestracji, bez czekania</p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <AnimateIn key={s.n} delay={i * 100}>
                <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 bg-white hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-50 transition-all duration-200 group h-full">
                  {i < STEPS.length - 1 && (
                    <div className="hidden sm:block absolute top-10 left-[calc(100%_+_1px)] w-6 text-gray-200 z-10 pointer-events-none">
                      <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><path d="M0 8h22M16 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors duration-200">
                    {s.icon}
                  </div>
                  <div className="text-xs font-bold text-indigo-400 tracking-widest mb-1">{s.n}</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn className="text-center mt-10" delay={350}>
            <Link
              href="/zamow"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md active:scale-95"
            >
              Zacznij teraz
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Efekty</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Prawdziwe przypadki,<br className="hidden sm:block" /> prawdziwe wyniki</h2>
            <p className="text-gray-500 text-sm">Typowe sytuacje konsumentów. Co się dzieje po wysłaniu pisma z Writeback.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-4">
            {CASES.map((c, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full self-start">
                        {c.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100 self-start">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {c.result}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.situation}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L2 4v3.5c0 2.8 2.1 5.1 5 5.5 2.9-.4 5-2.7 5-5.5V4L7 1.5z" stroke="currentColor" strokeWidth="1.2"/></svg>
                      <span>Podstawa: <span className="font-medium text-gray-600">{c.law}</span></span>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/60">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {c.initial}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => (
                              <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="#fbbf24"><path d="M6 1l1.4 2.8 3.1.5-2.2 2.2.5 3.1L6 8.2l-2.8 1.4.5-3.1L1.5 4.3l3.1-.5z"/></svg>
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium">Typowy przypadek</span>
                        </div>
                        <p className="text-sm text-gray-700 italic leading-relaxed">&bdquo;{c.quote}&rdquo;</p>
                        <p className="text-xs text-gray-400 mt-1.5 font-medium">{c.name}, {c.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn className="mt-10 text-center" delay={CASES.length * 80}>
            <Link
              href="/zamow"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md active:scale-95"
            >
              Napisz swoje pismo — 29 zł
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Dlaczego to działa</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Sklepy ignorują zwykłe pisma.<br className="hidden sm:block" /> Twoje ich nie zignoruje.
            </h2>
            <p className="text-gray-500 text-sm">Konkretne artykuły ustaw zmieniają wszystko</p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROBLEMS.map((item, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-200 h-full">
                  <div className="flex items-start gap-3 p-5 bg-red-50/50">
                    <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.before}</p>
                  </div>
                  <div className="flex items-start gap-3 p-5 bg-white border-t border-gray-100">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4l2 2L6.5 2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-900 font-medium leading-relaxed">{item.after}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Price anchor */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Cena</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Ile kosztuje Twój czas?</h2>
            <p className="text-gray-500 text-sm">Porównaj zanim zdecydujesz</p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <AnimateIn delay={0}>
              <div className="border border-gray-200 rounded-2xl p-7 text-center bg-white shadow-sm h-full">
                <div className="text-3xl font-bold text-gray-300 mb-1">0 zł</div>
                <div className="font-semibold text-gray-500 mb-5 text-sm">Sam napiszesz</div>
                <ul className="text-sm text-gray-400 text-left space-y-3">
                  <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0">✗</span>Kilka godzin na research</li>
                  <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0">✗</span>Nie znasz odpowiednich artykułów</li>
                  <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0">✗</span>Sklep to wyczuje i zlekceważy</li>
                </ul>
              </div>
            </AnimateIn>
            <AnimateIn animation="scaleIn" delay={100}>
              <div className="border-2 border-indigo-500 rounded-2xl p-7 text-center bg-white relative shadow-xl shadow-indigo-100/60 -translate-y-1 h-full">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">Najlepszy wybór</div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">29 zł</div>
                <div className="font-semibold text-gray-900 mb-5 text-sm">Writeback</div>
                <ul className="text-sm text-gray-700 text-left space-y-3">
                  <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Gotowe w 5 minut</li>
                  <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Właściwe artykuły ustaw</li>
                  <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Odwołanie gratis jeśli nie pomoże</li>
                </ul>
              </div>
            </AnimateIn>
            <AnimateIn delay={200}>
              <div className="border border-gray-200 rounded-2xl p-7 text-center bg-white shadow-sm h-full">
                <div className="text-3xl font-bold text-gray-300 mb-1">300+ zł</div>
                <div className="font-semibold text-gray-500 mb-5 text-sm">Prawnik</div>
                <ul className="text-sm text-gray-400 text-left space-y-3">
                  <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0">✗</span>Droga porada za reklamację</li>
                  <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0">✗</span>Termin wizyty za kilka dni</li>
                  <li className="flex gap-2.5 items-start"><span className="text-emerald-500 shrink-0">✓</span>Potrzebne przy poważnych sporach</li>
                </ul>
              </div>
            </AnimateIn>
          </div>
          <AnimateIn className="text-center mt-10" delay={300}>
            <Link
              href="/zamow"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 text-base shadow-sm hover:shadow-md active:scale-95"
            >
              Napisz pismo — 29 zł
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* Jakie pisma */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Zakres</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Jakie pisma piszemy</h2>
            <p className="text-gray-500 text-sm">Wszystkie typy dostępne od ręki — 29 zł, PDF na maila w 5 minut</p>
          </AnimateIn>

          {[
            {
              group: "Reklamacje konsumenckie",
              items: TYPES.slice(0, 3),
            },
            {
              group: "Umowy i inne prawa",
              items: TYPES.slice(3, 6),
            },
            {
              group: "Nowe",
              items: TYPES.slice(6),
            },
          ].map((section, si) => (
            <AnimateIn key={section.group} delay={si * 80} className="mb-8">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">{section.group}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.items.map((t, i) => (
                  <Link
                    key={t.label}
                    href="/zamow"
                    className="flex items-start gap-3 rounded-2xl px-4 py-4 border border-gray-100 bg-white shadow-sm hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-100 transition-colors">
                      {t.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug">{t.label}</div>
                      <div className="text-xs mt-0.5 text-gray-400 leading-relaxed">{t.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-2xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Częste pytania</h2>
            <p className="text-gray-500 text-sm">Masz inne pytanie? Napisz na <a href="mailto:hello@writeback.pl" className="text-indigo-600 hover:underline">hello@writeback.pl</a></p>
          </AnimateIn>
          <AnimateIn animation="fadeIn">
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <details key={i} className="border border-gray-200 rounded-xl overflow-hidden group bg-white hover:border-indigo-200 transition-colors duration-200">
                  <summary className="px-5 py-4 text-sm font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                    {faq.q}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-4 text-gray-400 transition-transform duration-300 group-open:rotate-180">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <p className="px-5 pb-5 pt-2 text-sm text-gray-500 leading-relaxed border-t border-gray-100">{faq.a}</p>
                </details>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <AnimateIn animation="scaleIn" className="relative max-w-xl mx-auto">
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4">Zrób to teraz</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Odzyskaj swoje pieniądze
          </h2>
          <p className="text-indigo-200 mb-2 leading-relaxed text-sm">
            Pismo gotowe w 5 minut. Sklep musi odpowiedzieć w 14 dni z mocy prawa.
          </p>
          <p className="text-indigo-300 text-sm mb-10">
            Jednorazowa opłata 29 zł · Żadnych subskrypcji
          </p>
          <Link
            href="/zamow"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg text-base hover:-translate-y-0.5 active:scale-95"
          >
            Napisz pismo — 29 zł
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <p className="text-indigo-300 text-sm mt-4">Jeśli nie pomoże, odwołanie gratis.</p>
        </AnimateIn>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6 text-xs text-gray-400">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">W</span>
                <span className="font-bold text-sm text-white">writeback.pl</span>
              </div>
              <p className="text-gray-500 leading-relaxed text-xs">Pisma konsumenckie z właściwymi przepisami prawa polskiego.</p>
            </div>
            <div>
              <div className="text-gray-200 font-semibold text-xs uppercase tracking-widest mb-4">Pisma</div>
              <ul className="space-y-2.5">
                <li><Link href="/zamow" className="hover:text-gray-200 transition-colors">Napisz pismo</Link></li>
                <li><Link href="/wzor-reklamacji" className="hover:text-gray-200 transition-colors">Wzór reklamacji</Link></li>
                <li><Link href="/reklamacja-allegro" className="hover:text-gray-200 transition-colors">Reklamacja Allegro</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-gray-200 font-semibold text-xs uppercase tracking-widest mb-4">Poradniki</div>
              <ul className="space-y-2.5">
                <li><Link href="/blog" className="hover:text-gray-200 transition-colors">Wszystkie poradniki</Link></li>
                <li><Link href="/blog/reklamacja-sklep-internetowy" className="hover:text-gray-200 transition-colors">Reklamacja do sklepu</Link></li>
                <li><Link href="/blog/bank-odmawia-zwrotu" className="hover:text-gray-200 transition-colors">Bank odmawia zwrotu</Link></li>
                <li><Link href="/blog/wypowiedzenie-silownia" className="hover:text-gray-200 transition-colors">Wypowiedzenie siłowni</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-gray-200 font-semibold text-xs uppercase tracking-widest mb-4">Serwis</div>
              <ul className="space-y-2.5">
                <li><Link href="/regulamin" className="hover:text-gray-200 transition-colors">Regulamin</Link></li>
                <li><Link href="/polityka" className="hover:text-gray-200 transition-colors">Polityka prywatności</Link></li>
                <li><a href="mailto:hello@writeback.pl" className="hover:text-gray-200 transition-colors">hello@writeback.pl</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 space-y-3">
            <p className="text-gray-500 text-[11px] leading-relaxed text-center max-w-2xl mx-auto">
              Pisma generowane przez writeback.pl mają charakter informacyjny i pomocniczy. Nie stanowią porady prawnej ani zastępstwa adwokata lub radcy prawnego. W sprawach złożonych zalecamy konsultację z prawnikiem.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-500">
              <p>© 2026 writeback.pl · Narzędzie do tworzenia pism, nie porada prawna</p>
              <p>Maciej Perzankowski · NIP 8361881457</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
