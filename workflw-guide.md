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
