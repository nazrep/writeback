import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Kupiłeś towar na Allegro i sprzedawca odmawia reklamacji, twierdząc że "towar był sprawny przy wysyłce" albo że "minął termin"? Masz konkretne prawa — niezależnie od tego co pisze w regulaminie sprzedawcy.</p>

      <h2>Twoje prawa przy zakupie na Allegro</h2>
      <p>Kupując na Allegro od <strong>przedsiębiorcy</strong> (nie od osoby prywatnej — sprawdź czy sprzedawca ma NIP na profilu), chronią Cię przepisy ustawy o prawach konsumenta. Kluczowy jest <strong>art. 43b</strong>, który daje Ci 2 lata na zgłoszenie niezgodności towaru z umową.</p>
      <p>Przy zakupie od osoby prywatnej te przepisy nie obowiązują — ale możesz powołać się na wady rzeczy sprzedanej z Kodeksu cywilnego.</p>
      <p>Ogólne zasady składania reklamacji do sklepów internetowych opisujemy szczegółowo w artykule <Link href="/blog/reklamacja-sklep-internetowy" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">jak napisać skuteczną reklamację do sklepu internetowego</Link>.</p>

      <h2>Najczęstsze wymówki sprzedawców i jak je obalić</h2>

      <h3>"Towar był sprawny przy wysyłce"</h3>
      <p>Nie ma znaczenia. Zgodnie z art. 43b ust. 2 ustawy o prawach konsumenta, przez <strong>2 lata od wydania towaru</strong> domniemywa się że niezgodność istniała już w chwili dostarczenia. Sprzedawca musi udowodnić odwrotnie — nie Ty.</p>

      <h3>"Minął 30-dniowy termin reklamacji"</h3>
      <p>Nieprawda. Termin wynosi <strong>2 lata</strong> od daty zakupu. Sklep nie może go skrócić w regulaminie — takie postanowienie byłoby nieważne jako klauzula niedozwolona.</p>

      <h3>"Uszkodzenie mechaniczne — wina kupującego"</h3>
      <p>Sklep może tak twierdzić, ale musi to udowodnić. Samo stwierdzenie nie jest podstawą do odrzucenia reklamacji. Możesz zażądać uzasadnienia na piśmie.</p>

      <h2>Jak złożyć skuteczną reklamację do sprzedawcy na Allegro?</h2>
      <ol>
        <li>Skontaktuj się ze sprzedawcą przez <strong>system wiadomości Allegro</strong> (zostawia ślad)</li>
        <li>Wyślij <strong>formalne pismo</strong> z powołaniem na art. 43b ustawy o prawach konsumenta</li>
        <li>Określ czego żądasz: naprawy, wymiany lub zwrotu pieniędzy</li>
        <li>Zaznacz że brak odpowiedzi w <strong>14 dniach</strong> jest równoznaczny z uznaniem reklamacji (art. 7a)</li>
      </ol>
      <p>Nie chcesz pisać sam? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">writeback.pl generuje gotowe pismo z tymi przepisami</Link> w kilka minut — wybierz opcję "Reklamacja do sklepu internetowego".</p>

      <h2>Co jeśli sprzedawca nadal odmawia?</h2>
      <p>Masz kilka opcji:</p>
      <ul>
        <li><strong>Spór na Allegro</strong> — zgłoś sprawę przez system ochrony kupujących Allegro. Platforma może interweniować przy rażącym naruszeniu praw konsumenta.</li>
        <li><strong>Chargeback przez bank</strong> — jeśli płaciłeś kartą, możesz złożyć reklamację transakcji w banku. Bank cofa płatność jeśli sprzedawca nie wywiązał się z umowy. Więcej o <Link href="/blog/bank-odmawia-zwrotu" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">reklamacjach do banku</Link>.</li>
        <li><strong>Rzecznik Praw Konsumentów</strong> — bezpłatna pomoc przy każdym starostwie powiatowym.</li>
        <li><strong>Sąd polubowny przy Inspekcji Handlowej</strong> — bezpłatne postępowanie, sprzedawca musi wyrazić zgodę.</li>
      </ul>

      <h2>Czy Allegro odpowiada za sprzedawców?</h2>
      <p>Co do zasady nie — Allegro jest platformą, a umowę zawierasz ze sprzedawcą. Wyjątek: jeśli Allegro samo sprzedaje towar (jako "Allegro" nie jako marketplace), odpowiada jak każdy sklep.</p>
      <p>Allegro ma jednak <strong>Program Ochrony Kupujących</strong>, który może pomóc gdy sprzedawca jest nieuczciwy — szczegóły w regulaminie Allegro.</p>
    </>
  );
}
