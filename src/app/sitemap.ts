import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jotofagroup.co.tz";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${siteUrl}/businesses`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${siteUrl}/strategy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/csr`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/news`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${siteUrl}/careers`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${siteUrl}/utec`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${siteUrl}/courier`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${siteUrl}/cleaning`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${siteUrl}/staffing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  return staticRoutes;
}
