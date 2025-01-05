// Header JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const topBar = document.querySelector('.top-bar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.scrollY;
        const isMobile = window.innerWidth <= 991.98;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            topBar.classList.add('scrolled');
            
            // Reset any margin-top when scrolled
            navbar.style.marginTop = '0';
            navbar.style.top = '0';
            
        } else {
            navbar.classList.remove('scrolled');
            topBar.classList.remove('scrolled');
            
            // Reset to original position
            if (isMobile) {
                navbar.style.marginTop = '20px';
                navbar.style.top = '40px';
            } else {
                navbar.style.marginTop = '0';
                navbar.style.top = '45px';
            }
        }
        
        lastScroll = currentScroll;
    }
    
    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', handleScroll);
    
    // Handle mobile menu toggle
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
    });
    
    // Handle menu item clicks
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                bsCollapse.hide();
            }
        });
    });
    
    // Initial position setup
    handleScroll();
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    let searchTimeout;

    // Toggle search overlay
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });

    // Close search overlay
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    // AJAX Search
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        searchTimeout = setTimeout(() => {
            // Simulate AJAX call (replace with actual API endpoint)
            searchResults.innerHTML = '<div class="p-3 text-center text-white">Searching...</div>';
            
            // Example search results (replace with actual API call)
            const demoResults = [
                {
                    title: 'Web Development',
                    description: 'Professional web development services',
                    image: 'path/to/image1.jpg'
                },
                {
                    title: 'Mobile Apps',
                    description: 'Custom mobile application development',
                    image: 'path/to/image2.jpg'
                }
            ];

            // Display results
            setTimeout(() => {
                displaySearchResults(demoResults);
            }, 500);
        }, 300);
    });

    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="p-3 text-center text-white">No results found</div>';
            return;
        }

        const html = results.map(result => `
            <div class="search-result-item">
                <div class="search-result-content">
                    <h5>${result.title}</h5>
                    <p>${result.description}</p>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = html;
    }

    // Prevent click propagation
    searchOverlay.querySelector('.search-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close overlay when clicking outside
    searchOverlay.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
});
