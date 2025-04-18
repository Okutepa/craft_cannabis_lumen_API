export function initAnimations() {
    gsap.from('.hero h1', {
        duration: 1.2,
        y: 50,
        opacity: 0
    });
    
    gsap.from('.hero p', {
        duration: 1.2,
        y: 30,
        opacity: 0,
        delay: 0.3
    });
    
    gsap.from('.main-nav', {
        duration: 0.8,
        y: -20,
        opacity: 0
    });
    
    gsap.from('.products h2', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        scrollTrigger: {
            trigger: '.products',
            start: 'top 80%'
        }
    });

    gsap.from('.products p', {
        duration: 1.2,
        y: 30,
        opacity: 0,
        delay: 0.3
    });
    
    gsap.from('footer', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 90%'
        }
    });
}

export function animateProductCards() {
    gsap.from('.products .card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.products',
            start: 'top 80%'
        }
    });
}

export function animateModalOpen() {
    gsap.from('.modal-content', {
        duration: 0.4,
        scale: 0.9,
        opacity: 0
    });
}

export function animateModalClose(onComplete) {
    gsap.to('.modal-content', {
        duration: 0.3,
        scale: 0.9,
        opacity: 0,
        onComplete
    });
}