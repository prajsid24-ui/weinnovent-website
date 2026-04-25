const { google } = require('googleapis');
const { formatDate } = require('../utils/helpers');

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/drive',
    ],
  });
}

function getDocsClient() {
  return google.docs({ version: 'v1', auth: getAuth() });
}

function getDriveClient() {
  return google.drive({ version: 'v3', auth: getAuth() });
}

// ── Create a new Google Doc from report data ─────────────────
async function createWeeklyReport(leads) {
  const docs = getDocsClient();
  const drive = getDriveClient();

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 7);
  const title = `Weinnovent Studios — Weekly Report (${formatDate(weekStart, 'short')} to ${formatDate(now, 'short')})`;

  // Create blank doc
  const created = await docs.documents.create({ requestBody: { title } });
  const docId = created.data.documentId;
  const docUrl = `https://docs.google.com/document/d/${docId}/edit`;

  // Share with the owner email (service accounts create private docs)
  const ownerEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  if (process.env.REPORT_SHARE_EMAIL) {
    await drive.permissions.create({
      fileId: docId,
      requestBody: {
        type: 'user',
        role: 'writer',
        emailAddress: process.env.REPORT_SHARE_EMAIL,
      },
    });
  }

  // Build statistics
  const stats = buildStats(leads);

  // Write report content via batchUpdate
  const requests = buildDocRequests(title, stats, leads, now, weekStart);

  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: { requests },
  });

  console.log(`[Docs] Report created: ${docUrl}`);
  return { docId, docUrl, title };
}

// ── Build statistical summary ─────────────────────────────────
function buildStats(leads) {
  const total = leads.length;
  const byService = {};
  const byCity = {};
  const byStatus = {};

  leads.forEach(l => {
    const s = l['Service Enquired'] || 'Unknown';
    const c = l['City'] || 'Unknown';
    const st = l['Status'] || 'New Lead';
    byService[s] = (byService[s] || 0) + 1;
    byCity[c] = (byCity[c] || 0) + 1;
    byStatus[st] = (byStatus[st] || 0) + 1;
  });

  const topService = Object.entries(byService).sort((a, b) => b[1] - a[1])[0];
  const topCity = Object.entries(byCity).sort((a, b) => b[1] - a[1])[0];

  return { total, byService, byCity, byStatus, topService, topCity };
}

// ── Build Google Docs batchUpdate requests ────────────────────
function buildDocRequests(title, stats, leads, now, weekStart) {
  const requests = [];
  let index = 1; // Track insertion index

  const insert = (text, style = 'NORMAL_TEXT') => {
    requests.push({
      insertText: { location: { index }, text },
    });
    if (style !== 'NORMAL_TEXT') {
      requests.push({
        updateParagraphStyle: {
          range: { startIndex: index, endIndex: index + text.length },
          paragraphStyle: { namedStyleType: style },
          fields: 'namedStyleType',
        },
      });
    }
    index += text.length;
  };

  // Title
  insert(`${title}\n`, 'TITLE');
  insert(`Generated on ${formatDate(now)} | Period: ${formatDate(weekStart, 'short')} – ${formatDate(now, 'short')}\n\n`, 'SUBTITLE');

  // Summary
  insert('📊 Executive Summary\n', 'HEADING_1');
  insert(`Total Enquiries This Week: ${stats.total}\n`);
  insert(`Top Service: ${stats.topService ? `${stats.topService[0]} (${stats.topService[1]} leads)` : 'N/A'}\n`);
  insert(`Top City: ${stats.topCity ? `${stats.topCity[0]} (${stats.topCity[1]} leads)` : 'N/A'}\n\n`);

  // By Service
  insert('🎯 Leads by Service\n', 'HEADING_2');
  Object.entries(stats.byService).sort((a, b) => b[1] - a[1]).forEach(([s, n]) => {
    const pct = stats.total > 0 ? Math.round((n / stats.total) * 100) : 0;
    insert(`• ${s}: ${n} leads (${pct}%)\n`);
  });
  insert('\n');

  // By City
  insert('📍 Leads by City\n', 'HEADING_2');
  Object.entries(stats.byCity).sort((a, b) => b[1] - a[1]).forEach(([c, n]) => {
    insert(`• ${c}: ${n} leads\n`);
  });
  insert('\n');

  // By Status
  insert('🔄 Lead Status Breakdown\n', 'HEADING_2');
  Object.entries(stats.byStatus).forEach(([s, n]) => {
    insert(`• ${s}: ${n}\n`);
  });
  insert('\n');

  // All leads table header
  insert('📋 All Leads This Week\n', 'HEADING_1');
  insert('Timestamp | Name | Phone | Brand | City | Service | Status\n');
  insert('──────────────────────────────────────────────────────────\n');

  leads.forEach(l => {
    const row = [
      l['Timestamp'] || '',
      l['Name'] || '',
      l['Phone'] || '',
      l['Brand Name'] || '',
      l['City'] || '',
      l['Service Enquired'] || '',
      l['Status'] || '',
    ].join(' | ');
    insert(`${row}\n`);
  });

  insert('\n\n');
  insert('─────────────────────────────────────────\n');
  insert(`Weinnovent Studios | Bengaluru, India | weinnovent.com\n`);
  insert(`Report auto-generated by Weinnovent Backend\n`);

  return requests;
}

// ── Append content to an existing doc ────────────────────────
async function appendToDoc(docId, text) {
  const docs = getDocsClient();
  const doc = await docs.documents.get({ documentId: docId });
  const endIndex = doc.data.body.content.slice(-1)[0].endIndex - 1;

  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: {
      requests: [{
        insertText: { location: { index: endIndex }, text: `\n${text}` },
      }],
    },
  });
}

module.exports = { createWeeklyReport, appendToDoc };
