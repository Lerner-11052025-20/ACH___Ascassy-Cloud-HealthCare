// Loads environment variables and exposes a typed config object.
// Centralizes defaults so handlers don't sprinkle process.env reads everywhere.
import 'dotenv/config';

const toInt = (v, fallback) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
};

const toBool = (v, fallback = false) => {
  if (v === undefined || v === null || v === '') return fallback;
  return /^(true|1|yes)$/i.test(String(v));
};

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: toInt(process.env.PORT, 4000),
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  rateLimit: {
    windowMs: toInt(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: toInt(process.env.RATE_LIMIT_MAX, 20),
  },
  inquiry: {
    to: process.env.INQUIRY_TO_EMAIL || 'hello@ascassy.com',
    from: process.env.INQUIRY_FROM_EMAIL || 'no-reply@ascassy.com',
  },
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: toInt(process.env.SMTP_PORT, 587),
    secure: toBool(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};

export default env;
