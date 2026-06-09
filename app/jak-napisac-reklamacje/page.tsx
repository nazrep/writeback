import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Jak napisać reklamację do sklepu internetowego? Wzór z przepisami | Writeback",
  description: "Jak napisać skuteczną reklamację do sklepu internetowego krok po kroku. Art. 43b ustawy o prawach konsumenta, 14-dniowy termin odpowiedzi, brak odpowiedzi = reklamacja uznana. Wzór pisma PDF.",
  alternates: { canonical: "https://writeback.pl/jak-napisac-reklamacje" },
  openGraph: {
    title: "Jak napisać reklamację do sklepu internetowego — poradnik z przepisami",
    description: "Krok po kroku: skuteczna reklamacja z art. 43b ustawy o prawach konsumenta. Brak odpowiedzi sklepu w 14 dniach = reklamacja uznana z mocy prawa.",
    url: "https://writeback.pl/jak-napisac-reklamacje",
    locale: "pl_PL",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Jak napisać reklamację do sklepu internetowego",
  description: "Krok po kroku: jak napisać skuteczną reklamację do sklepu z podstawą prawną",
  step: [
    { "@type": "HowToStep", name: "Zbierz dane", text: "Nota zakupu, numer zamówienia, opis wady, data ujawnienia problemu." },
    { "@type": "HowToStep", name: "Wskaż podstawę prawną", text: "Art. 43b ustawy o prawach konsumenta — niezgodność towaru z umową (zakupy po 01.01.2023)." },
    { "@type": "HowToStep", name: "Sformułuj żądanie", text: "Naprawa, wymiana, obniżenie ceny lub odstąpienie od umowy — hierarchicznie." },
    { "@type": "HowToStep", name: "Wyślij i zachowaj potwierdzenie", text: "Email z potwierdzeniem odczytu lub list polecony — data wysyłki jest kluczowa." },
  ],
};

