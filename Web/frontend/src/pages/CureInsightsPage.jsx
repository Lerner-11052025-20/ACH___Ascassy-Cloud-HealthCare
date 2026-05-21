// CureInsights page — patient-facing cloud healthcare service brand.
// CAREFUL: never claim diagnosis, clinical accuracy, AI doctor replacement, or guaranteed outcomes.
import { motion } from 'framer-motion';
import { HeartPulse, ShieldCheck } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import SectionWrapper from '../components/layout/SectionWrapper.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import CTASection from '../components/layout/CTASection.jsx';
import Container from '../components/common/Container.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/ui/Button.jsx';
import FeatureCard from '../components/ui/FeatureCard.jsx';
import FAQAccordion from '../components/ui/FAQAccordion.jsx';
import { stagger, inViewOnce } from '../utils/motion.js';
import { cureInsightsServices, cureInsightsFAQ } from '../data/cureinsights.js';

export default function CureInsightsPage() {
  return (
    <PageWrapper
      title="Ascassy CureInsights — Cloud Healthcare Services"
      description="CureInsights is the Ascassy cloud healthcare service brand — designed to simplify access to telehealth, pharmacy, pathology, imaging, reports, and prescriptions through a cloud-first experience."
    >
      <PageHero
        eyebrow="Ascassy CureInsights"
        title="Cloud-first access to healthcare services and coordination."
        description="CureInsights is designed to simplify access to healthcare services, records, prescriptions, pharmacy support, and diagnostic service coordination through a cloud-first experience."
        badgeTone="teal"
      >
        <Button to="/contact" variant="primary">Get in Touch</Button>
        <Button to="/healthcare-cloud" variant="outline">Healthcare Cloud</Button>
      </PageHero>

      {/* Cloud Healthcare Explanation */}
      <SectionWrapper tone="white">
        <Container size="narrow">
          <SectionHeader
            eyebrow="What CureInsights Is"
            title="A cloud healthcare service layer for modern access."
          />
          <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-ink-700">
            <p>
              CureInsights is the patient-facing cloud healthcare service brand of the Ascassy ecosystem.
              It is designed to make healthcare services easier to access, coordinate, and follow up on —
              through a cloud-first experience.
            </p>
            <p>
              CureInsights complements PharmaPOS (the pharmacy retail infrastructure layer) by extending
              the Ascassy ecosystem toward patients, healthcare consumers, and service coordination.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* Service blocks */}
      <SectionWrapper tone="muted">
        <Container>
          <SectionHeader
            eyebrow="What's Inside"
            title="The services CureInsights coordinates."
            description="Each service is framed honestly — what it does, who it helps, and where the cloud layer adds clarity."
          />
          <motion.div
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cureInsightsServices.map((s) => (
              <FeatureCard key={s.title} icon={s.icon} title={s.title} description={s.description} accent="teal" />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Trust & Access */}
      <SectionWrapper tone="white">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Trust & Access"
            title="Healthcare needs care, not hype."
          />
          <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-ink-700">
            <p>
              CureInsights is built with care for healthcare data, accessibility, and the realities of how
              people actually access services today. It does not claim to replace clinical care, diagnose
              conditions, or guarantee medical outcomes.
            </p>
            <p>
              Where AI analytics is mentioned, it is framed honestly as a long-term direction — designed to
              support healthcare workflows, not replace clinical judgment.
            </p>
          </div>
          <div className="mt-8 rounded-card border border-teal-100 bg-teal-50/40 p-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-navy-900">
                <span className="font-semibold">A clear note:</span> CureInsights supports the access and
                coordination of healthcare services. It is not a substitute for clinical diagnosis,
                treatment, or the judgment of qualified medical professionals.
              </p>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper tone="muted">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Common Questions"
            title="What people ask first about CureInsights."
          />
          <div className="mt-10">
            <FAQAccordion items={cureInsightsFAQ} />
          </div>
        </Container>
      </SectionWrapper>

      <CTASection
        eyebrow="Talk to Ascassy"
        title="Want to learn more about CureInsights?"
        description="Whether you're a healthcare consumer, partner, or business exploring the Ascassy cloud ecosystem — we'd like to hear from you."
        primary={{ label: 'Get in Touch', to: '/contact' }}
        secondary={{ label: 'Healthcare Cloud', to: '/healthcare-cloud' }}
      />
    </PageWrapper>
  );
}
