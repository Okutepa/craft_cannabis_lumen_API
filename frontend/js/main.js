// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Vue instance
const app = new Vue({
    el: '#app',
    data: {
        title: 'Craft Cannabis',
        products: [],
        signatureProducts: [],
        growersProducts: [],
        selectedProduct: null,
        loading: false,
        error: null,
        apiUrl: 'http://localhost:8888/craft-cannabis/api/public'
    },
    mounted() {
        // Initialize animations when Vue is mounted
        this.$nextTick(() => {
            this.initAnimations();
        });
        
        // Fetch products from API
        this.fetchProducts();
    },
    methods: {
        // Initialize GSAP animations for the hero section
        initAnimations() {
            // Hero section text animation
            gsap.from('.hero h1', {
                duration: 1.2,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
            
            gsap.from('.hero p', {
                duration: 1.2,
                y: 30,
                opacity: 0,
                delay: 0.3,
                ease: 'power3.out'
            });
            
            // Navigation animation
            gsap.from('.main-nav', {
                duration: 0.8,
                y: -20,
                opacity: 0,
                ease: 'power2.out'
            });

            // Add animations for product sections
            gsap.from('.signature-strains h2', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.signature-strains',
                    start: 'top 80%'
                }
            });

            gsap.from('.signature-cards .card', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.signature-cards',
                    start: 'top 80%'
                }
            });

            gsap.from('.growers-selection h2', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.growers-selection',
                    start: 'top 80%'
                }
            });

            gsap.from('.growers-cards .card', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.growers-cards',
                    start: 'top 80%'
                }
            });
        },
        
        // Method to fetch products from API
        fetchProducts() {
            this.loading = true;
            this.error = null;
            
            axios.get(`${this.apiUrl}/products`)
                .then(response => {
                    // Process and normalize image paths
                    this.products = response.data.map(product => {
                        if (product.media && product.media.length) {
                            product.media = product.media.map(media => {
                                if (media.file_path) {
                                    // Remove leading slash if present
                                    if (media.file_path.startsWith('/')) {
                                        media.file_path = media.file_path.substring(1);
                                    }
                                    
                                    // Add images/ prefix if needed
                                    if (!media.file_path.startsWith('images/') && !media.file_path.startsWith('http')) {
                                        media.file_path = `images/${media.file_path}`;
                                    }
                                }
                                return media;
                            });
                        }
                        return product;
                    });
                    
                    // Sort products into categories
                    this.categorizeProducts();
                    this.loading = false;

                    console.log('Signature Products:', this.signatureProducts);
                    console.log('Growers Products:', this.growersProducts);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                    this.error = 'Could not load products. Please try again later.';
                    this.loading = false;
                });
        },

        // Categorize products by type
        categorizeProducts() {
            // Signature strains - limit to 3 products
            this.signatureProducts = this.products
                .filter(product => product.type.includes('Sativa') || product.type.includes('Pre-Roll'))
                .slice(0, 3);
                
            // Growers selection - different products
            this.growersProducts = this.products
                .filter(product => product.type.includes('Hybrid') || product.type.includes('Indica'))
                .slice(0, 3);
        },
        
        // Show product details
        showProductDetails(productId) {
            // Find the product by ID
            const product = this.products.find(p => p.id === productId);
            
            if (product) {
                this.selectedProduct = product;
                
                // Prevent scrolling on the body
                document.body.style.overflow = 'hidden';
                
                // Add animation for the modal
                this.$nextTick(() => {
                    gsap.from('.modal-content', {
                        duration: 0.4,
                        scale: 0.9,
                        opacity: 0,
                        ease: 'back.out(1.7)'
                    });
                });
            }
        },

        // Close product details
        closeProductDetails() {
            // Animate modal closing
            gsap.to('.modal-content', {
                duration: 0.3,
                scale: 0.9,
                opacity: 0,
                onComplete: () => {
                    this.selectedProduct = null;
                    // Re-enable scrolling
                    document.body.style.overflow = '';
                }
            });
        }
    }
});