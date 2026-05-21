// Button — primary conversion control across the site.
// Variants: primary, secondary, outline, ghost. Sizes: lg, md, sm.
// Renders <Link> when `to` prop is given, <a> when `href` is given, otherwise <button>.
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-button transition ' +
  'will-change-transform select-none whitespace-nowrap ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-600 ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-brand-600 text-white shadow-soft hover:bg-brand-700 hover:shadow-glow-brand active:scale-[0.98]',
  secondary:
    'bg-teal-500 text-white shadow-soft hover:bg-teal-600 active:scale-[0.98]',
  outline:
    'border-2 border-brand-600 text-brand-700 bg-white hover:bg-brand-50 active:scale-[0.98]',
  ghost:
    'text-brand-700 hover:bg-brand-50 active:scale-[0.98]',
  navy:
    'bg-navy-900 text-white shadow-soft hover:bg-navy-800 active:scale-[0.98]',
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
