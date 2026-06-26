/**
 * Manus API Client - Connect GitHub Frontend to Manus Backend
 * 
 * This client automatically connects your GitHub Pages site to your Manus backend.
 * No manual configuration needed - just include this file and use the functions!
 */

class ManusAPIClient {
  constructor() {
    // Auto-detect Manus backend URL from environment or use default
    this.baseURL = this.detectBackendURL();
    this.timeout = 10000; // 10 seconds
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
    
    console.log('✅ Manus API Client initialized');
    console.log('📡 Backend URL:', this.baseURL);
  }

  /**
   * Auto-detect Manus backend URL
   * Tries multiple sources in order of preference
   */
  detectBackendURL() {
    // 1. Check if explicitly set in window
    if (window.MANUS_BACKEND_URL) {
      return window.MANUS_BACKEND_URL;
    }

    // 2. Check environment variable
    if (typeof process !== 'undefined' && process.env.REACT_APP_MANUS_BACKEND) {
      return process.env.REACT_APP_MANUS_BACKEND;
    }

    // 3. Check localStorage (user might have set it)
    const stored = localStorage.getItem('manus_backend_url');
    if (stored) {
      return stored;
    }

    // 4. Default to Manus production URL (will be updated by user)
    return 'https://your-manus-backend.com/api/trpc';
  }

  /**
   * Set backend URL manually
   */
  setBackendURL(url) {
    this.baseURL = url;
    localStorage.setItem('manus_backend_url', url);
    console.log('✅ Backend URL updated:', url);
  }

  /**
   * Make API request with retry logic
   */
  async request(endpoint, method = 'POST', data = null, retryCount = 0) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: this.timeout,
      };

      if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
      }

      console.log(`📤 API Request: ${method} ${endpoint}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`✅ API Response: ${endpoint}`, result);
      
      return result;
    } catch (error) {
      console.error(`❌ API Error: ${endpoint}`, error.message);

      // Retry logic
      if (retryCount < this.maxRetries) {
        console.log(`🔄 Retrying... (${retryCount + 1}/${this.maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.request(endpoint, method, data, retryCount + 1);
      }

      throw error;
    }
  }

  /**
   * Newsletter Subscription
   */
  async subscribeNewsletter(email, name) {
    try {
      const response = await this.request('/newsletters.subscribe', 'POST', {
        subscriberEmail: email,
        subscriberName: name,
      });

      return {
        success: true,
        message: 'Successfully subscribed to newsletter!',
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Submit Client Inquiry
   */
  async submitInquiry(name, email, message) {
    try {
      const response = await this.request('/inquiries.submit', 'POST', {
        name,
        email,
        message,
      });

      return {
        success: true,
        message: 'Inquiry submitted successfully!',
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Submit Service Order
   */
  async submitServiceOrder(clientName, clientEmail, serviceName, orderDetails, budget) {
    try {
      const response = await this.request('/serviceOrders.submit', 'POST', {
        clientName,
        clientEmail,
        serviceName,
        orderDetails,
        budget,
      });

      return {
        success: true,
        message: 'Service order submitted successfully!',
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Submit Customer Feedback
   */
  async submitFeedback(name, email, rating, message) {
    try {
      const response = await this.request('/feedback.submit', 'POST', {
        feedbackName: name,
        feedbackEmail: email,
        feedbackRating: rating,
        feedbackMessage: message,
      });

      return {
        success: true,
        message: 'Thank you for your feedback!',
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get Services List
   */
  async getServices() {
    try {
      const response = await this.request('/services.list', 'GET');

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Show notification to user
   */
  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
      color: white;
      border-radius: 5px;
      z-index: 9999;
      animation: slideIn 0.3s ease-in-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Create global instance
const manusAPI = new ManusAPIClient();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = manusAPI;
}
