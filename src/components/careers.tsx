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
  Filter,
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
import { usePage } from "@/lib/page-context";
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
  { key: "courier", label: "Courier & Logistics" },
  { key: "cleaning", label: "Cleaning & Maids" },
  { key: "security", label: "Security" },
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
      "Delivering excellence across industries through ICT, logistics, professional services, security, and staffing",
    logo: "/images/jotofa-logo.png",
    heroImage: "/images/jotofa-hero-1.jpeg",
    stats: [
      { label: "Employees", value: "1,200+" },
      { label: "Subsidiaries", value: "5" },
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
  courier: {
    name: "Courier & Logistics",
    tagline:
      "Delivering reliability — connecting businesses across Tanzania every day",
    logo: "/images/courier.png",
    heroImage: "/images/jotofa-hero-3.jpeg",
    stats: [
      { label: "Employees", value: "300+" },
      { label: "Focus", value: "Logistics" },
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
  security: {
    name: "JOTOFA Security",
    tagline:
      "Protecting businesses, assets, and people with trusted security solutions",
    logo: "/images/security.png",
    heroImage: "/images/jotofa-hero-2.jpeg",
    stats: [
      { label: "Employees", value: "350+" },
      { label: "Focus", value: "Security" },
      { label: "Country", value: "Tanzania" },
    ],
  },
  staffing: {
    name: "Staffing & Labour",
    tagline:
      "Connecting talent with opportunity — powering Tanzania's workforce",
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
    logo: "/images/jotofa-logo.png",
    heroImage: "/images/jotofa-hero-1.jpeg",
    stats: [
      { label: "Employees", value: "1,200+" },
      { label: "Subsidiaries", value: "5" },
      { label: "Country", value: "Tanzania" },
    ],
  },
};

const jobs: Job[] = [
  {
    id: "JTG-001",
    title: "Network Engineer",
    category: "Information Technology",
    company: "UTEC Solutions",
    location: "Dar es Salaam",
    remote: false,
    type: "Full-time",
    description:
      "Join UTEC Solutions as a Network Engineer and play a pivotal role in designing, implementing, and maintaining enterprise-grade network infrastructure. You will be responsible for ensuring network reliability, security, and performance across all JOTOFA GROUP operations, supporting our mission to power progress through technology across Tanzania.",
    qualifications: [
      "Bachelor's degree in Computer Science, IT, or related field",
      "CCNA/CCNP certification preferred",
      "3+ years of enterprise network engineering experience",
      "Strong knowledge of TCP/IP, routing protocols (OSPF, BGP), VPNs",
      "Experience with Cisco, Juniper, or Fortinet equipment",
    ],
    responsibilities: [
      "Design and implement scalable network architectures",
      "Monitor network performance and troubleshoot issues",
      "Manage firewall configurations and security policies",
      "Plan and execute network upgrades and expansions",
      "Provide technical guidance to junior team members",
    ],
    requirements: [
      "Proficiency in network monitoring tools (SolarWinds, PRTG)",
      "Experience with SD-WAN and cloud networking",
      "Strong analytical and problem-solving skills",
      "Excellent communication and documentation abilities",
      "Ability to work on-call for critical incidents",
    ],
    benefits: [
      "Competitive salary with annual performance bonus",
      "Health insurance for employee and dependents",
      "Professional development and certification sponsorship",
      "Flexible work arrangements",
      "22 days annual leave",
    ],
    deadline: "2026-06-15",
  },
  {
    id: "JTG-002",
    title: "Logistics Coordinator",
    category: "Supply Chain & Logistics",
    company: "Courier & Logistics",
    location: "Dar es Salaam",
    remote: false,
    type: "Full-time",
    description:
      "As a Logistics Coordinator at Courier & Logistics, you will oversee the efficient movement of goods across our distribution network. You'll coordinate between suppliers, warehouses, and delivery teams to ensure timely and cost-effective service delivery that keeps Tanzania's businesses running smoothly.",
    qualifications: [
      "Bachelor's degree in Logistics, Supply Chain, or Business Administration",
      "2+ years in logistics or supply chain coordination",
      "Knowledge of warehouse management systems",
      "Understanding of Tanzanian transport regulations",
      "Proficiency in MS Excel and logistics software",
    ],
    responsibilities: [
      "Coordinate daily shipment scheduling and route planning",
      "Monitor inventory levels and manage stock replenishment",
      "Liaise with transport providers and negotiate rates",
      "Track and report on key logistics KPIs",
      "Resolve delivery issues and customer complaints promptly",
    ],
    requirements: [
      "Strong organizational and multitasking skills",
      "Excellent interpersonal and negotiation abilities",
      "Experience with ERP systems (SAP, Oracle preferred)",
      "Ability to work under pressure and meet tight deadlines",
      "Valid driver's license",
    ],
    benefits: [
      "Competitive salary with performance incentives",
      "Health and life insurance coverage",
      "Career advancement opportunities across the group",
      "Transport allowance",
      "20 days annual leave",
    ],
    deadline: "2026-06-20",
  },
  {
    id: "JTG-003",
    title: "Operations Supervisor",
    category: "Operations",
    company: "Cleaning & Maids",
    location: "Arusha",
    remote: false,
    type: "Full-time",
    description:
      "Lead field operations for Cleaning & Maids in Arusha, ensuring our professional cleaning services meet the highest standards. You'll manage teams, maintain client relationships, and drive operational excellence that makes a tangible difference in workplaces and homes across the region.",
    qualifications: [
      "Diploma or Bachelor's in Business Management or related field",
      "2+ years supervisory experience in service operations",
      "Knowledge of cleaning industry standards and safety protocols",
      "Experience managing teams of 15+ personnel",
      "Strong customer service orientation",
    ],
    responsibilities: [
      "Supervise and schedule cleaning teams across assigned sites",
      "Conduct quality inspections and ensure compliance with standards",
      "Train and onboard new cleaning staff",
      "Manage client relationships and address service concerns",
      "Control operational costs and manage supplies inventory",
    ],
    requirements: [
      "Strong leadership and team management skills",
      "Excellent time management and organizational abilities",
      "Basic proficiency in reporting tools and spreadsheets",
      "Willingness to work flexible hours including weekends",
      "Own reliable transport preferred",
    ],
    benefits: [
      "Competitive salary with site performance bonuses",
      "Health insurance coverage",
      "Uniform and equipment provided",
      "Training and professional development programs",
      "18 days annual leave",
    ],
    deadline: "2026-05-31",
  },
  {
    id: "JTG-004",
    title: "Security Operations Manager",
    category: "Security & Safety",
    company: "JOTOFA Security",
    location: "Dar es Salaam",
    remote: false,
    type: "Full-time",
    description:
      "Take command of security operations at JOTOFA Security, where you'll lead a team protecting businesses, assets, and people across Dar es Salaam. This role combines strategic planning with hands-on operational management in one of Tanzania's fastest-growing security companies.",
    qualifications: [
      "Bachelor's degree in Security Management, Criminology, or related field",
      "5+ years in security operations, 2+ in management",
      "Military or law enforcement background preferred",
      "Certification in security management (CPP, PSP, or equivalent)",
      "Knowledge of Tanzanian security regulations",
    ],
    responsibilities: [
      "Oversee all security operations in the Dar es Salaam region",
      "Develop and implement security protocols and emergency response plans",
      "Manage and train security personnel across multiple sites",
      "Conduct risk assessments and vulnerability analyses",
      "Maintain client relationships and prepare operational reports",
    ],
    requirements: [
      "Strong leadership and decision-making under pressure",
      "Excellent written and verbal communication skills",
      "Experience with electronic security systems (CCTV, access control)",
      "Ability to manage multiple priorities simultaneously",
      "Clean criminal record and background check",
    ],
    benefits: [
      "Competitive salary with operational performance bonus",
      "Comprehensive health and life insurance",
      "Company vehicle for operational use",
      "Advanced security training and certifications sponsored",
      "25 days annual leave",
    ],
    deadline: "2026-07-01",
  },
  {
    id: "JTG-005",
    title: "HR & Recruitment Specialist",
    category: "Human Resources",
    company: "Staffing & Labour",
    location: "Dar es Salaam",
    remote: true,
    type: "Full-time",
    description:
      "Join Staffing & Labour as an HR & Recruitment Specialist and be the bridge between talented professionals and their dream careers. You'll manage the full recruitment lifecycle for JOTOFA GROUP, identifying top talent that will help power progress across Tanzania. This role offers remote flexibility.",
    qualifications: [
      "Bachelor's degree in Human Resources, Business Administration, or Psychology",
      "3+ years in HR with strong recruitment focus",
      "CHRP certification or equivalent preferred",
      "Knowledge of Tanzanian labor laws and employment regulations",
      "Experience with applicant tracking systems (ATS)",
    ],
    responsibilities: [
      "Manage end-to-end recruitment for positions across all subsidiaries",
      "Develop job descriptions and person specifications",
      "Screen candidates, conduct interviews, and coordinate hiring processes",
      "Maintain and develop the talent pipeline and candidate database",
      "Ensure compliance with labor laws and company policies",
    ],
    requirements: [
      "Strong interpersonal and communication skills",
      "Proficiency in HR software and Microsoft Office Suite",
      "Ability to handle confidential information with discretion",
      "Excellent organizational and time management skills",
      "Self-motivated with ability to work independently (remote role)",
    ],
    benefits: [
      "Competitive salary with placement performance bonus",
      "Remote work flexibility",
      "Health insurance for employee and dependents",
      "Professional development and certification sponsorship",
      "24 days annual leave",
    ],
    deadline: "2026-06-10",
  },
  {
    id: "JTG-006",
    title: "Software Developer",
    category: "Information Technology",
    company: "UTEC Solutions",
    location: "Dar es Salaam",
    remote: true,
    type: "Full-time",
    description:
      "Build the future with UTEC Solutions as a Software Developer. You'll design and develop innovative software solutions that power JOTOFA GROUP's digital transformation, from enterprise applications to smart city platforms. This role offers remote flexibility for developers anywhere in Tanzania.",
    qualifications: [
      "Bachelor's degree in Computer Science, Software Engineering, or related field",
      "3+ years of professional software development experience",
      "Proficiency in TypeScript/JavaScript, Python, or Java",
      "Experience with React, Next.js, or similar frameworks",
      "Understanding of RESTful APIs and database design",
    ],
    responsibilities: [
      "Design, develop, and maintain web and mobile applications",
      "Write clean, testable, and well-documented code",
      "Collaborate with cross-functional teams on product development",
      "Participate in code reviews and maintain code quality standards",
      "Troubleshoot and resolve software defects and performance issues",
    ],
    requirements: [
      "Experience with Git version control and CI/CD pipelines",
      "Familiarity with cloud platforms (AWS, Azure, or GCP)",
      "Strong problem-solving and analytical thinking",
      "Excellent communication skills for remote collaboration",
      "Portfolio of shipped projects or open-source contributions",
    ],
    benefits: [
      "Competitive salary with technology skills allowance",
      "Remote work with flexible hours",
      "Latest hardware and development tools provided",
      "Conference attendance and learning budget",
      "22 days annual leave",
    ],
    deadline: "2026-06-25",
  },
  {
    id: "JTG-007",
    title: "Fleet Manager",
    category: "Supply Chain & Logistics",
    company: "Courier & Logistics",
    location: "Mwanza",
    remote: false,
    type: "Full-time",
    description:
      "Manage the vehicle fleet that keeps Tanzania moving. As Fleet Manager at Courier & Logistics in Mwanza, you'll oversee vehicle procurement, maintenance, and driver management to ensure our logistics operations run efficiently and safely across the Lake Zone region.",
    qualifications: [
      "Bachelor's degree in Logistics, Transport Management, or related field",
      "4+ years in fleet management or transport operations",
      "Knowledge of vehicle maintenance and fleet tracking systems",
      "Understanding of Tanzanian transport regulations and compliance",
      "Experience managing fleets of 30+ vehicles",
    ],
    responsibilities: [
      "Oversee fleet procurement, allocation, and disposal",
      "Implement and manage GPS tracking and fleet telematics systems",
      "Coordinate vehicle maintenance schedules and repairs",
      "Manage driver recruitment, training, and performance monitoring",
      "Ensure regulatory compliance and vehicle documentation",
    ],
    requirements: [
      "Strong analytical skills for fleet cost optimization",
      "Experience with fleet management software",
      "Excellent vendor and supplier management abilities",
      "Budget management and cost control experience",
      "Valid driver's license with clean record",
    ],
    benefits: [
      "Competitive salary with fleet performance bonus",
      "Health and accident insurance coverage",
      "Company vehicle for operational use",
      "Career growth within the logistics division",
      "20 days annual leave",
    ],
    deadline: "2026-07-15",
  },
  {
    id: "JTG-008",
    title: "Facility Inspector",
    category: "Quality Assurance",
    company: "Cleaning & Maids",
    location: "Dodoma",
    remote: false,
    type: "Full-time",
    description:
      "Ensure excellence at every site as a Facility Inspector for Cleaning & Maids in Dodoma. You'll conduct quality audits, implement improvement plans, and verify that our cleaning services consistently exceed client expectations across government buildings, offices, and residential properties.",
    qualifications: [
      "Diploma in Quality Management, Facilities Management, or related field",
      "2+ years in quality inspection or facilities management",
      "Knowledge of cleaning standards and health & safety regulations",
      "Strong attention to detail and documentation skills",
      "Experience with quality management systems (ISO 9001 preferred)",
    ],
    responsibilities: [
      "Conduct regular site inspections and quality audits",
      "Document findings and prepare detailed inspection reports",
      "Follow up on corrective actions and improvement plans",
      "Train cleaning teams on quality standards and best practices",
      "Maintain inspection schedules and client communication",
    ],
    requirements: [
      "Meticulous attention to detail",
      "Strong written reporting skills",
      "Ability to work independently across multiple sites",
      "Proficiency in mobile inspection tools and apps",
      "Reliable transport for site visits",
    ],
    benefits: [
      "Competitive salary with inspection quality bonus",
      "Health insurance coverage",
      "Transport allowance for site visits",
      "Training and career development opportunities",
      "18 days annual leave",
    ],
    deadline: "2026-06-30",
  },
];

const categories = [
  "All Categories",
  "Information Technology",
  "Supply Chain & Logistics",
  "Operations",
  "Security & Safety",
  "Human Resources",
  "Quality Assurance",
];

const companies = [
  "All Companies",
  "UTEC Solutions",
  "Courier & Logistics",
  "Cleaning & Maids",
  "JOTOFA Security",
  "Staffing & Labour",
];

/* Company → subsidiary key mapping for filtering */
const fallbackCompanyToSubKey: Record<string, string> = {
  "UTEC Solutions": "utec",
  "Courier & Logistics": "courier",
  "Cleaning & Maids": "cleaning",
  "JOTOFA Security": "security",
  "Staffing & Labour": "staffing",
};

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
  const { setActivePage } = usePage();

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
  const [showSearchCategory, setShowSearchCategory] = useState(false);
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
        setJobsData(jobList.map(mapPublicJob));
        setApiSubsidiaries(subsidiaryList);
      } catch (error) {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : "Could not load careers data.");
          setJobsData([]);
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

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    setExpandedJob(null);
    setExpandedFullJob(null);
  }, []);

  const handleCategorySelect = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setShowCategoryDropdown(false);
    setShowSearchCategory(false);
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
    setShowSearchCategory(false);
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
    >
      {/* ═══════════════════════════════════════
          1. HERO BANNER (max-w-6xl — wider than job list)
          ═══════════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden">
          <Image
            src={heroData.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B64]/90 via-[#003B64]/75 to-[#003B64]/50" />

          <div className="relative z-10 flex items-center h-full px-6 sm:px-8">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                <Image
                  src={heroData.logo}
                  alt={heroData.name}
                  width={40}
                  height={40}
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain brightness-0 invert"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                  {heroData.name}
                </h1>
                <p className="text-sm text-white/70 leading-snug max-w-md hidden sm:block">
                  {heroData.tagline}
                </p>
                <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
                  {heroData.stats.map((stat, idx) => (
                    <span key={stat.label} className="contents">
                      <div className="flex items-center gap-1.5 text-white/70 text-xs">
                        {idx === 0 && <Users className="w-3.5 h-3.5" />}
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
              <button
                onClick={() => setActivePage("about")}
                className="px-5 py-2 text-sm font-medium rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                About {heroData.name}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          2. SUB NAVIGATION BAR
          ═══════════════════════════════════════ */}
      <div className="bg-white dark:bg-[#0a1e30] border-b border-border mt-6 relative">
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
                    relative flex items-center gap-2 px-3 sm:px-4 py-3 text-[13px] sm:text-sm font-medium whitespace-nowrap transition-colors shrink-0
                    ${
                      isActive
                        ? "text-[#003B64] dark:text-white"
                        : "text-[#003B64]/40 dark:text-white/40 hover:text-[#003B64] dark:hover:text-white/70"
                    }
                  `}
                >
                  <span>{sub.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#003B64] dark:bg-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {/* Scroll hint gradient on right edge — mobile only */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-[#0a1e30] to-transparent pointer-events-none sm:hidden" />
      </div>

      {/* ═══════════════════════════════════════
          3. SEARCH CARD
          ═══════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white dark:bg-[#0a1e30] rounded-xl shadow-sm p-5 sm:p-6 border border-border">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search keyword, category, or job title"
                value={keyword}
                onChange={(e) => handleKeywordChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#003B64]/20 focus:border-[#003B64]/40 transition-all"
              />
            </div>

            <div className="relative sm:w-48">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSearchCategory(!showSearchCategory);
                  setShowCategoryDropdown(false);
                  setShowCompanyDropdown(false);
                }}
                className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border border-input bg-background text-sm text-foreground hover:border-[#003B64]/30 transition-colors"
              >
                <span className="truncate">
                  {selectedCategory === "All Categories"
                    ? "Category"
                    : selectedCategory}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
              {showSearchCategory && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#0a1e30] rounded-lg shadow-lg border border-border z-50 max-h-60 overflow-y-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelect(cat);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary dark:hover:bg-[#003B64] transition-colors ${
                        selectedCategory === cat
                          ? "text-[#003B64] dark:text-white font-medium"
                          : "text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full bg-[#003B64] text-white hover:bg-[#00355A] transition-colors shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span>Find Jobs</span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          4. FILTER BAR
          ═══════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </div>

          {/* Category filter */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowCompanyDropdown(false);
                setShowSearchCategory(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-input bg-background text-sm text-foreground hover:border-[#003B64]/30 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="truncate max-w-[140px]">
                {selectedCategory === "All Categories"
                  ? "Categories"
                  : selectedCategory}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-[#0a1e30] rounded-lg shadow-lg border border-border z-50 max-h-60 overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategorySelect(cat);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary dark:hover:bg-[#003B64] transition-colors ${
                      selectedCategory === cat
                        ? "text-[#003B64] dark:text-white font-medium"
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
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCompanyDropdown(!showCompanyDropdown);
                setShowCategoryDropdown(false);
                setShowSearchCategory(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-input bg-background text-sm text-foreground hover:border-[#003B64]/30 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="truncate max-w-[140px]">
                {selectedCompany === "All Companies"
                  ? "Company"
                  : selectedCompany}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {showCompanyDropdown && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-[#0a1e30] rounded-lg shadow-lg border border-border z-50 max-h-60 overflow-y-auto">
                {companies.map((comp) => (
                  <button
                    key={comp}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompanySelect(comp);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary dark:hover:bg-[#003B64] transition-colors ${
                      selectedCompany === comp
                        ? "text-[#003B64] dark:text-white font-medium"
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
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#003B64] dark:text-white hover:text-[#003B64]/70 dark:hover:text-white/70 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          5. JOB LISTINGS — Single container with rows
          ═══════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6 mb-20 sm:mb-12">
        {isLoading ? (
          <div className="bg-white dark:bg-[#0a1e30] rounded-2xl border border-border shadow-sm p-10 sm:p-16 text-center">
            <div className="mx-auto mb-5 h-10 w-10 rounded-full border-4 border-[#003B64]/20 border-t-[#003B64] animate-spin" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Loading open positions
            </h3>
            <p className="text-sm text-muted-foreground">
              Fetching the latest career opportunities from the backend.
            </p>
          </div>
        ) : loadError ? (
          <div className="bg-white dark:bg-[#0a1e30] rounded-2xl border border-red-200 dark:border-red-900/50 shadow-sm p-10 sm:p-16 text-center">
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

            {/* Job list — ONE container */}
            <div className="bg-white dark:bg-[#0a1e30] rounded-lg border border-border shadow-sm overflow-hidden">
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
                      className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-0 px-5 sm:px-6 py-4 cursor-pointer hover:bg-muted/30 dark:hover:bg-[#003B64]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-inset"
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
                      <div className="flex items-start lg:items-center gap-3 lg:flex-1 lg:min-w-0">
                        {/* Chevron toggle */}
                        <div className="pt-0.5 lg:pt-0 shrink-0">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-[#003B64] dark:text-white" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>

                        {/* Title + Req ID */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[15px] font-semibold text-[#003B64] dark:text-white leading-tight">
                              {job.title}
                            </span>
                            {job.remote && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-[#003B64]/10 dark:bg-[#003B64]/30 text-[#003B64] dark:text-white border border-[#003B64]/20 dark:border-[#003B64]/50">
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

                      {/* Middle: Labeled info columns — Desktop */}
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

                      {/* Mobile: Labeled info — icon-based rows */}
                      <div className="lg:hidden flex flex-wrap items-center gap-x-4 gap-y-1 pl-7">
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

                      {/* Right: Apply Now button — hidden when expanded (shown in expanded section instead) */}
                      {!isExpanded && (
                        <div className="flex items-center gap-2 lg:shrink-0 lg:ml-6 pl-7 lg:pl-0 self-end lg:self-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setApplyJob(job);
                            }}
                            className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full bg-[#003B64] text-white hover:bg-[#00355A] transition-colors"
                          >
                            Apply Now
                          </button>
                        </div>
                      )}
                    </div>

                    {/* ─── Preview Mode (first click) ─── */}
                    {isPreview && !isFullExpanded && (
                      <div className="border-t border-border">
                        <div className="px-5 sm:px-6 py-4">
                          {/* Description — truncated to 2 lines */}
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                            {job.description}
                          </p>

                          {/* Key metadata */}
                          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
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
                                      : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
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
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setApplyJob(job);
                              }}
                              className="px-5 py-2 text-sm font-semibold rounded-full bg-[#003B64] text-white hover:bg-[#00355A] transition-colors"
                            >
                              Apply Now
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedFullJob(job.id);
                              }}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#003B64] dark:text-white hover:underline"
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
                        <div className="px-5 sm:px-6 py-5">
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
                                <div className="w-6 h-6 rounded-md bg-[#003B64]/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                                  <ListChecks className="w-3.5 h-3.5 text-[#003B64] dark:text-white" />
                                </div>
                                Position Responsibilities
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.responsibilities.map((r, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#003B64] dark:bg-white/60 mt-1.5 shrink-0" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Qualifications */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-[#003B64]/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                                  <GraduationCap className="w-3.5 h-3.5 text-[#003B64] dark:text-white" />
                                </div>
                                Qualifications
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.qualifications.map((q, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#003B64] dark:bg-white/60 mt-1.5 shrink-0" />
                                    <span>{q}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Requirements */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-[#003B64]/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#003B64] dark:text-white" />
                                </div>
                                Requirements
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.requirements.map((r, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#003B64] dark:bg-white/60 mt-1.5 shrink-0" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Benefits */}
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-md bg-[#003B64]/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                                  <Heart className="w-3.5 h-3.5 text-[#003B64] dark:text-white" />
                                </div>
                                Benefits
                              </h4>
                              <ul className="space-y-2 ml-8">
                                {job.benefits.map((b, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
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
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Closes {deadlineInfo.label}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setApplyJob(job);
                              }}
                              className="px-5 py-2.5 text-sm font-semibold rounded-full bg-[#003B64] text-white hover:bg-[#00355A] transition-colors"
                            >
                              Apply Now
                            </button>
                            <button
                              onClick={(e) => toggleSaveJob(job.id, e)}
                              className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-colors ${
                                isSaved
                                  ? "border-[#003B64]/30 bg-[#003B64]/5 text-[#003B64] dark:text-white"
                                  : "border-input text-foreground hover:border-[#003B64]/30"
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
                              className="px-5 py-2.5 text-sm font-medium rounded-full border border-input text-foreground hover:border-[#003B64]/30 transition-colors"
                            >
                              <span className="flex items-center gap-1.5">
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
                PAGINATION — Reyes Holdings style
                ═══════════════════════════════════════ */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-border">
              {/* Items per page */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Items per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) =>
                    handlePageSizeChange(Number(e.target.value))
                  }
                  className="px-2 py-1 text-sm rounded border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-[#003B64]/20"
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Range text */}
              <span className="text-sm text-muted-foreground">
                {(currentPage - 1) * pageSize + 1}–
                {Math.min(currentPage * pageSize, filteredJobs.length)} of{" "}
                {filteredJobs.length}
              </span>

              {/* Navigation arrows */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-secondary dark:hover:bg-[#003B64]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === page
                          ? "bg-[#003B64] text-white"
                          : "text-foreground hover:bg-secondary dark:hover:bg-[#003B64]/50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-secondary dark:hover:bg-[#003B64]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
          <div className="bg-white dark:bg-[#0a1e30] rounded-2xl border border-border shadow-sm p-10 sm:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary dark:bg-[#003B64] mb-5">
              <Briefcase className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No positions found
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
              We couldn&apos;t find any positions matching your criteria. Try
              adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSelectedCompany("All Companies");
                setKeyword("");
                handleTabChange("all");
              }}
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-[#003B64] text-white hover:bg-[#00355A] transition-colors"
            >
              View All Positions
            </button>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════
          6. TALENT COMMUNITY SECTION
          ═══════════════════════════════════════ */}
      <div id="talent-community" className="scroll-mt-20 bg-[#003B64]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                Join Our Talent Community
              </h2>
              <p className="text-white/70 leading-relaxed mb-8 text-sm sm:text-base">
                Stay connected with JOTOFA GROUP and be the first to know about
                new opportunities across our five subsidiaries. Whether
                you&apos;re an experienced professional or just starting your
                career, we want to hear from you.
              </p>
              <button
                onClick={() => setActivePage("contact")}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-white text-[#003B64] hover:bg-white/90 transition-colors"
              >
                Join Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/jotofa-hero-3.jpeg"
                alt="JOTOFA GROUP team"
                fill
                sizes="100vw"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003B64]/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          7. APPLY MODAL
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
