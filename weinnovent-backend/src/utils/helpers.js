// Format a date for display
function formatDate(date, style = 'full') {
  const d = date instanceof Date ? date : new Date(date);
  if (style === 'short') {
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
    timeZone: 'Asia/Kolkata',
  });
}

// Sleep helper for rate limiting
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Sanitize phone number to E.164 without +
function sanitizePhone(phone) {
  return phone.replace(/[^0-9]/g, '');
}

module.exports = { formatDate, sleep, sanitizePhone };
