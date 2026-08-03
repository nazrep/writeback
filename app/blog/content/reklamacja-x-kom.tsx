import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Kupiłeś laptopa w x-kom za 4 299 zł, po trzech miesiącach ekran zaczął migać, a obsługa klienta odpowiedziała że „prześlij na RMA, diagnoza potrwa do 14 dni roboczych". Czternaście dni roboczych to prawie trzy tygodnie kalendarzowe — a ustawa daje sprzedawcy 14 dni kalendarzowych na odpowiedź. Znaj różnicę, bo x-kom na niej gra.</p>

      <h2>X-Kom — kto jest sprzedawcą</h2>
      <p>X-Kom sp. z o.o. z siedzibą w Częstochowie to jeden z największych polskich sklepów z elektroniką. Sprzedaje zarówno online (x-kom.pl) jak i stacjonarnie. Niezależnie od kanału zakupu, podmiotem odpowiedzialnym jest x-kom sp. z o.o.</p>
      <p>X-Kom jest też właścicielem marki al.to (dawniej Allegro Smart) — jeśli kupiłeś na al.to, sprzedawcą jest x-kom i reklamację składasz do nich.</p>

      <h2>Twoje prawa przy reklamacji w x-kom</h2>
      <p>X-Kom jest przedsiębiorcą. Podstawa prawna: <strong>art. 43b ustawy o prawach konsumenta</strong>.</p>
      <ul>
        <li><strong>2 lata</strong> na zgłoszenie niezgodności towaru z umową od daty zakupu</li>
        <li>Domniemanie wady przez 2 lata (art. 43c ust. 1) — x-kom musi udowodnić, że wada nie istniała przy dostarczeniu</li>
        <li><strong>14 dni kalendarzowych</strong> na odpowiedź na reklamację (art. 7a UPK). Nie roboczych — kalendarzowych</li>
        <li>Żądanie naprawy, wymiany, obniżenia ceny lub zwrotu pieniędzy (art. 43d, 43e UPK)</li>
      </ul>
      <p>Szczegółowe omówienie przepisów w artykule <Link href="/blog/reklamacja-sklep-internetowy" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">jak napisać skuteczną reklamację do sklepu internetowego</Link>.</p>

      <h2>RMA w x-kom — co to jest i czym się różni od reklamacji</h2>
      <p>RMA (Return Merchandise Authorization) to wewnętrzna procedura x-komu na obsługę zwrotów i napraw. To nie jest odrębne prawo — to po prostu nazwa, którą x-kom nadaje procesowi reklamacyjnemu.</p>
      <p>Kluczowe: RMA nie może mieć dłuższego terminu niż ustawowe 14 dni na odpowiedź. Jeśli x-kom mówi „RMA trwa do 14 dni roboczych" — to ich wewnętrzna procedura, ale ustawowy termin 14 dni kalendarzowych biegnie od momentu złożenia reklamacji, niezależnie od tego, jak x-kom nazywa swój proces.</p>

      <h2>Gwarancja producenta vs reklamacja do x-kom</h2>
      <p>Przy elektronice x-kom regularnie próbuje przekierować klienta do gwarancji producenta (np. „proszę kontaktować się z serwisem ASUS/Dell/HP"). To dwa osobne tryby:</p>
      <ul>
        <li><strong>Gwarancja producenta</strong> — dobrowolne zobowiązanie producenta, warunki ustala producent, czasem wymaga wysyłki za granicę</li>
        <li><strong>Reklamacja z ustawy (do x-kom)</strong> — Twoje ustawowe prawo wobec sprzedawcy, 14 dni na odpowiedź, koszty po stronie x-komu</li>
      </ul>
      <p>Masz prawo wybrać, z którego trybu korzystasz. X-Kom nie może odmówić przyjęcia reklamacji z ustawy i odesłać Cię do producenta.</p>

      <h2>Typowe wymówki x-komu i jak je obalić</h2>

      <h3>{'"Proszę skontaktować się z serwisem producenta"'}</h3>
      <p>X-Kom jako sprzedawca odpowiada z tytułu niezgodności towaru z umową. Gwarancja producenta to osobna ścieżka. Masz prawo złożyć reklamację bezpośrednio do x-komu — powołaj się na art. 43b UPK.</p>

      <h3>{'"Diagnostyka wykazała brak wady"'}</h3>
      <p>Zażądaj pisemnego raportu z diagnostyki — co dokładnie sprawdzono, jakim narzędziem, kto przeprowadził badanie. Jeśli wada występuje sporadycznie (np. migotanie ekranu przy określonej jasności), opisz dokładne warunki jej wystąpienia. Masz prawo do niezależnej ekspertyzy na koszt sprzedawcy.</p>

      <h3>{'"Uszkodzenie mechaniczne — ślady upadku"'}</h3>
      <p>X-Kom musi udowodnić związek przyczynowy między śladem a wadą. Drobne rysy na obudowie laptopa nie oznaczają, że migotanie ekranu jest wynikiem upadku. Domniemanie z art. 43c ust. 1 działa na Twoją korzyść — to x-kom musi udowodnić, że wada powstała z Twojej winy.</p>

      <h3>{'"Termin naprawy to 14 dni roboczych"'}</h3>
      <p>Art. 7a UPK mówi o 14 dniach kalendarzowych na ustosunkowanie się do reklamacji, nie roboczych. Wewnętrzny regulamin x-komu nie może wydłużać terminu ustawowego. Jeśli nie masz odpowiedzi po 14 dniach kalendarzowych — reklamacja uznana z mocy prawa.</p>

      <h2>Krok po kroku: jak złożyć reklamację w x-kom</h2>

      <h3>Krok 1: zbierz dokumenty</h3>
      <p>Faktura lub potwierdzenie zamówienia z x-kom.pl (w panelu klienta → „Moje zamówienia"). Zrób zdjęcia lub nagranie wideo wady — przy elektronice film pokazujący problem jest często skuteczniejszy niż opis słowny.</p>

      <h3>Krok 2: złóż reklamację</h3>
      <ul>
        <li><strong>Online:</strong> panel klienta x-kom.pl → „Moje zamówienia" → „Zgłoś reklamację" (wygeneruje numer RMA)</li>
        <li><strong>Stacjonarnie:</strong> w sklepie x-kom z produktem i dowodem zakupu</li>
        <li><strong>Pisemnie:</strong> pismo reklamacyjne na adres x-kom sp. z o.o., ul. Bojkowska 44, 44-100 Gliwice</li>
      </ul>
      <p>Formalne pismo z powołaniem na przepisy jest najmocniejszą opcją. <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback wygeneruje profesjonalne pismo reklamacyjne</Link> w kilka minut.</p>

      <h3>Krok 3: pilnuj terminu 14 dni kalendarzowych</h3>
      <p>Zapisz datę złożenia. Nie daj się zmylić terminami „roboczymi" — ustawowy termin to 14 dni kalendarzowych (art. 7a UPK). Po ich upływie bez odpowiedzi — reklamacja uznana.</p>

      <h3>Krok 4: odrzucona reklamacja</h3>
      <p>Zażądaj pisemnego raportu z diagnostyki. Wyślij drugie pismo z konkretnymi zarzutami. Rozważ skargę do Rzecznika Praw Konsumentów. Więcej w artykule <Link href="/blog/reklamacja-odrzucona" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">co zrobić gdy reklamacja została odrzucona</Link>.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>X-Kom odpowiada za niezgodność towaru z umową — nie musisz iść do producenta</li>
        <li>RMA to nazwa procedury x-komu, nie osobne prawo — obowiązują terminy ustawowe</li>
        <li><strong>14 dni kalendarzowych</strong> na odpowiedź, nie roboczych</li>
        <li>Gwarancja producenta i reklamacja do sprzedawcy to dwa osobne tryby — Ty wybierasz</li>
        <li>Przy odrzuceniu żądaj pisemnego raportu z diagnostyki — x-kom musi udowodnić brak wady</li>
      </ul>
    </>
  );
}
