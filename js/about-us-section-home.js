class AboutUsSection {
    constructor() {
        this.init();
        this.setupScrollMask();
        this.setup3DTilt();
    }

    init() {
        // Get all elements
        this.section = document.querySelector('.about-us-section');
        this.content = document.querySelector('.about-us-content');
        this.image = document.querySelector('.about-us-image');
        this.imageWrapper = document.querySelector('.about-us-image .image-wrapper');
        this.features = document.querySelectorAll('.feature-item');
        this.badge = document.querySelector('.experience-badge');
        
        // Add visible class to elements
        if (this.content) this.content.classList.add('visible');
        if (this.image) this.image.classList.add('visible');
        if (this.features) {
            this.features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.classList.add('visible');
                }, 200 * index);
            });
        }
        if (this.badge) {
            setTimeout(() => {
                this.badge.classList.add('visible');
            }, 800);
        }

        // Start number animation
        this.animateNumbers();
    }

    setup3DTilt() {
        if (!this.image) return;

        const MAX_TILT = 10; // Maximum tilt angle in degrees
        const MAX_BADGE_OFFSET = 10; // Maximum badge movement in pixels
        let isHovering = false;

        const handleMove = (e) => {
            if (!isHovering) return;

            const rect = this.image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const xRotation = ((y - rect.height / 2) / rect.height) * MAX_TILT;
            const yRotation = ((x - rect.width / 2) / rect.width) * MAX_TILT;
            
            // Apply the transform
            this.image.style.transform = `
                rotateX(${-xRotation}deg) 
                rotateY(${yRotation}deg)
                scale3d(1.05, 1.05, 1.05)
            `;

            // Move badge in opposite direction for parallax effect
            if (this.badge) {
                const badgeX = (x - rect.width / 2) / rect.width * MAX_BADGE_OFFSET;
                const badgeY = (y - rect.height / 2) / rect.height * MAX_BADGE_OFFSET;
                this.badge.style.transform = `
                    translateZ(50px)
                    translate(${badgeX}px, ${badgeY}px)
                `;
            }
        };

        const handleEnter = () => {
            isHovering = true;
            this.image.classList.add('tilting');
        };

        const handleLeave = () => {
            isHovering = false;
            this.image.classList.remove('tilting');
            this.image.style.transform = '';
            if (this.badge) {
                this.badge.style.transform = 'translateZ(50px)';
            }
        };

        // Add event listeners
        this.image.addEventListener('mousemove', handleMove);
        this.image.addEventListener('mouseenter', handleEnter);
        this.image.addEventListener('mouseleave', handleLeave);
        this.image.addEventListener('touchstart', () => {
            this.image.classList.add('tilting');
            setTimeout(() => {
                this.image.classList.remove('tilting');
            }, 1000);
        });
    }

    setupScrollMask() {
        if (!this.imageWrapper) return;

        const updateMask = () => {
            const rect = this.imageWrapper.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the image is in view
            const distanceFromTop = rect.top;
            const elementHeight = rect.height;
            
            // Calculate the percentage of the element that should be revealed
            let maskPosition = 0;
            
            if (distanceFromTop <= windowHeight && distanceFromTop >= -elementHeight) {
                // Calculate reveal percentage based on scroll position
                maskPosition = ((windowHeight - distanceFromTop) / (windowHeight + elementHeight)) * 100;
                // Clamp the value between 0 and 100
                maskPosition = Math.min(Math.max(maskPosition, 0), 100);
            } else if (distanceFromTop < -elementHeight) {
                maskPosition = 100;
            }
            
            // Apply the mask position
            this.imageWrapper.style.setProperty('--mask-position', `${maskPosition}%`);
        };

        // Initial check
        updateMask();

        // Add scroll listener
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateMask);
        });
    }

    animateNumbers() {
        const numberElement = document.querySelector('.experience-number');
        if (!numberElement) return;

        const targetNumber = parseInt(numberElement.getAttribute('data-value') || '15');
        const duration = 2000;
        const steps = 60;
        const stepValue = targetNumber / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const currentValue = Math.round(stepValue * currentStep);
            numberElement.textContent = `${currentValue}+`;

            if (currentStep === steps) {
                clearInterval(interval);
            }
        }, duration / steps);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutUsSection();
});
