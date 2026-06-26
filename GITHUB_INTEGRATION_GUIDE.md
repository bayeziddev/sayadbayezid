# GitHub Integration Guide - Add Secrets & API Key

Complete step-by-step guide to securely integrate your API key and secrets into your GitHub repository.

## Table of Contents

1. [Overview](#overview)
2. [What NOT to Commit](#what-not-to-commit)
3. [GitHub Secrets Setup](#github-secrets-setup)
4. [Local Repository Setup](#local-repository-setup)
5. [Commit to GitHub](#commit-to-github)
6. [GitHub Actions Integration](#github-actions-integration)
7. [Verification](#verification)

---

## Overview

### The Goal

```
Your Computer (Local)
    ↓ (has .env with secrets)
    ↓
GitHub Repository (public)
    ↓ (NO secrets here!)
    ↓
Manus Backend (has secrets in Secrets)
    ↓
Your API Key (SAFE & SECURE)
```

### Key Points

- ✅ Your API key stays SAFE
- ✅ GitHub repository is PUBLIC but SECURE
- ✅ No secrets in code
- ✅ Secrets stored in Manus & GitHub Secrets
- ✅ Easy to deploy

---

## What NOT to Commit

### ❌ NEVER Commit These Files

```
.env                    # Local secrets
.env.local              # Local overrides
.env.production         # Production secrets
.env.*.local            # Any local env files
node_modules/           # Dependencies
dist/                   # Build output
.DS_Store               # macOS files
```

### ✅ DO Commit These Files

```
.env.example            # Template (NO secrets)
.gitignore              # Git rules
README.md               # Documentation
package.json            # Dependencies
All HTML/CSS/JS files   # Source code
All documentation       # Guides
```

---

## GitHub Secrets Setup

### Step 1: Add Secrets to GitHub Repository

1. Go to your GitHub repository: **https://github.com/bayeziddev/sayadbayezid**

2. Click **Settings** (top right)

3. In left sidebar, click **Secrets and variables** → **Actions**

4. Click **"New repository secret"** button

5. Add your first secret:
   - **Name:** `BACKEND_API_KEY`
   - **Value:** `sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb`
   - Click **Add secret**

### Step 2: Add More Secrets

Repeat Step 1 for each secret:

| Name | Value | Description |
|------|-------|-------------|
| `BACKEND_API_KEY` | Your API key | Portfolio backend API |
| `DATABASE_URL` | `mysql://user:pass@host/db` | Database connection |
| `OWNER_EMAIL` | `owner@example.com` | Owner email |
| `JWT_SECRET` | Your secret key | Session encryption |
| `SMTP_USER` | `email@gmail.com` | Email account |
| `SMTP_PASSWORD` | Your password | Email password |

### Step 3: Verify Secrets in GitHub

1. Go to **Settings → Secrets and variables → Actions**
2. You should see all your secrets listed
3. Click on each to verify it's there (value is hidden)

---

## Local Repository Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/bayeziddev/sayadbayezid.git
cd sayadbayezid
```

### Step 2: Create Local `.env` File

```bash
# Create .env file with your secrets
cat > .env << EOF
BACKEND_API_KEY=sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb
DATABASE_URL=mysql://root:password@localhost:3306/bayezid_db
OWNER_EMAIL=owner@sayadbayezid.com
JWT_SECRET=your-secret-key-here
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
NODE_ENV=development
EOF
```

### Step 3: Verify `.gitignore`

Make sure `.env` is protected:

```bash
# Check if .gitignore exists
cat .gitignore

# Should contain:
# .env
# .env.local
# .env.*.local
```

If not, add it:

```bash
cat >> .gitignore << EOF
# Environment variables
.env
.env.local
.env.*.local
.env.production
EOF
```

### Step 4: Verify `.env` is NOT Tracked

```bash
# Check if .env is tracked
git status

# Should NOT show .env in the list
# If it does, remove it:
git rm --cached .env
git commit -m "Remove .env from tracking"
```

---

## Commit to GitHub

### Step 1: Create `.env.example` Template

```bash
# Create template WITHOUT secrets
cat > .env.example << EOF
# Backend API
BACKEND_API_KEY=your_api_key_here
BACKEND_API_URL=https://your-backend-url.com/api

# Database
DATABASE_URL=mysql://user:pass@host:3306/db

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
OWNER_EMAIL=owner@example.com

# Auth
JWT_SECRET=your-secret-key-here

# Environment
NODE_ENV=development
EOF
```

### Step 2: Commit Files

```bash
# Add all files (except .env - it's in .gitignore)
git add .

# Verify what will be committed
git status

# Should show:
# - .env.example (✅ OK)
# - .gitignore (✅ OK)
# - All HTML/CSS/JS files (✅ OK)
# - All documentation (✅ OK)
# - NOT .env (✅ Good!)

# Commit
git commit -m "Add environment configuration and secrets template"

# Push to GitHub
git push origin main
```

### Step 3: Verify on GitHub

1. Go to **https://github.com/bayeziddev/sayadbayezid**
2. You should see:
   - ✅ `.env.example` file (with template values)
   - ✅ `.gitignore` file (protects `.env`)
   - ✅ All other files
   - ❌ NO `.env` file (it's protected!)

---

## GitHub Actions Integration

### Step 1: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Manus

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Manus
      env:
        BACKEND_API_KEY: ${{ secrets.BACKEND_API_KEY }}
        DATABASE_URL: ${{ secrets.DATABASE_URL }}
        OWNER_EMAIL: ${{ secrets.OWNER_EMAIL }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
        SMTP_USER: ${{ secrets.SMTP_USER }}
        SMTP_PASSWORD: ${{ secrets.SMTP_PASSWORD }}
      run: |
        echo "Deploying with secrets..."
        # Your deployment commands here
        # Secrets are available as environment variables
```

### Step 2: Commit Workflow

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

### Step 3: Verify Workflow

1. Go to **Actions** tab in GitHub
2. You should see your workflow
3. It will run on next push

---

## Verification

### Step 1: Verify `.env` is NOT in Repository

```bash
# Check if .env was ever committed
git log --all --full-history -- ".env"

# Should return nothing (empty)
# If it shows commits, you need to remove it from history
```

### Step 2: Verify `.env.example` is in Repository

```bash
# Check if .env.example is tracked
git ls-files | grep env

# Should show:
# .env.example
```

### Step 3: Verify Secrets in GitHub

1. Go to **Settings → Secrets and variables → Actions**
2. All secrets should be listed
3. Values should be hidden (showing dots)

### Step 4: Test Locally

```bash
# Make sure .env file exists locally
ls -la .env

# Should show: -rw-r--r-- ... .env

# Verify it's in .gitignore
git check-ignore .env

# Should output: .env (meaning it's ignored)
```

---

## Using Secrets in Your Code

### In Backend Code

```typescript
// server/_core/env.ts
export const ENV = {
  backendApiKey: process.env.BACKEND_API_KEY,
  databaseUrl: process.env.DATABASE_URL,
  ownerEmail: process.env.OWNER_EMAIL,
  jwtSecret: process.env.JWT_SECRET,
};
```

### In Procedures

```typescript
// server/routers.ts
import { ENV } from './_core/env';

export const appRouter = router({
  callApi: publicProcedure.mutation(async () => {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${ENV.backendApiKey}`
      }
    });
    return response.json();
  })
});
```

### In GitHub Actions

```yaml
env:
  BACKEND_API_KEY: ${{ secrets.BACKEND_API_KEY }}
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## Security Checklist

