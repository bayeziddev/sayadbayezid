# Hybrid Setup Guide: GitHub Pages + Manus Backend
## Complete Documentation for www.sayadbayezid.com

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [System Components](#system-components)
3. [Setup Instructions](#setup-instructions)
4. [Integration Code](#integration-code)
5. [Forms Implementation](#forms-implementation)
6. [Automation Workflows](#automation-workflows)
7. [Troubleshooting](#troubleshooting)
8. [FAQ](#faq)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Portfolio Website                    │
│              www.sayadbayezid.com (GitHub Pages)             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Static HTML Pages                                   │   │
│  │  • Portfolio                                         │   │
│  │  • Services                                          │   │
│  │  • About                                             │   │
│  │  • Contact Forms                                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ (API Calls)
┌─────────────────────────────────────────────────────────────┐
│                    Manus Backend (FREE)                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Database (MySQL/TiDB)                               │   │
│  │  • Subscribers table                                 │   │
│  │  • Client Inquiries table                            │   │
│  │  • Service Orders table                              │   │
│  │  • Feedback table                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  APIs (tRPC)                                         │   │
│  │  • Subscribe endpoint                                │   │
│  │  • Submit inquiry endpoint                           │   │
│  │  • Create order endpoint                             │   │
│  │  • Submit feedback endpoint                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Automation                                          │   │
│  │  • Email notifications                               │   │
│  │  • Data validation                                   │   │
│  │  • Auto-responses                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## System Components

### 1. Frontend (GitHub Pages)
- **Technology:** Static HTML, CSS, JavaScript
- **Hosting:** GitHub Pages (FREE)
- **Domain:** www.sayadbayezid.com
- **Responsibility:** User interface, forms, portfolio display

### 2. Backend (Manus)
- **Technology:** Node.js + Express + tRPC
- **Database:** MySQL/TiDB
- **Hosting:** Manus AI (FREE tier)
- **Responsibility:** Data storage, API endpoints, automation

### 3. Data Flow
```
User fills form on GitHub Pages
         ↓
JavaScript sends data to Manus API
         ↓
Manus validates and stores in database
         ↓
Automation triggers (email, notifications)
         ↓
Response sent back to GitHub Pages
         ↓
User sees confirmation message
```

---

## Setup Instructions

### Step 1: Set Up GitHub Pages Repository

#### 1.1 Create Repository
```bash
# On GitHub.com
1. Go to https://github.com/new
2. Repository name: sayadbayezid.github.io
3. Make it PUBLIC
4. Click "Create repository"
```

#### 1.2 Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/sayadbayezid.github.io.git
cd sayadbayezid.github.io
```

#### 1.3 Create Basic Structure
```
sayadbayezid.github.io/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── pages/
│   ├── portfolio.html
│   ├── services.html
│   ├── about.html
│   └── contact.html
└── README.md
```

#### 1.4 Push to GitHub
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

#### 1.5 Enable GitHub Pages
```
1. Go to repository Settings
2. Scroll to "Pages"
3. Source: main branch
4. Save
5. Site will be live at: https://YOUR_USERNAME.github.io
```

#### 1.6 Add Custom Domain
```
1. In GitHub Settings → Pages
2. Custom domain: www.sayadbayezid.com
3. Add DNS records (CNAME) at your domain registrar
4. Wait 24-48 hours for DNS propagation
```

---

### Step 2: Set Up Manus Backend

#### 2.1 Create Manus Project
```
1. Go to https://manus.im
2. Create new project: "sayadbayezid-backend"
3. Choose template: "Web App (tRPC + Database)"
4. Select features: Database, Server, User
```

#### 2.2 Database Schema
Create tables for your data:

**subscribers table:**
```sql
CREATE TABLE subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'unsubscribed') DEFAULT 'active'
);
```

**client_inquiries table:**
```sql
CREATE TABLE client_inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  service_type VARCHAR(100),
  message TEXT,
  status ENUM('new', 'contacted', 'completed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**service_orders table:**
```sql
CREATE TABLE service_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  description TEXT,
  budget DECIMAL(10, 2),
  timeline VARCHAR(100),
  status ENUM('pending', 'approved', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**feedback table:**
```sql
CREATE TABLE feedback (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2.3 Create API Endpoints (in Manus)

In your Manus project, add these endpoints in `server/routers.ts`:

```typescript
// Subscribe endpoint
subscribe: publicProcedure
  .input(z.object({ email: z.string().email(), name: z.string() }))
  .mutation(async ({ input }) => {
    // Save to database
    const result = await db.insert(subscribers).values({
      email: input.email,
      name: input.name
    });
    return { success: true, id: result.insertId };
  }),

// Submit inquiry endpoint
submitInquiry: publicProcedure
  .input(z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    serviceType: z.string(),
    message: z.string()
  }))
  .mutation(async ({ input }) => {
    const result = await db.insert(clientInquiries).values({
      name: input.name,
      email: input.email,
      phone: input.phone,
      service_type: input.serviceType,
      message: input.message
    });
    return { success: true, id: result.insertId };
  }),

// Create order endpoint
createOrder: publicProcedure
  .input(z.object({
    clientName: z.string(),
    clientEmail: z.string().email(),
    serviceName: z.string(),
    description: z.string(),
    budget: z.number().optional(),
    timeline: z.string().optional()
  }))
  .mutation(async ({ input }) => {
    const result = await db.insert(serviceOrders).values({
      client_name: input.clientName,
      client_email: input.clientEmail,
      service_name: input.serviceName,
      description: input.description,
      budget: input.budget,
      timeline: input.timeline
    });
    return { success: true, id: result.insertId };
  }),

// Submit feedback endpoint
submitFeedback: publicProcedure
  .input(z.object({
    name: z.string(),
    email: z.string().email(),
    rating: z.number().min(1).max(5),
    message: z.string()
  }))
  .mutation(async ({ input }) => {
    const result = await db.insert(feedback).values({
      name: input.name,
      email: input.email,
      rating: input.rating,
      message: input.message
    });
    return { success: true, id: result.insertId };
  })
```

---

## Integration Code

### Step 3: Connect GitHub Pages to Manus

#### 3.1 Get Your Manus API Endpoint

In your Manus project:
1. Go to Settings → API
2. Copy your API endpoint (e.g., `https://your-project.manus.space/api/trpc`)

#### 3.2 Create API Client (JavaScript)

Create `js/api-client.js`:

```javascript
// Configuration
const MANUS_API_URL = 'https://your-project.manus.space/api/trpc';

// API Client
const apiClient = {
  async call(procedure, input) {
    try {
      const response = await fetch(`${MANUS_API_URL}/${procedure}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  },

  // Subscribe
  async subscribe(email, name) {
    return this.call('subscribe', { email, name });
  },

  // Submit inquiry
  async submitInquiry(data) {
    return this.call('submitInquiry', data);
  },

  // Create order
  async createOrder(data) {
    return this.call('createOrder', data);
  },

  // Submit feedback
  async submitFeedback(data) {
    return this.call('submitFeedback', data);
  }
};
```

---

## Forms Implementation

### Step 4: Create Forms on GitHub Pages

#### 4.1 Newsletter Subscription Form

**HTML (in index.html):**
```html
<section id="newsletter">
  <h2>Subscribe to Newsletter</h2>
  <form id="newsletterForm">
    <input 
      type="email" 
      id="email" 
      placeholder="Your email" 
      required
    >
    <input 
      type="text" 
      id="name" 
      placeholder="Your name" 
      required
    >
    <button type="submit">Subscribe</button>
    <div id="newsletterMessage"></div>
  </form>
</section>
```

**JavaScript (in js/main.js):**
```javascript
document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const messageDiv = document.getElementById('newsletterMessage');

  try {
    const result = await apiClient.subscribe(email, name);
    messageDiv.innerHTML = '✅ Successfully subscribed!';
    document.getElementById('newsletterForm').reset();
  } catch (error) {
    messageDiv.innerHTML = '❌ Error: ' + error.message;
  }
});
```

#### 4.2 Client Inquiry Form

**HTML:**
```html
<section id="contact">
  <h2>Get in Touch</h2>
  <form id="inquiryForm">
    <input type="text" id="inquiryName" placeholder="Your name" required>
    <input type="email" id="inquiryEmail" placeholder="Your email" required>
    <input type="tel" id="inquiryPhone" placeholder="Your phone">
    <select id="serviceType" required>
      <option value="">Select service</option>
      <option value="web-development">Web Development</option>
      <option value="seo">SEO</option>
      <option value="social-media">Social Media</option>
      <option value="content">Content Writing</option>
    </select>
    <textarea id="inquiryMessage" placeholder="Tell us about your project" required></textarea>
    <button type="submit">Send Inquiry</button>
    <div id="inquiryMessage"></div>
  </form>
</section>
```

**JavaScript:**
```javascript
document.getElementById('inquiryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const data = {
    name: document.getElementById('inquiryName').value,
    email: document.getElementById('inquiryEmail').value,
    phone: document.getElementById('inquiryPhone').value,
    serviceType: document.getElementById('serviceType').value,
    message: document.getElementById('inquiryMessage').value
  };

  try {
    const result = await apiClient.submitInquiry(data);
    document.getElementById('inquiryMessage').innerHTML = '✅ Inquiry sent! We\'ll contact you soon.';
    document.getElementById('inquiryForm').reset();
  } catch (error) {
    document.getElementById('inquiryMessage').innerHTML = '❌ Error: ' + error.message;
  }
});
```

#### 4.3 Service Order Form

**HTML:**
```html
<section id="order">
  <h2>Order Service</h2>
  <form id="orderForm">
    <input type="text" id="orderName" placeholder="Your name" required>
    <input type="email" id="orderEmail" placeholder="Your email" required>
    <input type="text" id="serviceName" placeholder="Service name" required>
    <textarea id="orderDescription" placeholder="Describe your needs" required></textarea>
    <input type="number" id="budget" placeholder="Budget (optional)">
    <input type="text" id="timeline" placeholder="Timeline (e.g., 2 weeks)">
    <button type="submit">Place Order</button>
    <div id="orderMessage"></div>
  </form>
</section>
```

**JavaScript:**
```javascript
document.getElementById('orderForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const data = {
    clientName: document.getElementById('orderName').value,
    clientEmail: document.getElementById('orderEmail').value,
    serviceName: document.getElementById('serviceName').value,
    description: document.getElementById('orderDescription').value,
    budget: parseFloat(document.getElementById('budget').value) || null,
    timeline: document.getElementById('timeline').value
  };

  try {
    const result = await apiClient.createOrder(data);
    document.getElementById('orderMessage').innerHTML = '✅ Order placed! We\'ll review and contact you.';
    document.getElementById('orderForm').reset();
  } catch (error) {
    document.getElementById('orderMessage').innerHTML = '❌ Error: ' + error.message;
  }
});
```

#### 4.4 Feedback Form

**HTML:**
```html
<section id="feedback">
  <h2>Share Your Feedback</h2>
  <form id="feedbackForm">
    <input type="text" id="feedbackName" placeholder="Your name" required>
    <input type="email" id="feedbackEmail" placeholder="Your email" required>
    <div id="ratingContainer">
      <label>Rating:</label>
      <select id="rating" required>
        <option value="">Select rating</option>
        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
        <option value="4">⭐⭐⭐⭐ Good</option>
        <option value="3">⭐⭐⭐ Average</option>
        <option value="2">⭐⭐ Poor</option>
        <option value="1">⭐ Very Poor</option>
      </select>
    </div>
    <textarea id="feedbackMessage" placeholder="Your feedback" required></textarea>
    <button type="submit">Submit Feedback</button>
    <div id="feedbackMessage"></div>
  </form>
