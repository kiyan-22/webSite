document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    const backToTop = document.querySelector('.back-to-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section');
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Back to Top Button
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Update active nav link on scroll
        updateActiveNavOnScroll();
    });
    
    // Mobile Menu Toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close Mobile Menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth Scrolling for Navigation Links
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Remove active class from all links
                navLinksItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Contact Form Validation and Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Prepare template parameters
            const templateParams = {
                to_email: 'princekiandumlao22@gmail.com',
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };

            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    // Show success message
                    showNotification('Message sent successfully!', 'success');
                    
                    // Reset form
                    contactForm.reset();
                })
                .catch(function(error) {
                    // Show error message
                    showNotification('Failed to send message. Please try again.', 'error');
                    console.error('EmailJS error:', error);
                })
                .finally(function() {
                    // Reset button state
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }
    
    // Helper Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `form-alert ${type}`;
        alertDiv.textContent = message;
        
        // Check if there's already an alert and remove it
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Insert the alert before the form
        contactForm.parentNode.insertBefore(alertDiv, contactForm);
        
        // Remove the alert after 3 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
    
    // Function to update active nav link on scroll
    function updateActiveNavOnScroll() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Update active class on nav links
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Animation on Scroll (Simple Implementation)
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animate-on-scroll class to elements that should be animated
    document.querySelectorAll('.section-header, .skill-item, .project-item, .timeline-item').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Initial call to animate elements that are already in view
    animateOnScroll();
    
    // Call animateOnScroll function on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS for animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Typing effect for hero section
    const typingElement = document.querySelector('.hero-content h1');
    if (typingElement) {
        // The text you want to type, with a placeholder for the highlighted name
        const before = "Hi, I'm ";
        const name = "Prince Kian Dumlao";
        const after = "";
        const highlightStart = '<span class="highlight">';
        const highlightEnd = '</span>';

        typingElement.innerHTML = '';
        let i = 0;

        function typeWriter() {
            if (i < before.length) {
                typingElement.innerHTML += before.charAt(i);
            } else if (i < before.length + name.length) {
                if (i === before.length) typingElement.innerHTML += highlightStart;
                typingElement.innerHTML += name.charAt(i - before.length);
                if (i === before.length + name.length - 1) typingElement.innerHTML += highlightEnd;
            } else if (i < before.length + name.length + after.length) {
                typingElement.innerHTML += after.charAt(i - before.length - name.length);
            } else {
                return;
            }
            i++;
            setTimeout(typeWriter, 50);
        }

        setTimeout(typeWriter, 500);
    }

    // Internship Carousel
    (function() {
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        if (prevBtn && nextBtn && slides.length > 0) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
            showSlide(currentSlide);
        }
    })();

    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key

    // Function to show notification
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add notification to the page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Add CSS for notifications
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            background: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(120%);
            transition: transform 0.3s ease-in-out;
            z-index: 1000;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification.success {
            border-left: 4px solid #4CAF50;
        }

        .notification.error {
            border-left: 4px solid #f44336;
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .notification i {
            font-size: 20px;
        }

        .notification.success i {
            color: #4CAF50;
        }

        .notification.error i {
            color: #f44336;
        }
    `;
    document.head.appendChild(notificationStyle);

    // Add CSS for navbar
    const navbarStyle = document.createElement('style');
    navbarStyle.textContent = `
        header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background: transparent;
            transition: all 0.3s ease;
        }
        
        header.sticky {
            background: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links a {
            position: relative;
            transition: color 0.3s ease;
        }
        
        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: #4a6cf7;
            transition: width 0.3s ease;
        }
        
        .nav-links a:hover::after,
        .nav-links a.active::after {
            width: 100%;
        }
        
        .nav-links a.active {
            color: #4a6cf7;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: white;
                flex-direction: column;
                align-items: center;
                padding: 2rem 0;
                transition: left 0.3s ease;
            }
            
            .nav-links.active {
                left: 0;
            }
            
            .nav-links li {
                margin: 1rem 0;
            }
            
            .hamburger {
                display: block;
            }
        }
    `;
    document.head.appendChild(navbarStyle);
});