class PortfolioSection {
    constructor() {
        this.init();
    }

    init() {
        this.portfolioGrid = document.querySelector('.portfolio-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = [];
        this.modal = document.querySelector('.portfolio-modal');
        this.modalContent = document.querySelector('.modal-content');
        this.currentFilter = 'all';
        this.cursor = document.createElement('div');
        this.cursor.className = 'portfolio-cursor';
        this.cursor.textContent = 'View';
        document.body.appendChild(this.cursor);
        
        this.loadPortfolioItems();
        this.bindEvents();
        this.setupAnimations();
        this.initCustomCursor();
    }

    loadPortfolioItems() {
        const items = [
            {
                image: 'assets/images/portfolio/project1.jpg',
                title: 'E-commerce Platform',
                category: 'Web Development',
                filter: 'web',
                description: 'Modern e-commerce platform with advanced features and seamless user experience.'
            },
            {
                image: 'assets/images/portfolio/project2.jpg',
                title: 'Fitness App',
                category: 'Mobile Development',
                filter: 'mobile',
                description: 'Comprehensive fitness tracking app with personalized workout plans.'
            },
            {
                image: 'assets/images/portfolio/project3.jpg',
                title: 'Cloud ERP System',
                category: 'Cloud Solutions',
                filter: 'cloud',
                description: 'Enterprise resource planning system with cloud-based infrastructure.'
            },
            {
                image: 'assets/images/portfolio/project4.jpg',
                title: 'AI Chatbot',
                category: 'AI Integration',
                filter: 'ai',
                description: 'Intelligent chatbot powered by advanced natural language processing.'
            },
            {
                image: 'assets/images/portfolio/project5.jpg',
                title: 'Security System',
                category: 'Cloud Solutions',
                filter: 'cloud',
                description: 'Advanced security system with real-time threat detection.'
            },
            {
                image: 'assets/images/portfolio/project6.jpg',
                title: 'Analytics Dashboard',
                category: 'Web Development',
                filter: 'web',
                description: 'Interactive analytics dashboard with real-time data visualization.'
            }
        ];

        items.forEach(item => {
            const portfolioItem = this.createPortfolioItem(item);
            this.portfolioGrid.appendChild(portfolioItem);
            this.portfolioItems.push(portfolioItem);
        });
    }

    createPortfolioItem(item) {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.dataset.filter = item.filter;
        div.dataset.description = item.description;
        
        div.innerHTML = `
            <div class="portfolio-image-wrapper">
                <img src="${item.image}" alt="${item.title}" class="portfolio-image">
            </div>
            <div class="portfolio-content">
                <h3 class="portfolio-item-title">${item.title}</h3>
                <div class="portfolio-item-category">${item.category}</div>
                <p class="portfolio-item-description">${item.description}</p>
            </div>
        `;

        return div;
    }

    bindEvents() {
        // Filter buttons click event
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                this.filterPortfolio(filter);
                
                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        // Portfolio item click event
        this.portfolioItems.forEach(item => {
            item.addEventListener('click', () => this.openModal(item));
        });

        // Modal events
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }
    }

