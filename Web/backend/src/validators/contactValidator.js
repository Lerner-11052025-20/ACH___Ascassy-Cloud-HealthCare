// Field-level validation for inquiry submissions.
// Returns { valid, errors, data } — data contains the cleaned, validated payload.
import validator from 'validator';
import { cleanString, cleanLongString, cleanBool } from '../utils/sanitize.js';

const ALLOWED_INQUIRY_TYPES = new Set(['demo', 'partnership', 'general', 'support']);

export function validateInquiry(body = {}, { requireOrganization = false } = {}) {
  const errors = {};

  const name = cleanString(body.name, 120);
  if (!name) errors.name = 'Name is required.';

  const email = cleanString(body.email, 200).toLowerCase();
  if (!email) errors.email = 'Email is required.';
  else if (!validator.isEmail(email)) errors.email = 'Please enter a valid email address.';

  const phone = cleanString(body.phone, 32);
  if (phone && !validator.isMobilePhone(phone, 'any', { strictMode: false })) {
    errors.phone = 'Please enter a valid phone number.';
  }

  const organization = cleanString(body.organization, 200);
  if (requireOrganization && !organization) {
    errors.organization = 'Organization or pharmacy name is required for demo requests.';
  }

  let inquiryType = cleanString(body.inquiryType, 32).toLowerCase();
  if (!inquiryType) errors.inquiryType = 'Please select an inquiry type.';
  else if (!ALLOWED_INQUIRY_TYPES.has(inquiryType)) errors.inquiryType = 'Invalid inquiry type.';

  const message = cleanLongString(body.message, 4000);
  if (!message) errors.message = 'Message is required.';
  else if (message.length < 10) errors.message = 'Please share a little more detail.';

  const preferredContactTime = cleanString(body.preferredContactTime, 200);

  const consent = cleanBool(body.consent);
  if (!consent) errors.consent = 'Please confirm you agree to be contacted.';

  // Honeypot fields — if any of these contain text, the submission is from a bot.
  // The honeypot inputs are visually hidden in the UI; humans never see them.
  const honey =
    cleanString(body.website, 1) ||
    cleanString(body.url, 1) ||
    cleanString(body.company_website, 1);
  if (honey) errors.spam = 'Submission rejected.';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      name,
      email,
      phone,
      organization,
      inquiryType,
      message,
      preferredContactTime,
      consent,
    },
  };
}
