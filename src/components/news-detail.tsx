"use client";

import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Link as LinkIcon,
  Check,
  ChevronRight,
  Mail,
  Heart,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  Quote,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { usePage } from "@/lib/page-context";

/* ── Types ── */
interface NewsArticle {
  category: string;
  categoryKey: string;
  categoryColor: string;
  categoryBg: string;
  categoryBorder: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  content?: string;
}

interface NewsDetailProps {
  article: NewsArticle;
  relatedArticles: NewsArticle[];
  onBack: () => void;
  onArticleClick?: (article: NewsArticle) => void;
}

/* ── Tags per category ── */
const categoryTags: Record<string, string[]> = {
  group: ["Corporate Strategy", "East Africa", "Growth", "Holding Company", "Diversified Portfolio"],
  utec: ["ICT", "Smart City", "5G", "Telecommunications", "Digital Infrastructure"],
  csr: ["Sustainability", "Reforestation", "Community Impact", "Environmental", "Green Initiative"],
  innovation: ["Digital Transformation", "Technology", "AI & ML", "Cloud", "Innovation"],
  logistics: ["Same-Day Delivery", "Logistics", "E-Commerce", "Fleet Management", "Supply Chain"],
};

/* ── Social Share Icons ── */
function SocialIconButtons() {
  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "Email", href: "#" },
    { icon: LinkIcon, label: "Copy Link", href: "#copy" },
  ];

  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async (href: string) => {
    if (href === "#copy") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // fallback
      }
    }
  }, []);

  return (
    <div className="flex gap-3">
      {socialLinks.map((social) => (
        <button
          key={social.label}
          onClick={() => handleClick(social.href)}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:border-jotofa-accent/30 hover:text-jotofa-accent transition-all duration-200"
          aria-label={social.label}
        >
          {social.href === "#copy" && copied ? (
            <Check className="w-4 h-4 text-cleaning-green" />
          ) : (
            <social.icon className="w-4 h-4" />
          )}
        </button>
      ))}
    </div>
  );
}

