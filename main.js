// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');
  const body = document.body;

  // Toggle menu
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    body.classList.toggle('menu-open');
  });

  // Close menu when clicking a link
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('open')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
});

// Reviews Carousel
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  
  const slides = Array.from(track.children);
  let currentIndex = 0;
  
  // Clone slides for infinite scroll
  slides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
  });
  slides.reverse().forEach(slide => {
    track.prepend(slide.cloneNode(true));
  });

  function getSlideWidth() {
    // Use different widths for mobile and desktop
    if (window.innerWidth <= 768) {
      return window.innerWidth * 0.85 + 20; // 85vw + gap
    } else if (window.innerWidth <= 480) {
      return window.innerWidth * 0.9 + 20; // 90vw + gap
    }
    return slides[0].getBoundingClientRect().width + 30; // desktop width + gap
  }

  // Initialize position
  updatePosition();
  
  function updatePosition() {
    const allSlides = Array.from(track.children);
    const middleIndex = Math.floor(allSlides.length / 2);
    const slideWidth = getSlideWidth();
    track.style.transition = 'transform 0.5s ease-in-out';
    
    // Center the current slide
    const offset = window.innerWidth <= 768 ? 
      (window.innerWidth - slideWidth + 20) / 2 : // Mobile centering
      (window.innerWidth - slideWidth) / 2; // Desktop centering
    
    track.style.transform = `translateX(${-middleIndex * slideWidth + offset}px)`;
  }

  // Auto advance carousel
  function moveCarousel() {
    currentIndex++;
    const slideWidth = getSlideWidth();
    
    // Center the current slide
    const offset = window.innerWidth <= 768 ? 
      (window.innerWidth - slideWidth + 20) / 2 : // Mobile centering
      (window.innerWidth - slideWidth) / 2; // Desktop centering
    
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(${-currentIndex * slideWidth + offset}px)`;

    // Reset position when reaching the end
    if (currentIndex >= slides.length) {
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = 0;
        track.style.transform = `translateX(${offset}px)`;
      }, 500);
    }
  }

  // Start automatic movement
  let interval = setInterval(moveCarousel, 3000);

  // Pause on hover
  track.addEventListener('mouseenter', () => {
    clearInterval(interval);
  });

  track.addEventListener('mouseleave', () => {
    interval = setInterval(moveCarousel, 3000);
  });

  // Update position on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updatePosition, 100);
  });
});

// Image Loading
document.querySelectorAll('img').forEach(img => {
  img.onload = function() {
    this.classList.add('loaded');
  }
  
  // If image is already loaded
  if (img.complete) {
    img.classList.add('loaded');
  }
});

// Lazy load images that are off screen
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  // Counter Animation Setup
  const counterElement = document.querySelector('.counter-value');
  let hasAnimated = false;

  function animateCounter() {
    if (hasAnimated) return;
    
    const target = parseInt(counterElement.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds
    const step = target / (duration / 16); // Update every 16ms (60fps)
    let current = 0;
    
    function updateCounter() {
      current += step;
      if (current >= target) {
        current = target;
        counterElement.textContent = target.toLocaleString();
        hasAnimated = true;
        return;
      }
      counterElement.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(updateCounter);
    }
    
    updateCounter();
  }

  // Intersection Observer for counter animation
  if (counterElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounter();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counterElement);
  }
  
  if ('loading' in HTMLImageElement.prototype) {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => lazyImageObserver.observe(img));
  }
});

// Scroll reveal animation for features
function revealOnScroll() {
  const features = document.querySelectorAll('.feature');
  
  features.forEach(feature => {
    const featureTop = feature.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (featureTop < windowHeight * 0.85) { // Reveal when 85% of the feature is visible
      feature.classList.add('reveal');
    }
  });
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Check on scroll
window.addEventListener('scroll', () => {
  requestAnimationFrame(revealOnScroll);
});

// Scroll effect for header
const header = document.querySelector('header');
const scrollThreshold = 50; // Pixels to scroll before changing header style

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}); 