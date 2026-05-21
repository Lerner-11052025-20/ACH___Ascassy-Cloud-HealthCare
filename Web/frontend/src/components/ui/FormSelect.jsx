// Form select — native select styled to match input + textarea.
import { cn } from '../../utils/cn.js';

export default function FormSelect({
  id,
  label,
  required = false,
  options = [],
  hint,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-navy-800">
        {label}
        {required ? <span className="ml-0.5 text-brand-600">*</span> : null}
      </label>
      <select
        id={id}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        className={cn(
          'h-12 w-full rounded-input border bg-white px-4 text-base text-navy-900',
          'transition focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600',
          error ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-ink-200',
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && !error ? <p className="text-xs text-ink-500">{hint}</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
