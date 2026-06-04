import Link from "next/link";

const STEPS = [
  {
    n: "1",
    title: "Opisz sytuację",
    desc: "Wypełniasz formularz w 3 minuty — co kupiłeś, co poszło nie tak, czego żądasz.",
  },
  {
    n: "2",
    title: "AI pisze pismo",
    desc: "Generujemy pismo powołując się na konkretne artykuły ustaw — w 30 sekund.",
  },
  {
    n: "3",
    title: "Pobierasz i wysyłasz",
    desc: "PDF na maila od razu. Sklep ma 14 dni na odpowiedź z mocy art. 7a.",
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
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight text-gray-900">writeback</span>
          <Link
            href="/zamow"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Napisz pismo
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          Prawo jest po Twojej stronie
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-gray-900 mb-5">
          Sklep Cię zignorował?<br />
          <span className="text-indigo-600">Napisz pismo które<br />muszą przeczytać.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Pismo reklamacyjne z art. 43b ustawy o prawach konsumenta.
          Gotowe w 5 minut. Sklep ma <strong className="text-gray-900">14 dni</strong> na odpowiedź —
          brak odpowiedzi = reklamacja uznana z mocy prawa.
        </p>
        <Link
          href="/zamow"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-colors text-base shadow-lg shadow-indigo-200"
        >
          Napisz pismo — 29 zł
        </Link>
        <p className="text-sm text-gray-400 mt-3">
          Jednorazowa opłata · PDF na maila od razu · Jeśli nie pomoże — odwołanie gratis
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-10 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L2 4v3.5c0 2.8 2.1 5.1 5 5.5 2.9-.4 5-2.7 5-5.5V4L7 1.5z" stroke="#6b7280" strokeWidth="1.2" fill="none"/></svg>
            Płatność przez Stripe
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#6b7280" strokeWidth="1.2"/><path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Szyfrowane połączenie
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Zgodne z RODO
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Generowane przez Claude AI (Anthropic)
          </span>
        </div>
      </section>

      {/* Jak działa */}
      <section className="bg-gray-50 border-y border-gray-100 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Jak to działa</h2>
          <p className="text-center text-gray-500 text-sm mb-14">Od momentu płatności do gotowego pisma — mniej niż 5 minut</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-base font-bold mx-auto mb-5 shadow-md shadow-indigo-200">
                  {s.n}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price anchor */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Ile kosztuje Twój czas?</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Porównaj zanim zdecydujesz</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-2xl p-6 text-center bg-gray-50">
            <div className="text-3xl font-bold text-gray-400 mb-1">0 zł</div>
            <div className="font-semibold text-gray-700 mb-3">Sam napiszesz</div>
            <ul className="text-sm text-gray-500 text-left space-y-2">
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Kilka godzin na research</li>
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Nie znasz odpowiednich artykułów</li>
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Sklep to wyczuje i zlekceważy</li>
            </ul>
          </div>
          <div className="border-2 border-indigo-600 rounded-2xl p-6 text-center bg-indigo-50 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">Najlepszy wybór</div>
            <div className="text-3xl font-bold text-indigo-600 mb-1">29 zł</div>
            <div className="font-semibold text-gray-900 mb-3">Writeback</div>
            <ul className="text-sm text-gray-700 text-left space-y-2">
              <li className="flex gap-2"><span className="text-indigo-500 shrink-0">✓</span>Gotowe w 5 minut</li>
              <li className="flex gap-2"><span className="text-indigo-500 shrink-0">✓</span>Właściwe artykuły ustaw</li>
              <li className="flex gap-2"><span className="text-indigo-500 shrink-0">✓</span>Odwołanie gratis jeśli nie pomoże</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-2xl p-6 text-center bg-gray-50">
            <div className="text-3xl font-bold text-gray-400 mb-1">300+ zł</div>
            <div className="font-semibold text-gray-700 mb-3">Prawnik</div>
            <ul className="text-sm text-gray-500 text-left space-y-2">
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Droga porada za reklamację</li>
              <li className="flex gap-2"><span className="text-red-400 shrink-0">✗</span>Termin wizyty za kilka dni</li>
              <li className="flex gap-2"><span className="text-green-500 shrink-0">✓</span>Potrzebne przy poważnych sporach</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            href="/zamow"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-colors text-base shadow-lg shadow-indigo-200"
          >
            Napisz pismo — 29 zł
          </Link>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="bg-gray-50 border-y border-gray-100 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            Dlaczego sklepy ignorują zwykłe reklamacje
          </h2>
          <p className="text-center text-gray-500 text-sm mb-12">I jak pismo z Writeback to zmienia</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROBLEMS.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.before}</p>
                </div>
                <div className="border-t border-gray-100" />
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-900 font-medium leading-relaxed">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jakie pisma */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Jakie pisma piszemy</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Reklamacja do sklepu już dostępna — reszta wkrótce</p>
        <div className="space-y-2">
          {TYPES.map((t) => (
            <div
              key={t.label}
              className={`flex items-center justify-between rounded-xl px-5 py-4 border transition-colors ${
                t.active
                  ? "border-indigo-200 bg-indigo-50"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <div>
                <div className={`font-medium text-sm ${t.active ? "text-gray-900" : "text-gray-400"}`}>
                  {t.label}
                </div>
                <div className={`text-xs mt-0.5 ${t.active ? "text-gray-500" : "text-gray-400"}`}>{t.desc}</div>
              </div>
              {t.active ? (
                <Link
                  href="/zamow"
                  className="ml-6 shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Napisz →
                </Link>
              ) : (
                <span className="ml-6 shrink-0 text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">Wkrótce</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-y border-gray-100 py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Częste pytania</h2>
          <p className="text-center text-gray-500 text-sm mb-12">Masz inne pytanie? Napisz na hello@writeback.pl</p>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-xl overflow-hidden group bg-white">
                <summary className="px-5 py-4 text-sm font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-4 text-gray-400 transition-transform duration-200 group-open:rotate-180">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </summary>
                <p className="px-5 pb-5 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-20 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Odzyskaj swoje pieniądze
        </h2>
        <p className="text-indigo-200 mb-2 max-w-sm mx-auto leading-relaxed">
          Pismo gotowe w 5 minut. Sklep musi odpowiedzieć w 14 dni.
        </p>
        <p className="text-indigo-300 text-sm mb-10">
          Jednorazowa opłata 29 zł · Żadnych subskrypcji
        </p>
        <Link
          href="/zamow"
          className="inline-block bg-white text-indigo-600 font-bold px-10 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-xl"
        >
          Napisz pismo — 29 zł
        </Link>
        <p className="text-indigo-300 text-sm mt-4">Jeśli nie pomoże — odwołanie gratis</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-400">
        <p className="mb-2">
          © 2026 writeback.pl · Narzędzie do tworzenia pism, nie porada prawna
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <a href="mailto:hello@writeback.pl" className="hover:text-gray-700 transition-colors underline underline-offset-2">
            hello@writeback.pl
          </a>
          <span>·</span>
          <Link href="/regulamin" className="hover:text-gray-700 transition-colors underline underline-offset-2">
            Regulamin
          </Link>
          <span>·</span>
          <Link href="/polityka" className="hover:text-gray-700 transition-colors underline underline-offset-2">
            Polityka prywatności
          </Link>
          <span>·</span>
          <span>Maciej Perzankowski Software Solutions · NIP 8361881457</span>
        </p>
      </footer>

    </div>
  );
}
