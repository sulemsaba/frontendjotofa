export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number; // 1-5
  initials: string; // 1-2 letters shown in the avatar
}

/* Group-level testimonials - used on the home page */
export const homeTestimonials: Testimonial[] = [
  {
    quote:
      "JOTOFA Group has been a trusted partner for over six years. Their diversified expertise means we can rely on a single group for ICT, security, and facility services - saving us time, cost, and coordination overhead.",
    name: "Amir Saidi",
    role: "Chief Operations Officer",
    company: "Mzuzu Holdings Ltd",
    location: "Dar es Salaam",
    rating: 5,
    initials: "AS",
  },
  {
    quote:
      "What sets JOTOFA apart is their consistency. Whether it is a courier pickup in Mwanza or a network installation in Dodoma, the quality and professionalism is identical. They behave like a true national partner.",
    name: "Fatma Mcharo",
    role: "Procurement Director",
    company: "Kilimanjaro Logistics Co.",
    location: "Arusha",
    rating: 5,
    initials: "FM",
  },
  {
    quote:
      "We chose JOTOFA because they understand the Tanzanian business environment. Their team is responsive, their reporting is transparent, and they genuinely invest in long-term relationships.",
    name: "Joseph Mrema",
    role: "Managing Director",
    company: "Tanga Coast Trading",
    location: "Tanga",
    rating: 5,
    initials: "JM",
  },
];

/* About page - long-term partners and senior stakeholders */
export const aboutTestimonials: Testimonial[] = [
  {
    quote:
      "I have watched JOTOFA grow from a small Dar es Salaam operation into a multi-sector group. Their discipline, governance, and commitment to local talent development have not wavered - that is rare.",
    name: "Dr. Rehema Kimaro",
    role: "Board Advisor",
    company: "East Africa Business Council",
    location: "Dar es Salaam",
    rating: 5,
    initials: "RK",
  },
  {
    quote:
      "Over eight years of partnership, JOTOFA has delivered every promise. Their leadership team is accessible, accountable, and refreshingly straightforward - exactly what you want in a long-term partner.",
    name: "Hassan Kileo",
    role: "Chief Executive Officer",
    company: "Ubungo Industrial Group",
    location: "Dar es Salaam",
    rating: 5,
    initials: "HK",
  },
  {
    quote:
      "JOTOFA's commitment to Tanzania goes beyond business. They employ locally, train locally, and source locally wherever possible. That kind of commitment builds real economic value.",
    name: "Grace Mollel",
    role: "Programs Director",
    company: "Tanzania Chamber of Commerce",
    location: "Dodoma",
    rating: 5,
    initials: "GM",
  },
];

/* Strategy page - investors and strategic partners */
export const strategyTestimonials: Testimonial[] = [
  {
    quote:
      "JOTOFA's strategic roadmap is one of the clearest I have seen from a mid-sized East African group. Their disciplined approach to capital allocation and regional expansion gives us real confidence as an investor.",
    name: "David Ochieng",
    role: "Investment Partner",
    company: "Savannah Capital Partners",
    location: "Nairobi, Kenya",
    rating: 5,
    initials: "DO",
  },
  {
    quote:
      "Their decision to verticalize across ICT, logistics, and staffing creates real moats. Each subsidiary feeds the others - and that integrated model is hard to replicate.",
    name: "Asha Mwakyusa",
    role: "Senior Analyst",
    company: "Twiga Equity Research",
    location: "Dar es Salaam",
    rating: 5,
    initials: "AM",
  },
  {
    quote:
      "We partnered with JOTOFA on a regional expansion initiative. Their governance, reporting cadence, and risk discipline are at the level of much larger groups - impressive for their size.",
    name: "Markus Berghoff",
    role: "Regional Director",
    company: "Hanseatic Frontier Fund",
    location: "Frankfurt, Germany",
    rating: 5,
    initials: "MB",
  },
];

/* CSR page - community partners and beneficiaries */
export const csrTestimonials: Testimonial[] = [
  {
    quote:
      "JOTOFA's scholarship program put three of our top students through university. They did not just write a cheque - they mentored the students and offered internships. That is real social investment.",
    name: "Headmaster Joseph Lyimo",
    role: "Head Teacher",
    company: "Mbezi Beach Secondary School",
    location: "Dar es Salaam",
    rating: 5,
    initials: "JL",
  },
  {
    quote:
      "When our district needed a community health screening drive, JOTOFA showed up with staff, transport, and supplies within a week. Their speed of response to community needs is unmatched.",
    name: "Nurse Salma Komba",
    role: "District Health Coordinator",
    company: "Bagamoyo District Hospital",
    location: "Bagamoyo",
    rating: 5,
    initials: "SK",
  },
  {
    quote:
      "The tree-planting drive JOTOFA ran in our ward changed how young people here think about the environment. Two years later, the trees are growing - and so is a generation of environmental stewards.",
    name: "Ezekiel Mbwana",
    role: "Ward Executive Officer",
    company: "Mkuranga Ward",
    location: "Pwani Region",
    rating: 5,
    initials: "EM",
  },
];

/* UTEC - ICT & Telecom clients */
export const utecTestimonials: Testimonial[] = [
  {
    quote:
      "UTEC redesigned our entire campus network - fiber backbone, Wi-Fi coverage, and a unified VoIP system. Downtime has dropped from weekly outages to zero in eight months. Truly transformational.",
    name: "Eng. Peter Mushi",
    role: "IT Manager",
    company: "Dodoma University College",
    location: "Dodoma",
    rating: 5,
    initials: "PM",
  },
  {
    quote:
      "We migrated 14 branches to UTEC's cloud infrastructure with zero data loss and no customer-facing downtime. Their migration playbook and 24/7 support team are best-in-class in East Africa.",
    name: "Zainab Hassan",
    role: "Chief Technology Officer",
    company: "Meru Microfinance Bank",
    location: "Arusha",
    rating: 5,
    initials: "ZH",
  },
  {
    quote:
      "After a ransomware scare, UTEC's cybersecurity team did a full audit, deployed endpoint protection, and trained our staff. Six months later, we passed our compliance audit on the first try.",
    name: "Hamisi Mwakalukwa",
    role: "Operations Director",
    company: "Coastal Insurance Ltd",
    location: "Dar es Salaam",
    rating: 5,
    initials: "HM",
  },
];