</section>
```

**JavaScript:**
```javascript
document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const data = {
    name: document.getElementById('feedbackName').value,
    email: document.getElementById('feedbackEmail').value,
    rating: parseInt(document.getElementById('rating').value),
    message: document.getElementById('feedbackMessage').value
  };

  try {
    const result = await apiClient.submitFeedback(data);
    document.getElementById('feedbackMessage').innerHTML = '✅ Thank you for your feedback!';
    document.getElementById('feedbackForm').reset();
  } catch (error) {
    document.getElementById('feedbackMessage').innerHTML = '❌ Error: ' + error.message;
  }
});
```

---

## Automation Workflows

### Step 5: Set Up Automations in Manus

#### 5.1 Email Notifications

In your Manus backend, add email notifications:

```typescript
import { notifyOwner } from "./server/_core/notification";

// After subscriber added
await notifyOwner({
  title: "New Newsletter Subscriber",
  content: `${input.name} (${input.email}) just subscribed to newsletter`
});

// After inquiry received
await notifyOwner({
  title: "New Client Inquiry",
  content: `${input.name} submitted an inquiry: ${input.message}`
});

// After order placed
await notifyOwner({
  title: "New Service Order",
  content: `${input.clientName} ordered ${input.serviceName}`
});

// After feedback received
await notifyOwner({
  title: "New Feedback - Rating: " + input.rating,
  content: `${input.name}: ${input.message}`
});
```

#### 5.2 Auto-Response Emails

Add auto-response functionality:

```typescript
// Send confirmation email to subscriber
const sendConfirmationEmail = async (email, name) => {
  // Use Manus email service or third-party like SendGrid
  // Send welcome email to new subscriber
};

