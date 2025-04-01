/**
 * Google Maps Initializer Module
 * 
 * Handles the creation and configuration of the Google Map for location display
 */

export default function initializeMap() {
    // Check if the map element exists
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    try {
        // Define locations
        const downtownLocation = { lat: 42.9834, lng: -81.2496 };
        const westsideLocation = { lat: 43.0013, lng: -81.2773 };
        
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
        
        // Create map
        const map = new google.maps.Map(mapElement, {
            center: { lat: 42.9926, lng: -81.2644 }, // Center between the two locations
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
        
        // Create markers
        const downtownMarker = new google.maps.Marker({
            position: downtownLocation,
            map: map,
            icon: markerIcon,
            title: "Downtown Shop"
        });
        
        const westsideMarker = new google.maps.Marker({
            position: westsideLocation,
            map: map,
            icon: markerIcon,
            title: "Westside Location"
        });
        
        // Create info windows
        const downtownInfo = new google.maps.InfoWindow({
            content: "<div class='map-info'><h3>Downtown Shop</h3><p>420 Dundas St, London ON</p></div>"
        });
        
        const westsideInfo = new google.maps.InfoWindow({
            content: "<div class='map-info'><h3>Westside Location</h3><p>215 Oxford St, London ON</p></div>"
        });
        
        // Add click listeners to markers
        downtownMarker.addListener('click', () => {
            downtownInfo.open(map, downtownMarker);
            westsideInfo.close();
        });
        
        westsideMarker.addListener('click', () => {
            westsideInfo.open(map, westsideMarker);
            downtownInfo.close();
        });
        
        // Show downtown info by default
        downtownInfo.open(map, downtownMarker);
        
        // Draw a line between locations
        const path = new google.maps.Polyline({
            path: [downtownLocation, westsideLocation],
            geodesic: true,
            strokeColor: "#2C574B",
            strokeOpacity: 0.8,
            strokeWeight: 3
        });
        
        path.setMap(map);
        
        // Add hover functionality for store details
        const stores = document.querySelectorAll('.store');
        stores.forEach((store, index) => {
            store.addEventListener('mouseenter', () => {
                if (index === 0) {
                    westsideInfo.close();
                    downtownInfo.open(map, downtownMarker);
                } else if (index === 1) {
                    downtownInfo.close();
                    westsideInfo.open(map, westsideMarker);
                }
            });
        });
        
        // Add map animations
        animateMapElements();
        
        console.log('Google Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
        mapElement.innerHTML = '<div class="map-error">Error loading map. Please try again later.</div>';
    }
}

// Function to add animations to map elements
function animateMapElements() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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
    }
}