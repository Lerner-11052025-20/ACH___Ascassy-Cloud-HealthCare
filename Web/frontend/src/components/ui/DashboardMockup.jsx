// DashboardMockup — pure-CSS PharmaPOS dashboard preview, no external image needed.
// Designed to look like a real product screenshot, framed in a soft device shell.
import { Pill, TrendingUp, Package, AlertTriangle, Receipt, Users } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export default function DashboardMockup({ className = '' }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white shadow-floating ring-1 ring-ink-100',
        className,
      )}
      role="img"
      aria-label="Illustrative preview of the Ascassy PharmaPOS dashboard"
    >
      {/* Top window chrome */}
      <div className="flex items-center justify-between border-b border-ink-100 bg-ink-50/70 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[11px] font-medium text-ink-500">PharmaPOS · Dashboard</span>
        <span className="h-5 w-5 rounded-md bg-ink-200/80" />
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-12">
        {/* Sidebar */}
        <aside className="hidden flex-col gap-1 sm:col-span-3 sm:flex">
          {[
            { icon: TrendingUp, label: 'Overview', active: true },
            { icon: Receipt, label: 'Billing' },
            { icon: Package, label: 'Inventory' },
            { icon: AlertTriangle, label: 'Expiry' },
            { icon: Users, label: 'Customers' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-medium',
                  item.active ? 'bg-brand-50 text-brand-700' : 'text-ink-700',
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {item.label}
              </div>
            );
          })}
        </aside>

        {/* Main panel */}
        <div className="flex flex-col gap-3 sm:col-span-9">
          {/* Top KPI strip */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Today's bills", value: '142', tone: 'bg-brand-50 text-brand-700' },
              { label: 'Low stock', value: '6', tone: 'bg-amber-50 text-amber-700' },
              { label: 'Expiring soon', value: '11', tone: 'bg-rose-50 text-rose-700' },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-ink-100 p-3">
                <div className="text-[10px] uppercase tracking-wider text-ink-500">{kpi.label}</div>
                <div className={cn('mt-1 inline-flex rounded-md px-2 py-0.5 text-base font-bold', kpi.tone)}>
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div className="rounded-xl border border-ink-100 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-navy-900">Sales — Last 7 days</span>
              <span className="text-[10px] text-ink-500">Weekly</span>
            </div>
            <div className="flex h-20 items-end gap-1.5">
              {[40, 65, 50, 80, 55, 90, 72].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-md bg-gradient-to-t from-brand-500 to-teal-400 opacity-90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl border border-ink-100 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-navy-900">Recent bills</span>
              <span className="text-[10px] text-ink-500">Today</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { name: 'INV-1042', total: '₹482', note: 'Paracetamol +3' },
                { name: 'INV-1041', total: '₹1,260', note: 'Multivitamin +5' },
                { name: 'INV-1040', total: '₹315', note: 'Cetirizine +2' },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between rounded-md bg-ink-50/60 px-2.5 py-1.5 text-[11px]">
                  <div className="flex items-center gap-2">
                    <Pill className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                    <span className="font-medium text-navy-900">{row.name}</span>
                    <span className="text-ink-500">{row.note}</span>
                  </div>
                  <span className="font-semibold text-navy-900">{row.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
