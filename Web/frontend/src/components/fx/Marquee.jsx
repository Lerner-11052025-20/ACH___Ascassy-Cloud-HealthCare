// Marquee — infinite horizontal scroller. Duplicates children once so the
// loop is seamless. Pauses on hover for discoverability.
import { cloneElement, Children } from 'react';
import { cn } from '../../utils/cn.js';

export default function Marquee({ children, speed = 'normal', gap = 'gap-10', className = '' }) {
  const speedClass = speed === 'slow' ? 'marquee marquee-slow' : 'marquee';
  // Render the children twice so the translate -50% loop appears seamless.
  const items = Children.toArray(children);
  const cloned = items.map((c, i) => cloneElement(c, { key: `clone-${i}`, 'aria-hidden': 'true' }));
  return (
    <div className={cn('marquee-mask overflow-hidden', className)}>
      <div className={cn(speedClass, gap, 'hover:[animation-play-state:paused]')}>
        <div className={cn('flex shrink-0 items-center', gap)}>{items}</div>
        <div className={cn('flex shrink-0 items-center', gap)}>{cloned}</div>
      </div>
    </div>
  );
}
