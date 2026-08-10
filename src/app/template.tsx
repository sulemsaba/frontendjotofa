"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────────
   Template   wraps every route's content.

   Unlike a layout (which persists across navigations), a template REMOUNTS
   on each route change. We keep the transition extremely short (0.15s) and
   only fade opacity (no vertical movement) so the swap feels instant   the
   new page appears in place rather than "rising in", which avoids the
   perception of slow re-rendering on every nav click.

   Honors prefers-reduced-motion: skips the fade entirely for users who
   request reduced motion (WCAG 2.3.3).
   ────────────────────────────────────────────────────────────────────────── */

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
