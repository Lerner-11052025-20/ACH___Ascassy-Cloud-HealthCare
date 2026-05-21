// Soft atmospheric gradient blob — used behind heros and key sections.
// Theme-aware via opacity tuning. Purely decorative; aria-hidden so screen readers skip it.
import { cn } from '../../utils/cn.js';

export default function GradientBlob({
  className = '',
  from = 'from-brand-200',
  via = 'via-cloud-300/40',
  to = 'to-teal-200/40',
  size = 'h-[520px] w-[520px]',
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -z-10 rounded-full bg-gradient-to-br blur-3xl opacity-60 dark:opacity-40',
        from,
        via,
        to,
        size,
        className,
      )}
    />
  );
}
