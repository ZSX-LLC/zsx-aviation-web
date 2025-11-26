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

        if (response.ok) {
            formMessage.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
            formMessage.className = 'form-message success';
            this.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Fallback to mailto link
        console.log('Using mailto fallback');
        const mailtoLink = `mailto:contact@zsx.ai?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;

        formMessage.textContent = 'Opening your email client... If it doesn\'t open automatically, please email contact@zsx.ai';
        formMessage.className = 'form-message success';
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
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
