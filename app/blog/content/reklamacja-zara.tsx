import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Kupiłaś płaszcz w Zara za 549 zł. Po trzech tygodniach oderwał się guzik, podszewka zaczęła się pruć przy szwie. W sklepie powiedzieli: „nie możemy przyjąć zwrotu bez metki". Ale Ty nie chcesz zwracać — chcesz reklamować wadliwy produkt. To dwa zupełnie różne uprawnienia i Zara nie może ich mieszać.</p>

      <h2>Twoje prawa przy reklamacji w Zara</h2>
      <p>Zara Polska Sp. z o.o. (część grupy Inditex) to przedsiębiorca zarejestrowany w Polsce. Jako konsument masz pełną ochronę z <strong>art. 43b ustawy o prawach konsumenta</strong> — zarówno przy zakupach stacjonarnych, jak i na zara.com.</p>
      <ul>
        <li><strong>2 lata</strong> na zgłoszenie niezgodności towaru z umową (art. 43c ust. 1 UPK)</li>
        <li>Domniemanie, że wada istniała w chwili dostarczenia — to Zara musi udowodnić, że wada powstała z Twojej winy</li>
        <li><strong>14 dni</strong> na odpowiedź na reklamację (art. 7a UPK). Brak odpowiedzi = uznanie reklamacji</li>
        <li>Żądanie naprawy, wymiany, obniżenia ceny lub zwrotu pieniędzy</li>
      </ul>
      <p>Pełne omówienie przepisów: <Link href="/blog/reklamacja-sklep-internetowy" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">jak napisać skuteczną reklamację do sklepu internetowego</Link>.</p>

      <h2>Zwrot a reklamacja — Zara celowo je myli</h2>
      <p>Zara ma politykę 30-dniowych zwrotów: towar musi mieć metki, być nieużywany, z paragonem lub e-paragonem. To dotyczy odstąpienia od umowy — sytuacji, gdy po prostu się rozmyśliłaś.</p>
      <p><strong>Reklamacja wadliwego towaru to coś zupełnie innego.</strong> Jeśli towar ma wadę (prucie się, pęknięty zamek, odbarwienie po praniu zgodnym z instrukcją), nie musisz mieć metek, nie obowiązuje Cię 30-dniowy termin, i masz na to 2 lata. Sklep nie może odmówić przyjęcia reklamacji powołując się na brak metki — metka nie ma znaczenia przy wadliwym towarze.</p>

      <h2>Typowe wymówki Zara i jak je obalić</h2>

      <h3>{'"Bez metki nie przyjmujemy"'}</h3>
      <p>Metka jest wymagana przy zwrocie bez przyczyny, nie przy reklamacji. Reklamacja dotyczy wadliwego towaru — oczywiste, że noszony produkt nie będzie miał metki. Powołaj się na art. 43b UPK i poproś o pisemne uzasadnienie odmowy.</p>

      <h3>{'"To normalne zużycie"'}</h3>
      <p>Płaszcz za 549 zł, który rozchodzi się po trzech tygodniach, nie spełnia rozsądnych oczekiwań co do trwałości (art. 43b ust. 2 UPK). Normalne zużycie to przetarcia po roku noszenia, nie pękanie szwów po kilku użyciach.</p>

      <h3>{'"Wada powstała z powodu niewłaściwego prania"'}</h3>
      <p>Jeśli prałaś zgodnie z instrukcją na metce pielęgnacji, to nie jest Twoja wina. Zachowaj metkę z instrukcją prania — to Twój dowód. Przez 2 lata od zakupu to Zara musi udowodnić, że prałaś nieprawidłowo, nie odwrotnie (art. 43c ust. 1 UPK).</p>

      <h3>{'"Prosimy o kontakt z obsługą online"'}</h3>
      <p>Masz prawo złożyć reklamację w dowolny sposób — w sklepie stacjonarnym, online, lub pisemnie. Sklep stacjonarny nie może odsyłać Cię do obsługi online — jeśli tam kupiłaś, tam możesz reklamować.</p>

      <h2>Krok po kroku: jak złożyć reklamację w Zara</h2>

      <h3>Krok 1: reklamacja w sklepie stacjonarnym</h3>
      <p>Przynieś wadliwy produkt do sklepu Zara. Nie musisz mieć metki ani oryginalnego opakowania — wystarczy dowód zakupu (paragon, e-paragon z aplikacji Zara, wyciąg z karty). Opisz wadę i poproś o formularz reklamacyjny. Zachowaj kopię z datą przyjęcia — od tego dnia liczy się 14-dniowy termin.</p>

      <h3>Krok 2: reklamacja online (zakupy przez zara.com)</h3>
      <p>Zaloguj się na zara.com → Moje zamówienia → Zwroty i reklamacje. Opisz wadę, dołącz zdjęcia. Jeśli formularz online nie pozwala na zgłoszenie reklamacji (tylko zwrot), wyślij email bezpośrednio na adres obsługi klienta Zara Polska z numerem zamówienia i opisem wady.</p>

      <h3>Krok 3: formalne pismo reklamacyjne</h3>
      <p>Jeśli Zara odrzuci reklamację w sklepie lub online, wyślij formalne pismo. Powinno zawierać:</p>
      <ul>
        <li>Twoje dane, datę i miejsce zakupu, numer paragonu lub zamówienia</li>
        <li>Opis produktu i dokładny opis wady</li>
        <li>Powołanie na <strong>art. 43b i art. 43d ustawy o prawach konsumenta</strong></li>
        <li>Żądanie: wymiana, obniżenie ceny lub zwrot pieniędzy</li>
        <li>Informacja o 14-dniowym terminie odpowiedzi (art. 7a UPK)</li>
      </ul>
      <p>Nie chcesz pisać samemu? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback wygeneruje profesjonalne pismo reklamacyjne</Link> w kilka minut — z powołaniem na właściwe przepisy i konkretnym żądaniem.</p>

      <h3>Krok 4: co dalej przy odmowie</h3>
      <p>Jeśli Zara nie odpowiedziała w 14 dniach, reklamacja jest uznana z mocy prawa. Jeśli odpowiedziała negatywnie — możesz zgłosić się do <Link href="/blog/skarga-do-uokik" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Rzecznika Praw Konsumentów</Link> (pomoc bezpłatna) lub skorzystać z platformy ODR. Więcej opcji: <Link href="/blog/reklamacja-odrzucona" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">co zrobić gdy reklamacja została odrzucona</Link>.</p>

      <h2>Zara online vs stacjonarnie — różnice w praktyce</h2>
      <p>Przy zakupach online masz dodatkowe prawo: 14-dniowe odstąpienie od umowy bez podawania przyczyny (art. 27 UPK) — niezależnie od 30-dniowej polityki Zara. To oznacza, że nawet jeśli Zara skróci swój okres zwrotów, ustawowe 14 dni zostaje.</p>
      <p>Przy zakupach stacjonarnych prawo do odstąpienia nie przysługuje — ale reklamacja działa identycznie w obu kanałach. Towar kupiony online możesz reklamować w sklepie stacjonarnym i odwrotnie.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>Brak metki nie blokuje reklamacji — to wymóg przy zwrocie, nie przy reklamacji wadliwego towaru</li>
        <li>Reklamacja w Zara przysługuje przez 2 lata, nie 30 dni</li>
        <li>Pranie zgodne z instrukcją to normalne użytkowanie — wada po praniu to odpowiedzialność sprzedawcy</li>
        <li>Zara ma 14 dni na odpowiedź. Brak odpowiedzi = reklamacja uznana z mocy prawa</li>
        <li>Towar kupiony online możesz reklamować w sklepie stacjonarnym</li>
      </ul>
    </>
  );
}
