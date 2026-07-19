import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { UTECPage } from "@/components/pages/utec";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";

export const metadata: Metadata = {
  title: "UTEC Solutions — ICT Services",
  description:
    "UTEC Solutions, a JOTOFA GROUP subsidiary, delivers cutting-edge ICT services in Tanzania — including network infrastructure, smart city solutions, 5G deployment, and digital transformation for businesses.",
  openGraph: {
    title: "UTEC Solutions — ICT Services | JOTOFA GROUP",
    description:
      "Delivering cutting-edge ICT services including network infrastructure, smart city solutions, and digital transformation in Tanzania.",
    images: [{ url: "/images/utec.webp", width: 1200, height: 630, alt: "UTEC Solutions — ICT Services" }],
  },
};

export default function UTECPageRoute() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main id="main-content" className="flex-1 pt-14 sm:pt-16">
        <UTECPage />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}
