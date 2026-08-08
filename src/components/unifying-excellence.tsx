"use client";

import { usePage } from "@/lib/page-context";

export function UnifyingExcellence() {
  const { setActivePage } = usePage();

  return (
    <section className="relative w-full bg-jotofa-navy text-white overflow-hidden -mt-[60px]">
      {/* Light curve at top — creates smooth transition from Hero above */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full bg-background pointer-events-none"
        style={{
          height: "120px",
          borderRadius: "0 0 100% 100% / 0 0 80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-[5%] sm:px-[6%] pt-[140px] sm:pt-[120px] pb-[180px] sm:pb-[140px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <div className="w-full lg:w-[40%] flex-shrink-0">
            <div className="flex items-center gap-4 text-xs font-semibold tracking-[0.25em] uppercase text-white/70 mb-6">
              <span className="inline-block w-10 h-px bg-jotofa-accent" />
              JOTOFA Group
            </div>
            <h1
              className="font-bold leading-[0.95] tracking-tight text-white mb-6"
              style={{
                fontFamily: "var(--font-playfair-display), 'Playfair Display', serif",
                fontSize: "clamp(3rem, 7vw, 5.6rem)",
              }}
            >
              Unifying Excellence.
              <br />
              Empowering Growth.
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-md mb-8">
              Five specialized sectors. One shared commitment to quality, integrity, and lasting impact across Tanzania and East Africa.
            </p>
            <button
              onClick={() => setActivePage("about")}
              className="inline-flex items-center gap-3 text-base sm:text-lg font-medium text-white transition-all duration-200 hover:gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 group"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 transition-all duration-200 group-hover:bg-white group-hover:text-jotofa-navy">
                <span className="text-lg leading-none">&rarr;</span>
              </span>
              Explore more
            </button>
          </div>

          {/* Right column */}
          <div className="flex-1">
            <h2
              className="font-normal leading-snug text-white mb-10"
              style={{
                fontFamily: "var(--font-playfair-display), 'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
              }}
            >
              ICT, logistics, cleaning, security, and staffing — five subsidiaries united under one group.
            </h2>
            <div className="space-y-6 text-white/80 leading-[1.8]">
              <p className="text-base sm:text-lg">
                We empower businesses and communities by uniting five specialized subsidiaries under one trusted roof. From telecommunications infrastructure to reliable courier services, professional cleaning, trained security, and skilled staffing — every service is built to drive real impact.
              </p>
              <p className="text-base sm:text-lg">
                The JOTOFA Group is committed to integrity, innovation, and excellence — building a stronger East Africa through collaboration and forward-thinking solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
