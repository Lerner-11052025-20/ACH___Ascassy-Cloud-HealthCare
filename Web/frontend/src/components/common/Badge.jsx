// Eyebrow / chip badge — used above headings to anchor section context.
import { cn } from '../../utils/cn.js';

export default function Badge({ children, tone = 'brand', icon: Icon, className = '' }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700 ring-brand-100',
    teal: 'bg-teal-50 text-teal-700 ring-teal-100',
    navy: 'bg-navy-900/5 text-navy-900 ring-navy-900/10',
    cloud: 'bg-cloud-300/15 text-cloud-500 ring-cloud-300/30',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ring-1',
        tones[tone],
        className,
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
