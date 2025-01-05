class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.faqImage = document.querySelector('.faq-image');
        this.init();
        this.initScrollReveal();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleAccordion(item));
            
            // Add keyboard accessibility
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleAccordion(item);
                }
            });
        });
    }

    initScrollReveal() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (this.faqImage) {
            observer.observe(this.faqImage);
        }
    }

    toggleAccordion(clickedItem) {
        const isOpen = clickedItem.classList.contains('active');
        
        // Close other items
        this.faqItems.forEach(item => {
            if (item !== clickedItem && item.classList.contains('active')) {
                const itemQuestion = item.querySelector('.faq-question');
                item.classList.remove('active');
                itemQuestion.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle clicked item
        clickedItem.classList.toggle('active');
        const question = clickedItem.querySelector('.faq-question');
        question.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    }
}

// Initialize FAQ accordion when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FAQAccordion();
});
