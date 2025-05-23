/**
 * Island Vibes Kitchen - Jamaican Restaurant Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // References to DOM elements
    const header = document.querySelector('header');
    const navMenu = document.querySelector('.nav-menu');
    const menuCategories = document.querySelectorAll('.menu-category');
    const fadeElements = document.querySelectorAll('.fade-in');
    const specialtyCards = document.querySelectorAll('.specialty-card');
    const faqItems = document.querySelectorAll('.faq-item');

    // Initialize the page
    initPage();

    /**
     * Initialize the page functionality
     */
    function initPage() {
        setupMobileMenu();
        setupMenuCategories();
        setupScrollEvents();
        checkElementsInView();
        setupSpecialtyHover();
        setupFaqAccordion();

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', checkElementsInView);
        window.addEventListener('resize', checkElementsInView);
    }

    /**
     * Handle scroll events
     */
    function handleScroll() {
        // Add shadow and reduce size to header when scrolled
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /**
     * Setup mobile menu functionality
     */
    function setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function() {
                mobileMenuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close mobile menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInsideMenu = navMenu.contains(event.target);
                const isClickOnToggle = mobileMenuToggle.contains(event.target);
                
                if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }

    /**
     * Setup menu categories functionality for the menu page
     */
    function setupMenuCategories() {
        if (menuCategories.length) {
            menuCategories.forEach(category => {
                category.addEventListener('click', function() {
                    // Remove active class from all categories
                    menuCategories.forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Add active class to clicked category
                    category.classList.add('active');
                    
                    // Hide all menu sections
                    const menuSections = document.querySelectorAll('.menu-category-section');
                    menuSections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Show selected menu section
                    const targetCategory = category.getAttribute('data-category');
                    const targetSection = document.getElementById(targetCategory);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        
                        // Trigger fade-in animations for newly visible content
                        const targetFadeElements = targetSection.querySelectorAll('.fade-in');
                        targetFadeElements.forEach(element => {
                            setTimeout(() => {
                                element.classList.add('visible');
                            }, 100);
                        });
                    }
                });
            });
        }
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    function setupScrollEvents() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        
                        const headerOffset = header.offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = targetPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    /**
     * Check if elements are in viewport to trigger fade-in animation
     */
    function checkElementsInView() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Adjust threshold to make elements appear earlier
            const threshold = window.innerHeight * 0.85;
            
            // Element is visible when top is in view or when bottom is in view
            const isVisible = (elementTop < threshold) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }

    /**
     * Setup specialty card hover effects
     */
    function setupSpecialtyHover() {
        if (specialtyCards.length) {
            specialtyCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.querySelector('.specialty-badge').style.transform = 'translateY(-5px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.querySelector('.specialty-badge').style.transform = 'translateY(0)';
                });
            });
        }
    }
    
    /**
     * Setup FAQ accordion functionality
     */
    function setupFaqAccordion() {
        if (faqItems.length) {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', function() {
                    // Toggle the active class on the clicked item
                    item.classList.toggle('active');
                    
                    // Update the toggle symbol
                    const toggle = question.querySelector('.faq-toggle');
                    if (toggle) {
                        toggle.textContent = item.classList.contains('active') ? '−' : '+';
                    }
                });
            });
        }
    }
});

/**
 * Initialize Testimonial Slider
 * This is a slider with 4 testimonials and dots navigation
 */
class TestimonialSlider {
    constructor(sliderSelector) {
        this.slider = document.querySelector(sliderSelector);
        if (!this.slider) return;
        
        this.track = this.slider.querySelector('.testimonials-track');
        if (!this.track) return;
        
        this.testimonials = this.track.querySelectorAll('.testimonial');
        if (this.testimonials.length <= 1) return;
        
        this.dots = this.slider.querySelectorAll('.testimonial-dot');
        this.currentIndex = 0;
        this.interval = null;
        this.animationDuration = 500; // ms
        this.slideDelay = 6000; // ms
        
        this.initSlider();
    }
    
    initSlider() {
        // Set initial position
        this.setPosition();
        
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.stopSlider();
                this.goToSlide(index);
                this.startSlider();
            });
        });
        
        // Start the slider
        this.startSlider();
        
        // Pause on hover
        this.slider.addEventListener('mouseenter', () => this.stopSlider());
        this.slider.addEventListener('mouseleave', () => this.startSlider());
    }
    
    setPosition() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        // Update active dot
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.track.style.transition = `transform ${this.animationDuration}ms ease-in-out`;
        this.setPosition();
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.track.style.transition = `transform ${this.animationDuration}ms ease-in-out`;
        this.setPosition();
    }
    
    startSlider() {
        this.stopSlider();
        this.interval = setInterval(() => this.nextSlide(), this.slideDelay);
    }
    
    stopSlider() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Initialize testimonial slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const testimonialSlider = new TestimonialSlider('.testimonials-slider');
});