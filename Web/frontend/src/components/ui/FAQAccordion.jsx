// FAQ Accordion — uses native <details>/<summary> for accessibility,
// with a custom chevron animation and premium styling.
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export default function FAQAccordion({ items = [], className = '' }) {
  return (
    <div className={cn('divide-y divide-ink-100 rounded-card border border-ink-100 bg-white shadow-card', className)}>
      {items.map((item, idx) => (
        <details key={idx} className="group px-6 py-5 transition open:bg-ink-50/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold text-navy-900 marker:hidden">
            <span className="text-base sm:text-lg">{item.question}</span>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-180">
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <div className="mt-3 text-base leading-relaxed text-ink-700">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
