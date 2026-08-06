import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    ".space-z.ai",
    "preview-chat-1dd5fb44-60a7-4ba0-81e1-3032129ca33f.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
