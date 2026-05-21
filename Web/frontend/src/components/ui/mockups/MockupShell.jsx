// Shared window-chrome wrapper for every PharmaPOS mockup.
// Provides the macOS-style title bar + a consistent left sidebar so all
// product previews feel like the same app, with only the active view changing.
import {
  TrendingUp,
  Receipt,
  FileText,
  Package,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Users,
  Settings,
} from 'lucide-react';
import { cn } from '../../../utils/cn.js';

// Sidebar nav — mirrors the real PharmaPOS application navigation.
const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'billing', label: 'Billing', icon: Receipt },
  { id: 'rx', label: 'Prescriptions', icon: FileText },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'expiry', label: 'Expiry', icon: AlertTriangle },
  { id: 'ai', label: 'AI Insights', icon: Sparkles },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
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
        <aside className="hidden flex-col gap-0.5 sm:col-span-3 sm:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.id === activeNavId;
            return (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] font-medium transition',
                  active ? 'bg-brand-50 text-brand-700' : 'text-ink-700',
                )}
              >
                <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </div>
            );
          })}
        </aside>

        <div className="sm:col-span-9">{children}</div>
      </div>
    </div>
  );
}
