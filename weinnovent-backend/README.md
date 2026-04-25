# Weinnovent Studios — WhatsApp + Google Docs Backend

Production backend: WhatsApp Cloud API → Lead capture → Google Sheets + Google Docs reports.

---

## Architecture

```
Customer WhatsApp
      ↓
Meta Cloud API
      ↓
  /webhook  (Express)
      ↓
messageHandler.js  ←→  Conversation state (in-memory)
      ↓                        ↓
  Auto-reply           googleSheets.js
  (WhatsApp)           (append lead row)
                              ↓
                    /reports/generate
                              ↓
                    googleDocs.js
                    (create weekly report doc)
                              ↓
                    Admin WhatsApp notification
```

---

## Step 1 — Meta WhatsApp Cloud API Setup

### 1a. Create a Meta App
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create App → **Business** type
3. Add product: **WhatsApp**
4. Go to **WhatsApp → API Setup**

### 1b. Get your credentials
Copy these to `.env`:
- **Phone Number ID** → `WHATSAPP_PHONE_NUMBER_ID`
- **WhatsApp Business Account ID** → `WHATSAPP_BUSINESS_ACCOUNT_ID`
- **Temporary token** → Generate a **permanent token** (see 1c)

### 1c. Generate a permanent access token
1. Go to **Business Settings → System Users**
2. Create a System User → Add Assets → your WhatsApp app (Full Control)
3. Generate Token → select your app → check `whatsapp_business_messaging` + `whatsapp_business_management`
4. Copy token → `WHATSAPP_TOKEN`

### 1d. Register webhook (after deploying to Railway)
1. In WhatsApp → Configuration → Webhook
2. Callback URL: `https://YOUR-RAILWAY-URL.railway.app/webhook`
3. Verify token: same as `WEBHOOK_VERIFY_TOKEN` in your `.env`
4. Subscribe to: **messages**

---

## Step 2 — Google Service Account Setup

### 2a. Create a service account
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or use existing)
3. Enable APIs: **Google Sheets API** + **Google Docs API** + **Google Drive API**
4. Go to **IAM & Admin → Service Accounts** → Create Service Account
5. Name it `weinnovent-backend`, click Create
6. Grant role: **Editor**
7. Click the service account → **Keys → Add Key → JSON**
8. Download the JSON file

### 2b. Extract credentials from JSON
From the downloaded JSON:
```
GOOGLE_SERVICE_ACCOUNT_EMAIL = "client_email" value
GOOGLE_PRIVATE_KEY = "private_key" value (keep the \n characters)
```

