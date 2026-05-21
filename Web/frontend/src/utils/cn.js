// Tiny class-name merge helper. Drops falsy values and joins with a space.
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
