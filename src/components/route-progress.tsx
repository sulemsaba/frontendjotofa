"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePage } from "@/lib/page-context";

/* ──────────────────────────────────────────────────────────────────────────
   RouteProgress — slim top loading bar that gives INSTANT feedback on nav
   clicks and completes when the new route lands.

   Driven entirely by the `navigating` flag from page-context (set true on
   click, cleared when the pathname changes). No manual timers/state —
   framer-motion handles the trickle + completion sweep.

   Behaviour:
   • navigating → true: bar appears at 0% and trickles toward 88% over ~3s
     with an easeOut curve (fast start, slow approach = "still working").
   • navigating → false (route landed): bar sweeps to 100% and fades out
     over 0.3s.

   This replaces the old full-screen `loading.tsx` spinner, so users never
   see a blank screen — the current page stays visible until the new one is
   ready, with this slim bar as the only progress indicator.
   ────────────────────────────────────────────────────────────────────────── */

export function RouteProgress() {
  const { navigating } = usePage();

  return (
    <AnimatePresence>
      {navigating && (
        <motion.div
          key="route-progress"
          className="fixed top-0 left-0 z-[100] h-[3px] bg-jotofa-accent shadow-[0_0_10px_rgba(0,169,183,0.6)] pointer-events-none"
          initial={{ width: "0%", opacity: 1 }}
          animate={{
            width: "88%",
            transition: { duration: 3, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            width: "100%",
            opacity: 0,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          aria-hidden
        />
      )}
    </AnimatePresence>
  );
}
