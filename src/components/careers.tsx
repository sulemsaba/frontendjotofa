"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Briefcase,
  Building2,
  Clock,
  Users,
  ArrowRight,
  X,
  Globe,
  Share2,
  Bookmark,
  Check,
  ListChecks,
  GraduationCap,
  ShieldCheck,
  Heart,
  Calendar,
  AlertTriangle,
  Home,
  Info,
} from "lucide-react";
import { PageLink } from "@/lib/page-context";
import { JobApplyModal } from "@/components/job-apply-modal";
import { getJobs, getSubsidiaries, type PublicJob, type PublicSubsidiary } from "@/lib/api";
import Image from "next/image";

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */

interface Job {
  id: string;
  backendId?: string;
  title: string;
  category: string;
  company: string;
  location: string;
  remote: boolean;
  type: string;
  description: string;
  qualifications: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  deadline: string;
}

interface SubsidiaryTab {
  key: string;
  label: string;
}

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const defaultSubsidiaryTabs: SubsidiaryTab[] = [
  { key: "jotofa", label: "JOTOFA Group" },
  { key: "utec", label: "UTEC Solutions" },
  { key: "cleaning", label: "Cleaning & Maids" },
  { key: "staffing", label: "Staffing & Labour" },
  { key: "all", label: "All Jobs" },
];

/* ── Dynamic hero data per subsidiary ── */
const subsidiaryHeroData: Record<
  string,
  {
    name: string;
    tagline: string;
    logo: string;
    heroImage: string;
    stats: { label: string; value: string }[];
  }
> = {
  jotofa: {
    name: "JOTOFA Group",
    tagline:
      "Delivering excellence across industries through ICT, professional cleaning, and staffing",
    logo: "/images/jotofa-logo-dark.png",
    heroImage: "/images/jotofa-hero-1.jpeg",
      stats: [
        { label: "Employees", value: "1,200+" },
        { label: "Subsidiaries", value: "3" },
        { label: "Country", value: "Tanzania" },
      ],
    },
    utec: {
    name: "UTEC Solutions",
    tagline:
      "Driving digital transformation through innovative technology solutions",
    logo: "/images/utec.png",
    heroImage: "/images/jotofa-hero-2.jpeg",
    stats: [
      { label: "Employees", value: "200+" },
      { label: "Focus", value: "IT & Tech" },
      { label: "Country", value: "Tanzania" },
    ],
  },
  cleaning: {
    name: "Cleaning & Maids",
    tagline:
      "Setting the standard for professional cleaning services across the region",
    logo: "/images/cleaning.png",
    heroImage: "/images/jotofa-hero-1.jpeg",
    stats: [
      { label: "Employees", value: "250+" },
      { label: "Focus", value: "Facility Services" },
      { label: "Country", value: "Tanzania" },
    ],
  },
  staffing: {
    name: "Staffing & Labour",
    tagline:
      "Connecting talent with opportunity - powering Tanzania's workforce",
    logo: "/images/staffing.png",
    heroImage: "/images/jotofa-hero-3.jpeg",
    stats: [
      { label: "Employees", value: "150+" },
      { label: "Focus", value: "HR & Staffing" },
      { label: "Country", value: "Tanzania" },
    ],
  },
  all: {
    name: "JOTOFA Group",
    tagline: "Explore career opportunities across all our subsidiaries",
    logo: "/images/jotofa-logo-dark.png",
    heroImage: "/images/jotofa-hero-1.jpeg",
    stats: [
      { label: "Employees", value: "1,200+" },
      { label: "Subsidiaries", value: "3" },
      { label: "Country", value: "Tanzania" },
    ],
  },
};

/* Company → subsidiary key mapping for filtering */
const fallbackCompanyToSubKey: Record<string, string> = {
  "UTEC Solutions": "utec",
  "Cleaning & Maids": "cleaning",
  "Staffing & Labour": "staffing",
};

/* ── Demo openings ──
   Shown when no live careers backend is reachable (e.g. the public
   preview/demo deployment) so the page is fully populated instead of empty.
   Real API jobs always take precedence when available. Companies map to the
   three subsidiaries via fallbackCompanyToSubKey; "JOTOFA Group" roles show
   under the group/all tabs. */
