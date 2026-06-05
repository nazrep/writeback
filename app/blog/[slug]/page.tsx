import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, POSTS } from "../posts";
import { getContent } from "../content";

export async function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://writeback.pl/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      locale: "pl_PL",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const Content = getContent(slug);
  if (!Content) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mb-8 inline-flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Wszystkie poradniki
        </Link>

        <div className="mt-6 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">{post.readTime} czytania</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{post.title}</h1>
        </div>

        <article className="prose prose-gray prose-sm sm:prose max-w-none">
          <Content />
        </article>

        <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <p className="text-sm font-bold text-gray-900 mb-1">Napisz pismo z właściwymi przepisami</p>
          <p className="text-sm text-gray-600 mb-4">Gotowy PDF w 5 minut. Sklep, bank, operator, ZUS — 29 zł jednorazowo.</p>
          <Link
            href="/zamow"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            Napisz pismo — 29 zł
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
