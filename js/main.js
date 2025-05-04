/**
 * La Tavola Restaurant Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // References to DOM elements
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuCategories = document.querySelectorAll('.menu-category');
    const fadeElements = document.querySelectorAll('.fade-in');

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

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', checkElementsInView);
        window.addEventListener('resize', checkElementsInView);
    }

    /**
     * Handle scroll events
     */
    function handleScroll() {
        // Add shadow to header when scrolled
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
                    const menuSections = document.querySelectorAll('.menu-section');
                    menuSections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Show selected menu section
                    const targetCategory = category.getAttribute('data-category');
                    const targetSection = document.getElementById(targetCategory);
                    if (targetSection) {
                        targetSection.classList.add('active');
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
                        
                        window.scrollTo({
                            top: targetElement.offsetTop - header.offsetHeight,
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
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }
});
