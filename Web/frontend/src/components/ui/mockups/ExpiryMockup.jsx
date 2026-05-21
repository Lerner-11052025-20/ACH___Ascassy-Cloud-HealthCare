// Expiry Intelligence view — proactive expiry management.
// Surfaces "money walking out the door" pain in one screen.
import { AlertTriangle, CalendarClock, IndianRupee } from 'lucide-react';
import MockupShell from './MockupShell.jsx';

const KPIS = [
  { label: 'Expired', value: '8', tone: 'bg-rose-50 text-rose-700', icon: AlertTriangle },
  { label: '≤ 30 days', value: '12', tone: 'bg-amber-50 text-amber-700', icon: CalendarClock },
  { label: '≤ 90 days', value: '27', tone: 'bg-yellow-50 text-yellow-700', icon: CalendarClock },
  { label: 'Value at risk', value: '₹91,981', tone: 'bg-brand-50 text-brand-700', icon: IndianRupee },
];

const EXPIRED = [
  { name: 'Paracetamol 650mg', batch: 'PCM2024A', date: '2025-12-31', stock: 500, loss: '₹22,500' },
  { name: 'Azithromycin 500mg', batch: 'AZI2024B', date: '2024-06-30', stock: 45, loss: '₹7,425' },
  { name: 'Metformin 500mg', batch: 'MET2024C', date: '2026-03-15', stock: 250, loss: '₹27,000' },
];

export default function ExpiryMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="expiry" title="Expiry Intelligence" className={className}>
      <div className="flex flex-col gap-3">
        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {KPIS.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-xl border border-ink-100 p-2.5">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-ink-500">
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {kpi.label}
                </div>
                <div className={`mt-1 inline-flex rounded-md px-1.5 py-0.5 text-sm font-bold ${kpi.tone}`}>
                  {kpi.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Immediate Action banner */}
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3">
          <div className="flex items-start gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-600 text-white">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-rose-800">Immediate action required</div>
              <p className="mt-0.5 text-[10px] leading-snug text-rose-700">
                8 medicines have expired. Remove from inventory and document disposal for compliance.
              </p>
            </div>
            <span className="rounded-md bg-rose-600 px-2 py-1 text-[10px] font-semibold text-white">
              Disposal report
            </span>
          </div>
        </div>

        {/* Expired list */}
        <div className="overflow-hidden rounded-xl border border-ink-100">
          <div className="grid grid-cols-12 gap-2 bg-ink-50/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-ink-500">
            <span className="col-span-5">Medicine</span>
            <span className="col-span-3">Batch</span>
            <span className="col-span-2 text-right">Stock</span>
            <span className="col-span-2 text-right">Loss</span>
          </div>
          <div className="divide-y divide-ink-100">
            {EXPIRED.map((row) => (
              <div
                key={row.batch}
                className="grid grid-cols-12 items-center gap-2 px-3 py-2 text-[10px]"
              >
                <div className="col-span-5 flex flex-col leading-tight">
                  <span className="font-semibold text-navy-900">{row.name}</span>
                  <span className="text-[9px] text-ink-500">Expired {row.date}</span>
                </div>
                <span className="col-span-3 text-ink-700">{row.batch}</span>
                <span className="col-span-2 text-right font-medium text-navy-900">{row.stock}</span>
                <span className="col-span-2 text-right font-semibold text-rose-700">{row.loss}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
