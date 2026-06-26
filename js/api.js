/**
 * Manus Backend API Integration
 * ==============================
 * This file handles all API calls to the Manus backend
 * Update the API_BASE_URL with your actual backend URL
 */

// Configuration
const API_CONFIG = {
    // Replace with your actual Manus backend URL
    BASE_URL: 'https://your-manus-backend.com/api/trpc',
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000 // 1 second
};

/**
 * Generic API request handler with retry logic
 */
async function apiRequest(endpoint, method = 'POST', data = null, retries = API_CONFIG.RETRY_ATTEMPTS) {
    const url = `${API_CONFIG.BASE_URL}/${endpoint}`;
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: API_CONFIG.TIMEOUT
    };

    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        if (retries > 0 && error.name !== 'AbortError') {
            console.log(`Retrying... (${API_CONFIG.RETRY_ATTEMPTS - retries + 1}/${API_CONFIG.RETRY_ATTEMPTS})`);
            await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
            return apiRequest(endpoint, method, data, retries - 1);
        }
        throw error;
    }
}

/**
 * Submit Client Inquiry
 */
async function submitInquiry(formData) {
    try {
        const payload = {
            clientName: formData.name,
            clientEmail: formData.email,
            message: formData.message
        };

        const response = await apiRequest('inquiries.submit', 'POST', payload);
        return { success: true, data: response };
    } catch (error) {
        console.error('Inquiry submission error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Submit Service Order
 */
async function submitServiceOrder(formData) {
    try {
        const payload = {
            clientName: formData.clientName,
            clientEmail: formData.clientEmail,
            serviceName: formData.serviceName,
            orderDetails: formData.orderDetails,
            budget: formData.budget
        };

        const response = await apiRequest('serviceOrders.submit', 'POST', payload);
        return { success: true, data: response };
    } catch (error) {
        console.error('Service order submission error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Subscribe to Newsletter
 */
async function subscribeNewsletter(formData) {
    try {
        const payload = {
            subscriberName: formData.name,
            subscriberEmail: formData.email
        };

        const response = await apiRequest('newsletters.subscribe', 'POST', payload);
        return { success: true, data: response };
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Submit Customer Feedback
 */
async function submitFeedback(formData) {
    try {
        const payload = {
            clientName: formData.name,
            clientEmail: formData.email,
            rating: formData.rating,
            message: formData.message
        };

        const response = await apiRequest('feedback.submit', 'POST', payload);
        return { success: true, data: response };
    } catch (error) {
        console.error('Feedback submission error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get Services List
 */
async function getServices() {
    try {
        const response = await apiRequest('services.list', 'GET');
        return { success: true, data: response };
    } catch (error) {
        console.error('Services fetch error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Validate Email
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification
 */
function showNotification(message, type = 'success', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            .notification-success {
                background: #10b981;
                color: white;
            }

            .notification-error {
                background: #ef4444;
                color: white;
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .notification-content i {
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Debounce function for form validation
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        apiRequest,
        submitInquiry,
        submitServiceOrder,
        subscribeNewsletter,
        submitFeedback,
        getServices,
        validateEmail,
        showNotification,
        formatCurrency,
        debounce,
        API_CONFIG
    };
}
