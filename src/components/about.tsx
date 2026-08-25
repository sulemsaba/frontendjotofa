import Image from "next/image";
import {
  ArrowRight,
  Handshake,
  Lightbulb,
  Star,
  Link2,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { PageLink, PageId } from "@/lib/page-context";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";

/* ──────────────────────────────────────────────────────────────────────────
   About JOTOFA Group - editorial and minimal, rebuilt to share the same
   design language as the home and UTEC pages:
     - framer-free scroll reveals (IntersectionObserver + CSS)
     - brand yellow reserved for the single primary CTA; every decorative
       accent (eyebrows, value icons, rules, hover states) is neutral
     - thin-dash section eyebrows, image cards with a soft shadow, and a
       consistent card/stat vocabulary

   Sections: Hero, Our Journey (timeline), Our Purpose (mission/vision +
   values), Our Companies (ecosystem), Stats band, CTA.
   ────────────────────────────────────────────────────────────────────────── */

/* ─── Small shared bits ─── */

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span aria-hidden className="inline-block w-8 h-px bg-foreground/30" />
      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

const imageCard =
  "relative rounded-2xl overflow-hidden border border-border shadow-[0_20px_60px_rgba(0,20,40,0.12)]";

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
      "Introduced Cleaning & Maids, adding professional facility services to the group's trusted network.",
  },
  {
    year: "2021",
    title: "Staffing & Labour",
    description:
      "Completed our three-pillar ecosystem by connecting skilled talent with opportunity across Tanzania.",
  },
  {
    year: "2024",
    title: "Regional Expansion",
    description:
      "Extended operations into Kenya and Uganda, bringing our integrated service model to the broader East African market.",
  },
];

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: Value[] = [
  { icon: Handshake, title: "Integrity", description: "Honesty and transparency in every interaction" },
  { icon: Lightbulb, title: "Innovation", description: "Cutting-edge technology solving real problems" },
  { icon: Star, title: "Excellence", description: "Highest standards in everything we do" },
  { icon: Link2, title: "Unity", description: "Three arms, one unified vision" },
  { icon: Globe, title: "Impact", description: "Empowering communities across East Africa" },
];

interface EcoSubsidiary {
  number: string;
  name: string;
  description: string;
  page: PageId;
  logo?: string;
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
    name: "Cleaning & Maids",
    description: "Premium cleaning for commercial, residential, and industrial spaces",
    page: "cleaning",
  },
  {
    number: "03",
    name: "Staffing & Labour",
    description: "Connecting talent with opportunity - skilled and semi-skilled labour supply",
    page: "staffing",
  },
];

/* Compact hero strip - the three arms with a short sector tag. */
const arms: { number: string; name: string; sector: string }[] = [
  { number: "01", name: "UTEC Solutions", sector: "ICT & Telecommunications" },
  { number: "02", name: "Cleaning & Maids", sector: "Facility & Cleaning" },
  { number: "03", name: "Staffing & Labour", sector: "Workforce Solutions" },
];

interface Stat {
  number: string;
  label: string;
}

const stats: Stat[] = [
  { number: "3", label: "Specialized Sectors" },
  { number: "500+", label: "Dedicated Employees" },
  { number: "10k+", label: "Clients Served" },
  { number: "24/7", label: "Operational Support" },
  { number: "3", label: "Countries Served" },
];

/* ─── Sections ─── */

