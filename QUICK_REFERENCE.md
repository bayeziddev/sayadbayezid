# Quick Reference Card - Start Here! 🚀

**Everything you need to deploy your site in 30 minutes.**

---

## ⏱️ 30-Minute Deployment

### 5 Minutes: Update Code

```bash
cd /home/ubuntu/sayadbayezid
cp index-enhanced.html index.html
git add index.html
git commit -m "Deploy: Enhanced index with API"
git push origin main
```

### 10 Minutes: Add GitHub Secrets

Go to: https://github.com/bayeziddev/sayadbayezid/settings/secrets/actions

Click "New repository secret" 11 times and add:

```
1. BACKEND_API_KEY
   sk-coeymmL39oHdAnEtlXoX3tDEdemnyZX03_wPIdWToCs6rx0guPhi8dptfuJdUxqCXvwCT75_NeeRlK7dn4l5r9DSUPxb

2. OWNER_EMAIL
   sayadmdbayezidhosan@gmail.com

3. SMTP_HOST
   smtp.gmail.com

4. SMTP_PORT
   587

5. SMTP_USER
   your-gmail@gmail.com

6. SMTP_PASSWORD
   your-16-char-app-password

7. SMTP_FROM
   noreply@sayadbayezid.com

8. DATABASE_URL
   mysql://user:pass@host:3306/db

9. JWT_SECRET
   your-secret-key

10. BACKEND_API_URL
    https://your-backend.com/api/trpc

11. FRONTEND_URL
    https://yourusername.github.io/sayadbayezid
```

### 3 Minutes: Wait for Deployment

1. Go to Actions tab
2. Wait for "pages build and deployment" ✅

### 10 Minutes: Test

1. Go to: https://yourusername.github.io/sayadbayezid
2. Fill newsletter form → Check email
3. Fill inquiry form → Check email
4. Fill feedback form → Check email

---

## 📚 Documentation Map

| Need | File |
|------|------|
| **Quick setup** | This file ⬅️ |
| **GitHub Secrets** | GITHUB_SECRETS_COMPLETE.md |
| **Deployment** | FINAL_DEPLOYMENT.md |
| **Client demo** | CLIENT_REVIEW_GUIDE.md |
| **Email setup** | EMAIL_QUICK_SETUP.md |
| **Full guide** | README_COMPLETE.md |

---

## ✅ Success Checklist

- [ ] Code updated
- [ ] GitHub Secrets added (11)
- [ ] Changes pushed
- [ ] Deployment complete
- [ ] Site loads
- [ ] Forms work
- [ ] Emails received
- [ ] Client ready

---

## 🆘 Quick Fixes

### Forms Not Working?
```
Check: F12 Console → Look for errors
Fix: Verify BACKEND_API_URL in secrets
```

### Emails Not Received?
```
Check: Spam folder
Fix: Verify SMTP credentials
Wait: Up to 5 minutes
```

### Site Not Loading?
```
Check: GitHub Actions (should be green)
Fix: Clear cache, try different browser
Wait: 2-3 minutes for deployment
```

---

## 📞 Key Contacts

- **Email:** sayadmdbayezidhosan@gmail.com
- **GitHub:** https://github.com/bayeziddev/sayadbayezid
- **Live Site:** https://yourusername.github.io/sayadbayezid

---

## 🎯 Next Action

👉 **Go to:** https://github.com/bayeziddev/sayadbayezid/settings/secrets/actions

👉 **Add 11 secrets** (copy from above)

👉 **Wait 3 minutes** for deployment

👉 **Test at:** https://yourusername.github.io/sayadbayezid

---

**That's it!** Your site will be live in 30 minutes! 🚀
