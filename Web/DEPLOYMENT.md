# Ascassy Website — Deployment Runbook

> Fill-in checklist used during the actual deployment of **ascassy.com**.
> Companion to the sealed strategy doc at [Web/Phases/Phase-13-and-14_Production-Build-and-Deployment-Prep/](Phases/Phase-13-and-14_Production-Build-and-Deployment-Prep/).
> Pre-deployment QA lives in [Web/QA-CHECKLIST.md](QA-CHECKLIST.md).

---

## A. Hosting + Domain Inventory (fill before touching anything)

| Item | Current value | Access confirmed by | Notes |
|---|---|---|---|
| Domain registrar | _e.g. GoDaddy / Namecheap / BigRock_ | | |
| DNS provider | _registrar / Cloudflare / Route 53_ | | |
| Current frontend host | _cPanel / shared / WordPress / etc._ | | |
| Current backend host (if any) | _none / VPS / managed_ | | |
| Current SSL provider | _Let's Encrypt / cPanel auto / paid_ | | |
| Email provider for `@ascassy.com` | _Google Workspace / Zoho / cPanel / other_ | | |
| Registrar login owner | | | |
| Hosting control panel owner | | | |
| Deployment access owner | | | |

**Discovery commands** (run from a terminal that can reach the public internet):
```bash
whois ascassy.com | grep -E "Registrar:|Name Server:"
dig NS ascassy.com +short
dig A ascassy.com +short
dig CNAME www.ascassy.com +short
dig MX ascassy.com +short
dig TXT ascassy.com +short
```

---

## B. Backup Existing Site (do not skip)

| # | Item | Method | Storage location | Verified |
|---|---|---|---|---|
| 1 | Mirror of current website | `wget --mirror --convert-links --adjust-extension --page-requisites --no-parent https://ascassy.com/` | Encrypted folder + offline copy | ☐ |
| 2 | Host control-panel backup (full account, if available) | Host control panel → Backup | Same | ☐ |
| 3 | DNS zone export / screenshots of every record | Registrar / DNS panel → Export | Same | ☐ |
| 4 | Email DNS records (MX / SPF / DKIM / DMARC) | Same export | Same | ☐ |
| 5 | SSL cert + private key (if not auto-managed) | Host panel | Encrypted folder | ☐ |
| 6 | Backup completion timestamp + owner sign-off | Plain text | Same | ☐ |

> **Stop here if any row is `☐`.** Backups are non-negotiable.

---

## C. Choose Deployment Platforms

| Layer | Options | Final choice | Reason |
|---|---|---|---|
| Frontend | Netlify · Vercel · Cloudflare Pages · cPanel (Apache) · VPS · IIS | | |
| Backend | Render · Railway · Fly · VPS · skip (static form service) | | |
| Email transport | Google Workspace SMTP · Zoho · SendGrid · Resend · Postmark · other | | |

Pros/cons tables: see Section 13 of the [Phase 13–14 Deep Dive Document](Phases/Phase-13-and-14_Production-Build-and-Deployment-Prep/Phase-13-and-14_Deep-Dive-Document.md).

---

## D. Build the Production Artifact (on deployment day)

```bash
# Frontend
cd Web/frontend
echo "VITE_API_BASE_URL=https://api.ascassy.com" > .env.production
echo "VITE_SITE_URL=https://ascassy.com"      >> .env.production
npm ci
npm run build              # → dist/

# Quick local sanity
npm run preview            # http://localhost:4173 — click around
```

| Check | ☐ |
|---|---|
| `dist/` contains `index.html`, `assets/`, `robots.txt`, `sitemap.xml`, `og-image.svg`, `favicon.svg` | ☐ |
| `dist/` contains the right SPA fallback file for the chosen host (`_redirects` · `.htaccess` · `web.config`) | ☐ |
| `vercel.json` is present at `Web/frontend/` if deploying to Vercel | ☐ |
| Local preview shows Home, PharmaPOS, Contact correctly | ☐ |
| Direct refresh of `/pharmapos` and `/contact` returns 200 (no 404) | ☐ |

---

## E. Deploy Frontend (pick one path)

### E1. Netlify / Cloudflare Pages (CLI or git connect)
```bash
# Netlify CLI example
npm install -g netlify-cli
netlify deploy --dir=dist --prod
# `_redirects` and `_headers` ship inside dist/ automatically.
```

### E2. Vercel
```bash
npm install -g vercel
cd Web/frontend
vercel --prod
# vercel.json at the project root is read automatically.
```

### E3. cPanel / Apache shared hosting
1. Zip the contents of `Web/frontend/dist/` (not the folder, the contents).
2. Upload via File Manager into `public_html/` (or the document root).
3. Confirm `.htaccess` is present at the document root.
4. Confirm the site loads on the staging URL before pointing DNS.

### E4. VPS / Nginx
Place `dist/` at `/var/www/ascassy`. Server block:
```nginx
server {
  listen 443 ssl http2;
  server_name ascassy.com www.ascassy.com;
  root /var/www/ascassy;
  index index.html;
  location / {
    try_files $uri $uri/ /index.html;
  }
  # ssl_certificate /etc/letsencrypt/live/ascassy.com/fullchain.pem;
  # ssl_certificate_key /etc/letsencrypt/live/ascassy.com/privkey.pem;
}
```

---

## F. Deploy Backend (if Express server is used)

