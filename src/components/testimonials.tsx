"use client";

import { Quote, Star } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import type { Testimonial } from "@/lib/testimonials-data";

interface TestimonialsProps {
  /** Section eyebrow / kicker   small label above the title */
  eyebrow?: string;
  /** Section title   supports a highlighted word via <span class="text-jotofa-accent"> */
  title: React.ReactNode;
  /** Optional subtitle paragraph below the title */
  subtitle?: string;
  /** Tailwind accent color token class, e.g. "text-utec-cyan" or "text-jotofa-accent" */
  accent?: string;
  /** Tailwind bg tint class for icon/avatars, e.g. "bg-utec-cyan/10" */
  accentBg?: string;
  /** Tailwind border tint class for cards, e.g. "border-utec-cyan/20" */
  accentBorder?: string;
  /** Array of testimonials to render */
  testimonials: Testimonial[];
}

/**
 * Reusable testimonials section.
 *
 * Used across all company and subsidiary pages to showcase social proof.
 * Cards adapt to the page's accent color, so the section feels native to each subsidiary.
 */
export function Testimonials({
  eyebrow = "Client Voices",
  title,
  subtitle,
  accent = "text-jotofa-accent",
  accentBg = "bg-jotofa-accent/10",
  accentBorder = "border-jotofa-accent/20",
  testimonials,
}: TestimonialsProps) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-accent/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-jotofa-accent/20 bg-jotofa-accent/5 mb-6">
            <Quote className={`w-4 h-4 ${accent}`} />
            <span className="text-jotofa-accent text-sm font-medium">{eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              {subtitle}
            </p>
          )}
        </ScrollReveal>

        {/* Testimonial cards */}
        <StaggerContainer
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.12}
        >
          {testimonials.map((t) => (
            <StaggerItem key={`${t.name}-${t.company}`}>
              <figure
                className={`group relative h-full flex flex-col p-6 sm:p-7 rounded-2xl bg-card border ${accentBorder} hover:border-opacity-50 hover:bg-secondary transition-all duration-300`}
              >
                {/* Decorative quote mark in the corner */}
                <Quote
                  className={`absolute top-5 right-5 w-10 h-10 ${accent} opacity-10 group-hover:opacity-20 transition-opacity`}
                  strokeWidth={1.5}
                />

                {/* Star rating */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating
                          ? "fill-jotofa-accent text-jotofa-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 text-sm sm:text-[15px] text-foreground/85 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-full ${accentBg} flex items-center justify-center`}
                  >
                    <span className={`font-bold text-sm ${accent}`}>{t.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {t.role}
                    </div>
                    <div className="text-xs text-muted-foreground/70 truncate">
                      {t.company} · {t.location}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