### 2c. Create the Google Sheet
1. Create a new Google Sheet at [sheets.google.com](https://sheets.google.com)
2. Name it `Weinnovent Leads`
3. Create two tabs: **Leads** and **Reports**
4. **Share the sheet** with your service account email (Editor access)
5. Copy the Sheet ID from the URL:
   `docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit`
6. Set `LEADS_SHEET_ID` in `.env`

### 2d. Create the Google Doc (for reports)
1. Create a new Google Doc — reports will be auto-created as new docs each week
2. Share the Drive folder with your service account email
3. Set `REPORT_SHARE_EMAIL` to your personal Gmail so reports are shared with you

---

## Step 3 — Local Setup & Testing

```bash
# Clone / download the project
cd weinnovent-backend

# Install dependencies
npm install

# Copy and fill in environment variables
cp .env.example .env
# Edit .env with all your credentials

# Test all connections
npm test

# Run locally
npm run dev
```

Local webhook testing with ngrok:
```bash
# Install ngrok: ngrok.com
ngrok http 3000
# Use the https URL as your Meta webhook callback URL during development
```

---

## Step 4 — Deploy to Railway

### 4a. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/weinnovent-backend.git
git push -u origin main
```

### 4b. Deploy on Railway
1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Select your repo
3. Railway auto-detects Node.js and runs `node src/index.js`

### 4c. Add environment variables on Railway
Go to your service → **Variables** → add all variables from `.env`:

| Variable | Value |
|---|---|
| `PORT` | `3000` |
| `NODE_ENV` | `production` |
| `WHATSAPP_TOKEN` | Your permanent token |
| `WHATSAPP_PHONE_NUMBER_ID` | From Meta |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | From Meta |
| `WEBHOOK_VERIFY_TOKEN` | Any secret string |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | From JSON key |
| `GOOGLE_PRIVATE_KEY` | From JSON key |
| `LEADS_SHEET_ID` | From Sheet URL |
| `ADMIN_PHONE` | Your WhatsApp number (919876543210) |
| `REPORT_SHARE_EMAIL` | Your Gmail |
| `INTERNAL_API_KEY` | Any strong random string |

### 4d. Get your Railway URL
After deploy: `https://weinnovent-backend-production.up.railway.app`

### 4e. Register webhook with Meta
Use your Railway URL: `https://YOUR-URL.railway.app/webhook`

---

## Step 5 — Set Up Weekly Reports (Railway Cron)

1. In Railway → your project → **New Service → Cron**
2. Schedule: `0 9 * * MON` (Every Monday at 9am IST)
3. Command:
```bash
curl -X POST https://YOUR-URL.railway.app/reports/generate \
  -H "x-api-key: YOUR_INTERNAL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"days": 7, "notifyAdmin": true}'
```

---

## API Reference

### Health Check
```
GET /health
```

### Inbound (auto — called by Meta)
```
GET  /webhook    ← Meta verification
POST /webhook    ← Incoming messages
```

### Send Messages (requires x-api-key header)
```
POST /send/message
Body: { "to": "919876543210", "message": "Hello!" }

POST /send/template
Body: { "to": "919876543210", "templateName": "welcome_message", "languageCode": "en" }

POST /send/campaign
Body: { "numbers": ["91..."], "templateName": "promo_launch" }

POST /send/lead-followup
Body: { "phone": "919876543210", "name": "Raj", "service": "Branding" }
```

### Reports (requires x-api-key header)
```
POST /reports/generate
Body: { "days": 7, "notifyAdmin": true }

GET  /reports/leads?days=7
```

---

## WhatsApp Conversation Flow

```
Customer: "Hi"
Bot: Welcome menu with 6 service options

Customer: Selects "Branding"
Bot: "What's your brand name?"

Customer: "Raj Interiors"
Bot: "Which city?"

Customer: "Bengaluru"
Bot: ✅ Confirmation message + links
     → Lead saved to Google Sheets
     → Admin notified on WhatsApp
```

---

## Files

```
src/
├── index.js                   Main Express server
├── routes/
│   ├── webhook.js             Meta webhook (inbound)
│   ├── outbound.js            Send message APIs
│   ├── reports.js             Report generation
│   └── health.js              Health check
├── handlers/
│   └── messageHandler.js      Conversation flow logic
├── services/
│   ├── whatsapp.js            WhatsApp API wrapper
│   ├── googleSheets.js        Sheets read/write
│   └── googleDocs.js          Docs report generator
└── utils/
    ├── helpers.js             Date formatting, etc.
    └── test-connection.js     Credential verification
```

---

## Troubleshooting

**Webhook not verifying?**
→ Check `WEBHOOK_VERIFY_TOKEN` matches exactly in `.env` and Meta dashboard

**Messages not sending?**
→ Run `npm test` to verify token
→ Check phone number is in E.164 format without + (e.g. `919876543210`)
→ For new numbers, you can only message opted-in users in the first 24h

**Google Sheets error?**
→ Make sure you shared the sheet with the service account email
→ Check `GOOGLE_PRIVATE_KEY` has real newlines (Railway handles `\n` automatically)

**Railway deploy failing?**
→ Check `node --version` is ≥ 18 in Railway settings
→ Check all required env variables are set

---

© 2026 Weinnovent Studios
