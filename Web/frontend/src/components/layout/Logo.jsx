// Ascassy logo — SVG mark + wordmark. Theme-aware via `text-fg` on the wordmark.
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';

export default function Logo({ variant = 'auto', compact = false, className = '' }) {
  // `auto` uses semantic text-fg so it adapts to the theme; `light` forces white
  // (used inside the always-dark footer when we want a guaranteed-white wordmark).
  const wordmarkColor = variant === 'light' ? 'text-white' : 'text-fg';
  const subColor = variant === 'light' ? 'text-white/60' : 'text-fg-subtle';
  return (
    <Link to="/" aria-label="Ascassy — Home" className={cn('group inline-flex items-center gap-3', className)}>
      <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-soft transition group-hover:shadow-glow-brand">
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
          <span className={cn('text-[10px] font-medium uppercase tracking-[0.18em]', subColor)}>
            Cloud Healthcare
          </span>
        </span>
      ) : null}
    </Link>
  );
}
