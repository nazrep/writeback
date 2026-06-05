import Link from "next/link";

export const metadata = { title: "Pismo gotowe — Writeback" };

export default function GotowePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 max-w-md w-full text-center shadow-sm">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
        <h1 className="text-2xl font-bold mb-3">Pismo gotowe!</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Właśnie wysłaliśmy PDF na Twój adres email. Sprawdź skrzynkę (i folder spam).
        </p>
        <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2 mb-8">
          <p className="font-semibold text-gray-700">Co dalej:</p>
          <p className="text-gray-500">1. Wydrukuj i wyślij listem poleconym <em>lub</em> emailem</p>
          <p className="text-gray-500">2. Zachowaj potwierdzenie wysyłki</p>
          <p className="text-gray-500">3. Sklep ma <strong className="text-gray-700">14 dni</strong> na odpowiedź</p>
          <p className="text-gray-500">4. Brak odpowiedzi = reklamacja uznana za zasadną</p>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Pismo nie pomogło? Napisz na{" "}
          <a href="mailto:hello@writeback.pl" className="text-gray-600 underline">hello@writeback.pl</a>
          {" "}— odwołanie napiszemy za darmo.
        </p>
        <a
          href="https://mail.google.com/mail/u/0/#search/from:hello@writeback.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-xl text-sm font-semibold transition-colors mb-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.909 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
          </svg>
          Otwórz Gmail i sprawdź email
        </a>
        <Link href="/" className="block w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}
