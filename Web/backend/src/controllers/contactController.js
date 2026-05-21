// Contact controllers — validates, sanitizes, and dispatches inquiry emails.
// Used by both /api/contact and /api/demo routes.
import { validateInquiry } from '../validators/contactValidator.js';
import { sendInquiry } from '../services/emailService.js';

async function handle(req, res, next, { kindLabel, requireOrganization }) {
  try {
    const { valid, errors, data } = validateInquiry(req.body, { requireOrganization });
    if (!valid) {
      return res.status(400).json({
        ok: false,
        error: 'Some fields need attention.',
        fields: errors,
      });
    }

    const result = await sendInquiry(kindLabel, data);
    return res.status(200).json({
      ok: true,
      message: "Thanks for reaching out. The Ascassy team will get back to you soon.",
      delivery: result,
    });
  } catch (err) {
    next(err);
  }
}

export function submitContact(req, res, next) {
  return handle(req, res, next, {
    kindLabel: 'Contact Inquiry',
    requireOrganization: false,
  });
}

export function submitDemo(req, res, next) {
  return handle(req, res, next, {
    kindLabel: 'Demo Request',
    requireOrganization: false,
  });
}
