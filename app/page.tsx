import Link from "next/link";

const TYPES = [
  { slug: "sklep", label: "Reklamacja do sklepu / Allegro", desc: "Produkt nie dotarł, uszkodzony, niezgodny z opisem, odmowa zwrotu" },
  { slug: "bank", label: "Reklamacja do banku / ubezpieczyciela", desc: "Nieautoryzowana transakcja, odmowa wypłaty, błędna opłata", soon: true },
  { slug: "zus", label: "Odwołanie od decyzji ZUS / US", desc: "Odmowa świadczenia, zawyżona składka, decyzja podatkowa", soon: true },
  { slug: "umowa", label: "Wypowiedzenie umowy", desc: "Internet, gym, prąd, telefon — bez kar umownych", soon: true },
  { slug: "uokik", label: "Skarga do UOKiK / Rzecznika", desc: "Gdy sklep nie odpowiada na reklamację", soon: true },
];

const STEPS = [
  { n: "1", title: "Opisz sytuację", desc: "Wypełniasz krótki formularz — co kupiłeś, co się stało, czego żądasz." },
  { n: "2", title: "AI pisze pismo", desc: "Generujemy profesjonalne pismo z właściwymi przepisami prawnymi. Zajmuje to 30 sekund." },
  { n: "3", title: "Pobierasz i wysyłasz", desc: "Dostajesz PDF gotowy do wysłania. Sklep ma 14 dni na odpowiedź — prawo go do tego zobowiązuje." },
];

const FAQS = [
  { q: "Dlaczego pismo z Writeback jest skuteczniejsze niż wzór z Googla?", a: "Wzory z internetu są ogólne. Nasze pismo powołuje konkretne artykuły ustaw dopasowane do Twojej sytuacji — np. art. 43b Ustawy o prawach konsumenta przy niezgodności towaru, albo art. 548 KC przy niedostarczeniu. Sklepy traktują takie pisma poważniej." },
  { q: "Co jeśli sklep nie odpowie?", a: "Brak odpowiedzi w 14 dniach = uznanie reklamacji za zasadną (art. 7a Ustawy o prawach konsumenta). Pismo które generujemy zawiera tę informację — to działa jak presja prawna." },
  { q: "Czy to jest porada prawna?", a: "Nie. Writeback to narzędzie do tworzenia pism konsumenckich, nie kancelaria prawna. Przy sporach powyżej kilku tysięcy złotych warto skonsultować się z prawnikiem." },
  { q: "Co jeśli moje pismo nie pomoże?", a: "Jeśli sklep odmówi lub nie odpowie, piszemy odwołanie za darmo. Możemy też przygotować skargę do UOKiK lub Rzecznika Praw Konsumentów." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">writeback</span>
          <Link href="/zamow" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Napisz pismo
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block text-xs font-semibold bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full mb-6">
          Prawo jest po Twojej stronie
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
          Sklep Cię zignorował?<br />
          <span className="text-gray-400">Napisz pismo które muszą przeczytać.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
          Profesjonalna reklamacja z właściwymi przepisami prawnymi — gotowa w 5 minut.
          Sklep ma 14 dni na odpowiedź. Brak odpowiedzi = uznanie reklamacji.
        </p>
        <Link href="/zamow" className="inline-block bg-gray-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-gray-700 transition-colors text-base shadow-lg">
          Napisz pismo — 29 zł
        </Link>
        <p className="text-xs text-gray-400 mt-3">
          PDF gotowy od razu · Jeśli nie pomoże — odwołanie gratis
        </p>
      </section>

      {/* Jak działa */}
      <section className="bg-gray-50 border-y border-gray-100 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Jak to działa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">{s.n}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typy pism */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-3">Jakie pisma piszemy</h2>
        <p className="text-center text-gray-500 text-sm mb-10">Zacznij od reklamacji do sklepu — reszta wkrótce</p>
        <div className="space-y-3">
          {TYPES.map((t) => (
            <div key={t.slug} className={`flex items-center justify-between border rounded-xl px-5 py-4 transition-colors ${t.soon ? "opacity-50 border-gray-100" : "border-gray-200 hover:border-gray-300"}`}>
              <div>
                <div className="font-medium text-sm">{t.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{t.desc}</div>
              </div>
              {t.soon
                ? <span className="text-xs text-gray-400 shrink-0 ml-4">Wkrótce</span>
                : <Link href="/zamow" className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg shrink-0 ml-4 hover:bg-gray-700 transition-colors">Napisz →</Link>
              }
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="bg-gray-50 border-y border-gray-100 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Dlaczego sklepy ignorują zwykłe reklamacje</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { before: "Piszesz \"proszę o zwrot\" — sklep odpowiada po 3 tygodniach że \"nie uwzględnia\"", after: "Piszesz z art. 43b Ustawy o prawach konsumenta — sklep ma 14 dni i wie że brak odpowiedzi = przegrana" },
              { before: "Wzory z Googla są ogólne i nie powołują konkretnych przepisów", after: "Nasze pismo jest dopasowane do Twojej sytuacji z właściwymi artykułami ustaw" },
              { before: "Nie wiesz czego możesz żądać — zwrotu, wymiany, odszkodowania?", after: "Podpowiadamy co Ci się należy i dlaczego, zanim napiszesz słowo" },
              { before: "Sklep twierdzi że \"towar był używany\" albo \"termin minął\" bez podstawy prawnej", after: "Twoje pismo kontruje takie argumenty z odwołaniem do konkretnych przepisów" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5 text-xs text-red-400">✕</span>
                  <p className="text-sm text-gray-500">{item.before}</p>
                </div>
                <div className="border-t border-gray-50" />
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0 mt-0.5 text-xs text-green-600">✓</span>
                  <p className="text-sm font-medium">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Częste pytania</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details key={i} className="border border-gray-100 rounded-xl overflow-hidden group">
              <summary className="px-5 py-4 text-sm font-medium cursor-pointer list-none flex items-center justify-between hover:bg-gray-50 transition-colors">
                {faq.q}
                <span className="text-gray-400 ml-4 shrink-0 group-open:rotate-180 transition-transform duration-200">↓</span>
              </summary>
              <p className="px-5 pb-4 pt-1 text-sm text-gray-500 leading-relaxed border-t border-gray-50">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-16 px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Odzyskaj swoje pieniądze</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Pismo gotowe w 5 minut. Sklep musi odpowiedzieć w 14 dni.</p>
        <Link href="/zamow" className="inline-block bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors">
          Napisz pismo — 29 zł
        </Link>
        <p className="text-xs text-gray-500 mt-4">Jeśli nie pomoże — odwołanie gratis</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-400">
        © 2026 writeback.pl · Narzędzie do tworzenia pism, nie porada prawna ·{" "}
        <a href="mailto:hello@writeback.pl" className="hover:text-gray-600 transition-colors">hello@writeback.pl</a>
      </footer>

    </div>
  );
}
