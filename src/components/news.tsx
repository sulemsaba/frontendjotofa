"use client";

import {
  ArrowUpRight,
  Calendar,
  Clock,
  Newspaper,
  Lightbulb,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { usePage } from "@/lib/page-context";
import { NewsDetail } from "./news-detail";
import { useState, useCallback } from "react";

const categories = [
  { id: "all", label: "All" },
  { id: "group", label: "Group Update" },
  { id: "utec", label: "UTEC Solutions" },
  { id: "csr", label: "CSR" },
  { id: "innovation", label: "Innovation" },
  { id: "logistics", label: "Logistics" },
];

const featuredArticle = {
  category: "Group Update",
  categoryKey: "group",
  categoryColor: "text-jotofa-accent",
  categoryBg: "bg-jotofa-accent/10",
  categoryBorder: "border-jotofa-accent/20",
  title: "JOTOFA GROUP Expands into East African Markets",
  excerpt:
    "Our regional growth strategy takes a major step forward with new operations in Kenya and Uganda, strengthening cross-border logistics and ICT services. This milestone marks a new chapter in our mission to power progress across East Africa.",
  date: "March 2025",
  readTime: "4 min read",
  image: "/images/jotofa-hero-1.jpeg",
};

const newsItems = [
  {
    category: "UTEC Solutions",
    categoryKey: "utec",
    categoryColor: "text-utec-cyan",
    categoryBg: "bg-utec-cyan/10",
    categoryBorder: "border-utec-cyan/20",
    title: "UTEC Deploys Smart City Infrastructure in Dar es Salaam",
    excerpt:
      "A landmark project bringing IoT-enabled traffic management, public Wi-Fi, and digital services to Tanzania's commercial capital.",
    date: "February 2025",
    readTime: "3 min read",
    image: "/images/utec.png",
  },
  {
    category: "CSR",
    categoryKey: "csr",
    categoryColor: "text-cleaning-green",
    categoryBg: "bg-cleaning-green/10",
    categoryBorder: "border-cleaning-green/20",
    title: "2,000 Trees Planted: JOTOFA's Green Initiative Milestone",
    excerpt:
      "Our environmental stewardship program reaches a major milestone, with reforestation projects across three regions in Tanzania.",
    date: "January 2025",
    readTime: "2 min read",
    image: "/images/jotofa-hero-3.jpeg",
  },
  {
    category: "Innovation",
    categoryKey: "innovation",
    categoryColor: "text-staffing-purple",
    categoryBg: "bg-staffing-purple/10",
    categoryBorder: "border-staffing-purple/20",
    title: "Digital Transformation Across All Subsidiaries",
    excerpt:
      "JOTOFA GROUP invests in end-to-end digital platforms, integrating operations from logistics tracking to HR management under one technology umbrella.",
    date: "December 2024",
    readTime: "5 min read",
    image: "/images/jotofa-hero-2.jpeg",
  },
  {
    category: "Logistics",
    categoryKey: "logistics",
    categoryColor: "text-courier-orange",
    categoryBg: "bg-courier-orange/10",
    categoryBorder: "border-courier-orange/20",
    title: "JOTOFA Courier Launches Same-Day Delivery in Dar es Salaam",
    excerpt:
      "Our logistics subsidiary introduces express delivery services, reducing turnaround times for businesses and individuals across the metropolitan area.",
    date: "November 2024",
    readTime: "3 min read",
    image: "/images/courier.png",
  },
  {
    category: "Group Update",
    categoryKey: "group",
    categoryColor: "text-security-red",
    categoryBg: "bg-security-red/10",
    categoryBorder: "border-security-red/20",
    title: "JOTOFA GROUP Achieves ISO 9001 Certification",
    excerpt:
      "Our commitment to quality management systems is recognized with international certification, reinforcing our promise of operational excellence.",
    date: "October 2024",
    readTime: "2 min read",
    image: "/images/jotofa-hero-1.jpeg",
  },
  {
    category: "UTEC Solutions",
    categoryKey: "utec",
    categoryColor: "text-utec-cyan",
    categoryBg: "bg-utec-cyan/10",
    categoryBorder: "border-utec-cyan/20",
    title: "UTEC Partners with Tanzania Telecom Authority for 5G Rollout",
    excerpt:
      "A strategic partnership to accelerate next-generation connectivity infrastructure in major urban centers across Tanzania.",
    date: "September 2024",
    readTime: "4 min read",
    image: "/images/utec.png",
  },
];

const allArticles = [featuredArticle, ...newsItems];

export function News() {
  const { setActivePage } = usePage();
  const [selectedArticle, setSelectedArticle] = useState<typeof featuredArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const handleArticleClick = useCallback((article: typeof featuredArticle) => {
    setSelectedArticle(article as typeof featuredArticle);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Filter articles by selected category (falls back to all)
  const filteredNewsItems = activeCategory === "all"
    ? newsItems
    : newsItems.filter((item) => item.categoryKey === activeCategory);

  const handleBack = useCallback(() => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getRelatedArticles = useCallback(
    (article: typeof featuredArticle) => {
      return allArticles
        .filter((a) => a.title !== article.title)
        .slice(0, 3);
    },
    []
  );

  // Show article detail view if one is selected
  if (selectedArticle) {
    return (
      <AnimatePresence mode="wait">
        <NewsDetail
          article={selectedArticle}
          relatedArticles={getRelatedArticles(selectedArticle)}
          onBack={handleBack}
          onArticleClick={handleArticleClick}
        />
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-background">
      {/* ── Featured Article ── */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-accent/15 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleArticleClick(featuredArticle);
              }}
              className="group relative rounded-2xl border border-border overflow-hidden hover:border-jotofa-accent/25 transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background block"
              aria-label={`Read featured article: ${featuredArticle.title}`}
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative min-h-[300px] md:min-h-[420px] overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r dark:from-jotofa-navy-deep/80 dark:to-jotofa-navy-deep/40 from-background/80 to-background/40 md:bg-gradient-to-r md:dark:from-transparent md:dark:to-transparent md:from-transparent md:to-transparent" />
                  <div className="absolute inset-0 md:bg-gradient-to-l md:from-transparent md:to-jotofa-navy-deep/60 hidden md:block" />
                  {/* Mobile overlay text indicator */}
                  <div className="absolute bottom-4 left-4 md:hidden">
                    <span className="text-xs text-white/60 font-medium">Featured</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-jotofa-accent">
                      Featured
                    </span>
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${featuredArticle.categoryBg} ${featuredArticle.categoryBorder} border`}
                    >
                      <span className={`text-xs font-medium ${featuredArticle.categoryColor}`}>
                        {featuredArticle.category}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 group-hover:text-jotofa-accent transition-colors leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {featuredArticle.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featuredArticle.readTime}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-jotofa-accent transition-colors" />
                  </div>
                </div>
                </div>
              </a>
              </ScrollReveal>
        </div>
      </section>

      {/* ── All News Grid ── */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-accent/15 to-transparent" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-jotofa-accent/5 rounded-full blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header with filter */}
          <ScrollReveal className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Latest <span className="text-jotofa-accent">Stories</span>
              </h2>
              <p className="text-muted-foreground">
                Updates from across our subsidiaries and group operations
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" aria-hidden />
              <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Filter articles by category">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={activeCategory === cat.id}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent ${
                      activeCategory === cat.id
                        ? "bg-jotofa-accent/10 border-jotofa-accent/20 text-jotofa-accent"
                        : "border-border text-muted-foreground hover:border-jotofa-accent/20 hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* News grid   3 columns */}
          {filteredNewsItems.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No articles in this category yet.</p>
            </div>
          ) : (
          <StaggerContainer
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {filteredNewsItems.map((item) => (
              <StaggerItem key={item.title}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleArticleClick(item);
                  }}
                  className="group h-full flex flex-col p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-jotofa-accent/25 transition-all duration-300 hover:bg-secondary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background block"
                  aria-label={`Read article: ${item.title}`}
                >
                  {/* Category badge */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${item.categoryBg} ${item.categoryBorder} border mb-4 self-start`}
                  >
                    <span className={`text-xs font-medium ${item.categoryColor}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 group-hover:text-jotofa-accent transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {item.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.readTime}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-jotofa-accent transition-colors" />
                  </div>
                  </a>
                </StaggerItem>
            ))}
          </StaggerContainer>
          )}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-accent/15 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="p-10 sm:p-14 rounded-2xl border border-jotofa-accent/15 bg-jotofa-accent/[0.03]">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-jotofa-accent/10 mb-6">
                <Lightbulb className="w-7 h-7 text-jotofa-accent" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Stay <span className="text-jotofa-accent">Informed</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Get the latest updates from JOTOFA GROUP delivered to your inbox.
                From strategic milestones to community impact   never miss a story.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setActivePage("contact")}
                  className="px-8 py-3.5 bg-jotofa-accent hover:bg-jotofa-accent-dark text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-jotofa-accent/25"
                >
                  Subscribe to Updates
                </button>
                <button
                  onClick={() => setActivePage("contact")}
                  className="px-8 py-3.5 border dark:border-white/20 border-black/20 hover:border-jotofa-accent/40 text-foreground font-medium rounded-full transition-all dark:hover:bg-white/5 hover:bg-black/[0.04]"
                >
                  Contact Our Team
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
