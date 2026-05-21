// Top navbar — sticky, glass on scroll, theme-aware, with a highlighted
// Book Demo CTA and an animated sun↔moon theme toggle.
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '../../utils/cn.js';
import { primaryNav, primaryCTA } from '../../data/site.js';
import Button from '../ui/Button.jsx';
import MobileNavbar from './MobileNavbar.jsx';
import Logo from './Logo.jsx';
import ThemeToggle from '../common/ThemeToggle.jsx';
import { MagneticWrapper } from '../fx/index.js';

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled ? 'glass-card border-b shadow-soft' : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:h-20 lg:px-10">
          <Logo />

          <ul className="hidden items-center gap-0.5 lg:flex">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex h-10 items-center rounded-pill px-4 text-sm font-medium transition',
                      isActive
                        ? 'text-fg'
                        : 'text-fg-muted hover:text-fg hover:bg-surface-muted',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-1.5 -z-10 rounded-pill bg-gradient-to-br from-brand-500/15 via-cloud-400/15 to-teal-500/15 ring-1 ring-brand-500/30"
                        />
                      ) : null}
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <MagneticWrapper strength={0.18}>
              <Button to={primaryCTA.to} size="md" variant="primary">
                {primaryCTA.label}
              </Button>
            </MagneticWrapper>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle size="sm" />
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-surface text-fg transition hover:bg-surface-muted"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <MobileNavbar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
