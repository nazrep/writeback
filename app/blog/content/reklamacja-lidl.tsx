import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Kupiłeś w Lidlu blender za 149 zł z gazetki promocyjnej. Po dwóch miesiącach silnik zaczął iskrzyć i urządzenie się wyłącza. W sklepie powiedzieli: „sprzęt z oferty tygodniowej nie podlega reklamacji, bo był w promocji". To nieprawda — cena nie ma żadnego wpływu na Twoje prawa reklamacyjne.</p>

      <h2>Twoje prawa przy reklamacji w Lidlu</h2>
      <p>Lidl sp. z o.o. sp. k. to przedsiębiorca — odpowiada za każdy sprzedawany produkt na podstawie <strong>art. 43b ustawy o prawach konsumenta</strong>. Dotyczy to zarówno produktów spożywczych, jak i sprzętu z ofert tygodniowych (elektronika, AGD, narzędzia, odzież).</p>
      <ul>
        <li><strong>2 lata</strong> na zgłoszenie niezgodności towaru z umową (art. 43c ust. 1 UPK)</li>
        <li>Domniemanie, że wada istniała w chwili sprzedaży — to Lidl musi udowodnić, że produkt był prawidłowy</li>
        <li><strong>14 dni</strong> na odpowiedź na reklamację (art. 7a UPK). Brak odpowiedzi = uznanie</li>
        <li>Możesz żądać naprawy, wymiany, obniżenia ceny lub zwrotu pieniędzy</li>
      </ul>

      <h2>Oferta tygodniowa — te same prawa co na produkt z regularnej oferty</h2>
      <p>Lidl regularnie sprzedaje sprzęt AGD, elektronikę, narzędzia i odzież w ramach ofert tygodniowych. Kasjerzy i kierownicy sklepów często nie wiedzą, jak rozpatrzyć reklamację takiego produktu — bo „to nie jest stały asortyment". Ale przepisy są jasne: każdy produkt sprzedany przez Lidl podlega identycznym zasadom reklamacji, niezależnie od tego, czy był w ofercie stałej, tygodniowej, czy wyprzedażowej.</p>

      <h2>Produkty spożywcze — szczególny przypadek</h2>
      <p>Kupiony w Lidlu jogurt po otwarciu okazał się spleśniały mimo nieprzekroczonej daty ważności? Znalazłeś ciało obce w pieczywie? To niezgodność towaru z umową. Przy produktach spożywczych:</p>
      <ul>
        <li>Zachowaj produkt (nie wyrzucaj!) — to Twój dowód</li>
        <li>Zrób zdjęcia wady, opakowania i daty ważności</li>
        <li>Zachowaj paragon — przy produktach spożywczych to kluczowy dowód, bo trudniej je zidentyfikować bez niego</li>
        <li>Przy zagrożeniu zdrowotnym (ciała obce, pleśń, insekty) — zgłoś do Sanepidu oprócz reklamacji</li>
      </ul>

      <h2>Typowe wymówki Lidla i jak je obalić</h2>

      <h3>{'"Produkt z oferty tygodniowej, nie podlega reklamacji"'}</h3>
      <p>Nie istnieje żadna kategoria prawna „oferty tygodniowej" wyłączająca prawa konsumenta. Art. 43b UPK dotyczy każdego towaru sprzedanego przez przedsiębiorcę — niezależnie od rodzaju oferty. Lidl jako sprzedawca odpowiada za wszystkie sprzedawane produkty.</p>

      <h3>{'"Produkt był w promocji, cena była niższa"'}</h3>
      <p>Cena nie wpływa na prawa reklamacyjne. Konsument kupujący w promocji ma identyczne prawa jak kupujący w cenie regularnej. Art. 43j UPK zabrania ograniczania praw konsumenta — jakikolwiek regulamin lub warunek sklepowy, który to robi, jest nieważny.</p>

      <h3>{'"Nie mamy tego produktu w asortymencie, nie możemy wymienić"'}</h3>
      <p>Jeśli wymiana jest niemożliwa (bo produkt był w ofercie limitowanej), masz prawo żądać obniżenia ceny lub pełnego zwrotu pieniędzy na podstawie art. 43e ust. 3 UPK. Niemożliwość wymiany nie oznacza braku opcji — to przesłanka do zwrotu.</p>

      <h3>{'"Proszę o kontakt z producentem"'}</h3>
      <p>Sprzedawca (Lidl) odpowiada wobec konsumenta za niezgodność towaru z umową niezależnie od producenta (art. 43d ust. 1 UPK). Nie musisz kontaktować się z producentem produktu z oferty Lidla — to Lidl jest stroną Twojej umowy.</p>

      <h2>Krok po kroku: jak złożyć reklamację w Lidlu</h2>

      <h3>Krok 1: reklamacja w sklepie</h3>
      <p>Przynieś wadliwy produkt do sklepu Lidl, w którym go kupiłeś. Poproś kierownika o przyjęcie reklamacji i wydanie potwierdzenia z datą. Lidl powinien wyznaczyć sposób dostarczenia produktu do serwisu (jeśli dotyczy sprzętu). Od daty przyjęcia reklamacji biegnie 14-dniowy termin na odpowiedź.</p>

      <h3>Krok 2: reklamacja przez obsługę klienta</h3>
      <p>Jeśli reklamacja w sklepie nie przyniosła rezultatu, skontaktuj się z centralą obsługi klienta Lidl Polska — przez formularz na stronie lidl.pl, telefonicznie lub pisemnie na adres siedziby. Podaj datę zakupu, adres sklepu, opis produktu i wady, i swoje żądanie.</p>

      <h3>Krok 3: formalne pismo reklamacyjne</h3>
      <p>Jeśli Lidl odrzucił reklamację, wyślij formalne pismo. Powinno zawierać:</p>
      <ul>
        <li>Twoje dane, datę zakupu, adres sklepu</li>
        <li>Opis produktu i szczegółowy opis wady</li>
        <li>Powołanie na <strong>art. 43b ustawy o prawach konsumenta</strong></li>
        <li>Żądanie: zwrot pieniędzy, wymiana lub obniżenie ceny</li>
        <li>Informacja o 14-dniowym terminie odpowiedzi (art. 7a UPK)</li>
      </ul>
      <p>Nie chcesz pisać samemu? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback wygeneruje profesjonalne pismo reklamacyjne</Link> w kilka minut — z powołaniem na właściwe przepisy.</p>

      <h3>Krok 4: co dalej przy odmowie</h3>
      <p>Jeśli Lidl odrzuci reklamację: <Link href="/blog/skarga-do-uokik" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">skarga do Rzecznika Praw Konsumentów</Link> (bezpłatna pomoc), zgłoszenie do Inspekcji Handlowej, a przy produktach spożywczych zagrażających zdrowiu — do Sanepidu. Więcej: <Link href="/blog/reklamacja-odrzucona" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">co zrobić gdy reklamacja została odrzucona</Link>.</p>

      <h2>Lidl Plus — aplikacja jako dowód zakupu</h2>
      <p>Jeśli korzystasz z aplikacji Lidl Plus, Twoje paragony są zapisywane cyfrowo. To pełnowartościowy dowód zakupu przy reklamacji — nie potrzebujesz papierowego paragonu. Pokaż e-paragon z aplikacji w sklepie lub dołącz go do pisma reklamacyjnego.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>Produkty z oferty tygodniowej Lidla podlegają dokładnie tym samym zasadom reklamacji co reszta asortymentu</li>
        <li>Cena promocyjna nie ogranicza praw konsumenta w żadnym stopniu</li>
        <li>Brak produktu w bieżącym asortymencie to przesłanka do zwrotu pieniędzy, nie odmowy reklamacji</li>
        <li>Lidl ma 14 dni na odpowiedź. Brak odpowiedzi = reklamacja uznana z mocy prawa</li>
        <li>Lidl Plus zapisuje paragony cyfrowo — to wystarczający dowód zakupu</li>
      </ul>
    </>
  );
}
