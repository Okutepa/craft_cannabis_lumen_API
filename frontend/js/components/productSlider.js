// Create a new file: js/components/productSlider.js

/**
 * Product Slider Component
 * 
 * This module creates a touch-friendly slider for product cards on mobile devices.
 * It adds pagination indicators and navigation controls.
 */

export default function initProductSliders() {
    // Function to initialize a slider for a specific container
    function setupSlider(container) {
      if (!container) return;
      
      const sliderTrack = container.querySelector('.signature-cards, .growers-cards');
      const cards = sliderTrack.querySelectorAll('.card');
      const cardCount = cards.length;
      
      // Don't create slider if there are fewer than 2 cards
      if (cardCount < 2) return;
      
      // Create pagination container if it doesn't exist
      let paginationContainer = container.querySelector('.slider-pagination');
      if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.className = 'slider-pagination';
        container.appendChild(paginationContainer);
      }
      
      // Create pagination indicators
      for (let i = 0; i < cardCount; i++) {
        const indicator = document.createElement('span');
        indicator.className = 'pagination-dot';
        indicator.dataset.index = i;
        if (i === 0) indicator.classList.add('active');
        
        // Add click event to jump to specific slide
        indicator.addEventListener('click', () => {
          const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
          sliderTrack.scrollTo({
            left: i * cardWidth,
            behavior: 'smooth'
          });
          
          // Update active dot
          updateActiveDot(i);
        });
        
        paginationContainer.appendChild(indicator);
      }
      
      // Create next/prev buttons
      const prevButton = document.createElement('button');
      prevButton.className = 'slider-control prev';
      prevButton.innerHTML = '&#8592;'; // Left arrow
      prevButton.addEventListener('click', () => {
        scrollSlider('prev', sliderTrack, cards);
      });
      
      const nextButton = document.createElement('button');
      nextButton.className = 'slider-control next';
      nextButton.innerHTML = '&#8594;'; // Right arrow
      nextButton.addEventListener('click', () => {
        scrollSlider('next', sliderTrack, cards);
      });
      
      container.appendChild(prevButton);
      container.appendChild(nextButton);
      
      // Update the active dot based on scroll position
      function updateActiveDot(index) {
        const dots = paginationContainer.querySelectorAll('.pagination-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
      }
      
      // Add scroll event listener to update active dot
      sliderTrack.addEventListener('scroll', () => {
        const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
        const scrollPosition = sliderTrack.scrollLeft;
        const activeIndex = Math.round(scrollPosition / cardWidth);
        
        updateActiveDot(activeIndex);
        
        // Show/hide navigation buttons based on scroll position
        prevButton.style.opacity = scrollPosition <= 10 ? '0.5' : '1';
        nextButton.style.opacity = (scrollPosition >= sliderTrack.scrollWidth - sliderTrack.clientWidth - 10) ? '0.5' : '1';
      });
      
      // Initialize the next/prev buttons' visibility
      prevButton.style.opacity = '0.5'; // Start with prev button disabled
      nextButton.style.opacity = '1';
      
      // Create "All our selection" button if it doesn't exist
      let selectionButton = container.querySelector('.all-selection');
      if (!selectionButton) {
        selectionButton = document.createElement('a');
        selectionButton.className = 'all-selection';
        selectionButton.href = '#';
        selectionButton.textContent = 'All our selection';
        container.appendChild(selectionButton);
      }
    }
    
    // Function to scroll the slider
    function scrollSlider(direction, track, cards) {
      if (!track || !cards.length) return;
      
      const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
      const scrollPosition = track.scrollLeft;
      
      if (direction === 'next') {
        track.scrollTo({
          left: scrollPosition + cardWidth,
          behavior: 'smooth'
        });
      } else {
        track.scrollTo({
          left: scrollPosition - cardWidth,
          behavior: 'smooth'
        });
      }
    }
    
    // Initialize sliders
    const signatureContainer = document.querySelector('.signature-strains');
    const growersContainer = document.querySelector('.growers-selection');
    
    setupSlider(signatureContainer);
    setupSlider(growersContainer);
  }