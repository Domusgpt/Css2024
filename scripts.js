// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
});

// IntersectionObserver for Scroll Animations (if needed)
const sections = document.querySelectorAll('section');
const options = { threshold: 0.1 };

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, options);

sections.forEach(section => observer.observe(section));

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

faqQuestions.forEach(question => {
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

  // Perform validation checks
  const name = contactForm.querySelector('input[name="name"]');
  const email = contactForm.querySelector('input[name="email"]');
  const message = contactForm.querySelector('textarea[name="message"]');

  if (name.value === '' || email.value === '' || message.value === '') {
    alert('Please fill in all fields.');
  } else {
    // Simulate form submission
    alert('Thank you for your message!');
    contactForm.reset();
  }
});

// Smooth Scrolling
const scrollLinks = document.querySelectorAll('.nav-links a[href^="#"]');

scrollLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));

    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Search Functionality (Basic Implementation)
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  alert('Search functionality is under development.');
  // Implement search logic or redirect to a search results page
});