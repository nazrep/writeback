import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Kupiłeś w Kauflandzie grilla gazowego z oferty tygodnia za 279 zł. Trzy tygodnie później palnik przestał się zapalać. W punkcie obsługi klienta usłyszałeś: „to towar sezonowy, sezon grillowy się kończy, nie przyjmujemy już takich zwrotów". To zdanie nie ma żadnego oparcia w przepisach — sezonowość produktu nie ma nic wspólnego z Twoim prawem do reklamacji.</p>

      <h2>Twoje prawa przy reklamacji w Kauflandzie</h2>
      <p>Kaufland to przedsiębiorca prowadzący sprzedaż detaliczną — jako sprzedawca odpowiada za każdy towar, który wystawił na półce, niezależnie od tego, czy to bochenek chleba z własnej piekarni, filet z lady rybnej czy kosiarka z oferty tygodnia. Podstawą Twoich praw jest <strong>art. 43b ustawy o prawach konsumenta (UPK)</strong> — towar musi być zgodny z umową.</p>
      <ul>
        <li><strong>2 lata</strong> na zgłoszenie niezgodności towaru z umową, licząc od dnia otrzymania towaru (art. 43c ust. 1 UPK)</li>
        <li>Przez cały ten okres obowiązuje domniemanie, że wada istniała już w momencie sprzedaży — to Kaufland musi wykazać, że towar był sprawny, a nie Ty musisz udowadniać wadę</li>
        <li><strong>14 dni</strong> na rozpatrzenie reklamacji (art. 7a UPK). Brak odpowiedzi w tym terminie oznacza uznanie reklamacji z mocy prawa</li>
        <li>Możesz żądać naprawy, wymiany, obniżenia ceny lub zwrotu pieniędzy — wybór między naprawą a wymianą należy do Ciebie (art. 43d ust. 1 UPK)</li>
      </ul>

      <h2>Oferta tygodnia — sprzęt, ogród, dom: te same zasady</h2>
      <p>Poza stałym asortymentem spożywczym Kaufland co tydzień wprowadza nową partię produktów non-food: elektronarzędzia, sprzęt AGD, artykuły ogrodowe, baseny, grille, akcesoria sportowe czy sezonowe dekoracje. To właśnie przy tych produktach najczęściej pojawia się wymówka „to była jednorazowa dostawa, produktu już nie ma w sklepie, nie możemy pomóc". Prawnie nie ma to znaczenia — art. 43b UPK obejmuje każdy towar sprzedany przez przedsiębiorcę, bez względu na to, czy trafia do stałej oferty, czy pojawia się na jeden tydzień. Jeśli dany model nie jest już dostępny, Kaufland nie może po prostu odmówić — musi zaproponować obniżenie ceny lub zwrot pieniędzy (art. 43e ust. 1 UPK), bo wymiana na taki sam egzemplarz jest niemożliwa.</p>
      <p>To samo dotyczy sprzętu ogrodowego i letniego, kupowanego właśnie teraz, w sierpniu — baseny rozporowe, kosiarki, klimatyzatory przenośne czy wspomniane grille. „Koniec sezonu" nie jest podstawą prawną do odmowy reklamacji. Termin 2 lat biczy się od daty zakupu, nie od kalendarza pogodowego.</p>

      <h2>Lada mięsna, rybna i piekarnia — reklamacja towaru na wagę</h2>
      <p>Kaufland, w odróżnieniu od dyskontów typu Lidl czy Biedronka, prowadzi w większości marketów tradycyjne lady z obsługą — mięsną, wędliniarską, rybną i piekarniczą. To rodzi specyficzne sytuacje reklamacyjne, których nie znajdziesz przy towarze paczkowanym:</p>
      <ul>
        <li><strong>Nieświeże mięso lub ryba kupione na wagę</strong> — jeśli po otwarciu w domu produkt ma nieprzyjemny zapach, śliską strukturę lub zmieniony kolor mimo zachowanej daty przydatności, to niezgodność towaru z umową. Zachowaj resztki produktu (w lodówce lub zamrażarce) oraz opakowanie z etykietą wagową — to Twój dowód.</li>
        <li><strong>Błędna waga lub cena na paragonie</strong> — przy sprzedaży na wagę zdarzają się pomyłki kasy wagowej. Poproś o korektę na miejscu, a jeśli sklep odmawia, żądaj pisemnego wyjaśnienia rozbieżności.</li>
        <li><strong>Pieczywo z piekarni Kaufland</strong> — twarde, niedopieczone lub z ciałem obcym w środku (np. fragmentem opakowania czy metalu) to podstawa do reklamacji, nawet jeśli produkt kosztował 4 zł. Cena jednostkowa nie ma znaczenia dla obowiązku sprzedawcy.</li>
      </ul>
      <p>Przy produktach spożywczych kluczowy jest paragon lub e-paragon z aplikacji Kaufland Card — bez dowodu zakupu trudniej zidentyfikować konkretną transakcję, szczególnie przy towarze sprzedawanym na wagę. Jeśli podejrzewasz zagrożenie zdrowia (zepsute mięso, pleśń, ciało obce), zgłoś sprawę równolegle do Sanepidu — to niezależna droga od reklamacji cywilnoprawnej.</p>

      <h2>Typowe wymówki w Kauflandzie i jak je obalić</h2>

      <h3>{'"To produkt sezonowy, sezon się skończył"'}</h3>
      <p>Sezonowość towaru (grille, baseny, dekoracje świąteczne) nie skraca ustawowego terminu reklamacji. Masz 2 lata od daty zakupu, niezależnie od tego, czy sklep nadal sprzedaje dany produkt czy już zdjął go z półek.</p>

      <h3>{'"To była jednorazowa oferta tygodnia, nie mamy tego na stanie"'}</h3>
      <p>Brak towaru w bieżącym asortymencie nie jest podstawą do odmowy — to przesłanka do obniżenia ceny lub pełnego zwrotu pieniędzy, jeśli wymiana na identyczny egzemplarz jest niemożliwa (art. 43e ust. 1 UPK).</p>

      <h3>{'"Proszę o kontakt z producentem, my tylko sprzedajemy"'}</h3>
      <p>Nie musisz. Art. 43d ust. 1 UPK jasno stawia obowiązek naprawy lub wymiany po stronie sprzedawcy, czyli Kauflandu — niezależnie od tego, czy istnieje osobna gwarancja producenta. Gwarancja to opcja dodatkowa, nie substytut Twoich praw ustawowych.</p>

      <h3>{'"Kupił Pan/Pani na wagę, nie da się tego zweryfikować"'}</h3>
      <p>Zdjęcia produktu, opakowania z etykietą wagową oraz paragon z konkretną godziną zakupu są wystarczającym dowodem. Sklep nie może odmówić reklamacji tylko dlatego, że towar był sprzedawany luzem, a nie w fabrycznym opakowaniu.</p>

      <h3>{'"Minęło 30 dni, nasza polityka zwrotów już nie obowiązuje"'}</h3>
      <p>Wewnętrzna polityka zwrotów (np. 30- czy 60-dniowa) to dobrowolna oferta handlowa sklepu, całkowicie odrębna od ustawowej reklamacji. Zgodnie z art. 43j UPK żaden regulamin sklepowy nie może skracać 2-letniego terminu odpowiedzialności sprzedawcy — taki zapis jest bezskuteczny wobec konsumenta.</p>

      <h2>Krok po kroku: jak złożyć skuteczną reklamację w Kauflandzie</h2>

      <h3>Krok 1: zgłoszenie w markecie</h3>
      <p>Zanieś towar (lub jego pozostałość przy produktach spożywczych) do punktu obsługi klienta w markecie Kaufland, w którym dokonałeś zakupu. Poproś o pisemne potwierdzenie przyjęcia reklamacji z datą — od tego dnia liczy się 14-dniowy termin na odpowiedź.</p>

      <h3>Krok 2: kontakt z centralą, jeśli market odmawia</h3>
      <p>Jeśli personel na miejscu odmawia przyjęcia reklamacji lub nie potrafi jej rozpatrzyć, skontaktuj się z Działem Obsługi Klienta Kaufland Polska — przez formularz na kaufland.pl, infolinię lub pisemnie na adres siedziby spółki. Podaj datę i miejsce zakupu, opis produktu i wady oraz swoje żądanie.</p>

      <h3>Krok 3: formalne pismo reklamacyjne</h3>
      <p>Gdy reklamacja ustna lub przez formularz nie przynosi efektu, wyślij pismo zawierające:</p>
      <ul>
        <li>Twoje dane oraz datę i miejsce zakupu (numer marketu, jeśli znasz)</li>
        <li>Dokładny opis towaru i wady, najlepiej ze zdjęciami</li>
        <li>Powołanie na <strong>art. 43b i art. 43c ustawy o prawach konsumenta</strong></li>
        <li>Jasne żądanie: naprawa, wymiana, obniżenie ceny lub zwrot pieniędzy</li>
        <li>Przypomnienie o 14-dniowym terminie odpowiedzi z art. 7a UPK</li>
      </ul>
      <p>Nie masz czasu formułować tego samodzielnie? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback wygeneruje gotowe pismo reklamacyjne</Link> dopasowane do Twojej sytuacji, z powołaniem na właściwe przepisy — wystarczy opisać sprawę własnymi słowami.</p>

      <h3>Krok 4: co dalej, gdy Kaufland odmawia</h3>
      <p>Jeśli po formalnym piśmie Kaufland nadal odrzuca reklamację bez rzetelnego uzasadnienia (np. bez ekspertyzy technicznej), masz kilka dróg: <Link href="/blog/skarga-do-uokik" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">bezpłatna pomoc Rzecznika Praw Konsumentów</Link>, zgłoszenie do Inspekcji Handlowej, a przy produktach spożywczych zagrażających zdrowiu — zawiadomienie Sanepidu. Zobacz też: <Link href="/blog/reklamacja-odrzucona" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">co zrobić, gdy reklamacja została odrzucona</Link>.</p>

      <h2>Płatna gwarancja rozszerzona przy kasie — czy jest Ci w ogóle potrzebna</h2>
      <p>Przy zakupie elektroniki lub sprzętu AGD z oferty tygodnia kasjer często proponuje dodatkową, płatną gwarancję rozszerzoną oferowaną przez zewnętrznego ubezpieczyciela. To osobna umowa, którą podpisujesz dobrowolnie — jej brak nie oznacza, że zostajesz bez żadnej ochrony. Twoje ustawowe prawo do reklamacji z tytułu niezgodności towaru z umową działa niezależnie i obowiązuje przez pełne 2 lata, nawet jeśli odmówiłeś wykupienia dodatkowego pakietu przy kasie. Zanim zapłacisz za rozszerzoną gwarancję, sprawdź dokładnie, co faktycznie dodaje ponad przepisy — czasem to wyłącznie wydłużenie ochrony poza standardowy okres, a nie realna dodatkowa wartość na najbliższe dwa lata.</p>

      <h2>Kaufland Card — cyfrowy paragon jako dowód zakupu</h2>
      <p>Aplikacja Kaufland Card zapisuje historię Twoich zakupów i cyfrowe paragony, jeśli skanowałeś kartę lojalnościową przy kasie. To pełnoprawny dowód zakupu przy reklamacji — nie musisz przechowywać papierowego paragonu, który przy produktach na wagę i tak łatwo się zaciera lub gubi. Pokaż e-paragon z aplikacji na miejscu albo dołącz jego zrzut ekranu do pisma reklamacyjnego.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>Sezonowość towaru (grille, baseny, dekoracje) nie skraca 2-letniego terminu na reklamację</li>
        <li>Produkty z oferty tygodnia podlegają dokładnie tym samym zasadom co stały asortyment</li>
        <li>Towar z lady mięsnej, rybnej i piekarni też podlega reklamacji — kluczowy dowód to zachowany produkt, etykieta wagowa i paragon</li>
        <li>Kaufland ma 14 dni na odpowiedź. Brak odpowiedzi = reklamacja uznana z mocy prawa</li>
        <li>Aplikacja Kaufland Card przechowuje cyfrowe paragony, które wystarczą jako dowód zakupu</li>
      </ul>
    </>
  );
}
