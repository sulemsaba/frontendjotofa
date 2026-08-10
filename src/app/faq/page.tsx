import type { Metadata } from "next";
import { FAQ } from "@/components/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to frequently asked questions about JOTOFA GROUP, our subsidiaries, and our services across Tanzania.",
  openGraph: {
    title: "FAQ   JOTOFA GROUP",
    description:
      "Find answers to frequently asked questions about JOTOFA GROUP and our five subsidiaries.",
    images: [{ url: "/images/jotofa-hero-1.webp", width: 1200, height: 630, alt: "JOTOFA GROUP FAQ" }],
  },
};

export default function FAQPage() {
  return (
    <main id="main-content" className="flex-1 pt-14 sm:pt-16">
      <FAQ />
    </main>
  );
}
