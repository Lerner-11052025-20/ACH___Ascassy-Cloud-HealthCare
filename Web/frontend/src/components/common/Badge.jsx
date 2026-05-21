// Eyebrow / chip badge — theme-aware tones above headings.
import { cn } from '../../utils/cn.js';

export default function Badge({ children, tone = 'brand', icon: Icon, className = '' }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/20',
    teal:  'bg-teal-50 text-teal-700 ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/20',
    navy:  'bg-navy-900/5 text-navy-900 ring-navy-900/10 dark:bg-white/5 dark:text-white dark:ring-white/10',
    cloud: 'bg-cloud-300/15 text-cloud-500 ring-cloud-300/30 dark:bg-cloud-400/10 dark:text-cloud-300 dark:ring-cloud-400/20',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1 backdrop-blur',
        tones[tone],
        className,
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
