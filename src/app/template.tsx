"use client";

import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────────
   Template — wraps every route's content.

   Unlike a layout (which persists across navigations), a template REMOUNTS
   on each route change. We use this to play a short, subtle fade+rise as the
   new page's content arrives — so the swap feels intentional rather than a
   hard cut. Kept very short (0.25s) so it never feels slow.
   ────────────────────────────────────────────────────────────────────────── */

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
