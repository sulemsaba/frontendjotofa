import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courier & Logistics — Reliable Delivery Network",
  description:
    "JOTOFA Courier & Logistics provides express delivery, freight, warehousing, cross-border logistics, and last-mile solutions across Tanzania and East Africa.",
  openGraph: {
    title: "JOTOFA Courier & Logistics — Reliable Delivery Network",
    description:
      "A trusted logistics and courier network ensuring timely, secure delivery of goods and documents across Tanzania and East Africa.",
  },
  alternates: {
    canonical: "/courier",
  },
};

export default function CourierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
