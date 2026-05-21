// Lightweight route-suspense fallback — calm, centered, brand-aligned.
// Shown briefly while a lazy-loaded page chunk is being fetched.
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] items-center justify-center px-6"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="relative inline-flex h-12 w-12">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-200 opacity-60" />
          <span className="relative inline-flex h-12 w-12 rounded-full bg-gradient-to-br from-brand-500 to-teal-500" />
        </span>
        <span className="text-sm font-medium text-ink-500">Loading…</span>
      </div>
    </div>
  );
}
