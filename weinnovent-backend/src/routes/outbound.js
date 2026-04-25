const express = require('express');
const router = express.Router();
const whatsapp = require('../services/whatsapp');
const sheets = require('../services/googleSheets');

// Simple API key guard for all outbound routes
const requireApiKey = (req, res, next) => {
  const key = req.headers['x-api-key'] || req.query.api_key;
  if (!key || key !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized — invalid API key' });
  }
  next();
};

// Add INTERNAL_API_KEY to .env — any strong random string
router.use(requireApiKey);

// ── POST /send/message — Send a single text ───────────────────
// Body: { to: "919876543210", message: "Hello..." }
router.post('/message', async (req, res) => {
  const { to, message } = req.body;
  if (!to || !message) {
    return res.status(400).json({ error: 'to and message are required' });
  }
  try {
    const result = await whatsapp.sendText(to, message);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /send/template — Send an approved template ──────────
// Body: { to, templateName, languageCode, components }
router.post('/template', async (req, res) => {
  const { to, templateName, languageCode = 'en', components = [] } = req.body;
  if (!to || !templateName) {
    return res.status(400).json({ error: 'to and templateName are required' });
  }
  try {
    const result = await whatsapp.sendTemplate(to, templateName, languageCode, components);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /send/campaign — Bulk message to a list ─────────────
// Body: { numbers: ["919876543210", ...], message, delayMs }
// Uses template for campaigns (required by Meta for outbound to non-opted-in users)
router.post('/campaign', async (req, res) => {
  const { numbers, templateName, languageCode = 'en', components = [], delayMs = 1000 } = req.body;

  if (!numbers?.length || !templateName) {
    return res.status(400).json({ error: 'numbers array and templateName are required' });
  }

  res.json({ success: true, queued: numbers.length, message: 'Campaign sending in background' });

  // Send in background with delay to respect rate limits
  (async () => {
    const results = { sent: 0, failed: 0, errors: [] };
    for (const num of numbers) {
      try {
        await whatsapp.sendTemplate(num, templateName, languageCode, components);
        results.sent++;
        console.log(`[Campaign] Sent to ${num}`);
      } catch (err) {
        results.failed++;
        results.errors.push({ num, error: err.message });
        console.error(`[Campaign] Failed for ${num}:`, err.message);
      }
      // Delay between messages to avoid rate limiting
      await new Promise(r => setTimeout(r, delayMs));
    }
    console.log(`[Campaign] Complete — Sent: ${results.sent}, Failed: ${results.failed}`);
  })();
});

// ── POST /send/lead-followup — Follow up on a specific lead ──
// Body: { phone, name, service }
router.post('/lead-followup', async (req, res) => {
  const { phone, name, service } = req.body;
  if (!phone) return res.status(400).json({ error: 'phone is required' });

  try {
    await whatsapp.sendText(phone,
      `Hi ${name || 'there'}! 👋 This is Weinnovent Studios.\n\n` +
      `We wanted to follow up on your enquiry about *${service || 'our services'}*.\n\n` +
      `Are you still interested? We'd love to share a customised proposal for your brand.\n\n` +
      `Reply *Yes* to connect with our team, or visit weinnovent.com 🌿`
    );

    // Update lead status in sheet
    await sheets.updateLeadStatus(phone, 'Followed Up');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
