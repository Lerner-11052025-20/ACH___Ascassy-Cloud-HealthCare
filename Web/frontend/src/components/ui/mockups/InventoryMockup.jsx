// Inventory Management view — stock + AI purchase recommendation + product list.
import { Package, Search, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../../utils/cn.js';
import MockupShell from './MockupShell.jsx';

const KPIS = [
  { label: 'Total items', value: '128', tone: 'bg-brand-50 text-brand-700' },
  { label: 'Inventory value', value: '₹91,981', tone: 'bg-emerald-50 text-emerald-700' },
  { label: 'Low stock', value: '3', tone: 'bg-amber-50 text-amber-700' },
  { label: 'Out of stock', value: '0', tone: 'bg-rose-50 text-rose-700' },
];

const CATEGORIES = ['All', 'Analgesic', 'Antibiotic', 'Antidiabetic', 'Antihistamine'];

const ROWS = [
  { name: 'Paracetamol 650mg', batch: 'PCM2024A', stock: 500, min: 100, status: 'In Stock', tone: 'emerald' },
  { name: 'Azithromycin 500mg', batch: 'AZI2024B', stock: 45, min: 50, status: 'Low Stock', tone: 'amber' },
  { name: 'Metformin 500mg', batch: 'MET2024C', stock: 250, min: 80, status: 'In Stock', tone: 'emerald' },
];

const STATUS_TONES = {
  emerald: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  rose: 'bg-rose-50 text-rose-700',
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
        {/* Header strip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <Package className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold text-navy-900">Inventory Management</span>
              <span className="text-[10px] text-ink-500">AI-powered stock intelligence</span>
            </div>
          </div>
          <span className="rounded-md bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white">
            + Add Medicine
          </span>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-ink-100 p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-ink-500">{kpi.label}</div>
              <div className={`mt-1 inline-flex rounded-md px-1.5 py-0.5 text-sm font-bold ${kpi.tone}`}>
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        {/* Search + category chips */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-7 flex-1 min-w-[120px] items-center gap-1.5 rounded-md border border-ink-200 bg-white px-2 text-[10px] text-ink-500">
            <Search className="h-3 w-3" aria-hidden="true" />
            Search medicines…
          </div>
          {CATEGORIES.map((cat, i) => (
            <span
              key={cat}
              className={cn(
                'rounded-md px-2 py-1 text-[9px] font-medium',
                i === 0 ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-700',
              )}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* AI Stock Recommendation banner */}
        <div className="rounded-xl border border-brand-100 bg-gradient-to-r from-brand-50 via-cloud-300/10 to-teal-50 p-3">
          <div className="flex items-start gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-teal-500 text-white">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-navy-900">AI Stock Recommendation</div>
              <p className="mt-0.5 text-[10px] leading-snug text-ink-700">
                Order 50 units of Azithromycin and 30 units of Amoxicillin — expected demand spike detected.
              </p>
            </div>
            <span className="rounded-md bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white">
              Purchase order
            </span>
          </div>
        </div>

        {/* Mini medicine list */}
        <div className="overflow-hidden rounded-xl border border-ink-100">
          <div className="grid grid-cols-12 gap-2 bg-ink-50/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-ink-500">
            <span className="col-span-5">Medicine</span>
            <span className="col-span-3">Batch</span>
            <span className="col-span-2 text-right">Stock</span>
            <span className="col-span-2 text-right">Status</span>
          </div>
          <div className="divide-y divide-ink-100">
            {ROWS.map((row) => {
              const StatusIcon = STATUS_ICONS[row.tone];
              return (
                <div key={row.batch} className="grid grid-cols-12 items-center gap-2 px-3 py-2 text-[10px]">
                  <div className="col-span-5 flex flex-col leading-tight">
                    <span className="font-semibold text-navy-900">{row.name}</span>
                    <span className="text-[9px] text-ink-500">Min: {row.min}</span>
                  </div>
                  <span className="col-span-3 text-ink-700">{row.batch}</span>
                  <span className="col-span-2 text-right font-medium text-navy-900">{row.stock}</span>
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
