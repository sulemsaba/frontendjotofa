import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UTEC Solutions   ICT & Telecommunications",
  description:
    "UTEC Solutions, a JOTOFA GROUP subsidiary, delivers cutting-edge ICT infrastructure, cloud solutions, cybersecurity, software development, and telecom services across Tanzania.",
  openGraph: {
    title: "UTEC Solutions   ICT & Telecommunications | JOTOFA GROUP",
    description:
      "Delivering cutting-edge ICT infrastructure, telecommunications solutions, and digital transformation services that connect businesses and communities across Tanzania.",
  },
  alternates: {
    canonical: "/utec",
  },
};

export default function UTECLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
