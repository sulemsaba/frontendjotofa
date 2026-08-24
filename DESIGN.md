# JOTOFA Group Design System

Minimal corporate. Navy carries authority, teal is a quiet graphic accent,
neutrals do the rest. One typeface. No decoration that does not inform.

This file is the contract. Any edit - human or AI - follows it. When a rule
here conflicts with an old pattern in the code, this file wins.

## Colors - the three-color rule

Exactly three roles. No fourth color is ever introduced for decoration.

### 1. Primary - JOTOFA Navy
| Token | Hex | Use |
|---|---|---|
| `jotofa-navy` | #003B64 | Primary buttons, brand text, dark surfaces |
| `jotofa-navy-deep` | #002A4A | Button hover, deepest surfaces |
| `jotofa-navy-mid` | #00355A | Dark-mode section surfaces |
| `jotofa-navy-card` | #0A4A75 | Dark-mode cards |
| `jotofa-navy-sidebar` | #00253F | Dark-mode page background |

### 2. Accent - Teal
| Token | Hex | Use |
|---|---|---|
| `jotofa-accent` | #00A9B7 | Accent rules/lines, icons, chips, hover and focus states, links on hover |
| `jotofa-accent-light` | #33BAC6 | Dark-mode hover of accent |
| `jotofa-accent-dark` | #008799 | Light-mode hover of accent |

**Teal is a graphic accent, never a text color.** No teal headings, prices,
stat numbers, category labels, or word highlights. The single exception is
the home hero wordmark ("GROUP"). Teal lives in: thin rules, checkmark and
feature icons, tinted chip backgrounds (`/10`), the active-tab underline,
focus rings, and hover feedback.

### 3. Neutrals
Light canvas #e8e6e1 (warm-tinted, deliberate - never cool gray), white
cards, `border` at rgba(0,59,100,0.08), text hierarchy via `foreground` /
`muted-foreground` / `jotofa-text-secondary` #5E6A75 / `jotofa-text-muted`
#999DA0.

### Functional states (not palette)
Red = validation errors only. Amber = warnings only. Success states use the
teal accent, not green. These never appear decoratively.

### Exceptions
- UTEC red #d60b0b exists ONLY in the UTEC logo image and the UTEC page's
  "Do you need help with Telecommunication services?" CTA band. Nowhere else.

## Typography

Two faces with fixed jobs - mixing them is a system violation:

- **Inter** (self-hosted `Inter-Variable.woff2`, Latin subset, 300-800):
  body text, subheadings, labels, buttons, and the entire navigation.
- **Inter Tight** (self-hosted `InterTight-Variable.woff2`, 500-800): the
  display voice - h1/h2/h3 headlines only, always with negative tracking.
  Applied globally via the base layer (`h1,h2,h3 { font-family:
  var(--font-display) }`) and the `.h-display/.h1/.h2/.h3` utilities.

No serif, no mono costume, no third face.

| Style | Spec | Use |
|---|---|---|
| Display | clamp(40-72px), weight 600, tracking -0.02em (`.h-display`) | Home hero only |
| H1 | clamp(36-56px), 600, -0.01em (`.h1`) | Page heroes |
| H2 | clamp(28-40px), 600 or bold, -0.01em (`.h2`) | Section heads |
| H3 | clamp(22-28px), 600 (`.h3`) | Card titles |
| Lead | 18px / 1.7 (`.lead`) | Intro paragraphs |
| Body | 15-16px / 1.55-1.6 | Running text |
| Caption | 12-13px, 500-600, uppercase + tracking for labels | Kickers, badges |

Rules:
- Maximum heading weight is `font-bold` (700). Never `font-extrabold` or
  `font-black` - heavier reads bombastic, not corporate.
- Negative tracking only at display sizes; body stays at 0.
- No em dashes or any Unicode dash in copy - ASCII hyphen only ("Mon - Fri").

## Radius scale - three values with jobs

