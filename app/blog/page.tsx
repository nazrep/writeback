import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "./posts";

export const metadata: Metadata = {
  title: "Poradniki — prawa konsumenta i reklamacje",
  description: "Poradniki o prawach konsumenta, reklamacjach i pismach urzędowych. Dowiedz się jak skutecznie reklamować towary i usługi w Polsce.",
  alternates: { canonical: "https://writeback.pl/blog" },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">W</div>
            <span className="text-sm font-semibold text-gray-700">writeback.pl</span>
          </Link>
          <Link href="/zamow" className="text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            Napisz pismo — 29 zł
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">Poradniki</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prawa konsumenta</h1>
          <p className="text-gray-500 text-sm">Konkretne informacje o Twoich prawach — bez prawniczego żargonu.</p>
        </div>

        <div className="space-y-3">
          {POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-start gap-5 p-5 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-all duration-200 group bg-white"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 font-bold text-sm">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-gray-400">{post.readTime} czytania</span>
                </div>
                <h2 className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug mb-1">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{post.description}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors shrink-0 mt-1" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-5 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-sm font-bold text-gray-900 mb-1">Potrzebujesz pisma teraz?</p>
          <p className="text-xs text-gray-500 mb-4">Nie musisz pisać sam. Generujemy pismo z właściwymi przepisami — PDF gotowy w 5 minut.</p>
          <Link href="/zamow" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm">
            Napisz pismo — 29 zł
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
