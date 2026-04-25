const axios = require('axios');

const BASE_URL = 'https://graph.facebook.com/v19.0';
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_TOKEN;

const client = axios.create({
  baseURL: `${BASE_URL}/${PHONE_ID}`,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// ── Generic send ──────────────────────────────────────────────
async function sendMessage(payload) {
  try {
    const res = await client.post('/messages', {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      ...payload,
    });
    return res.data;
  } catch (err) {
    const detail = err.response?.data?.error || err.message;
    console.error('[WhatsApp Send Error]', JSON.stringify(detail));
    throw new Error(JSON.stringify(detail));
  }
}

// ── Send plain text ───────────────────────────────────────────
async function sendText(to, text) {
  return sendMessage({
    to,
    type: 'text',
    text: { body: text, preview_url: false },
  });
}

// ── Send interactive list (menu) ──────────────────────────────
async function sendInteractiveList(to, { header, body, footer, buttonText, sections }) {
  return sendMessage({
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      header: { type: 'text', text: header },
      body: { text: body },
      footer: { text: footer },
      action: {
        button: buttonText,
        sections,
      },
    },
  });
}

// ── Send interactive buttons (max 3) ─────────────────────────
async function sendButtons(to, { body, footer, buttons }) {
  // buttons = [{ id: 'btn_id', title: 'Button Label' }, ...]
  return sendMessage({
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: body },
      ...(footer && { footer: { text: footer } }),
      action: {
        buttons: buttons.map(b => ({
          type: 'reply',
          reply: { id: b.id, title: b.title },
        })),
      },
    },
  });
}

// ── Send template message (for outbound campaigns) ───────────
// Template must be pre-approved in Meta Business Manager
async function sendTemplate(to, templateName, languageCode = 'en', components = []) {
  return sendMessage({
    to,
    type: 'template',
    template: {
      name: templateName,
      language: { code: languageCode },
      ...(components.length > 0 && { components }),
    },
  });
}

// ── Send image ────────────────────────────────────────────────
async function sendImage(to, imageUrl, caption = '') {
  return sendMessage({
    to,
    type: 'image',
    image: { link: imageUrl, caption },
  });
}

// ── Send document ─────────────────────────────────────────────
async function sendDocument(to, docUrl, filename, caption = '') {
  return sendMessage({
    to,
    type: 'document',
    document: { link: docUrl, filename, caption },
  });
}

// ── Mark message as read ──────────────────────────────────────
async function markAsRead(messageId) {
  return sendMessage({
    status: 'read',
    message_id: messageId,
  });
}

module.exports = {
  sendText,
  sendInteractiveList,
  sendButtons,
  sendTemplate,
  sendImage,
  sendDocument,
  markAsRead,
};
