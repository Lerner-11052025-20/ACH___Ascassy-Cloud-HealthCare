// TrustCard — surfaces a verifiable trust signal. Theme-aware compact pill card.
import { cn } from '../../utils/cn.js';

export default function TrustCard({ icon: Icon, label, helper, className = '' }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-pill bg-surface px-4 py-3 shadow-soft ring-1 ring-line',
        className,
      )}
    >
      {Icon ? (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      ) : null}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-fg">{label}</span>
        {helper ? <span className="text-xs text-fg-subtle">{helper}</span> : null}
      </div>
    </div>
  );
}
