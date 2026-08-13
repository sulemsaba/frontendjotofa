import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NewsDetailClient } from "./client";
import { getNews, type PublicNewsArticle } from "@/lib/api";
import { FALLBACK_ARTICLES, mapArticle, type RawArticle } from "@/lib/news-constants";

interface Props { params: Promise<{ slug: string }> }

// ─── Dynamic metadata per article ───
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data: PublicNewsArticle[] = await getNews();
    const articles: RawArticle[] = data.length > 0 ? data.map(mapArticle) : FALLBACK_ARTICLES;
    const article = articles.find((a) => a.slug === slug);
    if (article) {
      return {
        title: article.title,
        description: article.excerpt || article.title,
        openGraph: {
          title: article.title,
          description: article.excerpt || article.title,
          images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
        },
      };
    }
  } catch { /* fall through to default */ }
  return { title: "Article   JOTOFA GROUP" };
}

// ─── Server-rendered page ───
export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;

  let article: RawArticle | null = null;
  let allArticles: RawArticle[] = [];

  try {
    const data: PublicNewsArticle[] = await getNews();
    allArticles = data.length > 0 ? data.map(mapArticle) : FALLBACK_ARTICLES;
    article = allArticles.find((a) => a.slug === slug) ?? null;
  } catch {
    allArticles = FALLBACK_ARTICLES;
    article = allArticles.find((a) => a.slug === slug) ?? null;
  }

  if (!article) notFound();

  const relatedArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <main className="flex-1 pt-14 sm:pt-16">
      <NewsDetailClient article={article} relatedArticles={relatedArticles} />
    </main>
  );
}
