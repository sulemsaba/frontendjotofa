const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api").replace(/\/$/, "");

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

export interface PublicJobDetail {
  id: string;
  section: string;
  content: string;
  sort_order: number;
}

export interface PublicJob {
  id: string;
  job_id: string;
  title: string;
  company_name: string;
  location: string;
  remote: boolean;
  type: string;
  description?: string | null;
  deadline?: string | null;
  category_name?: string | null;
  subsidiary_key?: string | null;
  subsidiary_name?: string | null;
  details: PublicJobDetail[];
}

export interface PublicSubsidiaryStat {
  id: string;
  label: string;
  value: string;
  sort_order: number;
}

export interface PublicSubsidiary {
  id: string;
  key: string;
  label: string;
  name: string;
  tagline?: string | null;
  logo?: string | null;
  hero_image?: string | null;
  is_active: boolean;
  sort_order: number;
  stats: PublicSubsidiaryStat[];
}

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  subsidiary?: string;
  message: string;
}

export async function getJobs(): Promise<PublicJob[]> {
  return request<PublicJob[]>("/public/jobs?page_size=100");
}

export async function getSubsidiaries(): Promise<PublicSubsidiary[]> {
  return request<PublicSubsidiary[]>("/public/subsidiaries");
}

export async function submitApplication(formData: FormData) {
  return request("/public/applications", {
    method: "POST",
    body: formData,
  });
}

export async function submitContact(payload: ContactPayload) {
  return request("/public/contacts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ─── News ───

export interface PublicNewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  image?: string | null;
  author: string;
  category?: string | null;
  published_at?: string | null;
  created_at?: string | null;
}

export async function getNews(): Promise<PublicNewsArticle[]> {
  return request<PublicNewsArticle[]>("/public/news");
}

// ─── Image URL helper ───
// Backend may return either an absolute URL (https://...) or a relative path
// such as "/uploads/foo.png". Resolve relative paths against the API origin so
// the browser can fetch them. Empty/missing values fall back to a placeholder.

const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return "";
  }
})();

export function resolveImageUrl(url?: string | null): string {
  if (!url) return "/images/jotofa-hero-1.webp";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${API_ORIGIN}${url}`;
  return url;
}
