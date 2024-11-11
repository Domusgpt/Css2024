// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.classList.add('fade-out');
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 1000);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  hamburger.classList.toggle('toggle');
});

// Close navigation when clicking outside or on a link
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('nav-active');
    hamburger.classList.remove('toggle');
  }
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('nav-active');
      hamburger.classList.remove('toggle');
    }
  });
});

// Dropdown Toggle for Mobile
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // Prevent default link behavior
      const dropdown = toggle.nextElementSibling;
      dropdown.classList.toggle('dropdown-active');
      toggle.setAttribute('aria-expanded', dropdown.classList.contains('dropdown-active'));
    }
  });
});

// IntersectionObserver for Scroll Animations
const sections = document.querySelectorAll('section');
const options = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing once it's visible
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

// Element Reveal on Scroll
const revealElements = document.querySelectorAll('.service-item, .case-study-item, .faq-item');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// Testimonials Carousel Functionality
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
let carouselInterval;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}

function startCarousel() {
  carouselInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(currentIndex);
  }, 5000);
}

function stopCarousel() {
  clearInterval(carouselInterval);
}

document.addEventListener('DOMContentLoaded', () => {
  showTestimonial(currentIndex);
  startCarousel();
});

carouselPrev.addEventListener('click', () => {
  stopCarousel();
  currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
  showTestimonial(currentIndex);
  startCarousel();
});

carouselNext.addEventListener('click', () => {
  stopCarousel();
  currentIndex = (currentIndex + 1) % totalTestimonials;
  showTestimonial(currentIndex);
  startCarousel();
});

// Pause carousel on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseover', stopCarousel);
carousel.addEventListener('mouseout', startCarousel);

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const isActive = question.classList.contains('active');
    faqQuestions.forEach(q => {
      q.classList.remove('active');
      q.setAttribute('aria-expanded', 'false');
      q.nextElementSibling.style.maxHeight = 0;
    });
    if (!isActive) {
      question.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
      const answer = question.nextElementSibling;
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Contact Form Validation
const contactForm = document.querySelector('.contact form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.querySelector('input[name="name"]');
  const email = contactForm.querySelector('input[name="email"]');
  const message = contactForm.querySelector('textarea[name="message"]');

  if (name.value.trim() === '') {
    alert('Please enter your name.');
    name.focus();
    return;
  }

  if (email.value.trim() === '') {
    alert('Please enter your email.');
    email.focus();
    return;
  }

  if (!validateEmail(email.value.trim())) {
    alert('Please enter a valid email address.');
    email.focus();
    return;
  }

  if (message.value.trim() === '') {
    alert('Please enter your message.');
    message.focus();
    return;
  }

  // Simulate form submission
  alert('Thank you for your message!');
  contactForm.reset();
});

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Smooth Scrolling
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Search Functionality (Placeholder)
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    alert(`Search functionality is under development. You searched for: "${query}"`);
    // Implement search logic or redirect to a results page in the future
  } else {
    alert('Please enter a search term.');
  }
});

// Lazy Loading Images with Blur Effect
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.filter = 'blur(10px)';
        img.src = img.dataset.src;
        img.onload = () => {
          img.style.filter = 'blur(0)';
          img.removeAttribute('data-src');
        };
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
});

// Interactive Cursor (Optional)
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const interactiveElements = document.querySelectorAll('a, button, .service-item');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});