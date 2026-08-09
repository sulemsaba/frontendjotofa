import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Careers = dynamic(
  () => import("@/components/careers").then((m) => ({ default: m.Careers })),
  { ssr: true, loading: () => <CareersSkeleton /> }
);

function CareersSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-jotofa-accent/20 border-t-jotofa-accent" />
        <p className="text-muted-foreground text-sm">Loading opportunities...</p>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join JOTOFA GROUP — explore career opportunities across our five subsidiaries in ICT, logistics, cleaning, security, and staffing. Build your future with Tanzania's premier diversified holding company.",
  openGraph: {
    title: "Careers — JOTOFA GROUP",
    description:
      "Explore career opportunities across our five subsidiaries. Build your future with Tanzania's premier diversified holding company.",
    images: [{ url: "/images/jotofa-hero-1.jpeg", width: 1200, height: 630, alt: "Careers at JOTOFA GROUP" }],
  },
};

export default function CareersPage() {
  return (
    <main id="main-content" className="flex-1 pt-14 sm:pt-16">
      <Careers />
    </main>
  );
}
