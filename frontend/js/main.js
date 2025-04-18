// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const app = new Vue({
    el: '#app',
    data: {
        products: [],
        selectedProduct: null,
        loading: true,
        error: null,
        apiUrl: 'http://localhost:8888/craft-cannabis/api/public'
    },
    computed: {
        sortedProducts() {
            return this.products.slice().sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        }
    },
    methods: {
        fetchProducts() {
            this.loading = true;
            
            fetch(this.apiUrl + '/products')
            .then(response => response.json())
            .then(data => {
                this.products = data;
                this.loading = false;
                
                // Animate products after they're loaded
                this.$nextTick(() => {
                    gsap.from('.products .card', {
                        duration: 0.8,
                        y: 50,
                        opacity: 0,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: '.products',
                            start: 'top 80%'
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Error:', error);
                this.error = 'Could not load products. Please try again.';
                this.loading = false;
            });
        },
        
        fetchProductDetails(productId) {
            this.loading = true;
            
            fetch(this.apiUrl + '/products/' + productId)
            .then(response => response.json())
            .then(data => {
                this.selectedProduct = data;
                this.loading = false;
                
                // Animate modal
                this.$nextTick(() => {
                    gsap.from('.modal-content', {
                        duration: 0.4,
                        scale: 0.9,
                        opacity: 0
                    });
                });
            })
            .catch(error => {
                console.error('Error:', error);
                this.error = 'Could not load product details.';
                this.loading = false;
            });
        },
        
        closeProductDetails() {
            gsap.to('.modal-content', {
                duration: 0.3,
                scale: 0.9,
                opacity: 0,
                onComplete: () => {
                    this.selectedProduct = null;
                }
            });
        },
        
        initAnimations() {
            // Hero animations
            gsap.from('.hero h1', {
                duration: 1.2,
                y: 50,
                opacity: 0
            });
            
            gsap.from('.hero p', {
                duration: 1.2,
                y: 30,
                opacity: 0,
                delay: 0.3
            });
            
            // Navigation
            gsap.from('.main-nav', {
                duration: 0.8,
                y: -20,
                opacity: 0
            });
            
            // Products section heading
            gsap.from('.products h2', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.products',
                    start: 'top 80%'
                }
            });
            
            // Footer
            gsap.from('footer', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                scrollTrigger: {
                    trigger: 'footer',
                    start: 'top 90%'
                }
            });
        }
    },
    mounted() {
        this.initAnimations();
        this.fetchProducts();
    }
});