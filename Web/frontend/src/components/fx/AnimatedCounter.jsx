// AnimatedCounter — counts from 0 to `value` when scrolled into view.
// Respects prefers-reduced-motion. Formats with thousands separators and prefix/suffix.
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({
  value,
  duration = 1.6,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return undefined;
    }
    const start = performance.now();
    const from = 0;
    const to = value;
    const ms = duration * 1000;
    let frame = 0;
    const step = (now) => {
      const t = Math.min((now - start) / ms, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  const formatted = display.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={`nums-tabular ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
