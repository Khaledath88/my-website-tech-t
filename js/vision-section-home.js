class VisionSection {
    constructor() {
        this.init();
    }

    init() {
        this.images = document.querySelectorAll('.vision-image');
        this.setupAnimations();
        this.setupScrollReveal();
    }

    setupAnimations() {
        // Add floating animation to images
        this.images.forEach((image, index) => {
            image.style.animationDelay = `${index * 0.2}s`;
            image.classList.add('animate');
        });
    }

    setupScrollReveal() {
        // Reveal elements on scroll
        const revealElements = document.querySelectorAll('.vision-point');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VisionSection();
});
