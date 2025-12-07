// ========================================
// Content Protection
// ========================================
// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Disable common keyboard shortcuts for downloading/saving
document.addEventListener('keydown', function(e) {
    // Disable Ctrl+S (Save), Ctrl+U (View Source), F12 (DevTools), Ctrl+Shift+I (Inspect)
    if ((e.ctrlKey && (e.key === 's' || e.key === 'u')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        return false;
    }
});

// Disable text selection via JavaScript (backup)
document.onselectstart = function() {
    return false;
};

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Image Slider/Carousel Functionality
// ========================================
let currentSlideIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Exit if no slides exist
    if (slides.length === 0) return;

    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function currentSlide(index) {
    showSlide(index);
}

// Auto-advance slides every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);

// Initialize first slide
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
});

// ========================================
// Contact Form Submission Success Handler
// ========================================
// Check if user was redirected back after successful submission
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const formMessage = document.getElementById('formMessage');
        const contactForm = document.getElementById('contactForm');

        // Show success message
        formMessage.innerHTML = `<strong>✓ Message Sent Successfully!</strong><br>
            Your inquiry has been submitted to our office.<br>
            We will contact you soon!`;
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';

        // Reset the form
        contactForm.reset();

        // Scroll to the message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Clean up URL (remove ?success=true)
        window.history.replaceState({}, document.title, window.location.pathname);

        // Hide message after 10 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 10000);
    }
});

