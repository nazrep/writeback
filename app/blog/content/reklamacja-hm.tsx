import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Kupiłaś sukienkę w H&M, a po pierwszym praniu materiał się rozciągnął i kolory wyblakły — mimo że prałaś zgodnie z instrukcją na metce. W sklepie powiedzieli, że „zwroty tylko z paragonem i w ciągu 30 dni". Czy to koniec Twoich opcji? Nie. 30-dniowy termin to polityka zwrotów H&M, a Twoje prawa wynikają z ustawy i działają przez 2 lata.</p>

      <h2>Twoje prawa przy reklamacji w H&M</h2>
      <p>H&M Hennes & Mauritz Sp. z o.o. to przedsiębiorca z siedzibą w Polsce — podlega pełnej odpowiedzialności z <strong>art. 43b ustawy o prawach konsumenta</strong>. Dotyczy to zarówno zakupów stacjonarnych, jak i online na hm.com.</p>
      <ul>
        <li><strong>2 lata</strong> na zgłoszenie niezgodności towaru z umową (art. 43c ust. 1 UPK)</li>
        <li>Domniemanie, że wada istniała w chwili dostarczenia — przez całe 2 lata to H&M musi udowodnić, że wada powstała z Twojej winy</li>
        <li><strong>14 dni</strong> na odpowiedź na reklamację (art. 7a UPK). Brak odpowiedzi = uznanie reklamacji</li>
        <li>Możesz żądać naprawy, wymiany, obniżenia ceny lub zwrotu pieniędzy</li>
      </ul>
      <p>Więcej o przepisach: <Link href="/blog/reklamacja-sklep-internetowy" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">jak napisać skuteczną reklamację do sklepu internetowego</Link>.</p>

      <h2>Zwrot a reklamacja — to dwa różne uprawnienia</h2>
      <p>H&M ma politykę 30-dniowych zwrotów: możesz oddać towar bez podawania przyczyny w ciągu 30 dni (w sklepie stacjonarnym z paragonem, online z formularzem zwrotu). To jest dobrowolna polityka sklepu i prawo do odstąpienia od umowy.</p>
      <p><strong>Reklamacja to coś innego.</strong> Jeśli towar jest wadliwy — rozchodzi się po pierwszym praniu, suwak się zacina, materiał ma dziury — to niezgodność towaru z umową. Na zgłoszenie masz 2 lata, nie 30 dni. Paragon ułatwia sprawę, ale nie jest konieczny — wystarczy wyciąg z karty, potwierdzenie z aplikacji H&M Members lub dowód transakcji.</p>

      <h2>Typowe wymówki H&M i jak je obalić</h2>

      <h3>{'"30 dni na zwrot już minęło"'}</h3>
      <p>To dotyczy zwrotu bez przyczyny, nie reklamacji wadliwego towaru. Reklamacja z tytułu niezgodności towaru z umową przysługuje przez 2 lata od zakupu. Powołaj się na art. 43b UPK.</p>

      <h3>{'"Towar był prany, nie podlega zwrotowi"'}</h3>
      <p>Pranie zgodne z instrukcją na metce to normalne użytkowanie. Jeśli odzież nie wytrzymała prania zalecanego przez producenta (np. 30°C, program delikatny), to wada towaru, nie wina kupującego. Zachowaj metkę z instrukcją prania — to Twój dowód.</p>

      <h3>{'"To normalne zużycie materiału"'}</h3>
      <p>Odzież, która rozchodzi się po kilku użyciach lub traci kolor po pierwszym praniu, nie spełnia rozsądnych oczekiwań konsumenta. Art. 43b ust. 2 UPK mówi, że towar musi być trwały w stopniu odpowiednim dla jego rodzaju. Koszulka za 79 zł, która rozpada się po miesiącu, nie spełnia tego kryterium.</p>

      <h3>{'"Proszę o paragon, bez paragonu nie przyjmiemy"'}</h3>
      <p>Paragon to wygodny dowód zakupu, ale nie jedyny. Wystarczy wyciąg z konta bankowego, potwierdzenie transakcji kartą, historia zamówień w aplikacji H&M Members, albo email z potwierdzeniem zakupu online. Sprzedawca nie może odmówić reklamacji tylko dlatego, że nie masz paragonu.</p>

      <h2>Krok po kroku: jak złożyć reklamację w H&M</h2>

      <h3>Krok 1: reklamacja w sklepie stacjonarnym</h3>
      <p>Przynieś wadliwy produkt do dowolnego sklepu H&M. Opisz wadę i poproś o formularz reklamacyjny. Zachowaj kopię formularza z datą i pieczątką sklepu — od tego dnia liczy się 14-dniowy termin na odpowiedź. Jeśli sprzedawca odmawia przyjęcia reklamacji na miejscu, poproś o pisemne uzasadnienie odmowy.</p>

      <h3>Krok 2: reklamacja online (zakupy przez hm.com)</h3>
      <p>Zaloguj się na hm.com, przejdź do historii zamówień i wybierz opcję reklamacji. Jeśli takiej opcji nie ma, wyślij email na adres obsługi klienta H&M Polska z numerem zamówienia, opisem wady i zdjęciami. Możesz też zanieść produkt kupiony online do sklepu stacjonarnego.</p>

      <h3>Krok 3: wyślij formalne pismo</h3>
      <p>Jeśli H&M odrzucił reklamację lub nie odpowiedział w ciągu 14 dni, wyślij formalne pismo reklamacyjne. Pismo powinno zawierać:</p>
      <ul>
        <li>Twoje dane, datę zakupu i opis produktu</li>
        <li>Dokładny opis wady (kiedy się ujawniła, jak wygląda)</li>
        <li>Powołanie na <strong>art. 43b i 43d ustawy o prawach konsumenta</strong></li>
        <li>Konkretne żądanie: wymiana, obniżenie ceny lub zwrot pieniędzy</li>
        <li>Wzmiankę o 14-dniowym terminie z art. 7a UPK</li>
      </ul>
      <p>Nie chcesz pisać samemu? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback wygeneruje profesjonalne pismo reklamacyjne</Link> w kilka minut.</p>

      <h3>Krok 4: co dalej jeśli H&M odmawia</h3>
      <p>Masz prawo zgłosić się do <Link href="/blog/skarga-do-uokik" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Rzecznika Praw Konsumentów lub UOKiK</Link>. Przy zakupach online możesz też skorzystać z platformy ODR (Online Dispute Resolution) Komisji Europejskiej. Więcej o opcjach po odrzuceniu reklamacji: <Link href="/blog/reklamacja-odrzucona" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">co zrobić gdy reklamacja została odrzucona</Link>.</p>

      <h2>H&M Members — jak wykorzystać historię zakupów</h2>
      <p>Jeśli masz konto H&M Members, Twoja historia zakupów jest zapisana w aplikacji — nawet bez paragonu. To pełnowartościowy dowód zakupu przy reklamacji. Dodatkowo, członkowie H&M Members mają wydłużony okres zwrotów (do 60 dni), ale pamiętaj: to dotyczy zwrotów, nie reklamacji. Na reklamację masz 2 lata niezależnie od statusu Members.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>30-dniowy zwrot to polityka H&M — reklamacja wadliwego towaru przysługuje przez 2 lata z ustawy</li>
        <li>Pranie zgodne z instrukcją to normalne użytkowanie — wada po praniu to wina towaru, nie Twoja</li>
        <li>Paragon nie jest wymagany — wystarczy inny dowód zakupu (karta, H&M Members, email)</li>
        <li>H&M ma 14 dni na odpowiedź. Brak odpowiedzi = reklamacja uznana z mocy prawa</li>
        <li>Możesz reklamować w sklepie stacjonarnym, online lub formalnym pismem</li>
      </ul>
    </>
  );
}