// Send acknowledgment to inquiry submitter
const sendInquiryAcknowledgment = async (email, name) => {
  // Send "We received your inquiry" email
};
```

---

## Troubleshooting

### Common Issues & Solutions

#### Issue 1: CORS Error
**Error:** "Access to XMLHttpRequest blocked by CORS policy"

**Solution:**
1. In Manus backend, add CORS headers:
```typescript
app.use(cors({
  origin: ['https://www.sayadbayezid.com', 'https://sayadbayezid.github.io'],
  credentials: true
}));
```

#### Issue 2: 404 Not Found
**Error:** "API endpoint not found"

**Solution:**
1. Check your API endpoint URL is correct
2. Verify procedure names match exactly
3. Check Manus project is deployed

#### Issue 3: Form Data Not Saving
**Error:** "Data submitted but not appearing in database"

**Solution:**
1. Check database connection in Manus
2. Verify table names match in API code
3. Check for validation errors in console

#### Issue 4: DNS Not Resolving
**Error:** "Domain not working after 48 hours"

**Solution:**
1. Check DNS records are correct
2. Wait another 24-48 hours (DNS can take time)
3. Use https://www.whatsmydns.net/ to check status
4. Verify domain registrar settings

---

## FAQ

### Q1: Is this setup really FREE?
**A:** Yes! GitHub Pages (FREE) + Manus free tier (FREE) = completely free. You only pay for your domain name (~$10/year).

### Q2: How much data can I store?
**A:** Manus free tier includes database. GitHub Pages has no storage limit for static files.

### Q3: Can I add more forms later?
**A:** Yes! Just add new endpoints in Manus and new forms in GitHub Pages. Follow the same pattern.

### Q4: What if I need more features?
**A:** You can upgrade Manus anytime for more features, but the free tier is quite powerful.

### Q5: How do I backup my data?
**A:** Manus automatically backs up your database. You can also export data anytime.

### Q6: Can I use a different domain?
**A:** Yes! Just update the DNS records at your registrar to point to GitHub Pages.

### Q7: How do I monitor form submissions?
**A:** Log into Manus dashboard and check the database tables for submitted data.

### Q8: Can I send emails to clients?
**A:** Yes! Use Manus notification system or integrate with SendGrid/Mailgun.

---

## Next Steps

1. **Create GitHub repository** - Set up your portfolio
2. **Create Manus project** - Set up backend
3. **Add database tables** - Create schema
4. **Create API endpoints** - Add tRPC procedures
5. **Add forms to GitHub Pages** - Implement forms
6. **Test everything** - Submit test data
7. **Go live** - Point domain to GitHub Pages
8. **Monitor submissions** - Check Manus dashboard

---

## Support & Resources

- **GitHub Pages Docs:** https://pages.github.com/
- **Manus Docs:** https://manus.im/docs
- **tRPC Docs:** https://trpc.io/
- **JavaScript Fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## Summary

Your hybrid setup gives you:
- ✅ Professional portfolio on GitHub Pages
- ✅ Powerful backend on Manus
- ✅ Completely FREE
- ✅ Easy to maintain
- ✅ Scalable for future growth

Start with the basic setup and add more features as you grow!

Good luck! 🚀