const DEMO_JOBS: Job[] = [
  {
    id: "demo-utec-network-engineer",
    title: "Network Engineer",
    category: "Information Technology",
    company: "UTEC Solutions",
    location: "Dar es Salaam",
    remote: false,
    type: "Full-time",
    description:
      "Design, deploy, and maintain enterprise networks and two-way radio infrastructure for clients across Tanzania.",
    qualifications: [
      "Bachelor's degree in Telecommunications, IT, or a related field",
      "3+ years in network engineering or a similar role",
      "CCNA/CCNP certification is an added advantage",
    ],
    responsibilities: [
      "Plan and configure LAN/WAN, VoIP, and radio networks",
      "Monitor network performance and resolve incidents",
      "Support field deployments and client site surveys",
    ],
    requirements: [
      "Strong knowledge of routing, switching, and network security",
      "Willingness to travel to client sites",
      "Fluent in English and Kiswahili",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Professional certification support",
      "Career growth within UTEC",
    ],
    deadline: "2026-10-15",
  },
  {
    id: "demo-utec-field-technician",
    title: "Field Technician (Radio & Security Systems)",
    category: "Engineering & Field Services",
    company: "UTEC Solutions",
    location: "Arusha",
    remote: false,
    type: "Full-time",
    description:
      "Install, commission, and service CCTV, access control, and two-way radio systems at commercial and industrial sites.",
    qualifications: [
      "Diploma in Electronics, Electrical, or Telecommunications",
      "2+ years installing security or radio systems",
    ],
    responsibilities: [
      "Install and configure CCTV, alarms, and radio equipment",
      "Carry out preventive maintenance and fault repair",
      "Document work and train clients on basic use",
    ],
    requirements: [
      "Comfortable working at heights and on-site",
      "Valid driving licence preferred",
      "Available for regional travel",
    ],
    benefits: [
      "Competitive salary",
      "Field allowance",
      "Tools and uniform provided",
      "On-the-job training",
    ],
    deadline: "2026-10-31",
  },
  {
    id: "demo-utec-solar-technician",
    title: "Solar Installation Technician",
    category: "Engineering & Field Services",
    company: "UTEC Solutions",
    location: "Dodoma",
    remote: false,
    type: "Contract",
    description:
      "Install and maintain solar power systems, water heaters, and street lighting for homes, offices, and institutions.",
    qualifications: [
      "Certificate or Diploma in Electrical or Renewable Energy",
      "Hands-on solar installation experience",
    ],
    responsibilities: [
      "Mount panels, wiring, inverters, and batteries",
      "Test and commission installed systems",
      "Advise clients on system care and safety",
    ],
    requirements: [
      "Knowledge of electrical safety standards",
      "Physically fit for installation work",
      "Regional travel as required",
    ],
    benefits: [
      "Attractive contract rate",
      "Field allowance",
      "Path to a permanent role",
      "Renewable-energy training",
    ],
    deadline: "2026-11-15",
  },
  {
    id: "demo-cleaning-supervisor",
    title: "Cleaning Site Supervisor",
    category: "Operations",
    company: "Cleaning & Maids",
    location: "Dar es Salaam",
    remote: false,
    type: "Full-time",
    description:
      "Lead cleaning teams at client sites, ensuring quality, safety, and consistent service standards every day.",
    qualifications: [
      "Certificate in facility management or equivalent experience",
      "2+ years supervising cleaning or facility teams",
    ],
    responsibilities: [
      "Schedule, brief, and supervise cleaning crews",
      "Conduct quality checks and client walkthroughs",
      "Manage supplies, equipment, and safety compliance",
    ],
    requirements: [
      "Strong leadership and communication skills",
      "Attention to detail",
      "Reliable and punctual",
    ],
    benefits: [
      "Competitive salary",
      "Health cover",
      "Uniform provided",
      "Team leadership training",
    ],
    deadline: "2026-09-30",
  },
  {
    id: "demo-cleaning-cleaner",
    title: "Professional Cleaner",
    category: "Operations",
    company: "Cleaning & Maids",
    location: "Mwanza",
    remote: false,
    type: "Full-time",
    description:
      "Deliver high-standard commercial, residential, and industrial cleaning as part of a supervised, uniformed team.",
    qualifications: [
      "Primary or secondary education",
      "Prior cleaning experience is an advantage",
    ],
    responsibilities: [
      "Perform daily cleaning to set checklists",
      "Handle equipment and chemicals safely",
      "Report issues to your site supervisor",
    ],
    requirements: [
      "Reliable, honest, and hardworking",
      "Able to follow safety procedures",
      "Available for shift work",
    ],
    benefits: [
      "Steady monthly pay",
      "Uniform and PPE provided",
      "On-the-job training",
      "Opportunities to advance",
    ],
    deadline: "2026-11-30",
  },
  {
    id: "demo-cleaning-qa",
    title: "Quality Assurance Officer",
    category: "Quality Assurance",
    company: "Cleaning & Maids",
    location: "Dar es Salaam",
    remote: false,
    type: "Full-time",
    description:
      "Audit cleaning sites against service standards and drive continuous improvement across client contracts.",
    qualifications: [
      "Diploma or Degree in a relevant field",
      "Experience in quality control or facility auditing",
    ],
    responsibilities: [
      "Conduct scheduled and surprise site audits",
      "Track KPIs and client satisfaction",
      "Recommend and follow up on corrective actions",
    ],
    requirements: [
      "Detail-oriented with good reporting skills",
      "Comfortable using checklists and simple software",
      "Willing to travel between sites",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Performance bonus",
      "Career development",
    ],
    deadline: "2026-12-15",
  },
  {
    id: "demo-staffing-recruiter",
    title: "Recruitment Consultant",
    category: "Human Resources",
    company: "Staffing & Labour",
    location: "Dar es Salaam",
    remote: false,
    type: "Full-time",
    description:
      "Source, screen, and place skilled and semi-skilled talent for corporate clients across Tanzania.",
    qualifications: [
      "Degree in HR, Business, or a related field",
      "1-3 years in recruitment or HR",
    ],
    responsibilities: [
      "Manage the full recruitment cycle",
      "Build candidate pipelines and client relationships",
      "Coordinate interviews, onboarding, and placements",
    ],
    requirements: [
      "Excellent communication and negotiation skills",
      "Strong organisation and follow-through",
      "Fluent in English and Kiswahili",
    ],
    benefits: [
      "Base salary plus placement commission",
      "Health cover",
      "HR certification support",
      "Fast-track growth",
    ],
    deadline: "2026-10-15",
  },
  {
    id: "demo-staffing-payroll",
    title: "HR & Payroll Officer",
    category: "Human Resources",
    company: "Staffing & Labour",
    location: "Dar es Salaam",
    remote: false,
    type: "Full-time",
    description:
      "Run accurate payroll and HR administration for outsourced staff across multiple client sites.",
    qualifications: [
      "Degree or Diploma in HR, Accounting, or a related field",
      "Experience with payroll and statutory filings (PAYE, NSSF)",
    ],
    responsibilities: [
      "Process monthly payroll and payslips",
      "Maintain staff records and contracts",
      "Ensure statutory and labour-law compliance",
    ],
    requirements: [
      "Strong numeracy and confidentiality",
      "Proficiency in spreadsheets and payroll tools",
      "High accuracy under deadlines",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Training in HR systems",
      "Stable, professional environment",
    ],
    deadline: "2026-11-30",
  },
  {
    id: "demo-group-finance",
    title: "Group Finance Officer",
    category: "Finance & Administration",
    company: "JOTOFA Group",
    location: "Dar es Salaam",
    remote: false,
    type: "Full-time",
    description:
      "Support group-level financial reporting, budgeting, and controls across all three subsidiaries.",
    qualifications: [
      "Degree in Accounting or Finance",
      "CPA(T) or ACCA (part-qualified acceptable)",
      "2+ years in a finance role",
    ],
    responsibilities: [
      "Prepare management accounts and reconciliations",
      "Assist with budgeting and cash-flow monitoring",
      "Support audits and statutory reporting",
    ],
    requirements: [
      "Solid knowledge of accounting standards",
      "Strong Excel and accounting-software skills",
      "High integrity and attention to detail",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Study and CPD support",
      "Group-wide career path",
    ],
    deadline: "2026-12-15",
  },
  {
    id: "demo-group-marketing",
    title: "Marketing Executive",
    category: "Sales & Marketing",
    company: "JOTOFA Group",
    location: "Dar es Salaam",
    remote: true,
    type: "Full-time",
    description:
      "Grow the JOTOFA Group brand and generate leads across the group's ICT, cleaning, and staffing services.",
    qualifications: [
      "Degree in Marketing, Communications, or a related field",
      "1-3 years in marketing or business development",
    ],
    responsibilities: [
      "Plan and run digital and offline campaigns",
      "Manage social media and content",
      "Support proposals and client outreach",
    ],
    requirements: [
      "Creative with strong writing skills",
      "Familiar with social and design tools",
      "Fluent in English and Kiswahili",
    ],
    benefits: [
      "Competitive salary",
      "Performance bonus",
      "Health cover",
      "Room to grow the function",
    ],
    deadline: "2026-10-31",
  },
];