/* Courier & Logistics - clients */
export const courierTestimonials: Testimonial[] = [
  {
    quote:
      "We ship 300+ parcels a week across all 31 regions of Tanzania. JOTOFA Courier has held a 98% on-time rate for two years. Their GPS-tracked fleet gives our customers real visibility.",
    name: "Charles Mrosso",
    role: "Logistics Manager",
    company: "Online Mart Tanzania",
    location: "Dar es Salaam",
    rating: 5,
    initials: "CM",
  },
  {
    quote:
      "Cross-border freight to Rwanda used to take 9 days with two other providers. JOTOFA does it in 5 - including customs. They handle the paperwork so we can focus on sales.",
    name: "Immaculate Uwase",
    role: "Supply Chain Lead",
    company: "Great Lakes Imports",
    location: "Kigali, Rwanda",
    rating: 5,
    initials: "IU",
  },
  {
    quote:
      "Their warehousing team runs our 2,400 m² facility like clockwork. Real-time inventory, weekly cycle counts, and zero stock discrepancies in 14 months. Outstanding operational discipline.",
    name: "Baraka Mosha",
    role: "Warehouse Operations Manager",
    company: "Highland Distributors Ltd",
    location: "Mwanza",
    rating: 5,
    initials: "BM",
  },
];

/* Cleaning & Maids - commercial and residential clients */
export const cleaningTestimonials: Testimonial[] = [
  {
    quote:
      "We outsourced daily cleaning for our 9-floor office tower to JOTOFA. Their team is uniformed, ID-badged, supervised, and trained on safety. Our tenant complaints dropped to near zero.",
    name: "Sarah Mlay",
    role: "Facilities Manager",
    company: "PSPF Commercial Plaza",
    location: "Dar es Salaam",
    rating: 5,
    initials: "SM",
  },
  {
    quote:
      "After our factory renovation, JOTOFA's post-construction crew cleaned 4,500 m² of floor, machinery, and ducts in three days. The site was ready for production on schedule. Excellent work.",
    name: "Eng. Frank Lissu",
    role: "Plant Manager",
    company: "Morogoro Ceramics Ltd",
    location: "Morogoro",
    rating: 5,
    initials: "FL",
  },
  {
    quote:
      "JOTOFA's housekeeping team runs our 42-room lodge year-round. Linen, rooms, common areas, and kitchen - all spotless, every day, every season. Our guest reviews have never been better.",
    name: "Anna Shirima",
    role: "General Manager",
    company: "Lake Manyara Lodge",
    location: "Manyara",
    rating: 5,
    initials: "AS",
  },
];

/* Security - corporate and event clients */
export const securityTestimonials: Testimonial[] = [
  {
    quote:
      "JOTOFA guards our headquarters and three branch sites. Their officers are vetted, trained, supervised, and rotated regularly. Incident reports are detailed and on time - exactly what audit requires.",
    name: "Josephat Komba",
    role: "Head of Security",
    company: "National Insurance Corporation",
    location: "Dar es Salaam",
    rating: 5,
    initials: "JK",
  },
  {
    quote:
      "We hosted a 4,000-person conference and contracted JOTEFA for the full security plan - access control, perimeter, VIP protection, and CCTV monitoring. Zero incidents across three days.",
    name: "Lilian Massawe",
    role: "Event Director",
    company: "East Africa Trade Expo",
    location: "Dar es Salaam",
    rating: 5,
    initials: "LM",
  },
  {
    quote:
      "Their 24/7 control room monitors our 26 cameras and alarm system. When a perimeter breach was attempted at 02:14, their response team was on-site in 7 minutes. That is real protection.",
    name: "Hamza Mrisho",
    role: "Operations Manager",
    company: "Kigamboni Free Port",
    location: "Dar es Salaam",
    rating: 5,
    initials: "HM",
  },
];

/* Staffing & Labour Supply - corporate clients */
export const staffingTestimonials: Testimonial[] = [
  {
    quote:
      "We needed 80 trained warehouse workers in 10 days for a seasonal peak. JOTOFA delivered 84 - vetted, inducted, and ready. Their payroll and compliance handling saved us weeks of admin.",
    name: "Emanuel Kessy",
    role: "Human Resources Director",
    company: "Tanga Cement PLC",
    location: "Tanga",
    rating: 5,
    initials: "EK",
  },
  {
    quote:
      "JOTOFA handled our entire payroll for 240 contracted staff across 6 sites for two years. Tax, NSSF, allowances, payslips - all accurate, all on time, zero complaints from staff.",
    name: "Penina Mwakagenda",
    role: "Finance Manager",
    company: "Southern Highlands Tea Company",
    location: "Mbeya",
    rating: 5,
    initials: "PM",
  },
  {
    quote:
      "When we needed a Plant Manager urgently, JOTOFA's executive search team presented three qualified candidates in two weeks. We hired one and he has been excellent. Real recruitment expertise.",
    name: "Joseph Shekiwa",
    role: "Managing Director",
    company: "Coastal Bottlers Ltd",
    location: "Dar es Salaam",
    rating: 5,
    initials: "JS",
  },
];