    filterPortfolio(filter) {
        this.currentFilter = filter;
        this.portfolioGrid.classList.add('filtering');

        this.portfolioItems.forEach(item => {
            item.classList.remove('filtered-in', 'filtered-out');
            
            if (filter === 'all' || item.dataset.filter === filter) {
                item.classList.add('filtered-in');
            } else {
                item.classList.add('filtered-out');
            }
        });

        setTimeout(() => {
            this.portfolioGrid.classList.remove('filtering');
        }, 300);
    }

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('filtered-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        this.portfolioItems.forEach(item => {
            observer.observe(item);
        });
    }

    initCustomCursor() {
        const cursor = this.cursor;
        
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });

            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });

            item.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        });
    }

    openModal(item) {
        const image = item.querySelector('.portfolio-image').src;
        const title = item.querySelector('.portfolio-item-title').textContent;
        const category = item.querySelector('.portfolio-item-category').textContent;
        const description = item.dataset.description;
        const technologies = this.getTechnologies(category);
        const features = this.getFeatures(title);

        const modalHTML = `
            <button class="modal-close" aria-label="Close modal"></button>
            <div class="modal-header">
                <div class="modal-image-wrapper">
                    <img src="${image}" alt="${title}" class="modal-image">
                </div>
            </div>
            <div class="modal-body">
                <div class="modal-info">
                    <h3 class="modal-title">${title}</h3>
                    <div class="modal-category">${category}</div>
                    <p class="modal-description">${description}</p>
                    
                    <div class="modal-details">
                        <h4>Technologies Used</h4>
                        <ul class="details-list">
                            ${technologies.map(tech => `
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    <span>${tech}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="modal-details">
                        <h4>Key Features</h4>
                        <ul class="details-list">
                            ${features.map(feature => `
                                <li>
                                    <i class="fas fa-star"></i>
                                    <span>${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-secondary">
                    <i class="fas fa-code"></i>
                    View Code
                </button>
                <button class="modal-btn modal-btn-primary">
                    <i class="fas fa-external-link-alt"></i>
                    Live Demo
                </button>
            </div>
        `;

        this.modalContent.innerHTML = modalHTML;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isModalOpen = true;

        // Rebind close button event after updating modal content
        const newCloseButton = this.modalContent.querySelector('.modal-close');
        if (newCloseButton) {
            newCloseButton.addEventListener('click', () => this.closeModal());
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            this.isModalOpen = false;
        }
    }

    getTechnologies(category) {
        // Return relevant technologies based on project category
        const techStack = {
            'Web Development': [
                'React.js',
                'Node.js',
                'MongoDB',
                'Express.js',
                'Redux',
                'Webpack'
            ],
            'Mobile Development': [
                'React Native',
                'Flutter',
                'Firebase',
                'Redux',
                'Native APIs',
                'Push Notifications'
            ],
            'Cloud Solutions': [
                'AWS',
                'Docker',
                'Kubernetes',
                'Microservices',
                'CI/CD',
                'Cloud Security'
            ],
            'AI Integration': [
                'TensorFlow',
                'PyTorch',
                'Natural Language Processing',
                'Computer Vision',
                'Machine Learning',
                'Neural Networks'
            ],
            'Cybersecurity': [
                'Encryption',
                'Firewall',
                'Penetration Testing',
                'Security Protocols',
                'Threat Detection',
                'Access Control'
            ],
            'Data Analytics': [
                'Python',
                'R',
                'Tableau',
                'Machine Learning',
                'Big Data',
                'Data Visualization'
            ]
        };

        return techStack[category] || [];
    }

    getFeatures(title) {
        // Return relevant features based on project title
        const features = {
            'E-commerce Platform': [
                'Real-time Inventory Management',
                'Secure Payment Processing',
                'User Authentication',
                'Order Tracking',
                'Product Reviews',
                'Admin Dashboard'
            ],
            'Fitness App': [
                'Workout Tracking',
                'Nutrition Planning',
                'Progress Analytics',
                'Social Sharing',
                'Custom Workout Plans',
                'Integration with Wearables'
            ],
            'ERP System': [
                'Resource Management',
                'Financial Planning',
                'Inventory Control',
                'HR Management',
                'Reporting & Analytics',
                'Multi-branch Support'
            ],
            'AI Chatbot': [
                'Natural Language Understanding',
                'Multi-language Support',
                'Context Awareness',
                'Integration APIs',
                'Analytics Dashboard',
                'Custom Training'
            ],
            'Security System': [
                'Real-time Monitoring',
                'Threat Detection',
                'Automated Response',
                'Compliance Management',
                'Security Reporting',
                'Access Control'
            ],
            'Analytics Dashboard': [
                'Real-time Data Processing',
                'Interactive Visualizations',
                'Custom Reports',
                'Predictive Analytics',
                'Data Export',
                'Role-based Access'
            ]
        };

        return features[title] || [];
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioSection();
});
