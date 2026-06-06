export interface FAQ {
  q: string;
  a: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  faq?: FAQ[];
}

export const POSTS: Post[] = [
  {
    slug: "reklamacja-sklep-internetowy",
    title: "Jak napisać skuteczną reklamację do sklepu internetowego (wzór 2026)",
    description: "Krok po kroku: jak napisać reklamację do sklepu internetowego z powołaniem na art. 43b ustawy o prawach konsumenta. Sklep ma 14 dni na odpowiedź, brak odpowiedzi to uznanie reklamacji.",
    date: "2026-06-01",
    readTime: "5 min",
    category: "Sklep internetowy",
    faq: [
      {
        q: "Czy mogę reklamować towar po roku od zakupu?",
        a: "Tak. Termin na reklamację to 2 lata od daty otrzymania towaru, nie rok. Przez cały ten czas obowiązuje domniemanie, że wada istniała przy zakupie (art. 43c ust. 1 ustawy o prawach konsumenta).",
      },
      {
        q: "Sklep mówi że przyjmuje tylko gwarancję producenta. Czy to prawda?",
        a: "Nie. Gwarancja producenta i prawa z ustawy o prawach konsumenta to dwa osobne mechanizmy. Sklep jako sprzedawca odpowiada za niezgodność towaru z umową przez 2 lata na podstawie art. 43b, niezależnie od gwarancji producenta.",
      },
      {
        q: "Ile dni ma sklep na odpowiedź na reklamację?",
        a: "14 dni kalendarzowych. Jeśli sklep nie odpowie w tym terminie, reklamacja jest uznana za zasadną z mocy prawa (art. 7a ustawy o prawach konsumenta).",
      },
      {
        q: "Sklep zaproponował bon zamiast zwrotu pieniędzy. Czy muszę go przyjąć?",
        a: "Nie. Bon to propozycja sklepu, nie Twój obowiązek. Jeśli żądasz zwrotu pieniędzy na podstawie art. 43d, sklep musi przelać środki na konto. Bon możesz przyjąć, ale nie musisz.",
      },
      {
        q: "Czego mogę żądać w reklamacji: naprawy, wymiany czy zwrotu?",
        a: "W pierwszej kolejności możesz wybrać między naprawą a wymianą. Jeśli naprawa lub wymiana okazała się nieskuteczna albo sklep odmówił obu, możesz żądać obniżenia ceny lub pełnego zwrotu pieniędzy (art. 43c i 43d ustawy o prawach konsumenta).",
      },
    ],
  },
  {
    slug: "reklamacja-allegro",
    title: "Reklamacja na Allegro: co zrobić gdy sprzedawca odmawia (2026)",
    description: "Sprzedawca na Allegro odrzucił Twoją reklamację? Dowiedz się jakie masz prawa jako konsument i jak napisać pismo które zmusi go do odpowiedzi w 14 dniach.",
    date: "2026-06-02",
    readTime: "6 min",
    category: "Allegro",
    faq: [
      {
        q: "Czy mogę reklamować towar kupiony od osoby prywatnej na Allegro?",
        a: "Ustawa o prawach konsumenta dotyczy tylko zakupów od przedsiębiorców. Przy zakupie od osoby prywatnej (bez NIP na profilu) możesz powołać się na rękojmię z Kodeksu cywilnego, ale masz mniejszą ochronę: termin to rok, nie dwa lata.",
      },
      {
        q: "Ile czasu ma sprzedawca na Allegro na odpowiedź na reklamację?",
        a: "14 dni kalendarzowych. Brak odpowiedzi w tym terminie to uznanie reklamacji za zasadną z mocy art. 7a ustawy o prawach konsumenta.",
      },
      {
        q: "Czy muszę odesłać towar zanim sprzedawca uzna reklamację?",
        a: "Nie. Nie odsyłaj towaru przed otrzymaniem decyzji o uznaniu reklamacji. Koszty ewentualnego odesłania w celu naprawy lub wymiany ponosi sprzedawca.",
      },
      {
        q: "Sprzedawca twierdzi że towar był sprawny przy wysyłce. Co zrobić?",
        a: "To niewystarczający argument. Zgodnie z art. 43c ust. 1 ustawy o prawach konsumenta, przez 2 lata od dostarczenia towaru obowiązuje domniemanie że wada istniała w chwili dostarczenia. Sprzedawca musi obalić to domniemanie ekspertyzą, nie słownym twierdzeniem.",
      },
      {
        q: "Sprzedawca zaproponował voucher zamiast zwrotu. Czy muszę go przyjąć?",
        a: "Nie. Jeśli żądasz zwrotu pieniędzy, sprzedawca musi przelać środki. Voucher jest propozycją handlową, nie obowiązkiem konsumenta.",
      },
    ],
  },
  {
    slug: "bank-odmawia-zwrotu",
    title: "Bank odmawia zwrotu pieniędzy: Twoje prawa i jak je egzekwować",
    description: "Nieautoryzowana transakcja, błędny przelew lub naliczona opłata? Bank ma obowiązek zwrotu do końca następnego dnia roboczego (art. 46 ustawy o usługach płatniczych). Jak napisać skuteczne pismo.",
    date: "2026-06-03",
    readTime: "5 min",
    category: "Bank",
    faq: [
      {
        q: "Ile czasu ma bank na zwrot pieniędzy po zgłoszeniu nieautoryzowanej transakcji?",
        a: "Bank musi zwrócić pieniądze niezwłocznie, nie później niż do końca następnego dnia roboczego po dniu zgłoszenia (art. 46 ust. 1 ustawy o usługach płatniczych). Bank może potem prowadzić dochodzenie, ale środki muszą wrócić najpierw.",
      },
      {
        q: "Bank twierdzi że logowanie było prawidłowe i nie zwróci pieniędzy. Czy to zgodne z prawem?",
        a: "Nie. Art. 45 ust. 2 ustawy o usługach płatniczych stanowi wprost, że samo wykazanie zarejestrowanego użycia instrumentu płatniczego nie wystarcza do udowodnienia że transakcja była autoryzowana. Ciężar dowodu spoczywa na banku.",
      },
      {
        q: "Czy bank może odmówić zwrotu jeśli sam wpisałem kod BLIK lub dane karty?",
        a: "Jeśli padłeś ofiarą oszustwa i działałeś pod wpływem manipulacji (np. podszywanie się pod znajomego), bank musi udowodnić rażące niedbalstwo z Twojej strony. Samo wpisanie kodu pod wpływem oszustwa to co do zasady nie jest rażące niedbalstwo.",
      },
      {
        q: "Kiedy bank może zgodnie z prawem odmówić zwrotu?",
        a: "Bank może odmówić gdy udowodni że działałeś umyślnie (sam zleciłeś transakcję) lub dopuściłeś się rażącego niedbalstwa, na przykład zapisałeś PIN razem z kartą lub przekazałeś dane logowania osobie trzeciej świadomie.",
      },
      {
        q: "Co zrobić jeśli bank nadal odmawia po złożeniu pisemnej reklamacji?",
        a: "Złóż skargę do Rzecznika Finansowego (rf.gov.pl). Banki bardzo poważnie traktują interwencje RF. Postępowanie jest bezpłatne i skuteczne. Możesz też złożyć skargę do KNF lub rozważyć postępowanie przed sądem polubownym przy KNF.",
      },
    ],
  },
  {
    slug: "wypowiedzenie-umowy-abonamentowej",
    title: "Jak wypowiedzieć umowę abonamentową bez kary: wzór pisma 2026",
    description: "Operator, siłownia, platforma streamingowa nie chce rozwiązać umowy lub żąda kary? Masz prawo wypowiedzieć każdą umowę na czas nieokreślony. Art. 365(1) KC i art. 3853 KC po Twojej stronie.",
    date: "2026-06-06",
    readTime: "6 min",
    category: "Wypowiedzenie umowy",
    faq: [
      {
        q: "Czy można wypowiedzieć umowę abonamentową bez kary?",
        a: "Tak, jeśli umowa jest na czas nieokreślony. Art. 365¹ Kodeksu cywilnego daje Ci prawo do wypowiedzenia każdej umowy bezterminowej z zachowaniem okresu wypowiedzenia. Kara umowna za rezygnację z umowy bezterminowej jest najczęściej nieważna jako klauzula abuzywna (art. 385³ pkt 17 KC).",
      },
      {
        q: "Siłownia żąda kary za wcześniejsze zakończenie umowy. Co zrobić?",
        a: "Sprawdź czy Twoja umowa jest na czas nieokreślony lub czy minął już minimalny okres zobowiązania. Jeśli tak, kara umowna to klauzula niedozwolona z art. 385³ pkt 17 Kodeksu cywilnego. Zakwestionuj ją w piśmie i złóż skargę do UOKiK jeśli siłownia nalicza karę.",
      },
      {
        q: "Operator telefonii nie chce rozwiązać umowy. Jaki jest termin wypowiedzenia?",
        a: "Dla umów telekomunikacyjnych na czas nieokreślony Prawo Komunikacji Elektronicznej przewiduje maksymalnie 30-dniowy okres wypowiedzenia dla konsumentów. Powołaj się na art. 365¹ Kodeksu cywilnego i złóż wypowiedzenie pisemnie.",
      },
      {
        q: "Czy mogę odstąpić od umowy abonamentowej zawartej przez internet bez kary?",
        a: "Tak, jeśli umowę zawarłeś przez internet lub telefon, masz 14 dni na odstąpienie bez podania przyczyny na podstawie art. 27 ustawy o prawach konsumenta. Dotyczy to nowych umów z operatorami, siłowniami i platformami cyfrowymi.",
      },
      {
        q: "Firma podniosła cenę abonamentu. Czy mogę teraz wypowiedzieć umowę bez konsekwencji?",
        a: "Tak. Zmiana cennika lub warunków przez firmę daje Ci prawo do natychmiastowego wypowiedzenia umowy bez żadnych konsekwencji na podstawie art. 384¹ Kodeksu cywilnego. Firma ma obowiązek poinformować Cię o tej możliwości przy zmianie warunków.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug);
}
