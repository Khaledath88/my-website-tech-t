class TestimonialCarousel {
    constructor() {
        this.track = document.querySelector('.testimonial-track');
        this.items = document.querySelectorAll('.testimonial-item');
        this.prevBtn = document.querySelector('.testimonial-arrow.prev');
        this.nextBtn = document.querySelector('.testimonial-arrow.next');
        this.dots = document.querySelectorAll('.testimonial-dot');
        
        this.currentIndex = 0;
        this.totalItems = this.items.length;
        this.itemsPerView = this.getItemsPerView();
        this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
        
        // Drag properties
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.initDragEvents();
        this.updateCarousel();
        this.startAutoplay();

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    getItemsPerView() {
        return window.innerWidth > 1200 ? 3 : window.innerWidth > 768 ? 2 : 1;
    }

    setupNavigation() {
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.navigate('prev');
                this.pauseAutoplay();
            });
            
            this.nextBtn.addEventListener('click', () => {
                this.navigate('next');
                this.pauseAutoplay();
            });
        }
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.pauseAutoplay();
            });
        });
    }

    initDragEvents() {
        this.track.addEventListener('touchstart', (e) => this.touchStart(e));
        this.track.addEventListener('touchmove', (e) => this.touchMove(e));
        this.track.addEventListener('touchend', () => this.touchEnd());
        this.track.addEventListener('mousedown', (e) => this.touchStart(e));
        this.track.addEventListener('mousemove', (e) => this.touchMove(e));
        this.track.addEventListener('mouseup', () => this.touchEnd());
        this.track.addEventListener('mouseleave', () => this.touchEnd());
    }

    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    touchStart(event) {
        this.isDragging = true;
        this.startPos = this.getPositionX(event);
        this.animationID = requestAnimationFrame(this.animation.bind(this));
        this.track.style.cursor = 'grabbing';
        this.pauseAutoplay();
    }

    touchMove(event) {
        if (!this.isDragging) return;
        
        event.preventDefault();
        const currentPosition = this.getPositionX(event);
        this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
    }

    touchEnd() {
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);
        this.track.style.cursor = 'grab';

        const movedBy = this.currentTranslate - this.prevTranslate;
        const moveThreshold = this.items[0].offsetWidth * 0.2;

        if (Math.abs(movedBy) > moveThreshold) {
            if (movedBy < 0) {
                this.navigate('next');
            } else {
                this.navigate('prev');
            }
        } else {
            this.updateCarousel();
        }

        this.startAutoplay();
    }

    animation() {
        if (this.isDragging) {
            this.setSliderPosition();
            requestAnimationFrame(this.animation.bind(this));
        }
    }

    setSliderPosition() {
        this.track.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    navigate(direction) {
        if (direction === 'next' && this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else if (direction === 'prev' && this.currentIndex > 0) {
            this.currentIndex--;
        }
        this.updateCarousel();
    }

    updateCarousel() {
        const itemWidth = this.items[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(this.track).gap);
        const offset = -(itemWidth + gap) * this.currentIndex;
        
        this.currentTranslate = offset;
        this.prevTranslate = offset;
        this.track.style.transform = `translateX(${offset}px)`;

        // Update active states
        this.items.forEach((item, index) => {
            const isActive = index >= this.currentIndex && 
                           index < this.currentIndex + this.itemsPerView;
            item.classList.toggle('active', isActive);
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Update button states
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
            this.nextBtn.style.opacity = this.currentIndex === this.maxIndex ? '0.5' : '1';
        }
    }

    handleResize() {
        const newItemsPerView = this.getItemsPerView();
        if (newItemsPerView !== this.itemsPerView) {
            this.itemsPerView = newItemsPerView;
            this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
        }
        this.updateCarousel();
    }

    startAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
        
        this.autoplayInterval = setInterval(() => {
            if (!this.isDragging) {
                if (this.currentIndex < this.maxIndex) {
                    this.navigate('next');
                } else {
                    this.currentIndex = 0;
                    this.updateCarousel();
                }
            }
        }, 5000);
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    goToSlide(index) {
        if (index >= 0 && index <= this.maxIndex) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialCarousel();
});
