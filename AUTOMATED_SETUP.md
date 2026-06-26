# Automated Setup Guide - Complete Project Initialization

One-command setup to get everything working perfectly for client review.

## 🎯 Goal

Automate the complete setup so your live site is ready for clients with all forms working and email notifications configured.

---

## Option 1: Manual Setup (Recommended First Time)

### Step 1: Clone Repository

```bash
git clone https://github.com/bayeziddev/sayadbayezid.git
cd sayadbayezid
```

### Step 2: Create Local `.env` File

```bash
cat > .env << 'EOF'
# Backend API
BACKEND_API_KEY=sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb
BACKEND_API_URL=https://your-manus-backend.com/api/trpc

# Owner Email
OWNER_EMAIL=sayadmdbayezidhosan@gmail.com

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@sayadbayezid.com

# URLs
FRONTEND_URL=https://yourusername.github.io/sayadbayezid

# Environment
NODE_ENV=production
EOF
```

### Step 3: Add GitHub Secrets

1. Go to: https://github.com/bayeziddev/sayadbayezid/settings/secrets/actions
2. Add all 11 secrets from `GITHUB_SECRETS_COMPLETE.md`
3. Verify all secrets are listed

### Step 4: Replace index.html

```bash
# Backup original
cp index.html index-original.html

# Use enhanced version with API injection
cp index-enhanced.html index.html

# Commit changes
git add index.html GITHUB_SECRETS_COMPLETE.md
git commit -m "Add enhanced index.html with API configuration injection"
git push origin main
```

### Step 5: Verify Live Site

1. Wait 2-3 minutes for GitHub Pages to deploy
2. Go to: https://yourusername.github.io/sayadbayezid
3. Test all forms:
   - Newsletter subscription
   - Client inquiry
   - Customer feedback
4. Check email at `sayadmdbayezidhosan@gmail.com`

---

## Option 2: Automated Setup Script

### Create Setup Script

Create `setup.sh`:

```bash
#!/bin/bash

echo "🚀 Starting Automated Setup..."

# Step 1: Clone if not exists
if [ ! -d ".git" ]; then
    echo "📦 Cloning repository..."
    git clone https://github.com/bayeziddev/sayadbayezid.git
    cd sayadbayezid
fi

# Step 2: Create .env file
echo "🔐 Creating .env file..."
cat > .env << 'EOF'
BACKEND_API_KEY=sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb
BACKEND_API_URL=https://your-manus-backend.com/api/trpc
OWNER_EMAIL=sayadmdbayezidhosan@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@sayadbayezid.com
FRONTEND_URL=https://yourusername.github.io/sayadbayezid
NODE_ENV=production
EOF

# Step 3: Update index.html
echo "📝 Updating index.html..."
cp index.html index-original.html
cp index-enhanced.html index.html

# Step 4: Commit changes
echo "📤 Committing changes..."
git add .env index.html GITHUB_SECRETS_COMPLETE.md
git commit -m "Automated setup: Add enhanced index.html and configuration"
git push origin main

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add GitHub Secrets: https://github.com/bayeziddev/sayadbayezid/settings/secrets/actions"
echo "2. Use secrets from: GITHUB_SECRETS_COMPLETE.md"
echo "3. Wait 2-3 minutes for GitHub Pages deployment"
echo "4. Test live site: https://yourusername.github.io/sayadbayezid"
echo "5. Check email: sayadmdbayezidhosan@gmail.com"
```

### Run Setup Script

```bash
# Make script executable
chmod +x setup.sh

# Run it
./setup.sh
```

---

## Option 3: Docker Setup (Advanced)

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Create .env
RUN echo "BACKEND_API_KEY=sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb" > .env
RUN echo "OWNER_EMAIL=sayadmdbayezidhosan@gmail.com" >> .env

# Build
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
```

### Run Docker

```bash
# Build image
docker build -t sayadbayezid .

