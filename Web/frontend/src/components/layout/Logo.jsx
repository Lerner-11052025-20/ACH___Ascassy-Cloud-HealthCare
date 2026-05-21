// Ascassy logo — SVG mark + wordmark. Inline so it inherits text color (variant: light/dark).
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';

export default function Logo({ variant = 'dark', compact = false, className = '' }) {
  const wordmarkColor = variant === 'light' ? 'text-white' : 'text-navy-900';
  return (
    <Link to="/" aria-label="Ascassy — Home" className={cn('group inline-flex items-center gap-3', className)}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-soft transition group-hover:shadow-lift">
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#logoGrad)" />
          <path
            d="M22 40 L22 24 L32 24 C37 24 40 27 40 31 C40 35 37 38 32 38 L26 38 L26 40 Z M26 28 L26 34 L32 34 C34 34 36 33 36 31 C36 29 34 28 32 28 Z"
            fill="#FFFFFF"
          />
          <circle cx="44" cy="42" r="3" fill="#67E8F9" />
        </svg>
      </span>
      {!compact ? (
        <span className={cn('flex flex-col leading-none', wordmarkColor)}>
          <span className="font-display text-lg font-bold tracking-tight">Ascassy</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-500">
            Cloud Healthcare
          </span>
        </span>
      ) : null}
    </Link>
  );
}
