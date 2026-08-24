"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import type { Testimonial } from "@/lib/testimonials-data";

interface TestimonialSliderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function TestimonialSlider({
  eyebrow = "Client Voices",
  title,
  subtitle,
  testimonials,
}: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  if (!testimonials.length) return null;

  return (
    <section className="relative py-12 sm:py-16">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-accent/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-10 sm:mb-14">
          {eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-widest text-jotofa-accent mb-3">
              {eyebrow}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              {subtitle}
            </p>
          )}
        </ScrollReveal>

        {/* Slider viewport */}
        <div className="relative mx-auto flex justify-center items-center" style={{ maxWidth: 420 }}>
          {/* Slides */}
          <div className="relative flex justify-center items-center" style={{ height: 240 }}>
            {testimonials.map((t, i) => {
              const offset = i - current;
              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);

              // Center slide: centered, full opacity, z-index 100
              // Side slides: shifted left/right, reduced opacity/scale, z-index 90
              const transform = isCenter
                ? "translate(-50%, -50%)"
                : offset < 0
                  ? `translate(-50%, -50%) translateX(-115%) scale(0.92)`
                  : `translate(-50%, -50%) translateX(115%) scale(0.92)`;

              const zIndex = isCenter ? 100 : 90;
              const opacity = isCenter ? 1 : absOffset === 1 ? 0.5 : 0;
              const pointerEvents = isCenter ? "auto" : "none";

              return (
                  <div
                    key={`${t.name}-${t.company}-${i}`}
                    className="absolute left-1/2 top-1/2 rounded-[20px] overflow-hidden cursor-pointer"
                    style={{
                      width: 368,
                      height: 207,
                      transform,
                      zIndex,
                      opacity,
                      pointerEvents,
                      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, z-index 0s",
                      willChange: "transform, opacity",
                    }}
                    onClick={() => goTo(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") goTo(i);
                    }}
                    aria-label={`${t.name}, ${t.company}`}
                  >
                  {/* Background image */}
                  <div className="absolute inset-0 bg-jotofa-navy-deep">
                    <Image
                      src={`/images/showcase/${t.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}.jpg`}
                      alt=""
                      fill
                      sizes="368px"
                      className="object-cover opacity-80"
                    />
                  </div>

                  {/* Fallback gradient when image is missing */}
                  <div className="absolute inset-0 bg-gradient-to-br from-jotofa-navy via-jotofa-navy-deep to-jotofa-navy opacity-100 md:hidden" />

                  {/* Gradient overlay - exact from reference */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))",
                    }}
                  />

                  {/* Text content - bottom aligned, max-width 22rem */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    {/* Title at top */}
                    <div className="text-white text-base sm:text-lg font-medium leading-snug line-clamp-2">
                      &ldquo;{t.quote.slice(0, 120)}{t.quote.length > 120 ? "..." : ""}&rdquo;
                    </div>

                    {/* Bottom: company + read case study link */}
                    <div>
                      <div className="text-white font-semibold text-sm mb-1.5">
                        {t.company}
                      </div>
                      <div className="flex items-center gap-2 text-white/90 text-sm font-medium group/link cursor-pointer">
                        <span>Read case study</span>
                        <span className="relative flex items-center">
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-10 h-10 rounded-full border border-jotofa-navy/15 dark:border-white/15 flex items-center justify-center text-jotofa-navy/60 dark:text-white/60 hover:text-jotofa-navy dark:hover:text-white hover:border-jotofa-navy/40 dark:hover:border-white/40 transition-all cursor-pointer z-[110] bg-white/80 dark:bg-jotofa-navy/80 backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-10 h-10 rounded-full border border-jotofa-navy/15 dark:border-white/15 flex items-center justify-center text-jotofa-navy/60 dark:text-white/60 hover:text-jotofa-navy dark:hover:text-white hover:border-jotofa-navy/40 dark:hover:border-white/40 transition-all cursor-pointer z-[110] bg-white/80 dark:bg-jotofa-navy/80 backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((t, i) => (
            <button
              key={`${t.name}-${t.company}-dot-${i}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}: ${t.name}`}
              className="group/dot"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-jotofa-navy dark:bg-white"
                    : "w-2 h-2 bg-jotofa-navy/25 dark:bg-white/25 group-hover/dot:bg-jotofa-navy/50 dark:group-hover/dot:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
