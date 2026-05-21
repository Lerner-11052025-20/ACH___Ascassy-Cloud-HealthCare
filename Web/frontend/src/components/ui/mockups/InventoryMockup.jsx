// Inventory Management view — theme-aware stock + AI purchase rec + product list.
import { Package, Search, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../../utils/cn.js';
import MockupShell from './MockupShell.jsx';

const KPIS = [
  { label: 'Total items',     value: '128',     tone: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300' },
  { label: 'Inventory value', value: '₹91,981', tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' },
  { label: 'Low stock',       value: '3',       tone: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300' },
  { label: 'Out of stock',    value: '0',       tone: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300' },
];

const CATEGORIES = ['All', 'Analgesic', 'Antibiotic', 'Antidiabetic', 'Antihistamine'];

const ROWS = [
  { name: 'Paracetamol 650mg',  batch: 'PCM2024A', stock: 500, min: 100, status: 'In Stock',  tone: 'emerald' },
  { name: 'Azithromycin 500mg', batch: 'AZI2024B', stock: 45,  min: 50,  status: 'Low Stock', tone: 'amber' },
  { name: 'Metformin 500mg',    batch: 'MET2024C', stock: 250, min: 80,  status: 'In Stock',  tone: 'emerald' },
];

const STATUS_TONES = {
  emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  amber:   'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  rose:    'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
};

const STATUS_ICONS = {
  emerald: TrendingUp,
  amber: TrendingDown,
  rose: TrendingDown,
};

export default function InventoryMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="inventory" title="Inventory Management" className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              <Package className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold text-fg">Inventory Management</span>
              <span className="text-[10px] text-fg-subtle">AI-powered stock intelligence</span>
            </div>
          </div>
          <span className="rounded-md bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white">
            + Add Medicine
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-line p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-fg-subtle">{kpi.label}</div>
              <div className={`mt-1 inline-flex rounded-md px-1.5 py-0.5 text-sm font-bold nums-tabular ${kpi.tone}`}>
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-7 flex-1 min-w-[120px] items-center gap-1.5 rounded-md border border-line-strong bg-surface px-2 text-[10px] text-fg-subtle">
            <Search className="h-3 w-3" aria-hidden="true" />
            Search medicines…
          </div>
          {CATEGORIES.map((cat, i) => (
            <span
              key={cat}
              className={cn(
                'rounded-md px-2 py-1 text-[9px] font-medium',
                i === 0 ? 'bg-brand-600 text-white' : 'bg-surface-muted text-fg-muted',
              )}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="rounded-xl border border-brand-100 bg-gradient-to-r from-brand-50 via-cloud-300/10 to-teal-50 p-3 dark:border-brand-500/20 dark:from-brand-500/10 dark:via-cloud-400/8 dark:to-teal-500/10">
          <div className="flex items-start gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-teal-500 text-white">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-fg">AI Stock Recommendation</div>
              <p className="mt-0.5 text-[10px] leading-snug text-fg-muted">
                Order 50 units of Azithromycin and 30 units of Amoxicillin — expected demand spike detected.
              </p>
            </div>
            <span className="rounded-md bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white">
              Purchase order
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <div className="grid grid-cols-12 gap-2 bg-surface-muted/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-fg-subtle">
            <span className="col-span-5">Medicine</span>
            <span className="col-span-3">Batch</span>
            <span className="col-span-2 text-right">Stock</span>
            <span className="col-span-2 text-right">Status</span>
          </div>
          <div className="divide-y divide-line">
            {ROWS.map((row) => {
              const StatusIcon = STATUS_ICONS[row.tone];
              return (
                <div key={row.batch} className="grid grid-cols-12 items-center gap-2 px-3 py-2 text-[10px]">
                  <div className="col-span-5 flex flex-col leading-tight">
                    <span className="font-semibold text-fg">{row.name}</span>
                    <span className="text-[9px] text-fg-subtle">Min: {row.min}</span>
                  </div>
                  <span className="col-span-3 text-fg-muted nums-tabular">{row.batch}</span>
                  <span className="col-span-2 text-right font-medium text-fg nums-tabular">{row.stock}</span>
                  <span className="col-span-2 flex items-center justify-end">
                    <span className={cn('inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-semibold', STATUS_TONES[row.tone])}>
                      <StatusIcon className="h-2.5 w-2.5" aria-hidden="true" />
                      {row.status}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
