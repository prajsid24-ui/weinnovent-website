require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const webhookRouter = require('./routes/webhook');
const outboundRouter = require('./routes/outbound');
const reportsRouter = require('./routes/reports');
const healthRouter = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Routes ──────────────────────────────────────────────────
app.use('/webhook', webhookRouter);       // Meta webhook (inbound WhatsApp)
app.use('/send', outboundRouter);         // Outbound message APIs
app.use('/reports', reportsRouter);       // Generate & push reports to Google Docs
app.use('/health', healthRouter);         // Railway health check

// ── 404 ─────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Internal server error', detail: err.message });
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Weinnovent Backend running on port ${PORT}`);
  console.log(`   ENV: ${process.env.NODE_ENV}`);
  console.log(`   Webhook: POST /webhook`);
  console.log(`   Send:    POST /send/message`);
  console.log(`   Reports: POST /reports/generate\n`);
});

module.exports = app;
