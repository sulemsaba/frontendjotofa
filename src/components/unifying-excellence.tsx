import { PageLink } from "@/lib/page-context";
import { ScrollReveal } from "./scroll-reveal";

/* Server component. The only interactive/animated leaves are PageLink and
   ScrollReveal (both framer-free client components), so this section itself
   ships no JavaScript. */
export function UnifyingExcellence() {
  return (
    <section className="relative w-full bg-jotofa-navy dark:bg-jotofa-navy-card text-white overflow-hidden">
      {/* Inward corner: the page background curves down into the navy section */}
      <div aria-hidden className="h-8 w-full bg-background rounded-b-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-24">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <ScrollReveal duration={0.7} className="w-full lg:w-[38%] flex-shrink-0">
            <div className="flex items-center gap-4 text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-8">
              <span className="inline-block w-10 h-px bg-jotofa-accent" />
              JOTOFA Group
            </div>

            <h1
              className="font-semibold leading-[1.05] tracking-tight text-white mb-8"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.25rem)" }}
            >
              Unifying Excellence.
              <br />
              Empowering Growth.
            </h1>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-md mb-10">
              Three specialized sectors. One shared commitment to quality, integrity, and lasting impact across Tanzania and East Africa.
            </p>

            <PageLink
              page="about"
              className="inline-flex items-center gap-3 text-base sm:text-lg font-medium text-white transition-all duration-200 hover:gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 group"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 transition-all duration-200 group-hover:bg-white group-hover:text-jotofa-navy">
                <span className="text-lg leading-none">&rarr;</span>
              </span>
              Explore the Group
            </PageLink>
          </ScrollReveal>

          {/* Right column - starts lower on desktop */}
          <ScrollReveal duration={0.7} delay={0.2} className="flex-1 lg:mt-24">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block w-8 h-px bg-jotofa-accent" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70">
                Our Ecosystem
              </span>
            </div>

            <h2
              className="font-light leading-snug text-white mb-10"
              style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.25rem)" }}
            >
              ICT, cleaning, and staffing - three subsidiaries united under one group.
            </h2>

            <div className="space-y-6 text-white/80 leading-[1.8] max-w-2xl">
              <p className="text-base sm:text-lg">
                We empower businesses and communities by uniting three specialized subsidiaries under one trusted roof. From telecommunications infrastructure to professional cleaning and skilled staffing - every service is built to drive real impact.
              </p>
              <p className="text-base sm:text-lg text-white/70">
                The JOTOFA Group is committed to integrity, innovation, and excellence - building a stronger East Africa through collaboration and forward-thinking solutions.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
