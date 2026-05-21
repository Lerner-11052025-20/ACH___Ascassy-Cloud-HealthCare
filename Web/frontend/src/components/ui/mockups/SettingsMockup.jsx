// Settings view — Notifications · Security · Data Management blocks. Theme-aware.
import { Bell, ShieldCheck, Database, KeyRound, Lock, Download, Upload, RotateCcw } from 'lucide-react';
import { cn } from '../../../utils/cn.js';
import MockupShell from './MockupShell.jsx';

function Toggle({ on }) {
  return (
    <span
      className={cn(
        'relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition',
        on ? 'bg-amber-400' : 'bg-line-strong',
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
  { title: 'Expiry alerts',    helper: 'Notify for medicines expiring soon',    on: true },
];

const SECURITY = [
  { icon: KeyRound, title: 'Change password',           helper: 'Update your account password' },
  { icon: Lock,     title: 'Two-factor authentication', helper: 'Add extra security to your account' },
];

const DATA_ACTIONS = [
  { icon: RotateCcw, title: 'Backup data',  tone: 'bg-brand-600 text-white' },
  { icon: Download,  title: 'Export data',  tone: 'bg-surface text-fg ring-1 ring-line-strong' },
  { icon: Upload,    title: 'Import data',  tone: 'bg-surface text-fg ring-1 ring-line-strong' },
];

export default function SettingsMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="settings" title="Settings" className={className}>
      <div className="flex flex-col gap-3">
        <div className="rounded-xl border border-line p-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
              <Bell className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold text-fg">Notifications</span>
          </div>
          <div className="mt-2 divide-y divide-line">
            {NOTIFICATIONS.map((row) => (
              <div key={row.title} className="flex items-center justify-between gap-3 py-1.5 text-[10px]">
                <div className="flex min-w-0 flex-col leading-tight">
                  <span className="font-medium text-fg">{row.title}</span>
                  <span className="text-[9px] text-fg-subtle">{row.helper}</span>
                </div>
                <Toggle on={row.on} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line p-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold text-fg">Security</span>
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {SECURITY.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.title} className="flex items-center gap-2 rounded-md bg-surface-muted/60 px-2 py-1.5 text-[10px]">
                  <Icon className="h-3 w-3 text-fg-subtle" aria-hidden="true" />
                  <div className="flex min-w-0 flex-col leading-tight">
                    <span className="font-medium text-fg">{row.title}</span>
                    <span className="text-[9px] text-fg-subtle">{row.helper}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-line p-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-navy-900/5 text-fg dark:bg-white/5">
              <Database className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold text-fg">Data Management</span>
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
