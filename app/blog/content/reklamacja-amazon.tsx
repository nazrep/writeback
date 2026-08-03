import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Zamówiłeś słuchawki na Amazon.pl, po miesiącu prawy kanał przestał grać, a sprzedawca z marketplace odpisał „zwroty tylko do 30 dni". Czy naprawdę nie masz już żadnych opcji? Masz — i to więcej niż Ci się wydaje, bo Amazon to nie jeden sprzedawca, a Twoje prawa nie kończą się po 30 dniach.</p>

      <h2>Amazon jako platforma: kto właściwie Ci sprzedał</h2>
      <p>Na Amazon.pl sprzedaje zarówno sam Amazon (oznaczenie „Wysyłka i sprzedaż: Amazon"), jak i niezależni sprzedawcy (marketplace). To rozróżnienie jest kluczowe:</p>
      <ul>
        <li><strong>„Wysyłka i sprzedaż: Amazon"</strong> — Amazon jest sprzedawcą i odpowiada za reklamację na tych samych zasadach co każdy inny sklep internetowy</li>
        <li><strong>„Sprzedawca: [nazwa firmy]"</strong> — reklamujesz u tego sprzedawcy, nie u Amazona. Ale Amazon oferuje dodatkową ochronę przez Gwarancję A-Z</li>
        <li><strong>„Realizacja przez Amazon" (FBA)</strong> — sprzedawcą nadal jest firma trzecia, ale Amazon zajmuje się logistyką, co ułatwia zwroty</li>
      </ul>
      <p>Sprawdź na stronie zamówienia kto jest sprzedawcą. Jeśli sprzedawcą jest firma z siedzibą w UE (NIP europejski), chronią Cię w pełni przepisy polskiej ustawy o prawach konsumenta.</p>

      <h2>Twoje prawa — identyczne jak w każdym sklepie internetowym</h2>
      <p>Kupując od przedsiębiorcy na Amazon.pl, masz dokładnie te same prawa co przy zakupie w dowolnym sklepie online. Podstawa prawna to <strong>art. 43b ustawy o prawach konsumenta</strong>:</p>
      <ul>
        <li><strong>2 lata</strong> na zgłoszenie niezgodności towaru z umową od daty dostarczenia</li>
        <li>Przez 2 lata obowiązuje domniemanie, że wada istniała w chwili dostarczenia (<strong>art. 43c ust. 1</strong>). To sprzedawca musi udowodnić, że wada powstała po Twojej stronie</li>
        <li>Sprzedawca ma <strong>14 dni</strong> na odpowiedź na reklamację (<strong>art. 7a UPK</strong>). Brak odpowiedzi = reklamacja uznana</li>
        <li>Możesz żądać naprawy, wymiany, obniżenia ceny lub odstąpienia od umowy</li>
      </ul>
      <p>Szczegółowe omówienie tych przepisów znajdziesz w artykule <Link href="/blog/reklamacja-sklep-internetowy" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">jak napisać skuteczną reklamację do sklepu internetowego</Link>.</p>

      <h2>Polityka zwrotów Amazon vs Twoje prawa ustawowe</h2>
      <p>Amazon oferuje 30-dniową politykę bezpłatnych zwrotów — to ich dobrowolna polityka handlowa, nie prawo. Po upływie 30 dni <strong>nie tracisz prawa do reklamacji</strong>. To dwie różne rzeczy:</p>
      <ul>
        <li><strong>Zwrot w 30 dni</strong> — dobrowolna polityka Amazona: możesz odesłać towar bez podania przyczyny</li>
        <li><strong>Reklamacja (2 lata)</strong> — Twoje ustawowe prawo: zgłaszasz wadę i żądasz naprawy, wymiany lub zwrotu pieniędzy</li>
      </ul>
      <p>Sprzedawca nie może odmówić reklamacji powołując się na wygaśnięcie 30-dniowego okresu zwrotu. To zupełnie inny mechanizm.</p>

      <h2>Gwarancja A-Z: dodatkowa ochrona od Amazona</h2>
      <p>Jeśli sprzedawca z marketplace nie reaguje na reklamację, możesz skorzystać z <strong>Gwarancji A-Z</strong> (A-to-z Guarantee). Obejmuje sytuacje, gdy:</p>
      <ul>
        <li>Towar nie dotarł w przewidywanym terminie</li>
        <li>Towar jest uszkodzony, wadliwy lub niezgodny z opisem</li>
        <li>Sprzedawca nie odpowiada na prośbę o zwrot</li>
      </ul>
      <p>Wniosek składasz przez stronę zamówienia → „Problem z zamówieniem" → „Złóż wniosek o Gwarancję A-Z". Amazon rozpatruje go zwykle w ciągu 1-2 tygodni. Uwaga: Gwarancja A-Z to wewnętrzna polityka Amazona — nie zastępuje Twoich praw ustawowych, ale w praktyce jest szybsza.</p>

      <h2>Typowe wymówki sprzedawców na Amazon i jak je obalić</h2>

      <h3>„Okres zwrotu minął, nie przyjmujemy reklamacji"</h3>
      <p>30-dniowy okres zwrotu to polityka handlowa Amazona, nie limit na reklamację. Twoje prawo do reklamacji z tytułu niezgodności towaru z umową trwa 2 lata od dostarczenia (art. 43c ust. 1 UPK). Powołaj się na to w piśmie.</p>

      <h3>„Skontaktuj się z producentem, to kwestia gwarancji"</h3>
      <p>Gwarancja producenta i reklamacja u sprzedawcy to dwa niezależne uprawnienia. Sprzedawca nie może odesłać Cię do producenta — sam odpowiada za niezgodność towaru z umową (art. 43b UPK). Wybór należy do Ciebie.</p>

      <h3>„Towar działa prawidłowo, nie widzimy wady"</h3>
      <p>Samo stwierdzenie nie wystarczy. Przez 2 lata od dostarczenia obowiązuje domniemanie, że wada istniała w chwili wydania (art. 43c ust. 1). Sprzedawca musi przedstawić dowód (np. ekspertyzę), że wada powstała z Twojej winy.</p>

      <h2>Krok po kroku: jak złożyć reklamację na Amazon.pl</h2>

      <h3>Krok 1: zgłoś problem przez panel zamówień</h3>
      <p>Zaloguj się na Amazon.pl → Twoje zamówienia → wybierz zamówienie → „Problem z zamówieniem". Opisz wadę, dołącz zdjęcia. Amazon przekaże zgłoszenie do sprzedawcy.</p>

      <h3>Krok 2: wyślij formalne pismo reklamacyjne</h3>
      <p>Jeśli sprzedawca odmawia lub nie odpowiada w ciągu kilku dni, wyślij formalne pismo na adres email sprzedawcy (znajdziesz go w informacjach o sprzedawcy). Pismo powinno zawierać:</p>
      <ul>
        <li>Twoje dane i numer zamówienia Amazon</li>
        <li>Opis produktu i datę dostarczenia</li>
        <li>Opis wady z datą wykrycia</li>
        <li>Powołanie na <strong>art. 43b i 43c ustawy o prawach konsumenta</strong></li>
        <li>Konkretne żądanie: naprawa, wymiana lub zwrot pieniędzy</li>
        <li>Informację, że brak odpowiedzi w 14 dniach = uznanie reklamacji (art. 7a)</li>
      </ul>
      <p>Nie chcesz pisać samemu? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback wygeneruje gotowe pismo reklamacyjne</Link> w kilka minut — z prawidłowymi podstawami prawnymi i dopasowane do Amazona.</p>

      <h3>Krok 3: Gwarancja A-Z lub chargeback</h3>
      <p>Jeśli sprzedawca nie reaguje, złóż wniosek o Gwarancję A-Z. Równolegle, jeśli płaciłeś kartą, możesz rozważyć chargeback przez bank. Więcej o tym przeczytasz w artykule <Link href="/blog/bank-odmawia-zwrotu" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">bank odmawia zwrotu pieniędzy</Link>.</p>

      <h2>Sprzedawca spoza UE na Amazon — co wtedy</h2>
      <p>Część sprzedawców na Amazon.pl ma siedzibę w Chinach lub poza UE. Ustawa o prawach konsumenta nadal obowiązuje, bo sprzedawca kieruje ofertę do polskich konsumentów. W praktyce egzekwowanie jest trudniejsze — dlatego Gwarancja A-Z jest szczególnie ważna przy takich sprzedawcach.</p>
      <p>Jeśli ani sprzedawca, ani Amazon nie rozwiązali problemu, rozważ złożenie skargi do <Link href="/blog/skarga-do-uokik" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">UOKiK lub Rzecznika Praw Konsumentów</Link>.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>Sprawdź kto jest sprzedawcą: Amazon, firma z UE, czy sprzedawca spoza UE</li>
        <li>30-dniowy zwrot to polityka Amazona — Twoje prawa reklamacyjne trwają 2 lata</li>
        <li>Sprzedawca ma 14 dni na odpowiedź (art. 7a UPK). Brak odpowiedzi = uznanie reklamacji</li>
        <li>Gwarancja A-Z to dodatkowa ochrona, nie zastępnik prawa</li>
        <li>Przy braku reakcji: chargeback przez bank lub skarga do Rzecznika</li>
      </ul>

      <p>Jeśli Twoja reklamacja została odrzucona, przeczytaj <Link href="/blog/reklamacja-odrzucona" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">co zrobić gdy reklamacja została odrzucona</Link>.</p>
    </>
  );
}
