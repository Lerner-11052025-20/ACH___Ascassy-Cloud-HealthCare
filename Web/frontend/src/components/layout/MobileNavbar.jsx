// Mobile drawer — full-height slide-in panel with primary nav and CTA.
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn.js';
import { primaryNav, primaryCTA, contactDetails } from '../../data/site.js';
import Button from '../ui/Button.jsx';
import Logo from './Logo.jsx';

export default function MobileNavbar({ open, onClose }) {
  // Lock body scroll while drawer is open
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
            className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-floating"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200 text-navy-900 transition hover:bg-ink-50"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
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
                            ? 'bg-brand-50 text-brand-700'
                            : 'text-navy-800 hover:bg-ink-50',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-ink-100 px-6 py-5">
              <Button to={primaryCTA.to} size="lg" variant="primary" className="w-full" onClick={onClose}>
                {primaryCTA.label}
              </Button>
              <div className="mt-4 flex flex-col gap-1 text-sm text-ink-500">
                <a href={`mailto:${contactDetails.email}`} className="hover:text-brand-700">{contactDetails.email}</a>
                <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className="hover:text-brand-700">{contactDetails.phone}</a>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
