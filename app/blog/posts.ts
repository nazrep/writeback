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
  titleEn?: string;
  descriptionEn?: string;
  categoryEn?: string;
  readTimeEn?: string;
  faqEn?: FAQ[];
}

export const POSTS: Post[] = [
  {
    slug: "reklamacja-odrzucona",
    title: "Reklamacja odrzucona — co zrobić dalej? [Poradnik 2026]",
    description: "Sklep nie uznał reklamacji? Masz prawo do odwołania. Dowiedz się jak obalić odmowę z powołaniem na art. 43c ust. 1 UPK — domniemanie wady, ekspertyza na koszt sklepu, zwrot po nieskutecznej wymianie.",
    date: "2026-06-07",
    readTime: "6 min",
    category: "Reklamacja",
    faq: [
      {
        q: "Ile mam czasu na odwołanie od odmowy reklamacji?",
        a: "Przepisy nie przewidują osobnego terminu na odwołanie — liczy się 2-letni termin odpowiedzialności sprzedawcy od daty dostarczenia towaru (art. 43c ust. 1 UPK). Im szybciej wyślesz odwołanie, tym lepiej — dowody są świeższe i łatwiej udowodnić chronologię zdarzeń.",
      },
      {
        q: "Sklep twierdzi że wada wynika z mojego użytkowania. Co robić?",
        a: "Sklep musi to udowodnić ekspertyzą techniczną na własny koszt — samo stwierdzenie w mailu nie wystarczy. Przez pierwsze 2 lata od dostarczenia towaru obowiązuje domniemanie (art. 43c ust. 1 UPK), że niezgodność istniała już w chwili dostarczenia. To sprzedawca musi obalić to domniemanie, nie Ty musisz dowodzić że towar był wadliwy.",
      },
      {
        q: "Wymienili towar reklamacyjnie, ale po kilku miesiącach ta sama wada wróciła. Co mi przysługuje?",
        a: "Zgodnie z art. 43e ust. 1 ustawy o prawach konsumenta, gdy naprawa lub wymiana okazała się nieskuteczna, masz prawo żądać obniżenia ceny lub odstąpienia od umowy (zwrotu pieniędzy). Nie musisz zgadzać się na kolejną wymianę.",
      },
      {
        q: "Czy mogę złożyć skargę do UOKiK na sklep który odrzuca reklamacje?",
        a: "Tak. Jeśli sklep systematycznie odrzuca reklamacje bez podstawy prawnej, możesz złożyć zawiadomienie do UOKiK o podejrzeniu stosowania praktyk naruszających zbiorowe interesy konsumentów. UOKiK może wszcząć postępowanie i nałożyć karę finansową na przedsiębiorcę.",
      },
      {
        q: "Czy odwołanie od odmowy reklamacji muszę wysłać listem poleconym?",
        a: "Nie jest to wymagane przepisami, ale zalecane. List polecony za potwierdzeniem odbioru daje Ci dowód że pismo dotarło i kiedy — co jest ważne jeśli sprawa trafi do sądu. Email z potwierdzeniem odczytu to minimum, list polecony to większe bezpieczeństwo.",
      },
    ],
  },
  {
    slug: "reklamacja-sklep-internetowy",
    title: "Jak napisać skuteczną reklamację do sklepu internetowego (wzór 2026)",
    description: "Krok po kroku: jak napisać reklamację do sklepu internetowego z powołaniem na art. 43b ustawy o prawach konsumenta. Sklep ma 14 dni na odpowiedź, brak odpowiedzi to uznanie reklamacji.",
    date: "2026-06-01",
    readTime: "5 min",
    category: "Sklep internetowy",
    titleEn: "How to File an Effective Complaint to an Online Store (Template 2026)",
    descriptionEn: "Step-by-step: how to write a complaint to an online store citing Art. 43b of the Consumer Rights Act. The store has 14 days to respond; silence means the complaint is accepted.",
    categoryEn: "Online Store",
    readTimeEn: "5 min",
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
        a: "Nie. Bon to propozycja sklepu, nie Twój obowiązek. Jeśli żądasz zwrotu pieniędzy na podstawie art. 43e ust. 1, sklep musi przelać środki na konto. Bon możesz przyjąć, ale nie musisz.",
      },
      {
        q: "Czego mogę żądać w reklamacji: naprawy, wymiany czy zwrotu?",
        a: "W pierwszej kolejności możesz wybrać między naprawą a wymianą (art. 43d ust. 1). Jeśli naprawa lub wymiana okazała się nieskuteczna albo sklep odmówił obu, możesz żądać obniżenia ceny lub pełnego zwrotu pieniędzy (art. 43e ust. 1 ustawy o prawach konsumenta).",
      },
    ],
    faqEn: [
      {
        q: "Can I complain about a product more than a year after purchase?",
        a: "Yes. The complaint period is 2 years from the date you received the goods, not one year. Throughout this period it is presumed that the defect existed at the time of purchase (Art. 43c §1 of the Consumer Rights Act).",
      },
      {
        q: "The store says it only accepts manufacturer warranty claims. Is that true?",
        a: "No. The manufacturer's warranty and rights under the Consumer Rights Act are two separate mechanisms. The store as seller is liable for non-conformity for 2 years under Art. 43b, regardless of the manufacturer's warranty.",
      },
      {
        q: "How many days does the store have to respond to a complaint?",
        a: "14 calendar days. If the store does not respond within this period, the complaint is deemed accepted by force of law (Art. 7a of the Consumer Rights Act).",
      },
      {
        q: "The store offered a voucher instead of a refund. Do I have to accept it?",
        a: "No. A voucher is the store's proposal, not your obligation. If you demand a refund under Art. 43e §1, the store must transfer the funds to your account. You may accept the voucher if you wish, but you do not have to.",
      },
      {
        q: "What can I demand in a complaint: repair, replacement or refund?",
        a: "You may first choose between repair and replacement (Art. 43d §1). If repair or replacement proved ineffective or the store refused both, you may demand a price reduction or full refund (Art. 43e §1 of the Consumer Rights Act).",
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
    titleEn: "Complaint on Allegro: What to Do When the Seller Refuses (2026)",
    descriptionEn: "Did an Allegro seller reject your complaint? Find out your rights as a consumer and how to write a letter that forces a response within 14 days.",
    categoryEn: "Allegro",
    readTimeEn: "6 min",
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
    titleEn: "Bank Refuses Refund: Your Rights and How to Enforce Them",
    descriptionEn: "Unauthorised transaction, incorrect charge or refused refund? The bank must return the money by end of next business day (Art. 46 of the Payment Services Act). How to write an effective letter.",
    categoryEn: "Bank",
    readTimeEn: "5 min",
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
    titleEn: "How to Cancel a Subscription Contract Without Penalty: Template 2026",
    descriptionEn: "Operator, gym, streaming platform refusing to cancel or threatening a penalty? You have the right to terminate any open-ended contract. Art. 365(1) CC and Art. 385(3) CC on your side.",
    categoryEn: "Contract Termination",
    readTimeEn: "6 min",
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
  {
    slug: "reklamacja-media-expert",
    title: "Reklamacja w Media Expert: jak skutecznie dochodzić praw (2026)",
    description: "Sprzęt z Media Expert się zepsuł? Masz 2 lata na reklamację z tytułu niezgodności z umową — niezależnie od gwarancji producenta. Jak napisać pismo, które sklep musi rozpatrzyć w 14 dniach.",
    date: "2026-05-19",
    readTime: "5 min",
    category: "Elektronika",
    titleEn: "Complaint at Media Expert: How to Enforce Your Rights (2026)",
    descriptionEn: "Equipment from Media Expert broke down? You have 2 years to claim non-conformity — regardless of the manufacturer's warranty. How to write a letter the store must process within 14 days.",
    categoryEn: "Electronics",
    readTimeEn: "5 min",
    faq: [
      { q: "Czy reklamacja w Media Expert wymaga paragonu?", a: "Nie. Dowodem zakupu może być potwierdzenie zamówienia z konta Media Expert, wyciąg z karty czy wydruk z aplikacji. Paragon ułatwia sprawę, ale nie jest wymagany przez przepisy." },
      { q: "Media Expert odsyła mnie do serwisu producenta. Co zrobić?", a: "Możesz odmówić. Masz prawo złożyć reklamację bezpośrednio do sklepu na podstawie art. 43b UPK. Serwis producenta to gwarancja — możesz z niej skorzystać, ale nie musisz rezygnować z praw ustawowych." },
      { q: "Ile czasu ma Media Expert na naprawę lub wymianę?", a: "Ustawa nie podaje konkretnej liczby dni na naprawę, ale musi to być 'rozsądny czas i bez nadmiernych niedogodności'. W praktyce 14–21 dni to akceptowalny czas. Jeśli naprawa przeciąga się bez uzasadnienia, możesz żądać wymiany lub zwrotu." },
      { q: "Kupiłem sprzęt na raty w Media Expert. Czy mogę reklamować?", a: "Tak. Zakup na raty nie ogranicza Twoich praw konsumenckich. Reklamacja trafia do Media Expert jako sprzedawcy, nie do firmy finansującej raty." },
    ],
    faqEn: [
      { q: "Does a complaint at Media Expert require a receipt?", a: "No. Proof of purchase can be an order confirmation from your Media Expert account, a card statement or an app printout. A receipt makes things easier but is not legally required." },
      { q: "Media Expert is sending me to the manufacturer's service centre. What should I do?", a: "You can refuse. You have the right to file a complaint directly with the store under Art. 43b CRA. The manufacturer's service centre relates to the warranty — you may use it, but you do not have to give up your statutory rights." },
      { q: "How long does Media Expert have to repair or replace the item?", a: "The law does not specify an exact number of days, but it must be a 'reasonable time without undue inconvenience'. In practice 14–21 days is acceptable. If the repair drags on without justification, you can demand replacement or a refund." },
      { q: "I bought equipment on an instalment plan. Can I still complain?", a: "Yes. Buying on instalments does not limit your consumer rights. The complaint goes to Media Expert as the seller, not to the financing company." },
    ],
  },
  {
    slug: "reklamacja-rtv-euro-agd",
    title: "Reklamacja w RTV Euro AGD: prawa konsumenta i wzór pisma (2026)",
    description: "Sprzęt AGD lub elektronika z RTV Euro AGD nie działa prawidłowo? Przysługują Ci 2 lata ochrony ustawowej. Dowiedz się jak napisać skuteczną reklamację i czego możesz żądać od sklepu.",
    date: "2026-05-12",
    readTime: "5 min",
    category: "AGD / Elektronika",
    titleEn: "Complaint at RTV Euro AGD: Consumer Rights and Letter Template (2026)",
    descriptionEn: "Home appliance or electronics from RTV Euro AGD not working properly? You have 2 years of statutory protection. Learn how to write an effective complaint and what you can demand from the store.",
    categoryEn: "AGD / Electronics",
    readTimeEn: "5 min",
    faq: [
      { q: "Kupiłem pralkę w RTV Euro AGD rok temu i się zepsuła. Czy mam jeszcze czas na reklamację?", a: "Tak. Masz 2 lata od daty otrzymania towaru. Rok od zakupu to nadal w granicach ustawowego terminu. Złóż reklamację do RTV Euro AGD powołując się na art. 43b ustawy o prawach konsumenta." },
      { q: "RTV Euro AGD żąda ekspertyzy na mój koszt przed przyjęciem reklamacji. Czy to legalne?", a: "Nie. Sklep nie może wymagać od Ciebie pokrycia kosztów ekspertyzy przed rozpatrzeniem reklamacji. Jeśli sklep chce przeprowadzić ekspertyzę, robi to na własny koszt. Ty nie musisz nic płacić z góry." },
      { q: "Czy muszę dostarczyć pralkę do sklepu podczas reklamacji?", a: "Nie. Dla dużego AGD sklep jest zobowiązany zorganizować odbiór wadliwego sprzętu na własny koszt i bez nadmiernych niedogodności dla Ciebie. Nie musisz dowozić pralki ani lodówki do sklepu." },
      { q: "RTV Euro AGD zaproponowało bon na zakupy zamiast zwrotu. Czy muszę przyjąć?", a: "Nie. Jeśli żądasz zwrotu pieniędzy na podstawie art. 43e ust. 1 UPK, sklep musi przelać środki na konto. Bon to dobrowolna propozycja handlowa." },
    ],
    faqEn: [
      { q: "I bought a washing machine at RTV Euro AGD a year ago and it broke. Do I still have time to complain?", a: "Yes. You have 2 years from the date you received the goods. One year from purchase is still within the statutory period. File a complaint with RTV Euro AGD citing Art. 43b of the Consumer Rights Act." },
      { q: "RTV Euro AGD demands an expert assessment at my cost before accepting the complaint. Is this legal?", a: "No. The store cannot require you to cover the cost of an assessment before processing a complaint. If the store wants an assessment, it commissions one at its own expense. You do not pay anything upfront." },
      { q: "Do I have to bring the washing machine to the store during the complaint?", a: "No. For large appliances the store must arrange collection of the faulty item at its own cost and without undue inconvenience to you. You do not have to deliver a washing machine or fridge to the store." },
      { q: "RTV Euro AGD offered a shopping voucher instead of a refund. Do I have to accept it?", a: "No. If you demand a cash refund under Art. 43e §1 CRA, the store must transfer the funds to your account. A voucher is a voluntary commercial offer." },
    ],
  },
  {
    slug: "reklamacja-telefonu",
    title: "Reklamacja telefonu: jak odzyskać pieniądze za wadliwy smartfon (2026)",
    description: "Smartfon się zepsuł, bateria nie wytrzymuje lub wyświetlacz ma defekt? Masz 2 lata na reklamację do sklepu lub operatora. Krok po kroku jak napisać skuteczne pismo i czego żądać.",
    date: "2026-05-26",
    readTime: "6 min",
    category: "Telefon / Operator",
    titleEn: "Phone Complaint: How to Get a Refund for a Faulty Smartphone (2026)",
    descriptionEn: "Smartphone broke, battery drains fast, or display has a defect? You have 2 years to complain to the store or operator. Step by step: how to write an effective letter and what to demand.",
    categoryEn: "Phone / Operator",
    readTimeEn: "6 min",
    faq: [
      { q: "Bateria w telefonie szybko się rozładowuje. Czy to podstawa do reklamacji?", a: "Tak, jeśli degradacja nastąpiła znacznie szybciej niż powinna. Producenci deklarują zazwyczaj 80% pojemności po 500 cyklach ładowania. Jeśli Twoja bateria traci pojemność zdecydowanie szybciej w ciągu roku — masz podstawę do reklamacji z tytułu wady." },
      { q: "Sklep twierdzi że telefon był mokry i dlatego nie przyjmuje reklamacji. Co zrobić?", a: "Sklep musi udowodnić że używałeś telefonu w warunkach niezgodnych z instrukcją. Jeśli telefon jest reklamowany jako wodoodporny (IP67/IP68) a uszkodzył się w normalnych warunkach — masz silną pozycję. Zażądaj pisemnego uzasadnienia odmowy z powołaniem na ekspertyzę." },
      { q: "Kupiłem telefon na abonament. Do kogo składam reklamację?", a: "Do operatora jako sprzedawcy. Operator odpowiada za niezgodność towaru z umową przez 2 lata na podstawie art. 43b UPK, niezależnie od tego, że telefon był dołączony do abonamentu." },
      { q: "Ekran telefonu pęknął sam bez uderzenia. Czy mogę reklamować?", a: "Tak. Samoczynne pękanie ekranu (szczególnie wyświetlaczy OLED) to znany defekt fabryczny. Sklep może próbować twierdzić że doszło do uderzenia, ale musi to udowodnić ekspertyzą. Bez ekspertyzy obowiązuje domniemanie wady z art. 43c ust. 1 UPK." },
    ],
    faqEn: [
      { q: "My phone battery drains quickly. Is this grounds for a complaint?", a: "Yes, if the degradation happened much faster than it should. Manufacturers typically declare 80% capacity after 500 charging cycles. If your battery loses capacity significantly faster within a year — you have grounds for a defect complaint." },
      { q: "The store claims the phone got wet and refuses the complaint. What should I do?", a: "The store must prove you used the phone in conditions contrary to the manual. If the phone is advertised as waterproof (IP67/IP68) and was damaged in normal conditions — you have a strong position. Demand a written rejection citing a technical expert report." },
      { q: "I bought the phone on a mobile plan. Who do I complain to?", a: "To the operator as the seller. The operator is liable for non-conformity for 2 years under Art. 43b CRA, regardless of the phone being bundled with the plan." },
      { q: "My phone screen cracked on its own without impact. Can I complain?", a: "Yes. Spontaneous screen cracking (especially OLED displays) is a known factory defect. The store may claim impact, but must prove it with an expert report. Without a report, the presumption of defect under Art. 43c §1 CRA applies." },
    ],
  },
  {
    slug: "zwrot-od-kuriera",
    title: "Uszkodzona paczka od kuriera: jak uzyskać odszkodowanie (2026)",
    description: "InPost, DPD, DHL uszkodził Twoją paczkę? Masz prawo do odszkodowania z Prawa pocztowego i Prawa przewozowego. Jak sporządzić protokół szkody i złożyć skuteczną reklamację.",
    date: "2026-05-05",
    readTime: "5 min",
    category: "Kurier",
    titleEn: "Damaged Parcel from the Courier: How to Get Compensation (2026)",
    descriptionEn: "InPost, DPD, DHL damaged your parcel? You are entitled to compensation under the Postal Law and Transport Law. How to draw up a damage report and file an effective complaint.",
    categoryEn: "Courier",
    readTimeEn: "5 min",
    faq: [
      { q: "Ile mam czasu na zgłoszenie szkody w paczce od kuriera?", a: "Jeśli szkodę stwierdzono przy odbiorze — sporządź protokół od razu z kurierem. Jeśli odkryłeś szkodę po odbiorze — masz 7 dni na zgłoszenie reklamacji (art. 76 ust. 4 Prawa przewozowego). Po tym terminie roszczenie wygasa." },
      { q: "Kurier odmówił sporządzenia protokołu szkody. Co zrobić?", a: "Zaznacz własnoręcznie zastrzeżenia na liście przewozowym i sfotografuj. Zrób zdjęcia opakowania i zawartości. Następnie złóż reklamację pisemnie — brak protokołu nie pozbawia Cię prawa do odszkodowania, ale utrudnia postępowanie." },
      { q: "Paczka zaginęła w InPost. Co mi przysługuje?", a: "Odszkodowanie do wysokości zadeklarowanej wartości przesyłki lub do limitu ustawowego. Dla paczek bez deklaracji wartości limit wynika z regulaminu i Prawa pocztowego. Złóż reklamację przez aplikację InPost lub formularz online w ciągu 12 miesięcy od nadania." },
      { q: "Sklep mówi że nie odpowiada za uszkodzenia w transporcie. Czy muszę walczyć z kurierem?", a: "Nie. Jeśli towar dotarł do Ciebie uszkodzony, możesz złożyć reklamację do sklepu (sprzedawca odpowiada za niezgodność towaru z umową) LUB do kuriera. Kwestia rozliczeń między sklepem a kurierem to ich sprawa — nie musisz w tym uczestniczyć." },
    ],
    faqEn: [
      { q: "How long do I have to report damage in a parcel from the courier?", a: "If the damage was found at the time of delivery — draw up a damage report immediately with the courier. If you discovered it after accepting the parcel — you have 7 days to file a complaint (Art. 76 §1 of the Transport Law). After this deadline, claiming compensation becomes significantly harder." },
      { q: "The courier refused to draw up a damage report. What should I do?", a: "Note your objections manually on the waybill and photograph it. Take photos of the packaging and contents. Then file a complaint in writing — the absence of a report does not remove your right to compensation, but it makes the process harder." },
      { q: "My parcel was lost by InPost. What am I entitled to?", a: "Compensation up to the declared value of the shipment or the statutory limit. For parcels without a declared value, the limit follows the terms of service and Postal Law. File a complaint via the InPost app or online form within 12 months of sending." },
      { q: "The store says it is not responsible for damage in transit. Do I have to fight the courier myself?", a: "No. If the goods arrived damaged, you can file a complaint with the store (the seller is liable for non-conformity) OR with the courier. The settlement between the store and the courier is their matter — you do not have to be involved." },
    ],
  },
  {
    slug: "wypowiedzenie-silownia",
    title: "Wypowiedzenie umowy z siłownią: jak odejść bez kary (2026)",
    description: "Siłownia nie chce rozwiązać umowy albo grozi karą za wcześniejsze zakończenie? Kary umowne za wypowiedzenie umowy bezterminowej są nielegalne. Art. 365¹ KC i art. 385³ KC po Twojej stronie.",
    date: "2026-04-28",
    readTime: "5 min",
    category: "Wypowiedzenie umowy",
    titleEn: "Gym Contract Cancellation: How to Leave Without a Penalty (2026)",
    descriptionEn: "The gym refuses to cancel your membership or threatens a penalty for early termination? Cancellation penalties for open-ended contracts are illegal. Art. 365¹ CC and Art. 385³ CC on your side.",
    categoryEn: "Contract Termination",
    readTimeEn: "5 min",
    faq: [
      { q: "Mam umowę z siłownią na czas nieokreślony. Kiedy mogę ją wypowiedzieć?", a: "W każdej chwili z zachowaniem okresu wypowiedzenia podanego w umowie. Jeśli umowa nie podaje okresu wypowiedzenia — zgodnie z art. 365¹ KC możesz wypowiedzieć ją niezwłocznie. Siłownia nie może żądać kary za skorzystanie z ustawowego prawa." },
      { q: "Mam roczną umowę z siłownią i chcę odejść po 4 miesiącach. Co mogę zrobić?", a: "Sprawdź czy siłownia zmieniała cennik lub regulamin od zawarcia umowy — jeśli tak, masz prawo do natychmiastowego wypowiedzenia bez konsekwencji (art. 384¹ KC). Możesz też sprawdzić czy w umowie nie ma klauzul abuzywnych wpisanych do rejestru UOKiK." },
      { q: "Siłownia pobierała opłaty z mojej karty po złożeniu wypowiedzenia. Co zrobić?", a: "Cofnij upoważnienie do pobierania płatności w swoim banku. Wezwij siłownię pisemnie do zwrotu pobranych środków. Jeśli nie reaguje — złóż wniosek o chargeback w banku lub skargę do UOKiK." },
      { q: "Czy zmiana cennika siłowni podczas umowy daje mi prawo do jej wypowiedzenia?", a: "Tak. Jednostronna zmiana warunków umowy lub cennika przez siłownię daje Ci prawo do natychmiastowego wypowiedzenia umowy bez żadnych konsekwencji finansowych na podstawie art. 384¹ Kodeksu cywilnego." },
    ],
    faqEn: [
      { q: "I have an open-ended gym contract. When can I cancel it?", a: "At any time, observing the notice period stated in the contract. If the contract specifies no notice period — under Art. 365¹ CC you can cancel immediately. The gym cannot demand a penalty for exercising a statutory right." },
      { q: "I have a one-year gym contract and want to leave after 4 months. What can I do?", a: "Check whether the gym changed its prices or terms since you signed — if so, you have the right to immediate termination without consequences (Art. 384¹ CC). Also check whether the contract contains abusive clauses listed in the UOKiK register." },
      { q: "The gym kept charging my card after I submitted my cancellation notice. What should I do?", a: "Revoke the direct debit authorisation with your bank. Send the gym a written demand for a refund of the amounts taken. If there is no response — apply for a chargeback with your bank or file a complaint with UOKiK." },
      { q: "Does a price increase by the gym during my contract give me the right to cancel it?", a: "Yes. A unilateral change of contract terms or prices by the gym gives you the right to immediate termination of the contract without any financial consequences under Art. 384¹ of the Civil Code." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug);
}
