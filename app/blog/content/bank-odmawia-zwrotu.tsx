export default function Content() {
  return (
    <>
      <p>Bank twierdzi że transakcja była autoryzowana i nie może nic zrobić? Masz konkretne przepisy po swojej stronie. Ustawa o usługach płatniczych nakłada na bank obowiązek zwrotu — nie jako gest dobrej woli, ale jako wymóg prawny.</p>

      <h2>Podstawa prawna — art. 45 ustawy o usługach płatniczych</h2>
      <p><strong>Art. 45 ustawy z dnia 19 sierpnia 2011 r. o usługach płatniczych</strong> stanowi że w przypadku nieautoryzowanej transakcji bank jest zobowiązany niezwłocznie — nie później niż do końca następnego dnia roboczego — zwrócić kwotę nieautoryzowanej transakcji.</p>
      <p>To nie jest prośba. To obowiązek ustawowy.</p>

      <h2>Kiedy transakcja jest "nieautoryzowana"?</h2>
      <p>Transakcja jest nieautoryzowana gdy jej <strong>nie zlecałeś</strong> — czyli:</p>
      <ul>
        <li>Kradzież karty i płatności bez Twojej wiedzy</li>
        <li>Phishing — ktoś wyłudził Twoje dane i dokonał transakcji</li>
        <li>Sklep pobił więcej niż zaakceptowałeś</li>
        <li>Subskrypcja której nie zamawiałeś lub której nie anulowałeś świadomie</li>
        <li>Duplikat transakcji (ta sama płatność pobrana dwa razy)</li>
      </ul>

      <h2>Co z argumentem "logowanie było prawidłowe"?</h2>
      <p>Banki często odmawiają zwrotu twierdząc że "uwierzytelnienie przebiegło prawidłowo". To niewystarczające. Art. 45 ust. 2 stanowi że samo uwierzytelnienie nie jest dowodem na to że transakcja była autoryzowana przez użytkownika.</p>
      <p>Ciężar dowodu spoczywa na banku — to bank musi udowodnić że transakcja była autoryzowana lub że działałeś umyślnie albo przez rażące niedbalstwo. Sam fakt że ktoś znał Twój PIN lub hasło nie przesądza sprawy.</p>

      <h2>Kiedy bank może odmówić?</h2>
      <p>Bank może odmówić zwrotu jedynie gdy udowodni że:</p>
      <ul>
        <li>Działałeś umyślnie (sam zlecasz transakcję i twierdzisz że jej nie autoryzowałeś)</li>
        <li>Dopuściłeś się <strong>rażącego niedbalstwa</strong> — np. zapisałeś PIN przy karcie, przekazałeś dane logowania osobie trzeciej</li>
        <li>Nie zgłosiłeś utraty karty niezwłocznie po stwierdzeniu</li>
      </ul>
      <p>Zwykłe niedbalstwo (np. kliknięcie w link phishingowy przy zachowaniu pozorów wiarygodności) <strong>nie</strong> pozbawia Cię prawa do zwrotu.</p>

      <h2>Jak napisać skuteczne pismo do banku?</h2>
      <p>Pismo powinno zawierać:</p>
      <ul>
        <li>Dane rachunku i Twoje dane osobowe</li>
        <li>Opis transakcji: data, kwota, odbiorca</li>
        <li>Oświadczenie że transakcji nie autoryzowałeś</li>
        <li><strong>Powołanie na art. 45 ustawy o usługach płatniczych</strong></li>
        <li>Żądanie zwrotu w terminie wskazanym w ustawie</li>
        <li>Informację że w razie odmowy złożysz skargę do Rzecznika Finansowego</li>
      </ul>

      <h2>Co jeśli bank nadal odmawia?</h2>
      <ul>
        <li><strong>Rzecznik Finansowy</strong> — bezpłatne postępowanie interwencyjne, banki bardzo poważnie traktują skargi do RF</li>
        <li><strong>KNF</strong> — Komisja Nadzoru Finansowego przyjmuje skargi na banki naruszające przepisy</li>
        <li><strong>Sąd polubowny przy KNF</strong> — bezpłatne postępowanie, wymaga zgody banku</li>
        <li><strong>Sąd powszechny</strong> — przy kwotach powyżej kilku tysięcy złotych opłaca się rozważyć</li>
      </ul>
    </>
  );
}
