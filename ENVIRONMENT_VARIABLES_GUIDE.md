# Environment Variables & Secrets Management Guide

Complete guide for securely managing API keys and sensitive data in your Manus backend.

## Table of Contents

1. [Overview](#overview)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Secrets Management](#secrets-management)
4. [Backend Configuration](#backend-configuration)
5. [Security Best Practices](#security-best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Overview

### Why Use Environment Variables?

- ✅ Keep sensitive data out of code
- ✅ Never commit API keys to GitHub
- ✅ Different values for dev/production
- ✅ Easy to rotate credentials
- ✅ Secure by default

### What Goes in Environment Variables?

| Type | Examples |
|------|----------|
| **API Keys** | Backend API key, SendGrid key, Stripe key |
| **Database Credentials** | DB host, user, password |
| **URLs** | Backend URL, frontend URL, OAuth URLs |
| **Secrets** | JWT secret, encryption keys |
| **Configuration** | Environment (dev/prod), feature flags |

---

## Environment Variables Setup

### Step 1: Create `.env` File (Local Development)

In your Manus backend project root, create `.env`:

```bash
# Backend Configuration
BACKEND_API_KEY=sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb
BACKEND_API_URL=https://your-backend-url.com/api

# Database
DATABASE_URL=mysql://user:password@localhost:3306/bayezid_db
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bayezid_db
DB_USER=root
DB_PASSWORD=your_password

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@sayadbayezid.com
OWNER_EMAIL=owner@sayadbayezid.com

# OAuth
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
JWT_SECRET=your-super-secret-jwt-key-here

# Frontend URLs
FRONTEND_URL=http://localhost:3000
GITHUB_PAGES_URL=https://yourusername.github.io/sayadbayezid

# Feature Flags
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_LOGGING=true

# Environment
NODE_ENV=development
```

### Step 2: Create `.env.example` (Template)

Create `.env.example` for your team (WITHOUT sensitive values):

```bash
# Backend Configuration
BACKEND_API_KEY=your_api_key_here
BACKEND_API_URL=https://your-backend-url.com/api

# Database
DATABASE_URL=mysql://user:password@localhost:3306/bayezid_db
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bayezid_db
DB_USER=root
DB_PASSWORD=your_password

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@sayadbayezid.com
OWNER_EMAIL=owner@sayadbayezid.com

# OAuth
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
JWT_SECRET=your-super-secret-jwt-key-here

# Frontend URLs
FRONTEND_URL=http://localhost:3000
GITHUB_PAGES_URL=https://yourusername.github.io/sayadbayezid

# Feature Flags
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_LOGGING=true

# Environment
NODE_ENV=development
```

### Step 3: Update `.gitignore`

Ensure `.env` is never committed:

```bash
# Environment variables
.env
.env.local
.env.*.local
.env.production

# Keep this file in repo (template only)
# .env.example
```

---

## Secrets Management

### For Manus Backend

Manus automatically manages secrets. Use the `webdev_request_secrets` tool to add secrets:

```typescript
// In your Manus project, secrets are injected as environment variables
const apiKey = process.env.BACKEND_API_KEY;
const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
```

### Accessing Secrets in Code

**In `server/_core/env.ts`:**

```typescript
export const ENV = {
  // Backend API
  backendApiKey: process.env.BACKEND_API_KEY,
  backendApiUrl: process.env.BACKEND_API_URL,
  
  // Database
  databaseUrl: process.env.DATABASE_URL,
  
  // Email
  smtpHost: process.env.SMTP_HOST,
  smtpPort: parseInt(process.env.SMTP_PORT || '587'),
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpFrom: process.env.SMTP_FROM,
  ownerEmail: process.env.OWNER_EMAIL,
  
  // OAuth
  oauthServerUrl: process.env.OAUTH_SERVER_URL,
  jwtSecret: process.env.JWT_SECRET,
  
  // URLs
  frontendUrl: process.env.FRONTEND_URL,
  githubPagesUrl: process.env.GITHUB_PAGES_URL,
  
  // Feature flags
  enableEmailNotifications: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
  enablePushNotifications: process.env.ENABLE_PUSH_NOTIFICATIONS === 'true',
  enableLogging: process.env.ENABLE_LOGGING === 'true',
  
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
```

### Using Secrets in Procedures

**Example: Using API Key in tRPC procedure**

```typescript
import { ENV } from './_core/env';

export const appRouter = router({
  // ... existing code ...
  
  // Example: Call external API with your backend API key
  externalApi: publicProcedure
    .input(z.object({ data: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(`${ENV.backendApiUrl}/process`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ENV.backendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input)
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        
        const result = await response.json();
        return result;
      } catch (error) {
        console.error('External API call failed:', error);
        throw error;
      }
    })
});
```

---

## Backend Configuration

### Step 1: Set Up Environment in Manus

1. Go to your Manus project dashboard
2. Navigate to **Settings → Secrets**
3. Add each secret one by one:

| Key | Value | Description |
|-----|-------|-------------|
| `BACKEND_API_KEY` | `sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb` | Your portfolio backend API key |
| `DATABASE_URL` | `mysql://user:pass@host:3306/db` | Database connection string |
| `SMTP_HOST` | `smtp.gmail.com` | Email server host |
| `SMTP_USER` | `your-email@gmail.com` | Email account |
| `SMTP_PASSWORD` | `app-password` | Email password |
| `OWNER_EMAIL` | `owner@sayadbayezid.com` | Your email for notifications |
| `JWT_SECRET` | `your-secret-key` | Session encryption key |

### Step 2: Verify Secrets Are Set

In browser console or backend logs:

```typescript
console.log('Environment loaded:', {
  hasApiKey: !!process.env.BACKEND_API_KEY,
  hasDb: !!process.env.DATABASE_URL,
  hasEmail: !!process.env.SMTP_USER,
  nodeEnv: process.env.NODE_ENV
});
```

### Step 3: Test Secret Access

Create a test endpoint:

```typescript
testSecrets: publicProcedure.query(() => {
  return {
    hasApiKey: !!process.env.BACKEND_API_KEY,
    hasDatabase: !!process.env.DATABASE_URL,
    hasEmail: !!process.env.SMTP_USER,
    environment: process.env.NODE_ENV,
    // Don't return actual values!
  };
})
```

---

## Security Best Practices

### ✅ DO

- ✅ Use environment variables for ALL sensitive data
- ✅ Keep `.env` in `.gitignore`
- ✅ Rotate API keys regularly
- ✅ Use strong, unique secrets
- ✅ Different secrets for dev/prod
- ✅ Document what each secret is for
- ✅ Use `.env.example` as template
- ✅ Never log sensitive data
- ✅ Validate all environment variables on startup

### ❌ DON'T

- ❌ Commit `.env` to GitHub
- ❌ Hardcode API keys in code
- ❌ Share secrets in chat/email
- ❌ Use same secrets for dev/prod
- ❌ Log API keys or passwords
- ❌ Push secrets to public repositories
- ❌ Use weak or generic secrets
- ❌ Leave default credentials unchanged

---

## Using Your API Key

### Example: Newsletter Integration

**In `server/routers.ts`:**

```typescript
import { ENV } from './_core/env';

export const appRouter = router({
  newsletters: router({
    subscribe: publicProcedure
      .input(z.object({
        subscriberEmail: z.string().email(),
        subscriberName: z.string()
      }))
      .mutation(async ({ input }) => {
        // Save to database
        const result = await db.insert(subscribers).values({
          email: input.subscriberEmail,
          name: input.subscriberName
        });
        
        // Call your backend API with the API key
        try {
          const response = await fetch(`${ENV.backendApiUrl}/newsletter/subscribe`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${ENV.backendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: input.subscriberEmail,
              name: input.subscriberName
            })
          });
          
          if (!response.ok) {
            console.warn('Backend API warning:', response.statusText);
          }
        } catch (error) {
          console.error('Backend API call failed:', error);
          // Continue even if backend call fails
        }
        
        // Send notification to owner
        await notifyOwner({
          title: "New Newsletter Subscriber",
          content: `${input.subscriberName} (${input.subscriberEmail}) subscribed`
        });
        
        return { success: true, id: result.insertId };
      })
  })
});
```

---

## Environment Variables Reference

### All Available Variables

```bash
# ============================================
# BACKEND API
# ============================================
BACKEND_API_KEY=your_api_key
BACKEND_API_URL=https://api.example.com

# ============================================
# DATABASE
# ============================================
DATABASE_URL=mysql://user:pass@host:3306/db
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bayezid_db
DB_USER=root
DB_PASSWORD=password

# ============================================
# EMAIL / NOTIFICATIONS
# ============================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=email@gmail.com
SMTP_PASSWORD=app-password
SMTP_FROM=noreply@sayadbayezid.com
OWNER_EMAIL=owner@sayadbayezid.com

# ============================================
# AUTHENTICATION
# ============================================
JWT_SECRET=your-secret-key
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im

# ============================================
# URLS
# ============================================
FRONTEND_URL=http://localhost:3000
GITHUB_PAGES_URL=https://yourusername.github.io/sayadbayezid
MANUS_BACKEND_URL=https://3000-xxx.manus.computer/api/trpc

# ============================================
# FEATURE FLAGS
# ============================================
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_LOGGING=true

# ============================================
# ENVIRONMENT
# ============================================
NODE_ENV=development
```

---

## Troubleshooting

### Issue: "Cannot read property of undefined"

**Cause:** Environment variable not set

**Solution:**
```typescript
// Add validation on startup
if (!process.env.BACKEND_API_KEY) {
  throw new Error('BACKEND_API_KEY is not set in environment variables');
}
```

### Issue: API Key Not Working

**Cause:** Wrong API key or format

**Solution:**
1. Verify API key is correct
2. Check it's set in Manus Secrets
3. Restart the server
4. Check logs for errors

### Issue: Database Connection Failed

**Cause:** Wrong DATABASE_URL

**Solution:**
```bash
# Correct format:
mysql://username:password@host:port/database
```

### Issue: Secrets Not Loading

**Cause:** Server not restarted after adding secrets

**Solution:**
1. Add secrets in Manus dashboard
2. Restart the server
3. Check in logs that secrets are loaded

---

## Deployment Checklist

- [ ] All secrets added to Manus dashboard
- [ ] `.env` file in `.gitignore`
- [ ] `.env.example` committed to GitHub (without values)
- [ ] No API keys in code
- [ ] No secrets in logs
- [ ] Different secrets for dev/prod
- [ ] Secrets validated on startup
- [ ] Error handling for missing secrets
- [ ] Documentation updated
- [ ] Team informed of secret locations

---

## Quick Reference

### Add Secret to Manus

1. Go to Manus dashboard
2. Settings → Secrets
3. Click "Add Secret"
4. Enter key and value
5. Save
6. Restart server

### Access Secret in Code

```typescript
import { ENV } from './_core/env';

const apiKey = ENV.backendApiKey;
const dbUrl = ENV.databaseUrl;
```

### Test Secret

```typescript
// In tRPC procedure
console.log('Secret loaded:', !!process.env.BACKEND_API_KEY);
```

---

## Support

For issues:
1. Check `.env` file exists
2. Verify secrets in Manus dashboard
3. Check server logs
4. Restart server
5. Review this guide

---

**Your secrets are now secure!** 🔒

Follow this guide and your API keys will be safely managed and never exposed.
