// About page — company story, mission, vision, values, ecosystem snapshot, trust.
import { motion } from 'framer-motion';
import { Compass, Target, Eye, Building2 } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import SectionWrapper from '../components/layout/SectionWrapper.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import CTASection from '../components/layout/CTASection.jsx';
import Container from '../components/common/Container.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/ui/Button.jsx';
import FeatureCard from '../components/ui/FeatureCard.jsx';
import { fadeUp, stagger, inViewOnce } from '../utils/motion.js';
import { companyValues } from '../data/aboutValues.js';
import { ecosystemLayers } from '../data/ecosystem.js';

export default function AboutPage() {
  return (
    <PageWrapper
      title="About Ascassy Cloud Healthcare"
      description="Ascassy is building the cloud infrastructure of modern Indian healthcare — connecting pharmacies, doctors, clinics, patients, and digital health workflows into one ecosystem."
    >
      <PageHero
        eyebrow="About Ascassy"
        title="Building cloud healthcare infrastructure for a more connected India."
        description="Ascassy is a healthcare technology company. We build the operational and cloud layers that modern healthcare needs — starting with pharmacy retail, expanding outward into doctors, clinics, patients, and connected workflows."
      >
        <Button to="/contact" variant="primary">Talk to the Team</Button>
        <Button to="/offerings" variant="outline">View Offerings</Button>
      </PageHero>

      {/* Company story */}
      <SectionWrapper tone="white">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Our Story"
            title="From a single product idea to a cloud healthcare ecosystem."
          />
          <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-ink-700">
            <p>
              Ascassy Cloud Healthcare Pvt Ltd was started with a simple observation: healthcare
              operations in India are still held together by paper, spreadsheets, and goodwill —
              while the rest of the world is moving toward connected, cloud-first systems.
            </p>
            <p>
              We are building the digital plumbing of modern Indian healthcare — beginning with
              pharmacy retail, where the daily pain is real, the operations are well-understood,
              and the impact is immediate.
            </p>
            <p>
              Ascassy PharmaPOS is the flagship product of that mission. Ascassy CureInsights is the
              patient-facing service brand that brings cloud healthcare access closer to people.
              Together, they form two strong layers of the broader Ascassy Cloud Healthcare ecosystem.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* Mission + Vision */}
      <SectionWrapper tone="muted">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
              className="rounded-card bg-white p-8 shadow-card ring-1 ring-ink-100 sm:p-10"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Target className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-navy-900 sm:text-3xl">Mission</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-700">
                To make healthcare operations faster, cleaner, and more connected — through cloud-first
                technology built for the realities of Indian healthcare.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
              className="rounded-card bg-white p-8 shadow-card ring-1 ring-ink-100 sm:p-10"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <Eye className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-navy-900 sm:text-3xl">Vision</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-700">
                A connected cloud healthcare ecosystem powering pharmacies, doctors, clinics, and patients
                across India — designed for trust, accessibility, and operational clarity.
              </p>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper tone="white">
        <Container>
          <SectionHeader
            eyebrow="Our Values"
            title="The principles that shape every product decision."
          />
          <motion.div
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {companyValues.map((v) => (
              <FeatureCard key={v.title} icon={v.icon} title={v.title} description={v.description} accent="teal" />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* What we're building */}
      <SectionWrapper tone="muted">
        <Container>
          <SectionHeader
            eyebrow="What We Are Building"
            title="An ecosystem of healthcare layers — not a single tool."
            description="Ascassy is built as a layered cloud ecosystem. Each layer solves a specific operational reality; together, they form connected healthcare workflows."
          />
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {ecosystemLayers.map((layer) => (
              <FeatureCard key={layer.title} icon={layer.icon} title={layer.title} description={layer.description} accent={layer.accent} />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Why Indian Healthcare Needs This */}
      <SectionWrapper tone="white">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Why This Matters"
            title="Why Indian healthcare needs a connected digital infrastructure."
          />
          <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-ink-700">
            <p>
              India's healthcare ecosystem spans tens of thousands of pharmacies, hundreds of thousands
              of doctors, and a vast network of clinics and diagnostic centers. Most of these still
              operate on disconnected systems.
            </p>
            <p>
              Cloud-first infrastructure — aligned with India's emerging digital health standards (ABHA,
              EHR, and beyond) — is how this ecosystem becomes connected, transparent, and
              operationally cleaner.
            </p>
            <p>
              Ascassy is one of the companies building toward that future, starting with the layers
              where the operational impact is most immediate.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* Team / company trust */}
      <SectionWrapper tone="muted">
        <Container size="narrow">
          <SectionHeader
            eyebrow="The Team"
            title="A serious team building a serious platform."
            description="Ascassy is led by a focused team of healthcare-aware product and engineering leaders. We will introduce the full team on this page as the brand matures."
          />
          <div className="mt-10 rounded-card border border-ink-100 bg-white p-8 shadow-card">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-900">Ascassy Cloud Healthcare Pvt Ltd</h3>
                <p className="mt-1 text-sm text-ink-700">
                  Building cloud healthcare infrastructure for modern India. Full team profiles will be
                  published as part of the next website iteration.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <CTASection
        eyebrow="Let's Talk"
        title="Partner with Ascassy or talk to the team."
        description="Whether you are a pharmacy, healthcare business, partner, or investor — we'd like to hear from you."
        primary={{ label: 'Contact Ascassy', to: '/contact' }}
        secondary={{ label: 'View Offerings', to: '/offerings' }}
      />
    </PageWrapper>
  );
}
