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
        {/* Breadcrumb */}
        <Link href="/blog" className="text-sm text-gray-400 hover:text-indigo-600 font-medium mb-8 inline-flex items-center gap-1.5 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Poradniki
        </Link>

        {/* Hero */}
        <div className="mt-4 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">{post.readTime} czytania</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">{post.title}</h1>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">{post.description}</p>
        </div>

        {/* Article content */}
        <div className="
          [&_p]:text-gray-700 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:mb-4
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:leading-snug
          [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2
          [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul>li]:text-[15px] [&_ul>li]:text-gray-700 [&_ul>li]:leading-relaxed [&_ul>li]:pl-4 [&_ul>li]:relative [&_ul>li]:before:content-['–'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:text-indigo-400
          [&_ol]:mb-4 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol>li]:text-[15px] [&_ol>li]:text-gray-700 [&_ol>li]:leading-relaxed
          [&_strong]:font-semibold [&_strong]:text-gray-900
          [&_em]:italic [&_em]:text-gray-600
        ">
          <Content />
        </div>

        {/* CTA box */}
        <div className="mt-12 bg-indigo-600 rounded-2xl p-6 text-white">
          <p className="font-bold text-base mb-1">Gotowe pismo z właściwymi przepisami</p>
          <p className="text-indigo-200 text-sm mb-5">Sklep, bank, operator, ZUS. PDF na maila w 5 minut — 29 zł jednorazowo.</p>
          <Link
            href="/zamow"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-5 py-2.5 rounded-xl transition-all hover:bg-indigo-50 text-sm"
          >
            Napisz swoje pismo
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
