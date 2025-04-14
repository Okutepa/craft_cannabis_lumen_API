// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Vue instance
const app = new Vue({
    el: '#app',
    data: function() {
        return {
        title: 'Craft Cannabis',
        products: [],
        signatureProducts: [],
        growersProducts: [],
        selectedProduct: null,
        loading: false,
        error: null,
        apiUrl: 'http://localhost:8888/craft-cannabis/api/public',
        
        newsletterEmail: '',
        newsletterMessage: '',
        newsletterSubmitting: false,
        showNewsletterLightbox: false,
        
        mapLocations: [
            { 
                name: 'Downtown Shop', 
                lat: 42.9834, 
                lng: -81.2496, 
                address: '420 Dundas St, London ON',
                hours: 'Monday-Saturday: 10am-9pm\nSunday: 11am-6pm'
            },
            { 
                name: 'Westside Location', 
                lat: 43.0013, 
                lng: -81.2773, 
                address: '215 Oxford St, London ON',
                hours: 'Monday-Saturday: 10am-8pm\nSunday: 12pm-5pm'
            }
        ],
        
        // Product slider data
        activeSlideIndex: {
            signature: 0,
            growers: 0
        }
    };
    },
    methods: {
        // ---- Newsletter Methods ----
        handleNewsletterSubmit: function() {
            // Clear any previous error messages
            this.newsletterMessage = '';
            
            // Get email and validate
            const email = this.newsletterEmail.trim();
            if (!email) {
                this.newsletterMessage = 'Please enter your email address.';
                return;
            }
            
            // Update button state
            this.newsletterSubmitting = true;
            
            // Send subscription request to API
            axios.post(`${this.apiUrl}/subscribers`, {
                email: email
            })
            .then(response => {
                // Success! Reset form
                this.newsletterEmail = '';
                
                // Show success lightbox
                this.showNewsletterLightbox = true;
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                
                // Animate the lightbox content
                this.$nextTick(() => {
                    gsap.from('.lightbox-content', {
                        duration: 0.4,
                        scale: 0.9,
                        opacity: 0,
                        ease: 'back.out(1.7)'
                    });
                });
            })
            .catch(error => {
                // Handle validation errors (like duplicate email)
                if (error.response && error.response.status === 422) {
                    let errorMsg = 'Failed to subscribe. Please try again.';
                    if (error.response.data.details && error.response.data.details.email) {
                        errorMsg = error.response.data.details.email[0];
                    }
                    this.newsletterMessage = errorMsg;
                } else {
                    // Handle other errors
                    this.newsletterMessage = 'Failed to subscribe. Please try again.';
                }
            })
            .finally(() => {
                // Reset button state
                this.newsletterSubmitting = false;
            });
        },
        
        closeNewsletterLightbox: function() {
            gsap.to('.lightbox-content', {
                duration: 0.3,
                scale: 0.9,
                opacity: 0,
                onComplete: () => {
                    this.showNewsletterLightbox = false;
                    document.body.style.overflow = ''; // Re-enable scrolling
                }
            });
        },
        
        // ---- Map Methods ----
        initializeMap: function() {
            // Check if the map element exists
            const mapElement = document.getElementById('map');
            if (!mapElement) return;
            
            // Add a loading indicator
            mapElement.innerHTML = '<div class="map-loading">Loading map...</div>';

            try {
                // Map styling to match your design (dark theme with green accents)
                const mapStyles = [
                    {
                        "elementType": "geometry",
                        "stylers": [{ "color": "#212121" }]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [{ "visibility": "off" }]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#757575" }]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [{ "color": "#212121" }]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#2C574B" }]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#9e9e9e" }]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#bdbdbd" }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#757575" }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#181818" }]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#2C574B" }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers": [{ "color": "#2c2c2c" }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#8a8a8a" }]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#373737" }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#3c3c3c" }]
                    },
                    {
                        "featureType": "road.highway.controlled_access",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#4e4e4e" }]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#757575" }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{ "color": "#000000" }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [{ "color": "#3d3d3d" }]
                    }
                ];
                
                // Define locations from Vue data
                const locations = this.mapLocations;
                
                // Calculate center coordinates
                const centerLat = (locations[0].lat + locations[1].lat) / 2;
                const centerLng = (locations[0].lng + locations[1].lng) / 2;
                
                // Create map
                const map = new google.maps.Map(mapElement, {
                    center: { lat: centerLat, lng: centerLng },
                    zoom: 12,
                    styles: mapStyles,
                    disableDefaultUI: true,
                    zoomControl: true
                });
                
                // Custom marker icons
                const markerIcon = {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: "#2C574B",
                    fillOpacity: 1,
                    strokeColor: "#FFFFFF",
                    strokeWeight: 2,
                    scale: 10
                };
                
                // Create markers and info windows for each location
                const markers = [];
                const infoWindows = [];
                
                locations.forEach((location, index) => {
                    // Create marker
                    const marker = new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: map,
                        icon: markerIcon,
                        title: location.name
                    });
                    
                    // Create info window
                    const infoWindow = new google.maps.InfoWindow({
                        content: `<div class='map-info'><h3>${location.name}</h3><p>${location.address}</p></div>`
                    });
                    
                    // Add click listener to marker
                    marker.addListener('click', () => {
                        // Close all info windows
                        infoWindows.forEach(iw => iw.close());
                        // Open this info window
                        infoWindow.open(map, marker);
                    });
                    
                    markers.push(marker);
                    infoWindows.push(infoWindow);
                });
                
                // Show first location info by default
                infoWindows[0].open(map, markers[0]);
                
                // Draw a line between locations
                const path = new google.maps.Polyline({
                    path: locations.map(loc => ({ lat: loc.lat, lng: loc.lng })),
                    geodesic: true,
                    strokeColor: "#2C574B",
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                });
                
                path.setMap(map);
                
                // Add map animations
                this.animateMapElements();
                
                console.log('Google Map initialized successfully');
                
                // Connect store details hover to map markers
                const stores = document.querySelectorAll('.store');
                stores.forEach((store, index) => {
                    if (index < markers.length) {
                        store.addEventListener('mouseenter', () => {
                            // Close all info windows
                            infoWindows.forEach(iw => iw.close());
                            // Open this info window
                            infoWindows[index].open(map, markers[index]);
                        });
                    }
                });
                
            } catch (error) {
                console.error('Error initializing map:', error);
                mapElement.innerHTML = '<div class="map-error">Error loading map. Please try again later.</div>';
            }
        },
        
        // Function to add animations to map elements
        animateMapElements: function() {
            gsap.from('.map-container', {
                duration: 0.8,
                y: 50,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.locations',
                    start: 'top 80%'
                }
            });
            
            gsap.from('.store-details', {
                duration: 0.6,
                y: 30,
                opacity: 0,
                delay: 0.4,
                scrollTrigger: {
                    trigger: '.locations',
                    start: 'top 80%'
                }
            });
        },
        
        // ---- Product Slider Methods ----
        
        initProductSliders: function() {
            // Initialize for signature products
            this.initSlider('signature-cards', 'signature');
            
            // Initialize for growers products
            this.initSlider('growers-cards', 'growers');
        },
        
        initSlider: function(containerClass, sliderType) {
            const container = document.querySelector(`.${containerClass}`);
            if (!container) return;
            
            const cards = container.querySelectorAll('.card');
            if (cards.length < 2) return;
            
            // Add scroll event listener to track active slide
            container.addEventListener('scroll', () => {
                const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
                const scrollPosition = container.scrollLeft;
                const activeIndex = Math.round(scrollPosition / cardWidth);
                
                // Update active slide index in Vue data
                this.activeSlideIndex[sliderType] = activeIndex;
            });
        },
        
        goToSlide: function(sliderType, index) {
            const container = document.querySelector(`.${sliderType === 'signature' ? 'signature-cards' : 'growers-cards'}`);
            if (!container) return;
            
            const cards = container.querySelectorAll('.card');
            if (cards.length <= index) return;
            
            const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
            
            container.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            
            this.activeSlideIndex[sliderType] = index;
        },
        
        nextSlide: function(sliderType) {
            const container = document.querySelector(`.${sliderType === 'signature' ? 'signature-cards' : 'growers-cards'}`);
            if (!container) return;
            
            const cards = container.querySelectorAll('.card');
            const currentIndex = this.activeSlideIndex[sliderType];
            const nextIndex = currentIndex + 1 < cards.length ? currentIndex + 1 : currentIndex;
            
            this.goToSlide(sliderType, nextIndex);
        },
        
        prevSlide: function(sliderType) {
            const currentIndex = this.activeSlideIndex[sliderType];
            const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
            
            this.goToSlide(sliderType, prevIndex);
        },

        // ---- Animation Methods ----
        
        initAnimations: function() {
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
            
            // Location section title animation
            gsap.from('.locations h2', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.locations',
                    start: 'top 80%'
                }
            });
            
            // Newsletter section animation
            gsap.from('.newsletter h2', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.newsletter',
                    start: 'top 80%'
                }
            });
            
            gsap.from('.newsletter-form', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                delay: 0.2,
                scrollTrigger: {
                    trigger: '.newsletter',
                    start: 'top 80%'
                }
            });
        },
        
        // Method to fetch products from API
        fetchProducts: function() {
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

                    console.log('Products loaded successfully');
                    
                    // Initialize product sliders after products are loaded
                    this.$nextTick(() => {
                        this.initProductSliders();
                    });
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                    this.error = 'Could not load products. Please try again later.';
                    this.loading = false;
                });
        },

        // Categorize products by type
        categorizeProducts: function() {
            // Signature strains - limit to 3 products
            this.signatureProducts = this.products
                .filter(product => product.type.includes('Sativa') || product.type.includes('Pre-Roll'))
                .slice(0, 3);
                
            // Growers selection - different products
            this.growersProducts = this.products
                .filter(product => product.type.includes('Hybrid') || product.type.includes('Indica'))
                .slice(0, 3);
                
            console.log('Signature Products:', this.signatureProducts);
            console.log('Growers Products:', this.growersProducts);
        },
        
        // Show product details
        showProductDetails: function(productId) {
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
        closeProductDetails: function() {
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
    },
    mounted: function() {
        // Initialize animations when Vue is mounted
        this.$nextTick(() => {
            this.initAnimations();
            
            // Initialize map when the page is loaded
            this.initializeMap();
        });
        
        // Fetch products from API
        this.fetchProducts();
        
        // Setup lightbox close on escape key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this.showNewsletterLightbox) {
                this.closeNewsletterLightbox();
            }
        });
        
        // Setup click outside lightbox to close
        document.querySelector('.lightbox').addEventListener('click', e => {
            if (e.target.classList.contains('lightbox') && this.showNewsletterLightbox) {
                this.closeNewsletterLightbox();
            }
        });
    }
});