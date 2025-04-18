# Craft Cannabis Website

## Project Overview

A modern e-commerce website showcasing artisanal cannabis products through an elegant, responsive interface. The site features GSAP-powered scroll animations, interactive product cards with horizontal scrolling, and a custom-styled Google Maps integration for store locations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Integration](#api-integration)
- [Animation System](#animation-system)
- [Google Maps Integration](#google-maps-integration)
- [Responsive Design](#responsive-design)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

## Features

- **Signature & Growers Collections**: Curated product displays with custom card layouts
- **Interactive Product Cards**: Horizontal scrolling cards with THC percentage and weight indicators
- **Aesthetic Product Details**: Glass-morphism styled cards with gradient backgrounds
- **Store Locator**: Dark-themed custom Google Maps with store markers and location details
- **Newsletter Integration**: Email subscription system with animated success feedback
- **Premium Animations**: GSAP ScrollTrigger animations for section reveals
- **Responsive Design**: Mobile-first approach with custom breakpoint handling

## Tech Stack

- **Frontend Framework**: Vue.js 2 with HTML5 and SCSS
- **Styling**: Custom SCSS architecture with modular components
- **Animation**: GSAP 3.11.4 with ScrollTrigger plugin
- **HTTP Client**: Axios for API integration
- **Maps**: Google Maps API with custom styling
- **Backend**: Lumen PHP Framework for RESTful API
- **Development**: MAMP local server environment
- **Grid System**: Custom responsive 12-column grid

## Project Structure

```
craft-cannabis/
├── api/                 # Lumen API backend
│   ├── app/             # API application files
│   ├── bootstrap/       # API bootstrap files
│   ├── database/        # Database migrations and seeds
│   ├── public/          # API public directory
│   └── routes/          # API route definitions
├── css/                 # Compiled CSS files
│   ├── grid.css         # Grid system
│   ├── main.css         # Main stylesheet
│   └── animations.css   # Animation system styles
├── images/              # Image assets
├── js/                  # JavaScript files
│   └── main.js          # Main Vue application
├── sass/                # SCSS source files
│   ├── abstracts/       # Variables, mixins, functions
│   ├── base/            # Base styles, typography
│   ├── components/      # Component styles
│   │   ├── _cards.scss  # Product card styles
│   │   ├── _modal.scss  # Modal styles
│   │   └── ...
│   └── sections/        # Section-specific styles
├── index.html           # Main HTML file
└── README.md            # Project documentation
```

## Installation

### Prerequisites

- Node.js (v12+)
- MAMP, XAMPP, or similar local server
- PHP 7.4+
- Composer

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd craft-cannabis
   ```

2. **Set up the backend API**:
   ```bash
   cd api
   composer install
   cp .env.example .env
   # Edit .env file with your database credentials
   php artisan migrate
   php artisan db:seed
   ```

3. **Set up the frontend**:
   ```bash
   # Return to project root
   cd ..
   # If using npm for SASS compilation
   npm install
   npm run build-css
   ```

4. **Configure your local server**:
   - Point your local server (MAMP/XAMPP) to the project directory
   - Ensure the API is accessible at `http://localhost:8888/craft-cannabis/api/public`

5. **Open the website**:
   - Navigate to the project URL in your browser (e.g., `http://localhost:8888/craft-cannabis`)

## Configuration

### API Endpoint Configuration

The API endpoint is configured in the main.js file:

```javascript
apiUrl: 'http://localhost:8888/craft-cannabis/api/public'
```

Update this URL if your local server uses a different port or path.

### Google Maps API

The Google Maps integration requires an API key, which is included in the index.html file:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=marker"></script>
```

Replace `YOUR_API_KEY` with a valid Google Maps API key.

## API Integration

The website connects to a Lumen-based API for the following functionality:

### Products Endpoint

- **GET** `/products` - Returns all available products
- Response includes: id, name, description, type, price, weight, thc_percentage, and media

### Newsletter Subscription

- **POST** `/subscribers` - Registers a new email subscriber
- Request payload: `{ "email": "user@example.com" }`
- Handles validation for existing emails

## Animation System

The website uses GSAP and ScrollTrigger for advanced animations:

### Core Animation Features

- **Scroll-triggered Animations**: Elements animate in when scrolled into view
- **Reversible Animations**: Elements animate out when scrolled back out of view
- **Staggered Animations**: Sequential reveals for related elements
- **Parallax Effects**: Subtle movement effects while scrolling
- **Interactive Elements**: Magnetic hover effects on buttons

### CSS Animation Classes

The following CSS classes can be added to elements for animations:

- `.fade-up`: Element fades in while moving upward
- `.fade-in`: Simple opacity animation
- `.slide-in-left`: Element slides in from the left
- `.slide-in-right`: Element slides in from the right
- `.scale-in`: Element scales up from smaller size
- `.clip-reveal`: Text reveals with a clipping animation
- `.mask-reveal`: Element reveals with a mask effect
- `.stagger-children`: Parent for elements that should animate in sequence

Example:
```html
<div class="signature-main fade-up">
  <h2 class="clip-reveal">Signature Strains</h2>
</div>
```

## Google Maps Integration

The website integrates Google Maps to display store locations:

- Custom styled map matching the website design theme
- Custom markers for store locations
- Hover interaction between location list and map markers
- Polyline connecting multiple locations
- Information windows showing location details

## Responsive Design

The website uses a custom grid system and responsive design principles:

- **Mobile-first** approach with progressive enhancement
- **Breakpoints**:
  - Small: Default (mobile)
  - Medium: 768px and above
  - Large: 1024px and above
- **Responsive Components**: All components adapt to different screen sizes
- **Flexible Sliders**: Product cards horizontally scroll on mobile, grid on desktop

## Troubleshooting

### Common Issues

#### API Connection Problems

If the products don't load:
1. Verify the API URL in `main.js`
2. Check that your local server is running
3. Inspect browser console for CORS or other errors

#### Animation Issues

If animations aren't working properly:
1. Check browser console for GSAP-related errors
2. Verify that ScrollTrigger is properly registered
3. Inspect DOM to ensure elements have correct classes

#### Modal Flash on Page Load

If you notice the product modal briefly appearing when the page loads:
1. Add the `v-cloak` directive to the app element
2. Add `[v-cloak] { display: none !important; }` to your CSS
3. Ensure `selectedProduct` is properly initialized as `null`

#### Map Loading Errors

If the Google Maps doesn't load:
1. Verify your API key is valid and has the correct permissions
2. Check browser console for map-related errors
3. Ensure the map container has a defined height

## Future Enhancements

- **Shopping Cart**: Implementation of cart functionality
- **User Authentication**: Account creation and login
- **Reviews System**: Allow customers to leave product reviews
- **Product Filtering**: Filter products by type, THC content, etc.
- **Related Products**: Show related products in product modal
- **Dark/Light Mode Toggle**: Theme switching capability
- **Performance Optimization**: Image lazy loading and code splitting


## Credits

- Design & Development: [Napas Polchai / Wisdom Okutepa]
