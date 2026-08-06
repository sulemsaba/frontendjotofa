import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to frequently asked questions about JOTOFA GROUP, our subsidiaries, and our services across Tanzania.",
  openGraph: {
    title: "FAQ — JOTOFA GROUP",
    description:
      "Find answers to frequently asked questions about JOTOFA GROUP and our five subsidiaries.",
    images: [{ url: "/images/jotofa-hero-1.webp", width: 1200, height: 630, alt: "JOTOFA GROUP FAQ" }],
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main id="main-content" className="flex-1 pt-14 sm:pt-16">
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}
