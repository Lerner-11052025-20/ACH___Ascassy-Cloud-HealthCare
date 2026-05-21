// BenefitCard — outcome-led, lighter than FeatureCard. Theme-aware.
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.js';
import { fadeUp } from '../../utils/motion.js';

export default function BenefitCard({ icon: Icon, title, description, className = '' }) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'flex flex-col gap-3 rounded-card border border-line bg-surface/70 p-6 backdrop-blur transition hover:bg-surface hover:shadow-card hover:-translate-y-0.5',
        className,
      )}
    >
      {Icon ? (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 text-white shadow-soft">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-base font-semibold text-fg">{title}</h3>
        <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
      </div>
    </motion.div>
  );
}
