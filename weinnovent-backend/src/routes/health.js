const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Weinnovent Backend',
    version: '1.0.0',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()) + 's',
    checks: {
      whatsapp_token: !!process.env.WHATSAPP_TOKEN,
      whatsapp_phone_id: !!process.env.WHATSAPP_PHONE_NUMBER_ID,
      google_service_account: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      google_private_key: !!process.env.GOOGLE_PRIVATE_KEY,
      leads_sheet: !!process.env.LEADS_SHEET_ID,
    },
  });
});

module.exports = router;
