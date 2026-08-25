"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { PageLink, PageId } from "@/lib/page-context";

/* ──────────────────────────────────────────────────────────────────────────
   Ecosystem Showcase - one section per subsidiary.

   Subsidiaries WITH offerings render as their own pinned scroll-stepper:
   as you scroll through that one section it stays pinned and cycles through
   the subsidiary's offerings (filling teal rail + crossfading copy + swapping
   image), then the page moves on to the next subsidiary. Subsidiaries without
   per-offering content render as a single card. Sections alternate image side
   down the page. Mobile / reduced-motion: everything degrades to stacked lists.
   ────────────────────────────────────────────────────────────────────────── */

interface Offering {
  image: string;
  title: string;
  description: string;
  benefits: string[];
}

interface Sub {
  index: string;
  name: string;
  tagline: string;
  page: PageId;
  /** Fallback / single-card image */
  image: string;
  description: string;
  /** When present, the section becomes a pinned stepper of these offerings. */
  offerings?: Offering[];
  /** Used only by the simple single-card variant. */
  highlights?: string[];
}

const subs: Sub[] = [
  {
    index: "01",
    name: "UTEC Solutions",
    tagline: "ICT & Telecommunications",
    page: "utec",
    image: "/images/subsidiaries/utec.jpg",
    description:
      "From safety and surveillance to solar and IT - UTEC protects and powers businesses across Tanzania.",
    offerings: [
      {
        image: "/images/showcase/utec-safety.jpg",
        title: "Safety & Security",
        description:
          "Certified protective equipment and detection systems that meet international standards.",
        benefits: [
          "Safety boots, helmets & high-visibility uniforms",
          "Walk-through metal detectors & screening mirrors",
          "ICOM portable radios & power backup",
        ],
      },
      {
        image: "/images/showcase/utec-installations.jpg",
        title: "Security Installations",
        description:
          "Integrated surveillance and access control that deters threats and captures evidence.",
        benefits: [
          "HD/UHD CCTV with remote mobile viewing",
          "Biometric access control & automated gates",
          "Intruder alarms & fire detection",
        ],
      },
      {
        image: "/images/showcase/utec-it-ict.jpg",
        title: "IT & ICT Solutions",
        description:
          "Reliable IT infrastructure that keeps your team productive and your data secure.",
        benefits: [
          "Enterprise laptops, desktops & peripherals",
          "Networking, switches & structured cabling",
          "Video conferencing & cloud storage",
        ],
      },
      {
        image: "/images/showcase/utec-solar.jpg",
        title: "Renewable Solar",
        description:
          "High-efficiency solar systems that cut electricity bills by up to 70%.",
        benefits: [
          "Home & office solar lighting",
          "Solar water heaters",
          "Solar street lights & water pumping",
        ],
      },
    ],
  },
  {
    index: "02",
    name: "Cleaning & Maids",
    tagline: "Professional Cleaning",
    page: "cleaning",
    image: "/images/subsidiaries/cleaning.jpg",
    description:
      "Premium cleaning and housekeeping for commercial, residential, and industrial spaces.",
    offerings: [
      {
        image: "/images/showcase/cleaning-commercial.jpg",
        title: "Commercial Cleaning",
        description:
          "Consistent, detail-oriented cleaning for offices, retail, and commercial facilities.",
        benefits: [
          "Daily, weekly, or custom schedules",
          "Trained cleaners with industrial-grade equipment",
          "Quality audits and feedback loops",
        ],
      },
      {
        image: "/images/showcase/cleaning-residential.jpg",
        title: "Residential Cleaning",
        description:
          "Routine and deep cleaning that treats every home with care and consistency.",
        benefits: [
          "Flexible scheduling incl. weekends & same-day",
          "Eco-friendly products safe for families & pets",
          "Vetted, insured, background-checked staff",
        ],
      },
      {
        image: "/images/showcase/cleaning-industrial.jpg",
        title: "Industrial Cleaning",
        description:
          "Specialized equipment and processes to handle tough factory and warehouse jobs safely.",
        benefits: [
          "High-reach & machinery-safe methods",
          "Hazardous material handling & disposal",
          "After-hours availability to avoid downtime",
        ],
      },
    ],
  },
  {
    index: "03",
    name: "Staffing & Labour",
    tagline: "Workforce Solutions",
    page: "staffing",
    image: "/images/subsidiaries/staffing.jpg",
    description:
      "Recruitment, labour outsourcing, and HR consulting - the right talent for the right role.",
    offerings: [
      {
        image: "/images/showcase/staffing-recruitment.jpg",
        title: "Recruitment",
        description:
          "We source, screen, and present candidates who match your skills and culture.",
        benefits: [
          "Permanent, contract & temporary placement",
          "Industry-specific candidate pools",
          "End-to-end onboarding support",
        ],
      },
      {
        image: "/images/showcase/staffing-outsourcing.jpg",
        title: "Labour Outsourcing",
        description:
          "Access trained workers on demand without the overhead of direct employment.",
        benefits: [
          "Skilled & semi-skilled workers across sectors",
          "Payroll, compliance & HR handled for you",
          "Rapid deployment for urgent needs",
        ],
      },
      {
        image: "/images/showcase/staffing-hr.jpg",
        title: "HR Consulting",
        description:
          "Policies, structures, and culture frameworks that attract and retain talent.",
        benefits: [
          "Policy design, org structuring & role profiling",
          "Performance & engagement frameworks",
          "Training tailored to your industry",
        ],
      },
    ],
  },
  {
    index: "04",
    name: "Logistics & Courier",
    tagline: "Reliable Delivery",
    page: "businesses",
    image: "/images/subsidiaries/courier.jpg",
    description:
      "Dependable courier and supply-chain services that move goods and documents safely and on time, right across the region.",
    highlights: ["Courier Delivery", "Supply Chain", "Last-Mile Logistics", "Document Dispatch"],
  },
];

