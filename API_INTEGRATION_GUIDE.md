# API Integration Guide - Connect With Bayezid

This guide explains how to integrate your Manus backend API with the Connect With Bayezid website.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Configuration](#configuration)
3. [API Endpoints](#api-endpoints)
4. [Form Integration](#form-integration)
5. [Error Handling](#error-handling)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Step 1: Update Your Backend URL

Open `js/config.js` and update the `BASE_URL` with your actual Manus backend URL:

```javascript
MANUS_BACKEND: {
    BASE_URL: 'https://your-manus-backend.com/api/trpc',
    // ... rest of config
}
```

Or use the JavaScript console to set it dynamically:

```javascript
setManusBacendUrl('https://your-actual-backend.com/api/trpc');
```

### Step 2: Include Required Scripts

All pages already include the necessary scripts:

```html
<script src="../js/config.js"></script>
<script src="../js/api.js"></script>
```

### Step 3: Test the Integration

Open the browser console (F12) and run:

```javascript
logConfiguration(); // View current configuration
getManusBacendUrl(); // Check the backend URL
```

---

## Configuration

### Configuration File: `js/config.js`

The configuration file contains all settings for API integration:

```javascript
const APP_CONFIG = {
    MANUS_BACKEND: {
        BASE_URL: 'https://your-manus-backend.com/api/trpc',
        ENDPOINTS: {
            INQUIRIES: 'inquiries.submit',
            SERVICE_ORDERS: 'serviceOrders.submit',
            NEWSLETTERS: 'newsletters.subscribe',
            FEEDBACK: 'feedback.submit',
            SERVICES: 'services.list'
        },
        TIMEOUT: 10000,
        RETRY: {
            ATTEMPTS: 3,
            DELAY: 1000
        }
    },
    // ... more config
}
```

### Configuration Functions

#### `setManusBacendUrl(url)`
Set the Manus backend URL dynamically.

```javascript
setManusBacendUrl('https://your-backend.com/api/trpc');
```

#### `getManusBacendUrl()`
Get the current backend URL.

```javascript
const url = getManusBacendUrl();
console.log(url);
```

#### `updateApiEndpoint(key, value)`
Update a specific API endpoint.

```javascript
updateApiEndpoint('INQUIRIES', 'inquiries.create');
```

#### `getApiEndpoint(key)`
Get a specific API endpoint.

```javascript
const endpoint = getApiEndpoint('INQUIRIES');
console.log(endpoint); // 'inquiries.submit'
```

#### `logConfiguration()`
Log the entire configuration for debugging.

```javascript
logConfiguration();
```

---

## API Endpoints

### 1. Submit Client Inquiry

**Endpoint:** `inquiries.submit`

**Function:** `submitInquiry(formData)`

**Parameters:**
```javascript
{
    name: string,      // Client name (required)
    email: string,     // Client email (required)
    message: string    // Inquiry message (required)
}
```

**Example:**
```javascript
const result = await submitInquiry({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I need a website for my business'
});

if (result.success) {
    console.log('Inquiry submitted:', result.data);
} else {
    console.error('Error:', result.error);
}
```

---

### 2. Submit Service Order

**Endpoint:** `serviceOrders.submit`

**Function:** `submitServiceOrder(formData)`

**Parameters:**
```javascript
{
    clientName: string,     // Client name (required)
    clientEmail: string,    // Client email (required)
    serviceName: string,    // Service name (required)
    orderDetails: string,   // Order details (required)
    budget: string          // Budget (required)
}
```

**Example:**
```javascript
const result = await submitServiceOrder({
    clientName: 'Jane Smith',
    clientEmail: 'jane@example.com',
    serviceName: 'Web Development',
    orderDetails: 'E-commerce website with payment integration',
    budget: '$5000-$10000'
});

if (result.success) {
    console.log('Order submitted:', result.data);
} else {
    console.error('Error:', result.error);
}
```

---

### 3. Subscribe to Newsletter

**Endpoint:** `newsletters.subscribe`

**Function:** `subscribeNewsletter(formData)`

**Parameters:**
```javascript
{
    name: string,   // Subscriber name (required)
    email: string   // Subscriber email (required)
}
```

**Example:**
```javascript
const result = await subscribeNewsletter({
    name: 'Bob Johnson',
    email: 'bob@example.com'
});

if (result.success) {
    console.log('Subscribed:', result.data);
} else {
    console.error('Error:', result.error);
}
```

---

### 4. Submit Customer Feedback

**Endpoint:** `feedback.submit`

**Function:** `submitFeedback(formData)`

**Parameters:**
```javascript
{
    name: string,       // Customer name (required)
    email: string,      // Customer email (required)
    rating: number,     // Rating 1-5 (required)
    message: string     // Feedback message (required)
}
```

**Example:**
```javascript
const result = await submitFeedback({
    name: 'Alice Brown',
    email: 'alice@example.com',
    rating: 5,
    message: 'Great service! Highly recommend.'
});

if (result.success) {
    console.log('Feedback submitted:', result.data);
} else {
    console.error('Error:', result.error);
}
```

---

### 5. Get Services List

**Endpoint:** `services.list`

**Function:** `getServices()`

**Returns:** Array of service objects

**Example:**
```javascript
const result = await getServices();

if (result.success) {
    console.log('Services:', result.data);
    result.data.forEach(service => {
        console.log(`${service.name} - $${service.price}`);
    });
} else {
    console.error('Error:', result.error);
}
```

---

## Form Integration

### Contact Form (contact.html)

The contact form includes three tabs:

#### 1. General Inquiry Tab
```html
<form id="inquiryForm" onsubmit="submitInquiry(event)">
    <input type="text" id="inquiryName" name="name" required>
    <input type="email" id="inquiryEmail" name="email" required>
    <textarea id="inquiryMessage" name="message" required></textarea>
    <button type="submit">Send Inquiry</button>
</form>
```

#### 2. Newsletter Tab
```html
<form id="newsletterForm" onsubmit="submitNewsletter(event)">
    <input type="text" id="newsletterName" name="name" required>
    <input type="email" id="newsletterEmail" name="email" required>
    <button type="submit">Subscribe</button>
</form>
```

#### 3. Feedback Tab
```html
<form id="feedbackForm" onsubmit="submitFeedback(event)">
    <input type="text" id="feedbackName" name="name" required>
    <input type="email" id="feedbackEmail" name="email" required>
    <input type="radio" name="rating" value="1-5" required>
    <textarea id="feedbackMessage" name="message" required></textarea>
    <button type="submit">Submit Feedback</button>
</form>
```

### Services Form (services.html)

Service order forms are dynamically opened in modals:

```html
<form id="orderForm" onsubmit="submitOrder(event)">
    <input type="text" id="clientName" required>
    <input type="email" id="clientEmail" required>
    <span id="serviceName"></span>
    <textarea id="orderDetails" required></textarea>
    <input type="text" id="budget" required>
    <button type="submit">Submit Order</button>
</form>
```

---

## Error Handling

### Validation Functions

#### `validateEmail(email)`
Validates email format.

```javascript
if (!validateEmail('test@example.com')) {
    showNotification('Invalid email address', 'error');
}
```

### Notification System

#### `showNotification(message, type, duration)`
Display user notifications.

**Parameters:**
- `message` (string): Notification message
- `type` (string): 'success' or 'error'
- `duration` (number): Display duration in milliseconds (default: 5000)

**Example:**
```javascript
showNotification('Form submitted successfully!', 'success', 3000);
showNotification('An error occurred. Please try again.', 'error', 5000);
```

### Error Response Format

All API functions return a consistent response format:

```javascript
{
    success: boolean,
    data: object,      // Only if success is true
    error: string      // Only if success is false
}
```

---

## Testing

### Test in Browser Console

1. **Check Configuration:**
```javascript
logConfiguration();
```

2. **Test Email Validation:**
```javascript
validateEmail('test@example.com');  // true
validateEmail('invalid-email');      // false
```

3. **Test API Call (Inquiry):**
```javascript
submitInquiry({
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test inquiry'
}).then(result => console.log(result));
```

4. **Test Notification:**
```javascript
showNotification('Test notification', 'success', 3000);
```

### Test Forms

1. Open `pages/contact.html`
2. Fill out the inquiry form
3. Check browser console for logs
4. Verify success/error messages appear

---

## Troubleshooting

### Issue: "API Error: 404 Not Found"

**Cause:** Backend URL or endpoint is incorrect.

**Solution:**
1. Verify the backend URL in `js/config.js`
2. Check that the endpoint names match your backend
3. Run `logConfiguration()` to see current settings

### Issue: "Request timeout"

**Cause:** Backend is not responding or network is slow.

**Solution:**
1. Increase `TIMEOUT` value in `js/config.js`
2. Check your internet connection
3. Verify backend is running

### Issue: "CORS error"

**Cause:** Backend doesn't allow requests from your domain.

**Solution:**
1. Enable CORS on your backend
2. Add your domain to CORS allowed origins
3. Check backend configuration

### Issue: "Form not submitting"

**Cause:** JavaScript error or validation failure.

**Solution:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify all required fields are filled
4. Check email format validation

### Issue: "No success/error message displayed"

**Cause:** Notification system not working.

**Solution:**
1. Verify `js/api.js` is loaded
2. Check browser console for errors
3. Ensure `showNotification()` function is available

---

## Advanced Configuration

### Custom Retry Logic

Modify retry settings in `js/config.js`:

```javascript
RETRY: {
    ATTEMPTS: 5,      // Number of retry attempts
    DELAY: 2000       // Delay between retries (ms)
}
```

### Custom Timeout

```javascript
TIMEOUT: 15000  // 15 seconds
```

### Custom Messages

Update messages in `js/config.js`:

```javascript
MESSAGES: {
    INQUIRY_SUCCESS: 'Your custom success message',
    INQUIRY_ERROR: 'Your custom error message',
    // ... more messages
}
```

---

## Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review browser console for error messages
3. Verify backend API is running
4. Check network tab in browser DevTools
5. Contact your backend administrator

---

## Version History

- **v1.0.0** - Initial release with form integration and API utilities

---

**Last Updated:** 2024
