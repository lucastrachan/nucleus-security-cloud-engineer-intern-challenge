const express = require('express');
const app = express();
const PORT = 3000;

// Simple request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Known services and their cloud-readiness status
const serviceReadiness = {
  api: {
    ready: true,
    checks: {
      stateless: true,
      healthEndpoint: true,
      containerized: true,
      externalConfig: true,
    },
    notes: 'Service passes all basic cloud-readiness checks.',
  },
  legacy: {
    ready: false,
    checks: {
      stateless: false,
      healthEndpoint: false,
      containerized: false,
      externalConfig: false,
    },
    notes: 'Service relies on local state and lacks health checks.',
  },
};

app.get('/', (req, res) => {
  res.json({
    service: 'cloud-readiness-checker',
    status: 'running',
    message: 'Service is up and reachable.',
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/analyze', (req, res) => {
  const { service } = req.query;

  if (!service) {
    return res.status(400).json({ error: 'Missing required query parameter: service' });
  }

  const result = serviceReadiness[service];

  if (!result) {
    return res.status(404).json({
      error: `Unknown service: "${service}"`,
      knownServices: Object.keys(serviceReadiness),
    });
  }

  res.json({
    service,
    cloudReady: result.ready,
    checks: result.checks,
    notes: result.notes,
  });
});

app.listen(PORT, () => {
  console.log(`Cloud Readiness Checker running on http://localhost:${PORT}`);
});
