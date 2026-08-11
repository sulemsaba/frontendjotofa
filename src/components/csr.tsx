"use client";

import { GraduationCap, Heart, TreePine, ArrowUpRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { Testimonials } from "./testimonials";
import { csrTestimonials } from "@/lib/testimonials-data";

const csrPillars = [
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Investing in the future by supporting schools, scholarships, digital literacy programs, and vocational training that empower the next generation of Tanzanian leaders.",
    initiatives: [
      "Scholarship programs for underprivileged students",
      "Digital literacy workshops in rural areas",
      "Partnerships with local schools and universities",
      "Vocational training and skill development",
    ],
    accent: "text-jotofa-accent",
    bg: "bg-jotofa-accent/10",
    border: "border-jotofa-accent/20",
    glow: "from-jotofa-accent/10",
    stat: { value: "500+", label: "Students Supported" },
  },
  {
    icon: Heart,
    title: "Health",
    description:
      "Contributing to healthier communities through healthcare access initiatives, wellness programs, and partnerships with health organizations across the regions we serve.",
    initiatives: [
      "Community health screening programs",
      "Support for local healthcare facilities",
      "Employee wellness initiatives",
      "Health awareness campaigns",
    ],
    accent: "text-jotofa-accent",
    bg: "bg-jotofa-accent/10",
    border: "border-jotofa-accent/20",
    glow: "from-jotofa-accent/10",
    stat: { value: "12", label: "Communities Reached" },
  },
  {
    icon: TreePine,
    title: "Environment",
    description:
      "Championing environmental stewardship through sustainable business practices, green initiatives, and community-driven conservation efforts that protect Tanzania's natural heritage.",
    initiatives: [
      "Tree planting and reforestation drives",
      "Sustainable waste management programs",
      "Green office and operations initiatives",
      "Environmental awareness education",
    ],
    accent: "text-jotofa-accent",
    bg: "bg-jotofa-accent/10",
    border: "border-jotofa-accent/20",
    glow: "from-jotofa-accent/10",
    stat: { value: "2,000+", label: "Trees Planted" },
  },
];

export function CSR() {
  return (
    <>
    <section className="relative py-24 sm:py-32 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-jotofa-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-jotofa-accent/5 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Corporate Social{" "}
            <span className="text-jotofa-accent">Responsibility</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            We believe that true success is measured not just in profits, but in
            the positive impact we create for our communities and environment.
          </p>
        </ScrollReveal>

        {/* CSR Pillars */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
          {csrPillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div
                className={`group relative h-full rounded-2xl border ${pillar.border} bg-card overflow-hidden transition-all duration-500 hover:bg-secondary hover:border-opacity-50`}
              >
                {/* Top gradient glow */}
                <div
                  className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${pillar.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 p-6 sm:p-8">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${pillar.bg}`}
                    >
                      <pillar.icon className={`w-7 h-7 ${pillar.accent}`} />
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${pillar.accent}`}>
                        {pillar.stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {pillar.stat.label}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Initiatives list */}
                  <div className="space-y-2.5">
                    {pillar.initiatives.map((initiative) => (
                      <div
                        key={initiative}
                        className="flex items-start gap-2 group/item"
                      >
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 ${pillar.accent} flex-shrink-0 mt-0.5 opacity-60 group-hover/item:opacity-100 transition-opacity`}
                        />
                        <span className="text-xs text-muted-foreground group-hover/item:text-foreground/80 transition-colors">
                          {initiative}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom statement */}
        <ScrollReveal className="mt-16">
          <div className="text-center p-8 sm:p-12 rounded-2xl border border-jotofa-accent/10 bg-jotofa-accent/[0.02]">
            <p className="text-lg sm:text-xl text-foreground/80 font-medium max-w-3xl mx-auto leading-relaxed">
              &ldquo;At JOTOFA GROUP, we don&apos;t just do business in
              Tanzania   we invest in its people, its health, and its
              environment. Our growth is intertwined with the prosperity of
              the communities we serve.&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-jotofa-accent/20 flex items-center justify-center">
                <span className="text-jotofa-accent font-bold text-sm">JG</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground">
                  JOTOFA GROUP
                </div>
                <div className="text-xs text-muted-foreground">
                  Leadership Team
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Testimonials */}
    <Testimonials
      eyebrow="Community Voices"
      title={<>What Our <span className="text-jotofa-accent">Community Partners Say</span></>}
      subtitle="Real impact, told by the schools, health partners, and communities we serve."
      accent="text-jotofa-accent"
      accentBg="bg-jotofa-accent/10"
      accentBorder="border-jotofa-accent/20"
      testimonials={csrTestimonials}
    />
    </>
  );
}
