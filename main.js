// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  // Toggle menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open');
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
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const slideWidth = slides[0].getBoundingClientRect().width;

// Clone slides for infinite effect
slides.forEach(slide => {
  const clone = slide.cloneNode(true);
  track.appendChild(clone);
});

let position = 0;
const totalSlides = track.children.length;

function moveCarousel() {
  position++;
  if (position >= totalSlides) {
    track.style.transition = 'none';
    position = 0;
    track.style.transform = `translateX(0px)`;
    // Force reflow to reset transition
    track.offsetHeight; 
    track.style.transition = 'transform 0.5s ease-in-out';
    position++;
  }
  track.style.transform = `translateX(-${position * slideWidth}px)`;
}

setInterval(moveCarousel, 3000);

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