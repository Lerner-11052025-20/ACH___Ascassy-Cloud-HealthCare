// PageHero — reusable hero block for non-Home pages.
// Theme-aware gradient, atmospheric blobs, optional right-side visual slot,
// and a subtle grid pattern background.
import { motion } from 'framer-motion';
import Container from '../common/Container.jsx';
import GradientBlob from '../common/GradientBlob.jsx';
import Badge from '../common/Badge.jsx';
import { GridPattern } from '../fx/index.js';
import { cn } from '../../utils/cn.js';
import { fadeUp, stagger } from '../../utils/motion.js';

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  visual,
  align = 'left',
  badgeTone = 'brand',
  className = '',
}) {
  const hasVisual = Boolean(visual);
  const isCenter = align === 'center' && !hasVisual;

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        'bg-gradient-to-b from-brand-50/60 via-canvas to-canvas',
        'dark:from-brand-500/8 dark:via-canvas dark:to-canvas',
        className,
      )}
    >
      <GridPattern variant="grid" fade />
      <GradientBlob className="-top-32 -right-20" from="from-brand-200/70" via="via-cloud-300/40" to="to-teal-200/50" size="h-[640px] w-[640px]" />
      <GradientBlob className="-bottom-40 -left-20" from="from-teal-100/60" via="via-cyan-200/30" to="to-brand-100/40" size="h-[520px] w-[520px]" />
      <Container className={cn(hasVisual ? 'py-16 sm:py-20 lg:py-24' : 'py-20 sm:py-24 lg:py-32')}>
        <div className={cn(hasVisual && 'grid items-center gap-12 lg:grid-cols-12 lg:gap-14')}>
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            animate="show"
            className={cn(
              'flex flex-col gap-5',
              isCenter && 'items-center text-center',
              hasVisual && 'lg:col-span-6',
            )}
          >
            {eyebrow ? (
              <motion.div variants={fadeUp}>
                <Badge tone={badgeTone}>{eyebrow}</Badge>
              </motion.div>
            ) : null}
            <motion.h1
              variants={fadeUp}
              className={cn(
                'font-display font-bold tracking-tight text-fg',
                hasVisual
                  ? 'text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]'
                  : 'max-w-4xl text-4xl sm:text-5xl lg:text-6xl lg:leading-[1.1]',
              )}
            >
              {title}
            </motion.h1>
            {description ? (
              <motion.p
                variants={fadeUp}
                className={cn(
                  'text-lg leading-relaxed text-fg-muted sm:text-xl',
                  isCenter ? 'max-w-3xl' : 'max-w-2xl',
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

          {hasVisual ? (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:col-span-6"
            >
              {visual}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
