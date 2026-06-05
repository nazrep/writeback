import Link from "next/link";

export const metadata = {
  title: "Polityka prywatności — Writeback",
};

export default function PolitykaPrywatnosci() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-white/5 px-6 py-0">
        <div className="max-w-3xl mx-auto h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">W</span>
            <span className="font-bold text-lg tracking-tight text-white">writeback</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Polityka prywatności</h1>
        <p className="text-sm text-gray-500 mb-10">Obowiązuje od 1 czerwca 2026 r.</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-8">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Administrator danych osobowych</h2>
            <p>Administratorem Twoich danych osobowych jest <strong>Maciej Perzankowski</strong>, prowadzący działalność gospodarczą pod nazwą <strong>Maciej Perzankowski Software Solutions</strong>, ul. 19-go Lutego 8/14, 96-100 Skierniewice, NIP: 8361881457, REGON: 52381424900000 (dalej: „Administrator").</p>
            <p className="mt-2">Kontakt z Administratorem w sprawach dotyczących ochrony danych osobowych: <strong>hello@writeback.pl</strong></p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Jakie dane zbieramy i w jakim celu</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">Dane</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">Cel</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 border-b border-gray-200">Podstawa prawna</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3">Imię i nazwisko, adres zamieszkania</td>
                    <td className="px-4 py-3">Generowanie pisma reklamacyjnego</td>
                    <td className="px-4 py-3">Art. 6 ust. 1 lit. b RODO (wykonanie umowy)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Adres e-mail</td>
                    <td className="px-4 py-3">Dostarczenie pisma PDF, komunikacja w sprawie zamówienia</td>
                    <td className="px-4 py-3">Art. 6 ust. 1 lit. b RODO (wykonanie umowy)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Dane produktu i sklepu, opis sytuacji</td>
                    <td className="px-4 py-3">Generowanie pisma dopasowanego do sytuacji</td>
                    <td className="px-4 py-3">Art. 6 ust. 1 lit. b RODO (wykonanie umowy)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Dane płatności (obsługiwane przez Stripe)</td>
                    <td className="px-4 py-3">Realizacja płatności</td>
                    <td className="px-4 py-3">Art. 6 ust. 1 lit. b RODO (wykonanie umowy)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Przekazywanie danych do podmiotów trzecich</h2>
            <p>Dane podane w formularzu (imię i nazwisko, adres, opis sytuacji, dane adresata pisma) są przekazywane do zewnętrznych dostawców technologicznych wyłącznie w zakresie niezbędnym do realizacji zamówienia — tj. wygenerowania treści pisma oraz dostarczenia go w formacie PDF na wskazany adres e-mail.</p>
            <p className="mt-2">Transfer danych poza EOG odbywa się na podstawie standardowych klauzul umownych (SCC) zgodnie z art. 46 RODO.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Podmioty przetwarzające dane (procesorzy)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Stripe Payments Europe, Ltd.</strong> — obsługa płatności. Polityka prywatności: stripe.com/privacy</li>
              <li><strong>Anthropic, PBC</strong> (USA) — system generowania treści pisma. Dane: imię, nazwisko, adres, opis sytuacji. Podstawa transferu: SCC (art. 46 RODO). Dane nie są przechowywane po realizacji usługi.</li>
              <li><strong>Resend, Inc.</strong> — wysyłka wiadomości e-mail z pismem PDF. Dane: adres e-mail, imię, treść wiadomości.</li>
              <li><strong>Vercel, Inc.</strong> — hosting aplikacji. Dane: logi serwera (adres IP, żądania HTTP).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Okres przechowywania danych</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dane zamówienia przechowywane są przez okres wymagany przepisami podatkowymi (5 lat od końca roku podatkowego, w którym dokonano transakcji).</li>
              <li>Dane niezbędne do realizacji zamówienia usuwane są niezwłocznie po jego realizacji, o ile nie istnieje obowiązek ich dłuższego przechowywania.</li>
              <li>Dane przekazane do systemu generowania treści pisma nie są przez nas przechowywane — przetwarzane są wyłącznie w czasie rzeczywistym dla potrzeb realizacji usługi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Twoje prawa</h2>
            <p>Na podstawie RODO przysługują Ci następujące prawa:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Prawo dostępu</strong> do swoich danych osobowych (art. 15 RODO)</li>
              <li><strong>Prawo do sprostowania</strong> danych (art. 16 RODO)</li>
              <li><strong>Prawo do usunięcia</strong> danych („prawo do bycia zapomnianym") (art. 17 RODO)</li>
              <li><strong>Prawo do ograniczenia przetwarzania</strong> (art. 18 RODO)</li>
              <li><strong>Prawo do przenoszenia danych</strong> (art. 20 RODO)</li>
              <li><strong>Prawo sprzeciwu</strong> wobec przetwarzania (art. 21 RODO)</li>
            </ul>
            <p className="mt-3">Aby skorzystać z powyższych praw, skontaktuj się z nami: <strong>hello@writeback.pl</strong>. Odpowiadamy w terminie do 30 dni.</p>
            <p className="mt-2">Masz prawo wnieść skargę do <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong> (ul. Stawki 2, 00-193 Warszawa, uodo.gov.pl), jeśli uważasz, że przetwarzanie Twoich danych narusza przepisy RODO.</p>
          </section>

          <section id="cookies">
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Pliki cookies</h2>
            <p>Serwis wykorzystuje wyłącznie techniczne pliki cookies niezbędne do prawidłowego działania. Nie używamy plików cookies marketingowych ani śledzących własnych. Nie korzystamy z Google Analytics ani podobnych narzędzi analitycznych.</p>
            <p className="mt-2">W ramach obsługi płatności Stripe może ustawiać własne pliki cookies techniczne (<code>__stripe_mid</code>, <code>__stripe_sid</code>) służące do wykrywania oszustw i zapewnienia bezpieczeństwa transakcji. Cookies te są niezbędne do realizacji usługi płatniczej. Szczegóły: <a href="https://stripe.com/cookies-policy/legal" className="text-indigo-600 underline">stripe.com/cookies-policy</a>.</p>
            <p className="mt-2">Cookies techniczne nie wymagają Twojej zgody na podstawie art. 173 ust. 3 Prawa telekomunikacyjnego. Możesz zablokować cookies w ustawieniach przeglądarki, jednak może to uniemożliwić realizację płatności.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Bezpieczeństwo danych</h2>
            <p>Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych przed nieuprawnionym dostępem, utratą lub zniszczeniem, w tym szyfrowanie transmisji danych (HTTPS/TLS). Płatności realizowane są wyłącznie przez certyfikowany system Stripe spełniający standard PCI DSS.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Zmiany polityki prywatności</h2>
            <p>O istotnych zmianach niniejszej Polityki prywatności będziemy informować na stronie Serwisu. Aktualna wersja zawsze dostępna jest pod adresem writeback.pl/polityka.</p>
          </section>

        </div>
      </main>

      <footer className="bg-slate-950 border-t border-white/5 py-8 px-6 text-center text-xs text-slate-500">
        © 2026 writeback.pl ·{" "}
        <Link href="/regulamin" className="hover:text-slate-300 transition-colors">Regulamin</Link>{" · "}
        <Link href="/polityka" className="hover:text-slate-300 transition-colors">Polityka prywatności</Link>
      </footer>
    </div>
  );
}
