import Link from "next/link";

export const metadata = { title: "Pismo gotowe — Writeback" };

export default function GotowePage() {
  const steps = [
    {
      n: "1",
      title: "Sprawdź skrzynkę email",
      desc: "PDF z pismem jest już w Twojej skrzynce. Sprawdź też folder spam.",
    },
    {
      n: "2",
      title: "Wyślij pismo do sklepu",
      desc: "Emailem na adres obsługi klienta lub listem poleconym za potwierdzeniem.",
    },
    {
      n: "3",
      title: "Zachowaj potwierdzenie wysyłki",
      desc: "Data wysyłki jest kluczowa — od niej biegnie ustawowy termin odpowiedzi.",
    },
    {
      n: "4",
      title: "Czekaj na odpowiedź",
      desc: "Sklep ma 14 dni (art. 7a UPK), bank 30 dni — brak odpowiedzi w ustawowym terminie to uznanie reklamacji za zasadną.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 flex items-center h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-black text-sm leading-none">W</span>
          </div>
          <span className="text-gray-900 font-bold text-base tracking-tight">writeback<span className="text-indigo-600">.pl</span></span>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">

          {/* Success card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden">

            {/* Hero */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 px-8 pt-10 pb-8 text-center">
              <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14l6 6L23 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Pismo gotowe!</h1>
              <p className="text-indigo-200 text-sm leading-relaxed">
                PDF z pismem reklamacyjnym został wysłany<br className="hidden sm:block" /> na Twój adres email.
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-7">

              {/* Steps */}
              <div className="mb-7">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Co dalej?</p>
                <div className="space-y-4">
                  {steps.map((s) => (
                    <div key={s.n} className="flex gap-3.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                        {s.n}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{s.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-6" />

              {/* Support note */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3.5 mb-6 text-sm text-indigo-800 leading-relaxed">
                <span className="font-semibold">Pismo nie pomogło?</span> Napisz na{" "}
                <a href="mailto:hello@writeback.pl" className="font-bold underline underline-offset-2">
                  hello@writeback.pl
                </a>{" "}
                — odwołanie przygotujemy za darmo.
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <p className="text-sm text-indigo-800 leading-relaxed">
                    Sprawdź skrzynkę <strong>hello@writeback.pl</strong> — PDF jest już na Twoim emailu. Jeśli nie widzisz, zajrzyj do folderu <strong>Spam</strong>.
                  </p>
                </div>
                <Link
                  href="/"
                  className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  Wróć na stronę główną
                </Link>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 mt-6">
            writeback.pl · Narzędzie do tworzenia pism konsumenckich, nie porada prawna
          </p>
        </div>
      </div>
    </div>
  );
}
