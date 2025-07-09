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


  