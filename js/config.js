/**
 * Application Configuration
 * =========================
 * Update these values with your actual backend URL and settings
 */

const APP_CONFIG = {
    // Manus Backend Configuration
    MANUS_BACKEND: {
        // Replace with your actual Manus backend URL
        // Example: 'https://3000-xxx.manus.computer/api/trpc'
        BASE_URL: localStorage.getItem('manus_backend_url') || 'https://your-manus-backend.com/api/trpc',
        
        // API endpoints
        ENDPOINTS: {
            INQUIRIES: 'inquiries.submit',
            SERVICE_ORDERS: 'serviceOrders.submit',
            NEWSLETTERS: 'newsletters.subscribe',
            FEEDBACK: 'feedback.submit',
            SERVICES: 'services.list'
        },
        
        // Request timeout in milliseconds
        TIMEOUT: 10000,
        
        // Retry configuration
        RETRY: {
            ATTEMPTS: 3,
            DELAY: 1000
        }
    },

    // Application Settings
    APP: {
        NAME: 'Connect With Bayezid',
        VERSION: '1.0.0',
        ENVIRONMENT: 'production' // 'development' or 'production'
    },

    // Form Configuration
    FORMS: {
        // Validation rules
        VALIDATION: {
            MIN_NAME_LENGTH: 2,
            MAX_NAME_LENGTH: 100,
            MIN_MESSAGE_LENGTH: 10,
            MAX_MESSAGE_LENGTH: 5000,
            MIN_BUDGET_LENGTH: 3
        },

        // Success/Error messages
        MESSAGES: {
            INQUIRY_SUCCESS: 'Thank you! Your inquiry has been sent successfully. We\'ll contact you soon.',
            INQUIRY_ERROR: 'Failed to send inquiry. Please try again.',
            
            ORDER_SUCCESS: 'Your service order has been submitted successfully. We\'ll review it and contact you shortly.',
            ORDER_ERROR: 'Failed to submit service order. Please try again.',
            
            NEWSLETTER_SUCCESS: 'Welcome! You\'ve been subscribed to our newsletter.',
            NEWSLETTER_ERROR: 'Failed to subscribe. Please try again.',
            
            FEEDBACK_SUCCESS: 'Thank you for your feedback! We appreciate your input.',
            FEEDBACK_ERROR: 'Failed to submit feedback. Please try again.',
            
            VALIDATION_ERROR: 'Please fill in all required fields correctly.',
            NETWORK_ERROR: 'Network error. Please check your connection and try again.',
            TIMEOUT_ERROR: 'Request timeout. Please try again.'
        }
    },

    // Notification Settings
    NOTIFICATIONS: {
        DURATION: 5000, // milliseconds
        POSITION: 'top-right' // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
    },

    // Feature Flags
    FEATURES: {
        ENABLE_ANALYTICS: true,
        ENABLE_NOTIFICATIONS: true,
        ENABLE_FORM_VALIDATION: true,
        ENABLE_AUTO_SAVE: false
    }
};

/**
 * Set Manus Backend URL
 * Call this function with your actual backend URL
 */
function setManusBacendUrl(url) {
    APP_CONFIG.MANUS_BACKEND.BASE_URL = url;
    localStorage.setItem('manus_backend_url', url);
    console.log('Manus backend URL updated:', url);
}

/**
 * Get Manus Backend URL
 */
function getManusBacendUrl() {
    return APP_CONFIG.MANUS_BACKEND.BASE_URL;
}

/**
 * Update API endpoint
 */
function updateApiEndpoint(key, value) {
    if (APP_CONFIG.MANUS_BACKEND.ENDPOINTS[key]) {
        APP_CONFIG.MANUS_BACKEND.ENDPOINTS[key] = value;
        console.log(`Endpoint ${key} updated to:`, value);
    }
}

/**
 * Get API endpoint
 */
function getApiEndpoint(key) {
    return APP_CONFIG.MANUS_BACKEND.ENDPOINTS[key] || null;
}

/**
 * Log configuration (for debugging)
 */
function logConfiguration() {
    console.group('Application Configuration');
    console.log('App:', APP_CONFIG.APP);
    console.log('Manus Backend:', APP_CONFIG.MANUS_BACKEND);
    console.log('Features:', APP_CONFIG.FEATURES);
    console.groupEnd();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APP_CONFIG,
        setManusBacendUrl,
        getManusBacendUrl,
        updateApiEndpoint,
        getApiEndpoint,
        logConfiguration
    };
}
