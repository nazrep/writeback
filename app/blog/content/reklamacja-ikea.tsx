import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Kupiłeś komodę w IKEA, po trzech miesiącach szuflada zaczęła się zacinać i front odchodzi od korpusu. Złożyłeś reklamację, a pracownik powiedział, że „meble trzeba dokręcić, to normalne". Czy naprawdę musisz to zaakceptować? Nie — masz prawo do reklamacji przez 2 lata, a IKEA ma swoje dodatkowe zobowiązania.</p>

      <h2>Polityka zwrotów IKEA vs prawa ustawowe</h2>
      <p>IKEA ma jedną z najhojniejszych polityk zwrotów na rynku — <strong>365 dni na zwrot</strong> większości produktów z paragonem (90 dni bez paragonu, z kartą IKEA Family). To wewnętrzna polityka IKEA, nie prawo. Ale obok niej działają Twoje prawa ustawowe:</p>
      <ul>
        <li><strong>Zwrot w 365 dni</strong> — polityka IKEA: możesz zwrócić towar nawet bez wady, pod warunkiem że jest nieużywany i w oryginalnym opakowaniu</li>
        <li><strong>Reklamacja (2 lata)</strong> — Twoje ustawowe prawo z <strong>art. 43b UPK</strong>: zgłaszasz wadę towaru niezgodnego z umową</li>
      </ul>
      <p>Po upływie 365 dni nadal masz prawo do reklamacji — aż do 2 lat od zakupu. IKEA nie może tego skrócić.</p>

      <h2>Twoje prawa przy zakupie w IKEA</h2>
      <p>IKEA Retail sp. z o.o. z siedzibą w Jankach jest przedsiębiorcą — obowiązują pełne prawa konsumenta:</p>
      <ul>
        <li><strong>2 lata</strong> na zgłoszenie niezgodności towaru z umową (art. 43c ust. 1 UPK)</li>
        <li>Domniemanie, że wada istniała w chwili dostarczenia — to IKEA musi udowodnić, że wada powstała z Twojej winy</li>
        <li><strong>14 dni</strong> na odpowiedź na reklamację (art. 7a UPK). Brak odpowiedzi = uznanie</li>
        <li>Możesz żądać naprawy, wymiany, obniżenia ceny lub zwrotu pieniędzy (art. 43d i 43e UPK)</li>
      </ul>

      <h2>Typowe problemy z produktami IKEA i jak je reklamować</h2>

      <h3>Zarysowania i uszkodzenia w transporcie</h3>
      <p>Jeśli meble przyjechały zarysowane lub uszkodzone, zgłoś to najszybciej jak możliwe. Zrób zdjęcia opakowań i uszkodzeń. Jeśli zamawiałeś z dostawą IKEA, reklamujesz u IKEA, nie u kuriera — to sprzedawca odpowiada za towar do momentu dostarczenia.</p>

      <h3>Brakujące elementy w paczce</h3>
      <p>Brak śrub, kołków lub elementów to niezgodność towaru z umową — produkt nie ma cech, które powinien mieć zgodnie z opisem. Zgłoś braki w IKEA: w większości przypadków dośle brakujące elementy bezpłatnie, bez konieczności zwrotu całego produktu.</p>

      <h3>Wady ujawniające się po kilku miesiącach</h3>
      <p>Szuflada, która zacina się po 3 miesiącach normalnego użytkowania, nie jest „normalnym zużyciem". Zgodnie z art. 43c ust. 1 UPK, przez 2 lata domniemywa się, że wada istniała w chwili dostarczenia. IKEA musi udowodnić, że to Ty spowodowałeś wadę, a nie że „meble trzeba dokręcić".</p>

      <h2>Typowe wymówki IKEA i jak je obalić</h2>

      <h3>„To normalne zużycie materiału"</h3>
      <p>Meble kupione 4 miesiące temu, które się rozpadają przy normalnym użytkowaniu, nie wykazują „normalnego zużycia". Towar musi zachować trwałość, jakiej konsument może rozsądnie oczekiwać (art. 43b ust. 2 pkt 3 UPK). Półka, która ugina się pod książkami, nie spełnia tego kryterium.</p>

      <h3>„Mebel był nieprawidłowo zmontowany"</h3>
      <p>Jeśli meble montowałeś sam zgodnie z instrukcją IKEA, wada montażu nie jest Twoją winą — to wadliwa instrukcja lub wadliwe elementy. Jeśli montaż wykonywała ekipa IKEA, odpowiedzialność jest bezsporna: to IKEA odpowiada za prawidłowy montaż.</p>

      <h3>„Proszę skontaktować się z producentem"</h3>
      <p>IKEA jest sprzedawcą i odpowiada za niezgodność towaru z umową niezależnie od tego, kto jest producentem. Nie musi Cię odsyłać do producenta (art. 43b UPK). Wybór między gwarancją producenta a reklamacją u sprzedawcy należy do Ciebie.</p>

      <h2>Krok po kroku: jak złożyć reklamację w IKEA</h2>

      <h3>Krok 1: skontaktuj się z IKEA</h3>
      <p>Masz trzy opcje:</p>
      <ul>
        <li><strong>Online</strong> — formularz na ikea.pl w sekcji Pomoc → Zwroty i reklamacje</li>
        <li><strong>Telefonicznie</strong> — infolinia IKEA</li>
        <li><strong>W sklepie</strong> — dział Zwrotów i Reklamacji (przywieź paragon i wadliwy element)</li>
      </ul>

      <h3>Krok 2: wyślij formalne pismo reklamacyjne</h3>
      <p>Jeśli IKEA odmawia lub odpowiada ogólnikami, wyślij formalne pismo. Powinno zawierać:</p>
      <ul>
        <li>Twoje dane i numer paragonu lub zamówienia online</li>
        <li>Nazwę produktu i datę zakupu</li>
        <li>Szczegółowy opis wady ze zdjęciami</li>
        <li>Powołanie na <strong>art. 43b i 43c ustawy o prawach konsumenta</strong></li>
        <li>Konkretne żądanie: naprawa, wymiana, obniżenie ceny lub zwrot</li>
        <li>Informację o 14-dniowym terminie odpowiedzi (art. 7a UPK)</li>
      </ul>
      <p>Nie chcesz pisać samemu? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback wygeneruje gotowe pismo</Link> z podstawami prawnymi dopasowanymi do IKEA.</p>

      <h3>Krok 3: gdy IKEA nadal odmawia</h3>
      <p>Jeśli formalne pismo nie przyniosło rezultatu, masz dwie drogi:</p>
      <ul>
        <li><Link href="/blog/skarga-do-uokik" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Skarga do Rzecznika Praw Konsumentów</Link> — bezpłatna pomoc w mediacji ze sprzedawcą</li>
        <li>Pozew do sądu — przy wartości sporu do 20 000 zł opłata wynosi od 30 do 1 000 zł</li>
      </ul>

      <h2>Reklamacja usługi montażu IKEA</h2>
      <p>Jeśli zamówiłeś montaż przez IKEA (usługa TaskRabbit lub montaż IKEA), a meble zostały źle zmontowane, reklamujesz usługę montażu. Podstawa prawna to <Link href="/blog/reklamacja-uslugi" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">reklamacja usługi</Link> — art. 43b UPK stosuje się analogicznie do usług.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>365-dniowy zwrot IKEA to bonus — prawa reklamacyjne trwają 2 lata niezależnie</li>
        <li>IKEA odpowiada za wady towaru jako sprzedawca (art. 43b UPK)</li>
        <li>„Normalne zużycie" po kilku miesiącach to brak trwałości, nie Twoja wina</li>
        <li>14 dni na odpowiedź — brak odpowiedzi = reklamacja uznana (art. 7a)</li>
        <li>Wadliwy montaż IKEA to odpowiedzialność IKEA, nie Twoja</li>
      </ul>

      <p>Jeśli Twoja reklamacja została odrzucona, przeczytaj <Link href="/blog/reklamacja-odrzucona" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">co zrobić gdy reklamacja została odrzucona</Link>.</p>
    </>
  );
}
