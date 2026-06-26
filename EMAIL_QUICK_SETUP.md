# Email Notifications - Quick Setup (5 Minutes)

Fast setup guide to get email notifications working for `sayadmdbayezidhosan@gmail.com`.

## 🎯 Goal

All form submissions send emails to: **sayadmdbayezidhosan@gmail.com**

## ⚡ Quick Setup (5 Steps)

### Step 1: Get Gmail App Password (2 min)

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Save it (you'll need it in next steps)

### Step 2: Add to Local `.env` (1 min)

```bash
# Add to .env file
OWNER_EMAIL=sayadmdbayezidhosan@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
SMTP_FROM=noreply@sayadbayezid.com
```

### Step 3: Add to GitHub Secrets (1 min)

Go to: https://github.com/bayeziddev/sayadbayezid/settings/secrets/actions

Add these secrets:
- `OWNER_EMAIL` = `sayadmdbayezidhosan@gmail.com`
- `SMTP_HOST` = `smtp.gmail.com`
- `SMTP_PORT` = `587`
- `SMTP_USER` = your-gmail@gmail.com
- `SMTP_PASSWORD` = xxxx xxxx xxxx xxxx
- `SMTP_FROM` = noreply@sayadbayezid.com

### Step 4: Add to Manus Secrets (1 min)

1. Go to Manus Dashboard
2. Settings → Secrets
3. Add same secrets as Step 3
4. Restart server

### Step 5: Test (Optional, 1 min)

```javascript
// In browser console (F12)
fetch('/api/trpc/system.sendTestEmail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
})
.then(r => r.json())
.then(data => console.log('Email test:', data));
```

Check email inbox for test message.

---

## ✅ Verification

After setup, verify:

- [ ] `.env` file has all email settings
- [ ] GitHub Secrets has all email settings
- [ ] Manus Secrets has all email settings
- [ ] Server restarted
- [ ] Test email received (optional)

---

## 📧 What Happens Now

When someone submits a form:

1. ✅ Data saved to database
2. ✅ Email sent to `sayadmdbayezidhosan@gmail.com`
3. ✅ Push notification sent (if enabled)

**Email subjects:**
- 🎉 New Newsletter Subscriber
- 📧 New Client Inquiry
- 🛒 New Service Order
- ⭐ New Feedback - X Stars

---

## 🔧 Environment Variables Reference

```bash
# Owner email (where to send notifications)
OWNER_EMAIL=sayadmdbayezidhosan@gmail.com

# Gmail SMTP settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx

# From address in emails
SMTP_FROM=noreply@sayadbayezid.com
```

---

## ⚠️ Important Notes

- Use **app password**, not regular Gmail password
- Enable 2-Factor Authentication on Gmail first
- Different app password for each service
- Keep app password secret (like API key)
- Add to GitHub Secrets (not in code)

---

## 🆘 Troubleshooting

### Email not received?

1. Check spam folder
2. Verify email address is correct
3. Check backend logs for errors
4. Verify SMTP credentials
5. Test with `sendTestEmail` endpoint

### "Authentication failed"?

1. Verify app password is correct
2. Generate new app password
3. Update in all places (`.env`, GitHub, Manus)
4. Restart server

### "Email not configured"?

1. Verify `SMTP_USER` is set
2. Verify `SMTP_PASSWORD` is set
3. Check `.env` file
4. Restart server

---

## 📚 Full Documentation

For detailed setup, see: **EMAIL_NOTIFICATIONS_SETUP.md**

---

**That's it!** 🎉

Your email notifications are now configured to send to `sayadmdbayezidhosan@gmail.com`.
