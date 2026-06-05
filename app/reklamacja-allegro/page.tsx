import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reklamacja na Allegro — jak złożyć pismo z przepisami prawa? | Writeback",
  description: "Jak złożyć reklamację na Allegro i innych platformach zakupowych? Art. 43b ustawy o prawach konsumenta obowiązuje także przy zakupach od sprzedawców na Allegro. Pismo PDF gotowe w 5 minut.",
  alternates: { canonical: "https://writeback.pl/reklamacja-allegro" },
  openGraph: {
    title: "Reklamacja na Allegro — pismo z podstawą prawną",
    description: "Reklamacja do sprzedawcy na Allegro z art. 43b UPK. Brak odpowiedzi w 14 dniach = reklamacja uznana. Pismo PDF w 5 minut.",
    url: "https://writeback.pl/reklamacja-allegro",
    locale: "pl_PL",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Czy mogę złożyć reklamację przy zakupie na Allegro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak. Jeśli kupiłeś towar od sprzedawcy-przedsiębiorcy (nie od osoby prywatnej), przysługuje Ci pełna ochrona z ustawy o prawach konsumenta, w tym prawo do reklamacji na podstawie art. 43b przez 2 lata od zakupu.",
      },
    },
    {
      "@type": "Question",
      name: "Czy reklamacja na Allegro przez formularz wystarczy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Formalnie wystarczy, ale nie masz dowodu daty złożenia ani treści. Lepiej wysłać emailem bezpośrednio do sprzedawcy lub przez wiadomości Allegro — masz wtedy historię korespondencji jako dowód.",
      },
    },
    {
      "@type": "Question",
      name: "Sprzedawca na Allegro nie odpowiada na reklamację — co mogę zrobić?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zgodnie z art. 7a ustawy o prawach konsumenta, brak odpowiedzi w 14 dniach = reklamacja uznana za zasadną. Możesz to wprost wpisać w kolejnym piśmie i powołać się na ten przepis żądając spełnienia roszczenia.",
      },
    },
  ],
};

