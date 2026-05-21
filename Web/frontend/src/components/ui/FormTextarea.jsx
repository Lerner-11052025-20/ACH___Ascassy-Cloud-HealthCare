// Form textarea — theme-aware, consistent with FormInput.
import { cn } from '../../utils/cn.js';

export default function FormTextarea({
  id,
  label,
  required = false,
  rows = 5,
  hint,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
        {required ? <span className="ml-0.5 text-brand-600">*</span> : null}
      </label>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        className={cn(
          'min-h-[120px] w-full rounded-input border bg-surface px-4 py-3 text-base text-fg placeholder:text-fg-subtle resize-y',
          'transition focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600',
          error ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-line-strong',
        )}
        {...props}
      />
      {hint && !error ? <p className="text-xs text-fg-subtle">{hint}</p> : null}
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
