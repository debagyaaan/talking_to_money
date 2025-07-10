// Smooth scrolling function with cross-browser support
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    // Check if smooth scrolling is supported
    if ('scrollBehavior' in document.documentElement.style) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback for browsers that don't support smooth scrolling
      const targetPosition = section.offsetTop - 100; // Account for header height and padding
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// Enhanced smooth scrolling for all internal links
document.addEventListener('DOMContentLoaded', function() {
  // Get all internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
  
  // Add smooth scrolling to the demo button
  const demoButton = document.getElementById('see-demo');
  if (demoButton) {
    demoButton.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToSection('demo');
    });
  }
  
  // Initialize scroll animations
  handleScrollAnimations();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScrollAnimations);
  
  // Hamburger menu functionality
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-links');
  
  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinkElements = navLinks.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnHamburger = hamburgerMenu.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
});

// Optional: Add scroll offset for fixed headers
function scrollToSectionWithOffset(sectionId, offset = 80) {
  const section = document.getElementById(sectionId);
  if (section) {
    const targetPosition = section.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Scroll-triggered animations
function handleScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  
  animatedElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150; // Trigger when element is 150px from viewport
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate');
    }
  });
}

// Carousel logic for demo preview
(function() {
  const track = document.querySelector('.carousel-track');
  const images = Array.from(document.querySelectorAll('.carousel-img'));
  const total = images.length;
  let current = 0;

  // Get image width (responsive)
  function getImgWidth() {
    if (!images[0]) return 0;
    return images[0].getBoundingClientRect().width + 20; // margin
  }

  function updateCarousel() {
    // Move the track so the main image is centered
    const imgWidth = getImgWidth();
    const carousel = document.querySelector('.carousel');
    const carouselWidth = carousel ? carousel.offsetWidth : 0;
    const trackWidth = imgWidth * total;
    let offset = (current * imgWidth * -1) + ((carouselWidth - imgWidth) / 2);

    // Prevent empty space at the ends if total images < 3
    if (carouselWidth && trackWidth < carouselWidth) {
      offset = (carouselWidth - trackWidth) / 2;
    }

    track.style.transform = `translateX(${offset}px)`;

    images.forEach((img, i) => {
      img.classList.remove('carousel-img--main', 'carousel-img--side');
      img.style.zIndex = 1;
      img.style.opacity = 0.5;
      img.style.filter = 'blur(2px)';
      img.style.transform = 'scale(0.9)';
    });

    // Main image
    images[current].classList.add('carousel-img--main');
    images[current].style.zIndex = 3;
    images[current].style.opacity = 1;
    images[current].style.filter = 'none';
    images[current].style.transform = 'scale(1.05)';

    // Side images
    const prevSide = (current - 1 + total) % total;
    const nextSide = (current + 1) % total;
    images[prevSide].classList.add('carousel-img--side');
    images[nextSide].classList.add('carousel-img--side');
  }

  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  if (nextBtn && prevBtn && images.length > 0 && track) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % total;
      updateCarousel();
    });
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + total) % total;
      updateCarousel();
    });
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }
})();

// Demo video click-to-play/pause
(function() {
  const video = document.getElementById('demo-video');
  if (video) {
    video.addEventListener('click', function(e) {
      // Prevent default behavior and stop propagation
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle play/pause regardless of where the click occurs
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
})();


  