function AboutHero() {
  return (
    <section className="relative border-b border-border">
      <div className="container-wide pt-8 sm:pt-12 lg:pt-16 pb-14 sm:pb-20 lg:pb-24">
        <ScrollReveal className="max-w-4xl">
          <SectionEyebrow label="About JOTOFA Group" />
          <h1 className="h-display text-foreground mb-6 sm:mb-8">
            Three specialized arms.
            <br className="hidden sm:block" />{" "}
            <span className="text-muted-foreground">One unified standard.</span>
          </h1>
          <p className="lead max-w-2xl mb-9 sm:mb-10">
            JOTOFA Group is a diversified Tanzanian holding company delivering
            excellence through ICT &amp; telecommunications, professional
            cleaning, and staffing - serving businesses and communities under
            one trusted standard of quality.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <PageLink
              page="contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-jotofa-navy dark:bg-jotofa-accent text-white dark:text-jotofa-navy font-semibold transition-all hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Work with us <ArrowRight className="w-4 h-4" />
            </PageLink>
            <PageLink
              page="strategy"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-foreground/20 text-foreground hover:bg-foreground/5 font-semibold transition-all cursor-pointer"
            >
              Our strategy
            </PageLink>
          </div>
        </ScrollReveal>

        {/* The three arms as a minimal typographic strip - replaces the old
            hero photo, keeps the top clean and confident. */}
        <ScrollReveal
          delay={0.1}
          className="mt-14 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6"
        >
          {arms.map((arm) => (
            <div key={arm.number} className="flex items-baseline gap-3">
              <span className="text-sm font-semibold text-muted-foreground/60 tabular-nums pt-0.5">
                {arm.number}
              </span>
              <div>
                <div className="text-lg font-semibold text-foreground leading-tight">
                  {arm.name}
                </div>
                <div className="body-sm mt-0.5">{arm.sector}</div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="border-b border-border section-py">
      <div className="container-wide">
        <ScrollReveal className="max-w-[640px] mb-12 sm:mb-16 lg:mb-20">
          <SectionEyebrow label="Our Journey" />
          <h2 className="h2 text-foreground mb-5 sm:mb-6">
            Expanding into East African Markets
          </h2>
          <p className="lead">
            What began as a vision to deliver integrated business solutions in
            Tanzania has evolved into a regional powerhouse through three
            specialized subsidiaries.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 lg:gap-x-20 gap-y-0">
          {timeline.map((item) => (
            <StaggerItem
              key={item.year}
              className="grid grid-cols-[56px_1fr] sm:grid-cols-[80px_1fr] gap-4 sm:gap-8 py-6 sm:py-8 border-t border-border last:border-b"
            >
              <div className="text-sm font-bold text-foreground pt-1 tabular-nums">
                {item.year}
              </div>
              <div>
                <h3 className="h3 text-foreground mb-2">{item.title}</h3>
                <p className="body-sm">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Purpose() {
  return (
    <section className="section-py bg-muted/40 dark:bg-white/[0.02]">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16 sm:mb-20 lg:mb-24 items-center">
          <ScrollReveal>
            <SectionEyebrow label="Our Purpose" />
            <h2 className="h2 text-foreground mb-8 sm:mb-12">
              Driven by Excellence, Guided by Impact
            </h2>

            <div className="mb-8 sm:mb-10 pl-5 sm:pl-6 border-l-2 border-foreground/15">
              <h3 className="h4 text-foreground mb-2">Our Mission</h3>
              <p className="body-sm">
                To empower businesses and communities across East Africa by
                delivering specialized, high-quality solutions in technology,
                facility management, and human capital.
              </p>
            </div>

            <div className="pl-5 sm:pl-6 border-l-2 border-foreground/15">
              <h3 className="h4 text-foreground mb-2">Our Vision</h3>
              <p className="body-sm">
                To be East Africa&apos;s most trusted and integrated holding
                company, recognized for uniting three specialized arms under one
                commitment to quality, innovation, and impact.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className={`${imageCard} aspect-[4/3] sm:aspect-square`}>
            <Image
              src="/images/jotofa-hero-3.jpeg"
              alt="Professional team collaboration"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <StaggerItem
                key={value.title}
                className="p-5 sm:p-6 lg:p-8 bg-card border border-border rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-foreground/[0.06] text-foreground mb-3 sm:mb-4">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="h4 text-foreground mb-1.5 sm:mb-2">{value.title}</h4>
                <p className="body-sm">{value.description}</p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Ecosystem() {
  return (
    <section className="border-b border-border section-py">
      <div className="container-wide">
        <ScrollReveal className="max-w-[640px] mb-10 sm:mb-12 lg:mb-16">
          <SectionEyebrow label="Our Companies" />
          <h2 className="h2 text-foreground mb-5 sm:mb-6">
            Three Arms, One Vision
          </h2>
          <p className="lead">
            Each subsidiary is a pillar of our group - specialized, yet united
            by a commitment to quality, innovation, and impact.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid gap-3 sm:gap-4">
          {ecosystem.map((item) => (
            <StaggerItem key={item.number}>
              <PageLink
                page={item.page}
                className="group grid grid-cols-[44px_1fr_auto] sm:grid-cols-[60px_1fr_auto] items-center gap-3 sm:gap-8 p-4 sm:p-6 lg:p-8 bg-card border border-border rounded-2xl text-left transition-all duration-300 hover:border-foreground/25 hover:translate-x-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">
                  {item.number}
                </span>
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="hidden sm:flex flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden items-center justify-center bg-white border border-black/5 dark:border-white/10 shadow-sm">
                    {item.logo && (
                      <Image
                        src={item.logo}
                        alt={`${item.name} logo`}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="h3 text-foreground mb-0.5 sm:mb-1">{item.name}</h3>
                    <p className="body-sm line-clamp-2 sm:line-clamp-none">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/60 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1 flex-shrink-0" />
              </PageLink>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-border section-py">
      <div className="container-wide">
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <div className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-none mb-2 tracking-tight tabular-nums">
                {stat.number}
              </div>
              <div className="body-sm text-xs sm:text-base font-medium">
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section-py text-center">
      <div className="container-wide">
        <ScrollReveal>
          <h2 className="h2 text-foreground mb-5 sm:mb-6 max-w-[800px] mx-auto">
            Ready to Partner with East Africa&apos;s Unified Powerhouse?
          </h2>
          <p className="lead mb-8 sm:mb-10 max-w-[600px] mx-auto">
            Whether you need ICT &amp; telecommunications, professional cleaning,
            or staffing solutions - JOTOFA Group delivers excellence under one
            trusted roof.
          </p>
          <PageLink
            page="contact"
            className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-jotofa-navy dark:bg-jotofa-accent text-white dark:text-jotofa-navy text-sm sm:text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Contact JOTOFA Group
            <ArrowRight className="w-4 h-4" />
          </PageLink>
        </ScrollReveal>
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
