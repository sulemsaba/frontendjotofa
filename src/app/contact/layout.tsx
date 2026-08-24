import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with JOTOFA GROUP - HT House, 2nd Floor, Ubungo, Simu 2000 Road, Dar es Salaam. Phone: 0773 383 800. Email: info@jotofagroup.co.tz.",
  openGraph: {
    title: "JOTOFA GROUP - Contact Us",
    description:
      "Contact JOTOFA GROUP for inquiries about our ICT, logistics, cleaning, security services, and staffing solutions across Tanzania and East Africa.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
