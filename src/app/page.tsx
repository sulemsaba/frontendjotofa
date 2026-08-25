import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { UnifyingExcellence } from "@/components/unifying-excellence";
import { homeTestimonials } from "@/lib/testimonials-data";

/* ──────────────────────────────────────────────────────────────────────────
   Home route (`/`) - SERVER component shell.

   Above-the-fold (Hero, Unifying Excellence) ships in the main chunk. The
   below-the-fold sections are code-split via next/dynamic so their JavaScript
   loads AFTER the critical content instead of blocking first paint. They still
   server-render (content stays in the HTML for SEO); only their client hydration
   chunk is deferred.
   ────────────────────────────────────────────────────────────────────────── */

const EcosystemShowcase = dynamic(() =>
  import("@/components/ecosystem-showcase").then((m) => m.EcosystemShowcase)
);
const TestimonialSlider = dynamic(() =>
  import("@/components/testimonial-slider").then((m) => m.TestimonialSlider)
);
const NewsSection = dynamic(() =>
  import("@/components/news-section").then((m) => m.NewsSection)
);

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
