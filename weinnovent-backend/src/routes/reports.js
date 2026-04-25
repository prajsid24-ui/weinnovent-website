const express = require('express');
const router = express.Router();
const sheets = require('../services/googleSheets');
const docs = require('../services/googleDocs');
const whatsapp = require('../services/whatsapp');

const requireApiKey = (req, res, next) => {
  const key = req.headers['x-api-key'] || req.query.api_key;
  if (!key || key !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

router.use(requireApiKey);

// ── POST /reports/generate — Generate weekly report ──────────
// Fetches last 7 days of leads, creates a Google Doc, logs it to Sheets
router.post('/generate', async (req, res) => {
  const { days = 7, notifyAdmin = true } = req.body;

  try {
    console.log(`[Reports] Generating report for last ${days} days...`);

    // 1. Fetch leads
    const leads = await sheets.getRecentLeads(days);
    console.log(`[Reports] Found ${leads.length} leads`);

    // 2. Create Google Doc
    const { docId, docUrl, title } = await docs.createWeeklyReport(leads);

    // 3. Log report entry to Sheets
    await sheets.logReport(title, docUrl);

    // 4. Notify admin on WhatsApp
    if (notifyAdmin && process.env.ADMIN_PHONE) {
      await whatsapp.sendText(process.env.ADMIN_PHONE,
        `📊 *Weekly Report Ready — Weinnovent*\n\n` +
        `Period: Last ${days} days\n` +
        `Total Leads: ${leads.length}\n\n` +
        `📄 View Report:\n${docUrl}`
      );
    }

    res.json({
      success: true,
      leadCount: leads.length,
      docUrl,
      title,
    });
  } catch (err) {
    console.error('[Reports] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /reports/leads — Quick lead summary ───────────────────
router.get('/leads', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const leads = await sheets.getRecentLeads(days);
    res.json({ success: true, count: leads.length, leads });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /reports/schedule — Auto-report every Monday 9am ────
// Call this once to set up cron-like scheduling via setInterval
// For production, use Railway's cron jobs instead (see README)
router.post('/schedule', (req, res) => {
  res.json({
    message: 'Use Railway Cron Jobs for scheduling. See README.',
    endpoint: 'POST /reports/generate',
    recommended: 'Set a Railway cron: 0 9 * * MON → curl POST /reports/generate',
  });
});

module.exports = router;
