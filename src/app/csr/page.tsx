import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { CSR } from "@/components/csr";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";

export const metadata: Metadata = {
  title: "CSR Initiatives",
  description:
    "JOTOFA GROUP is committed to making a positive impact — explore our corporate social responsibility initiatives including reforestation, community development, and sustainability programs across Tanzania.",
  openGraph: {
    title: "CSR Initiatives — JOTOFA GROUP",
    description:
      "Explore our corporate social responsibility initiatives including reforestation, community development, and sustainability programs.",
    images: [{ url: "/images/cleaning.webp", width: 1200, height: 630, alt: "JOTOFA GROUP CSR" }],
  },
};

export default function CSRPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <CSR />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}
