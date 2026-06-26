# Secrets Setup Guide - Your API Key Integration

Complete step-by-step guide to securely set up your backend API key and other secrets.

## Table of Contents

1. [Quick Setup](#quick-setup)
2. [Manus Dashboard Setup](#manus-dashboard-setup)
3. [Local Development Setup](#local-development-setup)
4. [Using Secrets in Code](#using-secrets-in-code)
5. [Testing](#testing)
6. [Production Deployment](#production-deployment)

---

## Quick Setup

### Your API Key
```
API Key: sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb
```

### 3-Step Setup

1. **Add to Manus Secrets**
   - Go to Manus Dashboard → Settings → Secrets
   - Add: `BACKEND_API_KEY` = your key

2. **Create Local `.env` File**
   ```bash
   BACKEND_API_KEY=sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb
   ```

3. **Use in Code**
   ```typescript
   const apiKey = process.env.BACKEND_API_KEY;
   ```

---

## Manus Dashboard Setup

### Step 1: Access Manus Secrets

1. Go to **https://manus.im**
2. Log in to your account
3. Select your **sayadbayezid-backend** project
4. Go to **Settings** (gear icon)
5. Click **Secrets** tab

### Step 2: Add Your API Key

**Method A: Via Manus Dashboard**

1. Click **"Add Secret"** button
2. Fill in:
   - **Key:** `BACKEND_API_KEY`
   - **Value:** `sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb`
3. Click **Save**
4. Restart your server

**Method B: Using webdev_request_secrets Tool**

```typescript
// This will be done automatically by Manus
// Just add the secret in the dashboard
```

### Step 3: Verify Secret is Set

In your Manus project logs, you should see:
```
[INFO] Secrets loaded: 1 secret(s)
```

---

## Local Development Setup

### Step 1: Create `.env` File

In your project root, create `.env`:

```bash
# Backend API
BACKEND_API_KEY=sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb
BACKEND_API_URL=https://your-backend-url.com/api

# Database
DATABASE_URL=mysql://root:password@localhost:3306/bayezid_db

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
OWNER_EMAIL=owner@sayadbayezid.com

# OAuth
JWT_SECRET=your-super-secret-key-here

# Environment
NODE_ENV=development
```

### Step 2: Update `.gitignore`

Make sure `.env` is never committed:

```bash
# .gitignore
.env
.env.local
.env.*.local
.env.production
```

### Step 3: Load Environment Variables

Your Manus project should automatically load `.env` on startup.

To verify:
```bash
# In your project
npm run dev
# Check logs for: "Environment loaded"
```

---

## Using Secrets in Code

### Step 1: Access in `server/_core/env.ts`

```typescript
// server/_core/env.ts

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
  ownerEmail: process.env.OWNER_EMAIL,
  
  // Auth
  jwtSecret: process.env.JWT_SECRET,
  
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
```

### Step 2: Use in Procedures

**Example 1: Call External API with Your Key**

```typescript
// server/routers.ts
import { ENV } from './_core/env';

export const appRouter = router({
  // ... existing code ...
  
  // Call your backend API
  callBackendApi: publicProcedure
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
        return { success: true, data: result };
      } catch (error) {
        console.error('Backend API error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to process request'
        });
      }
    })
});
```

**Example 2: Newsletter with API Integration**

```typescript
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
      
      // Call your backend API
      try {
        await fetch(`${ENV.backendApiUrl}/subscribers`, {
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
      } catch (error) {
        console.warn('Backend API call failed:', error);
        // Continue anyway - data is saved locally
      }
      
      // Notify owner
      await notifyOwner({
        title: "New Newsletter Subscriber",
        content: `${input.subscriberName} (${input.subscriberEmail})`
      });
      
      return { success: true, id: result.insertId };
    })
})
```

### Step 3: Validate Secrets on Startup

```typescript
// server/_core/index.ts or server/_core/env.ts

// Validate required secrets
const requiredSecrets = [
  'BACKEND_API_KEY',
  'DATABASE_URL',
  'JWT_SECRET'
];

for (const secret of requiredSecrets) {
  if (!process.env[secret]) {
    console.error(`❌ Missing required secret: ${secret}`);
    throw new Error(`Missing required environment variable: ${secret}`);
  }
}

console.log('✅ All required secrets are configured');
```

---

## Testing

### Test 1: Verify Secret is Loaded

**In browser console:**

```javascript
// Call this endpoint to check if secrets are loaded
const response = await fetch('/api/trpc/system.health', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
});

const data = await response.json();
console.log(data);
```

### Test 2: Test API Call with Your Key

**In `server/routers.ts`:**

```typescript
// Add a test endpoint
testBackendApi: publicProcedure.query(async () => {
  try {
    const response = await fetch(`${ENV.backendApiUrl}/health`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ENV.backendApiKey}`,
      }
    });
    
    return {
      success: response.ok,
      status: response.status,
      message: response.statusText
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
})
```

**Call from frontend:**

```javascript
// In browser console
const result = await fetch('/api/trpc/testBackendApi', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
});

const data = await result.json();
console.log('Backend API test:', data);
```

### Test 3: Check Logs

```bash
# In your Manus project logs, look for:
# ✅ All required secrets are configured
# ✅ Backend API connection successful
# ❌ Any errors related to secrets
```

---

## Production Deployment

### Step 1: Add Secrets to Manus Production

1. Go to Manus Dashboard
2. Select your project
3. Go to **Settings → Secrets**
4. Add all secrets (same as local `.env`)

### Step 2: Different Secrets for Production

```bash
# Development (.env)
BACKEND_API_KEY=dev-key-xxx
BACKEND_API_URL=https://dev-api.example.com

# Production (Manus Secrets)
BACKEND_API_KEY=prod-key-yyy
BACKEND_API_URL=https://prod-api.example.com
```

### Step 3: Verify in Production

1. Deploy to Manus
2. Check production logs
3. Verify secrets are loaded
4. Test API calls

### Step 4: Monitor

```bash
# Check production logs regularly
# Look for any errors related to API calls
# Monitor API usage and rate limits
```

---

## Troubleshooting

### Issue: "Cannot read property of undefined"

**Cause:** Secret not loaded

**Solution:**
```typescript
// Add validation
if (!process.env.BACKEND_API_KEY) {
  throw new Error('BACKEND_API_KEY is not set');
}
```

### Issue: "401 Unauthorized"

**Cause:** Invalid API key

**Solution:**
1. Verify key is correct
2. Check it's set in Manus Secrets
3. Restart server
4. Check API key hasn't expired

### Issue: "Network Error"

**Cause:** Wrong API URL or network issue

**Solution:**
1. Verify `BACKEND_API_URL` is correct
2. Check backend is running
3. Check CORS is enabled
4. Test with curl: `curl -H "Authorization: Bearer YOUR_KEY" https://api.example.com/health`

### Issue: Secrets Not Loading Locally

**Cause:** `.env` file not found or not loaded

**Solution:**
```bash
# Verify .env exists
ls -la .env

# Verify it's in .gitignore
grep ".env" .gitignore

# Restart dev server
npm run dev
```

---

## Security Checklist

- [ ] API key is in `.env` (not in code)
- [ ] `.env` is in `.gitignore`
- [ ] `.env` is never committed to GitHub
- [ ] Secret is added to Manus Secrets
- [ ] No API key in logs
- [ ] No API key in error messages
- [ ] Different keys for dev/prod
- [ ] API key is validated on startup
- [ ] API key is rotated regularly
- [ ] Only necessary secrets are stored

---

## File Reference

### `.env` (Local)
```bash
BACKEND_API_KEY=your_key_here
```

### `.env.example` (Template - Commit to GitHub)
```bash
BACKEND_API_KEY=your_key_here
```

### `server/_core/env.ts` (Access Secrets)
```typescript
export const ENV = {
  backendApiKey: process.env.BACKEND_API_KEY,
};
```

### `server/routers.ts` (Use Secrets)
```typescript
import { ENV } from './_core/env';

// Use ENV.backendApiKey in your procedures
```

---

## Quick Reference

### Add Secret to Manus
```
1. Manus Dashboard → Settings → Secrets
2. Click "Add Secret"
3. Key: BACKEND_API_KEY
4. Value: your_key_here
5. Save
6. Restart server
```

### Create Local `.env`
```bash
cp .env.example .env
# Edit .env with your values
# Never commit .env
```

### Access Secret in Code
```typescript
import { ENV } from './_core/env';
const key = ENV.backendApiKey;
```

### Test Secret
```javascript
// In browser console
fetch('/api/trpc/testBackendApi', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
}).then(r => r.json()).then(console.log);
```

---

## Summary

```
Your API Key Setup:
1. ✅ Add to Manus Secrets
2. ✅ Create local .env file
3. ✅ Access via ENV object
4. ✅ Use in procedures
5. ✅ Test with endpoints
6. ✅ Deploy to production

Never:
❌ Commit .env to GitHub
❌ Log API keys
❌ Share keys in chat
❌ Use same key for dev/prod

Always:
✅ Use environment variables
✅ Validate on startup
✅ Handle errors gracefully
✅ Rotate keys regularly
```

---

**Your API key is now secure and ready to use!** 🔒

Follow this guide and your backend API integration will work perfectly.
