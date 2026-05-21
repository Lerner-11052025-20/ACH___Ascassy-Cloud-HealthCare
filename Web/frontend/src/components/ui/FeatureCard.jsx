// FeatureCard — surfaces a single product feature with icon + title + description.
// Used on Home (PharmaPOS preview) and PharmaPOS page feature grids.
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.js';
import { fadeUp } from '../../utils/motion.js';

export default function FeatureCard({ icon: Icon, title, description, accent = 'brand', className = '' }) {
  const accents = {
    brand: 'bg-brand-50 text-brand-700',
    teal: 'bg-teal-50 text-teal-700',
    cloud: 'bg-cloud-300/15 text-cloud-500',
    navy: 'bg-navy-900/5 text-navy-900',
  };
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'group flex flex-col gap-4 rounded-card bg-white p-6 shadow-card ring-1 ring-ink-100',
        'transition duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-brand-100',
        className,
      )}
    >
      {Icon ? (
        <span className={cn('inline-flex h-11 w-11 items-center justify-center rounded-xl', accents[accent])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-lg font-semibold text-navy-900">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-700">{description}</p>
      </div>
    </motion.div>
  );
}
