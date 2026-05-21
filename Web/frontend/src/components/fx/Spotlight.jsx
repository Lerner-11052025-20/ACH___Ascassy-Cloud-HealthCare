// Spotlight — a soft radial light that follows the cursor across its parent.
// Place inside a `relative` container. Purely decorative; aria-hidden.
import { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn.js';

export default function Spotlight({
  className = '',
  size = 520,
  fill = 'rgba(96, 165, 250, 0.18)',
  fillDark = 'rgba(96, 165, 250, 0.28)',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const parent = el.parentElement;
    if (!parent) return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--spot-x', `${x}px`);
        el.style.setProperty('--spot-y', `${y}px`);
        el.style.opacity = '1';
      });
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300', className)}
      style={{
        background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--spot-fill, ${fill}), transparent 70%)`,
        '--spot-fill': fill,
      }}
    >
      {/* Override fill in dark mode via a sibling element using CSS var swap. */}
      <style>{`.dark [data-spot-fill-dark="${fillDark}"]{--spot-fill:${fillDark};}`}</style>
      <div className="absolute inset-0" data-spot-fill-dark={fillDark} />
    </div>
  );
}
