// Healthcare Cloud page — anchors Ascassy as a serious cloud healthcare platform company.
import { motion } from 'framer-motion';
import { Cloud, Stethoscope, Building2, Users, Pill, HeartPulse, Activity, BrainCircuit, ShieldCheck } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import SectionWrapper from '../components/layout/SectionWrapper.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import CTASection from '../components/layout/CTASection.jsx';
import Container from '../components/common/Container.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/ui/Button.jsx';
import FeatureCard from '../components/ui/FeatureCard.jsx';
import OfferingCard from '../components/ui/OfferingCard.jsx';
import { stagger, inViewOnce } from '../utils/motion.js';
import { ecosystemLayers } from '../data/ecosystem.js';
import { productBridges } from '../data/offerings.js';

const audienceLayers = [
  { icon: Pill, title: 'Pharmacies', description: 'Pharmacy retail operations digitization via PharmaPOS.' },
  { icon: Stethoscope, title: 'Doctors', description: 'ABHA-aligned clinical workflow direction.' },
  { icon: Building2, title: 'Clinics', description: 'Clinic-layer operations as part of the broader cloud ecosystem roadmap.' },
  { icon: Users, title: 'Patients', description: 'Cloud-first access through CureInsights.' },
];

const directionLayers = [
  {
    icon: ShieldCheck,
    title: 'ABHA / EHR Alignment',
    description: 'Designed to align with India\'s digital health standards as the ecosystem matures.',
    accent: 'brand',
  },
  {
    icon: Activity,
    title: 'Remote Monitoring Direction',
    description: 'Connected-care direction for healthcare workflows that extend beyond the clinic.',
    accent: 'teal',
  },
  {
    icon: BrainCircuit,
    title: 'Data & Analytics Direction',
    description: 'Built for healthcare operations that learn from data — without overpromising AI.',
    accent: 'cloud',
  },
];

export default function HealthcareCloudPage() {
  return (
    <PageWrapper
      title="Healthcare Cloud — Ascassy"
      description="Ascassy is building the cloud infrastructure of modern Indian healthcare. Pharmacies, doctors, clinics, patients — all connected in one ecosystem."
    >
      <PageHero
        eyebrow="Healthcare Cloud"
        title="Building the cloud infrastructure of modern Indian healthcare."
        description="Pharmacies, doctors, clinics, and patients — connected through one cloud-first ecosystem designed for trust, accessibility, and operational clarity."
        badgeTone="cloud"
      >
        <Button to="/contact?type=partner" variant="primary">Partner With Us</Button>
        <Button to="/offerings" variant="outline">View Offerings</Button>
      </PageHero>

      {/* Connected Healthcare Ecosystem */}
      <SectionWrapper tone="white">
        <Container>
          <SectionHeader
            eyebrow="Connected Ecosystem"
            title="Four layers, one cloud healthcare ecosystem."
            description="Ascassy is not a single tool. It is a layered cloud ecosystem — each layer solves a real operational problem; together, they form connected healthcare workflows."
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

      {/* Audience layers */}
      <SectionWrapper tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Who Is It For"
            title="From pharmacy retail to clinical workflows to patient-facing services."
            description="Ascassy is designed to span the audience layers that healthcare actually moves through."
          />
          <motion.div
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {audienceLayers.map((a) => (
              <FeatureCard key={a.title} icon={a.icon} title={a.title} description={a.description} accent="brand" />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Direction layers — ABHA / EHR / Remote / AI */}
      <SectionWrapper tone="white">
        <Container>
          <SectionHeader
            eyebrow="Forward Direction"
            title="Aligned with India's digital health direction."
            description="Ascassy is built with the next generation of digital health standards in mind — and honest about which capabilities are direction vs. delivered."
          />
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {directionLayers.map((d) => (
              <FeatureCard key={d.title} icon={d.icon} title={d.title} description={d.description} accent={d.accent} />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Product layers — PharmaPOS + CureInsights bridges */}
      <SectionWrapper tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Product Layers"
            title="Two strong product layers, anchored in the ecosystem."
          />
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-6 lg:grid-cols-2"
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

      <CTASection
        eyebrow="Build with Ascassy"
        title="Partner with Ascassy on cloud healthcare infrastructure."
        description="If you're a healthcare business, ecosystem partner, or operator exploring connected cloud workflows — we'd like to talk."
        primary={{ label: 'Partner With Us', to: '/contact?type=partner' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
    </PageWrapper>
  );
}