const PAGE_SIZE_OPTIONS = [10, 50, 100] as const;

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function detailsFor(job: PublicJob, section: string) {
  return job.details
    .filter((detail) => detail.section.toLowerCase() === section)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((detail) => detail.content);
}

function mapPublicJob(job: PublicJob): Job {
  return {
    id: job.job_id,
    backendId: job.id,
    title: job.title,
    category: job.category_name || "Uncategorized",
    company: job.company_name,
    location: job.location,
    remote: job.remote,
    type: job.type,
    description: job.description || "",
    qualifications: detailsFor(job, "qualifications"),
    responsibilities: detailsFor(job, "responsibilities"),
    requirements: detailsFor(job, "requirements"),
    benefits: detailsFor(job, "benefits"),
    deadline: job.deadline || "",
  };
}

/* ─────────────────────────────────────────────
   MAIN CAREERS COMPONENT
   ───────────────────────────────────────────── */

export function Careers() {

  /* ── State ── */
  const [activeTab, setActiveTab] = useState("jotofa");
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [expandedJob, setExpandedJob] = useState<string | null>(null); // preview mode
  const [expandedFullJob, setExpandedFullJob] = useState<string | null>(null); // full details mode
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [apiSubsidiaries, setApiSubsidiaries] = useState<PublicSubsidiary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCareers() {
      setIsLoading(true);
      setLoadError("");
      try {
        const [jobList, subsidiaryList] = await Promise.all([
          getJobs(),
          getSubsidiaries(),
        ]);
        if (cancelled) return;
        const mapped = jobList.map(mapPublicJob);
        // Fall back to sample openings when the live API returns nothing, so
        // the demo/preview is never an empty page.
        setJobsData(mapped.length ? mapped : DEMO_JOBS);
        setApiSubsidiaries(subsidiaryList);
      } catch {
        if (!cancelled) {
          // No live careers backend reachable (e.g. the public preview) - show
          // demo openings instead of an error so the page stays presentable.
          setJobsData(DEMO_JOBS);
          setApiSubsidiaries([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadCareers();

    return () => {
      cancelled = true;
    };
  }, []);

  const subsidiaryTabs = useMemo<SubsidiaryTab[]>(() => {
    if (!apiSubsidiaries.length) return defaultSubsidiaryTabs;
    return [
      { key: "jotofa", label: "JOTOFA Group" },
      ...apiSubsidiaries
        .filter((sub) => sub.key !== "jotofa")
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((sub) => ({ key: sub.key, label: sub.label })),
      { key: "all", label: "All Jobs" },
    ];
  }, [apiSubsidiaries]);

  const categories = useMemo(
    () => ["All Categories", ...uniqueSorted(jobsData.map((job) => job.category))],
    [jobsData]
  );

  const companies = useMemo(
    () => ["All Companies", ...uniqueSorted(jobsData.map((job) => job.company))],
    [jobsData]
  );

  const companyToSubKey = useMemo(() => {
    const map: Record<string, string> = { ...fallbackCompanyToSubKey };
    apiSubsidiaries.forEach((sub) => {
      map[sub.name] = sub.key;
      map[sub.label] = sub.key;
    });
    jobsData.forEach((job) => {
      if (!map[job.company]) {
        const match = apiSubsidiaries.find((sub) => sub.name === job.company || sub.label === job.company);
        if (match) map[job.company] = match.key;
      }
    });
    return map;
  }, [apiSubsidiaries, jobsData]);

  const heroDataByKey = useMemo(() => {
    const data = { ...subsidiaryHeroData };
    apiSubsidiaries.forEach((sub) => {
      const fallback = subsidiaryHeroData[sub.key] || subsidiaryHeroData.jotofa;
      data[sub.key] = {
        name: sub.name,
        tagline: sub.tagline || fallback.tagline,
        logo: sub.logo || fallback.logo,
        heroImage: sub.hero_image || fallback.heroImage,
        stats: sub.stats?.length
          ? [...sub.stats]
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((stat) => ({ label: stat.label, value: stat.value }))
          : fallback.stats,
      };
    });
    return data;
  }, [apiSubsidiaries]);

  /* ── Determine which hero to show based on tab OR company filter ── */
  const activeHeroKey = useMemo(() => {
    // If a specific company is selected via filter, use that
    if (selectedCompany !== "All Companies") {
      return companyToSubKey[selectedCompany] || activeTab;
    }
    return activeTab;
  }, [activeTab, selectedCompany]);

  /* ── Filtered Jobs ── */
  const filteredJobs = useMemo(() => {
    let result = [...jobsData];

    if (activeTab !== "jotofa" && activeTab !== "all") {
      result = result.filter(
        (job) => companyToSubKey[job.company] === activeTab
      );
    }

    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(kw) ||
          j.category.toLowerCase().includes(kw) ||
          j.company.toLowerCase().includes(kw) ||
          j.id.toLowerCase().includes(kw)
      );
    }

    if (selectedCategory !== "All Categories") {
      result = result.filter((j) => j.category === selectedCategory);
    }

    if (selectedCompany !== "All Companies") {
      result = result.filter((j) => j.company === selectedCompany);
    }

    return result;
  }, [activeTab, keyword, selectedCategory, selectedCompany, companyToSubKey, jobsData]);

  /* ── Pagination ── */
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  /* ── Handlers ── */
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setExpandedJob(null);
    setExpandedFullJob(null);
  }, []);

  const handleCategorySelect = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setShowCategoryDropdown(false);
    setCurrentPage(1);
    setExpandedJob(null);
    setExpandedFullJob(null);
  }, []);

  const handleCompanySelect = useCallback((comp: string) => {
    setSelectedCompany(comp);
    setShowCompanyDropdown(false);
    setCurrentPage(1);
    setExpandedJob(null);
    setExpandedFullJob(null);
  }, []);

  const handleKeywordChange = useCallback((val: string) => {
    setKeyword(val);
    setCurrentPage(1);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  const toggleSaveJob = useCallback((jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return next;
    });
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setShowCategoryDropdown(false);
    setShowCompanyDropdown(false);
  }, []);

  /* ── Deadline helper ── */
  const getDeadlineInfo = useCallback((deadline: string) => {
    const daysLeft = Math.ceil(
      (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysLeft < 0)
      return { status: "closed" as const, daysLeft, label: "Closed" };
    if (daysLeft <= 7)
      return {
        status: "urgent" as const,
        daysLeft,
        label: `${daysLeft}d left`,
      };
    return {
      status: "open" as const,
      daysLeft,
      label: new Date(deadline).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  }, []);

  /* ── Hero data for current key ── */
  const heroData = heroDataByKey[activeHeroKey] || heroDataByKey.jotofa;

  return (
    <section
      className="relative min-h-screen bg-background"
      onClick={closeAllDropdowns}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeAllDropdowns();
        }
      }}
    >
      {/* ═══════════════════════════════════════
          1. HERO BANNER (max-w-6xl - wider than job list)
          ═══════════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative w-full h-[200px] sm:h-[260px] rounded-2xl overflow-hidden">
          <Image
            src={heroData.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-jotofa-navy/90 via-jotofa-navy/75 to-jotofa-navy/50" />

          <div className="relative z-10 flex items-center h-full px-5 sm:px-8">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                  <Image
                    src={heroData.logo}
                    alt={heroData.name}
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
               </div>
               <div className="min-w-0">
                 <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight mb-1">
                   {heroData.name}
                 </h1>
                 <p className="text-xs sm:text-sm text-white/70 leading-snug max-w-md hidden sm:block">
                   {heroData.tagline}
                 </p>
                 <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
                   {heroData.stats.map((stat, idx) => (
                     <span key={stat.label} className="contents">
                       <div className="flex items-center gap-1.5 text-white/70 text-[11px] sm:text-xs">
                         {idx === 0 && <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                         <span>
                           {stat.value} {stat.label}
                         </span>
                       </div>
                       {idx < heroData.stats.length - 1 && (
                         <span className="w-1 h-1 rounded-full bg-white/40" />
                       )}
                     </span>
                   ))}
                 </div>
               </div>
             </div>

            <div className="ml-auto hidden md:block">
              <PageLink
                page="about"
                className="px-5 py-2 text-sm font-medium rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                About {heroData.name}
              </PageLink>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          2. SUB NAVIGATION BAR
          ═══════════════════════════════════════ */}
      <div className="bg-card border-b border-border mt-6 relative">
        <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto scrollbar-hide -mx-1 py-0">
            {subsidiaryTabs.map((sub) => {
               const isActive = activeTab === sub.key;
               return (
                 <button
                   key={sub.key}
                   onClick={(e) => {
                     e.stopPropagation();
                     handleTabChange(sub.key);
                   }}
                   className={`
                     relative flex items-center gap-2 px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors shrink-0 min-h-[44px]
                     ${
                        isActive
                          ? "text-jotofa-navy dark:text-white"
                          : "text-jotofa-navy/70 dark:text-white/70 hover:text-jotofa-navy dark:hover:text-white/90"
                     }
                   `}
                 >
                  <span>{sub.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-jotofa-navy dark:bg-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {/* Scroll hint gradient on right edge - mobile only */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none sm:hidden" />
      </div>

      {/* ═══════════════════════════════════════
          3. SEARCH + FILTERS (one compact bar)
          ═══════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col gap-3">
          {/* Search input - full width on all screens */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search keyword, category, or job title"
              value={keyword}
              onChange={(e) => handleKeywordChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-jotofa-navy/20 focus:border-jotofa-navy/40 transition-all"
            />
          </div>

          {/* Filters row: Category + Company + Clear */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Category filter */}
            <div className="relative flex-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowCompanyDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-input bg-card text-sm text-foreground hover:border-jotofa-navy/30 transition-colors min-h-[44px]"
              >
                <Briefcase className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="truncate flex-1 text-left">
                  {selectedCategory === "All Categories"
                    ? "All Categories"
                    : selectedCategory}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card rounded-2xl border border-border z-50 max-h-60 overflow-y-auto shadow-lg">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelect(cat);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary dark:hover:bg-jotofa-navy transition-colors ${
                        selectedCategory === cat
                          ? "text-jotofa-navy dark:text-white font-medium"
                          : "text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Company filter */}
            <div className="relative flex-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCompanyDropdown(!showCompanyDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-input bg-card text-sm text-foreground hover:border-jotofa-navy/30 transition-colors min-h-[44px]"
              >
                <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="truncate flex-1 text-left">
                  {selectedCompany === "All Companies"
                    ? "All Companies"
                    : selectedCompany}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </button>
              {showCompanyDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card rounded-2xl border border-border z-50 max-h-60 overflow-y-auto shadow-lg">
                  {companies.map((comp) => (
                    <button
                      key={comp}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompanySelect(comp);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary dark:hover:bg-jotofa-navy transition-colors ${
                        selectedCompany === comp
                          ? "text-jotofa-navy dark:text-white font-medium"
                          : "text-foreground"
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear filters */}
            {(selectedCategory !== "All Categories" ||
              selectedCompany !== "All Companies" ||
              keyword.trim()) && (
              <button
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setSelectedCompany("All Companies");
                  setKeyword("");
                  setCurrentPage(1);
                }}
                className="flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-medium text-jotofa-navy dark:text-white hover:bg-muted/50 dark:hover:bg-white/5 rounded-xl transition-colors min-h-[44px] shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          4. JOB LISTINGS   Single container with rows
          ═══════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6 mb-20 sm:mb-12">
        {isLoading ? (
           <div className="bg-card rounded-2xl border border-border p-8 sm:p-16 text-center">
            <div className="mx-auto mb-5 h-10 w-10 rounded-full border-4 border-jotofa-navy/20 border-t-jotofa-navy animate-spin" />
             <h3 className="text-xl font-bold text-foreground mb-2">
               Loading open positions
             </h3>
            <p className="text-sm text-muted-foreground">
              Fetching the latest career opportunities from the backend.
            </p>
          </div>
        ) : loadError ? (
           <div className="bg-card rounded-2xl border border-red-200 dark:border-red-900/50 p-8 sm:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 mb-5">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Careers could not load
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              {loadError}
            </p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div>
            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {filteredJobs.length}
                </span>{" "}
                Position{filteredJobs.length !== 1 ? "s" : ""} Found
              </p>
            </div>

            {/* Job list   ONE container */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {paginatedJobs.map((job, jobIdx) => {
                const isPreview = expandedJob === job.id;
                const isFullExpanded = expandedFullJob === job.id;
                const isExpanded = isPreview || isFullExpanded;
                const isSaved = savedJobs.has(job.id);
                const deadlineInfo = job.deadline
                  ? getDeadlineInfo(job.deadline)
                  : null;
                const isLast = jobIdx === paginatedJobs.length - 1;

                return (
                  <div
                    key={job.id}
                    className={!isLast ? "border-b border-border" : ""}
                  >
                    {/* ─── Collapsed Card Row ─── */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                      aria-label={`${job.title} at ${job.company}. ${isExpanded ? 'Collapse' : 'Expand'} details.`}
                      className="flex flex-col gap-3 px-4 sm:px-6 py-4 cursor-pointer hover:bg-muted/30 dark:hover:bg-jotofa-navy/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-inset"
                      onClick={() => {
                        if (isFullExpanded) {
                          setExpandedFullJob(null);
                          setExpandedJob(null);
                        } else if (isPreview) {
                          setExpandedJob(null);
                        } else {
                          setExpandedJob(job.id);
                          setExpandedFullJob(null);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (isFullExpanded) {
                            setExpandedFullJob(null);
                            setExpandedJob(null);
                          } else if (isPreview) {
                            setExpandedJob(null);
                          } else {
                            setExpandedJob(job.id);
                            setExpandedFullJob(null);
                          }
                        }
                      }}
                    >
                      {/* Left: Chevron + Title */}
                      <div className="flex items-start gap-3 lg:flex-1 lg:min-w-0">
                        {/* Chevron toggle */}
                        <div className="pt-0.5 lg:pt-0 shrink-0">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-jotofa-navy dark:text-white" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>

                        {/* Title + Req ID */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm sm:text-[15px] font-semibold text-jotofa-navy dark:text-white leading-tight">
                              {job.title}
                            </span>
                            {job.remote && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-jotofa-navy/10 dark:bg-jotofa-navy/30 text-jotofa-navy dark:text-white border border-jotofa-navy/20 dark:border-jotofa-navy/50">
                                <Home className="w-3 h-3" />
                                Remote
                              </span>
                            )}
                            {deadlineInfo && deadlineInfo.status === "closed" && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                                Closed
                              </span>
                            )}
                            {deadlineInfo &&
                              deadlineInfo.status === "urgent" && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                  {deadlineInfo.label}
                                </span>
                              )}
                          </div>
                          <span className="text-xs text-muted-foreground mt-0.5 block">
                            Req ID: {job.id}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Labeled info columns   Desktop */}
                      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:flex-none">
                        {/* Location */}
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                            Location
                          </span>
                          <p className="text-sm text-foreground mt-0.5">
                            {job.location}
                          </p>
                        </div>
                        {/* Categories */}
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                            Categories
                          </span>
                          <p className="text-sm text-foreground mt-0.5">
                            {job.category}
                          </p>
                        </div>
                        {/* Company */}
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                            Company
                          </span>
                          <p className="text-sm text-foreground mt-0.5">
                            {job.company}
                          </p>
                        </div>
                      </div>

                      {/* Mobile: Labeled info - icon-based rows */}
                      <div className="lg:hidden flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-7">
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Briefcase className="w-3 h-3 shrink-0" />
                          {job.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Building2 className="w-3 h-3 shrink-0" />
                          {job.company}
                        </span>
                      </div>

                      {/* Right: Apply Now button - hidden when expanded (shown in expanded section instead) */}
                      {!isExpanded && (
                        <div className="flex items-center gap-2 lg:shrink-0 lg:ml-6 pl-7 lg:pl-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setApplyJob(job);
                            }}
                            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-jotofa-navy text-white hover:bg-jotofa-navy-mid transition-colors w-full sm:w-auto"
                          >
                            Apply Now
                          </button>
                        </div>
                      )}
                    </div>

                    {/* ─── Preview Mode (first click) ─── */}
                    {isPreview && !isFullExpanded && (
                      <div className="border-t border-border">
                        <div className="px-4 sm:px-6 py-4">
                          {/* Description - truncated to 2 lines */}
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                            {job.description}
                          </p>

                          {/* Key metadata */}
                          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 text-sm">
                            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                              <MapPin className="w-3.5 h-3.5" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                              <Briefcase className="w-3.5 h-3.5" />
                              {job.category}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                              <Building2 className="w-3.5 h-3.5" />
                              {job.company}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                              <Clock className="w-3.5 h-3.5" />
                              {job.type}
                            </span>
                            {deadlineInfo && (
                              <span
                                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                                  deadlineInfo.status === "closed"
                                    ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                                    : deadlineInfo.status === "urgent"
                                      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                                      : "bg-jotofa-accent/10 dark:bg-jotofa-accent/15 text-jotofa-accent-dark dark:text-jotofa-accent-light"
                                }`}
                              >
                                {deadlineInfo.status === "closed" ? (
                                  <AlertTriangle className="w-3 h-3" />
                                ) : (
                                  <Calendar className="w-3 h-3" />
                                )}
                                {deadlineInfo.status === "closed"
                                  ? "Closed"
                                  : deadlineInfo.status === "urgent"
                                    ? deadlineInfo.label
                                    : `Closes ${deadlineInfo.label}`}
                              </span>
                            )}
                          </div>

                          {/* Action row */}
                          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setApplyJob(job);
                              }}
                              className="px-5 py-3 text-sm font-semibold rounded-xl bg-jotofa-navy text-white hover:bg-jotofa-navy-mid transition-colors w-full sm:w-auto"
                            >
                              Apply Now
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedFullJob(job.id);
                              }}
                              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-sm font-medium text-jotofa-navy dark:text-white hover:underline rounded-xl border border-input"
                            >
                              See More
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─── Full Details Mode (click "See More") ─── */}
                    {isFullExpanded && (
                      <div className="border-t border-border">
                        <div className="px-4 sm:px-6 py-5">
                          {/* Remote/Hybrid info banner */}
                          {job.remote && (
                            <div className="flex items-start gap-3 mb-5 px-4 py-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
                              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                              <p className="text-sm text-amber-800 dark:text-amber-200">
                                This is a remote role. You can work from anywhere
                                in Tanzania with reliable internet access.
                                Occasional travel to the{" "}
                                {job.location} office may be required for team
                                meetings and collaboration.
                              </p>
                            </div>
                          )}

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {job.description}
                          </p>

                          {/* Sections in single column */}
                          <div className="space-y-6">
                            {/* Position Responsibilities */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-jotofa-navy/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                                  <ListChecks className="w-3.5 h-3.5 text-jotofa-navy dark:text-white" />
                                </div>
                                Position Responsibilities
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.responsibilities.map((r, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-jotofa-navy dark:bg-white/60 mt-1.5 shrink-0" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Qualifications */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-jotofa-navy/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                                  <GraduationCap className="w-3.5 h-3.5 text-jotofa-navy dark:text-white" />
                                </div>
                                Qualifications
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.qualifications.map((q, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-jotofa-navy dark:bg-white/60 mt-1.5 shrink-0" />
                                    <span>{q}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Requirements */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-jotofa-navy/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                                  <ShieldCheck className="w-3.5 h-3.5 text-jotofa-navy dark:text-white" />
                                </div>
                                Requirements
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.requirements.map((r, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-jotofa-navy dark:bg-white/60 mt-1.5 shrink-0" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Benefits */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-jotofa-navy/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                                  <Heart className="w-3.5 h-3.5 text-jotofa-navy dark:text-white" />
                                </div>
                                Benefits
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.benefits.map((b, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <Check className="w-3.5 h-3.5 text-jotofa-accent-dark dark:text-jotofa-accent-light mt-0.5 shrink-0" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Deadline indicator */}
                          {deadlineInfo && (
                            <div className="mt-6 pt-4 border-t border-border/50">
                              <div className="flex items-center gap-2">
                                {deadlineInfo.status === "closed" ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    Application closed
                                  </span>
                                ) : deadlineInfo.status === "urgent" ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    Closes in {deadlineInfo.daysLeft} day
                                    {deadlineInfo.daysLeft !== 1 ? "s" : ""}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-jotofa-accent/10 dark:bg-jotofa-accent/15 text-jotofa-accent-dark dark:text-jotofa-accent-light border border-jotofa-accent/25 dark:border-jotofa-accent/30">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Closes {deadlineInfo.label}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setApplyJob(job);
                              }}
                              className="px-5 py-3 text-sm font-semibold rounded-xl bg-jotofa-navy text-white hover:bg-jotofa-navy-mid transition-colors w-full sm:w-auto"
                            >
                              Apply Now
                            </button>
                            <button
                              onClick={(e) => toggleSaveJob(job.id, e)}
                              className={`px-5 py-3 text-sm font-medium rounded-xl border transition-colors w-full sm:w-auto ${
                                isSaved
                                  ? "border-jotofa-navy/30 bg-jotofa-navy/5 text-jotofa-navy dark:text-white"
                                  : "border-input text-foreground hover:border-jotofa-navy/30"
                              }`}
                            >
                              {isSaved ? (
                                <span className="flex items-center gap-1.5">
                                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                                  Saved
                                </span>
                              ) : (
                                <span className="flex items-center gap-1.5">
                                  <Bookmark className="w-3.5 h-3.5" />
                                  Save Job
                                </span>
                              )}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (navigator.share) {
                                  navigator
                                    .share({
                                      title: `${job.title} at ${job.company}`,
                                      text: `Check out this role: ${job.title} at ${job.company} - JOTOFA GROUP`,
                                      url: window.location.href,
                                    })
                                    .catch(() => {});
                                } else {
                                  navigator.clipboard.writeText(
                                    window.location.href
                                  );
                                }
                              }}
                              className="px-5 py-3 text-sm font-medium rounded-xl border border-input text-foreground hover:border-jotofa-navy/30 transition-colors w-full sm:w-auto"
                            >
                              <span className="flex items-center justify-center gap-1.5">
                                <Share2 className="w-3.5 h-3.5" />
                                Share
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ═══════════════════════════════════════
                PAGINATION - Reyes Holdings style
                ═══════════════════════════════════════ */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-border">
              {/* Items per page + Range text */}
              <div className="flex items-center justify-between sm:gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="hidden sm:inline">Items per page:</span>
                  <span className="sm:hidden">Per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) =>
                      handlePageSizeChange(Number(e.target.value))
                    }
                    className="px-2 py-1.5 text-sm rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-jotofa-navy/20"
                  >
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="text-sm text-muted-foreground">
                  {(currentPage - 1) * pageSize + 1}-
                  {Math.min(currentPage * pageSize, filteredJobs.length)} of{" "}
                  {filteredJobs.length}
                </span>
              </div>

              {/* Navigation arrows - compact on mobile */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentPage === 1}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-secondary dark:hover:bg-jotofa-navy/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first, last, current, and neighbors on mobile
                    if (totalPages <= 5) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (Math.abs(page - currentPage) <= 1) return true;
                    return false;
                  })
                  .map((page, idx, arr) => {
                    // Insert ellipsis where there are gaps
                    const prevPage = arr[idx - 1];
                    const hasGap = prevPage && page - prevPage > 1;
                    return (
                      <span key={page} className="flex items-center">
                        {hasGap && (
                          <span className="px-1 text-muted-foreground text-sm">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 sm:w-11 sm:h-11 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === page
                              ? "bg-jotofa-navy text-white"
                              : "text-foreground hover:bg-secondary dark:hover:bg-jotofa-navy/50"
                          }`}
                        >
                          {page}
                        </button>
                      </span>
                    );
                  })}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-secondary dark:hover:bg-jotofa-navy/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ═══════════════════════════════════════
             EMPTY STATE
             ═══════════════════════════════════════ */
           <div className="bg-card rounded-2xl border border-border p-8 sm:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary dark:bg-jotofa-navy mb-5">
              <Briefcase className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No positions found
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
              We couldn't find any positions matching your criteria. Try
              adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSelectedCompany("All Companies");
                setKeyword("");
                handleTabChange("all");
              }}
              className="px-6 py-3 text-sm font-semibold rounded-xl bg-jotofa-navy text-white hover:bg-jotofa-navy-mid transition-colors"
            >
              View All Positions
            </button>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════
          5. TALENT COMMUNITY SECTION
          ═══════════════════════════════════════ */}
      <div id="talent-community" className="scroll-mt-20 bg-jotofa-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                Join Our Talent Community
              </h2>
              <p className="text-white/70 leading-relaxed mb-8 text-sm sm:text-base">
                Stay connected with JOTOFA GROUP and be the first to know about
                new opportunities across our three subsidiaries. Whether
                you're an experienced professional or just starting your
                career, we want to hear from you.
              </p>
              <PageLink
                page="contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-white text-jotofa-navy hover:bg-white/90 transition-colors"
              >
                Join Now
                <ArrowRight className="w-4 h-4" />
              </PageLink>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3]">
              <Image
                src="/images/jotofa-hero-3.jpeg"
                alt="JOTOFA GROUP team"
                fill
                sizes="100vw"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jotofa-navy/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          6. APPLY MODAL
          ═══════════════════════════════════════ */}
      {applyJob && (
        <JobApplyModal
          job={applyJob}
          isOpen={!!applyJob}
          onClose={() => setApplyJob(null)}
        />
      )}
    </section>
  );
}
