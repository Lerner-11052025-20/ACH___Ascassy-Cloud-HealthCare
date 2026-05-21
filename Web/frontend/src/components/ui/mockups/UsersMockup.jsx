// User Management view — staff cards with avatars + Role Permissions matrix.
// Shows the multi-user, role-based-access face of the product.
import { Crown, Shield, User, UserPlus, Check } from 'lucide-react';
import { cn } from '../../../utils/cn.js';
import MockupShell from './MockupShell.jsx';

const USERS = [
  {
    initials: 'AU',
    name: 'Admin User',
    email: 'admin@pharma',
    role: 'Admin',
    roleIcon: Crown,
    roleTone: 'bg-violet-50 text-violet-700',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    initials: 'PK',
    name: 'Pharmacist Kumar',
    email: 'kumar@pharma',
    role: 'Pharmacist',
    roleIcon: Shield,
    roleTone: 'bg-brand-50 text-brand-700',
    gradient: 'from-brand-500 to-cloud-500',
  },
  {
    initials: 'CP',
    name: 'Cashier Priya',
    email: 'priya@pharma',
    role: 'Cashier',
    roleIcon: User,
    roleTone: 'bg-emerald-50 text-emerald-700',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

// Y = granted, N = not granted. Order matches the column order: Admin · Pharmacist · Cashier.
const PERMISSIONS = [
  { label: 'Billing & Sales', cells: ['Y', 'Y', 'Y'] },
  { label: 'Prescriptions', cells: ['Y', 'Y', 'N'] },
  { label: 'Inventory', cells: ['Y', 'Y', 'N'] },
  { label: 'View Reports', cells: ['Y', 'Y', 'N'] },
  { label: 'User Management', cells: ['Y', 'N', 'N'] },
];

export default function UsersMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="users" title="User Management" className={className}>
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold text-navy-900">User Management</span>
            <span className="text-[10px] text-ink-500">3 active · role-based access</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-brand-600 px-2 py-1 text-[10px] font-semibold text-white">
            <UserPlus className="h-3 w-3" aria-hidden="true" />
            Add user
          </span>
        </div>

        {/* User cards */}
        <div className="grid gap-2 sm:grid-cols-3">
          {USERS.map((u) => {
            const RoleIcon = u.roleIcon;
            return (
              <div key={u.email} className="rounded-xl border border-ink-100 p-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white shadow-soft',
                      u.gradient,
                    )}
                  >
                    {u.initials}
                  </span>
                  <div className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-[10px] font-semibold text-navy-900">{u.name}</span>
                    <span className="truncate text-[9px] text-ink-500">{u.email}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className={cn('inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-semibold', u.roleTone)}>
                    <RoleIcon className="h-2.5 w-2.5" aria-hidden="true" />
                    {u.role}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Permissions matrix */}
        <div className="overflow-hidden rounded-xl border border-ink-100">
          <div className="bg-ink-50/70 px-3 py-2 text-[10px] font-semibold text-navy-900">Role Permissions</div>
          <div className="grid grid-cols-12 gap-2 border-t border-ink-100 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-ink-500">
            <span className="col-span-6">Permission</span>
            <span className="col-span-2 text-center">Admin</span>
            <span className="col-span-2 text-center">Pharmacist</span>
            <span className="col-span-2 text-center">Cashier</span>
          </div>
          <div className="divide-y divide-ink-100">
            {PERMISSIONS.map((p) => (
              <div key={p.label} className="grid grid-cols-12 items-center gap-2 px-3 py-1.5 text-[10px]">
                <span className="col-span-6 font-medium text-navy-900">{p.label}</span>
                {p.cells.map((c, i) => (
                  <span key={i} className="col-span-2 flex items-center justify-center">
                    {c === 'Y' ? (
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <Check className="h-2.5 w-2.5" aria-hidden="true" strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-ink-200" />
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
