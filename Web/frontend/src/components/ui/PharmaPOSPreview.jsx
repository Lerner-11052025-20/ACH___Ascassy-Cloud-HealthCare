// PharmaPOSPreview — interactive tabbed product preview.
// Visitors click between Overview, Billing, Inventory, Expiry, AI Insights,
// and Prescriptions to see PharmaPOS as a real multi-screen product.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  TrendingUp,
  Receipt,
  Package,
  AlertTriangle,
  Sparkles,
  FileText,
  MousePointerClick,
} from 'lucide-react';
import { cn } from '../../utils/cn.js';
import {
  OverviewMockup,
  BillingMockup,
  InventoryMockup,
  ExpiryMockup,
  AIInsightsMockup,
  PrescriptionsMockup,
} from './mockups/index.js';

const TABS = [
  { id: 'overview', label: 'Overview', icon: TrendingUp, Component: OverviewMockup, blurb: "Today's bills, low stock, expiring soon — at a glance." },
  { id: 'billing', label: 'Billing', icon: Receipt, Component: BillingMockup, blurb: 'Counter-speed billing with GST built in.' },
  { id: 'inventory', label: 'Inventory', icon: Package, Component: InventoryMockup, blurb: 'Real-time stock with AI purchase suggestions.' },
  { id: 'expiry', label: 'Expiry', icon: AlertTriangle, Component: ExpiryMockup, blurb: 'Stop expiry losses before they happen.' },
  { id: 'ai', label: 'AI Insights', icon: Sparkles, Component: AIInsightsMockup, blurb: 'Personalized recommendations with confidence scores.' },
  { id: 'rx', label: 'Prescriptions', icon: FileText, Component: PrescriptionsMockup, blurb: 'OCR-powered prescription intake.' },
];

export default function PharmaPOSPreview({ defaultTab = 'overview', autoPlayMs = 0, className = '' }) {
  const [active, setActive] = useState(defaultTab);
  const [hasInteracted, setHasInteracted] = useState(false);
  const tabsRef = useRef(null);

  const tab = TABS.find((t) => t.id === active) || TABS[0];
  const Active = tab.Component;

  // Optional gentle auto-advance — disabled by default. Stops on first user click.
  useEffect(() => {
    if (!autoPlayMs || hasInteracted) return undefined;
    const id = setInterval(() => {
      setActive((current) => {
        const idx = TABS.findIndex((t) => t.id === current);
        return TABS[(idx + 1) % TABS.length].id;
      });
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, hasInteracted]);

  function handlePick(id) {
    setActive(id);
    setHasInteracted(true);
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Tab bar */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="PharmaPOS screens"
        className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`pharmapos-panel-${t.id}`}
              id={`pharmapos-tab-${t.id}`}
              onClick={() => handlePick(t.id)}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-pill px-4 py-2 text-sm font-semibold transition',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2',
                isActive
                  ? 'bg-brand-600 text-white shadow-soft'
                  : 'bg-white text-ink-700 ring-1 ring-ink-200 hover:bg-ink-50 hover:text-navy-900',
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Hint — only until the visitor has clicked */}
      {!hasInteracted ? (
        <p className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
          <MousePointerClick className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
          Click any tab to switch screens — every view is a real PharmaPOS workflow.
        </p>
      ) : (
        <p className="text-xs font-medium text-ink-500">{tab.blurb}</p>
      )}

      {/* Animated panel */}
      <div
        role="tabpanel"
        id={`pharmapos-panel-${tab.id}`}
        aria-labelledby={`pharmapos-tab-${tab.id}`}
        className="relative"
      >
        <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-100 via-white to-teal-100 blur-xl" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Active />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
