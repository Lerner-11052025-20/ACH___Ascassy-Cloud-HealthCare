# Ascassy Backend

Lightweight Node.js + Express backend for the Ascassy Cloud Healthcare marketing website. No database. Only purpose: receive contact and demo inquiries from ascassy.com, validate them, and forward by email.

## Stack

- Node.js + Express.js (ESM)
- helmet, cors, express-rate-limit
- validator (input validation)
- nodemailer (email transport — SMTP)
- dotenv (configuration)

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Liveness probe |
| POST | `/api/contact` | General contact inquiry |
| POST | `/api/demo` | Demo request |

All POST endpoints accept the same JSON shape:

```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "organization": "string (optional)",
  "inquiryType": "demo | partnership | general | support",
  "message": "string",
  "preferredContactTime": "string (optional)",
  "consent": true
}
```

## Local development

```bash
cd Web/backend
npm install
cp .env.example .env  # then edit if you want real SMTP
npm run dev           # auto-reload on file changes
```

When `SMTP_HOST` is empty, inquiries are logged to the terminal instead of being emailed. Useful for local development.

## Production

```bash
npm start
```

Configure `.env` with:
- `CORS_ORIGIN=https://ascassy.com`
- `SMTP_*` for the chosen email provider
- `INQUIRY_TO_EMAIL` for the recipient mailbox
