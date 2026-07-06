"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { NewsDetail } from "@/components/news-detail";

interface ArticleUI {
  id: string;
  slug: string;
  category: string;
  categoryKey: string;
  categoryColor: string;
  categoryBg: string;
  categoryBorder: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

interface Props {
  article: ArticleUI;
  relatedArticles: ArticleUI[];
}

export function NewsDetailClient({ article, relatedArticles }: Props) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.push("/news");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router]);

  const handleArticleClick = useCallback(
    (clickedArticle: any) => {
      router.push(`/news/${clickedArticle.slug}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router]
  );

  return (
    <NewsDetail
      article={article}
      relatedArticles={relatedArticles}
      onBack={handleBack}
      onArticleClick={handleArticleClick}
    />
  );
}
