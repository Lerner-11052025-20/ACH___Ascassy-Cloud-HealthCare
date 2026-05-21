// Inquiry rate limiter — defends against spam without blocking legitimate submissions.
import rateLimit from 'express-rate-limit';
import env from '../config/env.js';

export const inquiryLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: 'Too many requests from this address. Please try again later.',
  },
});