/* ── Article Content Generator ── */
function generateArticleContent(article: NewsArticle): {
  lead: string;
  paragraphs: string[];
  pullQuote: string;
  pullQuoteAuthor: string;
  subheading1: string;
  subheading2: string;
  bulletList1: string[];
  bulletList2: string[];
} {
  const contentMap: Record<
    string,
    {
      lead: string;
      paragraphs: string[];
      pullQuote: string;
      pullQuoteAuthor: string;
      subheading1: string;
      subheading2: string;
      bulletList1: string[];
      bulletList2: string[];
    }
  > = {
    "JOTOFA GROUP Expands into East African Markets": {
      lead: "In a landmark strategic move, JOTOFA GROUP has officially launched operations in Kenya and Uganda, marking the group's first expansion beyond Tanzania's borders and signaling a new era of cross-border growth across East Africa.",
      paragraphs: [
        "The expansion, which has been in development for over 18 months, encompasses the full spectrum of JOTOFA's subsidiary operations   from ICT infrastructure deployment through UTEC Solutions to logistics and courier services via JOTOFA Courier. Initial investment exceeds $12 million, with plans to scale operations significantly over the next three years.",
        "The Kenyan operations will be headquartered in Nairobi's Kilimani district, with satellite offices planned for Mombasa and Kisumu. In Uganda, the primary base of operations will be in Kampala, with secondary hubs in Jinja and Entebbe. Both operations are expected to create over 200 direct employment opportunities in their first year, with additional indirect jobs through partner networks and supply chains.",
        "Industry analysts have praised the move as well-timed, noting that both Kenya and Uganda are experiencing rapid digital transformation coupled with growing demand for reliable logistics infrastructure. The East African Community's push for greater economic integration, including streamlined customs procedures and harmonized trade regulations, further supports the viability of cross-border service delivery models like JOTOFA's.",
      ],
      pullQuote: "Our entry into Kenya and Uganda is not merely geographic expansion   it is a commitment to building integrated, technology-driven solutions that serve businesses and communities across borders.",
      pullQuoteAuthor: "JOTOFA GROUP CEO",
      subheading1: "Strategic Infrastructure Investment",
      subheading2: "Regional Growth Framework",
      bulletList1: [
        "Establish headquarters in Nairobi's Kilimani district",
        "Launch satellite offices in Mombasa and Kisumu",
        "Deploy ICT infrastructure across key urban centers",
        "Create 200+ direct employment opportunities in year one",
        "Build cross-border logistics and courier networks",
      ],
      bulletList2: [
        "Set realistic, data-driven regional growth targets",
        "Monitor financial performance across new markets",
        "Strengthen cash flow management for expansion",
        "Align leadership on long-term East African objectives",
        "Review and refine strategy quarterly with local teams",
      ],
    },
    "UTEC Deploys Smart City Infrastructure in Dar es Salaam": {
      lead: "UTEC Solutions, JOTOFA GROUP's ICT subsidiary, has completed the first phase of a transformative smart city project in Dar es Salaam, deploying IoT-enabled traffic management, public Wi-Fi hotspots, and digital service kiosks across key urban corridors.",
      paragraphs: [
        "The $8.5 million project, developed in partnership with the Dar es Salaam City Council and the Tanzania Communications Regulatory Authority, represents the most comprehensive smart city deployment in East Africa to date. Phase one covers the central business district and three major arterial routes, with phases two and three scheduled to extend coverage to 80% of the metropolitan area by 2027.",
        "The public Wi-Fi component alone has already connected over 50,000 unique devices in its first month of operation, providing free high-speed internet access at 120 hotspot locations. The digital service kiosks offer residents access to government services, payment platforms, and health information without the need for personal internet connectivity, bridging the digital divide for underserved communities.",
        "Early results from pilot zones have shown a 23% reduction in average commute times and a 31% decrease in intersection congestion during peak hours, demonstrating the measurable impact of smart city infrastructure on daily life in Tanzania's commercial capital.",
      ],
      pullQuote: "When a mother can get to the hospital faster, when a business can rely on predictable delivery times, when students can access free Wi-Fi   that is when smart city infrastructure truly delivers on its promise.",
      pullQuoteAuthor: "UTEC Solutions Managing Director",
      subheading1: "UrbanFlow Platform in Action",
      subheading2: "Digital Inclusion Initiatives",
      bulletList1: [
        "Deploy 400+ IoT sensors and cameras city-wide",
        "Achieve 23% reduction in average commute times",
        "Connect 50,000+ unique devices via public Wi-Fi",
        "Install 120 free high-speed internet hotspots",
        "Launch digital service kiosks for government access",
      ],
      bulletList2: [
        "Establish community digital centers in underserved areas",
        "Provide free digital literacy training programs",
        "Partner with local universities for ongoing research",
        "Ensure solutions are culturally appropriate",
        "Track survival rates and ecological impact rigorously",
      ],
    },
    "2,000 Trees Planted: JOTOFA's Green Initiative Milestone": {
      lead: "JOTOFA GROUP's environmental stewardship program has reached a significant milestone with the planting of over 2,000 trees across three regions in Tanzania, underscoring the group's commitment to sustainable operations and community-driven reforestation.",
      paragraphs: [
        "The Green JOTOFA Initiative, launched in early 2023, set out with an ambitious target of planting 5,000 trees within three years. Reaching the 2,000-tree mark ahead of schedule has galvanized the organization and its partners, with the program now on track to exceed its original goal by the end of 2025. Reforestation sites span the Morogoro, Tanga, and Pwani regions, each selected for their ecological significance and community needs.",
        "More than 15 indigenous species have been planted, including miombo brachystegia, african teak, and red mahogany   species chosen for their carbon sequestration capacity, soil stabilization properties, and long-term economic value for local communities. The initiative has partnered with three local universities for ongoing monitoring and research, ensuring that survival rates and ecological impact are rigorously tracked.",
        "The program has also created economic opportunities for participating communities, employing over 120 local residents as tree nursery managers, planting crews, and maintenance workers. A community-managed fruit tree component provides sustainable food sources and potential income through harvest sales, ensuring the reforestation effort delivers both environmental and economic returns.",
      ],
      pullQuote: "Environmental responsibility is not a peripheral CSR activity for JOTOFA   it is embedded in how we do business.",
      pullQuoteAuthor: "Head of Sustainability, JOTOFA GROUP",
      subheading1: "Community-Centered Reforestation",
      subheading2: "Sustainable Impact Goals",
      bulletList1: [
        "Plant 5,000+ trees across three regions by 2026",
        "Employ 120+ local residents in reforestation work",
        "Plant 15+ indigenous species for carbon sequestration",
        "Partner with 3 local universities for monitoring",
        "Establish community-managed fruit tree programs",
      ],
      bulletList2: [
        "Set measurable carbon offset targets annually",
        "Monitor financial and ecological ROI regularly",
        "Strengthen community engagement and education",
        "Align reforestation with national climate goals",
        "Expand to additional regions by 2027",
      ],
    },
    "Digital Transformation Across All Subsidiaries": {
      lead: "JOTOFA GROUP has embarked on a comprehensive digital transformation journey, investing in end-to-end platforms that integrate operations across all five subsidiaries under a unified technology architecture.",
      paragraphs: [
        "The multi-year initiative, budgeted at approximately $15 million, encompasses cloud migration, enterprise resource planning, real-time analytics, and customer-facing digital platforms. The transformation touches every aspect of the group's operations   from GPS-enabled fleet tracking at JOTOFA Courier to automated scheduling systems at JOTOFA Cleaning, and from biometric access control at JOTOFA Security to digital recruitment pipelines at JOTOFA Staffing.",
        "Central to the transformation is the JOTOFA Digital Core   a shared services platform built on modern cloud infrastructure that provides common capabilities including identity management, financial reporting, HR administration, and data analytics. By consolidating these functions, the group expects to reduce operational costs by 18% while improving data-driven decision-making across all business units.",
        "The transformation also includes a significant upskilling component, with over 300 employees enrolled in digital literacy and specialized technology training programs. Partnerships with global technology providers ensure access to cutting-edge tools, while local tech talent is being cultivated through internship programs and university collaborations, creating a sustainable pipeline of digital skills within the organization.",
      ],
      pullQuote: "When a client engages with any part of our group, they should experience the same level of digital sophistication, responsiveness, and reliability   regardless of which subsidiary they are working with.",
      pullQuoteAuthor: "Group CTO, JOTOFA GROUP",
      subheading1: "The JOTOFA Digital Core",
      subheading2: "Technology Integration Roadmap",
      bulletList1: [
        "Migrate all subsidiaries to cloud infrastructure",
        "Implement unified ERP across business units",
        "Deploy real-time analytics dashboards",
        "Enroll 300+ employees in digital training",
        "Establish API integrations for enterprise clients",
      ],
      bulletList2: [
        "Set phased rollout timelines per subsidiary",
        "Monitor adoption metrics and user feedback",
        "Strengthen cybersecurity across all platforms",
        "Align digital initiatives with business KPIs",
        "Review technology strategy quarterly",
      ],
    },
    "JOTOFA Courier Launches Same-Day Delivery in Dar es Salaam": {
      lead: "JOTOFA Courier has introduced same-day delivery services across the Dar es Salaam metropolitan area, promising pickup-to-delivery completion within six hours for businesses and individuals   a first for Tanzania's logistics sector.",
      paragraphs: [
        "The express service leverages JOTOFA Courier's existing fleet of 85 vehicles, augmented by a newly acquired fleet of 30 electric motorcycles for rapid urban delivery. Orders placed before 10:00 AM are guaranteed delivery by 4:00 PM the same day, with real-time tracking available through the JOTOFA Courier mobile application and web portal.",
        "Pricing for the same-day service starts at TZS 8,000 for packages up to 5kg within Zone 1 (central business district), with tiered pricing for heavier items and outlying zones. Early adopters include e-commerce platforms, pharmaceutical distributors, and legal firms requiring time-sensitive document delivery   segments that have historically relied on informal courier networks with unpredictable service levels.",
        "The service launch is supported by three newly established micro-hub facilities in Kariakoo, Mikocheni, and Kigamboni, serving as sorting and redistribution points that reduce last-mile delivery times. JOTOFA Courier plans to extend the same-day service to Arusha and Mwanza by Q3 2025, with eventual rollout to all major urban centers in Tanzania.",
      ],
      pullQuote: "Dar es Salaam is a city of over six million people where businesses lose billions annually to unreliable logistics. Our same-day service is designed to eliminate that uncertainty.",
      pullQuoteAuthor: "Operations Director, JOTOFA Courier",
      subheading1: "Technology-Powered Logistics",
      subheading2: "Service Expansion Plans",
      bulletList1: [
        "Deploy 30 electric motorcycles for urban delivery",
        "Guarantee 6-hour delivery for orders before 10 AM",
        "Establish 3 micro-hub facilities in key zones",
        "Launch real-time tracking via mobile app and web",
        "Introduce barcode scanning at every checkpoint",
      ],
      bulletList2: [
        "Expand same-day service to Arusha by Q3 2025",
        "Roll out to Mwanza and other major cities",
        "Build API integrations for e-commerce platforms",
        "Scale fleet with demand-driven procurement",
        "Maintain 99.5%+ on-time delivery rate",
      ],
    },
    "JOTOFA GROUP Achieves ISO 9001 Certification": {
      lead: "JOTOFA GROUP has been awarded ISO 9001:2015 certification, the internationally recognized standard for quality management systems, validating the group's commitment to operational excellence and continuous improvement across all subsidiaries.",
      paragraphs: [
        "The certification, issued by Bureau Veritas following an extensive eight-month audit process, covers the group's headquarters and all five subsidiary operations. The audit evaluated processes ranging from service delivery and customer satisfaction measurement to internal communication, document control, and corrective action procedures   with JOTOFA meeting or exceeding all requirements on the first assessment.",
        "The certification process involved training over 150 staff members as internal quality auditors, establishing standardized quality management procedures across all subsidiaries, and implementing a digital document management system that ensures real-time compliance tracking. Monthly management reviews and quarterly internal audits create a self-reinforcing cycle of quality improvement.",
        "For JOTOFA's clients, particularly those in regulated industries such as financial services and healthcare, the ISO 9001 certification provides an additional layer of assurance when selecting service providers. The certification is expected to open doors to new corporate and institutional clients who mandate ISO compliance in their vendor qualification processes.",
      ],
      pullQuote: "This is not simply a certificate on the wall   it represents a fundamental operational discipline that ensures every service we deliver is held to the highest international standards.",
      pullQuoteAuthor: "Group Quality Assurance Director",
      subheading1: "A Culture of Continuous Improvement",
      subheading2: "Quality Management Systems",
      bulletList1: [
        "Train 150+ staff as internal quality auditors",
        "Establish standardized QMS across all subsidiaries",
        "Implement digital document management system",
        "Conduct monthly management reviews",
        "Pass Bureau Veritas audit on first assessment",
      ],
      bulletList2: [
        "Maintain ISO compliance with quarterly audits",
        "Expand certification scope to new subsidiaries",
        "Integrate QMS with digital core platform",
        "Benchmark against international best practices",
        "Drive continuous improvement culture organization-wide",
      ],
    },
    "UTEC Partners with Tanzania Telecom Authority for 5G Rollout": {
      lead: "UTEC Solutions has entered into a strategic partnership with the Tanzania Communications Regulatory Authority (TCRA) to accelerate the deployment of 5G infrastructure across Tanzania's major urban centers, with pilot deployments expected to begin in Q2 2025.",
      paragraphs: [
        "The partnership positions UTEC Solutions as a key infrastructure provider in Tanzania's 5G rollout strategy, combining UTEC's expertise in telecommunications engineering with TCRA's regulatory framework and spectrum management capabilities. Initial pilot deployments will target Dar es Salaam, Arusha, and Dodoma, with coverage expected to reach 40% of Tanzania's urban population by 2027.",
        "The technical deployment plan calls for the installation of over 600 small cell nodes and 150 macro cell sites in the first phase, utilizing a combination of existing tower infrastructure and new purpose-built installations. UTEC's proprietary network management platform will provide real-time performance monitoring, predictive maintenance alerts, and automated optimization   ensuring consistent service quality as the network scales.",
        "A significant component of the partnership focuses on digital inclusion, with plans to establish 5G-enabled community digital centers in underserved neighborhoods. These centers will provide free access to high-speed internet, digital skills training, and e-government services, ensuring that the benefits of 5G connectivity extend beyond commercial applications to serve Tanzania's broader development goals.",
      ],
      pullQuote: "5G is not just about faster download speeds   it is the foundation for Tanzania's industrial digital transformation.",
      pullQuoteAuthor: "Technical Director, UTEC Solutions",
      subheading1: "Building Tomorrow's Connectivity Today",
      subheading2: "Digital Inclusion Strategy",
      bulletList1: [
        "Install 600+ small cell nodes and 150 macro sites",
        "Target 40% urban population coverage by 2027",
        "Deploy proprietary network management platform",
        "Launch pilot deployments in Dar es Salaam first",
        "Leverage existing tower infrastructure for speed",
      ],
      bulletList2: [
        "Establish 5G-enabled community digital centers",
        "Provide free digital skills training programs",
        "Support e-government service access",
        "Ensure inclusive rollout across underserved areas",
        "Align with national development priorities",
      ],
    },
  };

  const specific = contentMap[article.title];
  if (specific) return specific;

  // Fallback generic content
  return {
    lead: `JOTOFA GROUP continues to strengthen its position as a leading diversified conglomerate in East Africa, with the latest development marking another significant milestone in the group's growth trajectory and strategic vision for the region.`,
    paragraphs: [
      "The announcement reflects JOTOFA GROUP's unwavering commitment to operational excellence and sustainable growth across all its business verticals. With five subsidiaries spanning ICT, logistics, facility management, security, and staffing, the group's integrated approach continues to set industry benchmarks in Tanzania and beyond.",
      "The development is expected to create new employment opportunities and strengthen JOTOFA's market position across multiple sectors. Industry observers note that the group's diversified portfolio provides natural resilience against sector-specific economic fluctuations, while its continued investment in technology and human capital positions it for sustained long-term growth.",
      "Looking ahead, JOTOFA GROUP remains focused on its strategic priorities of geographic expansion, digital transformation, and community impact. The group's five-year strategic plan, unveiled last year, targets significant revenue growth driven by new market entry, service innovation, and operational efficiency improvements across all subsidiaries.",
    ],
    pullQuote: "Our strength lies in our ability to deliver comprehensive, end-to-end solutions that address the complex needs of modern businesses and communities.",
    pullQuoteAuthor: "JOTOFA GROUP Spokesperson",
    subheading1: "Strategic Growth Fundamentals",
    subheading2: "Future Outlook",
    bulletList1: [
      "Document and standardize operational workflows",
      "Automate repetitive and manual tasks",
      "Implement scalable software and digital tools",
      "Define measurable KPIs across departments",
      "Create structured onboarding and training systems",
    ],
    bulletList2: [
      "Set realistic, data-driven growth targets",
      "Monitor financial performance regularly",
      "Strengthen cash flow management",
      "Align leadership on long-term objectives",
      "Review and refine strategy quarterly",
    ],
  };
}

