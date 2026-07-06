"use client";

import {
  Monitor,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { ScrollReveal } from "../scroll-reveal";
import { Testimonials } from "../testimonials";
import { utecTestimonials } from "@/lib/testimonials-data";
import { usePage } from "@/lib/page-context";
import { UtecProductSpotlight } from "../utec-product-spotlight";
import { UtecProductRepeater } from "../utec-product-repeater";
import { UtecServices } from "../utec-services";
import { storeProductsPageUrl } from "@/lib/store-config";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7", label: "Support Coverage" },
];

export function UTECPage() {
  const { setActivePage } = usePage();

  return (
    <div className="bg-background">
      {/* ───────── HERO — explicit LIGHT theme ─────────
          The site defaults to dark, but the UTEC hero uses a bright, airy
          light palette (white → soft cyan tint, navy text, teal accents) for
          a premium, open feel. A bottom gradient fades smoothly into the dark
          Services section below. All colors are explicit (not theme tokens)
          so the light look is locked regardless of site theme. */}
      <section className="relative min-h-[70vh] flex items-center py-28 sm:py-36 overflow-hidden bg-[#F4FAFC]">
        {/* Base light gradient */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-white via-[#F4FAFC] to-[#E6F4F6]"
        />
        {/* Faint navy grid (light-mode tuned) */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,59,100,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,59,100,0.045) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Soft teal glow — top right */}
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[560px] h-[560px] bg-[#00A9B7]/12 rounded-full blur-[140px] pointer-events-none"
        />
        {/* Soft navy glow — bottom left */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#003B64]/8 rounded-full blur-[120px] pointer-events-none"
        />
        {/* Thin top accent line */}
        <div
          aria-hidden
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A9B7]/40 to-transparent"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A9B7]/30 bg-white shadow-sm mb-6">
              <Monitor className="w-4 h-4 text-[#00A9B7]" />
              <span className="text-[#00A9B7] text-sm font-semibold">UTEC Solutions</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#003B64] mb-6">
              ICT &{" "}
              <span className="text-gold-gradient">Telecommunications</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-[#5E6A75] leading-relaxed max-w-2xl mb-10">
              Delivering cutting-edge ICT infrastructure, telecommunications solutions,
              and digital transformation services that connect businesses and communities across Tanzania.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-white border border-[#003B64]/10 shadow-[0_4px_20px_-8px_rgba(0,59,100,0.15)]"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#00A9B7]">{stat.value}</div>
                  <div className="text-xs text-[#5E6A75] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={storeProductsPageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#00A9B7] hover:bg-[#008799] text-white font-semibold rounded-full transition-all shadow-[0_8px_24px_-8px_rgba(0,169,183,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(0,169,183,0.6)]"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Our Products
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setActivePage("contact")}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#003B64]/20 text-[#003B64] hover:bg-[#003B64]/5 hover:border-[#003B64]/35 rounded-full font-semibold transition-all"
              >
                Talk to Sales <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Smooth fade from the light hero into the dark Services section below */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-background pointer-events-none"
        />
      </section>

      {/* Services (modern bento layout) */}
      <UtecServices />

      {/* Featured Products (curated spotlight, real radios pierce above the box) */}
      <UtecProductSpotlight />

      {/* Full catalog — 3 rows (Repeaters / Mobile / Portables), live from the store */}
      <UtecProductRepeater />

      {/* Testimonials */}
      <Testimonials
        eyebrow="UTEC Client Stories"
        title={<>What UTEC <span className="text-gold-gradient">Clients Say</span></>}
        subtitle="Real outcomes from organizations that transformed their operations with UTEC Solutions."
        accent="text-utec-cyan"
        accentBg="bg-utec-cyan/10"
        accentBorder="border-utec-cyan/20"
        testimonials={utecTestimonials}
      />

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-background" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="p-10 rounded-2xl border border-utec-cyan/15 bg-utec-cyan/[0.03]">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Ready to <span className="text-utec-cyan">Transform</span> Your Business?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let UTEC Solutions design and deploy the technology infrastructure your business needs to thrive — or browse our online store for ready-to-ship equipment.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setActivePage("contact")}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-utec-cyan hover:bg-utec-cyan/90 text-white font-semibold rounded-full transition-all"
                >
                  Contact Us <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={storeProductsPageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border border-utec-cyan/30 text-foreground hover:bg-utec-cyan/10 rounded-full font-semibold transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Visit Online Store <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
