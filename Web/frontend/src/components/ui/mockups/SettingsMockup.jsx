// Settings view — Notifications · Security · Data Management blocks.
// Shows the configurable / operations-control face of the product.
import { Bell, ShieldCheck, Database, KeyRound, Lock, Download, Upload, RotateCcw } from 'lucide-react';
import { cn } from '../../../utils/cn.js';
import MockupShell from './MockupShell.jsx';

function Toggle({ on }) {
  return (
    <span
      className={cn(
        'relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition',
        on ? 'bg-amber-400' : 'bg-ink-200',
      )}
    >
      <span
        className={cn(
          'absolute h-3 w-3 rounded-full bg-white shadow-soft transition',
          on ? 'left-3.5' : 'left-0.5',
        )}
      />
    </span>
  );
}

const NOTIFICATIONS = [
  { title: 'Low stock alerts', helper: 'Notify when stock falls below minimum', on: true },
  { title: 'Expiry alerts', helper: 'Notify for medicines expiring soon', on: true },
];

const SECURITY = [
  { icon: KeyRound, title: 'Change password', helper: 'Update your account password' },
  { icon: Lock, title: 'Two-factor authentication', helper: 'Add extra security to your account' },
];

const DATA_ACTIONS = [
  { icon: RotateCcw, title: 'Backup data', tone: 'bg-brand-600 text-white', primary: true },
  { icon: Download, title: 'Export data', tone: 'bg-white text-navy-900 ring-1 ring-ink-200' },
  { icon: Upload, title: 'Import data', tone: 'bg-white text-navy-900 ring-1 ring-ink-200' },
];

export default function SettingsMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="settings" title="Settings" className={className}>
      <div className="flex flex-col gap-3">
        {/* Notifications */}
        <div className="rounded-xl border border-ink-100 p-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
              <Bell className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold text-navy-900">Notifications</span>
          </div>
          <div className="mt-2 divide-y divide-ink-100">
            {NOTIFICATIONS.map((row) => (
              <div key={row.title} className="flex items-center justify-between gap-3 py-1.5 text-[10px]">
                <div className="flex min-w-0 flex-col leading-tight">
                  <span className="font-medium text-navy-900">{row.title}</span>
                  <span className="text-[9px] text-ink-500">{row.helper}</span>
                </div>
                <Toggle on={row.on} />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-ink-100 p-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-700">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold text-navy-900">Security</span>
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {SECURITY.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.title} className="flex items-center gap-2 rounded-md bg-ink-50/60 px-2 py-1.5 text-[10px]">
                  <Icon className="h-3 w-3 text-ink-500" aria-hidden="true" />
                  <div className="flex min-w-0 flex-col leading-tight">
                    <span className="font-medium text-navy-900">{row.title}</span>
                    <span className="text-[9px] text-ink-500">{row.helper}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Management */}
        <div className="rounded-xl border border-ink-100 p-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-navy-900/5 text-navy-900">
              <Database className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold text-navy-900">Data Management</span>
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {DATA_ACTIONS.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className={cn(
                    'flex items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-semibold',
                    a.tone,
                  )}
                >
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {a.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
