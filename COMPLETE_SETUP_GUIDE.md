# Complete Setup Guide - GitHub Pages + Manus Backend

This guide provides step-by-step instructions to set up a fully working hybrid system with GitHub Pages frontend and Manus backend.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture](#architecture)
3. [Frontend Setup](#frontend-setup)
4. [Backend Setup](#backend-setup)
5. [Integration](#integration)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

### 5-Minute Setup

1. **Update Backend URL** (in browser console):
   ```javascript
   setManusBacendUrl('https://your-manus-backend.com/api/trpc');
   ```

2. **Test Forms** at `forms-example.html`

3. **Check Console** (F12) for logs and responses

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Pages (Frontend)                   │
│                                                              │
│  • Static HTML pages                                         │
│  • JavaScript forms                                          │
│  • API client (api-client.js)                               │
│  • No backend needed                                         │
└─────────────────────────────────────────────────────────────┘
                            ↓ (API Calls)
┌─────────────────────────────────────────────────────────────┐
│                    Manus Backend (Server)                    │
│                                                              │
│  • tRPC API endpoints                                        │
│  • MySQL/TiDB database                                       │
│  • Email notifications                                       │
│  • Data validation                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Setup

### Step 1: Files Included

Your repository now includes:

| File | Purpose |
|------|---------|
| `js/api-client.js` | Complete API client for Manus backend |
| `forms-example.html` | Working example with all forms |
| `pages/contact.html` | Contact page with forms |
| `pages/services.html` | Services page with order forms |

### Step 2: Include API Client

Add to your HTML pages:

```html
<script src="js/api-client.js"></script>
```

### Step 3: Use API Functions

```javascript
// Subscribe to newsletter
await apiClient.subscribe('email@example.com', 'Name');

// Submit inquiry
await apiClient.submitInquiry({
    name: 'John',
    email: 'john@example.com',
    message: 'Hello'
});

// Create order
await apiClient.createOrder({
    clientName: 'Jane',
    clientEmail: 'jane@example.com',
    serviceName: 'Web Development',
    description: 'Build my website',
    budget: '$5000'
});

// Submit feedback
await apiClient.submitFeedback({
    name: 'Bob',
    email: 'bob@example.com',
    rating: 5,
    message: 'Great service!'
});
```

---

## Backend Setup

### Step 1: Create Manus Project

1. Go to https://manus.im
2. Create new project: "sayadbayezid-backend"
3. Choose template: "Web App (tRPC + Database)"
4. Select features: Database, Server, User

### Step 2: Database Schema

Create these tables in your Manus backend:

```sql
-- Subscribers table
CREATE TABLE subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'unsubscribed') DEFAULT 'active'
);

-- Client inquiries table
CREATE TABLE client_inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT,
  status ENUM('new', 'contacted', 'completed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service orders table
CREATE TABLE service_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  order_details TEXT,
  budget VARCHAR(100),
  status ENUM('pending', 'approved', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback table
CREATE TABLE feedback (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 3: API Endpoints

Add these endpoints in `server/routers.ts`:

```typescript
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
  // ... existing code ...

  // Newsletter subscription
  newsletters: router({
    subscribe: publicProcedure
      .input(z.object({
        subscriberEmail: z.string().email(),
        subscriberName: z.string()
      }))
      .mutation(async ({ input, ctx }) => {
        // Save to database
        const result = await db.insert(subscribers).values({
          email: input.subscriberEmail,
          name: input.subscriberName
        });
        
        // Send notification to owner
        await notifyOwner({
          title: "New Newsletter Subscriber",
          content: `${input.subscriberName} (${input.subscriberEmail}) subscribed`
        });
        
        return { success: true, id: result.insertId };
      })
  }),

  // Client inquiries
  inquiries: router({
    submit: publicProcedure
      .input(z.object({
        clientName: z.string(),
        clientEmail: z.string().email(),
        message: z.string()
      }))
      .mutation(async ({ input, ctx }) => {
        const result = await db.insert(clientInquiries).values({
          name: input.clientName,
          email: input.clientEmail,
          message: input.message
        });
        
        await notifyOwner({
          title: "New Client Inquiry",
          content: `${input.clientName}: ${input.message}`
        });
        
        return { success: true, id: result.insertId };
      })
  }),

  // Service orders
  serviceOrders: router({
    submit: publicProcedure
      .input(z.object({
        clientName: z.string(),
        clientEmail: z.string().email(),
        serviceName: z.string(),
        orderDetails: z.string(),
        budget: z.string().optional()
      }))
      .mutation(async ({ input, ctx }) => {
        const result = await db.insert(serviceOrders).values({
          client_name: input.clientName,
          client_email: input.clientEmail,
          service_name: input.serviceName,
          order_details: input.orderDetails,
          budget: input.budget
        });
        
        await notifyOwner({
          title: "New Service Order",
          content: `${input.clientName} ordered ${input.serviceName}`
        });
        
        return { success: true, id: result.insertId };
      })
  }),

  // Feedback
  feedback: router({
    submit: publicProcedure
      .input(z.object({
        clientName: z.string(),
        clientEmail: z.string().email(),
        rating: z.number().min(1).max(5),
        message: z.string()
      }))
      .mutation(async ({ input, ctx }) => {
        const result = await db.insert(feedback).values({
          name: input.clientName,
          email: input.clientEmail,
          rating: input.rating,
          message: input.message
        });
        
        await notifyOwner({
          title: `New Feedback - ${input.rating}⭐`,
          content: `${input.clientName}: ${input.message}`
        });
        
        return { success: true, id: result.insertId };
      })
  })
});
```

---

## Integration

### Step 1: Get Your Backend URL

In your Manus project:
1. Go to Settings → API
2. Copy your API endpoint (e.g., `https://3000-xxx.manus.computer/api/trpc`)

### Step 2: Set Backend URL in Frontend

**Option A: Browser Console**
```javascript
setManusBacendUrl('https://3000-xxx.manus.computer/api/trpc');
```

**Option B: Edit HTML**
```html
<script>
  // Set before loading api-client.js
  localStorage.setItem('manus_api_url', 'https://3000-xxx.manus.computer/api/trpc');
</script>
<script src="js/api-client.js"></script>
```

### Step 3: Test Integration

1. Open `forms-example.html`
2. Open browser console (F12)
3. Run: `logApiConfig()`
4. Fill out a form and submit
5. Check console for logs

---

## Testing

### Test Newsletter Subscription

```javascript
// In browser console
apiClient.subscribe('test@example.com', 'Test User')
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

### Test Inquiry Submission

```javascript
apiClient.submitInquiry({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I need a website'
})
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

### Test Order Creation

```javascript
apiClient.createOrder({
    clientName: 'Jane Smith',
    clientEmail: 'jane@example.com',
    serviceName: 'Web Development',
    description: 'E-commerce website',
    budget: '$5000-$10000'
})
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

### Test Feedback Submission

```javascript
apiClient.submitFeedback({
    name: 'Bob Johnson',
    email: 'bob@example.com',
    rating: 5,
    message: 'Excellent service!'
})
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

---

## Troubleshooting

### Issue: "API Error: 404 Not Found"

**Cause:** Backend URL or endpoint is incorrect

**Solution:**
1. Check backend URL: `getManusBacendUrl()`
2. Verify backend is running
3. Check endpoint names in backend match frontend

### Issue: CORS Error

**Cause:** Backend doesn't allow requests from your domain

**Solution:**
1. In Manus backend, add CORS:
   ```typescript
   app.use(cors({
     origin: ['https://www.sayadbayezid.com', 'https://sayadbayezid.github.io'],
     credentials: true
   }));
   ```

### Issue: Form Data Not Saving

**Cause:** Database connection or validation error

**Solution:**
1. Check database is connected
2. Verify table names match
3. Check browser console for validation errors
4. Review backend logs

### Issue: No Notifications

**Cause:** Notification system not configured

**Solution:**
1. Ensure `notifyOwner` is imported
2. Check owner email is set
3. Verify email service is configured

---

## File Reference

### API Client: `js/api-client.js`

**Functions:**
- `apiClient.subscribe(email, name)` - Newsletter subscription
- `apiClient.submitInquiry(data)` - Client inquiry
- `apiClient.createOrder(data)` - Service order
- `apiClient.submitFeedback(data)` - Feedback submission

**Utilities:**
- `setManusBacendUrl(url)` - Set backend URL
- `getManusBacendUrl()` - Get backend URL
- `validateEmail(email)` - Email validation
- `showNotification(message, type, duration)` - Show notification
- `logApiConfig()` - Debug configuration

### Example Page: `forms-example.html`

Complete working example with:
- Newsletter subscription form
- Client inquiry form
- Service order form
- Feedback form
- Debug console
- Setup instructions

---

## Deployment

### Deploy to GitHub Pages

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add complete form setup"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to Pages
   - Select "Deploy from a branch" → "main"
   - Your site is live at: `https://yourusername.github.io/sayadbayezid`

3. **Add Custom Domain:**
   - In GitHub Settings → Pages
   - Add custom domain: `www.sayadbayezid.com`
   - Update DNS records at your registrar

---

## Next Steps

1. ✅ Set up Manus backend
2. ✅ Create database tables
3. ✅ Add API endpoints
4. ✅ Update backend URL in frontend
5. ✅ Test all forms
6. ✅ Deploy to GitHub Pages
7. ✅ Monitor submissions in Manus dashboard

---

## Support

For issues:
1. Check browser console (F12)
2. Review network tab for API calls
3. Run `logApiConfig()` to verify setup
4. Check Manus backend logs

---

**Ready to go!** 🚀

Your hybrid setup is now complete. Start accepting submissions and growing your business!
