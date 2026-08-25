// ─── Shared News Constants ───
// Used by: news.tsx, [slug]/page.tsx, news-detail.tsx

import { resolveImageUrl } from "./api";

// ─── Category UI mappings ───
export const CATEGORY_MAP: Record<string, {
  key: string;
  color: string;
  bg: string;
  border: string;
  label: string;
}> = {
  "Company News":      { key: "group",       color: "text-foreground",     bg: "bg-jotofa-accent/10",   border: "border-jotofa-accent/20",   label: "Group Update" },
  "Group Update":       { key: "group",       color: "text-foreground",     bg: "bg-jotofa-accent/10",   border: "border-jotofa-accent/20",   label: "Group Update" },
  "UTEC Solutions":     { key: "utec",        color: "text-foreground",      bg: "bg-jotofa-accent/10",       border: "border-jotofa-accent/20",       label: "UTEC Solutions" },
  "Technology":         { key: "utec",        color: "text-foreground",      bg: "bg-jotofa-accent/10",       border: "border-jotofa-accent/20",       label: "UTEC Solutions" },
  "CSR":                { key: "csr",         color: "text-foreground", bg: "bg-jotofa-accent/10",  border: "border-jotofa-accent/20",  label: "CSR" },
  "Innovation":         { key: "innovation",  color: "text-foreground", bg: "bg-jotofa-accent/10", border: "border-jotofa-accent/20",  label: "Innovation" },
  "Partnerships":       { key: "group",       color: "text-foreground",     bg: "bg-jotofa-accent/10",   border: "border-jotofa-accent/20",   label: "Partnerships" },
};

export const DEFAULT_CATEGORY = { key: "group", color: "text-foreground", bg: "bg-jotofa-accent/10", border: "border-jotofa-accent/20", label: "Company News" };

// ─── Helper functions ───

