// newsletter.js - Newsletter subscription functionality

export default function initNewsletter() {
    // Get form elements
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    const subscriberEmail = document.getElementById('subscriber-email');
    const formMessage = document.querySelector('.form-message');
    const lightbox = document.getElementById('subscription-lightbox');
    const closeButtons = document.querySelectorAll('.close-button, .close-lightbox-btn');
    const apiUrl = 'http://localhost:8888/craft-cannabis/api/public';
    const subscribeBtn = newsletterForm.querySelector('.subscribe-btn');
    
    // Handle subscription button click
    subscribeBtn.addEventListener('click', function() {
        handleSubscription();
    });
    
    // Function to handle the subscription process
    function handleSubscription() {
        // Clear any previous error messages
        formMessage.textContent = '';
        
        // Get email and validate
        const email = subscriberEmail.value.trim();
        if (!email) {
            formMessage.textContent = 'Please enter your email address.';
            return;
        }
        
        // Update button state
        subscribeBtn.disabled = true;
        subscribeBtn.textContent = 'Subscribing...';
        
        // Send subscription request to API
        fetch(`${apiUrl}/subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => {
            if (!response.ok) {
                // Handle validation errors (like duplicate email)
                if (response.status === 422) {
                    return response.json().then(data => {
                        let errorMsg = 'Failed to subscribe. Please try again.';
                        if (data.details && data.details.email) {
                            errorMsg = data.details.email[0];
                        }
                        throw new Error(errorMsg);
                    });
                }
                // Handle other errors
                throw new Error('Failed to subscribe. Please try again.');
            }
            return response.json();
        })
        .then(data => {
            // Success! Reset form and show lightbox
            newsletterForm.reset();
            
            // Show success lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Animate the lightbox content
            if (typeof gsap !== 'undefined') {
                gsap.from('.lightbox-content', {
                    duration: 0.4,
                    scale: 0.9,
                    opacity: 0,
                    ease: 'back.out(1.7)'
                });
            }
        })
        .catch(error => {
            // Display error message
            formMessage.textContent = error.message;
        })
        .finally(() => {
            // Reset button state
            subscribeBtn.disabled = false;
            subscribeBtn.textContent = 'Subscribe';
        });
    }
    
    // Set up lightbox close functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', closeLightbox);
    });
    
    // Close lightbox when clicking outside content
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Function to close lightbox with animation
    function closeLightbox() {
        if (typeof gsap !== 'undefined') {
            gsap.to('.lightbox-content', {
                duration: 0.3,
                scale: 0.9,
                opacity: 0,
                onComplete: () => {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = ''; // Re-enable scrolling
                }
            });
        } else {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    }
}