// ========================================
// Contact Form Submission
// ========================================
// Use native form submission for better FormSubmit compatibility
const USE_NATIVE_FORM = true;

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    // If using native form submission, show loading state then let it submit
    if (USE_NATIVE_FORM) {
        const submitButton = this.querySelector('.submit-button');
        const formMessage = document.getElementById('formMessage');

        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        formMessage.innerHTML = `<strong>⏳ Sending your message...</strong><br>Please wait a moment.`;
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';

        // Form will submit to FormSubmit directly via action attribute
        return true;
    }

    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const submitButton = this.querySelector('.submit-button');

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        interest: document.getElementById('interest').value
    };

    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // TESTING MODE: Just log the data and show success
    if (TESTING_MODE) {
        console.log('=== CONTACT FORM TEST ===');
        console.log('Form Data:', formData);
        console.log('Would send to: contact@zsx.ai');
        console.log('========================');

        // Show success message
        formMessage.innerHTML = `<strong>TEST MODE - Form data logged to console!</strong><br>
            Open browser console (F12) to see the data.<br>
            Name: ${formData.name}<br>
            Email: ${formData.email}<br>
            Phone: ${formData.phone}`;
        formMessage.className = 'form-message success';

        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';

        // Reset form
        setTimeout(() => {
            this.reset();
            formMessage.style.display = 'none';
        }, 8000);

        return;
    }

    try {
        // Create mailto link data
        const subject = encodeURIComponent('Flight Training Inquiry from ' + formData.name);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Phone: ${formData.phone}\n\n` +
            `Interest in Flying:\n${formData.interest}`
        );

        console.log('=== FORM SUBMISSION DEBUG ===');
        console.log('Attempting to send to: contact@zsx.ai');
        console.log('Form data:', formData);

        // Try to send via FormSubmit.co (free form backend service)
        const response = await fetch('https://formsubmit.co/contact@zsx.ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                interest: formData.interest,
                _subject: 'New Flight Training Inquiry',
                _template: 'table'
            })
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        // Check if response is JSON or HTML
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);

        if (response.ok) {
            // Get response text first (can only read body once)
            const responseText = await response.text();
            console.log('Response text (first 200 chars):', responseText.substring(0, 200));

            // Try to parse as JSON
            let responseData;
            try {
                responseData = JSON.parse(responseText);
                console.log('Parsed JSON:', responseData);

                formMessage.innerHTML = `<strong>✓ Success!</strong><br>Your message has been sent to contact@zsx.ai`;
                formMessage.className = 'form-message success';
                this.reset();
            } catch (jsonError) {
                // Not JSON - likely HTML verification page
                console.log('Not JSON - HTML verification page detected');

                formMessage.innerHTML = `<strong>✓ Email Verification Required!</strong><br>
                    FormSubmit sent a verification email to <strong>contact@zsx.ai</strong><br>
                    Please check your inbox and click the verification link.<br>
                    After verification, the form will work automatically.`;
                formMessage.className = 'form-message success';
                this.reset();
            }
        } else {
            const responseText = await response.text();
            let errorMessage = 'Form submission failed';
            try {
                const responseData = JSON.parse(responseText);
                errorMessage = responseData.message || errorMessage;
            } catch (e) {
                errorMessage = responseText.substring(0, 100);
            }
            formMessage.innerHTML = `<strong>⚠ Error ${response.status}</strong><br>${errorMessage}`;
            formMessage.className = 'form-message error';
            console.error('Form submission error:', responseText);
        }
    } catch (error) {
        console.error('Form submission exception:', error);

        formMessage.innerHTML = `<strong>⚠ Error</strong><br>${error.message}<br>
            Please email directly: <a href="mailto:contact@zsx.ai" style="color: white; text-decoration: underline;">contact@zsx.ai</a>`;
        formMessage.className = 'form-message error';
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';

        // Keep message visible longer for debugging
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 10000);
    }
});

// ========================================
// Navbar Background on Scroll
// ========================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 61, 92, 1)';
    } else {
        navbar.style.background = 'rgba(0, 61, 92, 0.95)';
    }
});

// ========================================
// Fade-in Animation on Scroll
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .service-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Create overlay element for service cards
    const overlay = document.createElement('div');
    overlay.className = 'service-overlay';
    overlay.onclick = closeAllServiceCards;
    document.body.appendChild(overlay);
});

// ========================================
// Service Card Expand/Collapse Functionality
// ========================================
function toggleServiceCard(card) {
    const overlay = document.querySelector('.service-overlay');
    const isExpanded = card.classList.contains('expanded');

    if (isExpanded) {
        // Collapse this card
        card.classList.remove('expanded');
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Update click hint text
        const clickHint = card.querySelector('.click-hint');
        if (clickHint) {
            clickHint.textContent = clickHint.textContent.replace('Click to close', 'Click for FAA requirements').replace('Click to close', 'Click for details');
        }
    } else {
        // Collapse any other expanded cards first
        closeAllServiceCards();

        // Expand this card immediately
        card.classList.add('expanded');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Update click hint text
        const clickHint = card.querySelector('.click-hint');
        if (clickHint) {
            clickHint.textContent = 'Click to close';
        }
    }
}

function closeAllServiceCards() {
    const expandedCards = document.querySelectorAll('.service-card.expanded');
    const overlay = document.querySelector('.service-overlay');

    expandedCards.forEach(card => {
        card.classList.remove('expanded');

        // Reset click hint text
        const clickHint = card.querySelector('.click-hint');
        if (clickHint) {
            if (clickHint.textContent.includes('close')) {
                clickHint.textContent = clickHint.textContent.includes('details')
                    ? 'Click for details'
                    : 'Click for FAA requirements';
            }
        }
    });

    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close expanded card on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAllServiceCards();
    }
});

// ========================================
// Hidden Visitor Notification System
// ========================================
// Tracks visitor information and sends email notification to site owner
// This runs automatically on page load and is invisible to visitors

// Function to get visitor's approximate location (non-intrusive)
async function getVisitorLocation() {
    try {
        // Use ipapi.co free API to get location from IP (no API key needed)
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
            const data = await response.json();
            return {
                ip: data.ip || 'Unknown',
                city: data.city || 'Unknown',
                region: data.region || 'Unknown',
                country: data.country_name || 'Unknown',
                timezone: data.timezone || 'Unknown',
                isp: data.org || 'Unknown'
            };
        }
    } catch (error) {
        console.log('Location fetch skipped:', error.message);
    }
    return {
        ip: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        timezone: 'Unknown',
        isp: 'Unknown'
    };
}

// Function to collect visitor information
function collectVisitorInfo() {
    const now = new Date();

    return {
        // Timestamp
        timestamp: now.toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',
            dateStyle: 'full',
            timeStyle: 'long'
        }),

        // Browser Information
        userAgent: navigator.userAgent || 'Unknown',
        browser: getBrowserName(),
        platform: navigator.platform || 'Unknown',
        language: navigator.language || 'Unknown',
        languages: navigator.languages ? navigator.languages.join(', ') : 'Unknown',

        // Screen Information
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        screenColorDepth: `${window.screen.colorDepth}-bit`,
        windowSize: `${window.innerWidth}x${window.innerHeight}`,

        // Device Information
        touchSupport: 'ontouchstart' in window ? 'Yes (Mobile/Tablet)' : 'No (Desktop)',
        cookiesEnabled: navigator.cookieEnabled ? 'Yes' : 'No',
        onlineStatus: navigator.onLine ? 'Online' : 'Offline',

        // Page Information
        referrer: document.referrer || 'Direct visit (no referrer)',
        currentPage: window.location.href,
        pageTitle: document.title
    };
}

// Helper function to get browser name
function getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('SamsungBrowser')) return 'Samsung Browser';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    if (ua.includes('Trident')) return 'Internet Explorer';
    if (ua.includes('Edge')) return 'Edge (Legacy)';
    if (ua.includes('Edg')) return 'Edge (Chromium)';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    return 'Unknown';
}

// Function to send visitor notification
async function sendVisitorNotification() {
    try {
        console.log('📊 Visitor tracking: Starting...');

        // Collect basic visitor info first
        const visitorInfo = collectVisitorInfo();
        console.log('📊 Visitor info collected:', visitorInfo);

        // Get location data (async)
        const locationInfo = await getVisitorLocation();
        console.log('📊 Location info collected:', locationInfo);

        // Prepare email content
        const emailSubject = `New Visitor on ZSX.ai - ${visitorInfo.browser} from ${locationInfo.city}, ${locationInfo.country}`;

        // Create detailed message
        const message = `
NEW WEBSITE VISITOR DETECTED
============================

VISIT DETAILS
-----------------
Time: ${visitorInfo.timestamp}
Page: ${visitorInfo.currentPage}
Referrer: ${visitorInfo.referrer}

LOCATION
-----------
IP Address: ${locationInfo.ip}
City: ${locationInfo.city}
Region: ${locationInfo.region}
Country: ${locationInfo.country}
Timezone: ${locationInfo.timezone}
ISP: ${locationInfo.isp}

DEVICE & BROWSER
-------------------
Browser: ${visitorInfo.browser}
Platform: ${visitorInfo.platform}
User Agent: ${visitorInfo.userAgent}

SCREEN & DISPLAY
-------------------
Screen Resolution: ${visitorInfo.screenResolution}
Color Depth: ${visitorInfo.screenColorDepth}
Window Size: ${visitorInfo.windowSize}
Touch Support: ${visitorInfo.touchSupport}

OTHER INFO
-------------
Language: ${visitorInfo.language}
All Languages: ${visitorInfo.languages}
Cookies Enabled: ${visitorInfo.cookiesEnabled}
Online Status: ${visitorInfo.onlineStatus}

============================
This is an automated notification from your ZSX Aviation website visitor tracking system.
        `.trim();

        // Send notification via FormSubmit.co (same service as contact form)
        const formData = new FormData();
        formData.append('_subject', emailSubject);
        formData.append('visitor_time', visitorInfo.timestamp);
        formData.append('visitor_ip', locationInfo.ip);
        formData.append('visitor_location', `${locationInfo.city}, ${locationInfo.region}, ${locationInfo.country}`);
        formData.append('visitor_browser', visitorInfo.browser);
        formData.append('visitor_platform', visitorInfo.platform);
        formData.append('visitor_screen', visitorInfo.screenResolution);
        formData.append('visitor_referrer', visitorInfo.referrer);
        formData.append('visitor_page', visitorInfo.currentPage);
        formData.append('full_details', message);
        formData.append('_template', 'table');

        console.log('📊 Sending notification to FormSubmit...');

        // Send to FormSubmit
        const response = await fetch('https://formsubmit.co/contact@zsx.ai', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Prevent CORS issues, fire-and-forget
        });

        console.log('📊 Visitor tracking: Notification sent successfully!');
        console.log('📊 Response type:', response.type);
        console.log('📊 Check contact@zsx.ai for the notification email');
        console.log('📊 NOTE: First time may require email verification from FormSubmit');
    } catch (error) {
        // Show error for debugging
        console.error('📊 Visitor tracking error:', error);
        console.log('📊 Error details:', error.message);
    }
}

// Track visit start time
const visitStartTime = new Date();

// Initialize visitor tracking when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we've already sent notification in this session
    const sessionKey = 'zsx_visitor_notified';
    const alreadyNotified = sessionStorage.getItem(sessionKey);

    if (!alreadyNotified) {
        // Mark as notified for this session
        sessionStorage.setItem(sessionKey, 'true');

        // Small delay to ensure page is fully loaded
        setTimeout(() => {
            sendVisitorNotification();
        }, 2000); // Wait 2 seconds after page load
    } else {
        console.log('📊 Visitor tracking: Already sent for this session');
    }
});

// Track when visitor leaves and send duration update
window.addEventListener('beforeunload', function() {
    const visitEndTime = new Date();
    const durationMs = visitEndTime - visitStartTime;
    const durationSeconds = Math.floor(durationMs / 1000);
    const durationMinutes = Math.floor(durationSeconds / 60);
    const remainingSeconds = durationSeconds % 60;

    // Format duration
    let durationText;
    if (durationMinutes > 0) {
        durationText = `${durationMinutes} min ${remainingSeconds} sec`;
    } else {
        durationText = `${durationSeconds} sec`;
    }

    // Send duration update using sendBeacon (works even when page is closing)
    try {
        const formData = new FormData();
        formData.append('_subject', `Visitor Duration Update - ${durationText} on ZSX.ai`);
        formData.append('duration_seconds', durationSeconds.toString());
        formData.append('duration_text', durationText);
        formData.append('visit_end_time', visitEndTime.toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',
            dateStyle: 'full',
            timeStyle: 'long'
        }));
        formData.append('page_url', window.location.href);
        formData.append('_template', 'table');

        // Use sendBeacon for reliable delivery when page is closing
        navigator.sendBeacon('https://formsubmit.co/contact@zsx.ai', formData);
        console.log(`📊 Visit duration: ${durationText}`);
    } catch (error) {
        console.log('📊 Duration tracking skipped');
    }
});
