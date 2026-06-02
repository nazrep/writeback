import { FormWizard } from "./FormWizard";
import Link from "next/link";

export const metadata = {
  title: "Napisz pismo — Writeback",
};

export default function ZamowPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-tight">writeback</Link>
          <span className="text-xs text-gray-400">Bezpieczna płatność przez Stripe</span>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-6 py-12">
        <FormWizard />
      </main>
    </div>
  );
}
