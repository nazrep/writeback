import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Kupiłaś krem do twarzy w Rossmannie, użyłaś zgodnie z instrukcją, a po dwóch dniach skóra zaczęła się łuszczyć i swędzieć. W sklepie powiedzieli: „kosmetyki nie podlegają zwrotowi ze względów higienicznych". Ale Ty nie chcesz zwracać — chcesz reklamować produkt, który spowodował reakcję alergiczną mimo braku ostrzeżenia na opakowaniu. To Twoje prawo i Rossmann nie może go ograniczyć.</p>

      <h2>Twoje prawa przy reklamacji w Rossmannie</h2>
      <p>Rossmann Supermarkety Drogeryjne Polska Sp. z o.o. to przedsiębiorca — odpowiada za sprzedawane produkty na podstawie <strong>art. 43b ustawy o prawach konsumenta</strong>. Dotyczy to kosmetyków, chemii domowej, suplementów i wszystkich innych produktów w ofercie.</p>
      <ul>
        <li><strong>2 lata</strong> na zgłoszenie niezgodności towaru z umową (art. 43c ust. 1 UPK)</li>
        <li>Domniemanie, że wada istniała w chwili sprzedaży — to Rossmann musi udowodnić, że produkt był prawidłowy</li>
        <li><strong>14 dni</strong> na odpowiedź na reklamację (art. 7a UPK). Brak odpowiedzi = uznanie</li>
        <li>Możesz żądać wymiany, obniżenia ceny lub zwrotu pieniędzy</li>
      </ul>

      <h2>Kiedy kosmetyk jest wadliwy — co kwalifikuje się do reklamacji</h2>
      <p>Nie każde niezadowolenie z kosmetyku to podstawa do reklamacji. Ale te sytuacje jak najbardziej:</p>
      <ul>
        <li><strong>Reakcja alergiczna</strong> przy braku ostrzeżenia na opakowaniu o alergenach</li>
        <li><strong>Produkt przeterminowany</strong> — data ważności minęła przed datą zakupu lub w krótkim czasie po nim</li>
        <li><strong>Wada opakowania</strong> — pompka nie działa, tubka pęknięta, zamknięcie nieszczelne</li>
        <li><strong>Skład niezgodny z etykietą</strong> — kolor, konsystencja lub zapach wyraźnie odbiegają od deklaracji producenta</li>
        <li><strong>Produkt niedziałający</strong> — farba do włosów nie barwi, lakier schodzi po jednym dniu mimo prawidłowej aplikacji</li>
      </ul>

      <h2>Typowe wymówki Rossmann i jak je obalić</h2>

      <h3>{'"Kosmetyki nie podlegają zwrotowi"'}</h3>
      <p>To dotyczy prawa do odstąpienia od umowy (zwrotu bez przyczyny) przy zakupach online — rzeczywiście, otwarte kosmetyki są wyłączone z tego prawa ze względów higienicznych (art. 38 pkt 5 UPK). Ale <strong>reklamacja wadliwego produktu to zupełnie coś innego</strong>. Wadliwy kosmetyk — przeterminowany, powodujący reakcję mimo braku ostrzeżenia, z uszkodzonym opakowaniem — podlega reklamacji przez 2 lata.</p>

      <h3>{'"To indywidualna reakcja skóry, nie wada produktu"'}</h3>
      <p>Jeśli produkt nie zawierał na opakowaniu ostrzeżenia o potencjalnych alergenach lub zalecenia testu skórnego, brak takiej informacji to niezgodność z umową — produkt nie spełnia wymogów bezpieczeństwa. Jeśli ostrzeżenie było, a Ty je pominęłaś, sprawa jest trudniejsza, ale warto sprawdzić, czy ostrzeżenie było wystarczająco widoczne i zrozumiałe.</p>

      <h3>{'"Produkt był w promocji, nie podlega reklamacji"'}</h3>
      <p>Cena nie ma żadnego wpływu na prawa reklamacyjne. Produkt kupiony w promocji, z wyprzedaży czy z kuponem rabatowym podlega dokładnie takim samym przepisom jak produkt w cenie regularnej.</p>

      <h3>{'"Proszę kontaktować się z producentem"'}</h3>
      <p>Sprzedawca (Rossmann) odpowiada wobec konsumenta za niezgodność towaru z umową niezależnie od producenta (art. 43d ust. 1 UPK). Nie musisz kontaktować się z producentem — możesz, ale nie masz takiego obowiązku.</p>

      <h2>Krok po kroku: jak złożyć reklamację w Rossmannie</h2>

      <h3>Krok 1: zachowaj dowody</h3>
      <p>Zachowaj produkt (nawet otwarty), paragon lub wyciąg z karty, oraz zrób zdjęcia wady — np. pękniętego opakowania, przeterminowanej daty, reakcji skórnej. Jeśli masz reakcję alergiczną, zrób zdjęcia zmian skórnych i rozważ wizytę u dermatologa — zaświadczenie lekarskie wzmocni Twoją reklamację.</p>

      <h3>Krok 2: reklamacja w sklepie stacjonarnym</h3>
      <p>Przynieś wadliwy produkt do sklepu Rossmann, w którym go kupiłaś. Opisz problem i poproś o protokół reklamacyjny. Kierownik sklepu powinien przyjąć reklamację i wydać Ci kopię zgłoszenia z datą. Od tego dnia Rossmann ma 14 dni na odpowiedź.</p>
      <p>Jeśli kierownik odmawia przyjęcia reklamacji, poproś o pisemne uzasadnienie odmowy i zapowiedz, że wyślesz formalne pismo na adres centrali.</p>

      <h3>Krok 3: formalne pismo reklamacyjne</h3>
      <p>Jeśli reklamacja w sklepie nie przyniosła rezultatu, wyślij pismo na adres centrali Rossmann Polska. Pismo powinno zawierać:</p>
      <ul>
        <li>Twoje dane, datę zakupu, adres sklepu</li>
        <li>Opis produktu (nazwa, numer partii jeśli widoczny na opakowaniu)</li>
        <li>Dokładny opis wady — reakcja alergiczna, przeterminowanie, uszkodzenie opakowania</li>
        <li>Powołanie na <strong>art. 43b ustawy o prawach konsumenta</strong></li>
        <li>Żądanie: zwrot pieniędzy, wymiana lub obniżenie ceny</li>
        <li>Informacja o 14-dniowym terminie (art. 7a UPK)</li>
      </ul>
      <p>Nie chcesz pisać samemu? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback wygeneruje profesjonalne pismo reklamacyjne</Link> w kilka minut — z powołaniem na właściwe przepisy.</p>

      <h3>Krok 4: co dalej przy odmowie</h3>
      <p>Jeśli Rossmann odrzuci reklamację, masz kilka opcji: <Link href="/blog/skarga-do-uokik" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">skarga do Rzecznika Praw Konsumentów</Link> (bezpłatna pomoc), zgłoszenie do Inspekcji Handlowej (szczególnie przy produktach przeterminowanych) lub do Sanepidu (przy produktach powodujących zagrożenie zdrowotne). Więcej: <Link href="/blog/reklamacja-odrzucona" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">co zrobić gdy reklamacja została odrzucona</Link>.</p>

      <h2>Produkt przeterminowany — szczególny przypadek</h2>
      <p>Jeśli kupiłaś w Rossmannie produkt, którego data ważności już minęła (lub minie w ciągu kilku dni od zakupu), to ewidentna niezgodność towaru z umową. Produkt nie nadaje się do celu, do którego miał służyć. Masz prawo do natychmiastowego zwrotu pieniędzy. Dodatkowo warto zgłosić to do Inspekcji Handlowej — sprzedaż przeterminowanych produktów to naruszenie, za które Rossmann może ponieść konsekwencje.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>Kosmetyki jak najbardziej podlegają reklamacji — wyłączenie dotyczy tylko zwrotu otwartych kosmetyków bez przyczyny</li>
        <li>Reakcja alergiczna bez ostrzeżenia na opakowaniu to podstawa do reklamacji</li>
        <li>Produkt przeterminowany to ewidentna wada — żądaj natychmiastowego zwrotu</li>
        <li>Rossmann ma 14 dni na odpowiedź. Brak odpowiedzi = reklamacja uznana z mocy prawa</li>
        <li>Przy problemach zdrowotnych — wizyta u lekarza i zaświadczenie wzmacniają Twoją pozycję</li>
      </ul>
    </>
  );
}