// Static height classes so Tailwind JIT can see the literals. Both mobile and
// desktop are tall/pinned so vertical scroll drives the animation (horizontal
// pan on mobile, vertical stepper on desktop).
const HEIGHT_BY_STEPS: Record<number, string> = {
  3: "h-[230vh] lg:h-[270vh]",
  4: "h-[300vh] lg:h-[360vh]",
};

// ─── Framed image ───────────────────────────────────────────────────────────
function Frame({ src, alt, tagline }: { src: string; alt: string; tagline?: string }) {
  return (
    <div className="relative aspect-[5/4] w-full rounded-2xl overflow-hidden border border-jotofa-navy/10 dark:border-white/10 shadow-[0_30px_80px_rgba(0,20,40,0.16)]">
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-jotofa-navy/65 via-jotofa-navy/10 to-transparent" />
      {tagline && (
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/12 border border-white/20 backdrop-blur-sm">
            <span className="text-xs font-medium text-white">{tagline}</span>
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Subsidiary eyebrow (number + tagline) ──────────────────────────────────
function SubEyebrow({ index, tagline }: { index: string; tagline: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-semibold tabular-nums text-jotofa-accent">{index}</span>
      <span className="inline-block w-8 h-px bg-jotofa-accent/50" />
      <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-jotofa-navy/60 dark:text-white/60">
        {tagline}
      </span>
    </div>
  );
}

function ExploreLink({ page, name }: { page: PageId; name: string }) {
  return (
    <PageLink
      page={page}
      className="inline-flex items-center gap-2 text-sm font-semibold text-jotofa-navy dark:text-white group/exp cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent rounded-sm"
    >
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-jotofa-navy/25 dark:border-white/30 transition-colors group-hover/exp:bg-jotofa-accent group-hover/exp:border-jotofa-accent group-hover/exp:text-white">
        <ArrowRight className="w-4 h-4" />
      </span>
      Explore {name}
    </PageLink>
  );
}

function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-2.5">
          <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-jotofa-accent" />
          <span className="text-sm text-jotofa-navy/80 dark:text-white/80">{b}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── One offering rail (fills across its scroll segment) ────────────────────
function OfferingRail({
  i,
  n,
  active,
  label,
  progress,
  onSelect,
}: {
  i: number;
  n: number;
  active: boolean;
  label: string;
  progress: MotionValue<number>;
  onSelect: () => void;
}) {
  const fill = useTransform(progress, [i / n, (i + 1) / n], [0, 1], { clamp: true });
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className="group/rail flex items-center gap-3 text-left cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative w-[3px] h-8 rounded-full bg-jotofa-navy/15 dark:bg-white/15 overflow-hidden">
        <motion.div style={{ scaleY: fill }} className="absolute inset-0 origin-top rounded-full bg-jotofa-accent" />
      </div>
      <span
        className={`text-[13px] font-medium transition-colors duration-300 whitespace-nowrap ${
          active
            ? "text-jotofa-navy dark:text-white"
            : "text-jotofa-navy/35 dark:text-white/35 group-hover/rail:text-jotofa-navy/70 dark:group-hover/rail:text-white/70"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

// ─── Mobile: pinned, scroll-driven HORIZONTAL pan of a subsidiary's offerings.
//     Same mechanic as the desktop stepper (the section is tall, the content
//     pins, and vertical page scroll drives the animation) but instead of the
//     copy crossfading, the offering cards pan sideways so you see all of them
//     smoothly as you scroll. `progress` is the section's scrollYProgress. ────
function MobileOfferings({
  sub,
  progress,
  scrollToProgress,
}: {
  sub: Sub;
  progress: MotionValue<number>;
  scrollToProgress: (p: number) => void;
}) {
  const offerings = sub.offerings!;
  const n = offerings.length;
  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1)))));
  });

  // Card 0 centred at progress 0, card n-1 centred at progress 1.
  // Card = 78vw, gap = 4vw (step 82vw); centring offset = (100-78)/2 = 11vw.
  const x = useTransform(progress, [0, 1], ["11vw", `${11 - (n - 1) * 82}vw`]);

  return (
    <div className="lg:hidden sticky top-0 h-screen overflow-hidden flex flex-col">
      <div className="px-6 sm:px-8 pt-20 pb-1 flex-shrink-0">
        <SubEyebrow index={sub.index} tagline={sub.tagline} />
        <h3 className="font-light leading-[1.08] tracking-tight text-jotofa-navy dark:text-white mb-4 text-2xl">
          {sub.name}
        </h3>

        {/* Offering tabs (mirror the desktop rail) */}
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {offerings.map((o, i) => (
            <button
              key={o.title}
              type="button"
              onClick={() => scrollToProgress(n > 1 ? i / (n - 1) : 0)}
              aria-current={active === i ? "true" : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors ${
                active === i
                  ? "bg-jotofa-accent text-white"
                  : "bg-jotofa-navy/[0.05] dark:bg-white/[0.06] text-jotofa-navy/70 dark:text-white/70"
              }`}
            >
              {o.title}
            </button>
          ))}
        </div>
        {/* Scroll-linked progress bar */}
        <div className="mt-3 h-[3px] rounded-full bg-jotofa-navy/10 dark:bg-white/10 overflow-hidden">
          <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-jotofa-accent" />
        </div>
      </div>

      {/* Horizontal track panned by the vertical page scroll */}
      <div className="flex-1 min-h-0 flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-[4vw] items-start will-change-transform">
          {offerings.map((o, i) => (
            <motion.div
              key={o.title}
              animate={{ opacity: active === i ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
              className="w-[78vw] shrink-0"
            >
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-jotofa-navy/10 dark:border-white/10">
                <Image src={o.image} alt={o.title} fill sizes="80vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jotofa-navy/55 via-transparent to-transparent" />
              </div>
              <h4 className="text-base font-semibold text-jotofa-navy dark:text-white mt-3 mb-1.5">{o.title}</h4>
              <p className="text-jotofa-text-secondary dark:text-white/70 text-sm leading-relaxed mb-3 line-clamp-2">
                {o.description}
              </p>
              <BenefitList items={o.benefits} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="px-6 sm:px-8 py-5 flex-shrink-0">
        <ExploreLink page={sub.page} name={sub.name} />
      </div>
    </div>
  );
}

// ─── Subsidiary as a pinned scroll-stepper of its offerings ─────────────────
function SubsidiaryStepper({ sub, reversed }: { sub: Sub; reversed: boolean }) {
  const offerings = sub.offerings!;
  const n = offerings.length;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  // Scroll the page so this pinned section's progress lands on `p` (0..1).
  const scrollToProgress = (p: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(0, el.offsetHeight - window.innerHeight);
    window.scrollTo({ top: Math.round(top + scrollable * p), behavior: "smooth" });
  };
  // Desktop: a step is active for v in [i/n, (i+1)/n), so jump to its centre.
  const goTo = (i: number) => scrollToProgress(n <= 1 ? 0 : (i + 0.5) / n);

  const cur = offerings[active];
  const heightClass = HEIGHT_BY_STEPS[n] ?? "h-[240vh] lg:h-[300vh]";

  return (
    <section ref={ref} className={`relative w-full ${heightClass}`}>
      {/* DESKTOP: pinned + cycling */}
      <div className="hidden lg:flex sticky top-0 h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-8 xl:px-10 grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-14 xl:gap-20 items-center">
          {/* Copy */}
          <div className={reversed ? "lg:order-2" : ""}>
            <SubEyebrow index={sub.index} tagline={sub.tagline} />
            <h3 className="font-light leading-[1.08] tracking-tight text-jotofa-navy dark:text-white mb-7 text-4xl xl:text-5xl">
              {sub.name}
            </h3>

            <div className="flex gap-8">
              {/* Offering rail */}
              <div className="flex flex-col gap-3.5 pt-1">
                {offerings.map((o, i) => (
                  <OfferingRail
                    key={o.title}
                    i={i}
                    n={n}
                    active={active === i}
                    label={o.title}
                    progress={scrollYProgress}
                    onSelect={() => goTo(i)}
                  />
                ))}
              </div>

              {/* Crossfading offering copy */}
              <div className="relative flex-1 min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h4 className="text-xl font-semibold text-jotofa-navy dark:text-white mb-3">{cur.title}</h4>
                    <p className="text-jotofa-text-secondary dark:text-white/70 text-[15px] leading-relaxed mb-5 max-w-md">
                      {cur.description}
                    </p>
                    <BenefitList items={cur.benefits} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-9">
              <ExploreLink page={sub.page} name={sub.name} />
            </div>
          </div>

          {/* Visual (crossfade) */}
          <div className={reversed ? "lg:order-1" : ""}>
            <div className="relative aspect-[5/4] w-full rounded-2xl overflow-hidden border border-jotofa-navy/10 dark:border-white/10 shadow-[0_30px_80px_rgba(0,20,40,0.16)]">
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image src={cur.image} alt={cur.title} fill sizes="620px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-jotofa-navy/65 via-jotofa-navy/10 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE: pinned, scroll-driven horizontal pan of offerings */}
      <MobileOfferings sub={sub} progress={scrollYProgress} scrollToProgress={scrollToProgress} />
    </section>
  );
}

// ─── Subsidiary as a single card (no per-offering content) ──────────────────
function SubsidiarySimple({ sub, reversed }: { sub: Sub; reversed: boolean }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className={reversed ? "lg:order-2" : ""}>
          <SubEyebrow index={sub.index} tagline={sub.tagline} />
          <h3 className="font-light leading-[1.08] tracking-tight text-jotofa-navy dark:text-white mb-5 text-4xl xl:text-5xl">
            {sub.name}
          </h3>
          <p className="text-jotofa-text-secondary dark:text-white/70 text-base leading-relaxed max-w-lg mb-7">
            {sub.description}
          </p>
          {sub.highlights && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-9 max-w-lg">
              {sub.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 flex-shrink-0 text-jotofa-accent" />
                  <span className="text-sm text-jotofa-navy/80 dark:text-white/80">{h}</span>
                </div>
              ))}
            </div>
          )}
          <ExploreLink page={sub.page} name={sub.name} />
        </div>
        <div className={reversed ? "lg:order-1" : ""}>
          <Frame src={sub.image} alt={sub.name} tagline={sub.tagline} />
        </div>
      </div>
    </motion.section>
  );
}

export function EcosystemShowcase() {
  return (
    <section className="relative w-full bg-background" aria-label="Our subsidiaries">
      {/* Intro */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 pt-20 sm:pt-24 pb-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="inline-block w-8 h-px bg-jotofa-accent" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-jotofa-navy/60 dark:text-white/60">
            Our Ecosystem
          </span>
          <span className="inline-block w-8 h-px bg-jotofa-accent" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-jotofa-navy dark:text-white mb-4">
          Four Arms, One Group
        </h2>
        <p className="mx-auto max-w-2xl text-jotofa-text-secondary dark:text-white/70 text-lg">
          Each subsidiary is a pillar of JOTOFA Group - specialized, yet united by a shared
          commitment to quality, integrity, and lasting impact.
        </p>
      </div>

      {/* One section per subsidiary, alternating sides */}
      <div className="divide-y divide-jotofa-navy/8 dark:divide-white/8">
        {subs.map((sub, i) =>
          sub.offerings ? (
            <SubsidiaryStepper key={sub.index} sub={sub} reversed={i % 2 === 1} />
          ) : (
            <SubsidiarySimple key={sub.index} sub={sub} reversed={i % 2 === 1} />
          )
        )}
      </div>
    </section>
  );
}
