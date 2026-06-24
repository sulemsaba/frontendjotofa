import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with JOTOFA GROUP — Ubungo Simu 2000, HT House 2nd Floor, Dar es Salaam. Phone: 0794 974 996. Email: procurement@jotofagroup.co.tz.",
  openGraph: {
    title: "JOTOFA GROUP — Contact Us",
    description:
      "Contact JOTOFA GROUP for inquiries about our ICT, logistics, cleaning, security, and staffing solutions across Tanzania and East Africa.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
