class BlogSection {
    constructor() {
        this.blogCards = document.querySelectorAll('.blog-card');
        this.init();
    }

    init() {
        this.initScrollReveal();
        this.initHoverEffects();
    }

    initScrollReveal() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('reveal');
                    }, index * 100); // Staggered animation
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.blogCards.forEach(card => {
            observer.observe(card);
        });
    }

    initHoverEffects() {
        this.blogCards.forEach(card => {
            const image = card.querySelector('.blog-image img');
            
            card.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.1)';
            });

            card.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });

            // Add focus states for accessibility
            card.addEventListener('focus', () => {
                card.style.outline = '2px solid #0061ff';
                card.style.outlineOffset = '2px';
            });

            card.addEventListener('blur', () => {
                card.style.outline = 'none';
                card.style.outlineOffset = '0';
            });
        });
    }
}

// Initialize blog section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogSection();
});
