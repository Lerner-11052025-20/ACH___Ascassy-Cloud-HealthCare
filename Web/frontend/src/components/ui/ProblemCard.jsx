// ProblemCard — surfaces a real-world pain point (pharmacy / healthcare).
// Slightly muted background to differentiate from feature/benefit cards.
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.js';
import { fadeUp } from '../../utils/motion.js';

export default function ProblemCard({ icon: Icon, title, description, className = '' }) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'flex flex-col gap-3 rounded-card border border-ink-100 bg-ink-50/60 p-6 transition hover:bg-white hover:shadow-card',
        className,
      )}
    >
      {Icon ? (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy-900 ring-1 ring-ink-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-base font-semibold text-navy-900">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-700">{description}</p>
      </div>
    </motion.div>
  );
}
