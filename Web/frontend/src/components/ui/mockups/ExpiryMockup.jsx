// Expiry Intelligence view — theme-aware proactive expiry management screen.
import { AlertTriangle, CalendarClock, IndianRupee } from 'lucide-react';
import MockupShell from './MockupShell.jsx';

const KPIS = [
  { label: 'Expired',       value: '8',       tone: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',     icon: AlertTriangle },
  { label: '≤ 30 days',     value: '12',      tone: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300', icon: CalendarClock },
  { label: '≤ 90 days',     value: '27',      tone: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300', icon: CalendarClock },
  { label: 'Value at risk', value: '₹91,981', tone: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300', icon: IndianRupee },
];

const EXPIRED = [
  { name: 'Paracetamol 650mg',  batch: 'PCM2024A', date: '2025-12-31', stock: 500, loss: '₹22,500' },
  { name: 'Azithromycin 500mg', batch: 'AZI2024B', date: '2024-06-30', stock: 45,  loss: '₹7,425' },
  { name: 'Metformin 500mg',    batch: 'MET2024C', date: '2026-03-15', stock: 250, loss: '₹27,000' },
];

export default function ExpiryMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="expiry" title="Expiry Intelligence" className={className}>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {KPIS.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-xl border border-line p-2.5">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-fg-subtle">
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {kpi.label}
                </div>
                <div className={`mt-1 inline-flex rounded-md px-1.5 py-0.5 text-sm font-bold nums-tabular ${kpi.tone}`}>
                  {kpi.value}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 dark:border-rose-500/30 dark:bg-rose-500/10">
          <div className="flex items-start gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-600 text-white">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-rose-800 dark:text-rose-200">Immediate action required</div>
              <p className="mt-0.5 text-[10px] leading-snug text-rose-700 dark:text-rose-300">
                8 medicines have expired. Remove from inventory and document disposal for compliance.
              </p>
            </div>
            <span className="rounded-md bg-rose-600 px-2 py-1 text-[10px] font-semibold text-white">
              Disposal report
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <div className="grid grid-cols-12 gap-2 bg-surface-muted/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-fg-subtle">
            <span className="col-span-5">Medicine</span>
            <span className="col-span-3">Batch</span>
            <span className="col-span-2 text-right">Stock</span>
            <span className="col-span-2 text-right">Loss</span>
          </div>
          <div className="divide-y divide-line">
            {EXPIRED.map((row) => (
              <div
                key={row.batch}
                className="grid grid-cols-12 items-center gap-2 px-3 py-2 text-[10px]"
              >
                <div className="col-span-5 flex flex-col leading-tight">
                  <span className="font-semibold text-fg">{row.name}</span>
                  <span className="text-[9px] text-fg-subtle">Expired {row.date}</span>
                </div>
                <span className="col-span-3 text-fg-muted nums-tabular">{row.batch}</span>
                <span className="col-span-2 text-right font-medium text-fg nums-tabular">{row.stock}</span>
                <span className="col-span-2 text-right font-semibold text-rose-600 nums-tabular dark:text-rose-400">{row.loss}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
