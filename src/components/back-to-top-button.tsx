"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   BackToTopButton - floating FAB, fixed bottom-right.
   Decoupled from footer entirely (per Fitts's Law / NN/g guidance).

   Behaviour:
     • Appears only after the user has scrolled past the first viewport
       (window.innerHeight) - keeps initial view uncluttered.
     • Glassmorphic styling (blur + translucent bg) so it doesn't obstruct
       content underneath.
     • Positioned to the LEFT of the WhatsApp floating button so they don't
       overlap. WhatsApp is at `bottom-6 right-6`; this is at
       `bottom-6 right-20` (gives ~16px gap on a 48px-wide WhatsApp button).
     • On mobile, both buttons stack on the right edge: WhatsApp at
       `bottom-5 right-4`, Back-to-top at `bottom-5 right-18`.
   ────────────────────────────────────────────────────────────────────────── */

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past one viewport
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-20 z-40 flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-background/70 backdrop-blur-md shadow-lg hover:bg-background/90 hover:border-jotofa-accent/40 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background group"
        >
          <ArrowUp className="w-4 h-4 text-foreground/70 group-hover:text-jotofa-accent transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
