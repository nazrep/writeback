import Link from "next/link";

export const metadata = { title: "Strona nie istnieje — Writeback" };

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <Link href="/" className="flex items-center gap-2 mb-10">
        <span className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">W</span>
        <span className="font-bold text-lg text-gray-900">writeback<span className="text-indigo-600">.pl</span></span>
      </Link>
      <p className="text-indigo-600 text-sm font-bold tracking-widest uppercase mb-4">404</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Strona nie istnieje</h1>
      <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-10">
        Strona której szukasz została przeniesiona lub nigdy nie istniała.
      </p>
      <Link
        href="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-sm"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
