// Lightweight smoke test for the Ascassy backend.
// Hits /api/health, posts a valid demo, then posts an invalid contact —
// fails (exit 1) if any assertion does not match.
//
// Run after starting the backend:
//   node scripts/smoke.mjs
//   API_BASE=https://api.ascassy.com node scripts/smoke.mjs

const API_BASE = process.env.API_BASE || 'http://localhost:4000';
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

let failures = 0;

function assert(label, condition, detail) {
  if (condition) {
    console.log(`  ✓ ${label}`);
  } else {
    failures += 1;
    console.error(`  ✗ ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

async function postJson(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: FRONTEND_ORIGIN,
    },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

async function run() {
  console.log(`\nAscassy backend smoke test → ${API_BASE}\n`);

  // 1. Health probe
  console.log('1. GET /api/health');
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    const json = await res.json();
    assert('status === 200', res.status === 200, `got ${res.status}`);
    assert('payload.status === "ok"', json.status === 'ok');
    assert('payload.service === "ascassy-backend"', json.service === 'ascassy-backend');
  } catch (err) {
    failures += 1;
    console.error(`  ✗ health probe threw: ${err.message}`);
  }

  // 2. Valid demo submission
  console.log('\n2. POST /api/demo (valid payload)');
  const validDemo = await postJson('/api/demo', {
    name: 'Smoke Test',
    email: 'smoke-test@example.com',
    phone: '9876543210',
    organization: 'Ascassy Smoke',
    inquiryType: 'demo',
    message: 'Smoke test — please ignore this submission.',
    preferredContactTime: 'Weekday mornings IST',
    consent: true,
  });
  assert('status === 200', validDemo.status === 200, `got ${validDemo.status}`);
  assert('payload.ok === true', validDemo.json.ok === true);
  assert(
    'delivery.mode is "smtp" or "console"',
    ['smtp', 'console'].includes(validDemo.json?.delivery?.mode),
  );

  // 3. Invalid contact submission — should return 400 with field errors
  console.log('\n3. POST /api/contact (invalid payload)');
  const invalid = await postJson('/api/contact', {
    name: '',
    email: 'not-an-email',
    message: 'hi',
    consent: false,
  });
  assert('status === 400', invalid.status === 400, `got ${invalid.status}`);
  assert('payload.ok === false', invalid.json.ok === false);
  assert('field error: name', !!invalid.json?.fields?.name);
  assert('field error: email', !!invalid.json?.fields?.email);
  assert('field error: message (too short)', !!invalid.json?.fields?.message);
  assert('field error: consent', !!invalid.json?.fields?.consent);
  assert('field error: inquiryType', !!invalid.json?.fields?.inquiryType);

  // 4. Honeypot — submission with honeypot filled should be rejected
  console.log('\n4. POST /api/contact (honeypot filled — bot detection)');
  const honey = await postJson('/api/contact', {
    name: 'Bot',
    email: 'bot@example.com',
    inquiryType: 'general',
    message: 'I am a bot and I filled in the honeypot.',
    consent: true,
    company_website: 'https://evil.example',
  });
  assert('status === 400 (honeypot rejected)', honey.status === 400, `got ${honey.status}`);
  assert('payload.ok === false', honey.json.ok === false);
  assert('honeypot error flagged as "spam"', !!honey.json?.fields?.spam);

  // 5. 404 on unknown route
  console.log('\n5. GET /api/does-not-exist (404 expected)');
  const notFound = await fetch(`${API_BASE}/api/does-not-exist`);
  assert('status === 404', notFound.status === 404, `got ${notFound.status}`);

  console.log(
    failures === 0
      ? `\n✓ All checks passed.\n`
      : `\n✗ ${failures} check(s) failed.\n`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

run().catch((err) => {
  console.error('Smoke test crashed:', err);
  process.exit(1);
});
