document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    
    // Force minimum display time for preloader
    setTimeout(() => {
        window.addEventListener('load', hidePreloader);
        // Fallback in case load event already fired
        if (document.readyState === 'complete') {
            hidePreloader();
        }
    }, 2000); // Minimum 2 seconds display
    
    function hidePreloader() {
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 800); // Match the CSS transition time
    }
    
    // Disable scrolling while preloader is visible
    document.body.style.overflow = 'hidden';
});
