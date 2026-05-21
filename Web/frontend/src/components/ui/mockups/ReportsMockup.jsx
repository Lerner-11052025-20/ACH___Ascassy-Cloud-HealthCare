// Reports & Analytics view — KPI strip, sales/profit bar chart, sales-by-category donut.
// Shows the analytics face of the product.
import { IndianRupee, TrendingUp, Receipt, BarChart3, Download } from 'lucide-react';
import { cn } from '../../../utils/cn.js';
import MockupShell from './MockupShell.jsx';

const KPIS = [
  { icon: IndianRupee, label: 'Total revenue', value: '₹1,45,000', delta: '+12.5%', tone: 'bg-brand-50 text-brand-700' },
  { icon: TrendingUp, label: 'Profit', value: '₹39,000', delta: '+8.3%', tone: 'bg-emerald-50 text-emerald-700' },
  { icon: Receipt, label: 'Bills', value: '1,247', delta: '+5.2%', tone: 'bg-violet-50 text-violet-700' },
  { icon: BarChart3, label: 'Avg. bill', value: '₹116', delta: '+3.7%', tone: 'bg-amber-50 text-amber-700' },
];

const TREND = [
  { month: 'Jan', sales: 70, profit: 22 },
  { month: 'Feb', sales: 90, profit: 28 },
  { month: 'Mar', sales: 78, profit: 24 },
];

// Donut slice angles (sum to 100) — same as the real Sales-by-Category card.
const CATEGORIES = [
  { label: 'Antibiotics', pct: 35, color: '#2563EB' },
  { label: 'Analgesics', pct: 25, color: '#14B8A6' },
  { label: 'Antidiabetic', pct: 20, color: '#F59E0B' },
  { label: 'Others', pct: 20, color: '#64748B' },
];

function buildDonut(slices) {
  let start = 0;
  const stops = slices
    .map((s) => {
      const end = start + s.pct;
      const stop = `${s.color} ${start}% ${end}%`;
      start = end;
      return stop;
    })
    .join(', ');
  return `conic-gradient(${stops})`;
}

export default function ReportsMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="reports" title="Reports & Analytics" className={className}>
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold text-navy-900">Reports & Analytics</span>
            <span className="text-[10px] text-ink-500">This month · comprehensive view</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white">
            <Download className="h-3 w-3" aria-hidden="true" />
            Export
          </span>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {KPIS.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-xl border border-ink-100 p-2.5">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-ink-500">
                  <span className={cn('inline-flex h-5 w-5 items-center justify-center rounded-md', kpi.tone)}>
                    <Icon className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {kpi.label}
                </div>
                <div className="mt-1 font-display text-sm font-bold text-navy-900">{kpi.value}</div>
                <div className="text-[9px] font-semibold text-emerald-600">{kpi.delta} vs last month</div>
              </div>
            );
          })}
        </div>

        {/* Two-card row: bar chart + donut */}
        <div className="grid gap-2 sm:grid-cols-12">
          {/* Sales & Profit Trend */}
          <div className="rounded-xl border border-ink-100 p-3 sm:col-span-7">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-navy-900">Sales & Profit Trend</span>
              <span className="flex items-center gap-2 text-[9px] text-ink-500">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                  Sales
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  Profit
                </span>
              </span>
            </div>
            <div className="flex h-24 items-end gap-3 px-1">
              {TREND.map((m) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex h-full w-full items-end justify-center gap-1">
                    <div
                      className="w-3 rounded-t-md bg-brand-600"
                      style={{ height: `${m.sales}%` }}
                      title={`Sales ${m.sales}`}
                    />
                    <div
                      className="w-3 rounded-t-md bg-teal-500"
                      style={{ height: `${m.profit}%` }}
                      title={`Profit ${m.profit}`}
                    />
                  </div>
                  <span className="text-[9px] font-medium text-ink-500">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sales by Category — donut */}
          <div className="rounded-xl border border-ink-100 p-3 sm:col-span-5">
            <span className="text-[11px] font-semibold text-navy-900">Sales by Category</span>
            <div className="mt-2 flex items-center gap-3">
              <div className="relative h-20 w-20 shrink-0">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: buildDonut(CATEGORIES) }}
                  aria-hidden="true"
                />
                <div className="absolute inset-2 rounded-full bg-white" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold text-navy-900">100%</span>
                  <span className="text-[8px] text-ink-500">share</span>
                </div>
              </div>
              <ul className="flex flex-1 flex-col gap-1">
                {CATEGORIES.map((c) => (
                  <li key={c.label} className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 text-navy-900">
                      <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: c.color }} />
                      {c.label}
                    </span>
                    <span className="font-semibold text-ink-700">{c.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
