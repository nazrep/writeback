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
      title: "Czekaj na odpowiedź — 14 dni",
      desc: "Brak odpowiedzi w terminie = reklamacja uznana za zasadną (art. 7a UPK).",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-white/5 px-6 flex items-center h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-black text-sm leading-none">W</span>
          </div>
          <span className="text-white font-bold text-base tracking-tight">writeback</span>
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
                <a
                  href="https://mail.google.com/mail/u/0/#search/from:hello@writeback.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.909 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
                  </svg>
                  Otwórz Gmail i sprawdź email
                </a>
                <Link
                  href="/"
                  className="flex items-center justify-center w-full bg-slate-950 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  Wróć na stronę główną
                </Link>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-500 mt-6">
            writeback.pl · Narzędzie do tworzenia pism konsumenckich, nie porada prawna
          </p>
        </div>
      </div>
    </div>
  );
}
