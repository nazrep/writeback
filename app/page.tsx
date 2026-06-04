import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "Opisz sytuację",
    desc: "Wypełniasz formularz w 3 minuty — co kupiłeś, co poszło nie tak, czego żądasz.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    n: "02",
    title: "Generujemy pismo",
    desc: "Tworzymy pismo powołując się na konkretne artykuły ustaw — w 30 sekund.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    n: "03",
    title: "Wysyłasz i czekasz",
    desc: "PDF na maila od razu. Sklep ma 14 dni na odpowiedź z mocy art. 7a.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
      </svg>
    ),
  },
];

const CASES = [
  {
    category: "Sprzęt elektroniczny",
    situation: `Smartfon kupiony na Allegro przestał ładować się po 6 tygodniach. Sprzedawca odpisał: „produkt był sprawny przy wysyłce, uszkodzenie po Twojej stronie".`,
    law: "art. 43b ustawy o prawach konsumenta",
    result: "Pełny zwrot 1 240 zł w 8 dni",
    initial: "M",
    name: "Marcin K.",
    city: "Wrocław",
    quote: "Sklep odpowiedział po 3 dniach — wcześniej przez 3 tygodnie ignorował moje maile.",
  },
  {
    category: "Odzież i obuwie",
    situation: `Kurtka zamówiona online — szwy rozeszły się po 2 praniach. Sklep odmówił reklamacji twierdząc, że to „naturalne zużycie" i że minęły 30 dni.`,
    law: "art. 43c ustawy o prawach konsumenta",
    result: "Wymiana na nową kurtkę w 11 dni",
    initial: "A",
    name: "Anna W.",
    city: "Kraków",
    quote: "Nie wiedziałam, że na niezgodność towaru mam 2 lata — nie 30 dni jak twierdził sklep.",
  },
  {
    category: "AGD",
    situation: `Ekspres do kawy przestał działać po 4 miesiącach. Sklep odesłał do serwisu producenta z informacją „gwarancja wygasła" — bez żadnej podstawy prawnej.`,
    law: "art. 43d ustawy o prawach konsumenta",
    result: "Bezpłatna naprawa + zwrot kosztów wysyłki",
    initial: "P",
    name: "Paweł S.",
    city: "Gdańsk",
    quote: "Pismo powołało konkretny artykuł — serwis oddzwonił następnego dnia.",
  },
];

const PROBLEMS = [
  {
    before: `Piszesz „proszę o zwrot" — sklep ignoruje lub odmawia po 3 tygodniach`,
    after: "Piszesz z art. 43b ustawy — sklep wie, że brak odpowiedzi w 14 dni = przegrana",
  },
  {
    before: "Wzory z Googla są ogólne, nie pasują do Twojej sytuacji",
    after: "Pismo dopasowane do Twojego przypadku z konkretnymi artykułami ustaw",
  },
  {
    before: "Nie wiesz czego możesz żądać — zwrotu, wymiany, odszkodowania?",
    after: "Podpowiadamy co Ci się należy zanim napiszesz pierwsze słowo",
  },
  {
    before: `Sklep twierdzi „towar był używany" lub „termin minął" bez podstawy`,
    after: "Twoje pismo kontruje te argumenty z odwołaniem do przepisów",
  },
];

const TYPES = [
  { label: "Reklamacja do sklepu / Allegro", desc: "Produkt nie dotarł, uszkodzony, niezgodny z opisem, odmowa zwrotu" },
  { label: "Reklamacja do banku / ubezpieczyciela", desc: "Nieautoryzowana transakcja, odmowa wypłaty, błędna opłata" },
  { label: "Odwołanie od decyzji ZUS / US", desc: "Odmowa świadczenia, zawyżona składka, decyzja podatkowa" },
  { label: "Wypowiedzenie umowy", desc: "Internet, gym, prąd, telefon — bez kar umownych" },
  { label: "Skarga do UOKiK / Rzecznika", desc: "Gdy sklep nie odpowiada na reklamację" },
];

