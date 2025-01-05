class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.hero-dot');
        this.prevBtn = document.querySelector('.hero-control.prev');
        this.nextBtn = document.querySelector('.hero-control.next');
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        this.progressInterval = null;
        this.autoPlayDelay = 6000; // 6 seconds
        this.progress = 0;
        this.lastScrollTop = 0;
        this.ticking = false;

        this.init();
    }

    init() {
        // Create progress bar
        this.createProgressBar();

        // Set initial active slide
        this.showSlide(0);

        // Add event listeners
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Add dot click events
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });

        // Start autoplay
        this.startAutoPlay();

        // Pause autoplay on hover
        const heroSection = document.querySelector('.hero-section');
        heroSection?.addEventListener('mouseenter', () => this.stopAutoPlay());
        heroSection?.addEventListener('mouseleave', () => this.startAutoPlay());

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        // Handle scroll for parallax
        window.addEventListener('scroll', () => this.handleParallax());

        // Handle touch events
        let touchStartX = 0;
        let touchEndX = 0;

        heroSection?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.stopAutoPlay();
        }, { passive: true });

        heroSection?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
            this.startAutoPlay();
        }, { passive: true });
    }

    handleParallax() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroSection = document.querySelector('.hero-section');
                const heroHeight = heroSection.offsetHeight;
                
                if (scrolled <= heroHeight) {
                    const activeSlide = document.querySelector('.hero-slide.active');
                    if (activeSlide) {
                        const bg = activeSlide.querySelector('.hero-slide-bg');
                        const overlay = activeSlide.querySelector('.hero-slide-overlay');
                        
                        // Calculate smooth parallax value for background
                        const parallaxValue = Math.min(scrolled * 0.15, heroHeight * 0.15);
                        
                        // Apply smooth transform only to background and overlay
                        const transform = `translate3d(0, ${parallaxValue}px, 0)`;
                        bg.style.transform = transform;
                        overlay.style.transform = transform;
                    }
                }
                
                this.ticking = false;
            });
            
            this.ticking = true;
        }
    }

    createProgressBar() {
        // Create progress container
        const progressContainer = document.createElement('div');
        progressContainer.className = 'hero-progress-container';
        
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'hero-progress-bar';
        
        // Add to DOM
        progressContainer.appendChild(progressBar);
        document.querySelector('.hero-section').appendChild(progressContainer);
        
        this.progressBar = progressBar;
    }

    updateProgress() {
        if (this.progressBar) {
            this.progress = 0;
            this.progressBar.style.width = '0%';
            
            if (this.progressInterval) {
                clearInterval(this.progressInterval);
            }
            
            this.progressInterval = setInterval(() => {
                this.progress += (100 / (this.autoPlayDelay / 100)); // Increment every 100ms
                this.progressBar.style.width = `${this.progress}%`;
                
                if (this.progress >= 100) {
                    clearInterval(this.progressInterval);
                }
            }, 100);
        }
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    showSlide(index, direction = 'next') {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Remove all transition classes
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });

        // Remove active class from current dot
        this.dots[this.currentSlide].classList.remove('active');

        // Add transition classes based on direction
        if (direction === 'prev') {
            this.slides[this.currentSlide].classList.add('prev');
        }

        // Update current slide index
        this.currentSlide = index;

        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');

        // Update progress bar
        this.updateProgress();

        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slideCount;
        this.showSlide(nextIndex, 'next');
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.showSlide(prevIndex, 'prev');
    }

    startAutoPlay() {
        this.updateProgress();
        if (!this.autoPlayInterval) {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDelay);
        }
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});
