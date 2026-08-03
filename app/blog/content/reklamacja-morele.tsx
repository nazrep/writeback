import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Zamówiłeś kartę graficzną na Morele.net, a po sześciu tygodniach pojawiły się artefakty na ekranie. Zgłosiłeś RMA przez panel klienta, serwis odpisał „brak wady — karta przetestowana, działa poprawnie" i odesłał ją bez naprawy. Co teraz? Masz prawa, które działają niezależnie od tego, co napisze serwis.</p>

      <h2>Twoje prawa przy reklamacji w Morele.net</h2>
      <p>Morele.net to przedsiębiorca — sprzedawca elektroniki z NIP-em i pełną odpowiedzialnością wobec konsumenta. Podstawa prawna to <strong>art. 43b ustawy o prawach konsumenta</strong>: kupiony sprzęt musi być zgodny z umową przez 2 lata od daty odbioru.</p>
      <p>Najważniejsze zasady:</p>
      <ul>
        <li><strong>2 lata</strong> na zgłoszenie niezgodności towaru z umową, liczone od daty otrzymania przesyłki (art. 43c ust. 1 UPK)</li>
        <li>Przez całe 2 lata obowiązuje <strong>domniemanie</strong>, że wada istniała w chwili dostarczenia — to sprzedawca musi udowodnić, że wada powstała z Twojej winy, nie odwrotnie</li>
        <li>Morele.net ma <strong>14 dni</strong> na odpowiedź na reklamację (art. 7a UPK). Brak odpowiedzi = reklamacja uznana z mocy prawa</li>
        <li>Możesz żądać naprawy, wymiany, obniżenia ceny lub zwrotu pieniędzy</li>
      </ul>
      <p>Szczegółowe omówienie tych przepisów znajdziesz w artykule <Link href="/blog/reklamacja-sklep-internetowy" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">jak napisać skuteczną reklamację do sklepu internetowego</Link>.</p>

      <h2>Gwarancja producenta a rękojmia — nie daj się przekierować</h2>
      <p>Morele.net często proponuje skorzystanie z gwarancji producenta zamiast rozpatrywać reklamację samodzielnie. To Twoje prawo wyboru — <strong>nie musisz się na to zgadzać</strong>. Reklamacja z tytułu niezgodności towaru z umową (art. 43b UPK) kierowana jest do sprzedawcy, nie do producenta.</p>
      <p>Gwarancja producenta to dobrowolne zobowiązanie — może mieć krótszy termin, węższy zakres i własne warunki. Rękojmia ustawowa to Twoje minimum, którego żaden regulamin nie może ograniczyć (art. 43j UPK).</p>
      <p>W praktyce: jeśli gwarancja producenta jest korzystniejsza (np. szybsza wymiana), korzystaj z niej. Jeśli nie — powoł się na ustawę i żądaj rozpatrzenia przez Morele.net bezpośrednio.</p>

      <h2>Typowe wymówki Morele.net i jak je obalić</h2>

      <h3>{'"Serwis nie stwierdził wady"'}</h3>
      <p>Wynik diagnostyki serwisu Morele.net to opinia sprzedawcy, nie wyrok sądu. Masz prawo zakwestionować tę opinię. Zażądaj pisemnego raportu z diagnostyki — co dokładnie testowano, w jakich warunkach, jakim sprzętem. Jeśli wada jest przerywana (artefakty, zawieszanie się), serwis mógł jej po prostu nie odtworzyć w krótkim teście. Powołaj się na art. 43c ust. 1: to sprzedawca musi udowodnić brak wady, nie Ty musisz udowodnić jej istnienie.</p>

      <h3>{'"Uszkodzenie mechaniczne, wina użytkownika"'}</h3>
      <p>Samo stwierdzenie nie wystarczy. Sprzedawca musi to udowodnić, np. przedstawiając ekspertyzę wskazującą na konkretne ślady uszkodzenia mechanicznego. Jeśli nie ma zewnętrznych uszkodzeń obudowy, zarzut uszkodzenia mechanicznego jest bezpodstawny. Zażądaj uzasadnienia na piśmie.</p>

      <h3>{'"Minął termin 14 dni na zwrot"'}</h3>
      <p>Prawo do zwrotu towaru w ciągu 14 dni od dostawy (odstąpienie od umowy zawartej na odległość) to coś innego niż reklamacja. Reklamacja z tytułu niezgodności towaru z umową przysługuje przez 2 lata. Te dwa uprawnienia są niezależne.</p>

      <h3>{'"Proszę skontaktować się z producentem"'}</h3>
      <p>Nie musisz. Art. 43d ust. 1 UPK jasno wskazuje, że to sprzedawca ponosi odpowiedzialność za niezgodność towaru z umową. Morele.net nie może się od niej uchylić kierując Cię do producenta. Możesz to zrobić dobrowolnie, ale nie masz takiego obowiązku.</p>

      <h2>Krok po kroku: jak złożyć reklamację w Morele.net</h2>

      <h3>Krok 1: zgłoś RMA przez panel klienta</h3>
      <p>Zaloguj się na morele.net, przejdź do zamówień i wybierz „Zgłoś reklamację" przy danym produkcie. Opisz wadę dokładnie — kiedy się pojawia, jak często, w jakich warunkach. Dołącz zdjęcia lub nagranie wideo, jeśli wada jest wizualna. System nada numer RMA.</p>

      <h3>Krok 2: wyślij formalne pismo reklamacyjne</h3>
      <p>Jeśli RMA online zostało odrzucone lub odpowiedź jest niesatysfakcjonująca, wyślij formalne pismo reklamacyjne na adres email lub pocztowy Morele.net. Pismo powinno zawierać:</p>
      <ul>
        <li>Twoje dane i numer zamówienia</li>
        <li>Opis produktu, datę zakupu i numer RMA (jeśli był)</li>
        <li>Dokładny opis wady i żądanie (naprawa, wymiana lub zwrot pieniędzy)</li>
        <li>Powołanie na <strong>art. 43b i 43d ustawy o prawach konsumenta</strong></li>
        <li>Informację, że brak odpowiedzi w 14 dniach oznacza uznanie reklamacji (art. 7a UPK)</li>
      </ul>
      <p>Nie chcesz pisać samemu? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback wygeneruje profesjonalne pismo reklamacyjne</Link> w kilka minut — z powołaniem na właściwe przepisy i dostosowane do Morele.net.</p>

      <h3>Krok 3: co robić gdy reklamacja zostanie odrzucona</h3>
      <p>Jeśli Morele.net odrzuci reklamację, masz kilka opcji. Możesz złożyć <Link href="/blog/skarga-do-uokik" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">skargę do Rzecznika Praw Konsumentów lub UOKiK</Link>. Możesz też napisać kolejne pismo z żądaniem obniżenia ceny lub odstąpienia od umowy na podstawie art. 43e ust. 1 UPK — szczególnie jeśli naprawa była nieskuteczna lub sprzedawca odmówił naprawy. Więcej o tym w artykule <Link href="/blog/reklamacja-odrzucona" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">co zrobić gdy reklamacja została odrzucona</Link>.</p>

      <h2>Diagnostyka zdalna — kiedy to wystarczy, a kiedy nie</h2>
      <p>Morele.net czasem proponuje zdalną diagnostykę — np. aktualizację sterowników, reset BIOS, test na innym komputerze. To rozsądne kroki, ale nie mogą zastąpić reklamacji. Jeśli wykonałeś wszystkie sugerowane czynności i wada nadal występuje, masz pełne prawo do formalnej reklamacji. Zachowaj screenshoty korespondencji — dokumentują, że wada jest potwierdzona i nie wynika z Twojej konfiguracji.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>Morele.net odpowiada za niezgodność towaru z umową przez 2 lata — niezależnie od gwarancji producenta</li>
        <li>Odrzucenie RMA nie kończy sprawy — wyślij formalne pismo z powołaniem na art. 43b UPK</li>
        <li>Sprzedawca ma 14 dni na odpowiedź. Brak odpowiedzi = reklamacja uznana</li>
        <li>Nie musisz kontaktować się z producentem — to sprzedawca jest stroną Twojej umowy</li>
        <li>Serwis „nie stwierdził wady"? Zażądaj raportu diagnostycznego i zakwestionuj go na piśmie</li>
      </ul>
    </>
  );
}