| Radius | Use |
|---|---|
| `rounded-full` (pill) | Buttons, dots, avatars, chips |
| `rounded-2xl` (16px) | Cards, image tiles, inputs' parent surfaces |
| `rounded-[2rem]` / `rounded-3xl` (24-32px) | Large section containers, showcase shells |

Small controls inside forms may use `rounded-lg` (10px, the `--radius`
token). Do not invent in-between values.

Section transitions curve **inward** (a background-colored strip with
`rounded-b-3xl` over the next section), never outward sweeps or elliptical
curls.

## Spacing rhythm

4px base. Section rhythm: `.section-py` (80px desktop / 56px mobile) or
`py-16 sm:py-24` for full sections; `py-10 sm:py-12` for slim bands.
Containers: `max-w-7xl px-4 sm:px-6 lg:px-8` (or `.container-page` /
`.container-wide`). Never full-bleed content except the hero and footer.

## Elevation - depth from color, not shadows

- Default card: `bg-card border border-border`, **no shadow**.
- No glow shadows, no colored shadows, no zero-offset halos - ever.
- Depth comes from surface contrast (canvas vs white card vs navy band)
  and 1px hairlines.
- Image legibility gradients (dark scrim over photos behind text) are
  allowed; decorative gradients, gradient text, and blur blobs are not.

## Buttons

| Variant | Spec |
|---|---|
| Primary | `bg-jotofa-navy text-white hover:bg-jotofa-navy-deep` (dark mode: `bg-jotofa-accent hover:bg-jotofa-accent-dark`), pill, `font-semibold text-sm`, ~44px tall (`px-6 py-3` and up) |
| Secondary | `bg-secondary text-foreground hover:bg-jotofa-navy hover:text-white`, pill |
| Outline | `border border-border text-foreground hover:bg-jotofa-accent/10`, pill |
| Text link | `text-muted-foreground hover:text-foreground` or foreground with teal hover |

Every button and interactive control carries
`focus-visible:ring-2 focus-visible:ring-jotofa-accent`.

## Navigation

Every route change is a real `<a href>` - use `PageLink` from
`@/lib/page-context` (drives the progress bar, crawlable, middle-clickable).
Plain `<button onClick>` navigation is a defect. `href="#"` +
preventDefault is a defect.

## Images

All images are self-hosted under `public/images/` and served through
`next/image`. Never hotlink external images (Unsplash links die). Logos are
compressed (~20KB). Showcase/section photos max 1600px wide, JPEG q78.

## Motion

- Entrance: fade-up 16px, 0.6s ease-out (`.animate-fade-up[-delay-N]`),
  respecting `prefers-reduced-motion`.
- The hero image ticker is the site's single signature motion element -
  keep it; do not add competing ambient animation elsewhere.
- Micro-interactions: color/transform transitions 200-300ms. No bounce,
  no elastic, no infinite decorative loops outside the hero ticker.

## Do

- Anchor pages on the warm canvas; close with the light footer.
- Use the accent as punctuation: one teal rule or icon per module.
- Keep testimonial cards quiet: quote, name, role - no star ratings.
- Show real product data (price, discount %) plainly; prices in
  `text-foreground`, old price as muted strikethrough.
- Keep functional states honest: red only when something is wrong.

## Don't

- Don't add a fourth decorative color, per-subsidiary accent colors, or
  social-brand colors.
- Don't set words in teal (headings, prices, stats, labels).
- Don't add shadows, glows, gradient hairlines, or blur blobs.
- Don't add marketing badges ("Editor's Choice", "Staff Favorite") or
  editorial blurbs to product cards.
- Don't ship fake controls (language toggles without translations,
  dropdowns that do nothing, disabled links styled as hoverable).
- Don't hotlink images or reference undefined color tokens.
- Don't use em dashes or any Unicode dash - ASCII hyphen only.
- Don't exceed `font-bold`; don't use eyebrow labels where the heading
  already carries the message.
