import { FormWizard } from "./FormWizard";
import Link from "next/link";

export const metadata = {
  title: "Napisz pismo — Writeback",
};

export default async function ZamowPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6">
        <div className="max-w-2xl mx-auto h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">W</span>
            <span className="font-bold text-base tracking-tight text-gray-900">writeback<span className="text-indigo-600">.pl</span></span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Bezpieczna płatność
            </span>
            <div className="flex items-center gap-1.5">
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">Stripe</span>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">BLIK</span>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded italic tracking-wide">VISA</span>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-6 py-12">
        <FormWizard lang={lang} />
      </main>
      <footer className="max-w-2xl mx-auto px-6 pb-10">
        <p className="text-[11px] text-gray-400 leading-relaxed text-center">
          Pisma generowane przez writeback.pl mają charakter informacyjny i pomocniczy. Nie stanowią porady prawnej ani zastępstwa adwokata lub radcy prawnego w rozumieniu ustawy Prawo o adwokaturze i ustawy o radcach prawnych. W sprawach złożonych lub o znacznej wartości zalecamy konsultację z prawnikiem lub{" "}
          <a href="https://www.uokik.gov.pl/rzecznicy_konsumentow.php" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">rzecznikiem praw konsumentów</a>.
          {" "}·{" "}
          <Link href="/regulamin" className="underline hover:text-gray-600">Regulamin</Link>
          {" "}·{" "}
          <Link href="/polityka" className="underline hover:text-gray-600">Polityka prywatności</Link>
        </p>
      </footer>
    </div>
  );
}
