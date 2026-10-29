import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Zamówiłeś kolację przez Wolt. Aplikacja pokazuje kuriera na mapie, odliczanie dobiega końca, a potem — status zmienia się na „dostarczone". Nikt nie zapukał, nikt nie zadzwonił, pod drzwiami nic nie ma. Piszesz do pomocy i słyszysz: „system odnotował dostawę, nie możemy zwrócić pieniędzy". To samo dzieje się z Glovo i Uber Eats: zimna pizza po 80 minutach, brakująca połowa zamówienia, kurier, który „nie mógł znaleźć budynku" i po prostu zjadł przekąskę. We wszystkich tych sytuacjach masz konkretne, ustawowe prawa — niezależnie od tego, co napisano w regulaminie aplikacji.</p>

      <h2>Kto za co odpowiada: restauracja, kurier czy aplikacja</h2>
      <p>Największym źródłem nieporozumień w sporach z aplikacjami do zamawiania jedzenia jest to, że w jednej transakcji biorą udział trzy strony, a każda z nich odpowiada za inny element zamówienia:</p>
      <ul>
        <li><strong>Restauracja</strong> sprzedaje Ci posiłek jako towar. Odpowiada za jego jakość, kompletność i zgodność z opisem na podstawie <strong>art. 43b ustawy o prawach konsumenta (UPK)</strong> — tak jak sklep odpowiada za towar na półce.</li>
        <li><strong>Platforma</strong> (Wolt, Glovo, Uber Eats) organizuje i realizuje usługę dostawy, za którą zapłaciłeś osobną opłatą. Za jej nienależyte wykonanie — spóźnienie, zagubienie zamówienia, brak dostawy mimo statusu „dostarczone" — odpowiada na podstawie <strong>art. 471 Kodeksu cywilnego</strong>, niezależnie od tego, czy kuriera zatrudnia na etacie, czy współpracuje z nim jako zleceniobiorcą.</li>
        <li><strong>Kurier</strong> jako osoba fizyczna wykonuje polecenia platformy lub restauracji — Ty jako konsument nie masz z nim żadnej umowy, więc Twoje roszczenie zawsze kierujesz do podmiotu, z którym faktycznie zawarłeś transakcję, a nie do kuriera osobiście.</li>
      </ul>
      <p>W praktyce oznacza to, że jeśli jedzenie było zepsute albo niekompletne mimo poprawnej dostawy — piszesz do restauracji (często za pośrednictwem formularza w aplikacji, który i tak przekazuje zgłoszenie dalej). Jeśli problemem jest sam przebieg dostawy — zamówienie nie dojechało, dojechało rozlane albo po dwóch godzinach — odpowiada platforma, bo to ona przyjęła od Ciebie opłatę za usługę transportową i nią zarządzała.</p>

      <h2>Czy mogę po prostu zmienić zdanie i odstąpić od zamówienia w ciągu 14 dni?</h2>
      <p>Nie. Zamówienie przez aplikację jest prawnie umową zawartą na odległość, ale <strong>art. 38 pkt 1 i pkt 4 UPK</strong> wyłączają prawo do odstąpienia bez podania przyczyny dla towarów przygotowywanych według indywidualnej specyfikacji konsumenta oraz dla towarów szybko ulegających zepsuciu — a posiłek przygotowywany na bieżąco, od momentu złożenia zamówienia, spełnia oba te warunki. Możesz jedynie anulować zamówienie, zanim restauracja zacznie je przygotowywać — każda z trzech aplikacji daje na to zwykle kilka minut od złożenia zamówienia. To, co opisujemy w tym artykule, to zupełnie inna sprawa: nie „zmiana zdania", a towar niezgodny z umową albo niewykonana usługa, co podlega normalnej reklamacji, a nie 14-dniowemu oknu na odstąpienie.</p>

      <h2>Najczęstsze problemy i jak je rozliczyć</h2>

      <h3>Zamówienie oznaczone jako „dostarczone", ale nigdy nie przyjechało</h3>
      <p>To jeden z najczęstszych sporów z Wolt i Glovo. Status w aplikacji to tylko wpis kuriera, nie dowód rozstrzygający — jeśli faktycznie nic nie otrzymałeś, zapłaciłeś za usługę, która nie została wykonana. To podstawa do pełnego zwrotu pieniędzy na podstawie art. 471 KC, a ciężar udowodnienia, że dostawa faktycznie miała miejsce (np. zdjęciem z miejsca dostawy albo potwierdzoną lokalizacją GPS), leży po stronie platformy, nie po Twojej.</p>

      <h3>Brakujące produkty w zamówieniu</h3>
      <p>Zapłaciłeś za trzy dania, dostałeś dwa. To niezgodność towaru z umową — restauracja nie dostarczyła tego, co sprzedała. Masz prawo żądać zwrotu proporcjonalnej części ceny za brakujący produkt na podstawie art. 43b i art. 43e UPK, a nie tylko „przeprosin" czy punktów lojalnościowych.</p>

      <h3>Jedzenie zimne, rozlane lub niejadalne po dostawie</h3>
      <p>Tu kluczowe jest, co było przyczyną. Jeśli jedzenie wyjechało z restauracji już wychłodzone lub nieodpowiednio zapakowane — to wada towaru, za którą odpowiada restauracja (art. 43b UPK). Jeśli jedzenie było prawidłowo przygotowane i zapakowane, a wychłodło albo rozlało się wyłącznie przez nietypowo długi czas transportu lub nieostrożność kuriera — odpowiedzialność przechodzi na platformę jako organizatora dostawy (art. 471 KC). W razie wątpliwości zgłoś sprawę do obu stron równolegle — to nie wyklucza się wzajemnie, a przyspiesza rozpatrzenie.</p>

      <h3>Kurier otworzył lub skonsumował część zamówienia</h3>
      <p>To nie jest drobna niedogodność, a nienależyte wykonanie usługi dostawy w najbardziej oczywistej postaci. Zrób zdjęcie opakowania od razu po odebraniu, zanim je otworzysz w całości — to Twój najsilniejszy dowód przy ewentualnym sporze o zwrot pieniędzy.</p>

      <h3>Podwójne obciążenie karty lub zapłata, a zamówienie nigdy nie zostało złożone</h3>
      <p>Jeśli płatność została pobrana, a zamówienie w ogóle nie trafiło do restauracji (błąd aplikacji, przerwane połączenie), żądasz zwrotu pełnej kwoty jako świadczenia nienależnego — nie musisz czekać na „rozpatrzenie reklamacji" w typowym sensie, bo nie doszło w ogóle do wykonania żadnej usługi.</p>

      <h2>Krok po kroku: jak skutecznie reklamować zamówienie</h2>

      <h3>Krok 1: zbierz dowody, zanim cokolwiek wyrzucisz</h3>
      <p>Zrób zdjęcia jedzenia i opakowania, zrzut ekranu zamówienia z aplikacji (co zamówiłeś, ile zapłaciłeś, godzina złożenia zamówienia) oraz historii statusu dostawy. Przy braku dostawy zapisz też zrzut ekranu mapy z aplikacji w momencie, gdy status zmienił się na „dostarczone" — to pomaga wykazać, że kurier nigdy nie był pod wskazanym adresem.</p>

      <h3>Krok 2: zgłoś problem przez czat pomocy w aplikacji</h3>
      <p>Wszystkie trzy aplikacje mają wewnętrzny system zgłaszania problemów z zamówieniem, zwykle dostępny z historii zamówień. To najszybsza droga do zwrotu przy oczywistych sytuacjach (brakujący produkt, niedostarczone zamówienie) i warto z niej skorzystać jako pierwszego kroku — część sporów kończy się na tym etapie w kilka minut.</p>

      <h3>Krok 3: formalna reklamacja, gdy aplikacja odmawia lub proponuje tylko punkty</h3>
      <p>Jeśli czat w aplikacji odrzuca zgłoszenie albo oferuje wyłącznie kod rabatowy, napisz formalną reklamację e-mailem lub przez formularz kontaktowy na stronie platformy (dane kontaktowe do reklamacji formalnych znajdziesz w regulaminie, nie tylko w czacie). Pismo powinno zawierać: datę i numer zamówienia, opis problemu, powołanie na właściwy przepis (art. 43b UPK dla wady jedzenia, art. 471 KC dla niewykonanej lub nienależycie wykonanej dostawy) oraz jasne żądanie zwrotu pieniędzy na konto lub kartę, którą zapłaciłeś. Nie masz czasu formułować tego samodzielnie? <Link href="/zamow" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">Writeback wygeneruje gotowe pismo reklamacyjne</Link> z powołaniem na właściwe przepisy — wystarczy opisać sprawę własnymi słowami.</p>

      <h3>Krok 4: chargeback w banku, jeśli platforma nie reaguje</h3>
      <p>Gdy zapłaciłeś kartą, a platforma po formalnym zgłoszeniu nie odpowiada lub odmawia bez uzasadnienia, możesz zgłosić do swojego banku reklamację transakcji kartowej (chargeback) z powodu niewykonanej usługi. Dołącz dowód zgłoszenia problemu do aplikacji i brak satysfakcjonującej odpowiedzi w rozsądnym terminie.</p>

      <h2>Typowe wymówki aplikacji i jak je obalić</h2>

      <h3>{'"System odnotował dostawę, więc nie możemy zwrócić pieniędzy"'}</h3>
      <p>Status w aplikacji to zapis działania kuriera, nie dowód rozstrzygający faktyczne wykonanie usługi. Jeśli zamówienia faktycznie nie otrzymałeś, usługa nie została wykonana niezależnie od tego, co pokazuje system — ciężar dowodu, że dostawa faktycznie miała miejsce, leży po stronie platformy.</p>

      <h3>{'"To wina restauracji / kuriera, my tylko łączymy strony"'}</h3>
      <p>To zależy, czego dotyczy problem. Jeśli płacisz platformie osobno za dostawę, platforma jest stroną umowy o tę usługę i odpowiada za jej nienależyte wykonanie na podstawie art. 471 KC — nie może się z tego wyłączyć, zrzucając winę na kogoś, z kim nie masz żadnej umowy.</p>

      <h3>{'"Zwrot możliwy tylko w postaci punktów lub kodu rabatowego"'}</h3>
      <p>Punkty czy kod rabatowy to propozycja handlowa, nie wykonanie Twojego roszczenia. Jeśli żądasz zwrotu pieniędzy za niewykonaną usługę lub towar niezgodny z umową, platforma musi zwrócić środki w pieniądzu, tym samym sposobem płatności, jakim zapłaciłeś — możesz przyjąć punkty, ale nie musisz.</p>

      <h3>{'"Zgłoszenie było po czasie, reklamacji nie rozpatrzymy"'}</h3>
      <p>Wewnętrzne okienko zgłoszeniowe w aplikacji (często 24–48 godzin) to tylko ułatwienie proceduralne, a nie ustawowy termin reklamacji. Przy wadzie towaru masz 2 lata od zakupu na zgłoszenie niezgodności (art. 43c ust. 1 UPK), a przy niewykonanej usłudze dostawy roszczenie o zwrot z art. 471 KC przedawnia się po znacznie dłuższym, ogólnym terminie z Kodeksu cywilnego. Odmowa z powodu „przekroczenia 48 godzin" nie pozbawia Cię prawa do formalnej reklamacji.</p>

      <h3>{'"Zdjęcie się nie liczy jako dowód bez paragonu"'}</h3>
      <p>Historia zamówienia w aplikacji (co zamówiłeś, kiedy, ile zapłaciłeś) jest pełnoprawnym dowodem zakupu — to zapis przechowywany przez samą platformę, trudniejszy do podważenia niż papierowy paragon. Dołączenie zdjęć jedzenia czy opakowania tylko wzmacnia Twoje zgłoszenie, nie jest warunkiem jego rozpatrzenia.</p>

      <h2>Podsumowanie</h2>
      <ul>
        <li>Za jakość i kompletność jedzenia odpowiada restauracja (art. 43b UPK), za przebieg i wykonanie dostawy — platforma (art. 471 KC)</li>
        <li>Nie masz prawa do 14-dniowego odstąpienia „bez powodu" od zamówienia jedzenia (art. 38 pkt 1 i 4 UPK) — ale to nie dotyczy reklamacji wady lub niewykonanej usługi</li>
        <li>Status „dostarczone" w aplikacji nie jest dowodem rozstrzygającym — to platforma musi wykazać, że dostawa faktycznie się odbyła</li>
        <li>Wewnętrzne okienka czasowe na zgłoszenie problemu w aplikacji to procedura, nie ustawowy termin — nie pozbawiają Cię prawa do formalnej reklamacji</li>
        <li>Masz prawo żądać zwrotu pieniędzy, nie tylko punktów lojalnościowych czy kodu rabatowego</li>
      </ul>
    </>
  );
}
