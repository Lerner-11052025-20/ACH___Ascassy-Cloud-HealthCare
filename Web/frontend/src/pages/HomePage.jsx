// Home page — the first impression. Anchors brand identity, surfaces the ecosystem,
// spotlights PharmaPOS, and drives Book Demo conversion.
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Pill,
  Stethoscope,
  HeartPulse,
  Cloud,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import SectionWrapper from '../components/layout/SectionWrapper.jsx';
import CTASection from '../components/layout/CTASection.jsx';
import Container from '../components/common/Container.jsx';
import GradientBlob from '../components/common/GradientBlob.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import FeatureCard from '../components/ui/FeatureCard.jsx';
import OfferingCard from '../components/ui/OfferingCard.jsx';
import BenefitCard from '../components/ui/BenefitCard.jsx';
import ProblemCard from '../components/ui/ProblemCard.jsx';
import {
  OverviewMockup,
  AIInsightsMockup,
  InventoryMockup,
} from '../components/ui/mockups/index.js';
import { fadeUp, stagger, inViewOnce } from '../utils/motion.js';
import { ecosystemLayers, whyAscassy } from '../data/ecosystem.js';
import { offerings, productBridges } from '../data/offerings.js';
import { pharmaposHomePreviewFeatures, pharmaposPainPoints, pharmaposBenefits } from '../data/pharmapos.js';
import { categoriesServed } from '../data/site.js';

const HOME_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ascassy Cloud Healthcare',
  legalName: 'Ascassy Cloud Healthcare Pvt Ltd',
  url: 'https://ascassy.com',
  logo: 'https://ascassy.com/og-image.svg',
  description:
    'Ascassy Cloud Healthcare connects pharmacies, doctors, clinics, patients, and digital health workflows in one cloud-first ecosystem.',
  areaServed: 'IN',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'hello@ascassy.com',
      availableLanguage: ['English', 'Hindi'],
    },
  ],
};

