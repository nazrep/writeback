import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>ZUS wydał decyzję odmawiającą zasiłku, renty, emerytury lub obniżającą Twoje świadczenie? Masz miesiąc na odwołanie — i wbrew powszechnemu przekonaniu, nie piszesz go do ZUS, ale do sądu. Przez ZUS. To ważna różnica, która decyduje o tym jak napisać pismo.</p>

      <h2>Kluczowa zasada: odwołanie od decyzji ZUS trafia do sądu, nie do organu</h2>
      <p>Odwołania od decyzji ZUS NIE rozpatruje się w trybie administracyjnym (nie stosuje się KPA art. 127–140). <strong>Art. 83 ust. 2 ustawy z dnia 13 października 1998 r. o systemie ubezpieczeń społecznych</strong> (tekst jedn. Dz.U. 2026 poz. 199) stanowi wprost: od decyzji ZUS przysługuje odwołanie do właściwego sądu na zasadach określonych w przepisach KPC.</p>
      <p>Konkretny przepis: <strong>art. 477⁹ § 1 Kodeksu postępowania cywilnego</strong> — odwołanie wnosi się na piśmie do sądu pracy i ubezpieczeń społecznych <strong>za pośrednictwem organu, który wydał zaskarżoną decyzję</strong>. Czyli: pismo adresujesz do sądu, ale składasz fizycznie w ZUS lub wysyłasz na adres ZUS.</p>

      <h2>Termin odwołania — 1 miesiąc od doręczenia</h2>
      <p><strong>Art. 477¹⁰ § 1 KPC</strong>: odwołanie wnosi się w terminie <strong>1 miesiąca od dnia doręczenia odpisu decyzji</strong>. Termin ten jest terminem procesowym — jest liczony od faktycznej daty odbioru, nie od daty wydania decyzji. Jeśli doręczono przez awizo, liczy się od daty odbioru pisma lub upływu terminu do odbioru.</p>
      <p>Po upływie miesiąca odwołanie jest spóźnione i sąd je odrzuci — chyba że wniesiesz o przywrócenie terminu z uzasadnionych przyczyn (art. 168 KPC). Dlatego nie zwlekaj.</p>

      <h2>Co może zrobić ZUS zanim sprawa trafi do sądu</h2>
      <p><strong>Art. 477¹⁰ § 2 KPC</strong>: ZUS ma <strong>30 dni</strong> od otrzymania odwołania na przekazanie go do sądu — ale jeśli w tym czasie uzna odwołanie za zasadne, może samodzielnie zmienić lub uchylić zaskarżoną decyzję. Jest to korzystne dla obu stron — szybsze i tańsze niż postępowanie sądowe. Dlatego warto, żeby pismo odwoławcze jasno wskazywało na konkretne naruszenia — ZUS może je uznać i zmienić decyzję bez angażowania sądu.</p>
      <p>Jeśli ZUS nie zmieni decyzji w 30 dni — przekazuje odwołanie do właściwego sądu wraz z aktami sprawy i odpowiedzią na odwołanie.</p>

      <h2>Najczęstsze decyzje ZUS i jak je skarżyć</h2>

      <h3>Odmowa zasiłku chorobowego</h3>
      <p>Podstawa prawna do powołania w odwołaniu: ustawa z dnia 25 czerwca 1999 r. o świadczeniach pieniężnych z ubezpieczenia społecznego w razie choroby i macierzyństwa. Art. 4: prawo do zasiłku po 30 dniach nieprzerwanego ubezpieczenia (pracownicy) lub 90 dniach (zleceniobiorcy). Art. 9: okresy poprzedniego ubezpieczenia wlicza się do okresu wyczekiwania jeśli przerwa nie przekroczyła 30 dni lub jest kontynuacja.</p>

      <h3>Odmowa renty z tytułu niezdolności do pracy</h3>
      <p>Ustawa z dnia 17 grudnia 1998 r. o emeryturach i rentach z Funduszu Ubezpieczeń Społecznych (tekst jedn. Dz.U. 2025 poz. 1749): art. 12 (definicja niezdolności do pracy), art. 57 (warunki przyznania renty). ZUS często zaniża stopień niezdolności — orzeczenie lekarza orzecznika nie jest ostateczne; masz prawo złożyć sprzeciw do komisji lekarskiej ZUS (art. 14 ust. 2a ustawy) w terminie 14 dni, a następnie odwołać się do sądu.</p>

      <h3>Decyzja o zaległych składkach</h3>
      <p>Art. 83 ust. 1 uSUS: decyzje w sprawach indywidualnych dotyczących ustalania wymiaru składek i ich poboru. Odwołanie do <strong>sądu okręgowego</strong> wydziału pracy i ubezpieczeń społecznych (właściwego dla miejsca zamieszkania lub siedziby płatnika) — sprawy z zakresu ubezpieczeń społecznych rozpatruje sąd okręgowy jako pierwsza instancja (art. 477⁸ KPC). Warto zaskarżyć gdy ZUS zaniżył podstawę wymiaru, błędnie ustalił okres ubezpieczenia lub błędnie naliczył odsetki.</p>

      <h2>Jak napisać odwołanie — co musi zawierać</h2>
      <p>Odwołanie powinno zawierać:</p>
      <ul>
        <li>Oznaczenie sądu (właściwy sąd okręgowy lub rejonowy — wydział pracy i ubezpieczeń społecznych) i ZUS jako pośrednika</li>
        <li>Dane odwołującego (imię, nazwisko, PESEL, adres)</li>
        <li>Oznaczenie zaskarżonej decyzji (numer, data, czego dotyczy)</li>
        <li>Zarzuty wobec decyzji — konkretne naruszenia prawa lub błędy faktyczne</li>
        <li>Wnioski — czego żądasz (uchylenia decyzji i przyznania świadczenia, zmiany decyzji)</li>
        <li>Uzasadnienie — dlaczego decyzja jest błędna</li>
        <li>Podpis</li>
      </ul>
      <p>Postępowanie w sprawach z zakresu ubezpieczeń społecznych jest wolne od opłat sądowych dla ubezpieczonego (art. 96 ust. 1 pkt 4 ustawy o kosztach sądowych w sprawach cywilnych). Nie płacisz za złożenie odwołania.</p>

      <div style={{ margin: "2rem 0", padding: "1.5rem", background: "#eef2ff", borderRadius: "12px", border: "1px solid #c7d2fe" }}>
        <p style={{ margin: 0, fontWeight: 600, color: "#3730a3", marginBottom: "0.5rem" }}>ZUS odmówił świadczenia? Wygeneruj odwołanie z właściwymi przepisami.</p>
        <p style={{ margin: 0, color: "#4338ca", fontSize: "0.9rem" }}>Opisz decyzję i okoliczności → generujemy pismo z art. 477⁹ KPC i art. 83 uSUS → PDF na maila w 5 minut. 29 zł.</p>
      </div>
    </>
  );
}
