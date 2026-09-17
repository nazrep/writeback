import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Jedziesz pociągiem PKP Intercity na ważne spotkanie, a na tablicy odjazdów zamiast godziny przyjazdu widzisz rosnące opóźnienie — najpierw 20 minut, potem 50, w końcu ponad 2 godziny. Na miejscu docelowym pytasz obsługę pociągu o rekompensatę, a słyszysz: „proszę złożyć reklamację, ale nic nie obiecujemy, to nie od nas zależało". Tymczasem to, czy opóźnienie „od kogoś zależało", w ogóle nie ma znaczenia dla Twojego prawa do rekompensaty — a jej wysokość jest z góry ustalona w przepisach unijnych i nie zależy od dobrej woli kasjerki czy konduktora.</p>

      <h2>Podstawa prawna: to nie jest łaska przewoźnika</h2>
      <p>Prawa pasażerów kolei w całej Unii Europejskiej — w tym w Polsce, niezależnie od przewoźnika (PKP Intercity, Polregio, koleje regionalne i aglomeracyjne) — reguluje <strong>rozporządzenie Parlamentu Europejskiego i Rady (UE) 2021/782</strong> z 29 kwietnia 2021 r., obowiązujące od 7 czerwca 2023 r. Dodatkowo samą procedurę składania i rozpatrywania reklamacji określa polska <strong>ustawa z 15 listopada 1984 r. Prawo przewozowe</strong>. To dwa różne, uzupełniające się źródła — rozporządzenie mówi, ile Ci się należy, a Prawo przewozowe, jak to formalnie wyegzekwować.</p>
      <p>Kluczowe: rekompensata za opóźnienie nie jest gestem dobrej woli przewoźnika ani nagrodą za „uciążliwość" — to roszczenie pieniężne, które powstaje automatycznie z mocy prawa w chwili, gdy pociąg spóźni się o określony czas. Przewoźnik nie musi się z Tobą „zgodzić", że coś Ci się należy — musi to wypłacić, chyba że wykaże jeden z wąskich, ustawowych wyjątków.</p>

      <h2>Ile Ci się należy za opóźniony pociąg</h2>
      <p>Zgodnie z art. 19 rozporządzenia 2021/782, licząc od rozkładowego czasu przyjazdu do stacji docelowej określonej na bilecie:</p>
      <ul>
        <li><strong>opóźnienie 60–119 minut</strong> — 25% ceny biletu jednorazowego</li>
        <li><strong>opóźnienie od 120 minut</strong> — 50% ceny biletu jednorazowego</li>
      </ul>
      <p>Przewoźnik może odmówić wypłaty, jeśli kwota rekompensaty nie przekracza równowartości 4 EUR — PKP Intercity ustaliło ten próg na <strong>16 zł</strong> w swoim regulaminie. To próg dotyczy wyliczonej kwoty rekompensaty, a nie ceny biletu — więc jeśli bilet kosztował 100 zł, a opóźnienie wyniosło 90 minut, rekompensata 25 zł już ten próg przekracza i musi zostać wypłacona.</p>
      <p>Ważny, często pomijany szczegół: opóźnienie liczy się względem <strong>miejsca docelowego całej podróży określonego w umowie przewozu</strong>, a nie pierwszego odcinka. Jeśli kupiłeś jeden bilet na trasę z przesiadką i przez opóźnienie pierwszego pociągu spóźniłeś się na cel podróży, liczy się łączne opóźnienie względem finalnego przystanku — nie to, czy pierwszy odcinek dojechał punktualnie.</p>

      <h2>Odwołany pociąg albo opóźnienie ponad godzinę — masz wybór</h2>
      <p>Art. 18 rozporządzenia daje Ci przy przewidywanym opóźnieniu 60 minut lub więcej (albo odwołaniu pociągu) prawo wyboru jednej z dwóch opcji:</p>
      <ul>
        <li><strong>zwrot pełnej ceny biletu</strong> za niezrealizowaną część podróży, a jeśli podróż straciła sens (tzw. bezcelowość podróży) — także bezpłatny powrót do miejsca wyjazdu najbliższym możliwym połączeniem</li>
        <li><strong>kontynuację podróży do celu</strong> — najbliższym możliwym połączeniem, porównywalną trasą, bez żadnych dodatkowych kosztów dla Ciebie, nawet jeśli oznacza to wyższą klasę pociągu lub inny środek transportu</li>
      </ul>
      <p>Uwaga na pułapkę: jeśli wybierzesz pełny zwrot biletu, bo z podróży zrezygnowałeś, tracisz prawo do procentowej rekompensaty za opóźnienie samej podróży — bo ta podróż formalnie się nie odbyła. Jeśli natomiast dojechałeś do celu, choćby z opóźnieniem i przesiadką na inny pociąg zorganizowaną przez przewoźnika, przysługuje Ci rekompensata z art. 19, a nie zwrot biletu.</p>

      <h2>Kiedy przewoźnik może odmówić</h2>
      <p>Przewoźnik może odmówić rekompensaty za opóźnienie tylko wtedy, gdy udowodni, że jego przyczyną były <strong>nadzwyczajne okoliczności niezwiązane z ruchem kolejowym</strong> — ekstremalne warunki pogodowe, poważne klęski żywiołowe lub kryzysy zdrowia publicznego, których mimo zachowania należytej staranności nie dało się uniknąć ani zapobiec ich skutkom. To bardzo wąska kategoria. Awaria techniczna lokomotywy, brak drużyny konduktorskiej, opóźnienie wynikające z remontu infrastruktury czy zwykłe zimowe opady śniegu w normalnych dla Polski granicach — to nie są nadzwyczajne okoliczności w rozumieniu przepisów, tylko zwykłe ryzyko prowadzenia działalności przewozowej, które obciąża przewoźnika, a nie pasażera.</p>

      <h2>Krok po kroku: jak złożyć wniosek o rekompensatę</h2>

      <h3>Krok 1: zbierz dowody, zanim wysiądziesz</h3>
      <p>Zrób zdjęcie tablicy odjazdów/przyjazdów z widocznym opóźnieniem albo zrzut ekranu z aplikacji przewoźnika lub portalu rozkładowego pokazujący rzeczywisty, a nie planowy czas przyjazdu. Zachowaj bilet — papierowy lub elektroniczny z numerem rezerwacji. Nie musisz prosić konduktora o pisemne potwierdzenie na miejscu — dane o opóźnieniach są rejestrowane przez przewoźnika i Urząd Transportu Kolejowego niezależnie od Twojego zgłoszenia, ale własna dokumentacja mocno przyspiesza rozpatrzenie sprawy.</p>

      <h3>Krok 2: złóż wniosek/reklamację u przewoźnika</h3>
      <p>Wypełnij formularz rekompensaty lub reklamacji dostępny na stronie przewoźnika (np. portalpasazera.pl dla PKP Intercity), wskazując numer pociągu, datę, relację, kwotę żądanej rekompensaty i numer konta do zwrotu. Zgodnie z art. 75 Prawa przewozowego masz na to <strong>rok od dnia zdarzenia</strong>, ale nie warto zwlekać — im szybciej złożysz wniosek, tym łatwiej o dokumentację.</p>

      <h3>Krok 3: pilnuj 30-dniowego terminu odpowiedzi</h3>
      <p>Przewoźnik ma <strong>30 dni</strong> od otrzymania kompletnej reklamacji na udzielenie odpowiedzi. Jeśli w tym terminie nie odpowie — reklamację uznaje się za uwzględnioną zgodnie z Twoim żądaniem, a przewoźnikowi pozostaje jedynie prawo do pobrania opłaty manipulacyjnej. Brak odpowiedzi to więc dobra wiadomość dla Ciebie, nie powód do rezygnacji.</p>

      <h3>Krok 4: przewoźnik odmawia — skarga do Rzecznika Praw Pasażera Kolei</h3>
      <p>Gdy przewoźnik odrzuci Twój wniosek albo zaniży kwotę bez konkretnego uzasadnienia, możesz złożyć skargę do <strong>Rzecznika Praw Pasażera Kolei</strong> działającego przy Urzędzie Transportu Kolejowego (pasazer.gov.pl) — to bezpłatne, pozasądowe postępowanie w sporach konsumenckich. Dopiero po wyczerpaniu drogi reklamacyjnej u przewoźnika możesz też skierować sprawę do sądu (art. 75 ust. 1 Prawa przewozowego wymaga wcześniejszej reklamacji jako warunku dochodzenia roszczeń na drodze sądowej). Ogólne zasady odwoływania się od odrzuconej reklamacji, niezależnie od branży, opisaliśmy w artykule <Link href="/blog/reklamacja-odrzucona" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">reklamacja odrzucona — co zrobić dalej</Link>.</p>

      <h2>Typowe wymówki przewoźników i jak na nie odpowiedzieć</h2>

      <h3>„To siła wyższa, warunki pogodowe, nic nie możemy zrobić"</h3>
      <p>To przewoźnik musi udowodnić, że warunki były na tyle ekstremalne, że nie dało się im zapobiec mimo zachowania należytej staranności — samo stwierdzenie „padał deszcz" czy „były opady śniegu typowe dla polskiej zimy" tego nie spełnia. Poproś o konkretne uzasadnienie z powołaniem na to, jakie dokładnie nadzwyczajne zjawisko wystąpiło.</p>

      <h3>„Awaria techniczna to nie nasza wina"</h3>
      <p>Awaria lokomotywy, taboru czy infrastruktury to zwykłe ryzyko działalności przewozowej, a nie nadzwyczajna okoliczność zwalniająca z rekompensaty — podobnie jak w lotnictwie, gdzie awaria techniczna też nie wyłącza odpowiedzialności przewoźnika.</p>

      <h3>„Kwota jest za mała, nie wypłacamy"</h3>
      <p>Próg 4 EUR (16 zł u PKP Intercity) dotyczy wyliczonej kwoty rekompensaty, a nie ceny biletu. Sam przelicz: 25% lub 50% ceny Twojego biletu — jeśli wynik przekracza 16 zł, przewoźnik nie ma podstaw do odmowy z powodu „zbyt małej kwoty".</p>

      <h3>„Straciłeś przesiadkę, ale to wina drugiego przewoźnika, nie nasza"</h3>
      <p>Jeśli podróż kupiłeś jako jeden bilet obejmujący całą trasę z przesiadką, liczy się opóźnienie względem ostatecznego celu podróży określonego w tej jednej umowie przewozu — nie ma znaczenia, na którym odcinku ono faktycznie powstało. Inaczej jest tylko wtedy, gdy kupiłeś dwa osobne bilety u różnych przewoźników jako dwie niezależne umowy — wtedy każdy odcinek rozliczasz osobno.</p>

      <h2>FAQ</h2>

      <h3>Czy rekompensata przysługuje przy bilecie miesięcznym lub sieciowym?</h3>
      <p>Tak, ale liczona jest proporcjonalnie do liczby opóźnień w okresie ważności biletu, a nie od razu za każde pojedyncze spóźnienie — szczegółowy sposób wyliczenia znajdziesz w regulaminie danego przewoźnika, bo rozporządzenie 2021/782 pozwala przewoźnikom ustalić tu własne, korzystniejsze dla pasażera zasady rozliczania.</p>

      <h3>Czy muszę zgłosić opóźnienie konduktorowi, zanim wysiądę z pociągu?</h3>
      <p>Nie, prawo do rekompensaty z rozporządzenia 2021/782 nie jest uzależnione od zgłoszenia na miejscu. Wystarczy złożyć wniosek u przewoźnika po zakończeniu podróży, dołączając bilet i dowód rzeczywistego czasu przyjazdu — dane o opóźnieniach pociągów przewoźnik i UTK rejestrują niezależnie od Twojego zgłoszenia.</p>

      <h3>Co jeśli przez opóźnienie pierwszego pociągu straciłem przesiadkę i dojechałem znacznie później?</h3>
      <p>Jeśli podróż była objęta jednym biletem na całą trasę, opóźnienie liczysz względem finalnego miejsca docelowego z tego biletu, a nie punktualności pierwszego odcinka — pełne opóźnienie na mecie uprawnia Cię do rekompensaty z art. 19 rozporządzenia 2021/782, tak jakby to był jeden nieprzerwany przejazd.</p>

      <h3>Czy poza rekompensatą ryczałtową mogę żądać zwrotu kosztów, np. noclegu czy przepadłego biletu na wydarzenie?</h3>
      <p>Tak, to osobne roszczenie o odszkodowanie za rzeczywistą szkodę wynikłą z nienależytego wykonania umowy przewozu, dochodzone na zasadach ogólnych Prawa przewozowego i Kodeksu cywilnego, niezależnie od zryczałtowanej rekompensaty za opóźnienie. Musisz jednak udokumentować wysokość szkody — rachunkiem za nocleg, potwierdzeniem ceny przepadłego biletu itp. — samo złożenie wniosku o rekompensatę z rozporządzenia nie wyklucza dochodzenia tej dodatkowej kwoty.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>Za opóźnienie 60–119 minut należy się 25% ceny biletu, za 120 minut i więcej — 50% (art. 19 rozporządzenia UE 2021/782)</li>
        <li>Przy odwołaniu lub opóźnieniu ponad godzinę masz wybór: zwrot biletu albo bezpłatna kontynuacja podróży do celu (art. 18)</li>
        <li>Przewoźnik odmówi tylko przy prawdziwie nadzwyczajnych okolicznościach — awaria techniczna czy typowa pogoda się nie liczą</li>
        <li>Reklamację składasz do roku od zdarzenia, przewoźnik ma 30 dni na odpowiedź — brak odpowiedzi oznacza jej uwzględnienie</li>
      </ul>
      <p>Przewoźnik odrzucił Twój wniosek o rekompensatę albo nie chcesz samodzielnie liczyć terminów i powoływać się na właściwe przepisy? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback przygotuje pismo z konkretną podstawą prawną</Link> w kilka minut, gotowe do wysłania do przewoźnika lub Rzecznika Praw Pasażera Kolei.</p>
    </>
  );
}
