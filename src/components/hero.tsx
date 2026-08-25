"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { PageLink } from "@/lib/page-context";

// Tiny framer-free replacement for framer's useReducedMotion.
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/* ──────────────────────────────────────────────────────────────────────────
   Hero - home page landing section.

   PERFORMANCE NOTES:
   • No framer-motion. Entry animations, the news-slider crossfade, and the
     vertical image ticker are all pure CSS keyframes, so nothing here weighs on
     the first-load JS bundle. Reduced-motion is honored via matchMedia.
   • All colors use design tokens (no raw hex). Typography uses the .h-display
     / .lead / .eyebrow utility classes from globals.css.
   ────────────────────────────────────────────────────────────────────────── */

// First entry of each column has descriptive alt text; subsequent duplicates
// use empty alt="" so screen readers don't announce the same description 9×.
const tickerImagesCol1 = [
  { src: "/images/jotofa-hero-1.jpeg", alt: "JOTOFA Group team delivering excellence across industries" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "" },
  { src: "/images/jotofa-hero-4.jpeg", alt: "UTEC office" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "" },
  { src: "/images/jotofa-hero-4.jpeg", alt: "" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
];

const tickerImagesCol2 = [
  { src: "/images/jotofa-hero-2.jpeg", alt: "JOTOFA Group women professionals collaborating" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
  { src: "/images/jotofa-hero-4.jpeg", alt: "" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
];

const newsSlides = [
  { title: "Expanding into East African Markets", image: "/images/jotofa-hero-1.jpeg" },
  { title: "JOTOFA Group: Delivering Excellence Across Industries", image: "/images/jotofa-hero-2.jpeg" },
  { title: "Empowering Women in the Workplace", image: "/images/jotofa-hero-3.jpeg" },
  { title: "UTEC Deploys Smart City Infrastructure", image: "/images/jotofa-hero-1.jpeg" },
];

// ─── Ticker sub-component (pure CSS animation, no JS) ───────────────────
function TickerColumn({
  images,
  reverse = false,
  paused = false,
  reducedMotion = false,
}: {
  images: typeof tickerImagesCol1;
  reverse?: boolean;
  paused: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="flex-1 h-full overflow-hidden relative">
      <div
        className="flex flex-col"
        style={{
          gap: "var(--ticker-gap, 12px)",
          animation: reducedMotion ? "none" : `scrollVertical 160s linear infinite${reverse ? " reverse" : ""}`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="relative w-full flex-shrink-0 overflow-hidden rounded-lg group"
            style={{ aspectRatio: "3/4", position: "relative" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 22vw"
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pause button (44×44 touch target, WCAG 2.5.5) ──────────────────────
function TickerPauseButton({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-background rounded-full border border-border text-jotofa-navy dark:text-white"
      style={{ width: "44px", height: "44px" }}
      aria-label={paused ? "Play animation" : "Pause animation"}
    >
      {paused ? <Play className="w-4 h-4" fill="currentColor" /> : <Pause className="w-4 h-4" fill="currentColor" />}
    </button>
  );
}

// ─── Main Hero ──────────────────────────────────────────────────────────
export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [tickerPaused, setTickerPaused] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length);
  }, []);
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
  }, []);

  return (
    <section className="relative w-full lg:h-screen lg:overflow-hidden bg-background dark:bg-jotofa-navy-mid">
      {/* Decorative top accent bar */}
      <div aria-hidden className="absolute top-0 left-0 right-0 z-[1] h-[3px] bg-gradient-to-r from-transparent via-jotofa-accent/70 to-transparent" />

      <div className="flex flex-col lg:flex-row w-full lg:h-full">

         {/* ════════════ MOBILE: Animated Ticker (TOP) ════════════ */}
         <div aria-hidden className="lg:hidden relative">
           <div className="flex w-full" style={{ height: "52vh", gap: "8px", padding: "8px", paddingTop: "72px" }}>
             <TickerColumn images={tickerImagesCol1} paused={tickerPaused} reducedMotion={!!prefersReducedMotion} />
             <TickerColumn images={tickerImagesCol2} reverse paused={tickerPaused} reducedMotion={!!prefersReducedMotion} />
           </div>
           <div className="absolute top-[80px] right-[16px] z-10">
             <TickerPauseButton paused={tickerPaused} onToggle={() => setTickerPaused(!tickerPaused)} />
           </div>
         </div>

        {/* ════════════ LEFT COLUMN   Text + News Slider ════════════ */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between relative z-[2]">
          <div className="flex flex-col justify-center flex-1 px-8 sm:px-10 lg:px-[60px] pt-10 pb-6 lg:pt-[140px] lg:pb-0">
            {/* Accent line - CSS animation, visible on first paint */}
            <div className="h-[3px] w-20 bg-jotofa-accent mb-6 rounded-full animate-fade-up" />

            <h1 className="mb-6 h-display animate-fade-up-delay-1">
              <span className="block text-jotofa-navy dark:text-white drop-shadow-sm">
                JOTOFA
              </span>
              <span className="block text-jotofa-accent">
                GROUP
              </span>
            </h1>

            <p className="mb-8 lead text-jotofa-text-secondary dark:text-white/80 max-w-[450px] animate-fade-up-delay-2">
              A diversified Tanzanian holding company driving excellence through
              ICT, logistics, professional services, and staffing -
              empowering communities and industries alike.
            </p>

            <div className="animate-fade-up-delay-3">
              <PageLink
                page="about"
                className="group inline-flex items-center gap-2 font-semibold transition-all duration-300 px-10 py-3.5 rounded-full bg-jotofa-navy text-white hover:bg-jotofa-navy-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-[1.5px] dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-jotofa-navy-mid"
              >
                Our Company
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </PageLink>
            </div>
          </div>

          {/* ════════════ BOTTOM NEWS SLIDER ════════════ */}
          <div
            className="mt-8 lg:mt-0 lg:pb-10 px-8 sm:px-10 lg:px-[60px] pb-8 lg:pb-10"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            <div className="overflow-hidden">
                <div key={currentSlide} className="animate-slide-fade"><PageLink page="news" className="flex gap-4 items-start cursor-pointer group">
                  <div className="flex-shrink-0 w-[130px] sm:w-[160px] h-[85px] sm:h-[100px] rounded-lg overflow-hidden relative">
                    <Image
                      src={newsSlides[currentSlide].image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 130px, 160px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-jotofa-navy/70 to-transparent" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-jotofa-navy dark:text-white font-semibold text-sm sm:text-base leading-snug group-hover:text-jotofa-accent dark:group-hover:text-jotofa-accent transition-colors">
                      {newsSlides[currentSlide].title}
                    </h3>
                  </div>
                </PageLink></div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <span className="text-jotofa-navy/60 dark:text-white/60 text-sm font-medium tabular-nums">
                  {currentSlide + 1}/{newsSlides.length}
                </span>
                <PageLink
                  page="businesses"
                  className="text-jotofa-navy/60 hover:text-jotofa-navy dark:text-white/60 dark:hover:text-white text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent rounded-sm"
                >
                  Family of Businesses
                </PageLink>
              </div>
              <div className="flex items-center gap-2">
                 <button
                   onClick={prevSlide}
                   className="w-11 h-11 rounded-full border border-jotofa-navy/15 dark:border-white/15 flex items-center justify-center text-jotofa-navy/60 dark:text-white/60 hover:text-jotofa-navy dark:hover:text-white hover:border-jotofa-navy/40 dark:hover:border-white/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                   aria-label="Previous slide"
                 >
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 <button
                   onClick={nextSlide}
                   className="w-11 h-11 rounded-full border border-jotofa-navy/15 dark:border-white/15 flex items-center justify-center text-jotofa-navy/60 dark:text-white/60 hover:text-jotofa-navy dark:hover:text-white hover:border-jotofa-navy/40 dark:hover:border-white/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                   aria-label="Next slide"
                 >
                   <ChevronRight className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════ RIGHT COLUMN   Vertical Image Ticker (Desktop) ════════════ */}
        <div className="hidden lg:flex flex-1 relative h-full dark:bg-jotofa-navy-mid animate-fade-up-delay-2" aria-hidden>
          <div className="flex w-full h-full" style={{ gap: "12px", padding: "12px", paddingTop: "80px" }}>
            <TickerColumn images={tickerImagesCol1} paused={tickerPaused} reducedMotion={!!prefersReducedMotion} />
            <TickerColumn images={tickerImagesCol2} reverse paused={tickerPaused} reducedMotion={!!prefersReducedMotion} />
          </div>
          <div className="absolute bottom-[90px] right-[30px] z-10">
            <TickerPauseButton paused={tickerPaused} onToggle={() => setTickerPaused(!tickerPaused)} />
          </div>
        </div>
      </div>
    </section>
  );
}
