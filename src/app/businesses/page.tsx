import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { BusinessesPage } from "@/components/pages/businesses";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";

export const metadata: Metadata = {
  title: "Our Businesses",
  description:
    "Explore JOTOFA GROUP's five industry-leading subsidiaries: UTEC Solutions (ICT), JOTOFA Courier, JOTOFA Cleaning, JOTOFA Security, and JOTOFA Staffing.",
  openGraph: {
    title: "Our Businesses — JOTOFA GROUP Subsidiaries",
    description:
      "Explore our five industry-leading subsidiaries spanning ICT, logistics, cleaning, security, and staffing.",
    images: [{ url: "/images/jotofa-hero-2.webp", width: 1200, height: 630, alt: "JOTOFA GROUP Businesses" }],
  },
};

export default function BusinessesPageRoute() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main id="main-content" className="flex-1 pt-14 sm:pt-16">
        <BusinessesPage />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}
