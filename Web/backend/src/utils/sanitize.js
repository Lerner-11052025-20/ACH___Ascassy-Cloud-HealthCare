// Lightweight input sanitizers — keep payloads small and safe for email rendering.
// Strips HTML tags, trims, and enforces max lengths.

const TAG_RE = /<[^>]*>/g;

export function cleanString(value, maxLength = 500) {
  if (typeof value !== 'string') return '';
  return value.replace(TAG_RE, '').trim().slice(0, maxLength);
}

export function cleanLongString(value, maxLength = 4000) {
  return cleanString(value, maxLength);
}

export function cleanBool(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return /^(true|1|yes|on)$/i.test(value);
  return false;
}
