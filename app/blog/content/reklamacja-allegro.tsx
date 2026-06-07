import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Kupiłeś telefon na Allegro, przestał działać po dwóch miesiącach i sprzedawca odpisał, że "towar był sprawny przy wysyłce, reklamacja odrzucona". Co teraz? Masz prawa, które działają niezależnie od tego, co sprzedawca pisze w odpowiedzi.</p>

      <h2>Krok pierwszy: czy kupowałeś od przedsiębiorcy czy od osoby prywatnej</h2>
      <p>Na Allegro sprzedają zarówno firmy, jak i osoby prywatne. To rozróżnienie jest kluczowe, bo prawa konsumenta przysługują Ci tylko przy zakupie od przedsiębiorcy.</p>
      <p>Jak sprawdzić: wejdź na profil sprzedawcy na Allegro. Jeśli widnieje tam NIP lub nazwa firmy, to przedsiębiorca i chronią Cię przepisy ustawy o prawach konsumenta. Jeśli to osoba prywatna bez NIP, to zakup reguluje Kodeks cywilny, który daje mniejszą ochronę.</p>
      <p>W praktyce zdecydowana większość sprzedawców na Allegro z dużą liczbą transakcji to firmy. Allegro samo w sobie jest tylko platformą i nie odpowiada za sprzedawców, chyba że sprzedaje we własnym imieniu jako "Allegro".</p>

      <h2>Twoje prawa przy zakupie od przedsiębiorcy na Allegro</h2>
      <p>Kupując od firmy, masz dokładnie te same prawa co przy zakupie w sklepie internetowym. Podstawa prawna to <strong>art. 43b ustawy o prawach konsumenta</strong>, który obowiązuje od 1 stycznia 2023 roku.</p>
      <p>Najważniejsze zasady:</p>
      <ul>
        <li><strong>2 lata</strong> na zgłoszenie niezgodności towaru z umową, liczone od daty otrzymania przesyłki</li>
        <li>Przez pierwsze 2 lata obowiązuje domniemanie, że wada istniała już w chwili dostarczenia (art. 43c ust. 1). Sprzedawca musi to obalić ekspertyzą, nie wystarczy słowne twierdzenie</li>
        <li>Sprzedawca ma <strong>14 dni</strong> na odpowiedź na reklamację (art. 7a). Brak odpowiedzi w tym czasie to uznanie reklamacji za zasadną z mocy prawa</li>
        <li>Możesz żądać naprawy, wymiany na nowy egzemplarz, obniżenia ceny lub zwrotu pieniędzy</li>
      </ul>
      <p>Szczegółowe omówienie tych przepisów znajdziesz w artykule <Link href="/blog/reklamacja-sklep-internetowy" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">jak napisać skuteczną reklamację do sklepu internetowego</Link>.</p>

      <h2>Typowe wymówki sprzedawców na Allegro i jak je obalić</h2>

      <h3>"Towar był sprawny przy wysyłce, sprawdzony przed wysłaniem"</h3>
      <p>Nie ma żadnego znaczenia, co sprzedawca twierdzi. Zgodnie z art. 43c ust. 1, przez 2 lata od dostarczenia obowiązuje domniemanie, że niezgodność istniała już w chwili dostarczenia. Ciężar obalenia tego domniemania leży po stronie sprzedawcy. Samo słowne zapewnienie nie wystarczy: sprzedawca musi przedstawić wynik ekspertyzy.</p>

      <h3>"Termin reklamacji 30 dni już minął"</h3>
      <p>Taki zapis w regulaminie sprzedawcy jest nieważny. Regulamin nie może skracać uprawnień konsumenta wynikających z ustawy. Masz 2 lata niezależnie od tego, co stoi w regulaminie na Allegro.</p>

      <h3>"To uszkodzenie mechaniczne, wina kupującego"</h3>
      <p>Sprzedawca może tak twierdzić, ale musi to udowodnić. Samo stwierdzenie jest niewystarczające. Zażądaj pisemnego uzasadnienia i wyników ewentualnej ekspertyzy. Jeśli odmawia, podważ decyzję kolejnym pismem z powołaniem na art. 43c.</p>

      <h3>"Towar był używany, sprzedawany bez gwarancji"</h3>
      <p>Odpowiedzialność za niezgodność z umową na podstawie ustawy o prawach konsumenta dotyczy również towaru używanego sprzedawanego przez przedsiębiorcę. Strony mogą skrócić ten czas do roku (przy towarach używanych), ale tylko jeśli taki zapis był wyraźnie zaznaczony przed zakupem i Ty go zaakceptowałeś. "Brak gwarancji" w ogłoszeniu nie wyłącza ustawowych praw.</p>

      <h2>Krok po kroku: jak złożyć reklamację sprzedawcy na Allegro</h2>

      <h3>Krok 1: skontaktuj się przez wiadomości Allegro</h3>
      <p>Najpierw wyślij wiadomość przez system Allegro, krótko opisując problem. Zostawia to ślad w systemie platformy. Daj sprzedawcy 2-3 dni na odpowiedź.</p>

      <h3>Krok 2: wyślij formalne pismo reklamacyjne</h3>
      <p>Jeśli sprzedawca odmawia lub nie odpowiada, wyślij formalne pismo. Znajdź adres email lub pocztowy sprzedawcy w jego profilu lub w danych na fakturze. Pismo powinno zawierać:</p>
      <ul>
        <li>Twoje dane i numer transakcji Allegro</li>
        <li>Opis produktu i datę zakupu</li>
        <li>Opis wady i datę jej ujawnienia</li>
        <li>Powołanie na <strong>art. 43b ustawy o prawach konsumenta</strong></li>
        <li>Konkretne żądanie: naprawa, wymiana lub zwrot</li>
        <li>Wzmiankę, że brak odpowiedzi w 14 dniach to uznanie reklamacji (art. 7a)</li>
      </ul>
      <p>Nie chcesz pisać samemu? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">writeback.pl wygeneruje takie pismo</Link> w kilka minut.</p>

      <h3>Krok 3: zgłoś spór w Allegro</h3>
      <p>Jeśli sprzedawca nadal odmawia, możesz otworzyć spór przez Allegro. Platforma ma Program Ochrony Kupujących i może interweniować, szczególnie gdy sprzedawca wyraźnie narusza prawa konsumenta. Allegro może zablokować środki do czasu rozwiązania sporu.</p>

      <h2>Opcja: chargeback przez kartę lub BLIK</h2>
      <p>Jeśli płaciłeś kartą kredytową lub debetową, możesz spróbować odwołania transakcji (chargebacku) przez bank. To mechanizm Visa i Mastercard, nie obowiązek prawny banku w tym konkretnym przypadku, ale wiele banków go realizuje gdy sprzedawca nie wywiązał się z umowy.</p>
      <p>Zadzwoń na infolinię swojego banku i zgłoś, że sprzedawca nie dostarczył towaru zgodnego z umową lub odmawia reklamacji mimo podstaw prawnych. Miej przy sobie numer transakcji i korespondencję ze sprzedawcą.</p>
      <p>Przy BLIK sytuacja jest trudniejsza: BLIK to płatność bezpośrednia i nie ma wbudowanego mechanizmu chargebacku. Możesz jednak złożyć reklamację transakcji w banku na podstawie art. 46 ustawy o usługach płatniczych, jeśli twierdzisz że transakcja była nieautoryzowana.</p>
      <p>Więcej o reklamacjach bankowych przeczytasz w artykule <Link href="/blog/bank-odmawia-zwrotu" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">bank odmawia zwrotu pieniędzy</Link>.</p>

      <h2>Zakup od osoby prywatnej: jakie masz opcje</h2>
      <p>Przy zakupie od osoby prywatnej ustawa o prawach konsumenta nie obowiązuje. Masz jednak prawa z Kodeksu cywilnego: art. 556 i następne regulują rękojmię przy sprzedaży między osobami fizycznymi. Termin na stwierdzenie wady to 2 lata od wydania rzeczy (art. 568 § 1 KC), a sprzedawca odpowiada za wady, które ukrył lub o których wiedział.</p>
      <p>Praktycznie jest to trudniejsze do wyegzekwowania niż w przypadku przedsiębiorcy. Jeśli sprzedawca zapewniał o stanie towaru w ogłoszeniu i rzecz okazała się wadliwa, masz podstawy do roszczeń, ale sprawa może wymagać postępowania sądowego.</p>

      <h2>Podsumowanie: reklamacja na Allegro krok po kroku</h2>
      <ul>
        <li>Sprawdź profil sprzedawcy: NIP lub nazwa firmy = prawa konsumenta działają. Osoba prywatna = słabsza ochrona z KC</li>
        <li><strong>Art. 43b ustawy o prawach konsumenta</strong> działa tak samo jak przy zakupie w każdym innym sklepie internetowym</li>
        <li>Sprzedawca ma <strong>14 dni</strong> na odpowiedź. Brak odpowiedzi = reklamacja uznana z mocy prawa</li>
        <li>Allegro Protect to wsparcie platformy, nie zastępnik Twoich praw. Formalne pismo jest mocniejszą podstawą</li>
        <li>Przy karcie możesz spróbować chargebacku, jeśli sprzedawca nie wywiązał się z umowy i nie reaguje</li>
        <li>Przy zakupie od osoby prywatnej masz 2 lata na reklamację z KC (art. 568 §1) — ale trudniej ją wyegzekwować, bo prywatny sprzedawca może ograniczyć rękojmię</li>
      </ul>

      <h2>Najczęstsze pytania o reklamacje na Allegro</h2>

      <h3>Allegro Protect: czy to wystarczy do reklamacji</h3>
      <p>Allegro Protect chroni Cię gdy towar nie dotarł lub jest niezgodny z opisem i sprzedawca nie reaguje. To dobry pierwszy krok, ale ma swoje limity czasowe. Formalne pismo z powołaniem na art. 43b działa niezależnie i jest mocniejszą podstawą prawną.</p>

      <h3>Czy muszę odesłać towar przed uznaniem reklamacji</h3>
      <p>Nie musisz odsyłać towaru zanim sprzedawca nie uzna reklamacji lub nie zaproponuje konkretnego rozwiązania. Koszty ewentualnego odesłania w celu naprawy lub wymiany ponosi sprzedawca, nie Ty.</p>

      <h3>Sprzedawca zniknął z Allegro po wysłaniu reklamacji</h3>
      <p>Jeśli sprzedawca usunął konto lub przestał odpowiadać, zapisz wszystkie dane firmy ze starego ogłoszenia i faktury: NIP, adres. Masz prawo do rozpatrzenia reklamacji przez firmę niezależnie od tego, czy ma aktywne konto na platformie. W skrajnym przypadku wezwij pisemnie na adres firmy i rozważ skargę do Rzecznika Praw Konsumentów.</p>

      <h3>Czy mogę reklamować towar kupiony w promocji Allegro Days</h3>
      <p>Tak, pełne prawa reklamacyjne przysługują niezależnie od ceny. Obniżka cenowa nie wyłącza odpowiedzialności sprzedawcy za niezgodność z umową.</p>

      <h3>Sprzedawca zaproponował voucher zamiast zwrotu pieniędzy</h3>
      <p>Voucher lub bon to propozycja sprzedawcy, nie Twój obowiązek. Jeśli żądasz zwrotu pieniędzy, sprzedawca musi przelać środki na konto. Możesz przyjąć voucher jeśli chcesz, ale masz prawo go odrzucić.</p>
    </>
  );
}
