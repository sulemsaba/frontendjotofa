"use client";

import { PageProvider, usePage, PageId } from "@/lib/page-context";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Subsidiaries } from "@/components/subsidiaries";
import { NewsSection } from "@/components/news-section";
import { Contact } from "@/components/contact";
import { News } from "@/components/news";
import { Careers } from "@/components/careers";
import { Strategy } from "@/components/strategy";
import { CSR } from "@/components/csr";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { BackToTopButton } from "@/components/back-to-top-button";
import { Testimonials } from "@/components/testimonials";
import { homeTestimonials } from "@/lib/testimonials-data";
import { UTECPage } from "@/components/pages/utec";
import { CourierPage } from "@/components/pages/courier";
import { CleaningPage } from "@/components/pages/cleaning";
import { SecurityPage } from "@/components/pages/security";
import { StaffingPage } from "@/components/pages/staffing";
import { motion, AnimatePresence } from "framer-motion";

const pageComponents: Record<PageId, React.ComponentType> = {
  home: Hero,
  about: About,
  businesses: Subsidiaries,
  strategy: Strategy,
  csr: CSR,
  news: News,
  careers: Careers,
  contact: Contact,
  utec: UTECPage,
  courier: CourierPage,
  cleaning: CleaningPage,
  security: SecurityPage,
  staffing: StaffingPage,
};

function PageContent() {
  const { activePage } = usePage();

  // When on home, show a focused landing page with fewer sections
  if (activePage === "home") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Subsidiaries />
          <Testimonials
            eyebrow="Client Voices"
            title={<>Trusted by <span className="text-gold-gradient">Businesses Across Tanzania</span></>}
            subtitle="Organizations from Dar es Salaam to Kigali rely on JOTOFA Group for diversified, dependable, professional services."
            accent="text-jotofa-gold"
            accentBg="bg-jotofa-accent/10"
            accentBorder="border-jotofa-accent/20"
            testimonials={homeTestimonials}
          />
          <NewsSection />
        </main>
        <Footer />
        <WhatsAppButton />
      <BackToTopButton />
      </div>
    );
  }

  // For other pages, show single page component with top padding for fixed nav
  const PageComponent = pageComponents[activePage] || Hero;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <PageComponent />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </div>
  );
}

export default function Home() {
  return <PageContent />;
}
