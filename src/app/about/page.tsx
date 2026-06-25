import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about JOTOFA GROUP — our mission, vision, leadership, and the story behind Tanzania's premier diversified holding company with five industry-leading subsidiaries.",
  openGraph: {
    title: "About JOTOFA GROUP",
    description:
      "Learn about our mission, vision, and the story behind Tanzania's premier diversified holding company.",
    images: [{ url: "/images/jotofa-hero-1.webp", width: 1200, height: 630, alt: "About JOTOFA GROUP" }],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <About />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}
