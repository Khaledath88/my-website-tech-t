class TeamCarousel {
    constructor() {
        this.container = document.querySelector('.team-carousel-container');
        this.members = Array.from(document.querySelectorAll('.team-member'));
        this.dots = document.querySelectorAll('.team-carousel-dot');
        this.prevBtn = document.querySelector('.team-carousel-arrow.prev');
        this.nextBtn = document.querySelector('.team-carousel-arrow.next');
        this.currentIndex = 0;
        this.totalMembers = this.members.length;
        this.isAnimating = false;
        this.autoplayInterval = null;

        this.init();
    }

    init() {
        // Clone first and last slides for infinite effect
        const firstClone = this.members[0].cloneNode(true);
        const lastClone = this.members[this.totalMembers - 1].cloneNode(true);
        
        // Add clones to DOM
        this.container.appendChild(firstClone);
        this.container.insertBefore(lastClone, this.members[0]);
        
        // Update members array with clones
        this.members = Array.from(document.querySelectorAll('.team-member'));
        
        // Set initial position
        this.currentIndex = 1; // Start from first real slide
        this.updateCarousel(false);

        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.navigate('prev'));
        this.nextBtn.addEventListener('click', () => this.navigate('next'));
        
        // Add dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index + 1));
        });

        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.pauseAutoplay();
        });

        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                this.navigate('next');
            } else if (touchEndX - touchStartX > 50) {
                this.navigate('prev');
            }
            this.startAutoplay();
        });

        // Start autoplay
        this.startAutoplay();

        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }

    startAutoplay() {
        if (this.autoplayInterval) return;
        this.autoplayInterval = setInterval(() => {
            this.navigate('next');
        }, 5000);
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    updateCarousel(animate = true) {
        this.members.forEach((member, index) => {
            member.classList.remove('prev', 'current', 'next', 'visible');
            
            if (!animate) {
                member.style.transition = 'none';
                setTimeout(() => member.style.transition = '', 50);
            }

            const position = index - this.currentIndex;
            
            if (position === 0) {
                member.classList.add('current', 'visible');
            } else if (position === -1 || (position === this.members.length - 1)) {
                member.classList.add('prev', 'visible');
            } else if (position === 1 || position === -(this.members.length - 1)) {
                member.classList.add('next', 'visible');
            }
        });

        // Update dots - adjust for cloned slides
        const realIndex = this.currentIndex - 1;
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', 
                index === (realIndex < 0 ? this.totalMembers - 1 : 
                         realIndex >= this.totalMembers ? 0 : realIndex));
        });
    }

    navigate(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const previousIndex = this.currentIndex;
        
        if (direction === 'next') {
            this.currentIndex++;
        } else {
            this.currentIndex--;
        }

        this.updateCarousel();

        // Handle infinite scroll
        setTimeout(() => {
            if (this.currentIndex === this.members.length - 1) {
                this.currentIndex = 1;
                this.updateCarousel(false);
            } else if (this.currentIndex === 0) {
                this.currentIndex = this.members.length - 2;
                this.updateCarousel(false);
            }
            this.isAnimating = false;
        }, 600);
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.isAnimating = true;

        // Adjust for cloned slides
        this.currentIndex = index;
        this.updateCarousel();

        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TeamCarousel();
});
