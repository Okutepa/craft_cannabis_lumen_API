// Initialize Vue instance
const app = new Vue({
    el: '#app',
    data: {
        title: 'Craft Cannabis',
        products: [],
        selectedProduct: null,
        loading: false,
        error: null,
        apiUrl: 'http://localhost:8888/craft-cannabis/api/public'
    },
    mounted() {
        // Initialize animations when Vue is mounted
        this.initAnimations();
        
        // We'll fetch products later when we implement that section
        // this.fetchProducts();
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
        },
        
        // Method to fetch products from API (will implement later)
        fetchProducts() {
            this.loading = true;
            this.error = null;
            
            axios.get(`${this.apiUrl}/products`)
                .then(response => {
                    this.products = response.data;
                    this.loading = false;
                    
                    // Animate product cards when they appear
                    this.$nextTick(() => {
                        // We'll add this animation when we implement the products section
                    });
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                    this.error = 'Could not load products. Please try again later.';
                    this.loading = false;
                });
        },
        
        // Method to show product details (will implement later)
        showProductDetails(productId) {
            // This will be implemented when we build the product details section
        }
    }
});