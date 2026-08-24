"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePage } from "@/lib/page-context";

/* ──────────────────────────────────────────────────────────────────────────
   RouteProgress - slim top loading bar that gives INSTANT feedback on nav
   clicks and completes when the new route lands.

   Driven entirely by the `navigating` flag from page-context (set true on
   click, cleared when the pathname changes). No manual timers/state -
   framer-motion handles the trickle + completion sweep.

   Behaviour:
   • navigating → true: bar appears at 0% and trickles toward 90% over ~0.6s
     (fast approach so it reads as "almost done" rather than "still working").
   • navigating → false (route landed): bar sweeps to 100% and fades out
     over 0.2s.

   The short trickle keeps the bar from lingering - if a route is slow the
   bar still holds near 90% (implying progress) but doesn't feel stalled.
   ────────────────────────────────────────────────────────────────────────── */

export function RouteProgress() {
  const { navigating } = usePage();

  return (
    <AnimatePresence>
      {navigating && (
        <motion.div
          key="route-progress"
          className="fixed top-0 left-0 z-[100] h-[3px] bg-jotofa-accent pointer-events-none"
          initial={{ width: "0%", opacity: 1 }}
          animate={{
            width: "90%",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            width: "100%",
            opacity: 0,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          aria-hidden
        />
      )}
    </AnimatePresence>
  );
}
