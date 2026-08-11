"use client";

import {
  Target,
  Rocket,
  Lightbulb,
  Handshake,
  BarChart3,
  Globe,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { Testimonials } from "./testimonials";
import { strategyTestimonials } from "@/lib/testimonials-data";

const objectives = [
  {
    icon: Target,
    title: "Market Leadership",
    description:
      "Establish JOTOFA GROUP as the leading diversified holding company in Tanzania and East Africa through strategic investments and operational excellence.",
    accent: "text-jotofa-accent",
    bg: "bg-jotofa-accent/10",
  },
  {
    icon: Rocket,
    title: "Innovation & Growth",
    description:
      "Drive continuous innovation across all subsidiaries, adopting emerging technologies and expanding into new markets and service verticals.",
    accent: "text-jotofa-accent",
    bg: "bg-jotofa-accent/10",
  },
  {
    icon: Lightbulb,
    title: "Operational Excellence",
    description:
      "Maintain the highest standards of quality, efficiency, and reliability in every service we deliver, setting benchmarks for the industry.",
    accent: "text-jotofa-accent",
    bg: "bg-jotofa-accent/10",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Build enduring partnerships with local and international organizations, fostering mutual growth and expanding our reach and capabilities.",
    accent: "text-courier-orange",
    bg: "bg-courier-orange/10",
  },
  {
    icon: BarChart3,
    title: "Sustainable Profitability",
    description:
      "Ensure long-term financial sustainability through prudent management, diversified revenue streams, and strategic capital allocation.",
    accent: "text-jotofa-accent",
    bg: "bg-jotofa-accent/10",
  },
  {
    icon: Globe,
    title: "Regional Expansion",
    description:
      "Extend our footprint beyond Tanzania into East and Central Africa, bringing our integrated service model to new markets and communities.",
    accent: "text-jotofa-accent",
    bg: "bg-jotofa-accent/10",
  },
];

const values = [
  {
    title: "Integrity",
    description: "We conduct business with transparency, honesty, and accountability at every level.",
  },
  {
    title: "Excellence",
    description: "We pursue the highest standards in everything we do, from service delivery to stakeholder relationships.",
  },
  {
    title: "Innovation",
    description: "We embrace change and continuously seek better, smarter, and more efficient ways to serve.",
  },
  {
    title: "Community",
    description: "We are rooted in our communities and committed to creating shared value and lasting positive impact.",
  },
];

export function Strategy() {
  return (
    <>
    <section className="relative py-24 sm:py-32 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-jotofa-accent/5 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Strategic{" "}
            <span className="text-jotofa-accent">Objectives</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Our roadmap for growth, impact, and sustainable value creation  
            guiding every decision and investment across the group.
          </p>
        </ScrollReveal>

        {/* Objectives grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {objectives.map((obj) => (
            <StaggerItem key={obj.title}>
              <div className="group relative p-6 sm:p-8 rounded-2xl bg-card border-border hover:border-jotofa-accent/25 transition-all duration-300 hover:bg-secondary h-full">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${obj.bg} mb-5`}
                >
                  <obj.icon className={`w-6 h-6 ${obj.accent}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {obj.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {obj.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Values section */}
        <ScrollReveal>
          <div className="relative rounded-2xl border-border bg-card p-8 sm:p-12 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-jotofa-accent/5 rounded-full blur-[100px]" />

            <div className="relative z-10">
              <div className="text-center mb-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Our Core Values
                </h3>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  The principles that define who we are and how we operate  
                  non-negotiable foundations of the JOTOFA culture.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, i) => (
                  <div key={value.title} className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-jotofa-accent/10 border border-jotofa-accent/20 mb-4">
                      <span className="text-jotofa-accent font-bold text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="text-foreground font-semibold mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Testimonials */}
    <Testimonials
      eyebrow="Investor & Partner Voices"
      title={<>What Investors & <span className="text-jotofa-accent">Partners Say</span></>}
      subtitle="Why strategic partners and investors back JOTOFA Group's regional growth strategy."
      accent="text-jotofa-accent"
      accentBg="bg-jotofa-accent/10"
      accentBorder="border-jotofa-accent/20"
      testimonials={strategyTestimonials}
    />
    </>
  );
}
