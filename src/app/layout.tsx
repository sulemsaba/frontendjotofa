import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JOTOFA GROUP — Powering Progress Across Tanzania",
  description:
    "JOTOFA GROUP is a diversified holding company driving innovation through ICT, logistics, cleaning, security, and staffing solutions across Tanzania and East Africa.",
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
    title: "JOTOFA GROUP — Powering Progress Across Tanzania",
    description:
      "A diversified holding company driving innovation through ICT, logistics, cleaning, security, and staffing solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
