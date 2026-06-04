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

const PROBLEMS = [
  {
    before: 'Piszesz „proszę o zwrot" — sklep ignoruje lub odmawia po 3 tygodniach',
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
    before: 'Sklep twierdzi „towar był używany" lub „termin minął" bez podstawy',
    after: "Twoje pismo kontruje te argumenty z odwołaniem do przepisów",
  },
];

const TYPES = [
  { label: "Reklamacja do sklepu / Allegro", desc: "Produkt nie dotarł, uszkodzony, niezgodny z opisem, odmowa zwrotu", active: true },
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
            className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Napisz pismo
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-slate-950 overflow-hidden">
        {/* subtle grid bg */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            Prawo jest po Twojej stronie
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-white mb-6">
            Sklep Cię zignorował?<br />
            <span className="text-indigo-400">Napisz pismo które<br className="hidden sm:block" /> muszą przeczytać.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Pismo reklamacyjne z art. 43b ustawy o prawach konsumenta.
            Gotowe w 5 minut. Sklep ma <strong className="text-white font-semibold">14 dni</strong> na odpowiedź —
            brak odpowiedzi = reklamacja uznana z mocy prawa.
          </p>

          <Link
            href="/zamow"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-10 py-4 rounded-xl transition-colors text-base shadow-2xl shadow-indigo-500/25"
          >
            Napisz pismo — 29 zł
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <p className="text-sm text-slate-500 mt-3">
            Jednorazowa opłata · PDF na maila od razu · Odwołanie gratis jeśli nie pomoże
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/5">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">29 zł</div>
              <div className="text-xs text-slate-500 mt-0.5">jednorazowo</div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5 min</div>
              <div className="text-xs text-slate-500 mt-0.5">gotowe pismo</div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">14 dni</div>
              <div className="text-xs text-slate-500 mt-0.5">sklep musi odpowiedzieć</div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-slate-500 mt-0.5">polskie przepisy prawa</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-slate-900 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L2 4v3.5c0 2.8 2.1 5.1 5 5.5 2.9-.4 5-2.7 5-5.5V4L7 1.5z" stroke="#6b7280" strokeWidth="1.2" fill="none"/></svg>
            Płatność przez Stripe
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#6b7280" strokeWidth="1.2"/><path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Szyfrowane HTTPS
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Zgodne z RODO
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Przepisy prawa polskiego
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            BLIK · karta · Przelewy24
          </span>
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
              <div key={s.n} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-6 left-[calc(50%+40px)] right-[-50%] h-px bg-gray-100" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5 ring-4 ring-white shadow-sm">
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
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-indigo-200"
            >
              Zacznij teraz
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
              <div key={i} className="bg-slate-900 rounded-2xl border border-white/5 p-5 space-y-4">
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
            <div className="border border-gray-200 rounded-2xl p-7 text-center bg-gray-50">
              <div className="text-3xl font-bold text-gray-300 mb-1">0 zł</div>
              <div className="font-semibold text-gray-600 mb-4 text-sm">Sam napiszesz</div>
              <ul className="text-sm text-gray-500 text-left space-y-2.5">
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Kilka godzin na research</li>
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Nie znasz odpowiednich artykułów</li>
                <li className="flex gap-2.5 items-start"><span className="text-red-400 shrink-0 font-bold">✗</span>Sklep to wyczuje i zlekceważy</li>
              </ul>
            </div>
            <div className="border-2 border-indigo-500 rounded-2xl p-7 text-center bg-indigo-50 relative shadow-xl shadow-indigo-100">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">Najlepszy wybór</div>
              <div className="text-3xl font-bold text-indigo-600 mb-1">29 zł</div>
              <div className="font-semibold text-gray-900 mb-4 text-sm">Writeback</div>
              <ul className="text-sm text-gray-700 text-left space-y-2.5">
                <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Gotowe w 5 minut</li>
                <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Właściwe artykuły ustaw</li>
                <li className="flex gap-2.5 items-start"><span className="text-indigo-500 shrink-0 font-bold">✓</span>Odwołanie gratis jeśli nie pomoże</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-2xl p-7 text-center bg-gray-50">
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
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-colors text-base shadow-lg shadow-indigo-200"
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
            <p className="text-gray-500 text-sm">Reklamacja do sklepu już dostępna — reszta wkrótce</p>
          </div>
          <div className="space-y-2">
            {TYPES.map((t) => (
              <div
                key={t.label}
                className={`flex items-center justify-between rounded-xl px-5 py-4 border transition-all ${
                  t.active
                    ? "border-indigo-200 bg-white shadow-sm shadow-indigo-100"
                    : "border-gray-100 bg-white/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${t.active ? "bg-emerald-500" : "bg-gray-200"}`} />
                  <div>
                    <div className={`font-semibold text-sm ${t.active ? "text-gray-900" : "text-gray-400"}`}>
                      {t.label}
                    </div>
                    <div className={`text-xs mt-0.5 ${t.active ? "text-gray-500" : "text-gray-300"}`}>{t.desc}</div>
                  </div>
                </div>
                {t.active ? (
                  <Link
                    href="/zamow"
                    className="ml-6 shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Napisz →
                  </Link>
                ) : (
                  <span className="ml-6 shrink-0 text-xs text-gray-300 bg-gray-100 px-3 py-1.5 rounded-lg">Wkrótce</span>
                )}
              </div>
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
              <details key={i} className="border border-gray-100 rounded-xl overflow-hidden group bg-white hover:border-gray-200 transition-colors">
                <summary className="px-5 py-4 text-sm font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-4 text-gray-400 transition-transform duration-200 group-open:rotate-180">
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
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
            className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold px-10 py-4 rounded-xl transition-colors shadow-2xl text-base"
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
          <a href="mailto:hello@writeback.pl" className="hover:text-slate-300 transition-colors">
            hello@writeback.pl
          </a>
          <span>·</span>
          <Link href="/regulamin" className="hover:text-slate-300 transition-colors">
            Regulamin
          </Link>
          <span>·</span>
          <Link href="/polityka" className="hover:text-slate-300 transition-colors">
            Polityka prywatności
          </Link>
          <span>·</span>
          <span>Maciej Perzankowski Software Solutions · NIP 8361881457</span>
        </p>
      </footer>

    </div>
  );
}