/* ── Helper: get image for article ── */
function getArticleImage(article: NewsArticle): string {
  if (article.image) return article.image;
  const imageMap: Record<string, string> = {
    utec: "/images/utec.png",
    csr: "/images/cleaning.png",
    innovation: "/images/jotofa-hero-2.jpeg",
    logistics: "/images/courier.png",
    group: "/images/jotofa-hero-1.jpeg",
  };
  return imageMap[article.categoryKey] || "/images/jotofa-hero-3.jpeg";
}

function getRelatedImage(categoryKey: string): string {
  const imageMap: Record<string, string> = {
    utec: "/images/utec.png",
    csr: "/images/cleaning.png",
    innovation: "/images/jotofa-hero-2.jpeg",
    logistics: "/images/courier.png",
    group: "/images/jotofa-hero-1.jpeg",
  };
  return imageMap[categoryKey] || "/images/jotofa-hero-3.jpeg";
}

/* ── Animation Variants ── */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
};

/* ── Main Component ── */
export function NewsDetail({ article, relatedArticles, onBack, onArticleClick }: NewsDetailProps) {
  const { setActivePage } = usePage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);

  const content = generateArticleContent(article);
  const heroImage = getArticleImage(article);
  const tags = categoryTags[article.categoryKey] || categoryTags.group;

  const handleSubscribe = useCallback(() => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }, [email]);

  return (
    <motion.div
      className="bg-background min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* ═══════════════════════════════════════════════════════
          EXECORA-STYLE BLOG ARTICLE LAYOUT
          Two-column grid: Article (2fr) | Sidebar (1fr)
          ═══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6 pt-8 sm:pt-12 pb-16">
        {/* Back button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-jotofa-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to News & Insights
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12">
          {/* ═══════════════════════════════════════
              LEFT COLUMN: Article Content
              ═══════════════════════════════════════ */}
          <motion.main
            className="min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Breadcrumbs */}
            <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5 flex-wrap">
              <button onClick={() => setActivePage("home")} className="hover:text-jotofa-accent transition-colors">
                Home
              </button>
              <span>&bull;</span>
              <button onClick={onBack} className="hover:text-jotofa-accent transition-colors">
                News & Insights
              </button>
              <span>&bull;</span>
              <span className="font-semibold text-foreground">{article.category}</span>
            </nav>

            {/* Article Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-5">
              {article.title}
            </h1>

            {/* Article Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-7">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                JOTOFA GROUP
              </span>
              <span className={`px-3 py-0.5 rounded-full text-xs font-medium ${article.categoryBg} ${article.categoryBorder} border ${article.categoryColor}`}>
                {article.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <button
                onClick={() => setLiked(!liked)}
                className="ml-auto text-muted-foreground hover:text-security-red transition-colors"
                aria-label="Like article"
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-security-red text-security-red" : ""}`} />
              </button>
            </div>

            {/* Featured Image */}
            <div className="relative w-full rounded-2xl overflow-hidden mb-8 border border-border">
              <div
                className="w-full h-[250px] sm:h-[350px] lg:h-[450px] bg-cover bg-center"
                style={{ backgroundImage: `url('${heroImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Article Body */}
            <div className="article-body">
              {/* Lead paragraph */}
              <p className="text-base sm:text-lg text-foreground/85 leading-relaxed mb-6 font-medium">
                {content.lead}
              </p>

              {/* First subheading */}
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-10">
                {content.subheading1}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                {content.paragraphs[0]}
              </p>

              {/* Bullet list 1 */}
              <ul className="list-disc pl-6 mb-6 space-y-2.5">
                {content.bulletList1.map((item, i) => (
                  <li key={i} className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Pull Quote */}
              <blockquote className="my-8 p-5 sm:p-6 rounded-xl bg-jotofa-accent/[0.04] border border-jotofa-accent/15 relative overflow-hidden">
                <Quote className="absolute top-3 left-3 w-6 h-6 text-jotofa-accent/15" />
                <p className="text-sm sm:text-base text-foreground leading-relaxed italic mb-3 pl-6">
                  &ldquo;{content.pullQuote}&rdquo;
                </p>
                <footer className="flex items-center gap-2 text-xs text-jotofa-accent font-medium">
                  <div className="w-5 h-0.5 bg-jotofa-accent rounded-full" />
                  {content.pullQuoteAuthor}
                </footer>
              </blockquote>

              {/* Second subheading */}
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 mt-10">
                {content.subheading2}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                {content.paragraphs[1]}
              </p>

              {/* Bullet list 2 */}
              <ul className="list-disc pl-6 mb-6 space-y-2.5">
                {content.bulletList2.map((item, i) => (
                  <li key={i} className="text-sm sm:text-base text-foreground/75 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Remaining paragraphs */}
              {content.paragraphs.slice(2).map((paragraph, index) => (
                <p key={index} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.main>

          {/* ═══════════════════════════════════════
              RIGHT COLUMN: Sidebar
              ═══════════════════════════════════════ */}
          <motion.aside
            className="space-y-8 lg:space-y-10 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2 sidebar-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Share on Social Media */}
            <section>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                Share on Social Media
              </h4>
              <SocialIconButtons />
            </section>

            {/* All Tags */}
            <section>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                All Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-secondary/50 text-foreground/80 hover:bg-jotofa-accent/10 hover:border-jotofa-accent/20 hover:text-jotofa-accent transition-all duration-200 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Related Blogs */}
            <section>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">
                Related Blogs
              </h4>
              <div className="space-y-4">
                {relatedArticles.map((related) => {
                  const relImage = getRelatedImage(related.categoryKey);
                  return (
                    <div
                      key={related.title}
                      onClick={() => {
                        if (onArticleClick) {
                          onArticleClick(related);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          onBack();
                        }
                      }}
                      className="flex gap-3 group cursor-pointer"
                    >
                      <div
                        className="w-[70px] h-[60px] rounded-lg bg-cover bg-center shrink-0 border border-border"
                        style={{ backgroundImage: `url('${relImage}')` }}
                      />
                      <div className="min-w-0">
                        <h5 className="text-sm font-medium text-foreground leading-snug mb-1 group-hover:text-jotofa-accent transition-colors line-clamp-2">
                          {related.title}
                        </h5>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {related.date}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Newsletter Box */}
            <section className="p-5 rounded-2xl border border-border bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Join Our Newsletter
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Get expert insights on business strategy, growth frameworks, and performance delivered to your inbox.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-cleaning-green text-sm font-medium p-3 rounded-lg bg-cleaning-green/10">
                  <Check className="w-4 h-4" />
                  You&apos;re subscribed!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="example@yourmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-accent/30 focus:border-jotofa-accent transition-all mb-3"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="w-full py-2.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-secondary hover:border-jotofa-accent/30 transition-all duration-200"
                  >
                    Subscribe
                  </button>
                </>
              )}
            </section>
          </motion.aside>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CTA BANNER   Execora-style bottom section
          ═══════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[300px] flex items-center"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/jotofa-hero-3.jpeg')" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-jotofa-navy/90 via-jotofa-navy/70 to-jotofa-navy/30" />

          <div className="relative z-10 p-8 sm:p-10 lg:p-12 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Prefer to Talk to Us Directly?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              Get tailored support from our team for specific inquiries or quick questions. We&apos;re here to help you find the right solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActivePage("contact")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-jotofa-navy font-semibold text-sm hover:bg-white/90 transition-all duration-200 hover:shadow-lg"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+255773383800"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                Call Us Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
