// CTASection — final-CTA banner used at the end of most pages.
// Premium navy background with subtle gradient accents and dual CTAs.
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../common/Container.jsx';
import Button from '../ui/Button.jsx';
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
    <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-24 lg:py-28">
      {/* gradient accents */}
      <div aria-hidden="true" className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-brand-600/30 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 right-1/3 h-[420px] w-[420px] rounded-full bg-teal-500/25 blur-3xl" />
      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 ring-1 ring-white/15">
            {eyebrow}
          </span>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-300 sm:text-lg">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to={primary.to} variant="primary" size="lg" iconRight={ArrowRight}>
              {primary.label}
            </Button>
            <Button
              to={secondary.to}
              size="lg"
              className="border-2 border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              {secondary.label}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
