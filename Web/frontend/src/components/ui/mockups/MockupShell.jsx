// Shared window-chrome wrapper for every PharmaPOS mockup.
// Provides the macOS-style title bar + a consistent left sidebar so all
// product previews feel like the same app, with only the active view changing.
import {
  TrendingUp,
  Receipt,
  Package,
  AlertTriangle,
  Sparkles,
  FileText,
} from 'lucide-react';
import { cn } from '../../../utils/cn.js';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'billing', label: 'Billing', icon: Receipt },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'expiry', label: 'Expiry', icon: AlertTriangle },
  { id: 'ai', label: 'AI Insights', icon: Sparkles },
  { id: 'rx', label: 'Prescriptions', icon: FileText },
];

export default function MockupShell({
  activeNavId = 'overview',
  title = 'Dashboard',
  className = '',
  ariaLabel,
  children,
}) {
  return (
    <div
      role="img"
      aria-label={ariaLabel || `Illustrative preview of the Ascassy PharmaPOS ${title} screen`}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white shadow-floating ring-1 ring-ink-100',
        className,
      )}
    >
      {/* Top chrome */}
      <div className="flex items-center justify-between border-b border-ink-100 bg-ink-50/70 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[11px] font-medium text-ink-500">PharmaPOS · {title}</span>
        <span className="h-5 w-5 rounded-md bg-ink-200/80" />
      </div>

      {/* Body */}
      <div className="grid gap-4 p-5 sm:grid-cols-12">
        {/* Sidebar — hidden on small viewports so the main content gets the space */}
        <aside className="hidden flex-col gap-1 sm:col-span-3 sm:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.id === activeNavId;
            return (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium transition',
                  active ? 'bg-brand-50 text-brand-700' : 'text-ink-700',
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {item.label}
              </div>
            );
          })}
        </aside>

        <div className="sm:col-span-9">{children}</div>
      </div>
    </div>
  );
}
