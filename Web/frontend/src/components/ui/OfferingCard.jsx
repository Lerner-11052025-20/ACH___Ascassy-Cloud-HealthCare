// OfferingCard — represents one layer of the Ascassy ecosystem.
// Slightly larger than FeatureCard with a CTA link.
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils/cn.js';
import { fadeUp } from '../../utils/motion.js';

export default function OfferingCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  to,
  ctaLabel = 'Learn more',
  accent = 'brand',
  className = '',
}) {
  const accents = {
    brand: { chip: 'bg-brand-50 text-brand-700', ring: 'hover:ring-brand-200' },
    teal: { chip: 'bg-teal-50 text-teal-700', ring: 'hover:ring-teal-200' },
    cloud: { chip: 'bg-cloud-300/15 text-cloud-500', ring: 'hover:ring-cloud-300/40' },
    navy: { chip: 'bg-navy-900/5 text-navy-900', ring: 'hover:ring-navy-300' },
  };
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'group relative flex h-full flex-col gap-5 rounded-card bg-white p-7 shadow-card ring-1 ring-ink-100 transition duration-300 hover:-translate-y-1 hover:shadow-lift',
        accents[accent].ring,
        className,
      )}
    >
      <div className="flex items-center justify-between">
        {Icon ? (
          <span className={cn('inline-flex h-12 w-12 items-center justify-center rounded-xl', accents[accent].chip)}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
        {eyebrow ? (
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500">{eyebrow}</span>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-semibold text-navy-900">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-700">{description}</p>
      </div>
      {to ? (
        <Link
          to={to}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition group-hover:gap-2.5"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </motion.div>
  );
}
