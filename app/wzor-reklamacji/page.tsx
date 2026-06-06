import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wzór reklamacji do sklepu internetowego z art. 43b — PDF | Writeback",
  description: "Wzór pisma reklamacyjnego do sklepu internetowego z podstawą prawną (art. 43b ustawy o prawach konsumenta). Gotowy PDF w 5 minut. Sklep ma 14 dni na odpowiedź — brak odpowiedzi = reklamacja uznana.",
  alternates: { canonical: "https://writeback.pl/wzor-reklamacji" },
  openGraph: {
    title: "Wzór reklamacji do sklepu internetowego z przepisami prawa",
    description: "Profesjonalny wzór pisma reklamacyjnego z art. 43b UPK. Pismo PDF gotowe w 5 minut, sklep musi odpowiedzieć w 14 dniach.",
    url: "https://writeback.pl/wzor-reklamacji",
    locale: "pl_PL",
    type: "article",
  },
};

export default function WzorReklamacji() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
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
            <span className="text-slate-400">Wzór reklamacji</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Wzór reklamacji do sklepu internetowego<br className="hidden sm:block" /> z podstawą prawną
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
            Pismo reklamacyjne bez powołania na konkretny przepis to prośba, nie roszczenie.
            Poniżej struktura skutecznego pisma i jak wygenerować je automatycznie w 5 minut.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Struktura wzorowego pisma reklamacyjnego</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Skuteczne pismo reklamacyjne musi zawierać wszystkie poniższe elementy. Brak choćby jednego może dać sklepowi pretekst do odmowy albo zwlekania.
        </p>

        {/* Mockup of letter structure */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-10 shadow-sm">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-300" />
            <div className="w-3 h-3 rounded-full bg-yellow-300" />
            <div className="w-3 h-3 rounded-full bg-green-300" />
            <span className="ml-2 text-xs text-gray-400 font-mono">reklamacja.pdf</span>
          </div>
          <div className="p-6 font-mono text-xs leading-relaxed text-gray-700 space-y-3">
            <div>
              <span className="text-indigo-600 font-bold">[Imię Nazwisko]</span><br />
              <span className="text-gray-500">[ulica i numer]</span><br />
              <span className="text-gray-500">[kod] [miasto]</span><br />
              <span className="text-gray-500">[email]</span>
            </div>
            <div className="text-right text-gray-500">[miejscowość], [data]</div>
            <div>
              <span className="text-indigo-600 font-bold">[Nazwa sklepu]</span><br />
              <span className="text-gray-500">[adres sklepu]</span>
            </div>
            <div className="border-l-4 border-indigo-400 pl-3 text-indigo-700 font-bold">
              DOTYCZY: Reklamacja — [opis produktu], zamówienie nr [XXX]
            </div>
            <div className="text-gray-600">Szanowni Państwo,</div>
            <div className="text-gray-600">
              W dniu [data] nabyłem/am w Państwa sklepie [produkt] za cenę [kwota] zł (nr zamówienia: [XXX]). W dniu [data ujawnienia] stwierdziłem/am [opis wady]. Produkt jest niezgodny z umową w rozumieniu art. 43a ustawy z dnia 30 maja 2014 r. o prawach konsumenta.
            </div>
            <div className="bg-indigo-50 text-indigo-800 p-3 rounded-lg font-sans text-xs">
              <strong>ŻĄDANIE</strong><br />
              Na podstawie art. 43c ust. 1 ustawy o prawach konsumenta żądam wymiany towaru na wolny od wad / naprawy towaru. W przypadku niemożności spełnienia żądania — obniżenia ceny o [kwota] zł lub odstąpienia od umowy i zwrotu ceny.
            </div>
            <div className="bg-indigo-50 text-indigo-800 p-3 rounded-lg font-sans text-xs">
              <strong>PODSTAWA PRAWNA</strong><br />
              - Art. 43a–43g ustawy z dnia 30.05.2014 r. o prawach konsumenta (niezgodność towaru z umową)<br />
              - Art. 7a ust. 1 UPK (14-dniowy termin na odpowiedź)
            </div>
            <div className="bg-gray-50 text-gray-600 p-3 rounded-lg font-sans text-xs border border-gray-200">
              <strong>TERMIN ODPOWIEDZI</strong><br />
              Zgodnie z art. 7a ust. 1 ustawy o prawach konsumenta, oczekuję odpowiedzi w terminie 14 dni od otrzymania niniejszego pisma. Brak odpowiedzi w tym terminie jest równoznaczny z uznaniem reklamacji za zasadną.
            </div>
            <div className="text-gray-600">
              Z poważaniem,<br />
              <span className="border-b border-dashed border-gray-400 inline-block w-40 mt-4 mb-1" /><br />
              [Imię Nazwisko]
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dlaczego gotowe wzory z Googla często nie działają</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Większość wzorów dostępnych w internecie jest szablonowa — zawiera ogólne zwroty jak &bdquo;proszę o naprawę lub wymianę&rdquo; bez wskazania konkretnego przepisu i artykułu. Sklep może zignorować takie pismo lub odpowiedzieć odmownie, bo nie widzi żadnego ryzyka prawnego.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Skuteczne pismo musi być dostosowane do Twojej konkretnej sytuacji: daty zakupu (przepisy różnią się dla zakupów przed i po 01.01.2023), rodzaju wady (istotna vs. nieistotna wpływa na dostępne żądania), historii kontaktu ze sklepem i wybranego żądania.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-10">
          Pismo powinno też zawierać informację o art. 7a i 14-dniowym terminie na odpowiedź. Sklep, który widzi konkretny przepis, reaguje inaczej niż na zwykłego maila. Sklepy, które dostają ogólne prośby, mogą czekać tygodniami.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kiedy wzór NIE wystarczy</h2>
        <div className="space-y-3 mb-10">
          {[
            "Spór dotyczy kwoty powyżej kilku tysięcy złotych. Warto skonsultować z prawnikiem.",
            "Sklep odpowiedział odmownie, powołując się na konkretny przepis. Potrzebna jest ocena prawna.",
            "Towar był używany lub kupiony od osoby prywatnej (nie od przedsiębiorcy) — inne przepisy",
            "Masz pismo z ZUS, US lub ubezpieczyciela — inne tryby odwoławcze",
          ].map((item, i) => (
            <div key={i} className="flex gap-3 p-4 border border-amber-100 bg-amber-50/50 rounded-xl text-sm text-amber-800">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5"><path d="M8 1L15 14H1L8 1z" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 6v3.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="11.5" r="0.75" fill="#d97706"/></svg>
              {item}
            </div>
          ))}
        </div>

        <div className="bg-slate-950 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Wygeneruj swoje pismo reklamacyjne</h2>
          <p className="text-slate-400 text-sm mb-2 leading-relaxed">
            Zamiast wypełniać wzór ręcznie — opisz sytuację w formularzu, a wygenerujemy pismo dopasowane do Twojego przypadku z właściwymi artykułami ustaw.
          </p>
          <p className="text-slate-500 text-xs mb-6">Reklamacja do sklepu, banku, ZUS, wypowiedzenie umowy — wszystkie typy pism.</p>
          <Link
            href="/zamow"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            Wygeneruj pismo — 29 zł
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <p className="text-slate-500 text-xs mt-3">Jednorazowa opłata · PDF na maila w 5 minut · Odwołanie gratis jeśli nie pomoże</p>
        </div>
      </div>

      <footer className="bg-slate-950 border-t border-white/5 py-8 px-6 text-center text-xs text-slate-500">
        <p className="mb-2">© 2026 writeback.pl</p>
        <p className="mb-3 text-slate-600 leading-relaxed max-w-xl mx-auto">Pisma generowane przez writeback.pl mają charakter informacyjny i pomocniczy. Nie stanowią porady prawnej ani zastępstwa adwokata lub radcy prawnego. W sprawach złożonych zalecamy konsultację z prawnikiem lub rzecznikiem praw konsumentów.</p>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link href="/" className="hover:text-slate-300 transition-colors">Strona główna</Link>
          <span>·</span>
          <Link href="/jak-napisac-reklamacje" className="hover:text-slate-300 transition-colors">Jak napisać reklamację</Link>
          <span>·</span>
          <Link href="/reklamacja-allegro" className="hover:text-slate-300 transition-colors">Reklamacja Allegro</Link>
          <span>·</span>
          <Link href="/regulamin" className="hover:text-slate-300 transition-colors">Regulamin</Link>
        </p>
      </footer>
    </div>
  );
}
