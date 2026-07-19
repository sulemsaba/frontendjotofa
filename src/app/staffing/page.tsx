import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { StaffingPage } from "@/components/pages/staffing";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";

export const metadata: Metadata = {
  title: "Staffing & Labour Solutions",
  description:
    "JOTOFA Staffing provides comprehensive workforce solutions in Tanzania including permanent recruitment, temporary staffing, executive search, and HR consulting for businesses across all sectors.",
  openGraph: {
    title: "Staffing & Labour Solutions | JOTOFA GROUP",
    description:
      "Comprehensive workforce solutions including permanent recruitment, temporary staffing, executive search, and HR consulting for businesses across Tanzania.",
    images: [{ url: "/images/staffing.webp", width: 1200, height: 630, alt: "JOTOFA Staffing — Labour Solutions" }],
  },
};

export default function StaffingPageRoute() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main id="main-content" className="flex-1 pt-14 sm:pt-16">
        <StaffingPage />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}
