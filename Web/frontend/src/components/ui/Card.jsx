// Generic card primitive — theme-aware surface with soft elevation + subtle border.
import { cn } from '../../utils/cn.js';

export default function Card({
  as: As = 'div',
  className = '',
  hover = false,
  padded = true,
  children,
  ...props
}) {
  return (
    <As
      className={cn(
        'rounded-card bg-surface shadow-card ring-1 ring-line',
        padded && 'p-6 sm:p-8',
        hover && 'transition duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-brand-500/30',
        className,
      )}
      {...props}
    >
      {children}
    </As>
  );
}
