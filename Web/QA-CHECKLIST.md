# Ascassy Website — QA Checklist (Phase 12)

Run this checklist before every production deployment to ascassy.com. Anything failing here must be fixed before going live.

## 0. Pre-flight

- [ ] Backend `.env` is configured with production values (`CORS_ORIGIN=https://ascassy.com`, real `SMTP_*`, real `INQUIRY_TO_EMAIL`).
- [ ] Frontend `.env` (or build environment) has `VITE_API_BASE_URL=https://api.ascassy.com` (or chosen API host) and `VITE_SITE_URL=https://ascassy.com`.
- [ ] No secrets are committed (`.env` is gitignored).
- [ ] `Web/Phases/` strategy docs match what the site presents.

## 1. Build & Smoke

| Check | Command | Pass when |
|---|---|---|
| Frontend production build | `npm --prefix Web/frontend run build` | Exits 0, no warnings beyond Tailwind suggestions |
| Frontend production preview | `npm --prefix Web/frontend run preview` | Loads at `http://localhost:4173` and renders Home |
| Backend smoke test | `npm --prefix Web/backend run smoke` | All 5 sections pass, exit 0 |

## 2. Routes (manual click-through, desktop)

- [ ] `/` — Home renders, hero CTAs work, dashboard mockup visible
- [ ] `/about` — story, mission, vision, values, ecosystem
- [ ] `/offerings` — 4 service layers + 2 product bridges
- [ ] `/pharmapos` — hero, 6 pain cards, 12 feature cards, dashboard preview, FAQ
- [ ] `/for-pharmacies` — pain → before/after → benefits → workflow
- [ ] `/healthcare-cloud` — ecosystem + audience layers + direction layers
- [ ] `/cureinsights` — services + safety note + FAQ
- [ ] `/contact` — form renders, all fields, contact details sidebar
- [ ] `/privacy-policy` — legal text, last-updated date
- [ ] `/terms` — legal text, last-updated date
- [ ] `/anything-random-404` — 404 page with "Back to Home" CTA

## 3. Navigation

- [ ] Top navbar shows: Home · About · Offerings · PharmaPOS · CureInsights · Contact · **Book a Demo** (highlighted)
- [ ] Active route is highlighted in navbar
- [ ] Sticky navbar gets background blur after scrolling 12 px
- [ ] Footer columns: Company · Products · Healthcare Ecosystem · Trust · Contact · CTA
- [ ] Every footer link resolves to a real page
- [ ] Logo always navigates back to `/`

## 4. Mobile (≤ 640 px width)

- [ ] Hamburger menu opens drawer; tap-target is ≥ 48 px
- [ ] Drawer shows all primary nav items + Book Demo CTA + contact links
- [ ] Closing the drawer (X, backdrop tap, or navigation) restores body scroll
- [ ] Mobile sticky CTA bar appears after scrolling past the hero
- [ ] Mobile sticky CTA is hidden on `/contact`, `/privacy-policy`, `/terms`
- [ ] All section padding feels comfortable; no text touches viewport edges
- [ ] No horizontal scrollbar appears on any page

## 5. Forms (Contact / Book Demo)

- [ ] Visiting `/contact?type=demo` pre-selects inquiry type = "Book a Demo"
- [ ] Visiting `/contact?type=partner` pre-selects inquiry type = "Partnership"
- [ ] Submitting empty form shows browser validation; no XHR fires
- [ ] Submitting with valid data shows green success banner
- [ ] Submitting with invalid data shows red error banner with helpful message
- [ ] Backend rate limit (default 20 / 15 min per IP) kicks in after spam attempts
- [ ] Honeypot field `company_website` is visually invisible to humans
- [ ] Honeypot submissions are rejected by the backend (verified by smoke test)

## 6. Animation & motion

- [ ] Hero entrance animates once on load
- [ ] Section reveals trigger once when scrolled into view
- [ ] Card hover lifts ~4 px on desktop
- [ ] Mobile drawer slides in / out smoothly
- [ ] `prefers-reduced-motion: reduce` disables non-essential animation (test in OS or DevTools)

## 7. Performance & SEO

- [ ] Per-page `<title>` updates correctly (check in DevTools → Elements → `<title>`)
- [ ] Per-page meta description updates correctly
- [ ] `<link rel="canonical">` reflects current route
- [ ] `<meta property="og:url">` reflects current route
- [ ] Home page injects JSON-LD Organization schema (Elements → `<script type="application/ld+json">`)
- [ ] `/robots.txt` is served and points to the sitemap
- [ ] `/sitemap.xml` lists all 10 marketing/legal pages
- [ ] `/og-image.svg` returns 200
- [ ] Lazy-loaded page chunks are visible in Network tab (one chunk per non-home page)
- [ ] Lighthouse Performance ≥ 90 on a production build (run on `npm run preview`)
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse SEO ≥ 95

## 8. Accessibility

- [ ] Every interactive element is reachable by keyboard (Tab / Shift+Tab)
- [ ] Focus ring is visible on links, buttons, inputs
- [ ] All form fields have associated `<label>` elements
- [ ] All meaningful images have descriptive alt text; decorative SVG is `aria-hidden="true"`
- [ ] Color contrast meets WCAG AA on body text and CTA buttons
- [ ] Heading order is logical (one `<h1>` per page, no skipped levels in major flows)

## 9. Browser compatibility

| Browser | Version | Status |
|---|---|---|
| Chrome | last 2 | ✓ baseline |
| Edge | last 2 | ✓ baseline |
| Firefox | last 2 | ✓ baseline |
| Safari (macOS) | last 2 | ✓ baseline |
| Safari (iOS) | last 2 | ✓ mobile target |
| Chrome (Android) | last 2 | ✓ mobile target |

Manually verify Home, PharmaPOS, and Contact on at least one mobile and one desktop browser per release.

## 10. Content trust

- [ ] No fake testimonials, fake client logos, or fake metrics anywhere on the site
- [ ] No claims of clinical diagnosis or AI replacing doctors (CureInsights wording)
- [ ] No medical advice — Terms includes the disclaimer
- [ ] Privacy Policy + Terms last-updated dates are accurate
- [ ] Contact details (email, phone, address) match the company's current records

## 11. Final go/no-go

- [ ] All checks above are green
- [ ] Build artifact deployed to chosen frontend host
- [ ] Backend running with production env, reachable from the frontend host
- [ ] DNS / domain (`ascassy.com`) routed to frontend; backend (`api.ascassy.com` or chosen) reachable
- [ ] One end-to-end Book-Demo submission landed in `INQUIRY_TO_EMAIL` inbox

> Owner: Deep Sorathiya — Technical Head, Software Development Domain
> Project: Ascassy Cloud Healthcare website
