// Mobile drawer — full-height slide-in panel with primary nav, theme toggle,
// and the Book Demo CTA always within thumb reach.
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn.js';
import { primaryNav, primaryCTA, contactDetails } from '../../data/site.js';
import Button from '../ui/Button.jsx';
import Logo from './Logo.jsx';
import ThemeToggle from '../common/ThemeToggle.jsx';

export default function MobileNavbar({ open, onClose }) {
  useEffect(() => {
    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-surface shadow-floating ring-1 ring-line-strong"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <Logo />
              <div className="flex items-center gap-2">
                <ThemeToggle size="sm" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={onClose}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong text-fg transition hover:bg-surface-muted"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="flex flex-col gap-1">
                {primaryNav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'flex h-12 items-center rounded-xl px-4 text-base font-medium transition',
                          isActive
                            ? 'bg-gradient-to-br from-brand-500/15 via-cloud-400/15 to-teal-500/15 text-fg ring-1 ring-brand-500/30'
                            : 'text-fg-muted hover:bg-surface-muted hover:text-fg',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-line px-6 py-5">
              <Button to={primaryCTA.to} size="lg" variant="primary" className="w-full" onClick={onClose}>
                {primaryCTA.label}
              </Button>
              <div className="mt-4 flex flex-col gap-1 text-sm text-fg-subtle">
                <a href={`mailto:${contactDetails.email}`} className="hover:text-brand-500">{contactDetails.email}</a>
                <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className="hover:text-brand-500">{contactDetails.phone}</a>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
