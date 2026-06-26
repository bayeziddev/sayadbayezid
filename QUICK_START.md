# Quick Start Guide - Connect With Bayezid

Get your website up and running in 5 minutes!

## 🚀 5-Minute Setup

### Step 1: Update Backend URL (1 minute)

Open `js/config.js` and find this line:

```javascript
BASE_URL: 'https://your-manus-backend.com/api/trpc',
```

Replace with your actual backend URL:

```javascript
BASE_URL: 'https://3000-xxx.manus.computer/api/trpc',
```

### Step 2: Start Local Server (1 minute)

Choose one method:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### Step 3: Test the Website (1 minute)

1. Open `http://localhost:8000`
2. Navigate to "Contact" page
3. Fill out the inquiry form
4. Click "Send Inquiry"
5. Check browser console (F12) for success message

### Step 4: Deploy (2 minutes)

**GitHub Pages:**
1. Go to repository Settings → Pages
2. Select "Deploy from a branch" → "main"
3. Your site is live at: `https://bayeziddev.github.io/sayadbayezid`

**Netlify:**
1. Connect your GitHub repo at netlify.com
2. Click "Deploy"
3. Your site is live at: `your-site.netlify.app`

---

## 📋 File Structure

```
sayadbayezid/
├── index.html                 ← Home page
├── pages/
│   ├── portfolio.html        ← Portfolio
│   ├── services.html         ← Services & orders
│   ├── about.html            ← About us
│   └── contact.html          ← Contact forms
├── css/
│   └── style.css             ← Styling
├── js/
│   ├── api.js                ← API functions ⭐
│   └── config.js             ← Configuration ⭐
└── API_INTEGRATION_GUIDE.md   ← Detailed docs
```

---

## 🔧 Configuration

### Update Backend URL

**Option A: Edit config.js**
```javascript
// js/config.js
MANUS_BACKEND: {
    BASE_URL: 'https://your-backend.com/api/trpc',
}
```

**Option B: Use JavaScript Console**
```javascript
setManusBacendUrl('https://your-backend.com/api/trpc');
```

### Customize Messages

Edit `js/config.js`:

```javascript
MESSAGES: {
    INQUIRY_SUCCESS: 'Your custom message',
    INQUIRY_ERROR: 'Your custom error message',
    // ... more messages
}
```

---

## 📝 Available Forms

### 1. General Inquiry Form
- Fields: Name, Email, Message
- Endpoint: `inquiries.submit`
- Location: `/pages/contact.html` (Tab 1)

### 2. Newsletter Subscription
- Fields: Name, Email
- Endpoint: `newsletters.subscribe`
- Location: `/pages/contact.html` (Tab 2)

### 3. Customer Feedback
- Fields: Name, Email, Rating (1-5), Message
- Endpoint: `feedback.submit`
- Location: `/pages/contact.html` (Tab 3)

### 4. Service Orders
- Fields: Name, Email, Service, Details, Budget
- Endpoint: `serviceOrders.submit`
- Location: `/pages/services.html` (Modal)

---

## 🧪 Testing

### Test in Browser Console

```javascript
// View configuration
logConfiguration();

// Test email validation
validateEmail('test@example.com');

// Test API call
submitInquiry({
    name: 'Test',
    email: 'test@example.com',
    message: 'Test message'
}).then(r => console.log(r));

// Show notification
showNotification('Test message', 'success');
```

### Test Form Submission

1. Open `/pages/contact.html`
2. Fill out any form
3. Submit
4. Check browser console (F12)
5. Look for success/error message

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Forms not submitting** | Check backend URL in `js/config.js` |
| **CORS error** | Enable CORS on backend |
| **Timeout error** | Increase `TIMEOUT` in `js/config.js` |
| **No notification** | Verify `js/api.js` is loaded |
| **Email validation fails** | Check email format |

---

## 📚 Documentation

- **[API Integration Guide](./API_INTEGRATION_GUIDE.md)** - Detailed API documentation
- **[Setup Instructions](./SETUP_INSTRUCTIONS.md)** - Complete setup guide
- **[Hybrid Setup Guide](./hybrid%20setup%20guide.md)** - Hybrid architecture guide

---

## 🎯 Next Steps

1. ✅ Update backend URL
2. ✅ Test forms locally
3. ✅ Deploy to GitHub Pages/Netlify
4. ✅ Monitor form submissions in admin dashboard
5. ✅ Customize content and branding

---

## 💡 Tips

- Use browser DevTools (F12) to debug
- Check network tab to see API requests
- Enable console logging for debugging
- Test on mobile devices
- Use Chrome DevTools device emulation

---

## 📞 Support

For detailed information, see:
- [API Integration Guide](./API_INTEGRATION_GUIDE.md)
- [Setup Instructions](./SETUP_INSTRUCTIONS.md)
- Browser console for error messages

---

**Ready to go!** 🎉

Your website is now integrated with the Manus backend. Start accepting inquiries, orders, and feedback!
