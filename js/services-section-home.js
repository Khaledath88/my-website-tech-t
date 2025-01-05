class ServicesSection {
    constructor() {
        this.init();
    }

    init() {
        this.section = document.querySelector('.services-section');
        this.cards = document.querySelectorAll('.service-card');
        
        if (!this.section || !this.cards.length) return;
        
        this.setupAnimations();
        this.setupHoverEffects();
    }

    setupAnimations() {
        // Add fade-in animation for cards
        this.cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Stagger the animations
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    }

    setupHoverEffects() {
        this.cards.forEach(card => {
            const icon = card.querySelector('.service-icon');
            const link = card.querySelector('.service-link');
            
            // Add hover effect for icon rotation
            card.addEventListener('mouseenter', () => {
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
                if (link) {
                    link.style.transform = 'translateX(5px)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (icon) {
                    icon.style.transform = 'none';
                }
                if (link) {
                    link.style.transform = 'none';
                }
            });

            // Add click animation
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
    }

    // Optional: Add scroll reveal animation
    setupScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        this.cards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ServicesSection();
});
