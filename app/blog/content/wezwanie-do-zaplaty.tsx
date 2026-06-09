import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Ktoś jest Ci winien pieniądze — za wykonaną usługę, nieopłaconą fakturę, pożyczkę, niezrealizowaną umowę. Mija termin za terminem, obietnice bez pokrycia. Formalne wezwanie do zapłaty z powołaniem na przepisy KC to pierwszy krok, który oddziela grzeczne przypomnienie od poważnego roszczenia prawnego — i który uruchamia bieg odsetek.</p>

      <h2>Kluczowy przepis: art. 455 KC i moment wymagalności długu</h2>
      <p><strong>Art. 455 Kodeksu cywilnego</strong>: jeżeli termin spełnienia świadczenia nie jest oznaczony ani nie wynika z właściwości zobowiązania, dłużnik obowiązany jest je spełnić niezwłocznie po wezwaniu przez wierzyciela. Innymi słowy — jeśli nie ma faktury z terminem płatności lub termin minął, wystarczy wezwanie, żeby dług stał się wymagalny.</p>
      <p>Od dnia wymagalności długu dłużnik jest w opóźnieniu, a Ty możesz żądać odsetek.</p>

      <h2>Odsetki ustawowe za opóźnienie — ile wynoszą</h2>
      <p><strong>Art. 481 § 1 KC</strong>: jeżeli dłużnik opóźnia się ze spełnieniem świadczenia pieniężnego, wierzyciel może żądać odsetek za czas opóźnienia, chociażby nie poniósł żadnej szkody i chociażby opóźnienie było następstwem okoliczności, za które dłużnik odpowiedzialności nie ponosi.</p>
      <p><strong>Art. 481 § 2 KC</strong>: odsetki ustawowe za opóźnienie wynoszą tyle, ile aktualna stopa referencyjna Narodowego Banku Polskiego plus <strong>5,5 punktów procentowych</strong>. Wysokość zależy od bieżącej decyzji RPP — aktualną stopę referencyjną sprawdzisz zawsze na <strong>nbp.pl</strong> (zakładka „Stopy procentowe").</p>

      <h2>Transakcje handlowe B2B — wyższe odsetki i zryczałtowane koszty</h2>
      <p>Gdy obie strony są przedsiębiorcami i dług wynika z transakcji handlowej (dostawa towaru, świadczenie usług), zastosowanie ma <strong>ustawa z dnia 8 marca 2013 r. o przeciwdziałaniu nadmiernym opóźnieniom w transakcjach handlowych</strong> (tekst jedn. Dz.U. 2023 poz. 1790). Daje ona wierzycielowi dodatkowe uprawnienia:</p>
      <ul>
        <li><strong>Odsetki za opóźnienie w transakcjach handlowych</strong>: stopa referencyjna NBP plus <strong>10 punktów procentowych</strong> (art. 7 ust. 1 ustawy) — wyższe niż ogólne z KC</li>
        <li><strong>Zryczałtowane koszty odzyskiwania należności</strong> (art. 10 ust. 1 ustawy): <strong>40 EUR</strong> gdy kwota długu nie przekracza 5 000 zł; <strong>70 EUR</strong> gdy kwota wynosi 5 001–50 000 zł; <strong>100 EUR</strong> gdy kwota przekracza 50 000 zł</li>
      </ul>
      <p>Koszty te są wymagalne automatycznie z chwilą nabycia prawa do odsetek — nie musisz wykazywać faktycznych kosztów windykacji.</p>

      <h2>Co musi zawierać skuteczne wezwanie do zapłaty</h2>
      <p>Formalne wezwanie nie jest zwykłym przypomnieniem — to dokument, który:</p>
      <ul>
        <li>Ustala datę wymagalności długu (jeśli wcześniej nie była określona)</li>
        <li>Uruchamia bieg odsetek od dnia następnego po terminie wyznaczonym w wezwaniu</li>
        <li>Jest dowodem w postępowaniu sądowym (warunek uzyskania nakazu zapłaty w trybie upominawczym)</li>
        <li>Może skłonić dłużnika do uznania długu — jeśli dłużnik w odpowiedzi potwierdzi istnienie zobowiązania, takie uznanie przerywa bieg przedawnienia (art. 123 § 1 pkt 2 KC). Sam list nie przerywa — potrzebna jest reakcja dłużnika lub wszczęcie postępowania sądowego</li>
      </ul>
      <p>W wezwaniu powinny znaleźć się: tytuł prawny należności (faktura z numerem, umowa, pożyczka), kwota główna, kwota odsetek (z wyliczeniem od jakiej daty i według jakiej stopy), termin zapłaty (zazwyczaj 7 lub 14 dni od doręczenia) oraz informacja o planowanych krokach prawnych.</p>

      <h2>Termin przedawnienia roszczeń pieniężnych</h2>
      <p>Ogólny termin przedawnienia roszczeń wynosi <strong>6 lat</strong> (art. 118 KC, po nowelizacji z 2018 r.), ale dla roszczeń związanych z prowadzeniem działalności gospodarczej — <strong>3 lata</strong>. Dla roszczeń z faktur między przedsiębiorcami: 3 lata. Nie czekaj do ostatniej chwili — im szybciej wyślesz wezwanie, tym łatwiej egzekwować dług i tym mniejsze ryzyko przedawnienia.</p>

      <h2>Co jeśli dłużnik nie zapłaci po wezwaniu</h2>
      <p>Masz dwie ścieżki sądowe:</p>
      <ul>
        <li><strong>Postępowanie upominawcze</strong> (art. 498 i nast. KPC) — sąd wydaje nakaz zapłaty na podstawie wezwania i dokumentów bez rozprawy. Jeśli dłużnik nie wniesie sprzeciwu w 2 tygodniach, nakaz jest prawomocny i możesz skierować do komornika.</li>
        <li><strong>Postępowanie nakazowe</strong> (art. 485 KPC) — gdy masz faktury zaakceptowane przez dłużnika, umowę z podpisem. Korzystniejsze — dłużnik musi zapłacić lub wnieść zarzuty z zaliczką.</li>
      </ul>
      <p>Opłata sądowa w postępowaniu upominawczym wynosi 5% wartości roszczenia i przy wygranej jest zwracana przez dłużnika.</p>

      <div style={{ margin: "2rem 0", padding: "1.5rem", background: "#eef2ff", borderRadius: "12px", border: "1px solid #c7d2fe" }}>
        <p style={{ margin: 0, fontWeight: 600, color: "#3730a3", marginBottom: "0.5rem" }}>Ktoś Ci nie zapłacił? Wygeneruj formalne wezwanie z przepisami KC.</p>
        <p style={{ margin: 0, color: "#4338ca", fontSize: "0.9rem" }}>Opisz dług i okoliczności → generujemy wezwanie z art. 455 i 481 KC (+ ustawa o transakcjach handlowych przy B2B) → PDF na maila w 5 minut. 29 zł.</p>
      </div>
    </>
  );
}
