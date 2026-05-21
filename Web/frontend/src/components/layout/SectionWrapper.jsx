// Standard section wrapper — applies vertical rhythm and alternating background tones.
// `tone` controls background (white / muted), `id` allows anchor links.
import { cn } from '../../utils/cn.js';

export default function SectionWrapper({
  id,
  tone = 'white',
  size = 'default',
  className = '',
  children,
}) {
  const toneClass = {
    white: 'bg-white',
    muted: 'bg-ink-50',
    navy: 'bg-navy-900 text-white',
    brand: 'bg-gradient-to-b from-brand-50 to-white',
    teal: 'bg-gradient-to-b from-teal-50 to-white',
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
