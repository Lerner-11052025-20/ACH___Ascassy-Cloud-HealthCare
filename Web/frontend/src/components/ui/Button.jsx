// Button — primary conversion control across the site. Theme-aware variants.
// Variants: primary · secondary · outline · ghost · navy.
// Sizes: lg · md · sm. Renders <Link> (`to`), <a> (`href`), or <button>.
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-button transition ' +
  'will-change-transform select-none whitespace-nowrap ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-600 ' +
  'focus-visible:ring-offset-canvas ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-brand-600 text-white shadow-soft hover:bg-brand-700 hover:shadow-glow-brand active:scale-[0.98]',
  secondary:
    'bg-teal-500 text-white shadow-soft hover:bg-teal-600 hover:shadow-glow-teal active:scale-[0.98]',
  outline:
    'border-2 border-brand-600 bg-surface text-brand-700 hover:bg-brand-50 active:scale-[0.98] ' +
    'dark:text-brand-300 dark:hover:bg-brand-500/10',
  ghost:
    'text-brand-700 hover:bg-brand-50 active:scale-[0.98] ' +
    'dark:text-brand-300 dark:hover:bg-brand-500/10',
  navy:
    'bg-navy-900 text-white shadow-soft hover:bg-navy-800 active:scale-[0.98] dark:bg-white dark:text-navy-900 dark:hover:bg-white/90',
};

const sizes = {
  lg: 'h-14 px-7 text-base',
  md: 'h-12 px-6 text-base',
  sm: 'h-10 px-4 text-sm',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  className = '',
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {IconLeft ? <IconLeft className="h-4 w-4" aria-hidden="true" /> : null}
      <span>{children}</span>
      {IconRight ? <IconRight className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