export default function HomePage() {
  return (
    <PageWrapper
      title="Ascassy Cloud Healthcare — Cloud Healthcare Infrastructure for Modern India"
      description="Ascassy Cloud Healthcare connects pharmacies, doctors, clinics, patients, and digital health workflows in one cloud-first ecosystem. Discover Ascassy PharmaPOS — pharmacy retail infrastructure built for modern operations."
      structuredData={HOME_STRUCTURED_DATA}
    >
      {/* 2. Premium Hero ------------------------------------------------ */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white">
        <GradientBlob className="-top-32 -right-40" from="from-brand-200/70" via="via-cloud-300/40" to="to-teal-200/50" size="h-[720px] w-[720px]" />
        <GradientBlob className="-bottom-40 -left-32" from="from-teal-100/60" via="via-cyan-200/30" to="to-brand-100/40" size="h-[520px] w-[520px]" />
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 lg:col-span-7"
          >
            <motion.div variants={fadeUp}>
              <Badge tone="brand" icon={Sparkles}>Cloud Healthcare Infrastructure for Modern India</Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]"
            >
              Build Smarter Healthcare Operations with{' '}
              <span className="text-gradient-brand">Ascassy</span>.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-lg leading-relaxed text-ink-700 sm:text-xl"
            >
              Ascassy Cloud Healthcare connects pharmacies, doctors, clinics, patients, and digital health
              workflows through a modern cloud-first ecosystem — designed for trust, accessibility, and
              operational clarity.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-2 flex flex-wrap gap-3">
              <Button to="/pharmapos" variant="primary" size="lg" iconRight={ArrowRight}>
                Explore PharmaPOS
              </Button>
              <Button to="/contact?type=demo" variant="outline" size="lg">
                Book a Demo
              </Button>
            </motion.div>
            <motion.p variants={fadeUp} className="text-sm text-ink-500">
              No credit card. No commitments. A clean conversation about your pharmacy or healthcare operations.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/40 via-white to-teal-200/40 blur-2xl" />
              <OverviewMockup />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 3. Trust / Category Strip ------------------------------------- */}
      <section className="border-y border-ink-100 bg-white py-8">
        <Container>
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
              Built for the realities of modern healthcare
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {categoriesServed.map((cat) => (
                <li key={cat} className="text-sm font-medium text-ink-700">
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 4. Healthcare Ecosystem Overview ------------------------------- */}
      <SectionWrapper tone="white">
        <Container>
          <SectionHeader
            eyebrow="One Ecosystem"
            title="Connected healthcare operations, layered for the way India actually works."
            description="From pharmacy retail to clinical workflows to patient-facing services — Ascassy is built as a layered cloud ecosystem, not a single tool."
          />
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {ecosystemLayers.map((layer) => (
              <FeatureCard
                key={layer.title}
                icon={layer.icon}
                title={layer.title}
                description={layer.description}
                accent={layer.accent}
              />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* 5. Problem Statement ------------------------------------------ */}
      <SectionWrapper tone="muted">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="The Real Challenges"
                title="Healthcare operations break in quiet, expensive ways."
                description="Manual billing, scattered records, expiry losses, fragmented workflows — pharmacies, clinics, and patients all feel it. Ascassy is built to fix it."
              />
            </div>
            <motion.div
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
              className="grid gap-4 sm:grid-cols-2 lg:col-span-7"
            >
              {pharmaposPainPoints.slice(0, 4).map((p) => (
                <ProblemCard key={p.title} icon={p.icon} title={p.title} description={p.description} />
              ))}
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 6. PharmaPOS Preview ------------------------------------------ */}
      <SectionWrapper tone="white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Badge tone="brand" icon={Pill}>Flagship Product</Badge>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
                Ascassy PharmaPOS — pharmacy retail infrastructure, reimagined.
              </h2>
              <p className="mt-4 text-lg text-ink-700">
                A cloud-ready POS designed for billing, inventory, batch & expiry, GST invoicing,
                suppliers, customers, staff access, and operations reports — built for real pharmacy speed.
              </p>
              <motion.div
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={inViewOnce}
                className="mt-8 grid gap-4 sm:grid-cols-2"
              >
                {pharmaposHomePreviewFeatures.map((f) => (
                  <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} accent={f.accent} />
                ))}
              </motion.div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/pharmapos" variant="primary" iconRight={ArrowRight}>Explore PharmaPOS</Button>
                <Button to="/contact?type=demo" variant="ghost">Book a Demo</Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="relative">
                <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-100 via-white to-teal-100 blur-xl" />
                {/* Different screen here — surfaces AI Insights to vary the story */}
                <AIInsightsMockup />
              </div>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 7. Key Benefits ----------------------------------------------- */}
      <SectionWrapper tone="brand">
        <Container>
          <SectionHeader
            eyebrow="What Changes"
            title="Real outcomes for real healthcare operations."
            description="Ascassy is engineered to turn daily operational pain into calm, reliable workflows — measured in time saved, losses avoided, and clarity gained."
            align="center"
          />
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {pharmaposBenefits.map((b) => (
              <BenefitCard key={b.title} icon={b.icon} title={b.title} description={b.description} />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* 8. Offerings Snapshot ----------------------------------------- */}
      <SectionWrapper tone="white">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="A Connected Healthcare Ecosystem"
              title="Four layers, one ecosystem."
              description="Ascassy spans identity, access, clinical, and care layers — designed to work together, not in silos."
            />
            <Button to="/offerings" variant="outline" iconRight={ArrowRight}>View Offerings</Button>
          </div>
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {offerings.map((o) => (
              <OfferingCard
                key={o.title}
                icon={o.icon}
                eyebrow={o.eyebrow}
                title={o.title}
                description={o.description}
                to={o.to}
                ctaLabel={o.ctaLabel}
                accent={o.accent}
              />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* 9. CureInsights / Cloud Healthcare Highlight ------------------ */}
      <SectionWrapper tone="muted">
        <Container>
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="grid gap-6 lg:grid-cols-2"
          >
            {productBridges.map((bridge) => (
              <OfferingCard
                key={bridge.title}
                icon={bridge.icon}
                eyebrow={bridge.eyebrow}
                title={bridge.title}
                description={bridge.description}
                to={bridge.to}
                ctaLabel={bridge.ctaLabel}
                accent={bridge.accent}
                className="p-8 lg:p-10"
              />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* 10. Why Ascassy ----------------------------------------------- */}
      <SectionWrapper tone="white">
        <Container>
          <SectionHeader
            eyebrow="Why Ascassy"
            title="Built for trust. Designed for operations."
            description="Ascassy is a platform company, not a service vendor. Every decision is anchored in healthcare-grade trust, India context, and long-term ecosystem thinking."
          />
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {whyAscassy.map((w) => (
              <FeatureCard
                key={w.title}
                icon={w.icon}
                title={w.title}
                description={w.description}
                accent="teal"
              />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* 11. Product / Workflow Preview --------------------------------- */}
      <SectionWrapper tone="white" size="compact">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <Badge tone="cloud" icon={Cloud}>See It in Action</Badge>
              <h2 className="mt-4 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
                A calm, clear pharmacy dashboard — built for owners, not engineers.
              </h2>
              <p className="mt-4 text-lg text-ink-700">
                Live sales, low stock, expiring batches, and the day's bills — surfaced where they belong.
                No dashboards full of noise. No "click through 12 screens" workflows.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {['Real-time KPI strip', '7-day sales chart', 'Recent bills timeline', 'Expiry & low-stock alerts'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-navy-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              {/* Third screen — Inventory + AI stock recommendation */}
              <InventoryMockup />
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 12. Final CTA -------------------------------------------------- */}
      <CTASection
        eyebrow="Ready when you are"
        title="See Ascassy in action — for your pharmacy or healthcare operations."
        description="Book a personalized demo with the Ascassy team and explore PharmaPOS, CureInsights, and the broader healthcare cloud ecosystem."
      />
    </PageWrapper>
  );
}
