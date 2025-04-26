document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navlists = document.querySelector('.navlists');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navlists.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navlists a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navlists.classList.contains('active')) {
                navlists.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Form submission handling
    const form = document.querySelector('.c-two form');
    const thankYouMessage = document.getElementById('thankyou-message');
    const sendAnotherBtn = document.getElementById('send-another');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            
            // Validate form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            const formData = new FormData(form);
            const formAction = form.getAttribute('action');
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            const originalButtonText = btnText.textContent;
            btnText.textContent = 'Sending...';
            submitButton.disabled = true;
            
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Hide the form with animation
                    form.style.opacity = '0';
                    setTimeout(() => {
                        form.style.display = 'none';
                        
                        // Show the thank you message with animation
                        thankYouMessage.style.display = 'block';
                        setTimeout(() => {
                            thankYouMessage.style.opacity = '1';
                        }, 10);
                        
                        // Scroll to the thank you message
                        thankYouMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                    
                    // Reset the form (in case we show it again later)
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem submitting your form. Please try again.');
                
                // Reset button state
                btnText.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
    
    // Send another message button
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', function() {
            // Hide thank you message with animation
            thankYouMessage.style.opacity = '0';
            setTimeout(() => {
                thankYouMessage.style.display = 'none';
                
                // Show the form again with animation
                form.style.display = 'block';
                setTimeout(() => {
                    form.style.opacity = '1';
                }, 10);
            }, 300);
        });
    }
    
    // Handle window resize for responsive design
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state when resizing to desktop
            if (navlists && navlists.classList.contains('active')) {
                navlists.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});