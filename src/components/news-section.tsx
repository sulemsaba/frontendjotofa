"use client";

import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { PageLink } from "@/lib/page-context";

const newsItems = [
  {
    category: "Group Update",
    categoryColor: "text-foreground",
    categoryBg: "bg-jotofa-accent/10",
    categoryBorder: "border-jotofa-accent/20",
    title: "JOTOFA GROUP Expands into East African Markets",
    excerpt:
      "Our regional growth strategy takes a major step forward with new operations in Kenya and Uganda.",
    date: "March 2025",
    readTime: "4 min read",
  },
  {
    category: "UTEC Solutions",
    categoryColor: "text-foreground",
    categoryBg: "bg-jotofa-accent/10",
    categoryBorder: "border-jotofa-accent/20",
    title: "UTEC Deploys Smart City Infrastructure in Dar es Salaam",
    excerpt:
      "A landmark project bringing IoT-enabled traffic management and digital services to Tanzania's commercial capital.",
    date: "February 2025",
    readTime: "3 min read",
  },
  {
    category: "CSR",
    categoryColor: "text-foreground",
    categoryBg: "bg-jotofa-accent/10",
    categoryBorder: "border-jotofa-accent/20",
    title: "2,000 Trees Planted: JOTOFA's Green Initiative Milestone",
    excerpt:
      "Our environmental stewardship program reaches a major milestone with reforestation projects across three regions.",
    date: "January 2025",
    readTime: "2 min read",
  },
];

export function NewsSection() {
  return (
    <section className="relative py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-accent/15 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-jotofa-accent/5 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            News &{" "}
            Insights
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Stay informed about our group&apos;s latest developments and community impact.
          </p>
        </ScrollReveal>

        {/* Compact news grid   3 columns on desktop */}
        <StaggerContainer
          className="grid md:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {newsItems.map((item) => (
            <StaggerItem key={item.title}>
              <PageLink
                page="news"
                className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-jotofa-accent/25 transition-all duration-300 hover:bg-secondary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background block"
                aria-label="View all news and insights"
              >
                {/* Category badge */}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${item.categoryBg} ${item.categoryBorder} border mb-4`}
                >
                  <span
                    className={`text-xs font-medium ${item.categoryColor}`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 group-hover:text-jotofa-accent transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {item.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
                  </PageLink>
                </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View all link */}
        <ScrollReveal className="mt-10 text-center">
          <PageLink
            page="news"
            className="inline-flex items-center gap-2 text-jotofa-accent hover:text-jotofa-accent-light font-medium transition-colors group"
          >
            View All News & Insights
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </PageLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
