const express = require('express');
const router = express.Router();
const { handleInboundMessage } = require('../handlers/messageHandler');

// ── GET /webhook — Meta verification handshake ───────────────
// Meta calls this once when you register the webhook URL
router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    console.log('[Webhook] ✅ Verified by Meta');
    return res.status(200).send(challenge);
  }

  console.warn('[Webhook] ❌ Verification failed — token mismatch');
  return res.status(403).json({ error: 'Forbidden' });
});

// ── POST /webhook — Incoming WhatsApp messages ───────────────
router.post('/', async (req, res) => {
  // Always respond 200 immediately — Meta will retry if you don't
  res.status(200).send('EVENT_RECEIVED');

  try {
    const body = req.body;

    // Validate it's a WhatsApp message event
    if (
      body.object !== 'whatsapp_business_account' ||
      !body.entry?.[0]?.changes?.[0]?.value?.messages
    ) {
      return; // Status updates, read receipts, etc. — ignore
    }

    const value = body.entry[0].changes[0].value;
    const messages = value.messages;
    const contacts = value.contacts;

    for (const message of messages) {
      const contact = contacts?.find(c => c.wa_id === message.from) || {};
      await handleInboundMessage(message, contact);
    }
  } catch (err) {
    console.error('[Webhook] Error processing message:', err.message);
  }
});

module.exports = router;
