// FAQ Accordion — native <details>/<summary>, theme-aware styling.
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export default function FAQAccordion({ items = [], className = '' }) {
  return (
    <div className={cn('divide-y divide-line rounded-card border border-line bg-surface shadow-card', className)}>
      {items.map((item, idx) => (
        <details key={idx} className="group px-6 py-5 transition open:bg-surface-muted/60">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold text-fg marker:hidden">
            <span className="text-base sm:text-lg">{item.question}</span>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-180 dark:bg-brand-500/10 dark:text-brand-300">
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <div className="mt-3 text-base leading-relaxed text-fg-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
