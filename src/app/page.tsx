"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { UnifyingExcellence } from "@/components/unifying-excellence";
import { Subsidiaries } from "@/components/subsidiaries";
import { NewsSection } from "@/components/news-section";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";
import { Testimonials } from "@/components/testimonials";
import { homeTestimonials } from "@/lib/testimonials-data";

/* ──────────────────────────────────────────────────────────────────────────
   Home route (`/`) — focused landing page.

   Navigation between pages is now URL-based (router.push in page-context),
   so every other page has its own route file (e.g. /about, /businesses).
   This component only renders the home landing composition. The slim top
   RouteProgress bar + template.tsx fade-in handle transition UX globally.
   ────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <UnifyingExcellence />
        <Subsidiaries />
        <Testimonials
          eyebrow="Client Voices"
          title={<>Trusted by <span className="text-jotofa-accent">Businesses Across Tanzania</span></>}
          subtitle="Organizations from Dar es Salaam to Kigali rely on JOTOFA Group for diversified, dependable, professional services."
          accent="text-jotofa-accent"
          accentBg="bg-jotofa-accent/10"
          accentBorder="border-jotofa-accent/20"
          testimonials={homeTestimonials}
        />
        <NewsSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}
