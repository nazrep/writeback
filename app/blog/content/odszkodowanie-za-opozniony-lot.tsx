import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Lot opóźnił się o ponad 3 godziny, odwołano go z powiadomieniem krótszym niż 14 dni, albo nie wpuszczono Cię na pokład mimo ważnej rezerwacji (overbooking)? Przysługuje Ci odszkodowanie od 250 do 600 EUR — na podstawie rozporządzenia UE, które obowiązuje bezpośrednio w całej Europie. Linie lotnicze często ignorują te żądania licząc, że pasażer odpuści.</p>

      <h2>Podstawa prawna: rozporządzenie (WE) nr 261/2004</h2>
      <p><strong>Rozporządzenie Parlamentu Europejskiego i Rady (WE) nr 261/2004 z dnia 11 lutego 2004 r.</strong> ustanawia wspólne zasady odszkodowania i pomocy dla pasażerów w przypadku odmowy przyjęcia na pokład albo odwołania lub dużego opóźnienia lotów. Rozporządzenie UE obowiązuje bezpośrednio — linia lotnicza nie może go wyłączyć regulaminem ani warunkami przewozu.</p>
      <p><strong>Zakres stosowania (art. 3 rozporządzenia):</strong></p>
      <ul>
        <li>Loty wylatujące z lotniska w państwie UE — niezależnie od przynależności linii lotniczej</li>
        <li>Loty przylatujące do UE obsługiwane przez przewoźnika z UE</li>
        <li>Pasażer musiał posiadać potwierdzoną rezerwację i stawić się na odprawę w terminie</li>
      </ul>

      <h2>Kiedy przysługuje odszkodowanie</h2>
      <p>Masz prawo do odszkodowania w trzech sytuacjach:</p>
      <ul>
        <li><strong>Opóźnienie lotu powyżej 3 godzin przy przylocie do celu</strong> — nie przy odlocie, ale przy faktycznym lądowaniu na lotnisku docelowym (wyrok TSUE C-402/07 i C-432/07 <em>Sturgeon</em>: pasażerowie opóźnionych lotów mają analogiczne prawa jak pasażerowie odwołanych)</li>
        <li><strong>Odwołanie lotu z powiadomieniem krótszym niż 14 dni</strong> przed planowym odlotem (art. 5 ust. 1 lit. c)</li>
        <li><strong>Odmowa przyjęcia na pokład</strong> (overbooking) bez zgody pasażera (art. 4)</li>
      </ul>

      <h2>Kwoty odszkodowania — art. 7 rozporządzenia</h2>
      <ul>
        <li><strong>250 EUR</strong> — loty do 1 500 km</li>
        <li><strong>400 EUR</strong> — loty wewnątrzunijne powyżej 1 500 km i wszystkie inne loty od 1 500 do 3 500 km</li>
        <li><strong>600 EUR</strong> — loty powyżej 3 500 km poza Unię Europejską</li>
      </ul>
      <p>Kwota może być zmniejszona o 50% gdy linia zaoferowała zmianę trasy (lot alternatywny), a pasażer dotarł do celu z opóźnieniem nieprzekraczającym odpowiednio: 2 godzin (do 1 500 km), 3 godzin (1 500–3 500 km) lub 4 godzin (powyżej 3 500 km) — art. 7 ust. 2.</p>

      <h2>Wyjątek: nadzwyczajne okoliczności — i czym NIE są</h2>
      <p><strong>Art. 5 ust. 3 rozporządzenia</strong>: linia lotnicza jest zwolniona z obowiązku wypłaty odszkodowania, jeżeli może udowodnić, że odwołanie lub opóźnienie spowodowane zostało zaistnieniem nadzwyczajnych okoliczności, których nie można było uniknąć pomimo podjęcia wszelkich racjonalnych środków.</p>
      <p>Za nadzwyczajne okoliczności uznaje się: decyzje zarządzania ruchem lotniczym, warunki atmosferyczne uniemożliwiające bezpieczny lot, strajki kontrolerów ruchu lotniczego, decyzje władz dotyczące konkretnego samolotu.</p>
      <p><strong>Kluczowy wyrok TSUE C-549/07 (<em>Wallentin-Hermann v. Alitalia</em>)</strong>: <strong>awaria techniczna samolotu NIE stanowi nadzwyczajnej okoliczności</strong>. Linia może się zwolnić z odpowiedzialności tylko jeśli wykaże, że awaria wynika z niezwykłego technicznego zdarzenia całkowicie poza jej kontrolą — i że pomimo właściwego utrzymania samolotu zdarzenia tego nie można było przewidzieć ani uniknąć. Samo powołanie się na "awarię techniczną" bez szczegółowego uzasadnienia jest niewystarczające.</p>

      <h2>Prawo do opieki podczas opóźnienia — art. 9</h2>
      <p>Niezależnie od prawa do odszkodowania, przy opóźnieniach powyżej określonych progów masz prawo do bezpłatnej opieki ze strony linii lotniczej:</p>
      <ul>
        <li>Posiłki i napoje adekwatne do czasu oczekiwania</li>
        <li>Dwa połączenia telefoniczne, e-maile lub faksy</li>
        <li>Zakwaterowanie w hotelu i transport gdy opóźnienie wymaga noclegu</li>
      </ul>
      <p>Zachowaj wszystkie paragony — możesz żądać zwrotu tych kosztów nawet jeśli linia nie zapewniła opieki z własnej inicjatywy.</p>

      <h2>Termin na złożenie roszczenia</h2>
      <p>Rozporządzenie 261/2004 nie określa wprost terminu przedawnienia — stosuje się prawo krajowe. W Polsce roszczenia majątkowe przedawniają się co do zasady po <strong>3 latach</strong> (art. 118 KC). Praktycznie oznacza to 3 lata od daty lotu. Nie czekaj jednak do ostatniej chwili — linii zależy na braku dokumentacji, im wcześniej wyślesz pismo, tym lepiej zachowana jest dokumentacja po obu stronach.</p>

      <h2>Jak złożyć reklamację do linii lotniczej</h2>
      <p>Pisemne roszczenie do linii lotniczej powinno zawierać: numer lotu i datę, numer rezerwacji/biletu, opis zdarzenia (ile godzin opóźnienia, czy podano przyczynę), żądaną kwotę odszkodowania w EUR z powołaniem na art. 7 rozporządzenia 261/2004 oraz termin odpowiedzi (14–30 dni).</p>
      <p>Pismo skieruj do działu obsługi reklamacji pasażerskich linii (nie do lotniska — to linia jest stroną zobowiązaną). Zachowaj potwierdzenie wysyłki.</p>
      <p>Jeśli linia odmawia lub nie odpowiada: w Polsce organem nadzoru jest <strong>Urząd Lotnictwa Cywilnego</strong> (ulc.gov.pl) — możesz złożyć skargę, która jest bezpłatna i skuteczna szczególnie przy dużych przewoźnikach operujących z polskich lotnisk.</p>

      <div style={{ margin: "2rem 0", padding: "1.5rem", background: "#eef2ff", borderRadius: "12px", border: "1px solid #c7d2fe" }}>
        <p style={{ margin: 0, fontWeight: 600, color: "#3730a3", marginBottom: "0.5rem" }}>Lot opóźniony lub odwołany? Napisz roszczenie z rozporządzenia 261/2004.</p>
        <p style={{ margin: 0, color: "#4338ca", fontSize: "0.9rem" }}>Opisz lot i opóźnienie → generujemy pismo do linii lotniczej z właściwymi przepisami → PDF na maila w 5 minut. 29 zł.</p>
      </div>
    </>
  );
}
