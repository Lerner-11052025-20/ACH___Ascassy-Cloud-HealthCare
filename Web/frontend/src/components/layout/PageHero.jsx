// PageHero — reusable hero block for non-Home pages.
// Provides consistent eyebrow + title + sub + optional CTAs + atmospheric gradient.
import { motion } from 'framer-motion';
import Container from '../common/Container.jsx';
import GradientBlob from '../common/GradientBlob.jsx';
import Badge from '../common/Badge.jsx';
import { cn } from '../../utils/cn.js';
import { fadeUp, stagger } from '../../utils/motion.js';

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = 'left',
  badgeTone = 'brand',
  className = '',
}) {
  const isCenter = align === 'center';
  return (
    <section className={cn('relative isolate overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white', className)}>
      <GradientBlob className="-top-32 -right-20" from="from-brand-200/70" via="via-cloud-300/40" to="to-teal-200/50" size="h-[640px] w-[640px]" />
      <GradientBlob className="-bottom-40 -left-20" from="from-teal-100/60" via="via-cyan-200/30" to="to-brand-100/40" size="h-[520px] w-[520px]" />
      <Container className="py-20 sm:py-24 lg:py-32">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate="show"
          className={cn('flex flex-col gap-5', isCenter && 'items-center text-center')}
        >
          {eyebrow ? (
            <motion.div variants={fadeUp}>
              <Badge tone={badgeTone}>{eyebrow}</Badge>
            </motion.div>
          ) : null}
          <motion.h1
            variants={fadeUp}
            className="max-w-4xl font-display text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl lg:leading-[1.1]"
          >
            {title}
          </motion.h1>
          {description ? (
            <motion.p
              variants={fadeUp}
              className={cn(
                'text-lg leading-relaxed text-ink-700 sm:text-xl',
                isCenter ? 'max-w-3xl' : 'max-w-3xl',
              )}
            >
              {description}
            </motion.p>
          ) : null}
          {children ? (
            <motion.div variants={fadeUp} className={cn('mt-2 flex flex-wrap gap-3', isCenter && 'justify-center')}>
              {children}
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
