// PharmaPOS page — the most important commercial page on the site.
// Hero → pain points → product overview → features grid → dashboard preview → why → CTA → FAQ.
import { motion } from 'framer-motion';
import { ArrowRight, Pill, ShieldCheck, Cloud, Sparkles } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import SectionWrapper from '../components/layout/SectionWrapper.jsx';
import CTASection from '../components/layout/CTASection.jsx';
import Container from '../components/common/Container.jsx';
import GradientBlob from '../components/common/GradientBlob.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import FeatureCard from '../components/ui/FeatureCard.jsx';
import ProblemCard from '../components/ui/ProblemCard.jsx';
import BenefitCard from '../components/ui/BenefitCard.jsx';
import FAQAccordion from '../components/ui/FAQAccordion.jsx';
import DashboardMockup from '../components/ui/DashboardMockup.jsx';
import { fadeUp, stagger, inViewOnce } from '../utils/motion.js';
import {
  pharmaposFeatures,
  pharmaposPainPoints,
  pharmaposBenefits,
  pharmaposFAQ,
} from '../data/pharmapos.js';

export default function PharmaPOSPage() {
  return (
    <PageWrapper
      title="Ascassy PharmaPOS — Pharmacy Retail Infrastructure"
      description="Ascassy PharmaPOS is a modern cloud-ready POS designed for pharmaceutical retailers. Billing, inventory, batch & expiry, GST invoices, suppliers, customers, staff access, and operations reports — from one clean interface."
    >
      {/* 1. PharmaPOS Hero --------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white">
        <GradientBlob className="-top-32 -right-40" from="from-brand-200/80" via="via-cloud-300/40" to="to-teal-200/50" size="h-[720px] w-[720px]" />
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 lg:col-span-7"
          >
            <motion.div variants={fadeUp}>
              <Badge tone="brand" icon={Pill}>Pharmacy Retail Infrastructure</Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
            >
              A Modern POS for{' '}
              <span className="text-gradient-brand">Smarter Pharmacy Operations</span>.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-lg leading-relaxed text-ink-700 sm:text-xl"
            >
              Ascassy PharmaPOS is designed to help pharmaceutical retailers manage billing, inventory,
              batches, expiry, GST invoices, suppliers, customers, staff access, and business reports —
              from one clean interface.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-2 flex flex-wrap gap-3">
              <Button to="/contact?type=demo" variant="primary" size="lg" iconRight={ArrowRight}>
                Book a Demo
              </Button>
              <Button to="#features" variant="outline" size="lg">View Features</Button>
            </motion.div>
            <motion.p variants={fadeUp} className="text-sm text-ink-500">
              Built cloud-first. Ready for single-shop and multi-store pharmacy operations.
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
              <DashboardMockup />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 2. Pharmacy Owner Pain Points --------------------------------- */}
      <SectionWrapper tone="muted">
        <Container>
          <SectionHeader
            eyebrow="The Daily Reality"
            title="Running a pharmacy is hard. The wrong tools make it harder."
            description="Manual billing, stock mismatches, silent expiry losses, GST stress, no real visibility — these are not edge cases. They are most pharmacies' daily reality."
          />
          <motion.div
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {pharmaposPainPoints.map((p) => (
              <ProblemCard key={p.title} icon={p.icon} title={p.title} description={p.description} />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* 3. Product Overview ------------------------------------------- */}
      <SectionWrapper tone="white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge tone="teal" icon={Cloud}>What PharmaPOS Is</Badge>
              <h2 className="mt-4 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
                Pharmacy operations infrastructure, not just billing software.
              </h2>
              <p className="mt-4 text-lg text-ink-700">
                PharmaPOS is the pharmacy retail layer of the Ascassy Cloud Healthcare ecosystem.
                Every feature is designed around a real pharmacy decision — at the counter, in the back
                office, or on the owner's phone.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/contact?type=demo" variant="primary" iconRight={ArrowRight}>Book a Demo</Button>
                <Button to="/for-pharmacies" variant="ghost">For Pharmacy Owners</Button>
              </div>
            </div>
            <ul className="grid gap-3 rounded-card border border-ink-100 bg-ink-50/60 p-6 sm:p-8">
              {[
                'Designed for real pharmacy speed at the counter',
                'Built cloud-first for single-shop and multi-store growth',
                'GST-compliant invoicing without spreadsheet workarounds',
                'Real-time inventory, batch, and expiry visibility',
                'Reports designed for pharmacy owners, not analysts',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-navy-900">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </SectionWrapper>

      {/* 4–13. Features Grid (all 12 features) -------------------------- */}
      <SectionWrapper tone="brand" id="features">
        <Container>
          <SectionHeader
            eyebrow="Features"
            title="Every pharmacy decision, supported by the right feature."
            description="Twelve focused capabilities, designed to work together — not stitched together."
            align="center"
          />
          <motion.div
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {pharmaposFeatures.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} accent={f.accent} />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* 14. Dashboard Preview ------------------------------------------ */}
      <SectionWrapper tone="white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <Badge tone="cloud" icon={Sparkles}>Dashboard Preview</Badge>
              <h2 className="mt-4 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
                One dashboard for your entire pharmacy.
              </h2>
              <p className="mt-4 text-lg text-ink-700">
                A clear view of how your shop is performing today — sales, low stock, expiring batches,
                and the day's bills — surfaced where they belong.
              </p>
              <p className="mt-3 text-sm text-ink-500">
                Visual illustrative only. Final product UI will be refined ahead of launch.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <DashboardMockup />
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 15. Why Pharmacies Need It ------------------------------------- */}
      <SectionWrapper tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Why Switch"
            title="The outcomes pharmacy owners actually want."
            description="Faster counters. Cleaner inventory. Stopped expiry leaks. Owner-grade clarity."
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

      {/* 17. FAQ -------------------------------------------------------- */}
      <SectionWrapper tone="white">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Common Questions"
            title="What pharmacy owners ask first."
            description="Short, direct answers — designed to reduce confusion and build trust."
          />
          <div className="mt-10">
            <FAQAccordion items={pharmaposFAQ} />
          </div>
          <p className="mt-6 text-sm text-ink-500">
            Have a different question?{' '}
            <a href="/contact" className="font-semibold text-brand-700 hover:underline">
              Contact the Ascassy team
            </a>{' '}
            — we'll get back to you.
          </p>
        </Container>
      </SectionWrapper>

      {/* 16. Final CTA -------------------------------------------------- */}
      <CTASection
        eyebrow="See PharmaPOS in action"
        title="Book a personalized PharmaPOS demo."
        description="Walk through PharmaPOS with the Ascassy team — built around your pharmacy's real operations."
        primary={{ label: 'Book a Demo', to: '/contact?type=demo' }}
        secondary={{ label: 'For Pharmacy Owners', to: '/for-pharmacies' }}
      />
    </PageWrapper>
  );
}
