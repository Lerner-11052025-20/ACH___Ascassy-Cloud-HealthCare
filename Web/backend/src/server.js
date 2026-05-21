// Entrypoint — boots the HTTP server.
import app from './app.js';
import env from './config/env.js';

const server = app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[ascassy-backend] listening on http://localhost:${env.port} (${env.nodeEnv})`);
});

function shutdown(signal) {
  // eslint-disable-next-line no-console
  console.log(`\n[ascassy-backend] ${signal} received — closing server…`);
  server.close(() => process.exit(0));
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
