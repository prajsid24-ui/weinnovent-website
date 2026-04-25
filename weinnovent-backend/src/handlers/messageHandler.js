const whatsapp = require('../services/whatsapp');
const sheets = require('../services/googleSheets');
const { formatDate } = require('../utils/helpers');

// ── In-memory conversation state ─────────────────────────────
// For production at scale, swap this with Redis
const sessions = new Map();

// ── Keywords that trigger the lead flow ──────────────────────
const LEAD_KEYWORDS = [
  'hi', 'hello', 'hey', 'hii', 'namaste',
  'branding', 'social media', 'marketing', 'website',
  'photography', 'video', 'campaign', 'ads', 'price',
  'quote', 'cost', 'package', 'services', 'help',
  'interested', 'enquiry', 'inquiry', 'start',
];

// ── Main inbound handler ─────────────────────────────────────
async function handleInboundMessage(message, contact) {
  const phone = message.from;
  const name = contact?.profile?.name || 'there';
  const msgType = message.type;

  console.log(`[Inbound] From: ${phone} | Name: ${name} | Type: ${msgType}`);

  // Only handle text messages for now
  if (msgType !== 'text') {
    await whatsapp.sendText(phone,
      `Hi ${name}! 👋 We received your message. For a faster response, please type your query or reply with *Hello* to get started.`
    );
    return;
  }

  const text = message.text.body.trim().toLowerCase();
  const session = sessions.get(phone) || { step: 'start', data: {} };

  // Route based on conversation step
  switch (session.step) {
    case 'start':
      await handleStart(phone, name, text, session);
      break;
    case 'awaiting_service':
      await handleServiceSelection(phone, name, text, session);
      break;
    case 'awaiting_brand_name':
      await handleBrandName(phone, name, text, session);
      break;
    case 'awaiting_city':
      await handleCity(phone, name, text, session);
      break;
    case 'completed':
      await handleCompleted(phone, name, text, session);
      break;
    default:
      await handleStart(phone, name, text, session);
  }
}

// ── Step 1: Greeting + service menu ──────────────────────────
async function handleStart(phone, name, text, session) {
  const isKeyword = LEAD_KEYWORDS.some(k => text.includes(k));

  if (!isKeyword && session.step !== 'start') {
    await whatsapp.sendText(phone,
      `Hi! Type *Hello* to connect with Weinnovent Studios 🌿`
    );
    return;
  }

  await whatsapp.sendInteractiveList(phone, {
    header: `Hey ${name}! 👋`,
    body: `Welcome to *Weinnovent Studios* — a premium creative marketing agency based in Bengaluru.\n\nWhat are you looking for? 👇`,
    footer: 'We reply within 2 hours',
    buttonText: 'View Services',
    sections: [
      {
        title: 'Our Services',
        rows: [
          { id: 'branding', title: '◆ Branding', description: 'Logo, identity, visual direction' },
          { id: 'social_media', title: '◆ Social Media', description: 'Content, reels, management' },
          { id: 'performance', title: '◆ Performance Ads', description: 'Meta Ads, lead gen, retargeting' },
          { id: 'photography', title: '◆ Photo & Video', description: 'Shoots, reels, campaign visuals' },
          { id: 'website', title: '◆ Website', description: 'Landing pages, portfolios' },
          { id: 'full_package', title: '◆ Full Package', description: 'Everything combined' },
        ],
      },
    ],
  });

  session.step = 'awaiting_service';
  session.data.name = name;
  session.data.phone = phone;
  session.data.enquiry_time = new Date().toISOString();
  sessions.set(phone, session);
}

// ── Step 2: Capture service selection ────────────────────────
async function handleServiceSelection(phone, name, text, session) {
  const SERVICE_MAP = {
    branding: 'Branding',
    social_media: 'Social Media Marketing',
    performance: 'Performance Marketing',
    photography: 'Photography & Videography',
    website: 'Website Presence',
    full_package: 'Full Package',
  };

  // Accept list reply ID or typed keyword
  let service = SERVICE_MAP[text];
  if (!service) {
    // Try fuzzy match from typed text
    for (const [key, val] of Object.entries(SERVICE_MAP)) {
      if (text.includes(key.replace('_', ' ')) || text.includes(val.toLowerCase())) {
        service = val;
        break;
      }
    }
  }

  if (!service) {
    await whatsapp.sendText(phone,
      `Please select a service from the list above, or type one of:\n\n• Branding\n• Social Media\n• Performance Ads\n• Photography\n• Website\n• Full Package`
    );
    return;
  }

  session.data.service = service;
  session.step = 'awaiting_brand_name';
  sessions.set(phone, session);

  await whatsapp.sendText(phone,
    `Great choice! 🎯 *${service}* it is.\n\nWhat's the name of your brand or business?`
  );
}

// ── Step 3: Brand name ────────────────────────────────────────
async function handleBrandName(phone, name, text, session) {
  if (text.length < 2) {
    await whatsapp.sendText(phone, 'Please share your brand name so we can personalise our proposal.');
    return;
  }

  session.data.brand_name = text;
  session.step = 'awaiting_city';
  sessions.set(phone, session);

  await whatsapp.sendText(phone,
    `Got it — *${text}* 👌\n\nWhich city is your business based in?`
  );
}

// ── Step 4: City → save lead → send confirmation ─────────────
async function handleCity(phone, name, text, session) {
  session.data.city = text;
  session.step = 'completed';
  sessions.set(phone, session);

  const lead = {
    name: session.data.name,
    phone,
    service: session.data.service,
    brand_name: session.data.brand_name,
    city: text,
    enquiry_time: session.data.enquiry_time,
    status: 'New Lead',
  };

  // Save to Google Sheets
  try {
    await sheets.appendLead(lead);
    console.log(`[Lead Saved] ${lead.brand_name} — ${lead.service}`);
  } catch (err) {
    console.error('[Lead Save Failed]', err.message);
  }

  // Notify admin on WhatsApp
  const adminPhone = process.env.ADMIN_PHONE;
  if (adminPhone) {
    await whatsapp.sendText(adminPhone,
      `🔔 *New Lead — Weinnovent*\n\n` +
      `👤 Name: ${lead.name}\n` +
      `📱 Phone: +${phone}\n` +
      `🏢 Brand: ${lead.brand_name}\n` +
      `📍 City: ${lead.city}\n` +
      `🎯 Service: ${lead.service}\n` +
      `🕐 Time: ${formatDate(new Date())}`
    );
  }

  // Confirmation to user
  await whatsapp.sendText(phone,
    `✅ *Thank you, ${lead.name}!*\n\n` +
    `We've noted your enquiry for *${lead.brand_name}* (${lead.city}) regarding *${lead.service}*.\n\n` +
    `Our team will reach out within *2 business hours* with a personalised proposal.\n\n` +
    `Meanwhile, check out our work:\n` +
    `🌐 https://weinnovent.com\n` +
    `📸 https://instagram.com/weinnovent\n\n` +
    `— *Weinnovent Studios, Bengaluru* 🌿`
  );
}

// ── Completed state: handle follow-up messages ────────────────
async function handleCompleted(phone, name, text, session) {
  if (text.includes('hello') || text.includes('hi') || text.includes('new')) {
    // Reset session for a new enquiry
    sessions.delete(phone);
    await handleStart(phone, name, text, { step: 'start', data: {} });
    return;
  }

  await whatsapp.sendText(phone,
    `Hi ${name}! Our team will be in touch shortly. ` +
    `For urgent queries, DM us on Instagram: @weinnovent 🌿\n\n` +
    `Type *Hello* to start a new enquiry.`
  );
}

module.exports = { handleInboundMessage };
