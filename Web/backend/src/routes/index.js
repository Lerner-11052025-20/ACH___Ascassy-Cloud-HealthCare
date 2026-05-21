// API route tree — health, contact, demo.
import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import { submitContact, submitDemo } from '../controllers/contactController.js';
import { inquiryLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.get('/health', getHealth);
router.post('/contact', inquiryLimiter, submitContact);
router.post('/demo', inquiryLimiter, submitDemo);

export default router;
