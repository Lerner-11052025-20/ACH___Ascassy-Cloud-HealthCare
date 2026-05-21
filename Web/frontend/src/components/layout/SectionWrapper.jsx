// Standard section wrapper — applies vertical rhythm and theme-aware tones.
// `tone` controls background; semantic tokens make every variant theme-aware.
import { cn } from '../../utils/cn.js';

export default function SectionWrapper({
  id,
  tone = 'white',
  size = 'default',
  className = '',
  children,
}) {
  const toneClass = {
    white: 'bg-canvas',
    muted: 'bg-surface-muted',
    navy: 'bg-navy-950 text-white dark:bg-surface-elev',
    brand: 'bg-gradient-to-b from-brand-50/70 via-canvas to-canvas dark:from-brand-500/10 dark:via-canvas dark:to-canvas',
    teal: 'bg-gradient-to-b from-teal-50/70 via-canvas to-canvas dark:from-teal-500/10 dark:via-canvas dark:to-canvas',
  }[tone];
  const sizeClass = {
    default: 'py-16 sm:py-20 lg:py-28',
    compact: 'py-10 sm:py-14 lg:py-20',
    tall: 'py-20 sm:py-28 lg:py-36',
  }[size];
  return (
    <section id={id} className={cn('relative overflow-hidden', toneClass, sizeClass, className)}>
      {children}
    </section>
  );
}
