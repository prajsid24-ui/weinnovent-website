require('dotenv').config();
const { google } = require('googleapis');

console.log('\n🔍 Testing Weinnovent Backend connections...\n');

async function test() {
  let passed = 0, failed = 0;

  const check = (label, value, hint = '') => {
    if (value) {
      console.log(`  ✅ ${label}`);
      passed++;
    } else {
      console.log(`  ❌ ${label}${hint ? ' — ' + hint : ''}`);
      failed++;
    }
  };

  // Env vars
  console.log('📋 Environment Variables:');
  check('WHATSAPP_TOKEN', !!process.env.WHATSAPP_TOKEN, 'Get from developers.facebook.com');
  check('WHATSAPP_PHONE_NUMBER_ID', !!process.env.WHATSAPP_PHONE_NUMBER_ID);
  check('WEBHOOK_VERIFY_TOKEN', !!process.env.WEBHOOK_VERIFY_TOKEN);
  check('GOOGLE_SERVICE_ACCOUNT_EMAIL', !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  check('GOOGLE_PRIVATE_KEY', !!process.env.GOOGLE_PRIVATE_KEY);
  check('LEADS_SHEET_ID', !!process.env.LEADS_SHEET_ID);
  check('ADMIN_PHONE', !!process.env.ADMIN_PHONE);
  check('INTERNAL_API_KEY', !!process.env.INTERNAL_API_KEY);

  // Google Sheets connection
  console.log('\n📊 Google Sheets:');
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.get({ spreadsheetId: process.env.LEADS_SHEET_ID });
    check(`Connected to sheet: "${res.data.properties.title}"`, true);
  } catch (err) {
    check('Google Sheets connection', false, err.message);
  }

  // WhatsApp API
  console.log('\n💬 WhatsApp API:');
  try {
    const axios = require('axios');
    const res = await axios.get(
      `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}`,
      { headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` } }
    );
    check(`Phone number verified: ${res.data.display_phone_number || res.data.id}`, true);
  } catch (err) {
    check('WhatsApp API connection', false, err.response?.data?.error?.message || err.message);
  }

  console.log(`\n${'─'.repeat(40)}`);
  console.log(`Result: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    console.log('\n⚠️  Fix the above issues before deploying.\n');
    process.exit(1);
  } else {
    console.log('\n🎉 All checks passed! Ready to deploy.\n');
  }
}

test().catch(console.error);
