import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Operator telefonii mówi że "umowa trwa do końca okresu"? Siłownia żąda kary za wcześniejsze odejście? Platforma streamingowa nie daje opcji rezygnacji? Masz konkretne przepisy po swojej stronie — niezależnie od tego co stoi w regulaminie.</p>

      <h2>Podstawa prawna — art. 365(1) Kodeksu cywilnego</h2>
      <p><strong>Art. 365(1) Kodeksu cywilnego</strong> stanowi że zobowiązanie bezterminowe o charakterze ciągłym wygasa po wypowiedzeniu przez dłużnika lub wierzyciela z zachowaniem terminów umownych, ustawowych albo zwyczajowych, a w razie braku takich terminów — niezwłocznie po wypowiedzeniu.</p>
      <p>Każda umowa na czas nieokreślony (abonament, karnet, subskrypcja) może zostać wypowiedziana. Firma nie może Ci tego zabronić — może jedynie zastrzec rozsądny termin wypowiedzenia.</p>

      <h2>Kiedy kara umowna za wypowiedzenie jest nieważna?</h2>
      <p>Firmy często wpisują w regulaminach kary za "przedterminowe rozwiązanie umowy". Takie postanowienia mogą być <strong>klauzulami abuzywnymi</strong> — nieważnymi z mocy prawa.</p>
      <p>Zgodnie z <strong>art. 385(3) pkt 17 Kodeksu cywilnego</strong> niedozwolone są postanowienia które nakładają na konsumenta obowiązek zapłaty rażąco wygórowanej kary umownej. Jeśli "kara" za rezygnację z siłowni wynosi tyle samo co kilka miesięcy abonamentu — jest podstawa do jej zakwestionowania.</p>

      <h2>Typowe sytuacje i jak je rozwiązać</h2>

      <h3>Operator telefonii / internetu</h3>
      <p>Przy umowach na czas określony (np. 24 miesiące) operator może naliczyć część przyznanego dofinansowania do sprzętu. Ale przy umowach na czas nieokreślony — ma obowiązek przyjąć wypowiedzenie z zachowaniem okresu wypowiedzenia (zazwyczaj 30 dni). Jeśli odmawia, powołaj się na <strong>art. 365(1) KC</strong>.</p>

      <h3>Siłownia / klub fitness</h3>
      <p>Jeśli umowa jest zawarta na czas nieokreślony lub już przeszła w tryb miesięczny po zakończeniu okresu minimalnego — możesz ją wypowiedzieć. Kara za wcześniejsze rozwiązanie przy umowie na czas nieokreślony to klasyczna klauzula abuzywna z <strong>art. 385(3) KC</strong>.</p>
      <p>Wyjątek: zmiana cennika lub warunków przez firmę daje Ci prawo do natychmiastowego wypowiedzenia bez konsekwencji — na podstawie <strong>art. 384(1) KC</strong>.</p>

      <h3>Platforma streamingowa / subskrypcja online</h3>
      <p>Subskrypcje odnawiające się miesięcznie to umowy na czas nieokreślony. Prawo do rezygnacji przysługuje zawsze — najdalej z końcem bieżącego okresu rozliczeniowego. Jeśli platforma nie oferuje opcji rezygnacji lub utrudnia ją, masz podstawy do skargi do UOKiK.</p>

      <h2>Prawo odstąpienia przy umowie zawartej online</h2>
      <p>Jeśli umowę zawarłeś przez internet lub telefon — bez wizyty w salonie — masz <strong>14 dni na odstąpienie bez podania przyczyny</strong> na podstawie <strong>art. 27 ustawy o prawach konsumenta</strong>. Dotyczy to nowych umów z operatorami, platform, siłowni oferujących zapisy online.</p>

      <h2>Co powinno zawierać pismo o wypowiedzenie?</h2>
      <ul>
        <li>Twoje dane: imię, nazwisko, adres, numer umowy / klienta</li>
        <li>Dane adresata: firma, adres</li>
        <li><strong>Powołanie na art. 365(1) KC</strong> (wypowiedzenie umowy bezterminowej)</li>
        <li>Wskazanie daty, od której wypowiedzenie ma skutkować</li>
        <li>Jeśli jest kara: zakwestionowanie jej na podstawie <strong>art. 385(3) KC</strong></li>
        <li>Żądanie pisemnego potwierdzenia rozwiązania umowy</li>
      </ul>
      <p>Nie chcesz pisać sam? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">writeback.pl generuje gotowe pismo wypowiedzenia</Link> dopasowane do Twojej sytuacji — wybierz opcję "Wypowiedzenie umowy".</p>

      <h2>Co jeśli firma ignoruje wypowiedzenie lub nalicza karę?</h2>
      <ul>
        <li><strong>Wezwanie do usunięcia naruszenia</strong> — formalne pismo z terminem 7 dni i zapowiedzią skargi do UOKiK</li>
        <li><strong>UOKiK</strong> — klauzule abuzywne w regulaminach to praktyki naruszające zbiorowe interesy konsumentów. UOKiK może nałożyć karę na firmę</li>
        <li><strong>Rzecznik Praw Konsumentów</strong> — bezpłatna pomoc przy każdym starostwie powiatowym</li>
        <li><strong>Sąd polubowny przy Inspekcji Handlowej</strong> — bezpłatne, szybkie postępowanie</li>
      </ul>
      <p>Masz problem z reklamacją towaru zamiast wypowiedzeniem umowy? Przeczytaj <Link href="/blog/reklamacja-sklep-internetowy" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">jak napisać skuteczną reklamację do sklepu internetowego</Link>.</p>
    </>
  );
}
