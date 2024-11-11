// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
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

// Testimonials Carousel Functionality
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  showTestimonial(currentIndex);

  // Auto-rotate testimonials every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(currentIndex);
  }, 5000);
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    question.classList.toggle('active');
    const answer = question.nextElementSibling;

    if (question.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = 0;
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

  if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
    alert('Please fill in all fields.');
  } else {
    // Simulate form submission
    alert('Thank you for your message!');
    contactForm.reset();
  }
});

// Smooth Scrolling
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));

    if (target) {
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
