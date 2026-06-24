"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { usePage } from "@/lib/page-context";

// ─── Data ──────────────────────────────────────────────

// First entry of each column has descriptive alt text; subsequent duplicates
// use empty alt="" so screen readers don't announce the same description 9×.
const tickerImagesCol1 = [
  { src: "/images/jotofa-hero-1.jpeg", alt: "JOTOFA Group team delivering excellence across industries" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
];

const tickerImagesCol2 = [
  { src: "/images/jotofa-hero-2.jpeg", alt: "JOTOFA Group women professionals collaborating" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "" },
];

const newsSlides = [
  {
    title: "Expanding into East African Markets",
    image: "/images/jotofa-hero-1.jpeg",
    page: "news" as const,
  },
  {
    title: "JOTOFA Group: Delivering Excellence Across Industries",
    image: "/images/jotofa-hero-2.jpeg",
    page: "news" as const,
  },
  {
    title: "Empowering Women in the Workplace",
    image: "/images/jotofa-hero-3.jpeg",
    page: "news" as const,
  },
  {
    title: "UTEC Deploys Smart City Infrastructure",
    image: "/images/jotofa-hero-1.jpeg",
    page: "news" as const,
  },
  {
    title: "Security Division Awarded Top Certification",
    image: "/images/jotofa-hero-2.jpeg",
    page: "news" as const,
  },
];

// ─── Component ──────────────────────────────────────────

export function Hero() {
  const { setActivePage } = usePage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [tickerPaused, setTickerPaused] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsSlides.length) % newsSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
  };

  return (
    <section className="relative w-full min-h-screen lg:h-screen lg:overflow-hidden bg-jotofa-navy-mid">
      {/* Decorative top accent bar — visible cyan line across the top */}
      <div className="absolute top-0 left-0 right-0 z-[1] h-[3px] bg-gradient-to-r from-transparent via-jotofa-accent/70 to-transparent" />

      <div className="flex flex-col lg:flex-row w-full min-h-full lg:h-full">

        {/* ══════════════════════════════════════════════
            MOBILE: Animated Ticker (TOP)
            ══════════════════════════════════════════════ */}
        <div className="lg:hidden relative bg-jotofa-navy-mid">
          {/* Extra top padding to clear the pill nav */}
          <div className="flex w-full" style={{ height: "55vh", gap: "8px", padding: "8px", paddingTop: "72px" }}>
            <div className="flex-1 h-full overflow-hidden relative">
              <div
                className="flex flex-col"
                style={{
                  gap: "8px",
                  animation: "scrollVertical 160s linear infinite",
                  animationPlayState: tickerPaused ? "paused" : "running",
                }}
              >
                {[...tickerImagesCol1, ...tickerImagesCol1].map((img, i) => (
                  <div key={`mc1-${i}`} className="relative w-full flex-shrink-0 overflow-hidden rounded-lg" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                      priority={i < 2}
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))" }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden relative">
              <div
                className="flex flex-col"
                style={{
                  gap: "8px",
                  animation: "scrollVertical 160s linear infinite reverse",
                  animationPlayState: tickerPaused ? "paused" : "running",
                }}
              >
                {[...tickerImagesCol2, ...tickerImagesCol2].map((img, i) => (
                  <div key={`mc2-${i}`} className="relative w-full flex-shrink-0 overflow-hidden rounded-lg" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                      priority={i < 2}
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pause button — repositioned to top-right of the ticker so it
              doesn't overlap the news slider below on small screens. */}
          <div className="absolute top-[80px] right-[16px] z-10">
            <button
              onClick={() => setTickerPaused(!tickerPaused)}
              className="flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-jotofa-navy-mid"
              style={{ background: "#fff", borderRadius: "50%", width: "36px", height: "36px", border: "none", color: "#003951" }}
              aria-label={tickerPaused ? "Play animation" : "Pause animation"}
            >
              {tickerPaused ? (
                <Play className="w-4 h-4" fill="currentColor" />
              ) : (
                <Pause className="w-4 h-4" fill="currentColor" />
              )}
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            LEFT COLUMN — Text + News Slider
            ══════════════════════════════════════════════ */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between relative z-[2] bg-jotofa-navy-card">
          <div className="flex flex-col justify-center flex-1 px-8 sm:px-10 lg:px-[60px] pt-24 pb-6 lg:pt-[140px] lg:pb-0">
            {/* Decorative accent line above title for visibility */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="h-[3px] w-20 bg-jotofa-accent mb-6 rounded-full origin-left"
              style={{ boxShadow: "0 0 12px rgba(0, 191, 255, 0.4)" }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight"
            >
              <motion.span
                className="block text-white drop-shadow-sm"
                initial={{ opacity: 0, transform: "translateY(20px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                JOTOFA
              </motion.span>
              <motion.span
                className="block text-gold-gradient"
                style={{ textShadow: "0 0 30px rgba(0, 191, 255, 0.15)" }}
                initial={{ opacity: 0, transform: "translateY(20px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                GROUP
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 text-lg leading-relaxed text-white/80 max-w-[450px]"
            >
              A diversified Tanzanian holding company driving excellence through
              ICT, logistics, professional services, security, and staffing —
              empowering communities and industries alike.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setActivePage("about")}
                className="group inline-flex items-center gap-2 font-semibold transition-all duration-300 px-10 py-3.5 rounded-full text-[0.95rem] border-[1.5px] border-white text-white hover:bg-white hover:text-jotofa-navy-mid cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-jotofa-navy-card"
              >
                Our Company
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════
              BOTTOM NEWS SLIDER
              ══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 lg:mt-0 lg:pb-10 px-8 sm:px-10 lg:px-[60px] pb-8 lg:pb-10"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex gap-4 items-start cursor-pointer group"
                  onClick={() => setActivePage("news")}
                >
                  <div className="flex-shrink-0 w-[130px] sm:w-[160px] h-[85px] sm:h-[100px] rounded-lg overflow-hidden relative">
                    <Image
                      src={newsSlides[currentSlide].image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 130px, 160px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-jotofa-navy/70 to-transparent" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-white font-semibold text-sm sm:text-base leading-snug group-hover:text-jotofa-accent transition-colors">
                      {newsSlides[currentSlide].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-sm font-medium tabular-nums">{currentSlide + 1}/{newsSlides.length}</span>
                {/* "Family of Businesses" is now a real link, not just a label */}
                <button
                  onClick={() => setActivePage("businesses")}
                  className="text-white/20 hover:text-white/60 text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent rounded-sm"
                >
                  Family of Businesses
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prevSlide} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-jotofa-navy-card" aria-label="Previous slide">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextSlide} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-jotofa-navy-card" aria-label="Next slide">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════
            RIGHT COLUMN — Vertical Image Ticker (Desktop)
            ══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-1 relative h-full bg-jotofa-navy-mid"
        >
          {/* Extra top padding to clear the pill nav */}
          <div className="flex w-full h-full" style={{ gap: "12px", padding: "12px", paddingTop: "80px" }}>
            <div className="flex-1 h-full overflow-hidden relative">
              <div className="flex flex-col" style={{ gap: "12px", animation: "scrollVertical 160s linear infinite", animationPlayState: tickerPaused ? "paused" : "running" }}>
                {[...tickerImagesCol1, ...tickerImagesCol1].map((img, i) => (
                  <div key={`c1-${i}`} className="relative w-full flex-shrink-0 overflow-hidden rounded-lg group" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="22vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      priority={i < 2}
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))" }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden relative">
              <div className="flex flex-col" style={{ gap: "12px", animation: "scrollVertical 160s linear infinite reverse", animationPlayState: tickerPaused ? "paused" : "running" }}>
                {[...tickerImagesCol2, ...tickerImagesCol2].map((img, i) => (
                  <div key={`c2-${i}`} className="relative w-full flex-shrink-0 overflow-hidden rounded-lg group" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="22vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      priority={i < 2}
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-[90px] right-[30px] z-10">
            <button
              onClick={() => setTickerPaused(!tickerPaused)}
              className="flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-jotofa-navy-mid"
              style={{ background: "#fff", borderRadius: "50%", width: "44px", height: "44px", border: "none", color: "#003951" }}
              aria-label={tickerPaused ? "Play animation" : "Pause animation"}
            >
              {tickerPaused ? (
                <Play className="w-5 h-5" fill="currentColor" />
              ) : (
                <Pause className="w-5 h-5" fill="currentColor" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
