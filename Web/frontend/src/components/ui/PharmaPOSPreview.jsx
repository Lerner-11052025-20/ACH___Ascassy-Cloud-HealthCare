// PharmaPOSPreview — interactive tabbed product preview.
// Default usage shows all 9 PharmaPOS screens. Each page hero can pass a
// curated subset via the `tabs` prop and switch on `size="compact"` for
// embedding inside a hero block.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  TrendingUp,
  Receipt,
  Package,
  AlertTriangle,
  Sparkles,
  FileText,
  BarChart3,
  Users,
  Settings as SettingsIcon,
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
  ReportsMockup,
  UsersMockup,
  SettingsMockup,
} from './mockups/index.js';

// Canonical registry — every tab the switcher knows about.
const TAB_REGISTRY = {
  overview: { id: 'overview', label: 'Overview', icon: TrendingUp, Component: OverviewMockup, blurb: "Today's bills, low stock, expiring soon — at a glance." },
  billing: { id: 'billing', label: 'Billing', icon: Receipt, Component: BillingMockup, blurb: 'Counter-speed billing with GST built in.' },
  inventory: { id: 'inventory', label: 'Inventory', icon: Package, Component: InventoryMockup, blurb: 'Real-time stock with AI purchase suggestions.' },
  expiry: { id: 'expiry', label: 'Expiry', icon: AlertTriangle, Component: ExpiryMockup, blurb: 'Stop expiry losses before they happen.' },
  ai: { id: 'ai', label: 'AI Insights', icon: Sparkles, Component: AIInsightsMockup, blurb: 'Personalized recommendations with confidence scores.' },
  rx: { id: 'rx', label: 'Prescriptions', icon: FileText, Component: PrescriptionsMockup, blurb: 'OCR-powered prescription intake.' },
  reports: { id: 'reports', label: 'Reports', icon: BarChart3, Component: ReportsMockup, blurb: 'Sales, profit, and category analytics in one view.' },
  users: { id: 'users', label: 'Users', icon: Users, Component: UsersMockup, blurb: 'Role-based access for safer operations.' },
  settings: { id: 'settings', label: 'Settings', icon: SettingsIcon, Component: SettingsMockup, blurb: 'Configure your pharmacy from one place.' },
};

const DEFAULT_TAB_ORDER = ['overview', 'billing', 'inventory', 'expiry', 'ai', 'rx', 'reports', 'users', 'settings'];

function resolveTabs(input) {
  if (!input || input.length === 0) {
    return DEFAULT_TAB_ORDER.map((id) => TAB_REGISTRY[id]);
  }
  return input.map((id) => TAB_REGISTRY[id]).filter(Boolean);
}

export default function PharmaPOSPreview({
  tabs,
  defaultTab,
  size = 'default',
  showHint = true,
  className = '',
}) {
  const resolved = resolveTabs(tabs);
  const initialId = defaultTab && resolved.some((t) => t.id === defaultTab) ? defaultTab : resolved[0].id;

  const [active, setActive] = useState(initialId);
  const [hasInteracted, setHasInteracted] = useState(false);
  const tabsRef = useRef(null);

  const tab = resolved.find((t) => t.id === active) || resolved[0];
  const Active = tab.Component;
  const isCompact = size === 'compact';

  // Keep state honest if the tabs prop changes at runtime.
  useEffect(() => {
    if (!resolved.some((t) => t.id === active)) {
      setActive(resolved[0].id);
    }
  }, [tabs]);

  function handlePick(id) {
    setActive(id);
    setHasInteracted(true);
  }

  return (
    <div className={cn('flex flex-col', isCompact ? 'gap-2.5' : 'gap-4', className)}>
      {/* Tab bar */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="PharmaPOS screens"
        className={cn(
          '-mx-1 flex gap-1.5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          isCompact ? 'pb-0.5' : 'pb-1',
        )}
      >
        {resolved.map((t) => {
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
                'inline-flex shrink-0 items-center gap-2 rounded-pill font-semibold transition',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2',
                isCompact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
                isActive
                  ? 'bg-brand-600 text-white shadow-glow-brand'
                  : 'bg-surface text-fg-muted ring-1 ring-line-strong hover:bg-surface-muted hover:text-fg',
              )}
            >
              <Icon className={isCompact ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden="true" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Hint or per-tab blurb */}
      {showHint ? (
        !hasInteracted ? (
          <p
            className={cn(
              'flex items-center gap-1.5 font-medium text-fg-subtle',
              isCompact ? 'text-[11px]' : 'text-xs',
            )}
          >
            <MousePointerClick className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            Click any tab — every view is a real PharmaPOS screen.
          </p>
        ) : (
          <p className={cn('font-medium text-fg-subtle', isCompact ? 'text-[11px]' : 'text-xs')}>{tab.blurb}</p>
        )
      ) : null}

      {/* Animated panel */}
      <div
        role="tabpanel"
        id={`pharmapos-panel-${tab.id}`}
        aria-labelledby={`pharmapos-tab-${tab.id}`}
        className="relative"
      >
        <div
          aria-hidden="true"
          className={cn(
            '-z-10 rounded-[2rem] bg-gradient-to-br from-brand-100 via-canvas to-teal-100 blur-xl',
            'dark:from-brand-500/20 dark:via-canvas dark:to-teal-500/20',
            isCompact ? 'absolute -inset-4' : 'absolute -inset-6',
          )}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Active />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
