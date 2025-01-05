class PricingSection {
    constructor() {
        this.init();
    }

    init() {
        this.pricingToggle = document.querySelector('.pricing-toggle input');
        this.monthlyText = document.querySelector('.monthly-text');
        this.yearlyText = document.querySelector('.yearly-text');
        this.pricingSection = document.querySelector('.pricing-section');
        
        if (this.pricingToggle) {
            this.pricingToggle.addEventListener('change', this.handleToggle.bind(this));
        }

        // Initialize animations
        this.initAnimations();
    }

    handleToggle(e) {
        const isYearly = e.target.checked;
        
        // Update toggle text styles
        this.monthlyText.classList.toggle('active', !isYearly);
        this.yearlyText.classList.toggle('active', isYearly);
        
        // Toggle pricing display
        this.pricingSection.classList.toggle('show-yearly', isYearly);

        // Animate price changes
        const cards = document.querySelectorAll('.pricing-card');
        cards.forEach(card => {
            const price = card.querySelector('.plan-price');
            if (price) {
                price.style.transform = 'translateY(-10px)';
                price.style.opacity = '0';
                
                setTimeout(() => {
                    price.style.transform = 'translateY(0)';
                    price.style.opacity = '1';
                }, 200);
            }
        });
    }

    initAnimations() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe pricing cards
        document.querySelectorAll('.pricing-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PricingSection();
});
