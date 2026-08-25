"use client";

import { useEffect, useRef, useState } from "react";
import { usePage } from "@/lib/page-context";

/* ──────────────────────────────────────────────────────────────────────────
   RouteProgress - slim top loading bar, framer-free (plain CSS transitions).

   • navigating → true: bar resets to 0% then trickles to 90% over ~0.6s.
   • navigating → false (route landed): bar sweeps to 100% and fades out over
     0.2s, then resets hidden for the next navigation.
   ────────────────────────────────────────────────────────────────────────── */
export function RouteProgress() {
  const { navigating } = usePage();
  const [style, setStyle] = useState<React.CSSProperties>({ width: "0%", opacity: 0 });
  const wasNavigating = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (navigating) {
      wasNavigating.current = true;
      // Reset to 0 instantly, then (after paint) trickle toward 90%.
      setStyle({ width: "0%", opacity: 1, transition: "none" });
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setStyle({
            width: "90%",
            opacity: 1,
            transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          })
        )
      );
      return () => cancelAnimationFrame(raf);
    }

    if (wasNavigating.current) {
      wasNavigating.current = false;
      // Complete: sweep to 100% and fade, then reset hidden.
      setStyle({
        width: "100%",
        opacity: 0,
        transition: "width 0.2s ease-out, opacity 0.2s ease-out",
      });
      timer.current = setTimeout(
        () => setStyle({ width: "0%", opacity: 0, transition: "none" }),
        240
      );
    }
  }, [navigating]);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 z-[100] h-[3px] bg-jotofa-accent pointer-events-none"
      style={style}
    />
  );
}
