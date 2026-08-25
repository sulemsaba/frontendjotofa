import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `standalone` produces a self-contained server bundle for self-hosting
  // (e.g. Docker). On Vercel it conflicts with Vercel's own serverless
  // packaging - the finalize step fails looking for next-server.js.nft.json -
  // so only enable it when NOT building on Vercel (Vercel sets VERCEL=1).
  output: process.env.VERCEL ? undefined : "standalone",
  reactStrictMode: true,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    typedEnv: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: [
    "192.168.1.121",
    ".space-z.ai",
    "preview-chat-1dd5fb44-60a7-4ba0-81e1-3032129ca33f.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
