// Billing view — quick bill cart, total, payment action. Theme-aware.
import { Search, Pill, Trash2, CreditCard } from 'lucide-react';
import MockupShell from './MockupShell.jsx';

const CART = [
  { name: 'Paracetamol 650mg', qty: 2, price: 90 },
  { name: 'Azithromycin 500mg', qty: 1, price: 165 },
  { name: 'Cetirizine 10mg', qty: 3, price: 87 },
];

const SUBTOTAL = CART.reduce((s, i) => s + i.price * i.qty, 0);
const GST = Math.round(SUBTOTAL * 0.12);
const TOTAL = SUBTOTAL + GST;

export default function BillingMockup({ className = '' }) {
  return (
    <MockupShell activeNavId="billing" title="New Bill · INV-1043" className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex h-8 items-center gap-1.5 rounded-md border border-line-strong bg-surface px-2 text-[10px] text-fg-subtle">
          <Search className="h-3 w-3" aria-hidden="true" />
          Add medicine by name, brand, or barcode…
        </div>

        <div className="overflow-hidden rounded-xl border border-line">
          <div className="grid grid-cols-12 gap-2 bg-surface-muted/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-fg-subtle">
            <span className="col-span-6">Medicine</span>
            <span className="col-span-2 text-center">Qty</span>
            <span className="col-span-3 text-right">Price</span>
            <span className="col-span-1" />
          </div>
          <div className="divide-y divide-line">
            {CART.map((line) => (
              <div key={line.name} className="grid grid-cols-12 items-center gap-2 px-3 py-2 text-[10px]">
                <div className="col-span-6 flex items-center gap-2">
                  <Pill className="h-3 w-3 text-brand-600" aria-hidden="true" />
                  <span className="font-semibold text-fg">{line.name}</span>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-line-strong text-[9px] text-fg-muted">−</span>
                  <span className="font-semibold text-fg nums-tabular">{line.qty}</span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-line-strong text-[9px] text-fg-muted">+</span>
                </div>
                <span className="col-span-3 text-right font-semibold text-fg nums-tabular">
                  ₹{line.price * line.qty}
                </span>
                <span className="col-span-1 flex justify-end text-fg-subtle">
                  <Trash2 className="h-3 w-3" aria-hidden="true" />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-7 rounded-xl border border-line p-3 text-[10px]">
            <div className="flex justify-between">
              <span className="text-fg-subtle">Subtotal</span>
              <span className="font-medium text-fg nums-tabular">₹{SUBTOTAL}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-fg-subtle">GST (12%)</span>
              <span className="font-medium text-fg nums-tabular">₹{GST}</span>
            </div>
            <div className="mt-2 flex items-end justify-between border-t border-line pt-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-subtle">Total</span>
              <span className="font-display text-base font-bold text-fg nums-tabular">₹{TOTAL}</span>
            </div>
          </div>
          <button
            type="button"
            className="col-span-5 flex flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-br from-brand-600 to-teal-500 px-3 py-3 text-white shadow-soft transition hover:shadow-glow-brand"
          >
            <CreditCard className="h-4 w-4" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Collect payment</span>
            <span className="font-display text-sm font-bold nums-tabular">₹{TOTAL}</span>
          </button>
        </div>
      </div>
    </MockupShell>
  );
}