export default function JakNapisacReklamacje() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SiteHeader />

      <div className="bg-gray-50 border-b border-gray-100 py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-600 transition-colors">writeback.pl</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-500">Jak napisać reklamację</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Jak napisać skuteczną reklamację<br className="hidden sm:block" /> do sklepu internetowego
          </h1>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
            Większość reklamacji jest odrzucana, bo sklepy wiedzą, że zwykłe maile można zignorować.
            Pismo z właściwą podstawą prawną działa inaczej. Brak odpowiedzi w 14 dniach to automatyczne uznanie reklamacji.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-10">
          <p className="text-sm font-bold text-indigo-900 mb-1">Kluczowy przepis</p>
          <p className="text-sm text-indigo-800 leading-relaxed">
            <strong>Art. 43b ustawy z dnia 30 maja 2014 r. o prawach konsumenta</strong> — sprzedawca odpowiada za niezgodność towaru z umową istniejącą w chwili dostawy i ujawnioną w ciągu 2 lat od wydania towaru. Przepis dotyczy zakupów od 01.01.2023 r.
          </p>
          <p className="text-sm text-indigo-700 mt-2">
            <strong>Art. 7a tej samej ustawy</strong> — brak odpowiedzi na reklamację w terminie 14 dni = uznanie reklamacji za zasadną z mocy prawa.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Co musi zawierać skuteczna reklamacja</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Sklep nie może odrzucić reklamacji tylko dlatego, że jest napisana niedbale. Ale pismo bez podstawy prawnej daje mu pole do zwlekania i wymówek. Profesjonalna reklamacja zawiera:
        </p>
        <div className="space-y-3 mb-10">
          {[
            { n: "1", title: "Dane nadawcy", desc: "Imię, nazwisko, adres i email. Sklep musi wiedzieć, do kogo ma odpowiedzieć." },
            { n: "2", title: "Data i miejsce", desc: "Data wystawienia pisma. Od niej biegnie 14-dniowy termin na odpowiedź sklepu." },
            { n: "3", title: "Dane adresata", desc: "Pełna nazwa firmy i adres. Pismo musi trafić do właściwego podmiotu, nie tylko do obsługi klienta." },
            { n: "4", title: "DOTYCZY: opis sprawy", desc: "Krótkie streszczenie. Sklep od razu wie, o co chodzi, i szybciej reaguje." },
            { n: "5", title: "Opis niezgodności", desc: "Co kupiłeś, kiedy, jaka jest wada i kiedy ją odkryłeś. Opisz konkretnie i chronologicznie." },
            { n: "6", title: "Żądanie z podstawą prawną", desc: "Naprawa, wymiana, obniżenie ceny lub odstąpienie od umowy. Koniecznie z powołaniem na art. 43b UPK." },
            { n: "7", title: "Termin odpowiedzi", desc: "Napisz wprost: sklep ma 14 dni z mocy art. 7a. Brak odpowiedzi = reklamacja uznana." },
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

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Czego możesz żądać</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Ustawa o prawach konsumenta przewiduje konkretną kolejność żądań. Nie możesz od razu żądać zwrotu pieniędzy. Najpierw musisz dać sklepowi szansę na naprawę lub wymianę, chyba że jest to niemożliwe lub sklep już raz nie dotrzymał terminu.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {[
            { label: "Naprawa (art. 43d ust. 1)", desc: "To Ty wybierasz — możesz żądać naprawy zamiast wymiany. Sklep musi wykonać ją bezpłatnie i w rozsądnym czasie." },
            { label: "Wymiana (art. 43d ust. 1)", desc: "To Ty wybierasz — możesz żądać wymiany zamiast naprawy. Sklep może odmówić tylko gdy wymiana jest niemożliwa lub zbyt kosztowna." },
            { label: "Obniżenie ceny (art. 43e ust. 1)", desc: "Gdy sklep nie naprawił / nie wymienił w terminie, lub odmówił." },
            { label: "Odstąpienie od umowy (art. 43e ust. 1)", desc: "Zwrot pieniędzy — gdy niezgodność jest istotna i inne środki zawiodły." },
          ].map((item) => (
            <div key={item.label} className="p-4 border border-gray-100 rounded-xl bg-gray-50">
              <div className="font-semibold text-gray-900 text-sm mb-1">{item.label}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Najczęstsze błędy w reklamacjach</h2>
        <div className="space-y-2 mb-10">
          {[
            { err: "Brak podstawy prawnej", fix: "Sklep może twierdzić, że nie musi odpowiedzieć. Przepis ustawy = obowiązek odpowiedzi w 14 dniach." },
            { err: "Pismo bez uzasadnienia prawnego", fix: "Sklep może odmówić powołując się na regulamin. Żądanie musi wynikać z konkretnego przepisu." },
            { err: "Wysyłka przez formularz na stronie sklepu", fix: "Nie ma dowodu daty złożenia. Wyślij emailem albo listem poleconym i zachowaj kopię." },
            { err: "Pominięcie daty ujawnienia wady", fix: "Sklep może kwestionować, czy wada istniała w chwili sprzedaży. Data ujawnienia i opis okoliczności są kluczowe." },
            { err: "Reklamacja po 2 latach", fix: "Termin odpowiedzialności sprzedawcy wynosi 2 lata od wydania towaru (art. 43c ust. 1 UPK)." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 border border-red-50 bg-red-50/50 rounded-xl">
              <div className="shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5"/><path d="M8 5v3.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="11" r="0.75" fill="#ef4444"/></svg>
              </div>
              <div>
                <div className="font-semibold text-red-800 text-sm">{item.err}</div>
                <div className="text-red-600 text-xs mt-0.5 leading-relaxed">{item.fix}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Jak wysłać reklamację</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Forma złożenia reklamacji jest dowolna, ustawa nie wymaga pisemnej formy. Ważne jest jednak, żebyś mógł udowodnić datę złożenia i treść pisma.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {[
            { title: "Email (rekomendowane)", desc: "Wyślij na adres obsługi klienta lub info@firma.pl. Zachowaj email w wysłanych — masz dowód daty i treści.", good: true },
            { title: "List polecony", desc: "Za potwierdzeniem odbioru. Droższe, ale niepodważalne. Stosuj gdy sprawa dotyczy dużych kwot.", good: true },
            { title: "Formularz na stronie", desc: "Nie zostawia śladu po Twojej stronie. Unikaj — nie masz dowodu ani daty złożenia.", good: false },
          ].map((item) => (
            <div key={item.title} className={`p-4 rounded-xl border ${item.good ? "border-emerald-100 bg-emerald-50/50" : "border-red-100 bg-red-50/50"}`}>
              <div className={`font-semibold text-sm mb-1 ${item.good ? "text-emerald-900" : "text-red-800"}`}>{item.title}</div>
              <div className={`text-xs leading-relaxed ${item.good ? "text-emerald-700" : "text-red-600"}`}>{item.desc}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Co jeśli sklep nie odpowie w 14 dniach</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Zgodnie z art. 7a ust. 1 ustawy o prawach konsumenta: jeżeli sklep nie odpowiedział w ciągu 14 dni od otrzymania reklamacji, uznaje się ją za zasadną. Możesz powołać się na to milczące uznanie i żądać spełnienia roszczenia.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-10">
          Wyślij kolejne pismo z powołaniem na art. 7a, wskazując datę pierwotnej reklamacji i brak odpowiedzi. Jeśli sklep nadal odmawia, złóż skargę do Rzecznika Praw Konsumentów lub UOKiK.
        </p>

        <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 rounded-2xl p-8 text-center shadow-lg shadow-indigo-100">
          <h2 className="text-xl font-bold text-white mb-3">Nie chcesz pisać tego sam?</h2>
          <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
            Wypełnij formularz w 3 minuty — wygenerujemy profesjonalne pismo reklamacyjne<br className="hidden sm:block" />
            z właściwymi artykułami ustaw, gotowe do wysłania jako PDF.
          </p>
          <Link
            href="/zamow"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-indigo-700 font-bold px-8 py-3.5 rounded-xl transition-colors text-sm shadow-sm"
          >
            Wygeneruj pismo — 29 zł
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <p className="text-indigo-200 text-xs mt-3">Jednorazowa opłata · PDF na maila w 5 minut · Odwołanie gratis jeśli nie pomoże</p>
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-100 py-8 px-6 text-center text-xs text-gray-400">
        <p className="mb-2">© 2026 writeback.pl</p>
        <p className="mb-3 text-gray-400 leading-relaxed max-w-xl mx-auto">Pisma generowane przez writeback.pl mają charakter informacyjny i pomocniczy. Nie stanowią porady prawnej ani zastępstwa adwokata lub radcy prawnego. W sprawach złożonych zalecamy konsultację z prawnikiem lub rzecznikiem praw konsumentów.</p>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link href="/" className="hover:text-gray-600 transition-colors">Strona główna</Link>
          <span>·</span>
          <Link href="/wzor-reklamacji" className="hover:text-gray-600 transition-colors">Wzór reklamacji</Link>
          <span>·</span>
          <Link href="/reklamacja-allegro" className="hover:text-gray-600 transition-colors">Reklamacja Allegro</Link>
          <span>·</span>
          <Link href="/regulamin" className="hover:text-gray-600 transition-colors">Regulamin</Link>
          <span>·</span>
          <Link href="/polityka" className="hover:text-gray-600 transition-colors">Polityka prywatności</Link>
        </p>
      </footer>
    </div>
  );
}