```bash
cd Web/backend
# Configure .env on the host with real values:
#   NODE_ENV=production
#   PORT=4000  (or as required by host)
#   CORS_ORIGIN=https://ascassy.com
#   INQUIRY_TO_EMAIL=hello@ascassy.com
#   INQUIRY_FROM_EMAIL=no-reply@ascassy.com
#   SMTP_HOST=...  SMTP_PORT=587  SMTP_USER=...  SMTP_PASS=...
npm ci --omit=dev
npm start
```

| Check | ☐ |
|---|---|
| Backend is reachable on `https://api.ascassy.com` (or chosen host) | ☐ |
| `GET /api/health` returns `200 { status: "ok" }` | ☐ |
| `npm run smoke` against the deployed backend (`API_BASE=https://api.ascassy.com npm run smoke`) returns all green | ☐ |
| `CORS_ORIGIN` allows only `https://ascassy.com` (and `https://www.ascassy.com` if used) | ☐ |
| Rate limit headers visible on POST responses | ☐ |

---

## G. DNS Cutover (lower TTL ≥ 24h ahead)

| Record | Host | Current | New | Rollback | TTL |
|---|---|---|---|---|---|
| A | `@` | _fill_ | _frontend host IP_ | _current_ | 300 |
| CNAME | `www` | _fill_ | _frontend host CNAME_ | _current_ | 300 |
| CNAME | `api` | _none_ | _backend host CNAME_ | _delete on rollback_ | 300 |
| MX | `@` | _fill_ | **unchanged** | _same_ | unchanged |
| TXT (SPF/DKIM/DMARC) | _fill_ | _fill_ | **unchanged unless SMTP requires** | _same_ | unchanged |

Cutover order:
1. Verify new site works on its staging URL.
2. Update `A` and `CNAME` for `@` and `www`.
3. Watch `dig +short ascassy.com` until it returns the new value.
4. Verify HTTPS resolves cleanly (no certificate warning).
5. Smoke-test Home → PharmaPOS → Contact → submit a test inquiry.
6. After 24h of stability, restore TTL to its previous value.

---

## H. SSL / HTTPS Verification

| Check | ☐ |
|---|---|
| `https://ascassy.com` loads with a valid certificate | ☐ |
| `https://www.ascassy.com` loads with a valid certificate | ☐ |
| HTTP → HTTPS redirect works | ☐ |
| `https://api.ascassy.com/api/health` loads with a valid certificate (if backend) | ☐ |
| No mixed-content warnings on Home, PharmaPOS, Contact | ☐ |
| `Strict-Transport-Security` header present on responses | ☐ |

---

## I. Email / Form Delivery Verification

| Check | ☐ |
|---|---|
| Test demo submission from `https://ascassy.com/contact?type=demo` lands in `INQUIRY_TO_EMAIL` | ☐ |
| Test general inquiry from `https://ascassy.com/contact` lands in `INQUIRY_TO_EMAIL` | ☐ |
| Test email is **not** in spam/junk | ☐ |
| Reply-to in the test email points to the visitor's email | ☐ |
| SPF / DKIM / DMARC pass (check via Gmail "Show original" or similar) | ☐ |

---

## J. Post-Deployment QA

Run through every section of [Web/QA-CHECKLIST.md](QA-CHECKLIST.md) on the **live** site:

| Block | Pass |
|---|---|
| 2. Routes (all 10 pages + 404) | ☐ |
| 3. Navigation (navbar + footer) | ☐ |
| 4. Mobile (≤ 640 px) | ☐ |
| 5. Forms (demo + contact + honeypot rejection) | ☐ |
| 6. Animation & motion | ☐ |
| 7. Performance & SEO (Lighthouse ≥ 90 / 95 / 95) | ☐ |
| 8. Accessibility | ☐ |
| 9. Browsers | ☐ |
| 10. Content trust | ☐ |
| 11. Final go/no-go | ☐ |

---

## K. Rollback (only if needed)

| Scenario | Action |
|---|---|
| Site does not load | Revert `A`/`CNAME` to the **Rollback** column in Section G |
| 404 on refresh | Re-upload the right SPA fallback file for the chosen host |
| Form CORS error | Confirm backend `CORS_ORIGIN` and rebuild frontend with the correct `VITE_API_BASE_URL` |
| Backend down | Restart; if persistent, point `VITE_API_BASE_URL` to a known-good URL and redeploy frontend |
| Email failure | Verify SPF/DKIM and SMTP credentials; until fixed, inquiries log to backend console (visible via host log viewer) |
| Mixed-content / TLS warning | Audit absolute URLs in JSON-LD, OG, and Contact form `VITE_API_BASE_URL` |
| Layout regression | Hard-refresh / purge CDN; redeploy from local verified `dist/` |
| Catastrophic failure | Restore old DNS from Section A/B; restore old site files from Section B backup |

---

## L. Stakeholder Approval Gate

| # | Approval | Name | Date | Signature / sign-off |
|---|---|---|---|---|
| 1 | Backup verified | | | |
| 2 | Hosting choices locked | | | |
| 3 | DNS plan reviewed | | | |
| 4 | Rollback plan reviewed | | | |
| 5 | Deployment window agreed | | | |
| 6 | **Go for Phase 15 redeployment** | | | |

> When all six rows are signed, Phase 15 begins.
