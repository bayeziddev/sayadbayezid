# GitHub Setup - Step-by-Step Integration

Follow these exact steps to integrate your API key and secrets into GitHub safely.

## 🎯 Goal

Safely push your project to GitHub WITHOUT exposing your API key.

## ⚠️ Important

Your API key will be:
- ✅ Safe on your local computer (in `.env`)
- ✅ Protected on GitHub (in GitHub Secrets)
- ✅ Never visible in the repository code
- ✅ Never committed to GitHub

---

## Step 1: Prepare Your Local Repository

### 1.1 Open Terminal

```bash
# Navigate to your project
cd /home/ubuntu/sayadbayezid
```

### 1.2 Check Current Status

```bash
# See what files are ready to commit
git status

# Should show:
# On branch main
# nothing to commit, working tree clean
```

### 1.3 Verify .gitignore is Set

```bash
# Check if .gitignore exists
cat .gitignore

# Should contain:
# .env
# .env.local
# .env.*.local
# .env.production
```

---

## Step 2: Create Local `.env` File

### 2.1 Create `.env` File

```bash
# Create .env file with your secrets
cat > .env << 'EOF'
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

### 2.2 Verify `.env` File Created

```bash
# Check if file exists
ls -la .env

# Should show: -rw-r--r-- ... .env

# View content
cat .env
```

### 2.3 Verify `.env` is Ignored by Git

```bash
# This command should output: .env
git check-ignore .env

# If it outputs nothing, .env is NOT ignored!
# Then run: echo ".env" >> .gitignore
```

---

## Step 3: Add Secrets to GitHub

### 3.1 Go to GitHub Repository Settings

1. Open: **https://github.com/bayeziddev/sayadbayezid**
2. Click **Settings** (top right)
3. In left sidebar, click **Secrets and variables**
4. Click **Actions**

### 3.2 Add First Secret: BACKEND_API_KEY

1. Click **"New repository secret"** button
2. Fill in:
   - **Name:** `BACKEND_API_KEY`
   - **Value:** `sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb`
3. Click **Add secret**

### 3.3 Add Other Secrets

Repeat for each:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `mysql://root:password@localhost:3306/bayezid_db` |
| `OWNER_EMAIL` | `owner@sayadbayezid.com` |
| `JWT_SECRET` | `your-secret-key-here` |
| `SMTP_USER` | `your-email@gmail.com` |
| `SMTP_PASSWORD` | `your-app-password` |

### 3.4 Verify All Secrets Added

1. Go to **Settings → Secrets and variables → Actions**
2. You should see all secrets listed
3. Values should be hidden (showing dots)

---

## Step 4: Verify Git Status

### 4.1 Check What Will Be Committed

```bash
# See all changes
git status

# Should show:
# On branch main
# nothing to commit, working tree clean

# OR if there are changes:
# Changes not staged for commit:
#   modified: .gitignore
#   ...
```

### 4.2 Verify `.env` is NOT Listed

```bash
# Check if .env appears in git status
git status | grep .env

# Should return NOTHING (empty)
# If it shows .env, something is wrong!
```

### 4.3 Verify `.env.example` Exists

```bash
# Check if template exists (optional, but recommended)
ls -la .env.example

# If it doesn't exist, create it with template values
```

---

## Step 5: Commit and Push to GitHub

### 5.1 Add All Files

```bash
# Add all files (except .env - it's in .gitignore)
git add .

# Verify what will be added
git status

# Should show files like:
# - GITHUB_SETUP_STEPS.md
# - GITHUB_INTEGRATION_GUIDE.md
# - .gitignore
# - All other files
# - NOT .env
```

### 5.2 Commit Changes

```bash
# Commit with descriptive message
git commit -m "Add complete setup guides and GitHub integration"

# Or if there are no changes:
# git commit -m "Initial commit with all documentation"
```

### 5.3 Push to GitHub

```bash
# Push to main branch
git push origin main

# Should show:
# Enumerating objects: X, done.
# Counting objects: 100% (X/X), done.
# Writing objects: 100% (X/X), X.XX KiB | X.XX MiB/s, done.
# Total X (delta X), reused 0 (delta 0)
# To https://github.com/bayeziddev/sayadbayezid.git
#    xxxxx..xxxxx  main -> main
```

---

## Step 6: Verify on GitHub

### 6.1 Check Repository on GitHub

