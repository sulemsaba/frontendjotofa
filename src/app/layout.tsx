import type { Metadata } from "next";
import { Open_Sans, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PageProvider } from "@/lib/page-context";
import { RouteProgress } from "@/components/route-progress";

// Per JOTOFA Visual Identity Guidelines p.16: Open Sans for web/digital.
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jotofagroup.co.tz"),
  title: "JOTOFA GROUP — Delivering Excellence Across Industries",
  description:
    "JOTOFA GROUP is a diversified Tanzanian holding company delivering excellence across industries through ICT, logistics, cleaning, security, and staffing solutions.",
  keywords: [
    "JOTOFA",
    "holding company",
    "Tanzania",
    "ICT",
    "logistics",
    "security",
    "cleaning",
    "staffing",
    "East Africa",
  ],
  authors: [{ name: "JOTOFA GROUP" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "JOTOFA GROUP — Delivering Excellence Across Industries",
    description:
      "A diversified Tanzanian holding company delivering excellence across industries through ICT, logistics, cleaning, security, and staffing solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${openSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PageProvider>
            <RouteProgress />
            {children}
            <Toaster />
          </PageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
