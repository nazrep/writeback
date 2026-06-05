import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "./posts";

export const metadata: Metadata = {
  title: "Blog — prawa konsumenta i reklamacje",
  description: "Poradniki o prawach konsumenta, reklamacjach i pismach urzędowych. Dowiedz się jak skutecznie reklamować towary i usługi w Polsce.",
  alternates: { canonical: "https://writeback.pl/blog" },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mb-6 inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            writeback.pl
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Poradniki</h1>
          <p className="text-gray-500">Prawa konsumenta, reklamacje, pisma urzędowe — konkretnie i po polsku.</p>
        </div>
        <div className="space-y-4">
          {POSTS.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.readTime} czytania</span>
              </div>
              <h2 className="text-base font-bold text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
