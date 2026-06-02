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
        <Link href="/" className="block w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}
