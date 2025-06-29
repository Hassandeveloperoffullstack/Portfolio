$(document).ready(function() {
    // Initialize AOS with faster animation
    AOS.init({
        duration: 800,
        once: true,
        mirror: false
    });

    // Theme toggle functionality
    const themeToggleBtn = $('#theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme
    themeToggleBtn.click(function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update icons
        if (newTheme === 'dark') {
            $('.light-icon').show();
            $('.dark-icon').hide();
        } else {
            $('.light-icon').hide();
            $('.dark-icon').show();
        }
    });

    // Set initial icon state
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (currentTheme === 'dark') {
        $('.light-icon').show();
        $('.dark-icon').hide();
    } else {
        $('.light-icon').hide();
        $('.dark-icon').show();
    }

    // Listen for system theme changes
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update icons
            if (newTheme === 'dark') {
                $('.light-icon').show();
                $('.dark-icon').hide();
            } else {
                $('.light-icon').hide();
                $('.dark-icon').show();
            }
        }
    });

    // Typed.js initialization
    new Typed('.typed-text', {
        strings: ['M. Hassan Idrees', 'a Full Stack Laravel Developer', 'a Backend Developer', 'a Problem Solver'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });

    // Mobile Menu Toggle with improved handling
    $('.menu-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.nav-links').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.navbar').length && 
            !$(event.target).closest('.menu-btn').length) {
            $('.nav-links').removeClass('active');
            $('.menu-btn i').removeClass('fa-times').addClass('fa-bars');
        }
    });

    // Close mobile menu when clicking a nav link
    $('.nav-links a').on('click', function() {
        $('.nav-links').removeClass('active');
        $('.menu-btn i').removeClass('fa-times').addClass('fa-bars');
    });

    // Navigation link click handling
    $('.nav-links a').click(function(e) {
        e.preventDefault();
        var targetSection = $($(this).attr('href'));
        
        if (targetSection.length) {
            // Close mobile menu
            $('.nav-links').removeClass('active');
            $('.menu-btn i').removeClass('fa-times').addClass('fa-bars');
            
            // Scroll to section with fallback easing
            $('html, body').animate({
                scrollTop: targetSection.offset().top - 70
            }, {
                duration: 600,
                easing: $.easing.easeInOutQuad ? 'easeInOutQuad' : 'swing'
            });
            
            // Update active state
            $('.nav-links a').removeClass('active');
            $(this).addClass('active');
        }
    });

    // Improved navbar handling on scroll
    var lastScroll = 0;
    var scrollTimer;
    
    $(window).scroll(function() {
        var scrollPosition = $(window).scrollTop();
        var nav = $('.navbar');
        
        // Clear the previous timer
        clearTimeout(scrollTimer);
        
        // Add/remove background to navbar with scroll direction
        if (scrollPosition > 50) {
            nav.addClass('scrolled');
            if (scrollPosition > lastScroll) {
                nav.addClass('nav-up');
            } else {
                nav.removeClass('nav-up');
            }
        } else {
            nav.removeClass('scrolled nav-up');
        }
        lastScroll = scrollPosition;
        
        // Update active nav link with debounce
        scrollTimer = setTimeout(function() {
            $('section').each(function() {
                var section = $(this);
                var sectionTop = section.offset().top - 100;
                var sectionBottom = sectionTop + section.outerHeight();
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    var sectionId = section.attr('id');
                    $('.nav-links a').removeClass('active');
                    $('.nav-links a[href="#' + sectionId + '"]').addClass('active');
                }
            });
        }, 100);
    });

    // Trigger scroll event once to set initial active state
    $(window).trigger('scroll');

    // Skills progress bar animation
    function animateProgressBars() {
        $('.skill-item').each(function() {
            const $this = $(this);
            const skillName = $this.find('.skill-name').text();
            const $progress = $this.find('.progress');
            let percent;
            
            // Set different percentages based on skill
            switch(skillName) {
                // Frontend Skills
                case 'HTML':
                    percent = 95;
                    break;
                case 'CSS':
                    percent = 90;
                    break;
                case 'JavaScript':
                    percent = 85;
                    break;
                case 'jQuery & Ajax':
                    percent = 88;
                    break;
                case 'Bootstrap':
                    percent = 92;
                    break;
                case 'Tailwind CSS':
                    percent = 88;
                    break;
                
                // Backend Skills
                case 'PHP':
                    percent = 92;
                    break;
                case 'Laravel':
                    percent = 90;
                    break;
                case 'MySQL':
                    percent = 88;
                    break;
                case 'RESTful APIs':
                    percent = 85;
                    break;
                case 'Eloquent ORM':
                    percent = 90;
                    break;
                
                // Development Tools
                case 'Git & GitHub':
                    percent = 88;
                    break;
                case 'Postman':
                    percent = 85;
                    break;
                case 'WordPress':
                    percent = 80;
                    break;
                case 'cPanel':
                    percent = 85;
                    break;
                
                // Professional Skills
                case 'Problem Solving':
                    percent = 90;
                    break;
                case 'Team Collaboration':
                    percent = 92;
                    break;
                case 'Time Management':
                    percent = 88;
                    break;
                case 'Database Design':
                    percent = 85;
                    break;
                
                default:
                    percent = 85;
            }

            // Set the percentage text
            $progress.attr('data-percent', percent + '%');

            // Animate the progress bar
            function animateBar() {
                $progress.css({
                    width: '0%',
                    opacity: 1
                }).animate({
                    width: percent + '%'
                }, {
                    duration: 2000,
                    easing: 'easeInOutQuart',
                    complete: function() {
                        setTimeout(() => {
                            $progress.animate({ opacity: 0.5 }, 500, function() {
                                animateBar();
                            });
                        }, 1000);
                    }
                });
            }
            
            // Start animation
            animateBar();
        });
    }

    // Initialize animation when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    setTimeout(animateProgressBars, 200);
                }
            } else {
                entry.target.classList.remove('animated');
                $('.progress').stop(true, true).css({
                    width: '0%',
                    opacity: 1
                });
            }
        });
    }, { threshold: 0.2 });

    // Observe the skills section
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Form submission handling
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        
        // Basic form validation
        var name = $('input[name="name"]').val().trim();
        var email = $('input[name="email"]').val().trim();
        var subject = $('input[name="subject"]').val().trim();
        var message = $('textarea[name="message"]').val().trim();
        
        if (name && email && subject && message) {
            // Add your form submission logic here
            console.log('Form submitted:', { name, email, subject, message });
            
            // Reset form
            this.reset();
        }
    });

    // Service card hover effect with smooth transition
    $('.service-card').hover(
        function() {
            $(this).find('i').css({
                'transform': 'scale(1.2) rotate(5deg)',
                'color': '#00bcd4'
            });
        },
        function() {
            $(this).find('i').css({
                'transform': 'scale(1) rotate(0deg)',
                'color': '#007bff'
            });
        }
    );

    // Project card hover effect
    $('.project-card').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.05)');
            $(this).css('transform', 'translateY(-10px)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Social links hover effect
    $('.social-links a').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-5px)',
                'opacity': '0.8'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0)',
                'opacity': '1'
            });
        }
    );

    // Footer navigation handling
    $('.footer-section a[href^="#"]').click(function(e) {
        e.preventDefault();
        var targetSection = $($(this).attr('href'));
        
        if (targetSection.length) {
            $('html, body').animate({
                scrollTop: targetSection.offset().top - 70
            }, {
                duration: 600,
                easing: $.easing.easeInOutQuad ? 'easeInOutQuad' : 'swing'
            });
        }
    });

    // Testimonials Slider
    let currentTestimonial = 0;
    const testimonials = $('.testimonial-card');
    const totalTestimonials = testimonials.length;

    // Create dots
    for (let i = 0; i < totalTestimonials; i++) {
        $('.testimonial-dots').append(`<div class="dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>`);
    }

    // Show initial testimonial
    $(testimonials[currentTestimonial]).addClass('active');

    // Next testimonial
    function nextTestimonial() {
        $(testimonials[currentTestimonial]).removeClass('active');
        $('.dot').removeClass('active');
        
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        
        $(testimonials[currentTestimonial]).addClass('active');
        $(`.dot[data-index="${currentTestimonial}"]`).addClass('active');
    }

    // Previous testimonial
    function prevTestimonial() {
        $(testimonials[currentTestimonial]).removeClass('active');
        $('.dot').removeClass('active');
        
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        
        $(testimonials[currentTestimonial]).addClass('active');
        $(`.dot[data-index="${currentTestimonial}"]`).addClass('active');
    }

    // Click handlers
    $('.next-testimonial').click(nextTestimonial);
    $('.prev-testimonial').click(prevTestimonial);

    // Dot click handler
    $('.testimonial-dots').on('click', '.dot', function() {
        const index = $(this).data('index');
        if (index !== currentTestimonial) {
            $(testimonials[currentTestimonial]).removeClass('active');
            $('.dot').removeClass('active');
            
            currentTestimonial = index;
            
            $(testimonials[currentTestimonial]).addClass('active');
            $(this).addClass('active');
        }
    });

    // Auto-advance testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);

    // Pause auto-advance on hover
    $('.testimonials-wrapper').hover(
        function() {
            clearInterval(testimonialInterval);
        },
        function() {
            testimonialInterval = setInterval(nextTestimonial, 5000);
        }
    );

    // Initialize Swiper
    const testimonialSwiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'slide',
        grabCursor: true,
        spaceBetween: 30,
        touchRatio: 0.7,
        resistance: true,
        resistanceRatio: 0.8,
        longSwipes: false,
        followFinger: true,
        threshold: 10
    });

    // Custom Cursor Animation
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update dot position immediately
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth animation for the outline
    function animateOutline() {
        // Calculate the distance between current outline position and mouse position
        let dx = mouseX - outlineX;
        let dy = mouseY - outlineY;
        
        // Add easing to the movement
        outlineX += dx * 0.2;
        outlineY += dy * 0.2;
        
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        
        requestAnimationFrame(animateOutline);
    }

    animateOutline();

    // Hide cursors when mouse leaves the window
    document.addEventListener('mouseout', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    document.addEventListener('mouseover', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Add magnetic effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Move cursor to center of element
            mouseX = centerX;
            mouseY = centerY;
        });
    });

    // Sprinkle Effect
    const colors = ['pink', 'blue', 'yellow', 'green', 'purple', 'orange', 'red'];

    function createSprinkle(e) {
        // Disabled sprinkle effect
        return;
    }

    // Throttle function to limit sprinkle creation
    function throttle(func, limit) {
        return function(e) {
            // Disabled throttle
            return;
        }
    }

    // Add throttled mousemove event listener
    document.addEventListener('mousemove', throttle(createSprinkle, 40));

    // Add touch support
    document.addEventListener('touchmove', (e) => {
        // Disabled touch sprinkle effect
        return;
    });

    // Glitter effect for contact form
    const contactForm = document.querySelector('.contact-form');
    let isMouseInForm = false;
    let glitterInterval;
    // Disabled glitter effect
}); 