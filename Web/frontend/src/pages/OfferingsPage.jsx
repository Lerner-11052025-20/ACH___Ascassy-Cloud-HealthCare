// Offerings page — repositions the current ascassy.com services as connected layers.
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import SectionWrapper from '../components/layout/SectionWrapper.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import CTASection from '../components/layout/CTASection.jsx';
import Container from '../components/common/Container.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/ui/Button.jsx';
import OfferingCard from '../components/ui/OfferingCard.jsx';
import FeatureCard from '../components/ui/FeatureCard.jsx';
import PharmaPOSPreview from '../components/ui/PharmaPOSPreview.jsx';
import { stagger, inViewOnce } from '../utils/motion.js';
import { offerings, productBridges } from '../data/offerings.js';
import { ecosystemLayers } from '../data/ecosystem.js';

export default function OfferingsPage() {
  return (
    <PageWrapper
      title="Offerings — Ascassy Cloud Healthcare"
      description="Ascassy offers a connected ecosystem of healthcare layers: ABHA-integrated platform, pharmacy access, ABHA-powered EHR direction, remote monitoring, PharmaPOS, and CureInsights."
    >
      <PageHero
        eyebrow="Offerings"
        title="A connected ecosystem of healthcare layers."
        description="Ascassy spans identity, access, clinical, and care layers — designed to work together, not in silos."
        visual={
          <PharmaPOSPreview
            tabs={['users', 'inventory', 'ai']}
            defaultTab="users"
            size="compact"
          />
        }
      >
        <Button to="/contact" variant="primary">Talk to Us</Button>
        <Button to="/pharmapos" variant="outline">Explore PharmaPOS</Button>
      </PageHero>

      {/* Ecosystem explanation */}
      <SectionWrapper tone="white">
        <Container>
          <SectionHeader
            eyebrow="Healthcare Ecosystem"
            title="One ecosystem, many connected layers."
            description="Each Ascassy layer solves a specific operational reality. Together, they form the digital infrastructure of modern Indian healthcare."
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

      {/* Current offerings — repositioned */}
      <SectionWrapper tone="muted">
        <Container>
          <SectionHeader
            eyebrow="Service Layers"
            title="The Ascassy service ecosystem."
            description="Building on Ascassy's foundation in ABHA integration, pharmacy access, EHR direction, and remote monitoring — all aligned under one cloud healthcare vision."
          />
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

      {/* Product bridges — PharmaPOS + CureInsights */}
      <SectionWrapper tone="white">
        <Container>
          <SectionHeader
            eyebrow="Flagship Products"
            title="Two product layers, one Ascassy ecosystem."
            description="PharmaPOS is the pharmacy retail infrastructure layer. CureInsights is the patient-facing cloud healthcare service brand."
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
        eyebrow="Explore the ecosystem"
        title="Want to go deeper on any Ascassy layer?"
        description="Talk to the Ascassy team about pharmacy operations, cloud healthcare partnerships, or ecosystem integration."
        primary={{ label: 'Talk to Us', to: '/contact' }}
        secondary={{ label: 'Healthcare Cloud', to: '/healthcare-cloud' }}
      />
    </PageWrapper>
  );
}
