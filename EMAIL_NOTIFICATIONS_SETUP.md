# Email Notifications Setup Guide

Complete guide to set up email notifications for all form submissions to `sayadmdbayezidhosan@gmail.com`.

## Table of Contents

1. [Overview](#overview)
2. [Email Configuration](#email-configuration)
3. [Backend Setup](#backend-setup)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

---

## Overview

### Email Notifications Workflow

```
User submits form on GitHub Pages
         ↓
Frontend sends data to Manus API
         ↓
Backend receives data
         ↓
Data saved to database
         ↓
Email notification sent to: sayadmdbayezidhosan@gmail.com
         ↓
Owner receives email with submission details
```

### Forms That Send Notifications

1. **Newsletter Subscription** - New subscriber email
2. **Client Inquiry** - New inquiry details
3. **Service Order** - New order information
4. **Customer Feedback** - New feedback with rating

---

## Email Configuration

### Step 1: Add Email to Environment Variables

Add your email to `.env`:

```bash
# Email Configuration
OWNER_EMAIL=sayadmdbayezidhosan@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@sayadbayezid.com
```

### Step 2: Add to GitHub Secrets

1. Go to: https://github.com/bayeziddev/sayadbayezid/settings/secrets/actions
2. Add secrets:
   - `OWNER_EMAIL` = `sayadmdbayezidhosan@gmail.com`
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_USER` = your email
   - `SMTP_PASSWORD` = your app password
   - `SMTP_FROM` = `noreply@sayadbayezid.com`

### Step 3: Add to Manus Backend Secrets

1. Go to Manus Dashboard
2. Settings → Secrets
3. Add each secret:
   - `OWNER_EMAIL` = `sayadmdbayezidhosan@gmail.com`
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_USER` = your email
   - `SMTP_PASSWORD` = your app password
   - `SMTP_FROM` = `noreply@sayadbayezid.com`

---

## Backend Setup

### Step 1: Update Environment Configuration

**File: `server/_core/env.ts`**

```typescript
export const ENV = {
  // Email Configuration
  ownerEmail: process.env.OWNER_EMAIL || 'sayadmdbayezidhosan@gmail.com',
  smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
  smtpPort: parseInt(process.env.SMTP_PORT || '587'),
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpFrom: process.env.SMTP_FROM || 'noreply@sayadbayezid.com',
  
  // Validation
  isEmailConfigured: !!process.env.SMTP_USER && !!process.env.SMTP_PASSWORD,
};
```

### Step 2: Create Email Service

**File: `server/_core/email.ts`** (Create new file)

```typescript
import nodemailer from 'nodemailer';
import { ENV } from './env';

// Create transporter
const transporter = nodemailer.createTransport({
  host: ENV.smtpHost,
  port: ENV.smtpPort,
  secure: ENV.smtpPort === 465, // true for 465, false for other ports
  auth: {
    user: ENV.smtpUser,
    pass: ENV.smtpPassword,
  },
});

// Email templates
const emailTemplates = {
  newsletter: (name: string, email: string) => ({
    subject: '🎉 New Newsletter Subscriber',
    html: `
      <h2>New Newsletter Subscriber</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p>This subscriber has joined your newsletter!</p>
    `,
  }),

  inquiry: (name: string, email: string, message: string) => ({
    subject: '📧 New Client Inquiry',
    html: `
      <h2>New Client Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p>Please respond to this inquiry as soon as possible.</p>
    `,
  }),

  order: (clientName: string, clientEmail: string, serviceName: string, description: string, budget?: string) => ({
    subject: '🛒 New Service Order',
    html: `
      <h2>New Service Order</h2>
      <p><strong>Client Name:</strong> ${clientName}</p>
      <p><strong>Client Email:</strong> ${clientEmail}</p>
      <p><strong>Service:</strong> ${serviceName}</p>
      <p><strong>Description:</strong></p>
      <p>${description.replace(/\n/g, '<br>')}</p>
      ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p>Please review this order and contact the client.</p>
    `,
  }),

  feedback: (name: string, email: string, rating: number, message: string) => ({
    subject: `⭐ New Feedback - ${rating} Stars`,
    html: `
      <h2>New Customer Feedback</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Rating:</strong> ${'⭐'.repeat(rating)}</p>
      <p><strong>Feedback:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p>Thank you for the feedback!</p>
    `,
  }),
};

// Send email function
export async function sendEmail(
  to: string,
  template: keyof typeof emailTemplates,
  ...args: any[]
) {
  try {
    if (!ENV.isEmailConfigured) {
      console.warn('[Email] Email not configured, skipping notification');
      return { success: false, reason: 'Email not configured' };
    }

    const templateData = emailTemplates[template](...args);

    const info = await transporter.sendMail({
      from: ENV.smtpFrom,
      to: to,
      subject: templateData.subject,
      html: templateData.html,
    });

    console.log(`[Email] Sent to ${to}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email] Failed to send:', error);
    return { success: false, error: error.message };
  }
}

