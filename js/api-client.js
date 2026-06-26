/**
 * Manus Backend API Client
 * ========================
 * Complete API client for GitHub Pages + Manus Backend integration
 * 
 * Configuration:
 * 1. Update MANUS_API_URL with your actual Manus backend URL
 * 2. Example: https://3000-xxx.manus.computer/api/trpc
 */

// ============================================
// CONFIGURATION - UPDATE THIS WITH YOUR URL
// ============================================
const MANUS_API_URL = localStorage.getItem('manus_api_url') || 'https://your-manus-backend.com/api/trpc';

// ============================================
// API CLIENT
// ============================================
const apiClient = {
  /**
   * Generic API call method
   * @param {string} procedure - tRPC procedure name (e.g., 'newsletters.subscribe')
   * @param {object} input - Input data for the procedure
   * @returns {Promise<object>} API response
   */
  async call(procedure, input) {
    try {
      console.log(`[API] Calling: ${procedure}`, input);
      
      const url = `${MANUS_API_URL}/${procedure}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[API] Error ${response.status}:`, errorText);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`[API] Success:`, data);
      return data;
    } catch (error) {
      console.error(`[API] Call failed:`, error);
      throw error;
    }
  },

  /**
   * Subscribe to newsletter
   * @param {string} email - Subscriber email
   * @param {string} name - Subscriber name
   * @returns {Promise<object>} Subscription result
   */
  async subscribe(email, name) {
    return this.call('newsletters.subscribe', { 
      subscriberEmail: email, 
      subscriberName: name 
    });
  },

  /**
   * Submit client inquiry
   * @param {object} data - Inquiry data
   * @returns {Promise<object>} Submission result
   */
  async submitInquiry(data) {
    return this.call('inquiries.submit', {
      clientName: data.name,
      clientEmail: data.email,
      message: data.message
    });
  },

  /**
   * Create service order
   * @param {object} data - Order data
   * @returns {Promise<object>} Order result
   */
  async createOrder(data) {
    return this.call('serviceOrders.submit', {
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      serviceName: data.serviceName,
      orderDetails: data.description,
      budget: data.budget
    });
  },

  /**
   * Submit feedback
   * @param {object} data - Feedback data
   * @returns {Promise<object>} Feedback result
   */
  async submitFeedback(data) {
    return this.call('feedback.submit', {
      clientName: data.name,
      clientEmail: data.email,
      rating: data.rating,
      message: data.message
    });
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Set Manus API URL
 * @param {string} url - Manus backend URL
 */
function setManusBacendUrl(url) {
  localStorage.setItem('manus_api_url', url);
  window.MANUS_API_URL = url;
  console.log('[Config] Manus API URL updated:', url);
}

/**
 * Get current Manus API URL
 * @returns {string} Current API URL
 */
function getManusBacendUrl() {
  return MANUS_API_URL;
}

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - 'success' or 'error'
 * @param {number} duration - Display duration in ms
 */
function showNotification(message, type = 'success', duration = 5000) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
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
        max-width: 400px;
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
        flex-shrink: 0;
      }

      .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        flex-shrink: 0;
      }

      .notification-close:hover {
        opacity: 0.8;
      }

      @media (max-width: 480px) {
        .notification {
          left: 10px;
          right: 10px;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto-remove after duration
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Log API configuration for debugging
 */
function logApiConfig() {
  console.group('API Configuration');
  console.log('API URL:', MANUS_API_URL);
  console.log('API Client:', apiClient);
  console.groupEnd();
}

// ============================================
// FORM HELPERS
// ============================================

/**
 * Disable form submit button
 * @param {HTMLElement} form - Form element
 * @param {boolean} disabled - Disable state
 * @param {string} loadingText - Text to show while loading
 */
function setFormLoading(form, disabled, loadingText = 'Submitting...') {
  const button = form.querySelector('button[type="submit"]');
  if (button) {
    button.disabled = disabled;
    if (disabled) {
      button.dataset.originalText = button.textContent;
      button.textContent = loadingText;
    } else {
      button.textContent = button.dataset.originalText || 'Submit';
    }
  }
}

/**
 * Reset form and clear messages
 * @param {HTMLElement} form - Form element
 */
function resetForm(form) {
  form.reset();
  const messages = form.querySelectorAll('[class*="Message"]');
  messages.forEach(msg => msg.innerHTML = '');
}

// ============================================
// EXPORT FOR MODULE SYSTEMS
// ============================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    apiClient,
    setManusBacendUrl,
    getManusBacendUrl,
    showNotification,
    validateEmail,
    logApiConfig,
    setFormLoading,
    resetForm
  };
}
