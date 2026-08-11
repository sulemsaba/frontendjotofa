"use client";

import { usePage } from "@/lib/page-context";
import { motion } from "framer-motion";

export function UnifyingExcellence() {
  const { setActivePage } = usePage();

  return (
    <section className="relative w-full bg-jotofa-navy text-white overflow-hidden -mt-[60px]">
      {/* Architectural curve — cream ceiling into blue group world */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full bg-background pointer-events-none"
        style={{
          height: "140px",
          borderRadius: "0 0 50% 50% / 0 0 100px 100px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[38%] flex-shrink-0"
          >
            <div className="flex items-center gap-4 text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-8">
              <span className="inline-block w-10 h-px bg-jotofa-accent" />
              JOTOFA Group
            </div>

            <h1
              className="font-bold leading-[0.95] tracking-tight text-white mb-8"
              style={{
                fontFamily: "var(--font-playfair-display), 'Playfair Display', serif",
                fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
              }}
            >
              Unifying Excellence.
              <br />
              Empowering Growth.
            </h1>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-md mb-10">
              Four specialized sectors. One shared commitment to quality, integrity, and lasting impact across Tanzania and East Africa.
            </p>

            <button
              onClick={() => setActivePage("about")}
              className="inline-flex items-center gap-3 text-base sm:text-lg font-medium text-white transition-all duration-200 hover:gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 group"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 transition-all duration-200 group-hover:bg-white group-hover:text-jotofa-navy">
                <span className="text-lg leading-none">&rarr;</span>
              </span>
              Explore the Group
            </button>
          </motion.div>

          {/* Right column — starts lower on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 lg:mt-24"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block w-8 h-px bg-jotofa-accent" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70">
                Our Ecosystem
              </span>
            </div>

            <h2
              className="font-normal leading-snug text-white mb-10"
              style={{
                fontFamily: "var(--font-playfair-display), 'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.6rem)",
              }}
            >
              ICT, logistics, cleaning, and staffing — four subsidiaries united under one group.
            </h2>

            <div className="space-y-6 text-white/80 leading-[1.8] max-w-2xl">
              <p className="text-base sm:text-lg">
                We empower businesses and communities by uniting four specialized subsidiaries under one trusted roof. From telecommunications infrastructure to reliable courier services and professional cleaning, to skilled staffing — every service is built to drive real impact.
              </p>
              <p className="text-base sm:text-lg text-white/70">
                The JOTOFA Group is committed to integrity, innovation, and excellence — building a stronger East Africa through collaboration and forward-thinking solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
