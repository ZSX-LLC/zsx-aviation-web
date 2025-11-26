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
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
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
// Contact Form Submission
// ========================================
// TESTING MODE: Set to true to see form data in console without sending
const TESTING_MODE = false;

document.getElementById('contactForm').addEventListener('submit', async function(e) {
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
        console.log('Attempting to send to: dr.jzhao@zsx.ai');
        console.log('Form data:', formData);

        // Try to send via FormSubmit.co (free form backend service)
        const response = await fetch('https://formsubmit.co/dr.jzhao@zsx.ai', {
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

                formMessage.innerHTML = `<strong>✓ Success!</strong><br>Your message has been sent to dr.jzhao@zsx.ai`;
                formMessage.className = 'form-message success';
                this.reset();
            } catch (jsonError) {
                // Not JSON - likely HTML verification page
                console.log('Not JSON - HTML verification page detected');

                formMessage.innerHTML = `<strong>✓ Email Verification Required!</strong><br>
                    FormSubmit sent a verification email to <strong>dr.jzhao@zsx.ai</strong><br>
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
            Please email directly: <a href="mailto:dr.jzhao@zsx.ai" style="color: white; text-decoration: underline;">dr.jzhao@zsx.ai</a>`;
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
    const animatedElements = document.querySelectorAll('.about-card, .service-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
