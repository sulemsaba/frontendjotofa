"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Scroll-reveal helpers - framer-motion-free (IntersectionObserver + CSS), so
   they add ~zero JS to the bundle. Same API as before: ScrollReveal (fade-up
   on enter), StaggerContainer + StaggerItem (staggered children reveal).
   Honors prefers-reduced-motion (shows content immediately, no animation).
   ────────────────────────────────────────────────────────────────────────── */

function useInViewOnce(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return { ref, inView };
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const OFFSET: Record<string, string> = {
  up: "translateY(40px)",
  down: "translateY(-40px)",
  left: "translateX(40px)",
  right: "translateX(-40px)",
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
}: ScrollRevealProps) {
  const { ref, inView } = useInViewOnce("-80px");
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : OFFSET[direction],
        transition: `opacity ${duration}s cubic-bezier(0.25,0.4,0.25,1) ${delay}s, transform ${duration}s cubic-bezier(0.25,0.4,0.25,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility; CSS uses fixed 70ms steps. */
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = "" }: StaggerContainerProps) {
  const { ref, inView } = useInViewOnce("-60px");
  return (
    <div ref={ref} className={`reveal-stagger ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  // The parent `.reveal-stagger` drives the staggered reveal via CSS.
  return <div className={className}>{children}</div>;
}
