// Responsive max-width container with horizontal padding aligned to BEGiN layout system.
import { cn } from '../../utils/cn.js';

export default function Container({ as: As = 'div', size = 'default', className = '', children }) {
  const widths = {
    default: 'max-w-7xl',
    narrow: 'max-w-5xl',
    wide: 'max-w-[88rem]',
    prose: 'max-w-3xl',
  };
  return (
    <As className={cn('mx-auto w-full px-6 sm:px-8 lg:px-10', widths[size], className)}>
      {children}
    </As>
  );
}
