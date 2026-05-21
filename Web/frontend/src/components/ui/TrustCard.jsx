// TrustCard — surfaces a verifiable trust signal (only used when content is real).
// Compact, calm; designed to never look like an inflated metric.
import { cn } from '../../utils/cn.js';

export default function TrustCard({ icon: Icon, label, helper, className = '' }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-pill bg-white px-4 py-3 shadow-soft ring-1 ring-ink-100',
        className,
      )}
    >
      {Icon ? (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      ) : null}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-navy-900">{label}</span>
        {helper ? <span className="text-xs text-ink-500">{helper}</span> : null}
      </div>
    </div>
  );
}
