"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePage } from "@/lib/page-context";

// ─── Data ──────────────────────────────────────────────

const tickerImagesCol1 = [
  { src: "/images/jotofa-hero-1.jpeg", alt: "JOTOFA Group team delivering excellence across industries" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "JOTOFA Group team members in modern office" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "JOTOFA Group women professionals in office space" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "JOTOFA Group team celebrating success" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "JOTOFA Group colleagues together" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "JOTOFA Group professional team" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "JOTOFA Group staff in branded uniforms" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "JOTOFA Group office team" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "JOTOFA Group women leadership" },
];

const tickerImagesCol2 = [
  { src: "/images/jotofa-hero-2.jpeg", alt: "JOTOFA Group women professionals collaborating" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "JOTOFA Group team with Delivering Excellence sign" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "JOTOFA Group team members posing together" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "JOTOFA Group office professionals" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "JOTOFA Group team gathering" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "JOTOFA Group staff in blue uniforms" },
  { src: "/images/jotofa-hero-1.jpeg", alt: "JOTOFA Group workforce" },
  { src: "/images/jotofa-hero-2.jpeg", alt: "JOTOFA Group corporate team" },
  { src: "/images/jotofa-hero-3.jpeg", alt: "JOTOFA Group team spirit" },
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
    <section
      className="relative w-full min-h-screen lg:h-screen lg:overflow-hidden"
      style={{ backgroundColor: "#003951" }}
    >
      {/* Decorative top accent bar — visible cyan line across the top */}
      <div className="absolute top-0 left-0 right-0 z-[1] h-[3px] bg-gradient-to-r from-transparent via-jotofa-accent/70 to-transparent" />

      <div className="flex flex-col lg:flex-row w-full min-h-full lg:h-full">

        {/* ══════════════════════════════════════════════
            MOBILE: Animated Ticker (TOP)
            ══════════════════════════════════════════════ */}
        <div
          className="lg:hidden relative"
          style={{ backgroundColor: "#003951" }}
        >
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
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover block" />
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
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover block" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-[80px] right-[16px] z-10">
            <button
              onClick={() => setTickerPaused(!tickerPaused)}
              className="flex items-center justify-center transition-all duration-300"
              style={{ background: "#fff", borderRadius: "50%", width: "36px", height: "36px", border: "none", cursor: "pointer", color: "#003951" }}
              aria-label={tickerPaused ? "Play animation" : "Pause animation"}
            >
              {tickerPaused ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5V19L19 12L8 5Z" fill="currentColor" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 5C18 3.89543 17.1046 3 16 3C14.8954 3 14 3.89543 14 5V19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19V5Z" fill="currentColor" />
                  <path d="M8.00001 3C6.89544 3 6 3.89543 6 5V19C6 20.1046 6.89544 21 8.00001 21C9.10458 21 10 20.1046 10 19V5C10 3.89543 9.10458 3 8.00001 3Z" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            LEFT COLUMN — Text + News Slider
            ══════════════════════════════════════════════ */}
        <div
          className="w-full lg:w-[45%] flex flex-col justify-between relative z-[2]"
          style={{ backgroundColor: "#09263b" }}
        >
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
              className="mb-6"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em" }}
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
              className="mb-8"
              style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "rgba(255, 255, 255, 0.8)", maxWidth: "450px" }}
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
                className="group inline-flex items-center gap-2 font-semibold transition-all duration-300"
                style={{ padding: "14px 40px", borderRadius: "50px", fontSize: "0.95rem", backgroundColor: "transparent", border: "1.5px solid #fff", color: "#fff" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#003951"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#fff"; }}
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
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${newsSlides[currentSlide].image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/70 to-transparent" />
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
                <span className="text-white/20 text-sm">JOTOFA Family of Businesses</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prevSlide} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all" aria-label="Previous slide">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextSlide} className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all" aria-label="Next slide">
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
          className="hidden lg:flex flex-1 relative h-full"
          style={{ backgroundColor: "#003951" }}
        >
          {/* Extra top padding to clear the pill nav */}
          <div className="flex w-full h-full" style={{ gap: "12px", padding: "12px", paddingTop: "80px" }}>
            <div className="flex-1 h-full overflow-hidden relative">
              <div className="flex flex-col" style={{ gap: "12px", animation: "scrollVertical 160s linear infinite", animationPlayState: tickerPaused ? "paused" : "running" }}>
                {[...tickerImagesCol1, ...tickerImagesCol1].map((img, i) => (
                  <div key={`c1-${i}`} className="relative w-full flex-shrink-0 overflow-hidden rounded-lg group" style={{ aspectRatio: "3/4" }}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))" }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden relative">
              <div className="flex flex-col" style={{ gap: "12px", animation: "scrollVertical 160s linear infinite reverse", animationPlayState: tickerPaused ? "paused" : "running" }}>
                {[...tickerImagesCol2, ...tickerImagesCol2].map((img, i) => (
                  <div key={`c2-${i}`} className="relative w-full flex-shrink-0 overflow-hidden rounded-lg group" style={{ aspectRatio: "3/4" }}>
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2))" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-[90px] right-[30px] z-10">
            <button
              onClick={() => setTickerPaused(!tickerPaused)}
              className="flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ background: "#fff", borderRadius: "50%", width: "44px", height: "44px", border: "none", cursor: "pointer", color: "#003951" }}
              aria-label={tickerPaused ? "Play animation" : "Pause animation"}
            >
              {tickerPaused ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5V19L19 12L8 5Z" fill="currentColor" /></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 5C18 3.89543 17.1046 3 16 3C14.8954 3 14 3.89543 14 5V19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19V5Z" fill="currentColor" />
                  <path d="M8.00001 3C6.89544 3 6 3.89543 6 5V19C6 20.1046 6.89544 21 8.00001 21C9.10458 21 10 20.1046 10 19V5C10 3.89543 9.10458 3 8.00001 3Z" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
