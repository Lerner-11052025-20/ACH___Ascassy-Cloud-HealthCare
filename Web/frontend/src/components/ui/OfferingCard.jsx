// OfferingCard — represents one layer of the Ascassy ecosystem. Theme-aware.
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
    brand: { chip: 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300', ring: 'hover:ring-brand-500/40' },
    teal:  { chip: 'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300',     ring: 'hover:ring-teal-500/40' },
    cloud: { chip: 'bg-cloud-300/15 text-cloud-500 dark:bg-cloud-400/10 dark:text-cloud-300', ring: 'hover:ring-cloud-400/40' },
    navy:  { chip: 'bg-navy-900/5 text-navy-900 dark:bg-white/5 dark:text-white',          ring: 'hover:ring-white/30' },
  };
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'group relative flex h-full flex-col gap-5 rounded-card bg-surface p-7 shadow-card ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-lift',
        accents[accent].ring,
        className,
      )}
    >
      <div className="flex items-center justify-between">
        {Icon ? (
          <span className={cn('inline-flex h-12 w-12 items-center justify-center rounded-xl transition group-hover:scale-105', accents[accent].chip)}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
        {eyebrow ? (
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-subtle">{eyebrow}</span>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-semibold text-fg">{title}</h3>
        <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
      </div>
      {to ? (
        <Link
          to={to}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition group-hover:gap-2.5 dark:text-brand-300"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </motion.div>
  );
}
