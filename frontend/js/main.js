import { fetchProducts, fetchProductDetails } from './api.js';
import { initAnimations, animateProductCards, animateModalOpen, animateModalClose } from './animations.js';

gsap.registerPlugin(ScrollTrigger);

const app = Vue.createApp({
    data() {
        return {
            products: [],
            selectedProduct: null,
            loading: true,
            error: null,
            apiUrl: 'http://localhost:8888/craft-cannabis/api/public',
            visibleProducts: 6, 
            productsPerPage: 3 
        };
    },
    computed: {
        sortedProducts() {
            return this.products.slice().sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        },
        displayedProducts() {
            return this.sortedProducts.slice(0, this.visibleProducts);
        },
        hasMoreProducts() {
            return this.visibleProducts < this.products.length;
        }
    },
    methods: {
        fetchProducts() {
            this.loading = true;
            
            fetchProducts(this.apiUrl)
                .then(data => {
                    this.products = data;
                    this.loading = false;
                    
                    this.$nextTick(() => {
                        animateProductCards();
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.error = error.message;
                    this.loading = false;
                });
        },
        
        fetchProductDetails(productId) {
            this.loading = true;
            
            fetchProductDetails(this.apiUrl, productId)
                .then(data => {
                    this.selectedProduct = data;
                    this.loading = false;
                    
                    this.$nextTick(() => {
                        animateModalOpen();
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.error = error.message;
                    this.loading = false;
                });
        },
        
        closeProductDetails() {
            animateModalClose(() => {
                this.selectedProduct = null;
            });
        },
        
        loadMoreProducts() {
            this.visibleProducts += this.productsPerPage;
        }
    },
    mounted() {
        initAnimations();
        this.fetchProducts();
    }
}).mount('#app');