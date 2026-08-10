import type { Metadata } from "next";
import { Strategy } from "@/components/strategy";

export const metadata: Metadata = {
  title: "Our Strategy",
  description:
    "Discover JOTOFA GROUP's strategic vision   our growth roadmap, market expansion plans, digital transformation initiatives, and commitment to operational excellence across East Africa.",
  openGraph: {
    title: "Our Strategy   JOTOFA GROUP",
    description:
      "Discover our strategic vision, growth roadmap, and digital transformation initiatives across East Africa.",
    images: [{ url: "/images/jotofa-hero-3.webp", width: 1200, height: 630, alt: "JOTOFA GROUP Strategy" }],
  },
};

export default function StrategyPage() {
  return (
    <main id="main-content" className="flex-1 pt-14 sm:pt-16">
      <Strategy />
    </main>
  );
}
