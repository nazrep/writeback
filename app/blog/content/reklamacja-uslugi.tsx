import Link from "next/link";

export default function Content() {
  return (
    <>
      <p>Firma remontowa zostawiła nierówne ściany i nieszczelne okna. Hydraulik naprawił rurę, która przecieka od następnego tygodnia. Serwis naprawił sprzęt, który zepsuł się ponownie po miesiącu. Usługi są objęte ochroną prawną tak samo jak towary — tylko przepisy są nieco inne i mało kto o nich wie.</p>

      <h2>Podstawa prawna: umowa o dzieło i rękojmia KC</h2>
      <p>Większość usług remontowych, instalatorskich i naprawczych to <strong>umowy o dzieło</strong> (KC art. 627): wykonawca zobowiązuje się do wykonania oznaczonego dzieła, a zamawiający do zapłaty wynagrodzenia. Do rękojmi za wady dzieła stosuje się odpowiednio przepisy o rękojmi przy sprzedaży (<strong>art. 638 § 1 KC</strong>) — z modyfikacjami wynikającymi z natury umowy o dzieło.</p>
      <p>Termin rękojmi za wady dzieła:</p>
      <ul>
        <li><strong>2 lata</strong> od wydania dzieła — dla usług dotyczących rzeczy ruchomych (naprawa sprzętu, tapicerka, szycie na miarę)</li>
        <li><strong>5 lat</strong> od wydania — dla usług dotyczących nieruchomości (remont mieszkania, prace budowlane, instalacje w budynku) — art. 568 § 1 KC</li>
      </ul>

      <h2>Co możesz żądać przy wadliwej usłudze</h2>
      <p>W ramach rękojmi za wady dzieła masz do dyspozycji (art. 638 § 1 KC w zw. z art. 560–561 KC):</p>
      <ul>
        <li><strong>Usunięcie wady</strong> (naprawa) — wykonawca musi to zrobić na własny koszt i w rozsądnym terminie</li>
        <li><strong>Obniżenie wynagrodzenia</strong> — proporcjonalnie do stopnia wadliwości dzieła</li>
        <li><strong>Odstąpienie od umowy</strong> — gdy wada jest istotna i wykonawca jej nie usunął</li>
      </ul>
      <p><strong>Art. 560 § 4 KC</strong>: zamawiający nie może odstąpić od umowy jeśli wada jest nieistotna. Dlatego warto opisać wadę precyzyjnie — wykazując jej wpływ na funkcjonalność lub wartość dzieła.</p>

      <h2>Gdy wykonawca wykonuje dzieło wadliwie — możesz działać zanim skończy</h2>
      <p>To ważna różnica między rękojmią a uprawnieniami w trakcie wykonywania usługi. <strong>Art. 636 § 1 KC</strong>: jeżeli przyjmujący zamówienie wykonuje dzieło wadliwie albo sprzecznie z umową, zamawiający może <strong>wezwać go do zmiany sposobu wykonania i wyznaczyć mu w tym celu odpowiedni termin</strong>. Po bezskutecznym upływie terminu zamawiający może od umowy odstąpić albo powierzyć wykonanie dzieła innej osobie <strong>na koszt i niebezpieczeństwo wykonawcy</strong>.</p>
      <p>Oznacza to, że nie musisz czekać na zakończenie remontu żeby reagować. Jeśli widzisz że ekipa robi coś niezgodnie z projektem lub standardem — pisz formalnie, ustalaj termin poprawki i dokumentuj odpowiedź.</p>

      <h2>Domniemanie wady przy konsumencie — dodatkowa ochrona</h2>
      <p>Gdy zamawiasz usługę jako konsument od przedsiębiorcy, <strong>art. 556³ KC</strong> (domniemanie wady) stosuje się przez analogię — jeśli wada ujawniła się w ciągu roku od wydania dzieła, domniemywa się, że istniała w chwili wydania. Wykonawca musi to obalić ekspertyzą, nie słowem.</p>
      <p>Przy usługach budowlanych i remontowych szczególnie istotne jest zachowanie dokumentacji: zdjęcia etapów prac, protokół odbioru (jeśli był), korespondencja mailowa lub SMS z wykonawcą. To Twoje dowody.</p>

      <h2>Jak napisać skuteczną reklamację usługi</h2>
      <p>Reklamacja usługi powinna być pisemna — email lub list polecony. Ustnie złożona reklamacja jest trudna do udowodnienia. W piśmie wskaż:</p>
      <ul>
        <li>Kiedy i jaka usługa była wykonana, jakie wynagrodzenie zapłaciłeś</li>
        <li>Dokładny opis wady — co konkretnie jest niezgodne z umową lub standardem</li>
        <li>Podstawę prawną: art. 638 KC (rękojmia za wady dzieła) lub art. 636 KC (wadliwe wykonanie w trakcie)</li>
        <li>Konkretne żądanie (usunięcie wady / obniżenie wynagrodzenia / odstąpienie od umowy) z terminem — zazwyczaj 14–30 dni</li>
      </ul>
      <p>Wykonawca który dostaje formalne pismo z przepisami KC wie, że ignorowanie go oznacza ryzyko postępowania sądowego. To zmienia kalkulację po jego stronie.</p>

      <h2>Co gdy wykonawca nie reaguje lub odmawia</h2>
      <p>Masz do dyspozycji:</p>
      <ul>
        <li><strong>Rzecznik Praw Konsumentów</strong> (jeśli zamawiałeś jako osoba prywatna) — bezpłatna interwencja</li>
        <li><strong>UOKiK</strong> — gdy wykonawca stosuje nieuczciwe praktyki wobec konsumentów systemowo</li>
        <li><strong>Sąd rejonowy</strong> — postępowanie upominawcze lub uproszczone; przy wartości sporu do 30 000 zł koszty sądowe są niskie, przy wygranej pokrywa wykonawca</li>
        <li><strong>Powierzenie naprawy innemu wykonawcy na koszt pierwszego</strong> (art. 636 § 1 KC) — ale wymaga wcześniejszego wezwania z wyznaczonym terminem</li>
      </ul>

      <div style={{ margin: "2rem 0", padding: "1.5rem", background: "#eef2ff", borderRadius: "12px", border: "1px solid #c7d2fe" }}>
        <p style={{ margin: 0, fontWeight: 600, color: "#3730a3", marginBottom: "0.5rem" }}>Wadliwa usługa? Napisz formalne pismo z przepisami KC.</p>
        <p style={{ margin: 0, color: "#4338ca", fontSize: "0.9rem" }}>Opisz sytuację → generujemy pismo z art. 636 lub 638 KC → PDF na maila w 5 minut. 29 zł.</p>
      </div>
    </>
  );
}
