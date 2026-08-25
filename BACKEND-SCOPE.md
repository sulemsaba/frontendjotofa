# JOTOFA Group - Backend & Admin Scope

What actually needs a backend + admin, what does not, and the exact contract the
frontend already expects. Read this before building the API/admin so the backend
is a drop-in and we do not over-build.

**Recommended stack:** FastAPI + PostgreSQL. The admin lives in a **separate
repository** (its own app that calls the API's `/admin/*` endpoints with auth).
This frontend stays a static/marketing site that talks to the API over HTTP.

**Guiding principle:** only three kinds of things deserve a backend -
1. content non-technical staff must edit often (jobs, news),
2. data the public submits that we must keep (applications, leads),
3. small config that drives the above (subsidiaries).

Everything else - marketing copy, design, page structure, testimonials, FAQs,
mission/vision, stats - stays in code. It rarely changes and a CMS would only add
cost and fragility. The site already runs fully without a backend (it falls back
to demo/sample data), so the backend "turns on" real data, it is not required for
the site to work.

---

## 1. Summary table

| Area | Backend? | Admin? | Why |
|---|---|---|---|
| **Careers - Jobs** | Yes | Yes | HR posts/edits/closes jobs constantly |
| **Careers - Applications** | Yes | Yes (read) | Public submits CVs; staff review + download |
| **News & Insights** | Yes | Yes | Staff publish articles/press releases over time |
| **Contacts / Leads** (contact form + UTEC quote) | Yes | Yes (read) | Public inquiries we must capture + respond to |
| **Subsidiaries** (metadata/stats) | Yes (small) | Light | Drives careers tabs + hero; changes rarely |
| Newsletter subscribers | Optional | Export only | Only if we want real signups (today it is stubbed) |
| UTEC store products | **No (external)** | No | Read-only from UTEC's own live API; UTEC manages it |
| Home / About / Strategy / CSR / FAQ | No | No | Static marketing content |
| Testimonials / values / timeline / stats | No | No | Low churn; live in code |
| Theme, nav, footer, logos, design | No | No | Code + assets |

**Build only the first block.** The rest is static or already handled.

---

## 2. Needs backend + admin (build these)

### 2.1 Careers: Jobs + Subsidiaries  (highest priority - already API-driven)
The careers page already calls the API and falls back to sample data when it is
unreachable (`src/components/careers.tsx`, `DEMO_JOBS`). Wiring a real backend
makes careers fully live with **zero frontend changes**.

- Public (frontend consumes today):
  - `GET /api/public/jobs?page_size=100` -> `PublicJob[]`
  - `GET /api/public/subsidiaries` -> `PublicSubsidiary[]`
- Admin (separate repo): CRUD jobs, job detail sections, job categories, and
  subsidiary metadata/stats; open/close a job (`is_active`), set `deadline`.

### 2.2 Careers: Applications  (needs file storage)
The apply modal already posts a multipart form with the CV
(`src/components/job-apply-modal.tsx` -> `submitApplication`).

- Public: `POST /api/public/applications` (multipart/form-data, includes `job_id`
  and an uploaded CV file).
- Admin: list/filter applications per job, view details, **download the CV**,
  set a status (new / shortlisted / rejected).
- Storage: save uploaded files to object storage or `/uploads`; store the path.

### 2.3 News & Insights
Detail pages and the RSS feed already call `getNews()`
(`src/app/news/[slug]/page.tsx`, `src/app/feed.xml/route.ts`). The listing grid
currently uses static fallback articles - point it at the API once live.

- Public: `GET /api/public/news` -> `PublicNewsArticle[]` (published only).
- Admin: CRUD articles, draft vs published, `published_at`, cover image upload,
  category, auto-generate `slug` from title.

### 2.4 Contacts / Leads
The contact form already posts JSON (`src/components/contact.tsx` ->
`submitContact`). The UTEC "Free Quote" modal is currently a fake submit - route
it to the same leads table with a `source` tag.

- Public: `POST /api/public/contacts` (JSON `ContactPayload`).
- Admin: list/view leads, mark handled, filter by `source`/`subsidiary`.
- Optional: email/WhatsApp notification to the team on new lead.

---

## 3. Needs backend, minimal or no admin

- **Subsidiaries** (2.1): really config. Seed the 3 rows (UTEC Solutions,
  Cleaning & Maids, Staffing & Labour) and expose light admin for tagline / logo /
  hero image / stats. Do not over-build.
- **Newsletter subscribers** (optional): today the subscribe buttons are stubbed
  (`news.tsx`, `news-detail.tsx` - they just flip a local flag). If we want real
  signups: one table + `POST /api/public/newsletter` + an admin export. Low
  priority; skip until asked.

---

## 4. Does NOT need a backend (keep static in this repo)

Editing these means a quick code change + redeploy, which is fine for how seldom
they change:

- Home page: hero, "Unifying Excellence", ecosystem showcase, testimonials.
- About, Strategy, Investor Relations, CSR, FAQ.
- Subsidiary pages: UTEC / Cleaning / Staffing service descriptions, values,
  mission/vision, timeline, headline stats.
- Contact details (phone, email, address), navigation, footer, theme, logos.

If staff ever need to edit testimonials or FAQs themselves, promote just those to
the backend later - but not now.

---

## 5. External integration (NOT our backend)

- **UTEC store products** - live catalogue read **read-only** from UTEC's own API
  (`https://core.utecsolutions.co.tz`) through this site's server proxy
  (`src/app/api/utec-store/*`, `src/lib/store-config.ts`). UTEC owns and updates
  it; prices auto-update. **No JOTOFA backend, no JOTOFA admin, do not duplicate
  this data.**

---

## 6. The existing API contract (implement exactly this)

The frontend already defines these in `src/lib/api.ts`. Match the shapes and the
FastAPI backend drops in with no frontend edits. Base path: `/api`.

**Public endpoints**
```
GET  /api/public/jobs?page_size=100   -> PublicJob[]
GET  /api/public/subsidiaries         -> PublicSubsidiary[]
GET  /api/public/news                 -> PublicNewsArticle[]   (published only)
POST /api/public/applications         (multipart/form-data)    -> {ok}
POST /api/public/contacts             (JSON ContactPayload)    -> {ok}
```

**Shapes (Pydantic should mirror these)**
```
PublicJob        { id, job_id, title, company_name, location, remote:bool,
                   type, description?, deadline?, category_name?,
                   subsidiary_key?, subsidiary_name?, details: PublicJobDetail[] }
PublicJobDetail  { id, section, content, sort_order }
                   // section in: qualifications | responsibilities | requirements | benefits
PublicSubsidiary { id, key, label, name, tagline?, logo?, hero_image?,
                   is_active:bool, sort_order, stats: PublicSubsidiaryStat[] }
PublicSubsidiaryStat { id, label, value, sort_order }
PublicNewsArticle{ id, title, slug, excerpt?, content, image?, author,
                   category?, published_at?, created_at? }
ContactPayload   { name, email, company?, subsidiary?, message }
```

**Errors:** non-2xx returns `{ "detail": "message" }` (the client reads `detail`).
**Images:** the client resolves relative paths (e.g. `/uploads/x.png`) against the
API origin, so the backend can serve uploaded files as relative URLs.

**Admin endpoints** (separate repo) live under `/api/admin/*` and require auth -
full CRUD mirrors of the above plus applications/leads read + file download.

---

## 7. Suggested PostgreSQL schema

```
subsidiaries(id, key UNIQUE, label, name, tagline, logo, hero_image,
             is_active, sort_order)
subsidiary_stats(id, subsidiary_id FK, label, value, sort_order)
job_categories(id, name UNIQUE)
jobs(id, job_id UNIQUE, title, subsidiary_id FK, company_name, location,
     remote, type, description, deadline, category_id FK, is_active,
     created_at, updated_at)
job_details(id, job_id FK, section, content, sort_order)
applications(id, job_id FK, name, email, phone, cover_letter,
             cv_path, status, created_at)
contacts(id, name, email, company, subsidiary, message,
         source /* contact | utec_quote */, status, created_at)
news(id, title, slug UNIQUE, excerpt, content, image, author, category,
     status /* draft | published */, published_at, created_at, updated_at)
newsletter_subscribers(id, email UNIQUE, created_at)   -- optional
admin_users(id, email UNIQUE, password_hash, role)     -- for admin auth
```

---

## 8. Auth, security, ops

- **Public endpoints**: open (GET reads, POST form intake). Add rate-limiting +
  basic spam protection (honeypot/CAPTCHA) on `applications` and `contacts`.
- **Admin endpoints**: JWT (or session) auth; the separate admin repo logs in and
  sends `Authorization: Bearer ...`. No admin logic in this frontend repo.
- **CORS**: allow the frontend origin(s) - the Vercel URL and the production
  domain - for the public routes.
- **Uploads**: validate CV type/size; store outside the web root or in object
  storage; serve via a stable URL/path.
- **Hosting**: FastAPI on Railway / Render / Fly / a VPS + managed Postgres.

---

## 9. Wiring the frontend

Set in the frontend host (Vercel -> Settings -> Environment Variables):
```
NEXT_PUBLIC_API_BASE_URL = https://<backend-host>/api
NEXT_PUBLIC_SITE_URL     = https://<public-site-domain>
```
No code change needed - `src/lib/api.ts` reads `NEXT_PUBLIC_API_BASE_URL`
(default `http://localhost:8000/api`). Until it is set, the site shows demo jobs /
fallback news, which is the current preview behaviour.

---

## 10. Build order (recommended)

1. **Careers**: subsidiaries + job categories + jobs + applications (+ file
   storage). Highest value; the UI is already built and API-driven.
2. **News**: articles CRUD + published feed; then point the listing grid at
   `/public/news`.
3. **Leads**: contacts intake + admin list; wire the UTEC "Free Quote" modal to
   `/public/contacts` with `source=utec_quote`; optional notifications.
4. **Optional**: newsletter subscribers; promote testimonials/FAQ to admin only
   if staff ask.

## 11. Housekeeping in this repo (pre-backend)

- `src/app/api/contact/route.ts` is a legacy Next route the contact form no longer
  uses (the form calls FastAPI `submitContact`). Remove or repurpose it.
- Newsletter subscribe (`news.tsx`, `news-detail.tsx`) and the UTEC "Free Quote"
  modal (`src/components/pages/utec.tsx`) are stubbed - wire them to the API when
  the relevant backend piece ships.
