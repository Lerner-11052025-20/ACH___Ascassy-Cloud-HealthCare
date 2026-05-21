// Health controller — simple liveness probe.
export function getHealth(req, res) {
  res.json({
    status: 'ok',
    service: 'ascassy-backend',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  });
}
