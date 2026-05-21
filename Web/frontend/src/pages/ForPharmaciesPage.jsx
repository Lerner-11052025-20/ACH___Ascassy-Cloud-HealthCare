// For Pharmacies page — emotional, owner-focused, business-conversion page.
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Pill } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import SectionWrapper from '../components/layout/SectionWrapper.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import CTASection from '../components/layout/CTASection.jsx';
import Container from '../components/common/Container.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/ui/Button.jsx';
import ProblemCard from '../components/ui/ProblemCard.jsx';
import BenefitCard from '../components/ui/BenefitCard.jsx';
import { stagger, inViewOnce, fadeUp } from '../utils/motion.js';
import { pharmaposPainPoints, pharmaposBenefits, pharmaposBeforeAfter } from '../data/pharmapos.js';

export default function ForPharmaciesPage() {
  return (
    <PageWrapper
      title="For Pharmacies — Ascassy PharmaPOS"
      description="Your pharmacy deserves faster billing, cleaner inventory, expiry control, and better business visibility. Ascassy PharmaPOS is built for real pharmacy owners."
    >
      <PageHero
        eyebrow="For Pharmacy Owners"
        title="Run a smarter pharmacy with Ascassy."
        description="Your pharmacy deserves faster billing, cleaner inventory, expiry control, and better business visibility. PharmaPOS is built for real pharmacy owners — not enterprise IT teams."
        badgeTone="teal"
      >
        <Button to="/contact?type=demo" variant="primary" iconRight={ArrowRight}>Book a Demo</Button>
        <Button to="/pharmapos" variant="outline">See PharmaPOS Features</Button>
      </PageHero>

      {/* Daily problems */}
      <SectionWrapper tone="white">
        <Container>
          <SectionHeader
            eyebrow="Daily Reality"
            title="The pain you already know — recognized."
            description="If any of these feel familiar, you are not alone. They are the daily reality of running a pharmacy on outdated tools."
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

      {/* Before vs After */}
      <SectionWrapper tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Before vs After"
            title="What changes after PharmaPOS."
            description="A visual look at how pharmacy operations transform once Ascassy is in place."
            align="center"
          />
          <motion.div
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mx-auto mt-12 grid max-w-5xl gap-4"
          >
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
              <span>Before PharmaPOS</span>
              <span>After PharmaPOS</span>
            </div>
            {pharmaposBeforeAfter.map((row, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="grid grid-cols-1 gap-3 rounded-card bg-white p-5 shadow-card ring-1 ring-ink-100 sm:grid-cols-2"
              >
                <div className="flex items-start gap-3 text-ink-700">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                    <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span>{row.before}</span>
                </div>
                <div className="flex items-start gap-3 font-medium text-navy-900">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span>{row.after}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Benefits for owner/staff/customer */}
      <SectionWrapper tone="white">
        <Container>
          <SectionHeader
            eyebrow="What Changes"
            title="Benefits for the owner, the staff, and the customer."
            description="Every operational improvement compounds — owner gets clarity, staff gets calm, customer gets speed."
          />
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {pharmaposBenefits.map((b) => (
              <BenefitCard key={b.title} icon={b.icon} title={b.title} description={b.description} />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Operations workflow */}
      <SectionWrapper tone="muted">
        <Container>
          <SectionHeader
            eyebrow="A Day With PharmaPOS"
            title="What a calm pharmacy day actually looks like."
            description="A simplified view of how PharmaPOS supports pharmacy operations from morning to closing."
          />
          <motion.ol
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { step: '01', title: 'Morning open', text: "Owner sees yesterday's numbers + today's low-stock and expiring batches at a glance." },
              { step: '02', title: 'Counter operations', text: 'Staff bills customers fast and accurately, with the right batch every time.' },
              { step: '03', title: 'Mid-day', text: 'Inventory updates in real time. GST invoices generate automatically. No paper chaos.' },
              { step: '04', title: 'Closing', text: 'Daily reports are ready. Tomorrow starts from clarity, not guesswork.' },
            ].map((s) => (
              <motion.li
                key={s.step}
                variants={fadeUp}
                className="rounded-card bg-white p-6 shadow-card ring-1 ring-ink-100"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {s.step}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{s.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </SectionWrapper>

      <CTASection
        eyebrow="Designed for pharmacy owners"
        title="Book a PharmaPOS demo — built around your shop."
        description="Walk through PharmaPOS with the Ascassy team and see how your daily pharmacy operations could look."
        primary={{ label: 'Book a Demo', to: '/contact?type=demo' }}
        secondary={{ label: 'PharmaPOS Features', to: '/pharmapos' }}
      />
    </PageWrapper>
  );
}