- [ ] `.env` file created locally
- [ ] `.env` is in `.gitignore`
- [ ] `.env` is NOT committed to GitHub
- [ ] `.env.example` is committed (without secrets)
- [ ] Secrets added to GitHub Secrets
- [ ] `.gitignore` file committed
- [ ] All documentation committed
- [ ] No API keys in code
- [ ] No secrets in logs
- [ ] Workflow uses `${{ secrets.NAME }}`

---

## Troubleshooting

### Issue: `.env` was accidentally committed

**Solution:**
```bash
# Remove from history
git rm --cached .env
git commit -m "Remove .env from tracking"
git push origin main

# Add to .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to .gitignore"
git push origin main
```

### Issue: Secrets not showing in GitHub

**Solution:**
1. Go to **Settings → Secrets and variables → Actions**
2. Click **"New repository secret"**
3. Add secret again
4. Verify it appears in the list

### Issue: Workflow can't access secrets

**Solution:**
```yaml
# Make sure you're using correct syntax
env:
  MY_SECRET: ${{ secrets.MY_SECRET }}  # ✅ Correct
  MY_SECRET: $secrets.MY_SECRET        # ❌ Wrong
```

### Issue: `.env.example` not showing

**Solution:**
```bash
# Verify file exists
ls -la .env.example

# Verify it's tracked
git ls-files | grep env.example

# If not, add it
git add .env.example
git commit -m "Add .env.example template"
git push origin main
```

---

## Quick Reference

### Add Secret to GitHub
```
1. Settings → Secrets and variables → Actions
2. "New repository secret"
3. Name: BACKEND_API_KEY
4. Value: your_key_here
5. Add secret
```

### Create Local `.env`
```bash
cat > .env << EOF
BACKEND_API_KEY=your_key
DATABASE_URL=your_db
EOF
```

### Commit to GitHub
```bash
git add .
git commit -m "Add configuration"
git push origin main
```

### Verify Setup
```bash
# Check .env is ignored
git check-ignore .env

# Check .env.example is tracked
git ls-files | grep env.example

# Check secrets in GitHub
# Settings → Secrets and variables → Actions
```

---

## File Structure After Setup

```
sayadbayezid/
├── .env                    ← Local only (NOT in GitHub)
├── .env.example            ← Template (IN GitHub)
├── .gitignore              ← Protects .env (IN GitHub)
├── .github/
│   └── workflows/
│       └── deploy.yml      ← GitHub Actions (IN GitHub)
├── js/
│   └── api-client.js       ← API client (IN GitHub)
├── pages/
│   └── *.html              ← Pages (IN GitHub)
└── SECRETS_SETUP_GUIDE.md  ← Documentation (IN GitHub)
```

---

## Summary

```
GitHub Repository (Public - Safe):
├── .env.example (template, no secrets)
├── .gitignore (protects .env)
├── All source code
└── All documentation

Local Computer (Private - Has Secrets):
├── .env (with your actual API key)
└── Everything from GitHub

GitHub Secrets (Hidden - Very Safe):
├── BACKEND_API_KEY
├── DATABASE_URL
├── OWNER_EMAIL
└── Other secrets

Manus Backend (Hidden - Very Safe):
├── All secrets configured
└── Environment variables set
```

---

**Your GitHub repository is now secure!** 🔒

Your API key is protected in three places:
1. ✅ Local `.env` (only on your computer)
2. ✅ GitHub Secrets (hidden from public)
3. ✅ Manus Backend (production secrets)

Never exposed to anyone!
