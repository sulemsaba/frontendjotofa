"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import type { Testimonial } from "@/lib/testimonials-data";

interface TestimonialSliderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  testimonials: Testimonial[];
}

/* ──────────────────────────────────────────────────────────────────────────
   Simple filmstrip carousel: one row of cards that slides one step at a time.
   The centre card is highlighted; the previous / next peek on each side. Two
   cloned cards on each end make the loop seamless - when a slide lands on a
   clone, we jump (without animation) to the matching real card, so it just
   keeps sliding the same direction forever. No fly-across, no resize.
   ────────────────────────────────────────────────────────────────────────── */
export function TestimonialSlider({
  eyebrow = "Client Voices",
  title,
  subtitle,
  testimonials,
}: TestimonialSliderProps) {
  const n = testimonials.length;
  const looped = n > 1;
  const CLONES = 2; // per side - enough for the neighbour peek at the seams

  // ── Responsive sizing (centre card + peek of the neighbours) ──
  const [dims, setDims] = useState({ cardW: 300, cardH: 168, gap: 16, viewport: 360 });
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      let cardW: number, gap: number, viewport: number;
      if (vw >= 1024) {
        gap = 28;
        const available = Math.min(vw - 64, 1320);
        cardW = Math.max(320, Math.min(440, (available - 2 * gap) / 3));
        viewport = Math.round(cardW * 3 + gap * 2);
      } else if (vw >= 768) {
        gap = 22;
        const peek = 72;
        const available = Math.min(vw - 48, 920);
        cardW = Math.max(300, Math.min(440, available - 2 * gap - 2 * peek));
        viewport = Math.min(available, cardW + 2 * gap + 2 * peek);
      } else {
        gap = 12;
        const peek = 46;
        const available = vw - 32;
        cardW = Math.max(224, Math.min(348, available - 2 * gap - 2 * peek));
        viewport = Math.min(available, cardW + 2 * gap + 2 * peek);
      }
      setDims({ cardW, cardH: Math.round(cardW * 0.56), gap, viewport });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Build the filmstrip: [clones of the tail] + real + [clones of the head] ──
  const slides: Testimonial[] = looped
    ? [
        ...testimonials.slice(n - CLONES),
        ...testimonials,
        ...testimonials.slice(0, CLONES),
      ]
    : testimonials;
  const firstReal = looped ? CLONES : 0;
  const lastReal = looped ? CLONES + n - 1 : n - 1;

  const [pos, setPos] = useState(firstReal);
  const [animate, setAnimate] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [autoOn, setAutoOn] = useState(true);
  const startX = useRef(0);
  const movedRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const step = dims.cardW + dims.gap;
  const baseX = dims.viewport / 2 - (pos * step + dims.cardW / 2);
  const translateX = baseX + (dragging ? dragX : 0);

  const goNext = useCallback(() => { setAnimate(true); setPos((p) => p + 1); }, []);
  const goPrev = useCallback(() => { setAnimate(true); setPos((p) => p - 1); }, []);
  const goToReal = useCallback((i: number) => { setAnimate(true); setPos(firstReal + i); }, [firstReal]);

  // After sliding onto a clone, jump to the real card with no animation.
  const handleTransitionEnd = () => {
    if (!looped) return;
    if (pos > lastReal) { setAnimate(false); setPos(pos - n); }
    else if (pos < firstReal) { setAnimate(false); setPos(pos + n); }
  };
  // Re-enable the animation on the frame after a silent jump.
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  const activeReal = looped ? (((pos - firstReal) % n) + n) % n : pos;

  // ── Autoplay (pauses on hover / interaction) ──
  useEffect(() => {
    if (!autoOn || !looped) return;
    const id = setInterval(goNext, 7000);
    return () => clearInterval(id);
  }, [autoOn, looped, goNext]);

  // ── Keyboard ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // ── Mouse-wheel / trackpad: horizontal-intent scroll navigates (kept). ──
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let lock = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (lock) return;
      lock = true;
      setAutoOn(false);
      if (e.deltaX > 0) goNext();
      else goPrev();
      window.setTimeout(() => { lock = false; }, 400);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  // ── Drag / swipe ──
  const onDown = (x: number) => {
    setDragging(true);
    setAutoOn(false);
    startX.current = x;
    movedRef.current = false;
    setDragX(0);
  };
  const onMove = (x: number) => {
    if (!dragging) return;
    const d = x - startX.current;
    if (Math.abs(d) > 4) movedRef.current = true;
    setDragX(d);
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    const t = dims.cardW * 0.2;
    if (dragX > t) goPrev();
    else if (dragX < -t) goNext();
    setDragX(0);
  };

  if (!n) return null;

  return (
    <section
      className="relative py-12 sm:py-16"
      onMouseEnter={() => setAutoOn(false)}
      onMouseLeave={() => setAutoOn(true)}
    >
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
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">{subtitle}</p>
          )}
        </ScrollReveal>

        <div
          ref={rootRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onMouseDown={(e) => { e.preventDefault(); onDown(e.clientX); }}
          onMouseMove={(e) => onMove(e.clientX)}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchStart={(e) => onDown(e.touches[0].clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          onTouchEnd={onUp}
          className="overflow-hidden select-none"
          style={{ maxWidth: dims.viewport, margin: "0 auto", touchAction: "pan-y", cursor: dragging ? "grabbing" : "grab" }}
        >
          <div
            className="flex"
            onTransitionEnd={handleTransitionEnd}
            style={{
              gap: dims.gap,
              transform: `translateX(${translateX}px)`,
              transition: animate && !dragging ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
              willChange: "transform",
            }}
          >
            {slides.map((t, i) => {
              const isCenter = i === pos;
              return (
                <div
                  key={i}
                  className="relative flex-shrink-0 rounded-[20px] overflow-hidden"
                  style={{
                    width: dims.cardW,
                    height: dims.cardH,
                    opacity: isCenter ? 1 : 0.55,
                    transition: "opacity 0.4s ease",
                  }}
                  onClick={() => { if (!movedRef.current && !isCenter && looped) goToReal(((i - firstReal) % n + n) % n); }}
                >
                  <div className="absolute inset-0 bg-jotofa-navy-deep">
                    <Image
                      src={`/images/showcase/${t.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}.jpg`}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 348px, (max-width: 1024px) 440px, 440px"
                      className="object-cover opacity-80"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-jotofa-navy via-jotofa-navy-deep to-jotofa-navy" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.4))",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="text-white text-base sm:text-lg font-medium leading-snug line-clamp-3">
                      &ldquo;{t.quote}&rdquo;
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm mb-1.5">{t.company}</div>
                      <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                        <span>Read case study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((t, i) => (
            <button
              key={`${t.name}-${t.company}-dot-${i}`}
              type="button"
              onClick={() => goToReal(i)}
              aria-label={`Go to testimonial ${i + 1}: ${t.name}`}
              aria-selected={i === activeReal}
              role="tab"
              className="group/dot"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === activeReal
                    ? "w-8 h-3 bg-jotofa-navy dark:bg-white"
                    : "w-3 h-3 bg-jotofa-navy/25 dark:bg-white/25 group-hover/dot:bg-jotofa-navy/50 dark:group-hover/dot:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
