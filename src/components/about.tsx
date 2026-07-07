"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePage, PageId } from "@/lib/page-context";

/* ──────────────────────────────────────────────────────────────────────────
   About JOTOFA Group — clean, editorial, minimal.

   Layout (top → bottom):
     1. Hero       — split grid (text 1.2fr / image 1fr). "Five Arms. One
                     Unified Vision." + portrait photograph.
     2. Story      — "Our Journey" header + 2-column milestone timeline
                     (2015 → 2024) with year / title / description rows.
     3. Purpose    — split grid: Mission & Vision (accent left-border) +
                     square image; below, a 5-column values grid.
     4. Ecosystem  — "Five Arms, One Vision" subsidiary list. Each row is a
                     clickable card that routes to the subsidiary page.
     5. Stats      — 5-column minimal counters band.
     6. CTA        — centered "Ready to Partner..." + Contact button.

   Brand palette ONLY (JOTOFA navy + teal). Theme-aware (light + dark).
   Scroll fade-up animations via framer-motion whileInView.
   ────────────────────────────────────────────────────────────────────────── */

/* Shared framer-motion variant — opacity 0 → 1, y 24 → 0 (matches the
   mockup's `.fade` IntersectionObserver behaviour). */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

/* ─── Data ─── */

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const timeline: Milestone[] = [
  {
    year: "2015",
    title: "The Foundation",
    description:
      "JOTOFA Group established to create a diversified holding company empowering Tanzanian businesses through specialized, reliable services.",
  },
  {
    year: "2017",
    title: "UTEC Solutions Launch",
    description:
      "First subsidiary launched to bring cutting-edge ICT infrastructure and telecommunications to businesses across Tanzania.",
  },
  {
    year: "2019",
    title: "The Ecosystem Grows",
    description:
      "Introduced Courier & Logistics, Cleaning & Maids, and JOTOFA Security — creating a comprehensive network under one trusted group.",
  },
  {
    year: "2021",
    title: "Staffing & Labour",
    description:
      "Completed our five-pillar ecosystem by connecting skilled talent with opportunity across Tanzania.",
  },
  {
    year: "2024",
    title: "Regional Expansion",
    description:
      "Extended operations into Kenya and Uganda, bringing our integrated service model to the broader East African market.",
  },
];

interface Value {
  icon: string;
  title: string;
  description: string;
}

const values: Value[] = [
  { icon: "🤝", title: "Integrity", description: "Honesty and transparency in every interaction" },
  { icon: "💡", title: "Innovation", description: "Cutting-edge technology solving real problems" },
  { icon: "⭐", title: "Excellence", description: "Highest standards in everything we do" },
  { icon: "🔗", title: "Unity", description: "Five arms, one unified vision" },
  { icon: "🌍", title: "Impact", description: "Empowering communities across East Africa" },
];

interface EcoSubsidiary {
  number: string;
  name: string;
  description: string;
  page: PageId;
  logo: string;
}

const ecosystem: EcoSubsidiary[] = [
  {
    number: "01",
    name: "UTEC Solutions",
    description: "Cutting-edge ICT infrastructure, telecommunications, and digital transformation",
    page: "utec",
    logo: "/images/utec-logo.png",
  },
  {
    number: "02",
    name: "Courier & Logistics",
    description: "Trusted logistics network ensuring timely, secure delivery across East Africa",
    page: "courier",
    logo: "/images/courier-logo.png",
  },
  {
    number: "03",
    name: "Cleaning & Maids",
    description: "Premium cleaning for commercial, residential, and industrial spaces",
    page: "cleaning",
    logo: "/images/cleaning-logo.png",
  },
  {
    number: "04",
    name: "JOTOFA Security",
    description: "Robust security from manned guarding to electronic surveillance",
    page: "security",
    logo: "/images/security-logo.png",
  },
  {
    number: "05",
    name: "Staffing & Labour",
    description: "Connecting talent with opportunity — skilled and semi-skilled labour supply",
    page: "staffing",
    logo: "/images/staffing-logo.png",
  },
];

interface Stat {
  number: string;
  label: string;
}

const stats: Stat[] = [
  { number: "5", label: "Specialized Sectors" },
  { number: "500+", label: "Dedicated Employees" },
  { number: "10k+", label: "Clients Served" },
  { number: "24/7", label: "Operational Support" },
  { number: "3", label: "Countries Served" },
];

/* ─── Sections ─── */

