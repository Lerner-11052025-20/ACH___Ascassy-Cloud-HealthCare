// ProblemCard — surfaces a real-world pain point. Theme-aware muted surface.
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.js';
import { fadeUp } from '../../utils/motion.js';

export default function ProblemCard({ icon: Icon, title, description, className = '' }) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'flex flex-col gap-3 rounded-card border border-line bg-surface-muted/60 p-6 transition hover:bg-surface hover:shadow-card',
        className,
      )}
    >
      {Icon ? (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-fg ring-1 ring-line-strong">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-base font-semibold text-fg">{title}</h3>
        <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
      </div>
    </motion.div>
  );
}
