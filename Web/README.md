# Ascassy Cloud Healthcare — Website Source

Production-grade implementation of the **ascassy.com** rebuild. Built on the locked Phase 0 → BEGiN strategy (vision, brand, IA, design system, content) sealed in [Web/Phases](./Phases).

## Stack

- **Frontend**: React 19 + JavaScript + Vite 7 + Tailwind CSS v4.3 + React Router v7 + framer-motion + lucide-react
- **Backend**: Node.js + Express 4 (helmet, cors, express-rate-limit, nodemailer, validator)
- **Database**: none (by design — V1 is a marketing website)

## Repo layout

```
Web/
├── Phases/                     # Sealed strategy docs (Phase 0 → BEGiN)
├── frontend/                   # React + Vite + Tailwind v4.3 website
│   ├── public/                 # static assets (favicon)
│   ├── src/
│   │   ├── assets/             # images / icons / logos
│   │   ├── components/
│   │   │   ├── common/         # Container, Badge, GradientBlob, SectionHeader, ScrollToTop
│   │   │   ├── layout/         # Navbar, MobileNavbar, Footer, PageHero, SectionWrapper, PageWrapper, CTASection, Logo
│   │   │   └── ui/             # Button, Card, FeatureCard, OfferingCard, BenefitCard, ProblemCard, TrustCard, Form*, FAQAccordion, DashboardMockup
│   │   ├── data/               # site, ecosystem, offerings, pharmapos, cureinsights, aboutValues
│   │   ├── hooks/              # (reserved for future hooks)
│   │   ├── pages/              # HomePage, AboutPage, OfferingsPage, PharmaPOSPage, ForPharmaciesPage,
│   │   │                       # HealthcareCloudPage, CureInsightsPage, ContactPage, PrivacyPolicyPage, TermsPage, NotFoundPage
│   │   ├── routes/AppRoutes.jsx
│   │   ├── styles/index.css    # Tailwind v4.3 @theme tokens + global rules
│   │   ├── utils/              # cn (class merge), motion (framer-motion presets)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── backend/                    # Express 4 ESM, no DB
    ├── src/
    │   ├── config/env.js
    │   ├── controllers/        # health, contact
    │   ├── middleware/         # rateLimit, errorHandler
    │   ├── routes/             # health, contact, demo
    │   ├── services/           # emailService (nodemailer SMTP + console fallback)
    │   ├── utils/sanitize.js
    │   ├── validators/contactValidator.js
    │   ├── app.js
    │   └── server.js
    ├── .env.example
    ├── package.json
    └── README.md
```

## Locked design system (Phase 3)

Tokens live in `frontend/src/styles/index.css` under Tailwind v4 `@theme`:

| Token family | Examples |
|---|---|
| Colors | `brand-{50..900}` (medical blue), `teal-{50..700}`, `navy-{700..950}`, `cloud-{300..500}`, `cyan-{200,300}`, `ink-{50..900}` |
| Typography | `font-sans` (Inter), `font-display` (Plus Jakarta Sans) |
| Radius | `rounded-button` (12px), `rounded-card` (16px), `rounded-input` (10px), `rounded-pill` |
| Shadow | `shadow-soft`, `shadow-card`, `shadow-lift`, `shadow-floating`, `shadow-glow-brand` |

Animations use shared framer-motion presets in `frontend/src/utils/motion.js` (`fadeUp`, `stagger`, `scaleIn`, etc.), honoring `prefers-reduced-motion` via the global CSS rule.

## Running locally

### Frontend
```bash
cd Web/frontend
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the production build
```

### Backend
```bash
cd Web/backend
npm install
cp .env.example .env  # edit if you want real SMTP
npm run dev           # http://localhost:4000 (auto-reload via node --watch)
npm start             # production mode
```

When `SMTP_HOST` in `.env` is empty, the backend logs incoming inquiries to its console instead of sending email — useful for local dev and pre-deployment verification.

### Wiring frontend → backend
The Contact form reads `import.meta.env.VITE_API_BASE_URL` and falls back to `http://localhost:4000`. To target a deployed backend, create `Web/frontend/.env`:

```
VITE_API_BASE_URL=https://api.ascassy.com
```

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Liveness probe |
| POST | `/api/contact` | General contact inquiry |
| POST | `/api/demo` | Demo request |

All POST endpoints accept the same payload (see [backend/README.md](./backend/README.md)) and return `{ ok: boolean, message?, fields?, delivery? }`.

## What is NOT in this V1

- No database, ORM, or schema.
- No login, signup, or authenticated areas.
- No payment gateway.
- No patient data collection.
- No PharmaPOS product backend (separate project).
- No ABHA/EHR live integration (positioned as direction, not delivered capability).

## Where the strategy lives

- [Phases/Phase-0_Vision-Locking](./Phases/Phase-0_Vision-Locking)
- [Phases/Phase-1-and-2_Brand-Research-and-IA](./Phases/Phase-1-and-2_Brand-Research-and-IA)
- [Phases/BEGiN_Phase-2-3-4_Execution-Planning](./Phases/BEGiN_Phase-2-3-4_Execution-Planning)

Every page, component, color, and CTA in this repo traces back to a locked decision in those documents.
