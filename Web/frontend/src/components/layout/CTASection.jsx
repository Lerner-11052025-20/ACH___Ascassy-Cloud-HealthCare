// CTASection — final-CTA banner used at the end of most pages.
// Premium navy background with an animated mesh-gradient and dual CTAs.
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../common/Container.jsx';
import Button from '../ui/Button.jsx';
import { MagneticWrapper } from '../fx/index.js';
import { fadeUp } from '../../utils/motion.js';
import { primaryCTA } from '../../data/site.js';

export default function CTASection({
  eyebrow = 'Ready when you are',
  title = 'See how Ascassy can power your healthcare operations.',
  description = 'Book a demo with the Ascassy team and explore PharmaPOS, CureInsights, and the broader Ascassy Cloud Healthcare ecosystem.',
  primary = primaryCTA,
  secondary = { label: 'Contact Us', to: '/contact' },
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-24 lg:py-28 dark:bg-surface-elev">
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-70">
        <div className="absolute inset-0 bg-mesh-aurora" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-pattern-dot opacity-[0.5]" />
      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 ring-1 ring-white/15 backdrop-blur">
            {eyebrow}
          </span>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-300 sm:text-lg">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticWrapper>
              <Button to={primary.to} variant="primary" size="lg" iconRight={ArrowRight}>
                {primary.label}
              </Button>
            </MagneticWrapper>
            <Button
              to={secondary.to}
              size="lg"
              className="border-2 border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/10"
            >
              {secondary.label}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
