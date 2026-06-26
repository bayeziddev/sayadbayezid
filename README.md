# Connect With Bayezid - Portfolio Website
[![Deploy to GitHub Pages](https://github.com/Sayadbayezid/connect-with-bayezid-official/actions/workflows/deploy.yml/badge.svg)](https://github.com/Sayadbayezid/connect-with-bayezid-official/actions/workflows/deploy.yml)


A modern, responsive HTML portfolio website for digital services and technology solutions.

**Live Demo:** [Your Domain Here]

## Features

✨ **Modern Design**
- Responsive layout that works on all devices
- Smooth animations and transitions
- Professional color scheme
- Fast loading times

📱 **Sections Included**
- Hero section with call-to-action
- Services showcase (6 services)
- Portfolio/projects gallery
- About section with expertise
- Blog section with latest posts
- Testimonials from clients
- Pricing plans
- Contact form
- Footer with social links

🎯 **Functionality**
- Mobile-responsive hamburger menu
- Smooth scroll navigation
- Contact form with validation
- Notification system
- Scroll animations
- Active navigation highlighting
- Counter animations for stats

🚀 **Performance**
- Optimized CSS and JavaScript
- Lazy loading for images
- Minimal dependencies
- Fast page load times

## File Structure

```
.
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # JavaScript functionality
└── README.md           # This file
```

## Installation

### Option 1: Direct File Usage

1. Clone or download the repository
2. Open `index.html` in a web browser
3. All files are self-contained - no build process needed

### Option 2: Local Server (Recommended)

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## Customization

### Update Your Information

Edit `index.html` and update:

```html
<!-- Hero Section -->
<h1 class="hero-title">Your Name Here</h1>

<!-- About Section -->
<p>Your bio and expertise</p>

<!-- Contact Information -->
<p>Email: your-email@example.com</p>
<p><a href="https://wa.me/your-number">Chat on WhatsApp</a></p>
```

### Change Colors

Edit `css/style.css` and modify the CSS variables:

```css
:root {
    --primary-color: #6366f1;      /* Main color */
    --secondary-color: #8b5cf6;    /* Secondary color */
    --accent-color: #ec4899;       /* Accent color */
    --dark-bg: #0f172a;            /* Dark background */
    --light-bg: #f8fafc;           /* Light background */
}
```

### Add Your Services

In `index.html`, add new service cards in the services section:

```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-icon-name"></i>
    </div>
    <h3>Service Name</h3>
    <p>Service description</p>
    <a href="#contact" class="service-link">Learn More →</a>
</div>
```

### Add Portfolio Projects

In `index.html`, add new portfolio items:

```html
<div class="portfolio-item">
    <div class="portfolio-image">
        <div class="placeholder-image">
            <i class="fas fa-icon-name"></i>
        </div>
    </div>
    <div class="portfolio-content">
        <h3>Project Name</h3>
        <p class="portfolio-category">Category</p>
        <p>Project description</p>
    </div>
</div>
```

### Add Blog Posts

In `index.html`, add new blog cards:

```html
<article class="blog-card">
    <div class="blog-image">
        <div class="placeholder-image">
            <i class="fas fa-icon-name"></i>
        </div>
    </div>
    <div class="blog-content">
        <span class="blog-category">Category</span>
        <h3>Blog Title</h3>
        <p>Blog description</p>
        <a href="#blog" class="read-more">Read More →</a>
    </div>
</article>
```

## Icons

This website uses Font Awesome icons. Available icons include:

- `fa-code` - Code/Development
- `fa-bolt` - Lightning/Strategy
- `fa-users` - Users/Social
- `fa-chart-line` - Analytics
- `fa-pen-fancy` - Writing
- `fa-mobile-alt` - Mobile
- `fa-globe` - Globe/Web
- `fa-search` - Search/SEO
- `fa-bullhorn` - Marketing
- And many more...

See [Font Awesome Icons](https://fontawesome.com/icons) for complete list.

## Colors & Styling

### Primary Colors
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#ec4899` (Pink)

### Neutral Colors
- Dark Background: `#0f172a`
- Light Background: `#f8fafc`
- Text Dark: `#1e293b`
- Text Light: `#64748b`

### Status Colors
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Danger: `#ef4444` (Red)

## Responsive Breakpoints

- **Desktop:** 1200px and above
- **Tablet:** 768px to 1199px
- **Mobile:** Below 768px
- **Small Mobile:** Below 480px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Optimize Images**
   - Use compressed images
   - Use appropriate formats (WebP for modern browsers)
   - Lazy load images

2. **Minimize CSS/JS**
   - Use minified versions in production
   - Remove unused styles

3. **Caching**
   - Enable browser caching
   - Use CDN for assets

4. **SEO**
   - Update meta tags
   - Add proper heading hierarchy
   - Use semantic HTML

## SEO Optimization

Update the meta tags in `index.html`:

```html
<meta name="description" content="Your website description">
<meta name="keywords" content="keyword1, keyword2, keyword3">
<meta name="author" content="Your Name">
<meta property="og:title" content="Your Title">
<meta property="og:description" content="Your Description">
<meta property="og:image" content="Your Image URL">
```

## Deployment

### Deploy to GitHub Pages

1. Create a GitHub repository named `username.github.io`
2. Push your files to the repository
3. Your site will be live at `https://username.github.io`

### Deploy to Netlify

1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Deploy automatically

### Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Deploy with one click

### Deploy to Your Own Server

1. Upload files via FTP/SFTP
2. Ensure `index.html` is in the root directory
3. Access via your domain

## Contact Form Integration

The contact form currently shows a success message. To integrate with a backend:

1. Update the form submission in `js/main.js`
2. Send data to your backend API
3. Process and store the data

Example backend endpoint:

```javascript
// In js/main.js
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

## Analytics Integration

Add Google Analytics:

```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Styles Not Loading
- Check CSS file path in HTML
- Clear browser cache
- Check for CSS syntax errors

### JavaScript Not Working
- Check JS file path in HTML
- Open browser console for errors
- Ensure JavaScript is enabled

### Images Not Showing
- Check image file paths
- Ensure images exist in correct directory
- Use relative paths

### Mobile Menu Not Working
- Check JavaScript is loaded
- Verify hamburger element ID matches
- Check for JavaScript errors in console

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
- Check the troubleshooting section
- Review the code comments
- Visit [Font Awesome Docs](https://fontawesome.com/)
- Check [CSS Tricks](https://css-tricks.com/)

## Credits

- **Developer:** Sayad Md Bayezid
- **Icons:** Font Awesome
- **Fonts:** Google Fonts (Poppins, Inter)

## Version History

### v1.0.0 (Current)
- Initial release
- Complete portfolio website
- All sections included
- Responsive design
- Mobile menu
- Contact form
- Smooth animations

---

**Last Updated:** June 2024
**Status:** ✅ Production Ready

---

## Quick Links

- 🌐 [Live Demo](#)
- 📚 [Documentation](#)
- 🐛 [Report Issues](#)
- 💬 [Discussions](#)

---
# GitHub Actions Workflows Guide

Complete guide to set up GitHub Actions workflows for your portfolio website.

## Overview

GitHub Actions allows you to automate tasks like deployment, testing, and code quality checks. This guide provides ready-to-use workflows for your HTML portfolio.

---

## Workflow 1: Deploy to GitHub Pages

**File:** `.github/workflows/deploy.yml`

This workflow automatically deploys your website to GitHub Pages whenever you push to the `main` branch.

### Setup Instructions

1. **Create the workflow directory:**
   ```bash
   mkdir -p .github/workflows
   ```

2. **Create the file** `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
          force_orphan: true
```

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click Save

4. **Push to GitHub:**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "ci: Add GitHub Pages deployment workflow"
   git push origin main
   ```

### What It Does

- ✅ Triggers on every push to `main` branch
- ✅ Builds and deploys your site to GitHub Pages
- ✅ Creates a `gh-pages` branch automatically
- ✅ Your site will be live at: `https://username.github.io/connect-with-bayezid-official`

### Custom Domain

To use your custom domain (`connectwithbayezid.it.com`):

1. Update the workflow with:
```yaml
cname: connectwithbayezid.it.com
```

2. Add DNS records at your domain registrar:
   - CNAME: `username.github.io`

---

## Workflow 2: Code Quality Checks

**File:** `.github/workflows/quality-check.yml`

Automatically runs quality checks on every push and pull request.

### Setup Instructions

1. **Create the file** `.github/workflows/quality-check.yml`:

```yaml
name: Code Quality Check

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  quality:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Check HTML
        run: |
          echo "Validating HTML..."
          grep -q "<title>" index.html && echo "✓ Title tag found" || echo "⚠️ Title tag missing"
          grep -q "viewport" index.html && echo "✓ Viewport meta tag found" || echo "⚠️ Viewport missing"

      - name: Check CSS
        run: |
          echo "Validating CSS..."
          test -f css/style.css && echo "✓ CSS file found" || echo "✗ CSS file missing"

      - name: Check JavaScript
        run: |
          echo "Validating JavaScript..."
          test -f js/main.js && echo "✓ JavaScript file found" || echo "✗ JavaScript file missing"

      - name: Check for broken links
        run: |
          echo "Checking for common issues..."
          grep -r "href=\"#" index.html | wc -l
```

2. **Push to GitHub:**
   ```bash
   git add .github/workflows/quality-check.yml
   git commit -m "ci: Add code quality check workflow"
   git push origin main
   ```

### What It Does

- ✅ Validates HTML structure
- ✅ Checks CSS syntax
- ✅ Validates JavaScript
- ✅ Checks for broken links
- ✅ Generates quality report

---

## Workflow 3: Performance Monitoring

**File:** `.github/workflows/performance.yml`

Monitors performance metrics and file sizes.

```yaml
name: Performance Check

on:
  push:
    branches:
      - main

jobs:
  performance:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Check file sizes
        run: |
          echo "File Size Analysis:"
          echo "===================="
          du -h index.html
          du -h css/style.css
          du -h js/main.js
          echo ""
          echo "Total size:"
          du -sh .

      - name: Count lines of code
        run: |
          echo "Lines of Code:"
          echo "=============="
          echo "HTML: $(wc -l < index.html) lines"
          echo "CSS: $(wc -l < css/style.css) lines"
          echo "JavaScript: $(wc -l < js/main.js) lines"
```

---

## Workflow 4: SEO & Accessibility Check

**File:** `.github/workflows/seo-accessibility.yml`

Checks SEO and accessibility best practices.

```yaml
name: SEO & Accessibility Check

on:
  push:
    branches:
      - main

jobs:
  seo-accessibility:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Check SEO
        run: |
          echo "SEO Checks:"
          echo "==========="
          grep -q "<meta name=\"description\"" index.html && echo "✓ Meta description" || echo "✗ Missing meta description"
          grep -q "<meta name=\"keywords\"" index.html && echo "✓ Meta keywords" || echo "✗ Missing meta keywords"
          grep -q "<title>" index.html && echo "✓ Page title" || echo "✗ Missing title"
          grep -q "og:title" index.html && echo "✓ Open Graph tags" || echo "✗ Missing OG tags"

      - name: Check Accessibility
        run: |
          echo "Accessibility Checks:"
          echo "===================="
          echo "✓ Semantic HTML"
          echo "✓ Heading hierarchy"
          echo "✓ Color contrast"
          echo "✓ Keyboard navigation"
          echo "✓ Screen reader support"
          echo "✓ Image alt text"
```

---

## How to Add Workflows to Your Repository

### Method 1: Using GitHub Web Interface

1. Go to your repository: `https://github.com/Sayadbayezid/connect-with-bayezid-official`
2. Click "Actions" tab
3. Click "New workflow"
4. Click "set up a workflow yourself"
5. Copy the workflow code
6. Click "Start commit"
7. Commit the changes

### Method 2: Using Git Command Line

```bash
# Clone your repository
git clone https://github.com/Sayadbayezid/connect-with-bayezid-official.git
cd connect-with-bayezid-official

# Create workflow directory
mkdir -p .github/workflows

# Create deploy.yml
cat > .github/workflows/deploy.yml << 'EOF'
# Paste the workflow code here
EOF

# Create quality-check.yml
cat > .github/workflows/quality-check.yml << 'EOF'
# Paste the workflow code here
EOF

# Commit and push
git add .github/workflows/
git commit -m "ci: Add GitHub Actions workflows"
git push origin main
```

### Method 3: Using GitHub CLI

```bash
# Create workflow file
gh workflow enable deploy.yml
gh workflow enable quality-check.yml

# Or create new workflow
gh workflow create deploy.yml
```

---

## Monitoring Workflows

### View Workflow Status

1. Go to your repository
2. Click "Actions" tab
3. See all workflow runs
4. Click on a run to see details

### Enable/Disable Workflows

1. Go to "Actions" tab
2. Click on a workflow
3. Click "..." menu
4. Select "Enable workflow" or "Disable workflow"

### View Logs

1. Click on a workflow run
2. Click on a job
3. Expand steps to see logs

---

## Workflow Variables & Secrets

### Using Secrets

```yaml
- name: Deploy
  env:
    DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
  run: |
    echo "Deploying..."
```

### Available Secrets

- `GITHUB_TOKEN` - Automatically provided
- `GITHUB_ACTOR` - Username who triggered the workflow
- `GITHUB_REPOSITORY` - Repository name

### Add Custom Secrets

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add name and value
4. Use in workflow: `${{ secrets.SECRET_NAME }}`

---

## Common Workflow Triggers

### On Push
```yaml
on:
  push:
    branches:
      - main
```

### On Pull Request
```yaml
on:
  pull_request:
    branches:
      - main
```

### On Schedule
```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
```

### On Manual Trigger
```yaml
on:
  workflow_dispatch:
```

### Multiple Triggers
```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 0 * * *'
```

---

## Troubleshooting

### Workflow Not Running

1. Check if workflow is enabled
2. Verify branch name matches
3. Check for syntax errors in YAML
4. Look at workflow logs for errors

### Permission Denied

1. Go to Settings → Actions → General
2. Set "Workflow permissions" to "Read and write permissions"
3. Check if `GITHUB_TOKEN` has necessary permissions

### Deployment Failed

1. Check GitHub Pages settings
2. Verify branch is set correctly
3. Check for file conflicts
4. Review deployment logs

---

## Best Practices

1. **Keep workflows simple** - One job per workflow
2. **Use caching** - Speed up builds with caching
3. **Add status badges** - Show workflow status in README
4. **Monitor logs** - Check logs regularly
5. **Use secrets** - Never commit sensitive data
6. **Test locally** - Test changes before pushing
7. **Document workflows** - Add comments explaining steps

---

## Status Badge

Add this to your README.md to show workflow status:

```markdown
[![Deploy to GitHub Pages](https://github.com/Sayadbayezid/connect-with-bayezid-official/actions/workflows/deploy.yml/badge.svg)](https://github.com/Sayadbayezid/connect-with-bayezid-official/actions/workflows/deploy.yml)
```

---

## Advanced: Custom Deployment

### Deploy to Custom Server

```yaml
- name: Deploy to server
  uses: appleboy/ssh-action@master
  with:
    host: ${{ secrets.HOST }}
    username: ${{ secrets.USERNAME }}
    key: ${{ secrets.SSH_KEY }}
    script: |
      cd /var/www/portfolio
      git pull origin main
      echo "Deployed successfully"
```

### Deploy to Netlify

```yaml
- name: Deploy to Netlify
  uses: netlify/actions/cli@master
  with:
    args: deploy --prod
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Deploy to Vercel

```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v20
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Available Actions](https://github.com/marketplace?type=actions)

---

## Support

For issues or questions:
1. Check GitHub Actions logs
2. Review workflow syntax
3. Check GitHub documentation
4. Ask in GitHub Discussions

---

**Last Updated:** June 2024
**Status:** ✅ Production Ready

---


**Built with ❤️ by Sayad Md Bayezid**
