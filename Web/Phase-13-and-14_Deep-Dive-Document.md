# Ascassy Website Rebuild — Phase 13 + Phase 14 Deep Dive Document

## Production Build + Deployment Preparation

> The bridge between "code is tested" and "code goes live on ascassy.com".
> Phase 13 locks the production artifact. Phase 14 locks the deployment plan.

---

## Section 0 — Document Identity Block

| Field | Details |
|---|---|
| Document Name | Ascassy Website Rebuild — Phase 13 + Phase 14 Deep Dive Document |
| Phase Block | Phase 13 — Production Build · Phase 14 — Deployment Preparation |
| Prepared For | Ascassy Website Rebuild Project — pre-deployment lock |
| Company | Ascassy Cloud Healthcare Pvt Ltd |
| Target Website | https://ascassy.com |
| Previous Phase Status | Phases 0 – 12 SEALED |
| Current Phase Purpose | Generate the production artifact and lock the safe deployment plan |
| Main Deliverables | Clean production build · SPA fallback configs (Netlify/Vercel/Apache/IIS) · production-mode backend verification · deployment platform options · backup + DNS + SSL + email + rollback checklists · final approval gate |
| No-Code Rule | No new features, no design changes, no database, no auth |
| Companion Runbook | [Web/DEPLOYMENT.md](../../DEPLOYMENT.md) — fill-in checklist used during actual deployment |
| Document Owner | Deep Sorathiya — Technical Head, Software Development Domain |
| Document Status | LOCKED & SEALED |
| Document Version | 1.0 |
| Date | 2026-05-22 |

### DS-Style Opening Note

Phase 13 turns the tested Ascassy codebase into a **production artifact** — a clean `dist/` folder, a production-mode backend, and SPA-fallback configs for every realistic hosting target. Phase 14 turns that artifact into a **safe deployment plan** — hosting inventory, backups, DNS plan, SSL plan, email plan, rollback plan, and an explicit approval gate before Phase 15 (Redeployment) is allowed to begin.

---

# ============================================================
# PHASE 13 — PRODUCTION BUILD
# ============================================================

## Section 1 — Phase 13 Objective

| Goal | Detail |
|---|---|
| Main goal | Generate final deployment-ready website files |
| Key output | Optimized `dist/` build + production-mode backend confirmation |
| Acceptance | Build runs clean · routes verified · backend runs in `NODE_ENV=production` · smoke test green · no dev leftovers · no secrets exposed |

## Section 2 — Project State Review (Phase 12 → Phase 13 handoff)

| Area | Status | Source |
|---|---|---|
| All 10 marketing + legal pages built | ✓ | Phases 5–6 + Phase 11 code split |
| Mobile sticky CTA + drawer nav | ✓ | Phase 10 |
| Contact + demo forms with honeypot + consent | ✓ | Phase 9 hardening |
| SEO surface (robots, sitemap, canonical, OG, JSON-LD) | ✓ | Phase 11 |
| Backend smoke test | ✓ 17/17 | Phase 12 |
| QA checklist | ✓ | [Web/QA-CHECKLIST.md](../../QA-CHECKLIST.md) |

## Section 3 — Dev-Leftover Audit (Source Hygiene)

Performed before generating the final artifact. Every audit category below has an explicit result.

| Audit | Tool | Result | Notes |
|---|---|---|---|
| `console.log/debug/info/warn` in `frontend/src` | Grep | 0 hits | Clean |
| Hardcoded `localhost`/`127.0.0.1` in `frontend/src` | Grep | 1 — `ContactPage.jsx` only | Intentional fallback when `VITE_API_BASE_URL` is unset; documented in [.env.example](../../frontend/.env.example) and QA checklist |
| `TODO`/`FIXME`/`XXX`/`HACK`/`@ts-ignore` in `frontend/src` | Grep | 0 hits | Clean |
| `debugger` in `frontend/src` | Grep | 0 hits | Clean |
| Console statements in `backend/src` | Grep | 4 lines | All intentional: startup log, shutdown log, SMTP-disabled console fallback (`emailService.js`), error log (`errorHandler.js`) |
| `localhost` in `backend/src` | Grep | 2 lines | Startup-log message + CORS default (overridden by `CORS_ORIGIN` env in production) |
| Secrets / API keys in `frontend/src` | Grep | 0 hits | Only false positive: word "tokens" in a CSS comment |
| `.env` committed | Inspection | No | `.gitignore` covers `.env`, `.env.local`, `.env.*`; `.env.example` is the only env file in repo |

