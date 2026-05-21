// Standard section header — eyebrow + title + optional description, theme-aware.
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.js';
import { fadeUp } from '../../utils/motion.js';
import Badge from './Badge.jsx';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  badgeTone = 'brand',
  className = '',
}) {
  const isCenter = align === 'center';
  return (
    <div className={cn('flex flex-col gap-4', isCenter && 'items-center text-center', className)}>
      {eyebrow ? (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Badge tone={badgeTone}>{eyebrow}</Badge>
        </motion.div>
      ) : null}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className={cn(
            'text-base leading-relaxed text-fg-muted sm:text-lg',
            isCenter ? 'max-w-2xl' : 'max-w-3xl',
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