# Run container
docker run -p 3000:3000 sayadbayezid
```

---

## Verification Checklist

After setup, verify everything works:

- [ ] Repository cloned successfully
- [ ] `.env` file created with all values
- [ ] `index.html` updated with API injection
- [ ] GitHub Secrets added (11 total)
- [ ] Changes committed and pushed
- [ ] GitHub Pages deployed (2-3 min wait)
- [ ] Live site accessible
- [ ] Newsletter form works
- [ ] Inquiry form works
- [ ] Feedback form works
- [ ] Email received at `sayadmdbayezidhosan@gmail.com`
- [ ] All form data saved to database

---

## Testing Forms

### Test 1: Newsletter Subscription

1. Go to live site
2. Scroll to "Subscribe to Newsletter" section
3. Enter name and email
4. Click "Subscribe"
5. Should see: ✅ Successfully subscribed!
6. Check email for confirmation

### Test 2: Client Inquiry

1. Go to live site
2. Scroll to "Send Inquiry" section
3. Enter name, email, and message
4. Click "Send Inquiry"
5. Should see: ✅ Inquiry sent!
6. Check email for inquiry details

### Test 3: Feedback

1. Go to live site
2. Scroll to "Share Feedback" section
3. Enter name, email, select rating
4. Enter feedback message
5. Click "Submit Feedback"
6. Should see: ✅ Thank you for your feedback!
7. Check email for feedback details

---

## Troubleshooting

### Forms Not Working?

1. Check browser console (F12)
2. Look for API errors
3. Verify `BACKEND_API_URL` is correct
4. Verify GitHub Secrets are set
5. Check backend is running

### Email Not Received?

1. Verify `OWNER_EMAIL` is correct
2. Check spam folder
3. Verify `SMTP_USER` and `SMTP_PASSWORD`
4. Check backend logs
5. Verify email notifications are enabled

### GitHub Pages Not Deploying?

1. Wait 2-3 minutes
2. Check Actions tab in GitHub
3. Look for deployment workflow
4. Check for errors in workflow logs
5. Verify `.gitignore` doesn't exclude important files

---

## Deployment Options

### Option A: GitHub Pages (Recommended)

```bash
# Already configured
# Just push to main branch
git push origin main

# Wait 2-3 minutes
# Live at: https://yourusername.github.io/sayadbayezid
```

### Option B: Netlify

```bash
# Connect GitHub repo to Netlify
# Automatic deployment on push
# Custom domain support
```

### Option C: Vercel

```bash
# Connect GitHub repo to Vercel
# Automatic deployment on push
# Serverless functions support
```

### Option D: Custom Server

```bash
# Deploy to your own server
# Full control over configuration
# Manual deployment process
```

---

## Production Checklist

Before going live with clients:

- [ ] All GitHub Secrets configured
- [ ] `.env` file created locally
- [ ] `index.html` updated with API injection
- [ ] All forms tested and working
- [ ] Email notifications verified
- [ ] Database connected and working
- [ ] Backend API running
- [ ] SSL certificate configured
- [ ] Domain configured
- [ ] Analytics set up
- [ ] Backup strategy in place
- [ ] Monitoring configured

---

## Quick Reference

### Setup Commands

```bash
# Clone
git clone https://github.com/bayeziddev/sayadbayezid.git

# Create .env
cat > .env << 'EOF'
BACKEND_API_KEY=your_key
OWNER_EMAIL=sayadmdbayezidhosan@gmail.com
EOF

# Update index.html
cp index-enhanced.html index.html

# Commit
git add .
git commit -m "Setup complete"
git push origin main
```

### Test Commands

```bash
# Test newsletter
curl -X POST https://your-backend.com/api/trpc/newsletters.subscribe \
  -H "Content-Type: application/json" \
  -d '{"subscriberEmail":"test@example.com","subscriberName":"Test"}'

# Test inquiry
curl -X POST https://your-backend.com/api/trpc/inquiries.submit \
  -H "Content-Type: application/json" \
  -d '{"clientName":"Test","clientEmail":"test@example.com","message":"Test"}'
```

---

## Support

If you encounter issues:

1. Check `GITHUB_SECRETS_COMPLETE.md` for secret values
2. Review `EMAIL_NOTIFICATIONS_SETUP.md` for email config
3. Check `GITHUB_SETUP_STEPS.md` for GitHub setup
4. Review backend logs for errors
5. Check browser console for client-side errors

---

**Setup is now automated!** 🚀

Follow these steps and your site will be ready for client review with all forms working perfectly and email notifications configured.
