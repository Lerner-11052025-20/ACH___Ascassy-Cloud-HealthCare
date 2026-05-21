// Top navbar — sticky, blurred on scroll, with a highlighted Book Demo CTA.
// On mobile, collapses to a drawer (MobileNavbar).
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '../../utils/cn.js';
import { primaryNav, primaryCTA } from '../../data/site.js';
import Button from '../ui/Button.jsx';
import MobileNavbar from './MobileNavbar.jsx';
import Logo from './Logo.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer when navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'border-b border-ink-100 bg-white/85 backdrop-blur-xl shadow-soft'
            : 'border-b border-transparent bg-white/0',
        )}
      >
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:h-20 lg:px-10">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex h-10 items-center rounded-pill px-4 text-sm font-medium transition',
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-ink-700 hover:text-navy-900 hover:bg-ink-50',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button to={primaryCTA.to} size="md" variant="primary">
              {primaryCTA.label}
            </Button>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200 bg-white text-navy-900 transition hover:bg-ink-50 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <MobileNavbar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
