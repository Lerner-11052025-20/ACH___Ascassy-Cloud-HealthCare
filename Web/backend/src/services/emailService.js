// Email service — sends inquiry notifications via SMTP (nodemailer).
// When SMTP is not configured, falls back to console logging so local dev works without secrets.
import nodemailer from 'nodemailer';
import env from '../config/env.js';

let transporter = null;

function getTransporter() {
  if (transporter !== null) return transporter;
  if (!env.smtp.host) return null;
  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: env.smtp.user
      ? { user: env.smtp.user, pass: env.smtp.pass }
      : undefined,
  });
  return transporter;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtml(kind, data) {
  const rows = [
    ['Inquiry Type', data.inquiryType],
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Organization', data.organization || '—'],
    ['Preferred Contact Time', data.preferredContactTime || '—'],
    ['Consent', data.consent ? 'Yes' : 'No'],
  ];
  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#475569;font-weight:500;">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 12px;color:#0F172A;">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
  return `
  <div style="font-family:Inter,Arial,sans-serif;color:#0F172A;line-height:1.5;">
    <h2 style="font-size:18px;margin:0 0 12px;">New ${escapeHtml(kind)} — ascassy.com</h2>
    <table style="border-collapse:collapse;border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;">
      ${rowsHtml}
    </table>
    <h3 style="font-size:14px;margin:18px 0 6px;color:#334155;">Message</h3>
    <pre style="white-space:pre-wrap;background:#F8FAFC;border:1px solid #E2E8F0;padding:12px;border-radius:8px;font-family:Inter,Arial,sans-serif;font-size:14px;color:#0F172A;">${escapeHtml(
      data.message,
    )}</pre>
    <p style="font-size:12px;color:#64748B;margin-top:18px;">Sent automatically by the Ascassy website backend.</p>
  </div>`;
}

function buildText(kind, data) {
  return [
    `New ${kind} — ascassy.com`,
    '',
    `Inquiry Type: ${data.inquiryType}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '—'}`,
    `Organization: ${data.organization || '—'}`,
    `Preferred Contact Time: ${data.preferredContactTime || '—'}`,
    `Consent: ${data.consent ? 'Yes' : 'No'}`,
    '',
    'Message:',
    data.message,
  ].join('\n');
}

export async function sendInquiry(kind, data) {
  const subject = `[Ascassy] ${kind} — ${data.name}`;
  const html = buildHtml(kind, data);
  const text = buildText(kind, data);

  const t = getTransporter();
  if (!t) {
    // No SMTP configured — log to console so local dev still confirms the flow.
    // eslint-disable-next-line no-console
    console.log('\n--- Ascassy inquiry (SMTP disabled, logging only) ---');
    // eslint-disable-next-line no-console
    console.log(text);
    // eslint-disable-next-line no-console
    console.log('--- end ---\n');
    return { delivered: false, mode: 'console' };
  }

  await t.sendMail({
    from: env.inquiry.from,
    to: env.inquiry.to,
    replyTo: data.email,
    subject,
    text,
    html,
  });
  return { delivered: true, mode: 'smtp' };
}
