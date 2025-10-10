// WorkHub Configuration Template
// INSTRUCTIONS:
// 1. Copy this file and rename it to 'config.js'
// 2. Replace the placeholder values with your actual configuration
// 3. NEVER commit config.js to version control (it's in .gitignore)

const WORKHUB_CONFIG = {
    // EmailJS Configuration
    // Get these from your EmailJS dashboard: https://dashboard.emailjs.com/
    emailjs: {
        publicKey: 'Zx7ekz9X_dS5zlD58',
        serviceId: 'service_95ikcg4',
        templates: {
            contact: 'template_p5z847d',
            interview: 'template_ejlclnl'
        }
    },

    // Contact Email (will be base64 encoded to prevent scraping)
    // To encode your email: btoa('your.email@example.com') in browser console
    contactEmail: atob('aHVndWVzLmlpLncuYi5kZXBpbmdvbkBnbWFpbC5jb20='),

    // Security Settings
    rateLimiting: {
        enabled: true,
        maxSubmissionsPerHour: 3  // Adjust based on your needs
    },

    // Debug mode - set to false for production
    debug: false
};

// Basic rate limiting implementation
const RateLimiter = {
    submissions: [],

    canSubmit: function() {
        if (!WORKHUB_CONFIG.rateLimiting.enabled) return true;

        const now = Date.now();
        const oneHourAgo = now - (60 * 60 * 1000);

        // Clean old submissions
        this.submissions = this.submissions.filter(time => time > oneHourAgo);

        // Check if under limit
        if (this.submissions.length >= WORKHUB_CONFIG.rateLimiting.maxSubmissionsPerHour) {
            return false;
        }

        return true;
    },

    recordSubmission: function() {
        this.submissions.push(Date.now());
    }
};

// Input sanitization helper
const SecurityUtils = {
    sanitizeInput: function(input) {
        if (typeof input !== 'string') return input;

        // Remove potential XSS vectors
        return input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    },

    sanitizeFormData: function(data) {
        const sanitized = {};
        for (const [key, value] of Object.entries(data)) {
            sanitized[key] = this.sanitizeInput(value);
        }
        return sanitized;
    },

    log: function(message, data) {
        if (WORKHUB_CONFIG.debug) {
            console.log(message, data || '');
        }
    }
};

