"use client";

import { Hero } from "@/components/hero";
import { UnifyingExcellence } from "@/components/unifying-excellence";
import { EcosystemShowcase } from "@/components/ecosystem-showcase";
import { NewsSection } from "@/components/news-section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { homeTestimonials } from "@/lib/testimonials-data";

/* ──────────────────────────────────────────────────────────────────────────
   Home route (`/`) - focused landing page.

   Navigation between pages is now URL-based (router.push in page-context),
   so every other page has its own route file (e.g. /about, /businesses).
   This component only renders the home landing composition. The slim top
   RouteProgress bar + template.tsx fade-in handle transition UX globally.
   ────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <UnifyingExcellence />
      <EcosystemShowcase />
      <TestimonialSlider
        eyebrow=""
        title={<>Hear from the teams that<br />grows with JOTOFA Group</>}
        subtitle=""
        testimonials={homeTestimonials}
      />
      <NewsSection />
    </main>
  );
}
