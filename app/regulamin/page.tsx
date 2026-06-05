import Link from "next/link";

export const metadata = {
  title: "Regulamin — Writeback",
};

export default function RegulaminPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Regulamin świadczenia usług</h1>
        <p className="text-sm text-gray-500 mb-10">Obowiązuje od 1 czerwca 2026 r.</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-8">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">§1. Postanowienia ogólne</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Niniejszy Regulamin określa zasady świadczenia usług drogą elektroniczną przez Macieja Perzankowskiego, prowadzącego działalność gospodarczą pod nazwą <strong>Maciej Perzankowski Software Solutions</strong>, ul. 19-go Lutego 8/14, 96-100 Skierniewice, NIP: 8361881457, REGON: 52381424900000 (dalej: „Usługodawca").</li>
              <li>Serwis internetowy dostępny pod adresem <strong>writeback.pl</strong> (dalej: „Serwis") umożliwia generowanie profesjonalnych pism konsumenckich z powołaniem na właściwe przepisy prawa polskiego.</li>
              <li>Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu.</li>
              <li>W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego, ustawy o świadczeniu usług drogą elektroniczną oraz ustawy o prawach konsumenta.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">§2. Charakter usługi — ważne zastrzeżenie</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Writeback jest narzędziem do tworzenia pism konsumenckich, a nie kancelarią prawną ani doradcą prawnym.</strong></li>
              <li>Generowane pisma mają charakter informacyjny i pomocniczy. Nie stanowią porady prawnej w rozumieniu przepisów o świadczeniu pomocy prawnej.</li>
              <li>Usługodawca nie gwarantuje skuteczności wygenerowanego pisma ani pozytywnego rozpatrzenia reklamacji przez adresata pisma.</li>
              <li>W sprawach o znacznej wartości lub złożoności prawnej Użytkownik powinien skonsultować się z radcą prawnym lub adwokatem.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">§3. Zasady korzystania z Serwisu</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Z Serwisu mogą korzystać osoby fizyczne, które ukończyły 18 lat i posiadają pełną zdolność do czynności prawnych.</li>
              <li>Użytkownik zobowiązuje się do podawania prawdziwych i aktualnych danych w formularzu.</li>
              <li>Zakazane jest korzystanie z Serwisu w celu tworzenia pism o charakterze sprzecznym z prawem, zawierających nieprawdziwe informacje lub w celu nękania osób trzecich.</li>
              <li>Użytkownik ponosi pełną odpowiedzialność za treść danych przekazanych w formularzu oraz za sposób wykorzystania wygenerowanego pisma.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">§4. Zamówienie i płatność</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Złożenie zamówienia następuje przez wypełnienie formularza i dokonanie płatności przez system Stripe.</li>
              <li>Cena usługi wynosi <strong>29 zł brutto</strong> za jedno pismo reklamacyjne. Ceny innych typów pism podane są każdorazowo przy danej usłudze.</li>
              <li>Płatność obsługiwana jest przez Stripe Payments Europe, Ltd. Akceptowane metody płatności: karta płatnicza, BLIK, Przelewy24.</li>
              <li>Potwierdzenie zamówienia i wygenerowane pismo w formacie PDF przesyłane są na podany adres e-mail niezwłocznie po zaksięgowaniu płatności.</li>
              <li>Usługodawca wystawia fakturę na żądanie Użytkownika — w tym celu należy skontaktować się pod adresem hello@writeback.pl.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">§5. Prawo odstąpienia od umowy</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta, prawo odstąpienia od umowy nie przysługuje w odniesieniu do umów o dostarczanie treści cyfrowych niedostarczanych na nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą konsumenta przed upływem terminu do odstąpienia od umowy i po poinformowaniu go przez przedsiębiorcę o utracie prawa odstąpienia od umowy.</li>
              <li>Akceptując niniejszy Regulamin i składając zamówienie, Użytkownik wyraża zgodę na natychmiastowe dostarczenie treści cyfrowej (pisma PDF) i tym samym potwierdza, że jest świadomy utraty prawa odstąpienia od umowy z chwilą dostarczenia pisma.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">§6. Reklamacje dotyczące usługi</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Reklamacje dotyczące świadczonych usług należy składać na adres e-mail: <strong>hello@writeback.pl</strong>.</li>
              <li>Reklamacja powinna zawierać: imię i nazwisko, adres e-mail podany przy zamówieniu, datę zamówienia oraz opis nieprawidłowości.</li>
              <li>Usługodawca rozpatruje reklamacje w terminie 14 dni roboczych od jej otrzymania.</li>
              <li>W przypadku niemożności wygenerowania pisma z przyczyn technicznych leżących po stronie Usługodawcy, Użytkownik otrzyma zwrot pełnej kwoty zamówienia.</li>
              <li><strong>Bezpłatne odwołanie:</strong> Jeżeli wygenerowane pismo nie przyniosło oczekiwanego rezultatu (sklep lub inny adresat odmówił lub nie odpowiedział na ponowną korespondencję), Usługodawca na wniosek Użytkownika przygotuje jedno pismo odwoławcze lub skargę do odpowiedniego organu (np. Rzecznika Praw Konsumentów, UOKiK) bezpłatnie. Wniosek należy złożyć na adres hello@writeback.pl w terminie 60 dni od dostarczenia pierwotnego pisma.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">§7. Własność intelektualna</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Wygenerowane pismo stanowi treść cyfrową wytworzoną na indywidualne zamówienie Użytkownika na podstawie danych przez niego podanych.</li>
              <li>Użytkownik nabywa prawo do korzystania z wygenerowanego pisma do własnych celów prywatnych lub konsumenckich.</li>
              <li>Elementy graficzne, logotypy i kod źródłowy Serwisu stanowią własność Usługodawcy i są chronione prawem autorskim.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">§8. Odpowiedzialność</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Usługodawca nie ponosi odpowiedzialności za skutki prawne lub finansowe wynikające z wykorzystania wygenerowanego pisma.</li>
              <li>Usługodawca nie odpowiada za działania lub zaniechania podmiotów trzecich (sklepy, banki, instytucje), do których adresowane jest wygenerowane pismo.</li>
              <li>Usługodawca nie ponosi odpowiedzialności za przerwy w działaniu Serwisu wynikające z przyczyn technicznych niezależnych od Usługodawcy.</li>
              <li>Odpowiedzialność Usługodawcy wobec Użytkownika ograniczona jest do wysokości uiszczonej opłaty za zamówione pismo.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">§9. Pozasądowe sposoby rozstrzygania sporów</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, w tym mediacji i sądownictwa polubownego.</li>
              <li>Konsument może skorzystać z platformy ODR (Online Dispute Resolution) dostępnej pod adresem: <a href="https://ec.europa.eu/consumers/odr" className="text-indigo-600 underline">ec.europa.eu/consumers/odr</a>.</li>
              <li>Szczegółowe informacje o pozasądowych sposobach rozstrzygania sporów dostępne są na stronie Urzędu Ochrony Konkurencji i Konsumentów: <a href="https://uokik.gov.pl" className="text-indigo-600 underline">uokik.gov.pl</a>.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">§10. Postanowienia końcowe</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Usługodawca zastrzega prawo do zmiany niniejszego Regulaminu. O zmianach Usługodawca informuje na stronie Serwisu z co najmniej 14-dniowym wyprzedzeniem.</li>
              <li>Regulamin dostępny jest pod adresem writeback.pl/regulamin.</li>
              <li>Wszelkie spory wynikające z korzystania z Serwisu będą rozstrzygane przez sąd właściwy dla siedziby Usługodawcy, chyba że przepisy prawa przewidują wyłączną właściwość innego sądu.</li>
            </ol>
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
