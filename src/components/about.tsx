"use client";

import { useEffect, useRef, useState } from "react";
import {
  Landmark,
  Eye,
  Compass,
  Award,
  History,
  MapPin,
  Users,
  Globe,
  Target,
  ArrowRight,
  Quote,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Rocket,
  Shield,
  Building2,
  Truck,
  Wifi,
  Brush,
  UserCheck,
  TrendingUp,
  Briefcase,
  DollarSign,
  Lightbulb,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { usePage } from "@/lib/page-context";

const highlights = [
  {
    icon: Landmark,
    title: "Diversified Portfolio",
    description:
      "Five specialized subsidiaries spanning ICT, logistics, facilities, security, and staffing — creating resilient, multi-sector value.",
    accent: "text-jotofa-gold",
    bg: "bg-jotofa-accent/10",
  },
  {
    icon: MapPin,
    title: "Tanzania-Rooted, Regionally Minded",
    description:
      "Founded in Dar es Salaam with a vision that extends across East Africa — we understand local markets and global standards.",
    accent: "text-utec-cyan",
    bg: "bg-utec-cyan/10",
  },
  {
    icon: Award,
    title: "Commitment to Excellence",
    description:
      "Every subsidiary operates at the highest standards of quality, reliability, and professional integrity — no compromises.",
    accent: "text-cleaning-green",
    bg: "bg-cleaning-green/10",
  },
  {
    icon: History,
    title: "10+ Years of Impact",
    description:
      "Over a decade of steady growth, community investment, and service delivery that has earned the trust of businesses and institutions.",
    accent: "text-courier-orange",
    bg: "bg-courier-orange/10",
  },
];

const timeline = [
  {
    year: "2014",
    title: "Foundation",
    description:
      "JOTOFA GROUP is established in Dar es Salaam, starting with staffing and labour supply services.",
    icon: Rocket,
    accent: "text-staffing-purple",
    bg: "bg-staffing-purple/10",
  },
  {
    year: "2016",
    title: "Security Division",
    description:
      "JOTOFA Security launches, providing manned guarding and surveillance solutions.",
    icon: Shield,
    accent: "text-security-red",
    bg: "bg-security-red/10",
  },
  {
    year: "2018",
    title: "Cleaning & Facilities",
    description:
      "JOTOFA Cleaning & Maids is founded, expanding into commercial and residential services.",
    icon: Brush,
    accent: "text-cleaning-green",
    bg: "bg-cleaning-green/10",
  },
  {
    year: "2020",
    title: "ICT & Telecom",
    description:
      "UTEC Solutions joins the group, bringing digital infrastructure and telecom expertise.",
    icon: Wifi,
    accent: "text-utec-cyan",
    bg: "bg-utec-cyan/10",
  },
  {
    year: "2022",
    title: "Logistics Arm",
    description:
      "JOTOFA Courier & Logistics launches, connecting businesses and communities across Tanzania.",
    icon: Truck,
    accent: "text-courier-orange",
    bg: "bg-courier-orange/10",
  },
  {
    year: "2024",
    title: "Regional Growth",
    description:
      "Expanding operations into East African markets, strengthening the group's cross-border capabilities.",
    icon: TrendingUp,
    accent: "text-jotofa-gold",
    bg: "bg-jotofa-accent/10",
  },
];

const keyNumbers = [
  { icon: Users, value: 500, suffix: "+", label: "Team Members", accent: "text-jotofa-gold", bg: "bg-jotofa-accent/10" },
  { icon: Globe, value: 3, suffix: "", label: "Countries", accent: "text-utec-cyan", bg: "bg-utec-cyan/10" },
  { icon: Target, value: 5, suffix: "", label: "Subsidiaries", accent: "text-cleaning-green", bg: "bg-cleaning-green/10" },
  { icon: History, value: 10, suffix: "+", label: "Years", accent: "text-courier-orange", bg: "bg-courier-orange/10" },
];

const leadership = [
  {
    initials: "JT",
    name: "Joseph Tofa",
    title: "Founder & Group CEO",
    bio: "Visionary leader with 15+ years building diversified enterprises across East Africa",
    accent: "text-jotofa-gold",
    bg: "bg-jotofa-accent/10",
    border: "border-jotofa-accent/20",
  },
  {
    initials: "GM",
    name: "Grace Mushi",
    title: "Chief Operations Officer",
    bio: "Operational excellence architect driving efficiency across all subsidiaries",
    accent: "text-utec-cyan",
    bg: "bg-utec-cyan/10",
    border: "border-utec-cyan/20",
  },
  {
    initials: "PK",
    name: "Peter Kimaro",
    title: "Chief Financial Officer",
    bio: "Strategic financial steward with deep expertise in emerging markets",
    accent: "text-cleaning-green",
    bg: "bg-cleaning-green/10",
    border: "border-cleaning-green/20",
  },
  {
    initials: "AS",
    name: "Amina Said",
    title: "Chief Strategy Officer",
    bio: "Growth strategist connecting local roots with regional expansion",
    accent: "text-staffing-purple",
    bg: "bg-staffing-purple/10",
    border: "border-staffing-purple/20",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We operate with transparency and accountability at every level — from boardroom decisions to frontline service delivery. Our stakeholders trust us because we earn that trust daily.",
    accent: "text-jotofa-gold",
    bg: "bg-jotofa-accent/10",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description:
      "Good enough is never enough. We set the highest standards for quality and relentlessly pursue improvement in every service we deliver and every relationship we build.",
    accent: "text-utec-cyan",
    bg: "bg-utec-cyan/10",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    description:
      "We are rooted in the communities we serve. Every subsidiary contributes to local development, employment, and empowerment — because our success is measured by the impact we create.",
    accent: "text-cleaning-green",
    bg: "bg-cleaning-green/10",
  },
];

/* ── Animated Counter Component ── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  const { setActivePage } = usePage();

  return (
    <div className="bg-background">
      {/* ── Redesigned Opening Hero ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-28 sm:py-36 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-jotofa-accent/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-utec-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-jotofa-accent/[0.02] rounded-full" />

        {/* Decorative corner accents */}
        <div className="absolute top-12 left-8 w-20 h-20 border-l-2 border-t-2 border-jotofa-accent/10 rounded-tl-lg hidden lg:block" />
        <div className="absolute top-12 right-8 w-20 h-20 border-r-2 border-t-2 border-jotofa-accent/10 rounded-tr-lg hidden lg:block" />
        <div className="absolute bottom-24 left-8 w-20 h-20 border-l-2 border-b-2 border-jotofa-accent/10 rounded-bl-lg hidden lg:block" />
        <div className="absolute bottom-24 right-8 w-20 h-20 border-r-2 border-b-2 border-jotofa-accent/10 rounded-br-lg hidden lg:block" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col items-center justify-center">
          {/* Badge */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-jotofa-accent/20 bg-jotofa-accent/5 mb-8">
              <span className="text-jotofa-gold text-sm font-medium">About Us</span>
            </div>
          </ScrollReveal>

          {/* Heading */}
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Who We <span className="text-gold-gradient">Are</span>
            </h1>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.2}>
            <p className="mx-auto max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
              JOTOFA GROUP is a diversified Tanzanian holding company built on the
              principle that progress is achieved through strategic investment,
              operational excellence, and an unwavering commitment to the
              communities we serve.
            </p>
          </ScrollReveal>

          {/* Founder Quote */}
          <ScrollReveal delay={0.3}>
            <div className="relative mx-auto max-w-2xl mb-14 px-6 py-6">
              <Quote className="absolute -top-3 left-0 w-8 h-8 text-jotofa-gold/20 fill-jotofa-gold/10" />
              <blockquote className="text-lg sm:text-xl italic text-foreground/80 leading-relaxed pl-4 border-l-2 border-jotofa-accent/30">
                &ldquo;We didn&apos;t set out to build a conglomerate — we set out to solve problems. 
                Every subsidiary exists because a community needed something done right.&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3 pl-4">
                <div className="w-10 h-10 rounded-full bg-jotofa-accent/15 flex items-center justify-center">
                  <span className="text-sm font-bold text-jotofa-gold">JT</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-foreground">Joseph Tofa</div>
                  <div className="text-xs text-muted-foreground">Founder & Group CEO</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Key numbers - prominent cards */}
          <ScrollReveal delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto w-full">
              {keyNumbers.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.1,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="flex flex-col items-center gap-2 p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-jotofa-accent/25 transition-all duration-300 hover:bg-secondary"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${item.bg}`}>
                    <item.icon className={`w-5 h-5 ${item.accent}`} />
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </span>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll to explore indicator */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-2 mt-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-jotofa-gold/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-gold/15 to-transparent" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-jotofa-accent/5 rounded-full blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {/* Mission */}
              <div className="relative p-8 sm:p-10 rounded-2xl bg-card border border-border overflow-hidden group hover:border-jotofa-accent/15 transition-all duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-jotofa-accent/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-jotofa-accent/10 mb-6">
                    <Compass className="w-7 h-7 text-jotofa-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To drive sustainable growth and innovation across East Africa
                    by building and managing world-class businesses in ICT,
                    logistics, professional services, security, and staffing —
                    creating value for our stakeholders while empowering the
                    communities we serve.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="relative p-8 sm:p-10 rounded-2xl bg-card border border-border overflow-hidden group hover:border-utec-cyan/15 transition-all duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-utec-cyan/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-utec-cyan/10 mb-6">
                    <Eye className="w-7 h-7 text-utec-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the most trusted and impactful diversified holding
                    company in Tanzania and the wider East African region —
                    recognized for operational excellence, innovation, and our
                    commitment to building a prosperous future for all.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Leadership Team ── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-gold/15 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-staffing-purple/5 rounded-full blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Leadership <span className="text-gold-gradient">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The people steering JOTOFA GROUP toward sustained growth and regional impact.
            </p>
          </ScrollReveal>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.12}
          >
            {leadership.map((person) => (
              <StaggerItem key={person.name}>
                <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-jotofa-accent/25 transition-all duration-300 hover:bg-secondary text-center">
                  {/* Avatar circle */}
                  <div className={`mx-auto mb-5 w-20 h-20 rounded-full ${person.bg} border ${person.border} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                    <span className={`text-xl font-bold ${person.accent}`}>{person.initials}</span>
                  </div>
                  {/* Name & Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {person.name}
                  </h3>
                  <p className={`text-sm font-medium ${person.accent} mb-3`}>
                    {person.title}
                  </p>
                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Highlights Grid ── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-gold/15 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cleaning-green/5 rounded-full blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              What Sets Us <span className="text-gold-gradient">Apart</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The pillars that define our approach to business and community impact.
            </p>
          </ScrollReveal>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            staggerDelay={0.1}
          >
            {highlights.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-jotofa-accent/25 transition-all duration-300 hover:bg-secondary">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.bg} mb-5`}
                  >
                    <item.icon className={`w-6 h-6 ${item.accent}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center">
            <button
              onClick={() => setActivePage("strategy")}
              className="inline-flex items-center gap-2 text-jotofa-gold hover:text-jotofa-gold-light font-medium transition-colors group"
            >
              Learn About Our Strategy
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Our Values in Action ── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-gold/15 to-transparent" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-jotofa-accent/5 rounded-full blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Our Values in <span className="text-gold-gradient">Action</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Not just words on a wall — these principles guide every decision we make and every service we deliver.
            </p>
          </ScrollReveal>

          <StaggerContainer
            className="grid sm:grid-cols-3 gap-6"
            staggerDelay={0.15}
          >
            {values.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group h-full p-8 rounded-2xl bg-card border border-border hover:border-jotofa-accent/25 transition-all duration-300 hover:bg-secondary">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${item.bg} mb-6 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <item.icon className={`w-7 h-7 ${item.accent}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Enhanced Timeline ── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-gold/15 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Our <span className="text-gold-gradient">Journey</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A decade of strategic growth, from a single service to a
                diversified group powering progress across Tanzania.
              </p>
            </div>

            <div className="relative">
              {/* Center line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-jotofa-gold/30 via-jotofa-gold/10 to-transparent md:-translate-x-px" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div
                    key={item.year}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 md:w-1/2 pl-12 md:pl-0 md:px-8">
                      <div
                        className={`p-5 rounded-xl bg-card border border-border hover:border-jotofa-accent/20 transition-all group ${
                          i % 2 === 0
                            ? "md:text-right md:mr-8"
                            : "md:text-left md:ml-8"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${item.bg} ${i % 2 === 0 ? "md:order-last md:ml-auto" : ""}`}>
                            <item.icon className={`w-4 h-4 ${item.accent}`} />
                          </div>
                          <span className="text-jotofa-gold font-bold text-sm">
                            {item.year}
                          </span>
                        </div>
                        <h4 className="text-foreground font-semibold mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Dot - enhanced with ring */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-6 z-10">
                      <div className="w-3.5 h-3.5 bg-jotofa-gold rounded-full ring-4 ring-background" />
                      <div className="absolute inset-0 w-3.5 h-3.5 bg-jotofa-accent/30 rounded-full animate-ping" />
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-gold/15 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="p-10 sm:p-14 rounded-2xl border border-jotofa-accent/15 bg-jotofa-accent/[0.03]">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Want to <span className="text-gold-gradient">Work With Us</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Join our team or partner with us to create lasting impact across Tanzania and East Africa.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setActivePage("careers")}
                  className="px-8 py-3.5 bg-jotofa-gold hover:bg-jotofa-gold-light text-black font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-jotofa-gold/25"
                >
                  View Careers
                </button>
                <button
                  onClick={() => setActivePage("contact")}
                  className="px-8 py-3.5 border dark:border-white/20 border-black/20 hover:border-jotofa-accent/40 text-foreground font-medium rounded-full transition-all dark:hover:bg-white/5 hover:bg-black/[0.04]"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
