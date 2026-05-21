// GridPattern — subtle theme-aware grid (or dot) background pattern,
// with optional radial fade-out so it doesn't compete with foreground content.
import { cn } from '../../utils/cn.js';

export default function GridPattern({
  variant = 'grid',
  fade = true,
  className = '',
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10',
        variant === 'dots' ? 'bg-pattern-dot' : 'bg-pattern-grid',
        fade && 'mask-fade-edges',
        className,
      )}
    />
  );
}