## Section 4 — Environment Variable Plan (Locked)

### Frontend (build-time, baked into the bundle — never put secrets here)

| Variable | Purpose | Required for production? | Default if unset |
|---|---|---|---|
| `VITE_API_BASE_URL` | Backend base URL the Contact form posts to | **Yes** | `http://localhost:4000` (dev fallback in `ContactPage.jsx`) |
| `VITE_SITE_URL` | Canonical/OG URL prefix used by `PageWrapper` | **Yes** | `https://ascassy.com` (fallback in `PageWrapper.jsx`) |

Template: [Web/frontend/.env.example](../../frontend/.env.example).

### Backend (runtime, server-only — secrets live here)

| Variable | Purpose | Required for production? | Default |
|---|---|---|---|
| `NODE_ENV` | Production mode (mask stack traces, etc.) | **Yes** = `production` | `development` |
| `PORT` | Port to bind | Recommended | `4000` |
| `CORS_ORIGIN` | Comma-separated allowed origins | **Yes** = `https://ascassy.com` | `http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | Rate-limit window per IP | Recommended | `900000` (15 min) |
| `RATE_LIMIT_MAX` | Max requests per window per IP | Recommended | `20` |
| `INQUIRY_TO_EMAIL` | Mailbox that receives inquiries | **Yes** | `hello@ascassy.com` |
| `INQUIRY_FROM_EMAIL` | "From" address on outbound mail | **Yes** | `no-reply@ascassy.com` |
| `SMTP_HOST` | SMTP server | **Yes** (else console-only) | empty |
| `SMTP_PORT` | SMTP port | If SMTP enabled | `587` |
| `SMTP_SECURE` | TLS on connect | If SMTP enabled | `false` |
| `SMTP_USER` | SMTP auth username | If provider requires | empty |
| `SMTP_PASS` | SMTP auth password / API key | If provider requires | empty |

Template: [Web/backend/.env.example](../../backend/.env.example).

**Rules locked:**
- Never commit a real `.env`. The repo only ships `.env.example`.
- Frontend env vars are public — they are baked into the JS bundle at build time. **No secrets allowed.**
- Backend env vars are server-side — they never reach the browser.
- Rotate any credential that has ever been pasted into chat, screenshots, or commit messages.

## Section 5 — Production Build Verification

### 5.1 Build command + output

| Step | Result |
|---|---|
| `rm -rf dist` | ✓ Clean slate |
| `npm run build` | ✓ Built in 4.18s · 2001 modules transformed |
| Main bundle (raw / gzip) | 411 KB / **129 KB** |
| Total page chunks (lazy) | 10 (one per non-home page) + 2 shared (FAQAccordion, PageHero) |
| Build errors | 0 |
| Build warnings | Cosmetic only (Tailwind canonical-class suggestions) |

### 5.2 `dist/` artifact inventory

| Artifact | Purpose | Result |
|---|---|---|
| `index.html` | App entry | ✓ |
| `assets/*.js`, `assets/*.css` | Hashed bundles | ✓ |
| `favicon.svg` | Browser tab icon | ✓ |
| `og-image.svg` | Open Graph / Twitter card | ✓ |
| `robots.txt` | Crawler control | ✓ |
| `sitemap.xml` | Crawl map (10 pages) | ✓ |
| `_redirects` | SPA fallback for **Netlify / Cloudflare Pages** | ✓ |
| `_headers` | Security + cache headers for **Netlify / Cloudflare Pages** | ✓ |
| `.htaccess` | SPA fallback + headers + gzip for **Apache / cPanel** | ✓ |
| `web.config` | SPA fallback + headers for **IIS / Windows hosting** | ✓ |
| `vercel.json` (project root, not in dist) | Rewrites + headers for **Vercel** | ✓ |

### 5.3 Direct-route refresh verification (`npm run preview` on :4173)

| Path | Expected | Result |
|---|---|---|
| `/` | 200 | ✓ |
| `/about` | 200 | ✓ |
| `/offerings` | 200 | ✓ |
| `/pharmapos` | 200 | ✓ |
| `/for-pharmacies` | 200 | ✓ |
| `/healthcare-cloud` | 200 | ✓ |
| `/cureinsights` | 200 | ✓ |
| `/contact` | 200 | ✓ |
| `/privacy-policy` | 200 | ✓ |
| `/terms` | 200 | ✓ |
| `/this-does-not-exist` | 200 (fallback → React Router renders the 404 page) | ✓ |
| `/robots.txt` | 200 | ✓ |
| `/sitemap.xml` | 200 | ✓ |
| `/og-image.svg` | 200 | ✓ |
| `/favicon.svg` | 200 | ✓ |

The same fallback behavior is reproduced on production hosts by the four config files shipped in `dist/`.

### 5.4 Served HTML head verification

The served `/` HTML includes:
- `<title>Ascassy Cloud Healthcare — Cloud Healthcare Infrastructure for Modern India</title>`
- `<link rel="canonical" href="https://ascassy.com/" />`
- `<meta property="og:image" content="https://ascassy.com/og-image.svg" />` (+ width / height)

Per-page meta (title, description, canonical, OG/Twitter, JSON-LD) is injected client-side via `PageWrapper`. JSON-LD `Organization` schema is mounted by `HomePage`.

## Section 6 — Backend Production-Mode Verification

| Check | Command | Result |
|---|---|---|
| Start backend in production mode | `NODE_ENV=production node src/server.js` | ✓ Bound to :4000 |
| `GET /api/health` | `curl :4000/api/health` | ✓ `{"status":"ok","service":"ascassy-backend",…}` |
| Smoke test (17 assertions) | `npm run smoke` | ✓ **All 17 checks passed** |
| Error handler masks stack in prod | Verified by environment-aware `errorHandler.js` (`env.nodeEnv !== 'production'` gate) | ✓ |
| Database dependency | Code search | ✓ None — no DB driver, no schema, no ORM |
| Sensitive medical data storage | Code search | ✓ None — payload is forwarded to email, never persisted |
| CORS posture | `app.js` uses an allowlist from `CORS_ORIGIN` | ✓ Production must set `CORS_ORIGIN=https://ascassy.com` |
| Rate limiting | `inquiryLimiter` middleware | ✓ Applied on `/api/contact` and `/api/demo` |

## Section 7 — SEO / Accessibility / Performance Final Verification

| Area | Lock | Evidence |
|---|---|---|
| Per-page `<title>` + description | `PageWrapper` runs on mount | Verified live in `/` HTML |
| Canonical URL | `PageWrapper` writes `<link rel="canonical">` | Verified live |
| Open Graph (title / description / url / image / site_name) | `PageWrapper` + `index.html` baseline | Verified live |
| Twitter card | `summary_large_image` in `index.html` | Verified live |
| JSON-LD Organization | `HomePage` injects via `PageWrapper.structuredData` | Schema present in source |
| `robots.txt` | Allows all, points to sitemap | Served 200 |
| `sitemap.xml` | All 10 pages, priorities + changefreq | Served 200 |
| `og-image.svg` | Branded 1200×630 SVG | Served 200 |
| Code splitting | `React.lazy` for 10 routes; `<Suspense>` with `<Loading />` | Confirmed in build chunks |
| Reduced-motion | Global CSS rule in `styles/index.css` | Honored across animations |
| Focus ring | Global `:focus-visible` rule | Visible on buttons/links/inputs |
| Mobile-first | Tailwind base targets mobile; `MobileStickyCTA` for thumb-zone Book Demo | Phase 10 lock |

## Section 8 — Phase 13 Acceptance Criteria

| Criterion | Status |
|---|---|
| Production build runs clean (no errors) | ✓ |
| `dist/` ships SPA fallback for Netlify, Cloudflare, Apache, IIS | ✓ |
| `vercel.json` present at frontend root for Vercel | ✓ |
| Preview server serves all routes incl. unknown paths | ✓ |
| All SEO artifacts (robots, sitemap, og-image, favicon) served | ✓ |
| Backend runs cleanly in `NODE_ENV=production` | ✓ |
| Smoke test 17/17 in production mode | ✓ |
| No console logs in frontend, no secrets in frontend | ✓ |
| Backend has no database, no auth, no sensitive data storage | ✓ |
| Env templates exist for both frontend and backend | ✓ |

## Section 9 — Phase 13 Lock Seal

> **Phase 13 is locked. The Ascassy website has been built into a clean, optimized, multi-host-ready production artifact and the backend has been verified in production mode with all 17 smoke checks green. No dev leftovers, no secrets exposed, no database introduced. Phase 13 — SEALED.**

---

# ============================================================
# PHASE 14 — DEPLOYMENT PREPARATION
# ============================================================

## Section 10 — Phase 14 Objective

| Goal | Detail |
|---|---|
| Main goal | Backup old site · choose hosting · lock DNS/SSL/email/rollback plan |
| Key output | Safe deployment checklist (this section + the [DEPLOYMENT.md runbook](../../DEPLOYMENT.md)) |
| **Critical safety rule** | **Nothing about ascassy.com changes until stakeholder approval is given and a verified backup exists.** |
| Acceptance | Backup verified · platform decided · DNS plan ready · SSL plan ready · email plan ready · rollback plan ready · approval recorded |

## Section 11 — Current Hosting + Domain Inventory (Owner to fill)

Most fields below cannot be determined from the codebase — they live in the registrar account, the host control panel, and Deep's notes. Fill them in [Web/DEPLOYMENT.md](../../DEPLOYMENT.md) Section A.

| Item | What to record | How to find it |
|---|---|---|
| Domain registrar | The company `ascassy.com` is registered with | Registrar invoice / `whois ascassy.com` |
| DNS provider | Where the nameservers point | `dig NS ascassy.com +short` |
| Current frontend host | cPanel · WordPress · static host · VPS · other | Registrar / host control panel |
| Current backend (if any) | None / VPS / managed service | Same |
| SSL certificate provider | Let's Encrypt / paid CA / cPanel auto-SSL / host-managed | Host control panel |
| Email provider for `@ascassy.com` | Google Workspace · Zoho · cPanel mail · other | DNS MX records: `dig MX ascassy.com +short` |
| Registrar / host admin owner | Person with login | Internal |
| Deployment access owner | Person who can deploy / change DNS | Internal |

> Do not assume access. **Verify every login works** before deployment day.

## Section 12 — Existing Site Backup (Required before any change)

| Backup item | Method | Where to store | Verification |
|---|---|---|---|
| Existing website files | `wget --mirror --convert-links --adjust-extension --page-requisites --no-parent https://ascassy.com/` (or download from host control panel) | Encrypted folder + offline copy | Open the mirrored `index.html` locally and confirm pages render |
| Existing DB / dynamic content (if any) | Host control panel export / `mysqldump` | Same | File size > 0 and opens cleanly |
| Server config files (if VPS) | Copy of `/etc/nginx`, `/etc/apache2`, etc. | Same | Visual diff against host docs |
| **DNS export (zone file)** | Registrar export or screenshot every record | Same | Cross-check live with `dig ascassy.com any +short` |
| SSL certificate + private key (if not auto-managed) | Host control panel download | Encrypted folder | Cert chain validates |
| Email DNS records (MX / SPF / DKIM / DMARC) | Same DNS export covers this | Same | `dig MX ascassy.com`, `dig TXT ascassy.com` |
| Old marketing copy / images you may want later | Manual save | Same | Visual diff |
| Backup completion timestamp | Plain-text note | Same | Owner sign-off |

**Rule locked:** Do not proceed to Section 14 (DNS) without a verified backup. Restoration must be possible from cold in under 30 minutes.

## Section 13 — Deployment Platform Decision

### 13.1 Frontend hosting options

| Option | Pros | Cons | Best for | SPA fallback config used |
|---|---|---|---|---|
| **Netlify** | Zero-config SPA · automatic HTTPS · branch previews · generous free tier · CDN included | Build minutes capped on free plan | Marketing sites that want the simplest workflow | `_redirects` + `_headers` |
| **Vercel** | First-class Vite support · branch previews · global edge · automatic HTTPS | Slight vendor lock-in for serverless functions (not used here) | Teams already on Vercel for other projects | `vercel.json` |
| **Cloudflare Pages** | Unlimited bandwidth · global edge · automatic HTTPS · works behind Cloudflare DNS naturally | Build environment slightly less ergonomic than Netlify | Sites already proxied through Cloudflare | `_redirects` + `_headers` |
| **cPanel / shared hosting (Apache)** | Familiar control panel · no vendor migration · keeps current host | Manual deploys · slower iteration · CDN must be added separately | When the existing hosting is paid up and there's no budget to switch | `.htaccess` |
| **VPS (Nginx + static)** | Maximum control · co-host backend on same box | Manual TLS · manual config · ongoing maintenance | Teams that already run a VPS | Nginx `try_files $uri $uri/ /index.html;` (write into server block) |
| **IIS / Windows hosting** | Required if the existing host is Windows | Less common in modern SaaS hosting | When forced by existing infra | `web.config` |

**Recommendation:** Default to **Netlify** or **Cloudflare Pages** unless the existing hosting account is paid-up and Deep prefers to keep it. Both are zero-config for this build because `_redirects` and `_headers` already ship.

### 13.2 Backend hosting options

| Option | Pros | Cons | Best for |
|---|---|---|---|
| **Render** | Simple Node deploys · free tier · auto TLS · health-check support | Free tier sleeps after inactivity (cold start) | Marketing-grade inquiry volume |
| **Railway** | Simple Node deploys · pay-as-you-go | No always-free tier | Mid-volume APIs |
| **Fly.io** | Edge regions · always-on small VMs | Slightly more setup | Teams comfortable with CLI |
| **VPS** | Co-host with frontend if also on VPS · maximum control | Manual TLS · ongoing maintenance | If a VPS already exists |
| **Skip backend → static form service** (Formspree / Basin / Web3Forms) | No backend to run at all · the form posts directly to a third-party endpoint that emails Deep | Tied to vendor pricing · less control · honeypot config moves to vendor | If Deep wants the lowest possible operational burden |

**Recommendation:** **Render** for backend with a custom subdomain (e.g., `api.ascassy.com`). It matches the lightweight Express server perfectly and supports the `npm start` script as-is. If form volume is low and operational cost matters more, the "skip backend" option is also valid — but the Express backend is already production-ready, so deploying it once is the lower-friction path.

### 13.3 Decision matrix to fill in

| Layer | Chosen platform | Owner | Reason |
|---|---|---|---|
| Frontend | _(to decide)_ | Deep | _(fill)_ |
| Backend | _(to decide)_ | Deep | _(fill)_ |
| Email transport | _(to decide — Google Workspace SMTP, Zoho, SendGrid, Resend, …)_ | Deep | _(fill)_ |

## Section 14 — DNS Preparation Table (Template — Owner to fill)

> **No DNS changes execute as part of this phase.** This is a written plan only.

| Record type | Host | Current value | New value (after deploy) | Purpose | Rollback value | TTL |
|---|---|---|---|---|---|---|
| A | `@` (root) | _(record from `dig A ascassy.com +short`)_ | Frontend host's IP/CNAME target | Root domain → frontend | _(current value)_ | 300 (lower for safer cutover) |
| CNAME or ALIAS | `www` | _(record current)_ | Frontend host's CNAME target | `www` → frontend | _(current value)_ | 300 |
| CNAME | `api` (subdomain) | _(none today, likely)_ | Backend host's CNAME target | Backend API at `api.ascassy.com` | n/a (new record) | 300 |
| MX | `@` | _(record current — Google / Zoho / etc.)_ | **UNCHANGED** | Email routing | Same | unchanged |
| TXT (SPF) | `@` | _(record current — `v=spf1 ...`)_ | **UNCHANGED unless SMTP provider requires update** | Email auth | Same | unchanged |
| TXT (DKIM) | _(provider-specific)_ | _(record current)_ | **UNCHANGED unless SMTP provider requires update** | Email auth | Same | unchanged |
| TXT (DMARC) | `_dmarc` | _(record current)_ | **UNCHANGED** | Email policy | Same | unchanged |

**Rules locked:**
- Lower TTL on `@` and `www` to **300 seconds at least 24 hours before** the deploy. Restore TTL after the deploy succeeds.
- **Never delete a DNS record.** Update its value; keep the old value in the rollback column.
- Email-related records (MX / SPF / DKIM / DMARC) should remain untouched unless the chosen SMTP provider explicitly requires SPF / DKIM additions.
- Take a full screenshot of the registrar/DNS panel before changes — and a second screenshot after, for diff evidence.

## Section 15 — SSL / HTTPS Checklist

| Check | How |
|---|---|
| Frontend host auto-provisions TLS for the apex domain | Most modern hosts (Netlify / Vercel / Cloudflare / Render) do this once DNS resolves to them |
| Frontend host auto-provisions TLS for `www` | Same — verify the host has both `ascassy.com` and `www.ascassy.com` registered |
| Backend host auto-provisions TLS for `api.ascassy.com` (if used) | Same |
| Mixed-content audit | Browser DevTools → Console — must be zero warnings on Home, PharmaPOS, Contact |
| HTTPS redirect | Default on Netlify / Vercel / Cloudflare; for Apache uncomment the redirect block in `.htaccess` |
| HSTS header | Already shipped via `_headers`, `vercel.json`, `.htaccess`, and `web.config` |
| `Strict-Transport-Security` max-age | 31536000 (1 year), `includeSubDomains`, `preload` — locked across all four configs |

## Section 16 — Email / Form Delivery Checklist

| Item | Value / Decision | Status |
|---|---|---|
| Inquiry recipient (`INQUIRY_TO_EMAIL`) | `hello@ascassy.com` (or the agreed mailbox) | Owner to confirm |
| "From" address (`INQUIRY_FROM_EMAIL`) | `no-reply@ascassy.com` (or a domain-aligned address) | Owner to confirm |
| SMTP provider | _(Google Workspace SMTP · Zoho · SendGrid · Resend · Postmark · …)_ | Owner to choose |
| SMTP host / port / user / pass | _(from provider)_ | Owner to fill |
| SPF includes the chosen sender (if needed) | Owner to update TXT record | Owner to verify |
| DKIM signing record (if provider requires) | Owner to add TXT record | Owner to verify |
| Test email from staging | Send one demo + one contact inquiry; confirm both land in inbox (not spam) | Pre-deploy |
| Test email from production | Repeat after DNS/TLS cutover | Post-deploy |
| Reply-to | Set to the visitor's email (already handled in `emailService.js`) | ✓ already coded |

## Section 17 — Rollback Plan

| Failure scenario | Rollback action | Responsible | ETA |
|---|---|---|---|
| New site does not load on `ascassy.com` | Revert DNS `A` / `CNAME` to the **Rollback value** column from Section 14 | Deep | < 10 min (after TTL) |
| Direct route refresh returns 404 | The fallback config is missing for the chosen host — re-upload the right file (`_redirects` / `.htaccess` / `vercel.json` / `web.config`) | Deep | < 5 min |
| Contact form posts fail (network / CORS) | Confirm `VITE_API_BASE_URL` was built against the right host, and that the backend's `CORS_ORIGIN` lists `https://ascassy.com` | Deep | < 15 min |
| Backend unreachable | Restart the backend; if persistent, revert the form's `VITE_API_BASE_URL` to a known-good URL and redeploy frontend | Deep | < 30 min |
| Emails not arriving | Check spam folder, SPF/DKIM, SMTP credentials; if still failing, leave SMTP unset — inquiries fall back to backend console logs (visible via host log viewer) | Deep | < 30 min |
| Mixed-content / TLS warning | Confirm `og-image.svg`, `VITE_API_BASE_URL`, and any external links use `https://` | Deep | < 10 min |
| Major layout regression vs. preview | Hard-refresh / clear CDN cache; if persistent, redeploy the verified `dist/` artifact from the local machine | Deep | < 15 min |
| Catastrophic failure | Restore old `dist`/files from Section 12 backup; restore DNS from screenshots | Deep + registrar | < 1 hour |

## Section 18 — Final Pre-Deployment Approval Checklist

All of the below must be `✓` before Phase 15 (Redeployment) is allowed to start.

| # | Gate | Status |
|---|---|---|
| 1 | Phase 0 – 13 all sealed | ✓ |
| 2 | Backup of existing site complete and **verified** (Section 12) | ☐ |
| 3 | Registrar + DNS + frontend host + backend host access **logged in and confirmed** | ☐ |
| 4 | Frontend deployment platform chosen (Section 13.3) | ☐ |
| 5 | Backend deployment platform chosen (or "skip backend" decided) | ☐ |
| 6 | Email SMTP provider chosen and `.env` ready | ☐ |
| 7 | DNS plan filled in (Section 14) | ☐ |
| 8 | TTL on `@` and `www` lowered to 300s at least 24h before cutover | ☐ |
| 9 | Rollback plan reviewed (Section 17) | ☐ |
| 10 | `dist/` artifact rebuilt fresh on the deployment day | ☐ |
| 11 | Backend `.env` populated with production values (`CORS_ORIGIN=https://ascassy.com`, real SMTP) | ☐ |
| 12 | Frontend `.env.production` populated (`VITE_API_BASE_URL`, `VITE_SITE_URL`) | ☐ |
| 13 | Stakeholder approval recorded (name + date) | ☐ |
| 14 | Deployment time window agreed (low-traffic hour) | ☐ |
| 15 | Post-deployment QA checklist printed / open ([Web/QA-CHECKLIST.md](../../QA-CHECKLIST.md)) | ☐ |

## Section 19 — Phase 14 Acceptance Criteria

| Criterion | Status |
|---|---|
| Current hosting / domain inventory template ready | ✓ |
| Backup plan locked with verification step | ✓ |
| Frontend + backend hosting options documented with pros/cons | ✓ |
| SPA fallback shipped for every realistic host | ✓ (Phase 13) |
| DNS preparation table locked (with rollback column) | ✓ |
| SSL / HTTPS checklist locked | ✓ |
| Email / form delivery checklist locked | ✓ |
| Rollback plan locked with 8 named failure scenarios | ✓ |
| Final approval gate (15 checkboxes) defined | ✓ |
| Companion deployment runbook created | ✓ ([Web/DEPLOYMENT.md](../../DEPLOYMENT.md)) |

## Section 20 — Phase 14 Lock Seal

> **Phase 14 is locked. The Ascassy website now has a complete, safe deployment plan: a verified backup procedure, a hosting decision framework, a DNS preparation table with rollback values, an SSL plan, an email delivery plan, a rollback playbook with eight named failure scenarios, and a 15-point approval gate that must be cleared before Phase 15 (Redeployment) starts. Phase 14 — SEALED.**

---

# ============================================================
# COMBINED PHASE 13 + PHASE 14 — FINAL SUMMARY
# ============================================================

## Section 21 — Combined Status

| Phase | Status | Sealed On |
|---|---|---|
| Phase 13 — Production Build | LOCKED & SEALED | 2026-05-22 |
| Phase 14 — Deployment Preparation | LOCKED & SEALED | 2026-05-22 |

## Section 22 — Project Lifecycle View

```
Phase 0     Vision Locking                       SEALED
Phase 1     Brand & Market Research              SEALED
BEGiN       IA + Design System + Content (2/3/4) SEALED
Phases 5–8  Frontend + Backend Build             BUILT & VERIFIED
Phases 9–12 Forms + Mobile + SEO + QA            SEALED
Phase 13    Production Build                     SEALED  ← this document
Phase 14    Deployment Preparation               SEALED  ← this document
Phase 15    Redeployment to ascassy.com          GATED — pending approval (Section 18)
```

## Section 23 — Files Created or Modified in This Phase Block

### Created
- [Web/frontend/public/_redirects](../../frontend/public/_redirects) — Netlify / Cloudflare Pages SPA fallback
- [Web/frontend/public/_headers](../../frontend/public/_headers) — security + cache headers (Netlify / Cloudflare Pages)
- [Web/frontend/public/.htaccess](../../frontend/public/.htaccess) — Apache / cPanel SPA fallback + headers + gzip
- [Web/frontend/public/web.config](../../frontend/public/web.config) — IIS / Windows hosting SPA fallback
- [Web/frontend/vercel.json](../../frontend/vercel.json) — Vercel rewrites + headers
- [Web/DEPLOYMENT.md](../../DEPLOYMENT.md) — actionable deployment runbook (fill-in checklist)
- This document

### Verified (no source changes needed)
- Source hygiene (no console logs, no leaked secrets, no TODOs, no hardcoded prod URLs)
- Production build (`dist/` 4.18s · 411 KB raw / 129 KB gzip main)
- Direct-route navigation across all 10 pages + unknown-route fallback
- Backend in `NODE_ENV=production` with 17/17 smoke checks green

## Section 24 — Readiness Statement for Phase 15

> **The Ascassy website is production-ready and deployment-prepared.**
> The build artifact is clean, the backend runs in production mode, and the deployment plan is documented end-to-end. **Phase 15 (Redeployment to ascassy.com) is permitted to begin only after every checkbox in Section 18 is marked ✓ and stakeholder approval is recorded.** Until then, nothing on the live ascassy.com is touched.

## Section 25 — Final Phase 13 + 14 Lock Seal

> **Phases 13 and 14 are jointly LOCKED & SEALED.**
>
> Phase 13 generated and verified the production artifact: a clean `dist/` build with SPA fallback configs for Netlify, Cloudflare Pages, Vercel, Apache/cPanel, and IIS — plus a backend confirmed in `NODE_ENV=production` with all 17 smoke checks passing.
>
> Phase 14 locked the safe deployment plan: a backup procedure that must complete before any cutover, a hosting-platform decision framework, a DNS table with rollback values, SSL / email / rollback / approval checklists, and a companion runbook for the deployment day itself.
>
> The project is in a known-good state, fully prepared to enter **Phase 15 — Redeployment to ascassy.com** once stakeholder approval is recorded.
>
> ---
>
> **Owner:** Deep Sorathiya — Technical Head, Software Development Domain
> **Company:** Ascassy Cloud Healthcare Pvt Ltd
> **Target Domain:** ascassy.com
> **Date:** 2026-05-22
> **Document Version:** 1.0
> **Status:** **PHASE 13 + 14 — LOCKED & SEALED — Awaiting approval for Phase 15**

---

*End of Phase 13 + Phase 14 Deep Dive Document.*
