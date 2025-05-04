/**
 * Island Vibes Kitchen - Jamaican Restaurant Website
 * Form Validation JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Reference to the contact form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
        
        // Add input event listeners for real-time validation
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                // If field was previously marked as invalid, check it again
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }

    /**
     * Validate the form before submission
     * @param {Event} event - The form submission event
     */
    function validateForm(event) {
        event.preventDefault();
        
        // Reset form status
        resetFormErrors();
        
        let isValid = true;
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Validate name field
        if (!name.value.trim()) {
            showError(name, 'name-error', 'Please enter your name');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, 'name-error', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email field
        if (!email.value.trim()) {
            showError(email, 'email-error', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone field (optional)
        if (phone.value.trim() && !isValidPhone(phone.value)) {
            showError(phone, 'phone-error', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate subject field
        if (!subject.value) {
            showError(subject, 'subject-error', 'Please select a subject');
            isValid = false;
        }
        
        // Validate message field
        if (!message.value.trim()) {
            showError(message, 'message-error', 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'message-error', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If the form is valid, simulate submission
        if (isValid) {
            simulateFormSubmission();
        }
    }

    /**
     * Validate a single form field
     * @param {HTMLElement} field - The field to validate
     */
    function validateField(field) {
        let isValid = true;
        const fieldId = field.id;
        const errorId = `${fieldId}-error`;
        
        // Reset field error
        field.classList.remove('is-invalid');
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        
        // Validate based on field type
        switch (fieldId) {
            case 'name':
                if (!field.value.trim()) {
                    showError(field, errorId, 'Please enter your name');
                    isValid = false;
                } else if (field.value.trim().length < 2) {
                    showError(field, errorId, 'Name must be at least 2 characters');
                    isValid = false;
                }
                break;
                
            case 'email':
                if (!field.value.trim()) {
                    showError(field, errorId, 'Please enter your email');
                    isValid = false;
                } else if (!isValidEmail(field.value)) {
                    showError(field, errorId, 'Please enter a valid email address');
                    isValid = false;
                }
                break;
                
            case 'phone':
                if (field.value.trim() && !isValidPhone(field.value)) {
                    showError(field, errorId, 'Please enter a valid phone number');
                    isValid = false;
                }
                break;
                
            case 'subject':
                if (!field.value) {
                    showError(field, errorId, 'Please select a subject');
                    isValid = false;
                }
                break;
                
            case 'message':
                if (!field.value.trim()) {
                    showError(field, errorId, 'Please enter your message');
                    isValid = false;
                } else if (field.value.trim().length < 10) {
                    showError(field, errorId, 'Message must be at least 10 characters');
                    isValid = false;
                }
                break;
        }
        
        return isValid;
    }

    /**
     * Display an error message for a form field
     * @param {HTMLElement} field - The form field with an error
     * @param {string} errorId - The ID of the error message element
     * @param {string} message - The error message to display
     */
    function showError(field, errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            field.classList.add('is-invalid');
            field.setAttribute('aria-invalid', 'true');
            
            // Shake animation for error feedback
            field.classList.add('shake');
            setTimeout(() => {
                field.classList.remove('shake');
            }, 500);
        }
    }

    /**
     * Reset all form error messages
     */
    function resetFormErrors() {
        // Hide all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => {
            message.textContent = '';
            message.style.display = 'none';
        });
        
        // Remove error classes from fields
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.classList.remove('is-invalid');
            field.setAttribute('aria-invalid', 'false');
        });
        
        // Reset form status
        const formStatus = document.getElementById('form-status');
        if (formStatus) {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
        }
    }

    /**
     * Validate email format using regex
     * @param {string} email - The email to validate
     * @returns {boolean} - Whether the email is valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone number format using regex
     * @param {string} phone - The phone number to validate
     * @returns {boolean} - Whether the phone number is valid
     */
    function isValidPhone(phone) {
        // Accept various formats: (123) 456-7890, 123-456-7890, 123.456.7890, etc.
        const phoneRegex = /^[\d\s()+-.]{7,20}$/;
        return phoneRegex.test(phone);
    }

    /**
     * Simulate form submission (for demonstration purposes)
     */
    function simulateFormSubmission() {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Add loading class for spinner animation
        submitButton.classList.add('loading');
        
        // Simulate network delay
        setTimeout(() => {
            // Show success message
            const formStatus = document.getElementById('form-status');
            formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
            
            // Reset form fields
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            
            // Scroll to form status message
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide success message after a delay
            setTimeout(() => {
                formStatus.style.opacity = '0';
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.style.opacity = '1';
                }, 500);
            }, 5000);
        }, 1500);
    }
    
    // Add keypress event listener to allow form submission with Enter key
    contactForm.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
            event.preventDefault();
            validateForm(event);
        }
    });
});