export default function ReklamacjaAllegro() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">W</span>
            <span className="font-bold text-lg tracking-tight text-white">writeback</span>
          </Link>
          <Link href="/zamow" className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
            Napisz pismo — 29 zł
          </Link>
        </div>
      </nav>

      <div className="bg-slate-950 py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs text-slate-500 mb-4">
            <Link href="/" className="hover:text-slate-300 transition-colors">writeback.pl</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-400">Reklamacja Allegro</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Reklamacja na Allegro — co Ci przysługuje<br className="hidden sm:block" /> i jak to wyegzekwować
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
            Kupujesz na Allegro od sprzedawcy-przedsiębiorcy? Masz dokładnie takie same prawa jak w każdym innym sklepie internetowym — ustawa o prawach konsumenta nie robi wyjątków dla platform marketplace.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-10">
          <p className="text-sm font-bold text-indigo-900 mb-2">Najważniejsza zasada</p>
          <p className="text-sm text-indigo-800 leading-relaxed">
            Allegro to platforma — odpowiedzialnym za towar jest <strong>sprzedawca</strong>, nie Allegro.
            Reklamację składasz bezpośrednio do sprzedawcy, nie do Allegro obsługi klienta.
            Allegro może pomóc w sporze (program ochrony kupujących), ale to sprzedawca jest stroną umowy.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kiedy masz prawo do reklamacji na Allegro</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Prawo do reklamacji przysługuje Ci, gdy spełnione są łącznie dwa warunki:
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex gap-3 p-4 border border-emerald-100 bg-emerald-50/50 rounded-xl">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5"><path d="M3 8l3.5 3.5L13 5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="text-sm text-emerald-800">
              <strong>Sprzedawca to przedsiębiorca</strong> — ma zarejestrowaną działalność, wystawia faktury lub paragony. Na Allegro jest to każde konto firmowe (Allegro pokazuje to przy ofercie).
            </div>
          </div>
          <div className="flex gap-3 p-4 border border-emerald-100 bg-emerald-50/50 rounded-xl">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5"><path d="M3 8l3.5 3.5L13 5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="text-sm text-emerald-800">
              <strong>Towar jest niezgodny z umową</strong> — nie działa, jest uszkodzony, różni się od opisu, nie posiada zapowiadanych funkcji lub dotarło coś innego.
            </div>
          </div>
          <div className="flex gap-3 p-4 border border-red-50 bg-red-50/50 rounded-xl">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5"><path d="M4 4l8 8M12 4l-8 8" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <div className="text-sm text-red-700">
              <strong>Uwaga:</strong> kupujesz od osoby prywatnej (konto bez działalności)? Ustawa o prawach konsumenta nie obowiązuje — możesz powołać się tylko na rękojmię z Kodeksu cywilnego, ale sprzedawca prywatny może ją wyłączyć.
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-10">Jak złożyć reklamację do sprzedawcy na Allegro</h2>
        <div className="space-y-3 mb-10">
          {[
            {
              n: "1",
              title: "Zidentyfikuj sprzedawcę",
              desc: "W potwierdzeniu zamówienia lub historii zakupów znajdziesz pełną nazwę firmy sprzedającego. To Twój adresat — nie platforma Allegro.",
            },
            {
              n: "2",
              title: "Napisz pismo z podstawą prawną",
              desc: "Zwykła wiadomość przez Allegro może być zignorowana. Pismo z art. 43b i art. 7a ustawy o prawach konsumenta ma wagę prawną — sprzedawca wie, że musi odpowiedzieć w 14 dni.",
            },
            {
              n: "3",
              title: "Wyślij przez wiadomości Allegro LUB emailem",
              desc: "Obie metody zostawiają ślad. Wiadomości Allegro mają zapis z datą — to Twój dowód. Jeśli sprzedawca podaje email firmowy, użyj go i zachowaj kopię.",
            },
            {
              n: "4",
              title: "Brak odpowiedzi po 14 dniach?",
              desc: "Art. 7a UPK: reklamacja uznana za zasadną. Wyślij kolejne pismo powołując się na milczące uznanie i żądaj spełnienia roszczenia. Możesz też zgłosić spor do Allegro (program ochrony kupujących) lub do Rzecznika Praw Konsumentów.",
            },
          ].map((item) => (
            <div key={item.n} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:border-indigo-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center shrink-0">{item.n}</div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                <div className="text-gray-500 text-sm mt-0.5 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Typowe odpowiedzi sprzedawców i jak na nie reagować</h2>
        <div className="space-y-3 mb-10">
          {[
            {
              claim: 'Towar był sprawny przy wysyłce',
              response: "Art. 43a ust. 2 UPK: domniemywa się, że niezgodność istniała w chwili dostawy, jeśli ujawniono ją w ciągu roku (zakupy po 01.01.2023). Odwracasz ciężar dowodu — to sprzedawca musi udowodnić, że towar był sprawny.",
            },
            {
              claim: 'Minął termin 30 dni',
              response: "Ustawa o prawach konsumenta nie zna terminu 30 dni dla reklamacji. Masz 2 lata od wydania towaru (art. 43a ust. 2). 30 dni to termin dla odstąpienia od umowy — zupełnie inna kwestia.",
            },
            {
              claim: 'Uszkodzenia mechaniczne nie są objęte reklamacją',
              response: "Tak — ale sprzedawca musi udowodnić, że uszkodzenie nie wynikło z niezgodności fabrycznej. Jeśli wada ujawniła się bez żadnego uderzenia czy upadku, to jego problem, nie Twój.",
            },
            {
              claim: 'Proszę odesłać do producenta w ramach gwarancji',
              response: "Gwarancja i reklamacja z tytułu niezgodności towaru z umową to dwa różne tryby. Masz prawo wybrać reklamację do sprzedawcy — on nie może Cię przekierować do producenta.",
            },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">
                Sprzedawca twierdzi: <em>{item.claim}</em>
              </div>
              <div className="px-5 py-3 text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-emerald-700">Odpowiedź prawna: </span>{item.response}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Często zadawane pytania</h2>
        <div className="space-y-2 mb-10">
          {[
            {
              q: "Czy mogę złożyć reklamację przy zakupie na Allegro?",
              a: "Tak — jeśli kupiłeś od sprzedawcy-przedsiębiorcy. Masz pełną ochronę z ustawy o prawach konsumenta przez 2 lata od zakupu.",
            },
            {
              q: "Czy reklamacja przez formularz Allegro wystarczy?",
              a: "Formalnie tak, ale nie masz dowodu daty ani treści pisma. Bezpieczniej jest wysłać wiadomość przez system Allegro lub emailem — masz wtedy historię jako dowód.",
            },
            {
              q: "Sprzedawca ignoruje moje wiadomości — co robić?",
              a: "Wyślij formalne pismo z podstawą prawną. Brak odpowiedzi w 14 dniach = reklamacja uznana z mocy art. 7a UPK. Możesz też zgłosić spór do Allegro (program ochrony kupujących) lub do Rzecznika Praw Konsumentów.",
            },
            {
              q: "Allegro twierdzi, że nie odpowiada za towar — mam pisać do nich czy do sprzedawcy?",
              a: "Do sprzedawcy. Allegro to platforma, umowę zawierasz ze sprzedawcą. Allegro program ochrony kupujących to dodatkowe narzędzie, nie zastępuje praw ustawowych.",
            },
          ].map((faq, i) => (
            <details key={i} className="border border-gray-100 rounded-xl overflow-hidden group bg-white hover:border-indigo-100 transition-colors">
              <summary className="px-5 py-4 text-sm font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between hover:bg-indigo-50/50 transition-colors">
                {faq.q}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-4 text-gray-400 transition-transform group-open:rotate-180">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </summary>
              <p className="px-5 pb-5 pt-2 text-sm text-gray-500 leading-relaxed border-t border-gray-100">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="bg-slate-950 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Wygeneruj pismo reklamacyjne do sprzedawcy na Allegro</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Opisz sytuację w formularzu — wygenerujemy pismo z art. 43b i 7a ustawy o prawach konsumenta,<br className="hidden sm:block" />
            gotowe do wysłania przez wiadomości Allegro lub emailem. PDF na Twoją skrzynkę w 5 minut.
          </p>
          <Link
            href="/zamow"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            Napisz pismo — 29 zł
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <p className="text-slate-500 text-xs mt-3">Jednorazowa opłata · PDF na maila w 5 minut · Odwołanie gratis jeśli nie pomoże</p>
        </div>
      </div>

      <footer className="bg-slate-950 border-t border-white/5 py-8 px-6 text-center text-xs text-slate-500">
        <p className="mb-2">© 2026 writeback.pl · Narzędzie do tworzenia pism, nie porada prawna</p>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link href="/" className="hover:text-slate-300 transition-colors">Strona główna</Link>
          <span>·</span>
          <Link href="/jak-napisac-reklamacje" className="hover:text-slate-300 transition-colors">Jak napisać reklamację</Link>
          <span>·</span>
          <Link href="/wzor-reklamacji" className="hover:text-slate-300 transition-colors">Wzór reklamacji</Link>
          <span>·</span>
          <Link href="/regulamin" className="hover:text-slate-300 transition-colors">Regulamin</Link>
        </p>
      </footer>
    </div>
  );
}
