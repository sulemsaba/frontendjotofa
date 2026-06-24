import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SecurityPage } from "@/components/pages/security";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata: Metadata = {
  title: "Security Services",
  description:
    "JOTOFA Security provides professional security services in Tanzania including manned guarding, CCTV surveillance, access control systems, and integrated security solutions for businesses.",
  openGraph: {
    title: "Security Services | JOTOFA GROUP",
    description:
      "Professional security services including manned guarding, CCTV surveillance, access control, and integrated security solutions for businesses in Tanzania.",
    images: [{ url: "/images/security.webp", width: 1200, height: 630, alt: "JOTOFA Security Services" }],
  },
};

export default function SecurityPageRoute() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <SecurityPage />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
