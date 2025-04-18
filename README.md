# Craft Cannabis Website

## Project Overview

A modern e-commerce website showcasing artisanal cannabis products through an elegant, responsive interface. The site features GSAP-powered scroll animations, interactive product cards with horizontal scrolling, and a custom-styled Google Maps integration for store locations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Integration](#api-integration)
- [Responsive Design](#responsive-design)

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

## Responsive Design

The website uses a custom grid system and responsive design principles:

- **Mobile-first** approach with progressive enhancement
- **Breakpoints**:
  - Small: Default (mobile)
  - Medium: 768px and above
  - Large: 1024px and above
- **Responsive Components**: All components adapt to different screen sizes
- **Flexible Sliders**: Product cards horizontally scroll on mobile, grid on desktop


## Credits

- Design & Development: [Napas Polchai / Wisdom Okutepa]
