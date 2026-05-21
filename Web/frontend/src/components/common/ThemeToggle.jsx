// ThemeToggle — animated sun↔moon switch with proper a11y semantics.
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../theme/ThemeProvider.jsx';
import { cn } from '../../utils/cn.js';

export default function ThemeToggle({ className = '', size = 'md' }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const dims = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10';
  const icon = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full',
        'border border-line-strong bg-surface text-fg-muted',
        'transition hover:bg-surface-muted hover:text-fg hover:shadow-soft',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2',
        dims,
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="inline-flex"
        >
          {isDark ? <Moon className={icon} aria-hidden="true" /> : <Sun className={icon} aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
