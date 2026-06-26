# GitHub Secrets - Complete Setup Guide

Complete guide to set up ALL GitHub Secrets for your repository. Copy and paste these exact steps.

## 🎯 Goal

Set up all GitHub Secrets so your live site works perfectly with email notifications to `sayadmdbayezidhosan@gmail.com`.

---

## Step 1: Go to GitHub Secrets

1. Open: **https://github.com/bayeziddev/sayadbayezid/settings/secrets/actions**
2. You should see: **"Actions secrets and variables"**
3. Click **"New repository secret"** button

---

## Step 2: Add All Secrets (Copy & Paste)

Add each secret one by one. For each secret:
1. Click **"New repository secret"**
2. Copy the **Name** and **Value** from below
3. Paste into GitHub
4. Click **"Add secret"**

### Secret 1: BACKEND_API_KEY

| Field | Value |
|-------|-------|
| **Name** | `BACKEND_API_KEY` |
| **Value** | `sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb` |

### Secret 2: OWNER_EMAIL

| Field | Value |
|-------|-------|
| **Name** | `OWNER_EMAIL` |
| **Value** | `sayadmdbayezidhosan@gmail.com` |

### Secret 3: SMTP_HOST

| Field | Value |
|-------|-------|
| **Name** | `SMTP_HOST` |
| **Value** | `smtp.gmail.com` |

### Secret 4: SMTP_PORT

| Field | Value |
|-------|-------|
| **Name** | `SMTP_PORT` |
| **Value** | `587` |

### Secret 5: SMTP_USER

| Field | Value |
|-------|-------|
| **Name** | `SMTP_USER` |
| **Value** | `your-gmail@gmail.com` |

**Note:** Replace `your-gmail@gmail.com` with your actual Gmail address

### Secret 6: SMTP_PASSWORD

| Field | Value |
|-------|-------|
| **Name** | `SMTP_PASSWORD` |
| **Value** | Your 16-character Gmail app password |

**How to get Gmail app password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Paste it here

### Secret 7: SMTP_FROM

| Field | Value |
|-------|-------|
| **Name** | `SMTP_FROM` |
| **Value** | `noreply@sayadbayezid.com` |

### Secret 8: DATABASE_URL

| Field | Value |
|-------|-------|
| **Name** | `DATABASE_URL` |
| **Value** | `mysql://root:password@localhost:3306/bayezid_db` |

**Note:** Update with your actual database credentials

### Secret 9: JWT_SECRET

| Field | Value |
|-------|-------|
| **Name** | `JWT_SECRET` |
| **Value** | Your secret key (e.g., `your-super-secret-key-12345`) |

### Secret 10: BACKEND_API_URL

| Field | Value |
|-------|-------|
| **Name** | `BACKEND_API_URL` |
| **Value** | `https://your-manus-backend.com/api` |

**Note:** Replace with your actual Manus backend URL

### Secret 11: FRONTEND_URL

| Field | Value |
|-------|-------|
| **Name** | `FRONTEND_URL` |
| **Value** | `https://yourusername.github.io/sayadbayezid` |

**Note:** Replace `yourusername` with your GitHub username

---

## Step 3: Verify All Secrets Added

After adding all secrets:

1. Go to: **https://github.com/bayeziddev/sayadbayezid/settings/secrets/actions**
2. You should see **11 secrets** listed:
   - ✅ BACKEND_API_KEY
   - ✅ OWNER_EMAIL
   - ✅ SMTP_HOST
   - ✅ SMTP_PORT
   - ✅ SMTP_USER
   - ✅ SMTP_PASSWORD
   - ✅ SMTP_FROM
   - ✅ DATABASE_URL
   - ✅ JWT_SECRET
   - ✅ BACKEND_API_URL
   - ✅ FRONTEND_URL

3. All values should be hidden (showing dots)

---

## Step 4: Quick Reference Table

Copy this table for easy reference:

| # | Name | Value | Status |
|---|------|-------|--------|
| 1 | `BACKEND_API_KEY` | `sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb` | ✅ |
| 2 | `OWNER_EMAIL` | `sayadmdbayezidhosan@gmail.com` | ✅ |
| 3 | `SMTP_HOST` | `smtp.gmail.com` | ✅ |
| 4 | `SMTP_PORT` | `587` | ✅ |
| 5 | `SMTP_USER` | `your-gmail@gmail.com` | ⏳ |
| 6 | `SMTP_PASSWORD` | Your app password | ⏳ |
| 7 | `SMTP_FROM` | `noreply@sayadbayezid.com` | ✅ |
| 8 | `DATABASE_URL` | Your DB URL | ⏳ |
| 9 | `JWT_SECRET` | Your secret key | ⏳ |
| 10 | `BACKEND_API_URL` | Your backend URL | ⏳ |
| 11 | `FRONTEND_URL` | Your GitHub Pages URL | ⏳ |

---

## Step 5: Test Secrets Are Working

### Test 1: Check Secrets in GitHub Actions

1. Go to **Actions** tab in GitHub
2. Look for recent workflow runs
3. Click on a run
4. Expand **Deploy** job
5. Look for: `Secrets loaded successfully`

### Test 2: Submit a Form

1. Open your live site: `https://yourusername.github.io/sayadbayezid`
2. Fill out a form (newsletter, inquiry, order, or feedback)
3. Submit
4. Check email at `sayadmdbayezidhosan@gmail.com`
5. Should receive notification email

### Test 3: Check Backend Logs

1. Go to Manus Dashboard
2. View project logs
3. Look for: `[Email] Sent to sayadmdbayezidhosan@gmail.com`

---

## Troubleshooting

### Problem: Secret not showing in list

**Solution:**
1. Refresh the page
2. Go back to settings
3. Go to Secrets again
4. Secret should appear

### Problem: "Secret already exists"

**Solution:**
1. Click on the existing secret
2. Update the value
3. Click "Update secret"

### Problem: Email not received

**Solution:**
1. Verify `SMTP_USER` and `SMTP_PASSWORD` are correct
2. Verify `OWNER_EMAIL` is correct
3. Check spam folder
4. Check backend logs for errors
5. Test with `sendTestEmail` endpoint

### Problem: "Authentication failed"

**Solution:**
1. Verify Gmail app password is correct (16 characters)
2. Generate new app password from Gmail
3. Update `SMTP_PASSWORD` secret
4. Restart backend

---

## Summary Checklist

After completing all steps, verify:

- [ ] All 11 secrets added to GitHub
- [ ] All secrets showing in Actions secrets list
- [ ] All values are correct
- [ ] Gmail app password is 16 characters
- [ ] `OWNER_EMAIL` is `sayadmdbayezidhosan@gmail.com`
- [ ] Backend URL is correct
- [ ] Frontend URL is correct
- [ ] Database URL is correct
- [ ] Test email received
- [ ] Form submission works
- [ ] Email notification received

---

## What Happens After Setup

```
User submits form on live site
         ↓
Data sent to backend
         ↓
Data saved to database
         ↓
Email sent to sayadmdbayezidhosan@gmail.com
         ↓
Owner receives notification
```

---

**All GitHub Secrets are now configured!** ✅

Your live site is ready for client review with full email notifications working perfectly.
