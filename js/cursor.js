document.addEventListener('DOMContentLoaded', () => {
    // Force cursor hiding on all elements
    const hideDefaultCursor = () => {
        document.body.style.cursor = 'none';
        document.documentElement.style.cursor = 'none';
        document.querySelectorAll('*').forEach(el => {
            el.style.cursor = 'none';
            if (el.tagName.toLowerCase() === 'a' || 
                el.tagName.toLowerCase() === 'button' || 
                el.classList.contains('hover-effect')) {
                el.style.pointerEvents = 'auto';
                Array.from(el.children).forEach(child => {
                    child.style.cursor = 'none';
                    child.style.pointerEvents = 'none';
                });
            }
        });
    };

    // Create cursor elements
    const cursor = document.createElement('div');
    const dot = document.createElement('div');
    cursor.className = 'custom-cursor';
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    // Set initial position to center of viewport
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    // Update cursor position
    const updateCursor = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Ensure cursor is visible
        cursor.style.opacity = '1';
        dot.style.opacity = '1';
        
        // Check for interactive elements
        const element = document.elementFromPoint(mouseX, mouseY);
        const isLink = element?.closest('a, button, .hover-effect');
        
        if (isLink) {
            cursor.classList.add('hover');
            cursor.classList.remove('text-mode');
            
            // Simple magnetic effect
            const rect = isLink.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = mouseX - centerX;
            const distanceY = mouseY - centerY;
            
            if (Math.abs(distanceX) < rect.width / 2 && Math.abs(distanceY) < rect.height / 2) {
                isLink.style.transform = `translate(${distanceX * 0.1}px, ${distanceY * 0.1}px)`;
            } else {
                isLink.style.transform = '';
            }
        } else {
            cursor.classList.remove('hover');
            document.querySelectorAll('a, button, .hover-effect').forEach(link => {
                link.style.transform = '';
            });

            // Only add text mode for text elements that are not within links
            if (element && !element.closest('a, button, .hover-effect') && 
                element.matches('p, h1, h2, h3, h4, h5, h6, span, input:not([type="button"]):not([type="submit"]), textarea')) {
                cursor.classList.add('text-mode');
            } else {
                cursor.classList.remove('text-mode');
            }
        }
    };

    // Smooth cursor movement
    const render = () => {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        dot.style.left = cursorX + 'px';
        dot.style.top = cursorY + 'px';
        
        requestAnimationFrame(render);
    };

    // Event listeners
    document.addEventListener('mousemove', updateCursor);
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        dot.style.opacity = '1';
        cursor.style.display = 'block';
        dot.style.display = 'block';
        hideDefaultCursor();
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        dot.style.opacity = '0';
    });

    // Handle scroll events
    document.addEventListener('scroll', () => {
        cursor.style.opacity = '1';
        dot.style.opacity = '1';
        hideDefaultCursor();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
        hideDefaultCursor();
    });

    // Initial cursor hiding
    hideDefaultCursor();

    // Periodically ensure cursor remains hidden
    setInterval(hideDefaultCursor, 500);

    // Handle dynamic content changes
    const observer = new MutationObserver(hideDefaultCursor);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });

    // Start animation loop
    requestAnimationFrame(render);
});
