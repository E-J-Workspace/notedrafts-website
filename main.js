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
  if (!track) return; // Exit if no carousel track found
  
  const slides = Array.from(track.children);
  const slideWidth = slides[0].getBoundingClientRect().width + 30; // Including gap
  let currentIndex = 0;
  
  // Clone slides many times for truly infinite scrolling
  const totalClones = slides.length * 10;
  for (let i = 0; i < totalClones; i++) {
    const clone = slides[i % slides.length].cloneNode(true);
    track.appendChild(clone);
  }
  
  // Set initial position
  updatePosition(false);
  updateActiveSlide();
  
  function updateActiveSlide() {
    const allSlides = Array.from(track.children);
    allSlides.forEach(slide => slide.classList.remove('active'));
    
    // Activate all instances of the current slide
    const currentSlideIndex = currentIndex % slides.length;
    allSlides.forEach((slide, index) => {
      if (index % slides.length === currentSlideIndex) {
        slide.classList.add('active');
      }
    });
  }
  
  function updatePosition(animate = true) {
    const baseOffset = -(currentIndex * slideWidth);
    track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
    track.style.transform = `translateX(calc(50% + ${baseOffset}px))`;
  }
  
  // Auto advance carousel
  function autoAdvance() {
    currentIndex++;
    updatePosition();
    updateActiveSlide();
  }
  
  let interval = setInterval(autoAdvance, 4000);
  
  // Pause on hover
  track.addEventListener('mouseenter', () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  });
  
  track.addEventListener('mouseleave', () => {
    if (!interval) {
      interval = setInterval(autoAdvance, 4000);
    }
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