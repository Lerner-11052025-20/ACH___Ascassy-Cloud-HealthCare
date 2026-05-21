// Centralized error handler — never leak stack traces in production.
import env from '../config/env.js';

export function notFound(req, res) {
  res.status(404).json({ ok: false, error: 'Route not found.' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error('[ascassy-backend]', err);
  const status = err.statusCode || 500;
  const payload = {
    ok: false,
    error: err.publicMessage || 'Something went wrong on our side. Please try again.',
  };
  if (env.nodeEnv !== 'production' && err.stack) {
    payload.stack = err.stack;
  }
  res.status(status).json(payload);
}