function AboutHero() {
  return (
    <section className="border-b border-border py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          <motion.div {...fadeUp}>
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-jotofa-accent mb-6">
              About JOTOFA Group
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-8">
              Five Arms.
              <br />
              One Unified{" "}
              <span className="text-gold-gradient">Vision.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-[540px]">
              A diversified Tanzanian holding company driving excellence through
              ICT, logistics, professional services, security, and staffing —
              empowering communities and industries across East Africa.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/images/jotofa-hero-1.jpeg"
              alt="JOTOFA Group headquarters"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="border-b border-border py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <motion.div {...fadeUp} className="max-w-[640px] mb-16 lg:mb-20">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-jotofa-accent mb-4">
            Our Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground leading-[1.2] mb-6">
            Expanding into East African Markets
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            What began as a vision to deliver integrated business solutions in
            Tanzania has evolved into a regional powerhouse through five
            specialized subsidiaries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 lg:gap-x-20 gap-y-0">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className={`grid grid-cols-[80px_1fr] gap-8 py-8 border-t border-border ${
                i === timeline.length - 1 ? "lg:border-b border-b" : ""
              }`}
            >
              <div className="text-sm font-bold text-jotofa-accent pt-1">
                {item.year}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Purpose() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-muted/40 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-24">
          <motion.div {...fadeUp}>
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-jotofa-accent mb-4">
              Our Purpose
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground leading-[1.2] mb-12">
              Driven by Excellence, Guided by Impact
            </h2>

            <div className="mb-10 pl-6 border-l-2 border-jotofa-accent">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses and communities across East Africa by
                delivering specialized, high-quality solutions in technology,
                logistics, facility management, security, and human capital.
              </p>
            </div>

            <div className="pl-6 border-l-2 border-jotofa-accent">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be East Africa&apos;s most trusted and integrated holding
                company, recognized for uniting five specialized arms under one
                commitment to quality, innovation, and impact.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden aspect-square shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <Image
              src="/images/jotofa-hero-3.jpeg"
              alt="Professional team collaboration"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {values.map((value) => (
            <div
              key={value.title}
              className="p-6 sm:p-8 bg-background border border-border rounded-xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-jotofa-accent"
            >
              <div className="text-3xl mb-4">{value.icon}</div>
              <h4 className="text-base font-semibold text-foreground mb-2">
                {value.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const { setActivePage } = usePage();

  return (
    <section className="border-b border-border py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <motion.div {...fadeUp} className="max-w-[640px] mb-12 lg:mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-jotofa-accent mb-4">
            Our Companies
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground leading-[1.2] mb-6">
            Five Arms, <span className="text-gold-gradient">One Vision</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Each subsidiary is a pillar of our group — specialized, yet united
            by a commitment to quality, innovation, and impact.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {ecosystem.map((item, i) => (
            <motion.button
              key={item.number}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              onClick={() => setActivePage(item.page)}
              className="group grid grid-cols-[60px_1fr_auto] sm:grid-cols-[60px_1fr_auto] items-center gap-6 sm:gap-8 p-6 sm:p-8 bg-muted/40 dark:bg-white/[0.03] rounded-xl text-left transition-all duration-300 hover:bg-background hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:translate-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="text-2xl font-extrabold text-jotofa-accent tabular-nums">
                {item.number}
              </span>
              <div className="flex items-center gap-4 min-w-0">
                <div className="hidden sm:flex flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden items-center justify-center bg-white border border-black/5 dark:border-white/10 shadow-sm">
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground/60 transition-all duration-300 group-hover:text-jotofa-accent group-hover:translate-x-1 flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-border py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <motion.div
          {...fadeUp}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-jotofa-accent leading-none mb-2 tracking-tight tabular-nums">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  const { setActivePage } = usePage();

  return (
    <section className="py-20 sm:py-28 lg:py-32 text-center">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2] mb-6 max-w-[800px] mx-auto">
            Ready to Partner with East Africa&apos;s{" "}
            <span className="text-gold-gradient">Unified Powerhouse?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-[600px] mx-auto leading-relaxed">
            Whether you need ICT solutions, logistics support, facility
            management, security services, or workforce solutions — JOTOFA Group
            delivers excellence under one trusted roof.
          </p>
          <button
            onClick={() => setActivePage("contact")}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-jotofa-navy dark:bg-jotofa-accent text-white text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,59,100,0.3)] dark:hover:shadow-[0_12px_40px_rgba(0,169,183,0.4)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Contact JOTOFA Group
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <>
      <AboutHero />
      <Story />
      <Purpose />
      <Ecosystem />
      <Stats />
      <CTA />
    </>
  );
}