1. Go to **https://github.com/bayeziddev/sayadbayezid**
2. You should see:
   - ✅ All your files (HTML, CSS, JS, docs)
   - ✅ `.gitignore` file
   - ✅ `.env.example` (if created)
   - ❌ NO `.env` file (it's protected!)

### 6.2 Verify Secrets on GitHub

1. Go to **Settings → Secrets and variables → Actions**
2. All secrets should be listed:
   - ✅ `BACKEND_API_KEY`
   - ✅ `DATABASE_URL`
   - ✅ `OWNER_EMAIL`
   - ✅ `JWT_SECRET`
   - ✅ `SMTP_USER`
   - ✅ `SMTP_PASSWORD`

### 6.3 Verify `.env` is NOT in Repository

```bash
# Run this command to check
git log --all --full-history -- ".env"

# Should return NOTHING (empty)
# If it shows commits, .env was committed!
```

---

## Step 7: Verify Local Setup

### 7.1 Check Local `.env` File

```bash
# Verify .env exists locally
ls -la .env

# Should show: -rw-r--r-- ... .env

# Verify content
cat .env | head -3

# Should show your secrets
```

### 7.2 Verify `.env` is Protected

```bash
# Check if .env is in .gitignore
git check-ignore .env

# Should output: .env

# If it outputs nothing, add it:
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to .gitignore"
git push origin main
```

---

## Step 8: Test Everything Works

### 8.1 Test Local Development

```bash
# Make sure your local .env is loaded
# Run your development server
npm run dev

# Check logs for:
# ✅ Environment loaded
# ✅ Secrets configured
# ✅ No errors
```

### 8.2 Test GitHub Actions (Optional)

If you have GitHub Actions workflow:

1. Go to **Actions** tab in GitHub
2. Click on latest workflow run
3. Check logs for:
   - ✅ Secrets loaded
   - ✅ Deployment successful
   - ❌ No secret values in logs

---

## Troubleshooting

### Problem: `.env` Shows in Git Status

**Solution:**
```bash
# Remove from tracking
git rm --cached .env

# Verify it's ignored
git check-ignore .env

# Should output: .env
```

### Problem: `.env` Was Committed to GitHub

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

### Problem: Secrets Not Showing in GitHub

**Solution:**
1. Go to **Settings → Secrets and variables → Actions**
2. Click **"New repository secret"**
3. Add secret again
4. Verify it appears in the list

### Problem: Can't Push to GitHub

**Solution:**
```bash
# Check remote URL
git remote -v

# Should show:
# origin  https://github.com/bayeziddev/sayadbayezid.git (fetch)
# origin  https://github.com/bayeziddev/sayadbayezid.git (push)

# If wrong, update:
git remote set-url origin https://github.com/bayeziddev/sayadbayezid.git

# Try pushing again
git push origin main
```

---

## Quick Checklist

- [ ] `.env` file created locally
- [ ] `.env` contains your API key
- [ ] `.env` is in `.gitignore`
- [ ] `.env` is NOT shown in `git status`
- [ ] Secrets added to GitHub Secrets
- [ ] All files committed to GitHub
- [ ] `.env` NOT in GitHub repository
- [ ] `.gitignore` IN GitHub repository
- [ ] All documentation pushed
- [ ] Verified on GitHub website

---

## Summary

### What's on Your Computer (Local)
```
.env                    ← Has your API key (KEEP SECRET)
.env.example            ← Template (no secrets)
All source code
All documentation
```

### What's on GitHub (Public)
```
.env.example            ← Template only
.gitignore              ← Protects .env
All source code
All documentation
NOT .env                ← Protected!
```

### What's in GitHub Secrets (Hidden)
```
BACKEND_API_KEY         ← Your API key (HIDDEN)
DATABASE_URL            ← Database connection
OWNER_EMAIL             ← Owner email
JWT_SECRET              ← Secret key
SMTP_USER               ← Email user
SMTP_PASSWORD           ← Email password
```

---

## Next Steps

1. ✅ Follow all steps above
2. ✅ Verify everything on GitHub
3. ✅ Test local development
4. ✅ Share repository with team (secrets are safe!)
5. ✅ Deploy to Manus backend
6. ✅ Monitor form submissions

---

**Your GitHub repository is now secure!** 🔒

Your API key is protected in 3 places:
1. Local `.env` (only on your computer)
2. GitHub Secrets (hidden from public)
3. Manus Backend (production secrets)

Never exposed! ✅
