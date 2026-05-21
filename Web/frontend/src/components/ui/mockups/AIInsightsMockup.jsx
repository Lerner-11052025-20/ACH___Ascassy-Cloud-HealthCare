// AI Insights view — recommendation cards + confidence bars + actions. Theme-aware.
import { Sparkles, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import MockupShell from './MockupShell.jsx';

const STATS = [
  { label: 'Active',         value: '4',   tone: 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300' },
  { label: 'Actionable',     value: '4',   tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' },
  { label: 'High Impact',    value: '2',   tone: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300' },
  { label: 'Avg Confidence', value: '85%', tone: 'bg-cloud-300/15 text-cloud-500 dark:bg-cloud-400/15 dark:text-cloud-300' },
];

const RECOMMENDATIONS = [
  'Order additional 200 units of Paracetamol 650mg',
  'Ensure adequate stock of related medicines',
  'Consider promotional pricing for the next 2 weeks',
];

export default function AIInsightsMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="ai" title="AI Insights" className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 text-white">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold text-fg">AI Insights</span>
            <span className="text-[10px] text-fg-subtle">Intelligent recommendations</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-line p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-fg-subtle">{s.label}</div>
              <div className={`mt-1 inline-flex rounded-md px-1.5 py-0.5 text-sm font-bold nums-tabular ${s.tone}`}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50/60 via-surface to-cloud-300/10 p-3 dark:border-brand-500/20 dark:from-brand-500/10 dark:via-surface dark:to-cloud-400/10">
          <div className="flex items-start gap-2">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface shadow-soft ring-1 ring-line text-brand-600">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-fg">
                  Increased Demand for Paracetamol Expected
                </span>
                <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                  High Impact
                </span>
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                  Actionable
                </span>
              </div>
              <p className="mt-1 text-[10px] leading-snug text-fg-muted">
                Based on historical trends, demand is projected to rise ~35% over the next 2 weeks.
              </p>

              <div className="mt-2">
                <div className="flex items-center justify-between text-[9px] font-medium text-fg-subtle">
                  <span className="inline-flex items-center gap-1 text-brand-700 dark:text-brand-300">
                    <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                    AI Confidence
                  </span>
                  <span className="nums-tabular">87%</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 via-cloud-500 to-teal-500"
                    style={{ width: '87%' }}
                  />
                </div>
              </div>

              <div className="mt-2.5 flex flex-col gap-1">
                {RECOMMENDATIONS.map((rec) => (
                  <div key={rec} className="flex items-start gap-1.5 text-[10px] text-fg">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" aria-hidden="true" />
                    {rec}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-brand-600 to-teal-500 px-2 py-1 text-[10px] font-semibold text-white shadow-soft">
                  <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                  Take Action
                </span>
                <span className="rounded-md border border-line-strong px-2 py-1 text-[10px] font-medium text-fg">
                  View Details
                </span>
                <span className="rounded-md px-2 py-1 text-[10px] font-medium text-fg-subtle">Dismiss</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