// Test email function
export async function sendTestEmail(to: string) {
  return sendEmail(
    to,
    'newsletter',
    'Test User',
    'test@example.com'
  );
}
```

### Step 3: Update tRPC Procedures

**File: `server/routers.ts`**

```typescript
import { sendEmail } from './_core/email';
import { ENV } from './_core/env';

export const appRouter = router({
  // ... existing code ...

  // Newsletter subscription
  newsletters: router({
    subscribe: publicProcedure
      .input(z.object({
        subscriberEmail: z.string().email(),
        subscriberName: z.string()
      }))
      .mutation(async ({ input }) => {
        // Save to database
        const result = await db.insert(subscribers).values({
          email: input.subscriberEmail,
          name: input.subscriberName
        });

        // Send email notification to owner
        await sendEmail(
          ENV.ownerEmail,
          'newsletter',
          input.subscriberName,
          input.subscriberEmail
        );

        // Send notification via Manus
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
      .mutation(async ({ input }) => {
        // Save to database
        const result = await db.insert(clientInquiries).values({
          name: input.clientName,
          email: input.clientEmail,
          message: input.message
        });

        // Send email notification to owner
        await sendEmail(
          ENV.ownerEmail,
          'inquiry',
          input.clientName,
          input.clientEmail,
          input.message
        );

        // Send notification via Manus
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
      .mutation(async ({ input }) => {
        // Save to database
        const result = await db.insert(serviceOrders).values({
          client_name: input.clientName,
          client_email: input.clientEmail,
          service_name: input.serviceName,
          order_details: input.orderDetails,
          budget: input.budget
        });

        // Send email notification to owner
        await sendEmail(
          ENV.ownerEmail,
          'order',
          input.clientName,
          input.clientEmail,
          input.serviceName,
          input.orderDetails,
          input.budget
        );

        // Send notification via Manus
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
      .mutation(async ({ input }) => {
        // Save to database
        const result = await db.insert(feedback).values({
          name: input.clientName,
          email: input.clientEmail,
          rating: input.rating,
          message: input.message
        });

        // Send email notification to owner
        await sendEmail(
          ENV.ownerEmail,
          'feedback',
          input.clientName,
          input.clientEmail,
          input.rating,
          input.message
        );

        // Send notification via Manus
        await notifyOwner({
          title: `New Feedback - ${input.rating}⭐`,
          content: `${input.clientName}: ${input.message}`
        });

        return { success: true, id: result.insertId };
      })
  })
});
```

### Step 4: Add Email Service to package.json

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

---

## Testing

### Test 1: Send Test Email

**Create test endpoint in `server/routers.ts`:**

```typescript
system: router({
  // ... existing code ...
  
  sendTestEmail: publicProcedure.query(async () => {
    const { sendTestEmail } = await import('./_core/email');
    const result = await sendTestEmail(ENV.ownerEmail);
    return result;
  })
})
```

**Call from browser console:**

```javascript
// Test email
fetch('/api/trpc/system.sendTestEmail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
})
.then(r => r.json())
.then(console.log);
```

### Test 2: Submit a Form

1. Open `forms-example.html`
2. Fill out newsletter form
3. Submit
4. Check email at `sayadmdbayezidhosan@gmail.com`
5. Should receive notification email

### Test 3: Check Logs

```bash
# In Manus backend logs, look for:
# [Email] Sent to sayadmdbayezidhosan@gmail.com: <message-id>
# ✅ Email sent successfully
```

---

## Email Configuration for Gmail

### Step 1: Enable 2-Factor Authentication

1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification"

### Step 2: Create App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Google will generate a 16-character password
4. Copy this password (this is your `SMTP_PASSWORD`)

### Step 3: Use in Configuration

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx  # 16-character app password
SMTP_FROM=noreply@sayadbayezid.com
```

---

## Email Templates

### Newsletter Subscription Email

```
Subject: 🎉 New Newsletter Subscriber

Name: John Doe
Email: john@example.com
Time: 2024-01-15 10:30:45

This subscriber has joined your newsletter!
```

### Client Inquiry Email

```
Subject: 📧 New Client Inquiry

Name: Jane Smith
Email: jane@example.com
Message:
I need a website for my business...

Time: 2024-01-15 10:35:20

Please respond to this inquiry as soon as possible.
```

### Service Order Email

```
Subject: 🛒 New Service Order

Client Name: Bob Johnson
Client Email: bob@example.com
Service: Web Development
Description:
Build an e-commerce website...

Budget: $5000-$10000
Time: 2024-01-15 10:40:15

Please review this order and contact the client.
```

### Feedback Email

```
Subject: ⭐ New Feedback - 5 Stars

Name: Alice Brown
Email: alice@example.com
Rating: ⭐⭐⭐⭐⭐
Feedback:
Great service! Highly recommended...

Time: 2024-01-15 10:45:30

Thank you for the feedback!
```

---

## Troubleshooting

### Issue: "Email not configured"

**Cause:** SMTP credentials not set

**Solution:**
1. Add `SMTP_USER` and `SMTP_PASSWORD` to environment
2. Verify in `.env` file
3. Add to GitHub Secrets
4. Add to Manus Secrets
5. Restart server

### Issue: "Authentication failed"

**Cause:** Wrong email or app password

**Solution:**
1. Verify email address is correct
2. Generate new app password from Gmail
3. Update `SMTP_PASSWORD`
4. Restart server

### Issue: "Connection timeout"

**Cause:** SMTP server not reachable

**Solution:**
1. Verify `SMTP_HOST` is correct
2. Verify `SMTP_PORT` is correct (587 for TLS)
3. Check firewall/network
4. Try different port (465 for SSL)

### Issue: Email not received

**Cause:** Email sent but not delivered

**Solution:**
1. Check spam folder
2. Verify `OWNER_EMAIL` is correct
3. Check email logs in backend
4. Verify SMTP credentials
5. Test with `sendTestEmail` endpoint

---

## Monitoring

### Check Email Logs

```bash
# In Manus backend logs, search for:
grep "\[Email\]" logs.txt

# Should show:
# [Email] Sent to sayadmdbayezidhosan@gmail.com: <message-id>
```

### Verify Emails Received

1. Check inbox at `sayadmdbayezidhosan@gmail.com`
2. Look for emails with subjects:
   - 🎉 New Newsletter Subscriber
   - 📧 New Client Inquiry
   - 🛒 New Service Order
   - ⭐ New Feedback

### Set Up Email Forwarding (Optional)

If you want emails forwarded to another address:

1. Go to Gmail Settings
2. Forwarding and POP/IMAP
3. Add forwarding address
4. Confirm forwarding

---

## Summary

```
Email Notifications Setup:
1. ✅ Add OWNER_EMAIL = sayadmdbayezidhosan@gmail.com
2. ✅ Configure SMTP credentials
3. ✅ Add to environment variables
4. ✅ Create email service
5. ✅ Update tRPC procedures
6. ✅ Test with sendTestEmail
7. ✅ Submit forms and verify
8. ✅ Monitor email logs

All form submissions now send emails to:
sayadmdbayezidhosan@gmail.com

Notifications for:
✅ Newsletter subscriptions
✅ Client inquiries
✅ Service orders
✅ Customer feedback
```

---

**Email notifications are now configured!** 📧

All form submissions will automatically send emails to `sayadmdbayezidhosan@gmail.com` with details about the submission.
