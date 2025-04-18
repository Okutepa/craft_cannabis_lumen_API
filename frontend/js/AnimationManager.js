export class AnimationManager {
    constructor() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        } else {
            console.error('GSAP or ScrollTrigger not found');
        }
    }

    init() {
        if (typeof gsap === 'undefined') return;
        
        // Animate hero elements - these should be present on page load
        gsap.to('.hero.fade-up', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        });

        gsap.to('.hero h1.clip-reveal:before', {
            x: '100%',
            duration: 1.2,
            ease: 'power2.inOut'
        });

        gsap.to('.hero p', {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out'
        });
        
        // Product section title animation
        gsap.to('.products-section .fade-up', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.products-section',
                start: 'top 80%'
            }
        });

        gsap.to('.products-section h2.clip-reveal:before', {
            x: '100%',
            duration: 1,
            scrollTrigger: {
                trigger: '.products-section',
                start: 'top 80%'
            }
        });
    }

    // We'll call this method after Vue has rendered the products
    animateProducts() {
        if (typeof gsap === 'undefined') return;
        
        // Check if cards exist first
        if (document.querySelectorAll('.products-list .card').length > 0) {
            gsap.to('.products-list .card', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.products-list',
                    start: 'top 80%'
                }
            });
        }
    }

    animateModal() {
        if (typeof gsap === 'undefined') return;
        
        gsap.from('.modal-content', {
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            ease: 'power2.out'
        });
    }

    closeModal(callback) {
        if (typeof gsap === 'undefined') {
            if (callback) callback();
            return;
        }
        
        gsap.to('.modal-content', {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: callback
        });
    }
}