export interface RawArticle {
  id: string;
  slug: string;
  category: string;
  categoryKey: string;
  categoryColor: string;
  categoryBg: string;
  categoryBorder: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export function computeReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} MIN READ`;
}

export function formatDate(isoString: string | null | undefined): string {
  if (!isoString) return "RECENTLY";
  const d = new Date(isoString);
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase().replace(".", "");
  return `${month} ${d.getDate()}, ${d.getFullYear()}`;
}

export function mapArticle(api: { id: string; title: string; slug: string; excerpt?: string | null; content: string; image?: string | null; author?: string; category?: string | null; published_at?: string | null }): RawArticle {
  const catName = api.category || "Company News";
  const cat = CATEGORY_MAP[catName] || DEFAULT_CATEGORY;
  return {
    id: api.id,
    slug: api.slug,
    category: cat.label,
    categoryKey: cat.key,
    categoryColor: cat.color,
    categoryBg: cat.bg,
    categoryBorder: cat.border,
    title: api.title,
    excerpt: api.excerpt || "",
    content: api.content || "",
    author: api.author || "JOTOFA Group",
    date: formatDate(api.published_at),
    readTime: computeReadTime(api.content || ""),
    image: resolveImageUrl(api.image),
  };
}

// ─── Fallback articles when API has no data ───

export const FALLBACK_ARTICLES: RawArticle[] = [
  {
    id: "f-1", slug: "jotofa-expands-east-africa",
    category: "Group Update", categoryKey: "group",
    categoryColor: "text-foreground", categoryBg: "bg-jotofa-accent/10", categoryBorder: "border-jotofa-accent/20",
    title: "JOTOFA GROUP Expands into East African Markets with Kenya and Uganda Operations",
    excerpt: "Our regional growth strategy takes a major step forward with new offices in Nairobi and Kampala, strengthening cross-border ICT and professional services across the EAC.",
    content: "", author: "JOTOFA Group", date: "MAR 15, 2026", readTime: "4 MIN READ", image: "/images/jotofa-hero-1.webp",
  },
  {
    id: "f-2", slug: "utec-5g-rollout-dar",
    category: "UTEC Solutions", categoryKey: "utec",
    categoryColor: "text-foreground", categoryBg: "bg-jotofa-accent/10", categoryBorder: "border-jotofa-accent/20",
    title: "UTEC Solutions Begins 5G Infrastructure Rollout in Dar es Salaam",
    excerpt: "A landmark telecommunications project bringing next-generation connectivity to Tanzania's commercial capital, starting with the Kariakoo and CBD districts.",
    content: "", author: "UTEC Solutions", date: "FEB 28, 2026", readTime: "3 MIN READ", image: "/images/utec.webp",
  },
  {
    id: "f-3", slug: "csr-tree-planting-2026",
    category: "CSR", categoryKey: "csr",
    categoryColor: "text-foreground", categoryBg: "bg-jotofa-accent/10", categoryBorder: "border-jotofa-accent/20",
    title: "5,000 Trees Planted: JOTOFA's Green Tanzania Initiative Doubles Impact",
    excerpt: "Our environmental stewardship program reaches a new milestone with reforestation projects across Morogoro, Iringa, and Mbeya regions - doubling last year's target.",
    content: "", author: "JOTOFA Group", date: "JAN 20, 2026", readTime: "2 MIN READ", image: "/images/jotofa-hero-2.webp",
  },
  {
    id: "f-5", slug: "staffing-youth-program",
    category: "Innovation", categoryKey: "innovation",
    categoryColor: "text-foreground", categoryBg: "bg-jotofa-accent/10", categoryBorder: "border-jotofa-accent/20",
    title: "Staffing & Labour Launches Youth Employment Initiative Across Five Regions",
    excerpt: "A new program connecting 500 young Tanzanians with vocational training and job placements in hospitality, manufacturing, and agriculture over the next 18 months.",
    content: "", author: "Staffing & Labour", date: "OCT 25, 2025", readTime: "4 MIN READ", image: "/images/staffing.webp",
  },
  {
    id: "f-6", slug: "utec-cloud-partnership",
    category: "UTEC Solutions", categoryKey: "utec",
    categoryColor: "text-foreground", categoryBg: "bg-jotofa-accent/10", categoryBorder: "border-jotofa-accent/20",
    title: "UTEC Partners with Global Cloud Provider to Launch Tanzania's First Sovereign Cloud",
    excerpt: "A strategic partnership bringing localized cloud infrastructure to Tanzanian businesses and government agencies, ensuring data sovereignty and regulatory compliance.",
    content: "", author: "UTEC Solutions", date: "SEP 14, 2025", readTime: "5 MIN READ", image: "/images/utec.webp",
  },
  {
    id: "f-7", slug: "cleaning-hospital-contracts",
    category: "Group Update", categoryKey: "group",
    categoryColor: "text-foreground", categoryBg: "bg-jotofa-accent/10", categoryBorder: "border-jotofa-accent/20",
    title: "Cleaning & Maids Wins Three Major Hospital Sanitization Contracts",
    excerpt: "Our cleaning division secures contracts with Muhimbili National Hospital, Aga Khan Hospital, and Kilimanjaro Christian Medical Centre for specialized healthcare-grade sanitization.",
    content: "", author: "JOTOFA Group", date: "AUG 3, 2025", readTime: "3 MIN READ", image: "/images/cleaning.webp",
  },
  {
    id: "f-9", slug: "csr-digital-literacy",
    category: "CSR", categoryKey: "csr",
    categoryColor: "text-foreground", categoryBg: "bg-jotofa-accent/10", categoryBorder: "border-jotofa-accent/20",
    title: "JOTOFA Digital Literacy Program Reaches 10,000 Rural Students",
    excerpt: "Our flagship education initiative expands to 50 schools across rural Tanzania, providing tablets, internet access, and teacher training in digital skills.",
    content: "", author: "JOTOFA Group", date: "JUN 5, 2025", readTime: "4 MIN READ", image: "/images/jotofa-hero-3.webp",
  },
  {
    id: "f-10", slug: "staffing-construction-boom",
    category: "Innovation", categoryKey: "innovation",
    categoryColor: "text-foreground", categoryBg: "bg-jotofa-accent/10", categoryBorder: "border-jotofa-accent/20",
    title: "Staffing Division Supplies 800+ Workers for Tanzania's Infrastructure Boom",
    excerpt: "Supporting major construction projects including the Standard Gauge Railway and Julius Nyerere Hydropower Station with skilled and semi-skilled labour.",
    content: "", author: "Staffing & Labour", date: "MAY 22, 2025", readTime: "2 MIN READ", image: "/images/staffing.webp",
  },
  {
    id: "f-11", slug: "group-annual-report-2025",
    category: "Group Update", categoryKey: "group",
    categoryColor: "text-foreground", categoryBg: "bg-jotofa-accent/10", categoryBorder: "border-jotofa-accent/20",
    title: "JOTOFA GROUP Reports 35% Revenue Growth in 2025 Annual Results",
    excerpt: "The group's diversified portfolio drives record performance with ICT and staffing divisions leading growth, while cleaning expands market share across Tanzania.",
    content: "", author: "JOTOFA Group", date: "MAR 1, 2025", readTime: "5 MIN READ", image: "/images/jotofa-hero-1.webp",
  },
  {
    id: "f-13", slug: "group-annual-report-2024",
    category: "Group Update", categoryKey: "group",
    categoryColor: "text-foreground", categoryBg: "bg-jotofa-accent/10", categoryBorder: "border-jotofa-accent/20",
    title: "JOTOFA GROUP Reports Strong Performance in 2024 Annual Results",
    excerpt: "The group's diversified portfolio continues to deliver strong results across all three subsidiaries, with significant growth in ICT and staffing segments.",
    content: "", author: "JOTOFA Group", date: "JAN 15, 2025", readTime: "5 MIN READ", image: "/images/jotofa-hero-1.webp",
  },
];

export const FILTER_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "group", label: "Group Update" },
  { id: "utec", label: "UTEC Solutions" },
  { id: "csr", label: "CSR" },
  { id: "innovation", label: "Innovation" },
];

// ─── Tags per category (for detail page sidebar) ───
export const categoryTags: Record<string, string[]> = {
  group: ["Corporate Strategy", "East Africa", "Growth", "Holding Company", "Diversified Portfolio"],
  utec: ["ICT", "Smart City", "5G", "Telecommunications", "Digital Infrastructure"],
  csr: ["Sustainability", "Reforestation", "Community Impact", "Environmental", "Green Initiative"],
  innovation: ["Digital Transformation", "Technology", "AI & ML", "Cloud", "Innovation"],
};
