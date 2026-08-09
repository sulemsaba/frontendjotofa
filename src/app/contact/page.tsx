import type { Metadata } from "next";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with JOTOFA GROUP — reach our team for inquiries about ICT solutions, logistics, cleaning services, security, staffing, or general business partnerships in Tanzania and East Africa.",
  openGraph: {
    title: "Contact Us — JOTOFA GROUP",
    description:
      "Get in touch with our team for inquiries about any of our services or business partnerships across East Africa.",
    images: [{ url: "/images/jotofa-hero-3.webp", width: 1200, height: 630, alt: "Contact JOTOFA GROUP" }],
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="flex-1 pt-14 sm:pt-16 bg-background">
      <Contact />
    </main>
  );
}
