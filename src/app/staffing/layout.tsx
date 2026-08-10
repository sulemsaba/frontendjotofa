import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staffing & Labour   Workforce Solutions Partner",
  description:
    "JOTOFA Staffing & Labour Supply connects talent with opportunity   recruitment, labour outsourcing, payroll management, training, and HR consulting across Tanzania.",
  openGraph: {
    title: "JOTOFA Staffing & Labour   Workforce Solutions Partner",
    description:
      "Connecting talent with opportunity   providing skilled and semi-skilled labour supply, recruitment, and workforce management solutions across Tanzania.",
  },
  alternates: {
    canonical: "/staffing",
  },
};

export default function StaffingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
