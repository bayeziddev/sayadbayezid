# Setup Instructions - Connect With Bayezid

Complete guide to set up and deploy the Connect With Bayezid website with Manus backend integration.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Backend Integration](#backend-integration)
4. [Configuration](#configuration)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Maintenance](#maintenance)

---

## Prerequisites

Before you begin, ensure you have:

- A Manus backend project running (sayadbayezid-backend)
- Git installed on your machine
- A web server or hosting platform (GitHub Pages, Netlify, Vercel, etc.)
- A text editor or IDE
- Basic knowledge of HTML, CSS, and JavaScript

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/bayeziddev/sayadbayezid.git
cd sayadbayezid
```

### Step 2: Project Structure

```
sayadbayezid/
├── index.html              # Home page
├── pages/
│   ├── portfolio.html      # Portfolio page
│   ├── services.html       # Services page
│   ├── about.html          # About page
│   └── contact.html        # Contact page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   ├── api.js              # API integration functions
│   └── config.js           # Configuration file
├── images/                 # Image assets
├── .env.example            # Environment variables template
├── API_INTEGRATION_GUIDE.md # API integration documentation
└── README.md               # Project README
```

### Step 3: Start Local Server

#### Option A: Using Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option B: Using Node.js

```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server -p 8000
```

#### Option C: Using VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Step 4: Access the Website

Open your browser and navigate to:
- Local: `http://localhost:8000`
- Live Server: `http://127.0.0.1:5500`

---

## Backend Integration

### Step 1: Get Your Backend URL

Your Manus backend will provide a URL like:
```
https://3000-xxx.manus.computer/api/trpc
```

### Step 2: Update Configuration

Edit `js/config.js` and update the `BASE_URL`:

```javascript
MANUS_BACKEND: {
    BASE_URL: 'https://3000-xxx.manus.computer/api/trpc',
    // ... rest of config
}
```

### Step 3: Test Connection

1. Open browser console (F12)
2. Run the following command:

```javascript
setManusBacendUrl('https://3000-xxx.manus.computer/api/trpc');
logConfiguration();
```

3. Verify the URL is correct in the output

### Step 4: Test Form Submission

1. Navigate to `pages/contact.html`
2. Fill out the inquiry form
3. Submit the form
4. Check browser console for success/error messages
5. Verify data appears in backend admin dashboard

---

## Configuration

### Environment Variables

Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Update the following variables:

```env
MANUS_BACKEND_URL=https://your-backend-url.com/api/trpc
APP_ENVIRONMENT=production
OWNER_EMAIL=your-email@example.com
```

### Configuration File: `js/config.js`

Key settings to customize:

```javascript
// Backend URL
BASE_URL: 'https://your-backend-url.com/api/trpc'

// Request timeout (milliseconds)
TIMEOUT: 10000

// Retry attempts
RETRY_ATTEMPTS: 3

// Notification duration (milliseconds)
NOTIFICATION_DURATION: 5000

// Feature flags
ENABLE_ANALYTICS: true
ENABLE_NOTIFICATIONS: true
```

### Custom Messages

Update form messages in `js/config.js`:

```javascript
MESSAGES: {
    INQUIRY_SUCCESS: 'Thank you! Your inquiry has been sent successfully.',
    INQUIRY_ERROR: 'Failed to send inquiry. Please try again.',
    // ... more messages
}
```

---

## Testing

### Manual Testing Checklist

#### Contact Forms
- [ ] Inquiry form submits successfully
- [ ] Newsletter subscription works
- [ ] Feedback form with star rating works
- [ ] Error messages display correctly
- [ ] Success messages display correctly
- [ ] Email validation works
- [ ] Form resets after submission

#### Service Orders
- [ ] Service order modal opens
- [ ] Form data is populated correctly
- [ ] Order submits successfully
- [ ] Error handling works

#### Navigation
- [ ] All navigation links work
- [ ] Mobile menu toggles correctly
- [ ] Breadcrumbs display correctly
- [ ] Footer links work

#### Responsive Design
- [ ] Desktop view looks good
- [ ] Tablet view is responsive
- [ ] Mobile view is responsive
- [ ] Forms are usable on mobile

### Automated Testing

#### Browser Console Tests

```javascript
// Test configuration
logConfiguration();

// Test email validation
validateEmail('test@example.com');      // true
validateEmail('invalid-email');         // false

// Test API endpoint retrieval
getApiEndpoint('INQUIRIES');            // 'inquiries.submit'

// Test notification
showNotification('Test message', 'success', 3000);
```

#### Test Form Submission

```javascript
// Test inquiry submission
submitInquiry({
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test inquiry'
}).then(result => console.log(result));

// Test newsletter subscription
subscribeNewsletter({
    name: 'Test Subscriber',
    email: 'subscriber@example.com'
}).then(result => console.log(result));
```

---

## Deployment

### Option 1: GitHub Pages

1. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Click Save

2. **Access Your Site:**
   ```
   https://bayeziddev.github.io/sayadbayezid
   ```

3. **Update Base URL (if needed):**
   If deploying to a subdirectory, update links in HTML files.

### Option 2: Netlify

1. **Connect Repository:**
   - Sign up at netlify.com
   - Click "New site from Git"
   - Select GitHub and authorize
   - Choose your repository

2. **Configure Build:**
   - Build command: (leave empty for static site)
   - Publish directory: `.` (root)

3. **Deploy:**
   - Click "Deploy site"
   - Your site will be live at `your-site.netlify.app`

### Option 3: Vercel

1. **Connect Repository:**
   - Sign up at vercel.com
   - Click "New Project"
   - Import your GitHub repository

2. **Deploy:**
   - Vercel will auto-detect it's a static site
   - Click "Deploy"
   - Your site will be live at `your-site.vercel.app`

### Option 4: Custom Server

1. **Upload Files:**
   ```bash
   # Using FTP/SFTP
   sftp user@your-server.com
   put -r * /var/www/html/
   ```

2. **Configure Web Server:**
   - Set document root to project directory
   - Ensure `.htaccess` is configured (if using Apache)

3. **Update Backend URL:**
   - Update `js/config.js` with production backend URL
   - Ensure CORS is enabled on backend

---

## Maintenance

### Regular Updates

1. **Update Dependencies:**
   ```bash
   git pull origin main
   ```

2. **Monitor Backend:**
   - Check backend admin dashboard regularly
   - Review form submissions
   - Monitor error logs

3. **Backup Data:**
   - Export form submissions regularly
   - Backup database
   - Version control configuration

### Performance Optimization

1. **Minify CSS/JS:**
   ```bash
   # Using online tools or build tools
   # Minify css/style.css
   # Minify js/api.js
   # Minify js/config.js
   ```

2. **Optimize Images:**
   - Compress images before uploading
   - Use appropriate image formats (WebP, PNG, JPEG)
   - Lazy load images if needed

3. **Enable Caching:**
   - Configure browser caching headers
   - Use CDN for static assets

### Security

1. **HTTPS:**
   - Ensure your site uses HTTPS
   - Get SSL certificate from Let's Encrypt (free)

2. **Validate Input:**
   - All forms validate email addresses
   - Backend should validate all inputs
   - Sanitize data before storing

3. **Protect Backend:**
   - Use environment variables for sensitive data
   - Enable authentication on admin dashboard
   - Use rate limiting on API endpoints

### Monitoring

1. **Analytics:**
   - Set up Google Analytics
   - Track form submissions
   - Monitor user behavior

2. **Error Tracking:**
   - Monitor browser console errors
   - Set up error logging service
   - Review backend logs

3. **Uptime Monitoring:**
   - Use uptime monitoring service
   - Get alerts for downtime
   - Monitor API response times

---

## Troubleshooting

### Forms Not Submitting

1. Check backend URL in `js/config.js`
2. Verify backend is running
3. Check browser console for errors
4. Ensure CORS is enabled on backend
5. Check network tab in DevTools

### CORS Errors

1. Enable CORS on backend
2. Add your domain to allowed origins
3. Check backend configuration
4. Verify backend is running

### Styling Issues

1. Clear browser cache (Ctrl+Shift+Delete)
2. Check CSS file is loading
3. Verify CSS paths are correct
4. Check for CSS errors in console

### Mobile Issues

1. Check viewport meta tag in HTML
2. Test on actual mobile device
3. Check responsive breakpoints
4. Verify touch events work

---

## Support & Resources

### Documentation
- [API Integration Guide](./API_INTEGRATION_GUIDE.md)
- [Hybrid Setup Guide](./hybrid%20setup%20guide.md)
- [README](./README.md)

### External Resources
- [MDN Web Docs](https://developer.mozilla.org)
- [W3Schools](https://www.w3schools.com)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Getting Help
1. Check documentation first
2. Review browser console for errors
3. Check network tab in DevTools
4. Contact backend administrator
5. Review code comments

---

## Version History

- **v1.0.0** (2024) - Initial release with full setup documentation

---

**Last Updated:** 2024

For the latest updates, visit: https://github.com/bayeziddev/sayadbayezid
