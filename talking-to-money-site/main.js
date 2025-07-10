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
  let autoSlideInterval = null;
  let isPaused = false;

  function updateCarousel() {
    images.forEach((img, i) => {
      img.classList.remove('carousel-img--main', 'carousel-img--prev', 'carousel-img--next');
      img.style.display = 'none';
      img.style.position = '';
    });
    // Main image
    images[current].classList.add('carousel-img--main');
    images[current].style.display = 'block';
    images[current].style.position = 'relative';
    // Previous image (left, blurred)
    const prev = (current - 1 + total) % total;
    images[prev].classList.add('carousel-img--prev');
    images[prev].style.display = 'block';
    // Next image (right, blurred)
    const next = (current + 1) % total;
    images[next].classList.add('carousel-img--next');
    images[next].style.display = 'block';
  }

  function nextSlide() {
    current = (current + 1) % total;
    updateCarousel();
  }
  function prevSlide() {
    current = (current - 1 + total) % total;
    updateCarousel();
  }

  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      if (!isPaused) nextSlide();
    }, 3000);
  }
  function pauseAutoSlide() {
    isPaused = true;
  }
  function resumeAutoSlide() {
    isPaused = false;
  }

  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  if (nextBtn && prevBtn && images.length > 0) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoSlide();
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoSlide();
    });
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
    startAutoSlide();
  }

  // Pause on hover (desktop)
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', pauseAutoSlide);
    carousel.addEventListener('mouseleave', resumeAutoSlide);
    // Pause on touch (mobile)
    carousel.addEventListener('touchstart', pauseAutoSlide);
    carousel.addEventListener('touchend', resumeAutoSlide);
  }

  // Pause auto-sliding when demo video is visible
  const demoVideo = document.getElementById('demo-video');
  if (demoVideo) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pauseAutoSlide();
        } else {
          resumeAutoSlide();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(demoVideo);
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


  