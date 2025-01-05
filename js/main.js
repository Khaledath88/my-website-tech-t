// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Initialize navbar toggler state
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Create a Bootstrap collapse instance
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
    });

    // Handle navbar toggler click
    navbarToggler?.addEventListener('click', () => {
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
        navbarToggler.setAttribute('aria-expanded', (!isExpanded).toString());
        bsCollapse.toggle();
    });

    // Listen for Bootstrap collapse events
    navbarCollapse?.addEventListener('hidden.bs.collapse', () => {
        navbarToggler.setAttribute('aria-expanded', 'false');
    });

    navbarCollapse?.addEventListener('shown.bs.collapse', () => {
        navbarToggler.setAttribute('aria-expanded', 'true');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbarCollapse?.classList.contains('show') && 
            !e.target.closest('.navbar-collapse') && 
            !e.target.closest('.navbar-toggler')) {
            bsCollapse.hide();
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
    });

    // Search Toggle Functionality
    const searchToggles = document.querySelectorAll('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchInput = document.querySelector('.search-input');
    const searchClose = document.querySelector('.search-close');

    // Function to open search
    function openSearch(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Only close mobile menu if it's not the mobile search icon
        if (!e.currentTarget.closest('.mobile-nav-icons')) {
            if (navbarCollapse?.classList.contains('show')) {
                bsCollapse.hide();
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }

        searchOverlay?.classList.add('active');
        document.body.classList.add('search-open');
        setTimeout(() => searchInput?.focus(), 300);
    }

    // Function to close search
    function closeSearch() {
        searchOverlay?.classList.remove('active');
        document.body.classList.remove('search-open');
    }

    // Add click events to search toggles
    searchToggles.forEach(toggle => {
        toggle.addEventListener('click', openSearch);
    });

    // Add click event to close button
    searchClose?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeSearch();
    });

    // Close search on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (searchOverlay?.classList.contains('active')) {
                closeSearch();
            }
            if (navbarCollapse?.classList.contains('show')) {
                bsCollapse.hide();
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Close search when clicking outside
    searchOverlay?.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    // Prevent search content clicks from closing the overlay
    const searchContent = document.querySelector('.search-content');
    searchContent?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Prevent default behavior of buttons
    document.querySelectorAll('.nav-icon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current nav item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
        }
    });
});
