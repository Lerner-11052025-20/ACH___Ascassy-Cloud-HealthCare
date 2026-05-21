// Generic card primitive — soft elevation + subtle border, premium SaaS feel.
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
        'rounded-card bg-white shadow-card ring-1 ring-ink-100',
        padded && 'p-6 sm:p-8',
        hover && 'transition duration-300 hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
      {...props}
    >
      {children}
    </As>
  );
}
