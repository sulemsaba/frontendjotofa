import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { CourierPage } from "@/components/pages/courier";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";

export const metadata: Metadata = {
  title: "Courier & Logistics Services",
  description:
    "JOTOFA Courier offers reliable same-day delivery, logistics, and courier services across Dar es Salaam and Tanzania. Real-time tracking, GPS-enabled fleet, and express delivery solutions.",
  openGraph: {
    title: "Courier & Logistics Services | JOTOFA GROUP",
    description:
      "Reliable same-day delivery, logistics, and courier services across Dar es Salaam and Tanzania with real-time tracking.",
    images: [{ url: "/images/courier.webp", width: 1200, height: 630, alt: "JOTOFA Courier — Logistics Services" }],
  },
};

export default function CourierPageRoute() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main id="main-content" className="flex-1 pt-14 sm:pt-16">
        <CourierPage />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}
