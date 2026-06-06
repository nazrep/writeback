import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Z konta zniknęły pieniądze. Zadzwoniłeś do banku, a konsultant powiedział "transakcja była autoryzowana, nie możemy nic zrobić". To nieprawda. Ustawa nakłada na bank konkretny obowiązek zwrotu, a nie pozostawia mu uznaniowości.</p>

      <h2>Podstawa prawna: art. 46 ustawy o usługach płatniczych</h2>
      <p><strong>Art. 46 ustawy z dnia 19 sierpnia 2011 roku o usługach płatniczych</strong> jest precyzyjny: gdy zgłosisz nieautoryzowaną transakcję, bank musi zwrócić Ci jej kwotę niezwłocznie, nie później niż do końca następnego dnia roboczego po dniu zgłoszenia. Nie jest to gest dobrej woli ani wewnętrzna procedura bankowa. To obowiązek ustawowy.</p>
      <p>Jednocześnie art. 45 ust. 1 stanowi, że ciężar dowodu spoczywa na banku. To bank musi udowodnić, że transakcja była autoryzowana przez Ciebie. Ty nie musisz nic udowadniać.</p>

      <h2>Kiedy transakcja jest nieautoryzowana</h2>
      <p>Transakcja jest nieautoryzowana gdy jej nie zlecałeś. Najczęstsze przypadki:</p>
      <ul>
        <li>Kradzież karty i transakcje wykonane bez Twojej wiedzy</li>
        <li>Phishing: ktoś wyłudził Twoje dane (numer karty, kod CVV, hasło) i dokonał transakcji</li>
        <li>Sklep pobrał kwotę wyższą niż zaakceptowałeś</li>
        <li>Ta sama płatność pobrana dwa razy (duplikat transakcji)</li>
        <li>Subskrypcja, której nigdy nie zamawiałeś i której aktywacji nie autoryzowałeś</li>
      </ul>

      <h2>Dlaczego argument "logowanie było prawidłowe" nie wystarczy</h2>
      <p>Banki bardzo często odmawiają, twierdząc że uwierzytelnienie przebiegło prawidłowo: kod SMS dotarł na właściwy numer, PIN był poprawny, logowanie odbyło się ze znajomego urządzenia. Przepis art. 45 ust. 2 ustawy o usługach płatniczych wprost stanowi, że samo wykazanie zarejestrowanego użycia instrumentu płatniczego nie jest wystarczające do udowodnienia, że transakcja była autoryzowana przez użytkownika.</p>
      <p>Innymi słowy: fakt, że ktoś znał Twój PIN, hasło lub odebrał SMS, nie dowodzi automatycznie, że to Ty dokonałeś transakcji. Bank musi wykazać winę umyślną lub rażące niedbalstwo z Twojej strony.</p>

      <h2>Szczególny przypadek: BLIK i oszustwa na telefon</h2>
      <p>BLIK to najpopularniejsza forma płatności w Polsce i jednocześnie najczęstszy cel oszustów. Schemat "na BLIK" polega na tym, że ktoś podszywa się pod znajomego lub rodzinę (przez przejęte konto na mediach społecznościowych) i prosi o pilny przelew BLIKiem.</p>
      <p>W takim przypadku technicznie wpisałeś kod samodzielnie, więc bank może twierdzić, że transakcja była autoryzowana. Sytuacja jest trudna prawnie, ale nie beznadziejna:</p>
      <ul>
        <li>Jeśli padłeś ofiarą oszustwa, zgłoś to na policję i zaznacz to wyraźnie w reklamacji do banku</li>
        <li>Powołaj się na art. 45 i żądaj wyjaśnienia, w jaki sposób bank weryfikuje czy transakcja była świadoma</li>
        <li>Rzecznik Finansowy przychylnie patrzy na sprawy oszustw BLIK, szczególnie gdy kwota jest wysoka i ofiara działała pod wpływem manipulacji</li>
      </ul>

      <h2>Kiedy bank może odmówić zwrotu</h2>
      <p>Bank może odmówić zwrotu tylko gdy udowodni, że:</p>
      <ul>
        <li>Działałeś umyślnie: sam zleciłeś transakcję i twierdzisz, że jej nie autoryzowałeś</li>
        <li>Dopuściłeś się <strong>rażącego niedbalstwa</strong>: na przykład zapisałeś PIN razem z kartą w portfelu, przekazałeś dane logowania osobie trzeciej lub wpisałeś kod karty na fałszywej stronie pomimo oczywistych sygnałów ostrzegawczych</li>
        <li>Nie zgłosiłeś utraty karty niezwłocznie po stwierdzeniu faktu kradzieży lub zagubienia</li>
      </ul>
      <p>Ważne: zwykłe niedbalstwo nie pozbawia Cię prawa do zwrotu. Kliknięcie w link phishingowy, który wyglądał wiarygodnie (np. podszywał się pod stronę banku), to nie jest rażące niedbalstwo. Bank musi udowodnić bardzo wysoki poziom zaniedbania z Twojej strony.</p>

      <h2>Karta kredytowa a karta debetowa: różnice praktyczne</h2>
      <p>Przy <strong>karcie debetowej</strong> bank musi zwrócić Ci pieniądze z art. 46 niezwłocznie i potem samodzielnie prowadzić dochodzenie. Środki wracają na konto, nawet jeśli sprawa nie jest jeszcze wyjaśniona.</p>
      <p>Przy <strong>karcie kredytowej</strong> sytuacja jest podobna, ale banki mają dodatkową procedurę chargebacku w ramach sieci Visa lub Mastercard, która pozwala cofnąć transakcję od sprzedawcy. Możesz powołać się zarówno na art. 46, jak i na mechanizm chargebacku. Zadzwoń na infolinię i zapytaj o oba.</p>

      <h2>Jak napisać skuteczne pismo do banku</h2>
      <p>Telefoniczne zgłoszenie warto uzupełnić pismem reklamacyjnym. Rozmowa telefoniczna jest często odnotowywana jako "reklamacja ustna" z niższym priorytetem. Pismo z powołaniem na przepisy jest trudniej zignorować.</p>
      <p>W piśmie uwzględnij:</p>
      <ul>
        <li>Dane rachunku bankowego i Twoje dane osobowe</li>
        <li>Opis transakcji: data, kwota, odbiorca, numer referencyjny jeśli masz</li>
        <li>Oświadczenie, że transakcji nie autoryzowałeś</li>
        <li>Powołanie na <strong>art. 46 ust. 1</strong> (obowiązek zwrotu do końca następnego dnia roboczego) i <strong>art. 45 ust. 2</strong> (ciężar dowodu po stronie banku) ustawy o usługach płatniczych</li>
        <li>Żądanie zwrotu w ustawowym terminie</li>
        <li>Informację, że w razie odmowy złożysz skargę do Rzecznika Finansowego</li>
      </ul>
      <p>Możesz napisać pismo samodzielnie lub <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">wygenerować je przez writeback.pl</Link> z właściwymi przepisami. Wybierz opcję "Reklamacja do banku".</p>

      <h2>Co jeśli bank nadal odmawia</h2>
      <p>Jeśli bank utrzymuje odmowę po Twoim piśmie, masz kilka opcji:</p>
      <ul>
        <li><strong>Rzecznik Finansowy</strong>: najskuteczniejsza droga. Banki bardzo poważnie traktują skargi kierowane do RF, bo regulator bacznie obserwuje ich statystyki skarg. Postępowanie jest bezpłatne i działa szybko. Więcej na rf.gov.pl</li>
        <li><strong>KNF (Komisja Nadzoru Finansowego)</strong>: przyjmuje skargi na banki naruszające przepisy. Działa wolniej niż RF, ale sygnał do regulatora ma długofalowe znaczenie</li>
        <li><strong>Sąd polubowny przy KNF</strong>: bezpłatne postępowanie mediacyjno-arbitrażowe, wymaga zgody banku na udział</li>
        <li><strong>Sąd powszechny</strong>: przy kwotach powyżej kilku tysięcy złotych warto to rozważyć. Przy wartości sporu do 20 tys. złotych postępowanie uproszczone jest relatywnie tanie</li>
      </ul>
      <p>Masz problem z reklamacją do sklepu, nie do banku? Przeczytaj <Link href="/blog/reklamacja-sklep-internetowy" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">jak napisać skuteczną reklamację do sklepu internetowego</Link>.</p>

      <h2>Najczęstsze pytania o zwrot pieniędzy od banku</h2>

      <h3>Bank mówi, że musi przeprowadzić dochodzenie i to zajmie 30-60 dni. Czy może tak zrobić?</h3>
      <p>Bank może prowadzić dochodzenie, ale jest zobowiązany zwrócić Ci pieniądze najpóźniej do końca następnego dnia roboczego od zgłoszenia. Dochodzenie nie wstrzymuje obowiązku zwrotu. Jeśli bank po zakończeniu dochodzenia stwierdzi, że transakcja była autoryzowana, może wtedy potrącić zwrócone środki. Ale najpierw musi oddać, a potem ewentualnie dochodzić.</p>

      <h3>Zgubiłem kartę i ktoś jej użył zanim zgłosiłem kradzież. Mam prawo do zwrotu?</h3>
      <p>Za transakcje dokonane przed zgłoszeniem utraty karty ponosisz odpowiedzialność do kwoty 50 euro (art. 46 ust. 2), chyba że działałeś umyślnie lub przez rażące niedbalstwo. Za transakcje po zgłoszeniu utraty nie odpowiadasz w ogóle.</p>

      <h3>Sklep internetowy pobrał pieniądze, ale nie wysłał towaru. Czy to nieautoryzowana transakcja?</h3>
      <p>Nie: autoryzowałeś tę transakcję (zapłaciłeś za zakup). To jest problem po stronie sprzedawcy, nie nieautoryzowana transakcja. W takiej sytuacji składasz reklamację do sklepu z art. 43b (towar nie dotarł), a nie reklamację transakcji do banku. Możesz jednak spróbować chargebacku przy płatności kartą, jako że sprzedawca nie wywiązał się z umowy.</p>

      <h3>Czy muszę zgłaszać kradzież na policję żeby złożyć reklamację do banku?</h3>
      <p>Nie jest to wymóg prawny do złożenia reklamacji. Możesz reklamować bezpośrednio do banku bez zgłoszenia na policję. Warto jednak to zrobić, bo notatka policyjna to silny dowód w Twojej sprawie, szczególnie przy wyższych kwotach.</p>

      <h3>Transakcja zagraniczna w obcej walucie. Czy art. 46 nadal obowiązuje?</h3>
      <p>Tak. Ustawa o usługach płatniczych dotyczy wszystkich transakcji na rachunkach prowadzonych przez banki działające w Polsce, bez względu na walutę czy kraj sprzedawcy.</p>
    </>
  );
}