const FAQS = [
  {
    q: "Dlaczego pismo z Writeback jest skuteczniejsze niż wzór z Googla?",
    a: "Wzory z internetu są szablonowe. Nasze pismo powołuje konkretne artykuły ustaw dopasowane do Twojej sytuacji — np. art. 43b ustawy o prawach konsumenta przy niezgodności towaru. Sklepy traktują takie pisma poważniej.",
  },
  {
    q: "Co jeśli sklep nie odpowie w 14 dniach?",
    a: "Brak odpowiedzi w 14 dniach = uznanie reklamacji za zasadną (art. 7a ustawy o prawach konsumenta). Pismo które generujemy zawiera tę informację wprost — działa jak presja prawna.",
  },
  {
    q: "Czy to jest porada prawna?",
    a: "Nie. Writeback to narzędzie do tworzenia pism konsumenckich, nie kancelaria prawna. Przy sporach powyżej kilku tysięcy złotych warto skonsultować się z prawnikiem.",
  },
  {
    q: "Co jeśli pismo nie pomoże?",
    a: "Piszemy odwołanie za darmo. Wystarczy napisać na hello@writeback.pl — przygotujemy kolejne pismo bez dodatkowych opłat.",
  },
  {
    q: "Ile kosztuje i co dokładnie dostaję?",
    a: "29 zł jednorazowo. Dostajesz: pismo PDF z właściwymi przepisami prawnymi, gotowe do wysłania w ciągu 5 minut, na wskazany adres email. Bez subskrypcji, bez ukrytych opłat.",
  },
  {
    q: "Czy moje dane są bezpieczne?",
    a: "Tak. Dane przesyłane są szyfrowanym połączeniem (HTTPS). Płatność obsługuje Stripe — nie widzimy numeru karty. Dane przetwarzamy zgodnie z RODO. Szczegóły w Polityce prywatności.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight text-white">writeback</span>
          <Link
            href="/zamow"
            className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
          >
            Napisz pismo
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-slate-950 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 border border-emerald-500/20 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            Prawo jest po Twojej stronie
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-white mb-6 animate-fade-up">
            Sklep Cię zignorował?<br />
            <span className="text-indigo-400">Napisz pismo które<br className="hidden sm:block" /> muszą przeczytać.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up delay-100">
            Pismo reklamacyjne z art. 43b ustawy o prawach konsumenta.
            Gotowe w 5 minut. Sklep ma <strong className="text-white font-semibold">14 dni</strong> na odpowiedź —
            brak odpowiedzi = reklamacja uznana z mocy prawa.
          </p>

          <div className="animate-fade-up delay-200">
            <Link
              href="/zamow"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 text-base shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:scale-95"
            >
              Napisz pismo — 29 zł
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <p className="text-sm text-slate-500 mt-3">
              Jednorazowa opłata · PDF na maila od razu · Odwołanie gratis jeśli nie pomoże
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/5 animate-fade-up delay-300">
            {[
              { val: "29 zł", sub: "jednorazowo" },
              { val: "5 min", sub: "gotowe pismo" },
              { val: "14 dni", sub: "sklep musi odpowiedzieć" },
              { val: "100%", sub: "polskie przepisy prawa" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-slate-900 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          {[
            { icon: "shield", label: "Płatność przez Stripe" },
            { icon: "lock", label: "Szyfrowane HTTPS" },
            { icon: "check", label: "Zgodne z RODO" },
            { icon: "check", label: "Przepisy prawa polskiego" },
            { icon: "check", label: "BLIK · karta · Przelewy24" },
          ].map((t) => (
            <span key={t.label} className="flex items-center gap-1.5 transition-colors duration-200 hover:text-slate-200">
              {t.icon === "shield" && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L2 4v3.5c0 2.8 2.1 5.1 5 5.5 2.9-.4 5-2.7 5-5.5V4L7 1.5z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>}
              {t.icon === "lock" && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>}
              {t.icon === "check" && <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Jak działa */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Jak to działa</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Od problemu do pisma<br className="hidden sm:block" /> w 5 minut</h2>
            <p className="text-gray-500 text-sm">Bez rejestracji, bez czekania</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`relative animate-fade-up delay-${(i + 1) * 100}`}>
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-7 left-[calc(50%+44px)] right-[-50%] h-px bg-gradient-to-r from-indigo-100 to-transparent" />
                )}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5 ring-4 ring-white shadow-sm transition-all duration-300 group-hover:bg-indigo-100 group-hover:shadow-md group-hover:shadow-indigo-100 group-hover:-translate-y-1">
                    {s.icon}
                  </div>
                  <div className="text-xs font-bold text-indigo-400 tracking-widest mb-1">{s.n}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/zamow"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:scale-95"
            >
              Zacznij teraz
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-24 px-6 bg-slate-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Efekty</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Prawdziwe przypadki,<br className="hidden sm:block" /> prawdziwe wyniki</h2>
            <p className="text-gray-500 text-sm">Typowe sytuacje konsumentów — co się dzieje po wysłaniu pisma z Writeback</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {CASES.map((c, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 animate-scale-in delay-${(i + 1) * 100}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
                      {c.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100 shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {c.result}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{c.situation}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L2 4v3.5c0 2.8 2.1 5.1 5 5.5 2.9-.4 5-2.7 5-5.5V4L7 1.5z" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>
                    Podstawa: <span className="font-medium text-gray-500 ml-1">{c.law}</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 bg-gray-50/70 px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {c.initial}
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 italic leading-relaxed">&bdquo;{c.quote}&rdquo;</p>
                      <p className="text-xs text-gray-400 mt-1.5">{c.name}, {c.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/zamow"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-indigo-200 hover:-translate-y-0.5 active:scale-95"
            >
              Napisz swoje pismo — 29 zł
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">Dlaczego to działa</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Sklepy ignorują zwykłe pisma.<br className="hidden sm:block" /> Twoje ich nie zignoruje.
            </h2>
            <p className="text-slate-400 text-sm">Konkretne artykuły ustaw zmieniają wszystko</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROBLEMS.map((item, i) => (
              <div
                key={i}
                className="bg-slate-900 rounded-2xl border border-white/5 p-5 space-y-4 transition-all duration-300 hover:border-white/10 hover:bg-slate-800/50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.before}</p>
                </div>
                <div className="border-t border-white/5" />
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-sm text-white font-medium leading-relaxed">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price anchor */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Cena</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Ile kosztuje Twój czas?</h2>
            <p className="text-gray-500 text-sm">Porównaj zanim zdecydujesz</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-2xl p-7 text-center bg-gray-50 transition-all duration-300 hover:border-gray-300">
              <div className="text-3xl font-bold text-gray-300 mb-1">0 zł</div>
              <div className="font-semibold text-gray-600 mb-4 text-sm">Sam napiszesz</div>
              <ul className="text-sm text-gray-500 text-left space-y-2.5">
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Kilka godzin na research</li>
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Nie znasz odpowiednich artykułów</li>
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Sklep to wyczuje i zlekceważy</li>
              </ul>
            </div>
            <div className="border-2 border-indigo-500 rounded-2xl p-7 text-center bg-indigo-50 relative shadow-xl shadow-indigo-100 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200 hover:-translate-y-1">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">Najlepszy wybór</div>
              <div className="text-3xl font-bold text-indigo-600 mb-1">29 zł</div>
              <div className="font-semibold text-gray-900 mb-4 text-sm">Writeback</div>
              <ul className="text-sm text-gray-700 text-left space-y-2.5">
                <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Gotowe w 5 minut</li>
                <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Właściwe artykuły ustaw</li>
                <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Odwołanie gratis jeśli nie pomoże</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-2xl p-7 text-center bg-gray-50 transition-all duration-300 hover:border-gray-300">
              <div className="text-3xl font-bold text-gray-300 mb-1">300+ zł</div>
              <div className="font-semibold text-gray-600 mb-4 text-sm">Prawnik</div>
              <ul className="text-sm text-gray-500 text-left space-y-2.5">
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Droga porada za reklamację</li>
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Termin wizyty za kilka dni</li>
                <li className="flex gap-2.5 items-start"><span className="text-emerald-500 shrink-0 font-bold">✓</span>Potrzebne przy poważnych sporach</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/zamow"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 text-base shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:scale-95"
            >
              Napisz pismo — 29 zł
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Jakie pisma */}
      <section className="py-24 px-6 bg-slate-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Zakres</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Jakie pisma piszemy</h2>
            <p className="text-gray-500 text-sm">Wszystkie typy pism dostępne od ręki</p>
          </div>
          <div className="space-y-2">
            {TYPES.map((t) => (
              <Link
                key={t.label}
                href="/zamow"
                className="flex items-center justify-between rounded-xl px-5 py-4 border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 hover:-translate-y-0.5 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full shrink-0 bg-emerald-500 transition-transform duration-200 group-hover:scale-125" />
                  <div>
                    <div className="font-semibold text-sm text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">{t.label}</div>
                    <div className="text-xs mt-0.5 text-gray-500">{t.desc}</div>
                  </div>
                </div>
                <div className="ml-6 shrink-0 bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 group-hover:shadow-md group-hover:shadow-indigo-200">
                  Napisz →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Częste pytania</h2>
            <p className="text-gray-500 text-sm">Masz inne pytanie? Napisz na hello@writeback.pl</p>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <details key={i} className="border border-gray-100 rounded-xl overflow-hidden group bg-white hover:border-indigo-100 transition-all duration-200">
                <summary className="px-5 py-4 text-sm font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between hover:bg-indigo-50/50 transition-colors duration-200">
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-4 text-gray-400 transition-transform duration-300 group-open:rotate-180">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </summary>
                <p className="px-5 pb-5 pt-2 text-sm text-gray-500 leading-relaxed border-t border-gray-100">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-xl mx-auto">
          <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">Zrób to teraz</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Odzyskaj swoje pieniądze
          </h2>
          <p className="text-slate-400 mb-2 leading-relaxed text-sm">
            Pismo gotowe w 5 minut. Sklep musi odpowiedzieć w 14 dni z mocy prawa.
          </p>
          <p className="text-slate-500 text-sm mb-10">
            Jednorazowa opłata 29 zł · Żadnych subskrypcji
          </p>
          <Link
            href="/zamow"
            className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold px-10 py-4 rounded-xl transition-all duration-200 shadow-2xl text-base hover:-translate-y-0.5 active:scale-95"
          >
            Napisz pismo — 29 zł
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <p className="text-slate-500 text-sm mt-4">Jeśli nie pomoże — odwołanie gratis</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-8 px-6 text-center text-xs text-slate-500">
        <p className="mb-2">
          © 2026 writeback.pl · Narzędzie do tworzenia pism, nie porada prawna
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <a href="mailto:hello@writeback.pl" className="hover:text-slate-300 transition-colors duration-200">
            hello@writeback.pl
          </a>
          <span>·</span>
          <Link href="/regulamin" className="hover:text-slate-300 transition-colors duration-200">
            Regulamin
          </Link>
          <span>·</span>
          <Link href="/polityka" className="hover:text-slate-300 transition-colors duration-200">
            Polityka prywatności
          </Link>
          <span>·</span>
          <span>Maciej Perzankowski Software Solutions · NIP 8361881457</span>
        </p>
      </footer>

    </div>
  );
}
