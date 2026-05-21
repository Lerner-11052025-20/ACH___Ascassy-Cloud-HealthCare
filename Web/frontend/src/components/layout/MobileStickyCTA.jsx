// Mobile-only sticky bottom bar — keeps Book a Demo within thumb reach on small screens.
// Auto-hides on the Contact page (where Book Demo would be redundant) and on legal pages.
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { primaryCTA } from '../../data/site.js';

const HIDDEN_PATHS = new Set(['/contact', '/privacy-policy', '/terms']);

export default function MobileStickyCTA() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // Only show after the user has scrolled past the hero (avoids competing with hero CTAs).
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (HIDDEN_PATHS.has(pathname)) return null;

  return (
    <div
      className={
        'fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 px-4 py-3 backdrop-blur-xl shadow-floating ' +
        'transition-all duration-300 lg:hidden ' +
        (visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none')
      }
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <Button
        to={primaryCTA.to}
        variant="primary"
        size="md"
        iconRight={ArrowRight}
        className="w-full"
      >
        {primaryCTA.label}
      </Button>
    </div>
  );
}
