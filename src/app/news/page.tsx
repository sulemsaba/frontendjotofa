import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { News } from "@/components/news";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "Stay updated with the latest news, insights, and press releases from JOTOFA GROUP and our subsidiaries — covering ICT, logistics, security, cleaning, and staffing in East Africa.",
  openGraph: {
    title: "News & Insights — JOTOFA GROUP",
    description:
      "Stay updated with the latest news, insights, and press releases from JOTOFA GROUP and our subsidiaries.",
    images: [{ url: "/images/jotofa-hero-1.jpeg", width: 1200, height: 630, alt: "JOTOFA GROUP News" }],
  },
};

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main id="main-content" className="flex-1 pt-14 sm:pt-16">
        <News />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}
