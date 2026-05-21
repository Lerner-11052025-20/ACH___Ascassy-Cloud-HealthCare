// Overview view — KPI strip, 7-day sales chart, recent bills.
// The "default" PharmaPOS screen — what owners check first thing in the morning.
import { Pill } from 'lucide-react';
import { cn } from '../../../utils/cn.js';
import MockupShell from './MockupShell.jsx';

const KPIS = [
  { label: "Today's bills", value: '142', tone: 'bg-brand-50 text-brand-700' },
  { label: 'Low stock', value: '6', tone: 'bg-amber-50 text-amber-700' },
  { label: 'Expiring soon', value: '11', tone: 'bg-rose-50 text-rose-700' },
];

const SALES_BARS = [40, 65, 50, 80, 55, 90, 72];

const RECENT_BILLS = [
  { name: 'INV-1042', total: '₹482', note: 'Paracetamol +3' },
  { name: 'INV-1041', total: '₹1,260', note: 'Multivitamin +5' },
  { name: 'INV-1040', total: '₹315', note: 'Cetirizine +2' },
];

export default function OverviewMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="overview" title="Overview" className={className}>
      <div className="flex flex-col gap-3">
        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-2.5">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-ink-100 p-3">
              <div className="text-[10px] uppercase tracking-wider text-ink-500">{kpi.label}</div>
              <div className={cn('mt-1 inline-flex rounded-md px-2 py-0.5 text-base font-bold', kpi.tone)}>
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        {/* Sales chart */}
        <div className="rounded-xl border border-ink-100 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-navy-900">Sales — Last 7 days</span>
            <span className="text-[10px] text-ink-500">Weekly</span>
          </div>
          <div className="flex h-20 items-end gap-1.5">
            {SALES_BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-md bg-gradient-to-t from-brand-500 to-teal-400 opacity-90"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Recent bills */}
        <div className="rounded-xl border border-ink-100 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-navy-900">Recent bills</span>
            <span className="text-[10px] text-ink-500">Today</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {RECENT_BILLS.map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between rounded-md bg-ink-50/60 px-2.5 py-1.5 text-[11px]"
              >
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
    </MockupShell>
  );
}
