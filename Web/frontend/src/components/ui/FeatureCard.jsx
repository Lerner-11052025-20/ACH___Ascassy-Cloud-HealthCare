// FeatureCard — surfaces a single product feature. Theme-aware lift + glow on hover.
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.js';
import { fadeUp } from '../../utils/motion.js';

export default function FeatureCard({ icon: Icon, title, description, accent = 'brand', className = '' }) {
  const accents = {
    brand: 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300',
    teal:  'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300',
    cloud: 'bg-cloud-300/15 text-cloud-500 dark:bg-cloud-400/10 dark:text-cloud-300',
    navy:  'bg-navy-900/5 text-navy-900 dark:bg-white/5 dark:text-white',
  };
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'group relative flex flex-col gap-4 rounded-card bg-surface p-6 shadow-card ring-1 ring-line overflow-hidden',
        'transition duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-brand-500/30',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {Icon ? (
        <span className={cn('inline-flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-105', accents[accent])}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-lg font-semibold text-fg">{title}</h3>
        <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
      </div>
    </motion.div>
  );
}
