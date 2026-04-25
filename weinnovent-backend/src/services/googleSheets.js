const { google } = require('googleapis');
const { formatDate } = require('../utils/helpers');

// ── Auth ──────────────────────────────────────────────────────
function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });
}

function getSheetsClient() {
  return google.sheets({ version: 'v4', auth: getAuth() });
}

const SHEET_ID = process.env.LEADS_SHEET_ID;
const LEADS_TAB = 'Leads';         // Tab name for leads
const REPORTS_TAB = 'Reports';     // Tab name for report log

// ── Ensure header row exists ──────────────────────────────────
async function ensureHeaders(sheets) {
  const LEAD_HEADERS = [
    'Timestamp', 'Name', 'Phone', 'Brand Name', 'City',
    'Service Enquired', 'Status', 'Notes',
  ];

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${LEADS_TAB}!A1:H1`,
    });

    if (!res.data.values || res.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${LEADS_TAB}!A1:H1`,
        valueInputOption: 'RAW',
        requestBody: { values: [LEAD_HEADERS] },
      });
      console.log('[Sheets] Headers created');
    }
  } catch (err) {
    console.error('[Sheets] Header check failed:', err.message);
  }
}

// ── Append a new lead row ─────────────────────────────────────
async function appendLead(lead) {
  const sheets = getSheetsClient();
  await ensureHeaders(sheets);

  const row = [
    formatDate(new Date(lead.enquiry_time || new Date())),
    lead.name || '',
    lead.phone || '',
    lead.brand_name || '',
    lead.city || '',
    lead.service || '',
    lead.status || 'New Lead',
    lead.notes || '',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${LEADS_TAB}!A:H`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });

  return row;
}

// ── Update lead status (by row index or phone number) ────────
async function updateLeadStatus(phone, status, notes = '') {
  const sheets = getSheetsClient();

  // Find row with matching phone
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${LEADS_TAB}!A:H`,
  });

  const rows = res.data.values || [];
  const rowIndex = rows.findIndex(r => r[2] === phone);
  if (rowIndex === -1) return null;

  const actualRow = rowIndex + 1; // 1-indexed
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${LEADS_TAB}!G${actualRow}:H${actualRow}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[status, notes]] },
  });

  return actualRow;
}

// ── Get all leads (for report generation) ────────────────────
async function getAllLeads() {
  const sheets = getSheetsClient();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${LEADS_TAB}!A:H`,
  });

  const rows = res.data.values || [];
  if (rows.length <= 1) return []; // Only headers

  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i] || ''; });
    return obj;
  });
}

// ── Get leads from the last N days ───────────────────────────
async function getRecentLeads(days = 7) {
  const all = await getAllLeads();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  return all.filter(lead => {
    try {
      const d = new Date(lead['Timestamp']);
      return d >= cutoff;
    } catch {
      return false;
    }
  });
}

// ── Log a report entry to the Reports tab ────────────────────
async function logReport(reportTitle, docUrl) {
  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${REPORTS_TAB}!A:C`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[formatDate(new Date()), reportTitle, docUrl]],
    },
  });
}

module.exports = {
  appendLead,
  updateLeadStatus,
  getAllLeads,
  getRecentLeads,
  logReport,
};
