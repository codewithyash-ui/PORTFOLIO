// ========================================
// MAIN SCRIPT - GENERAL FUNCTIONALITY
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // PRELOADER
    // ========================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('hide');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
    
    // ========================================
    // SCROLL PROGRESS BAR
    // ========================================
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // ========================================
    // NAVBAR ACTIVE LINK & SCROLL SPY
    // ========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // ========================================
    // MOBILE NAVIGATION TOGGLE (FIXED)
    // ========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Fix: Use span or innerHTML instead of i element
            const toggleSpan = navToggle.querySelector('span');
            if (toggleSpan) {
                if (navMenu.classList.contains('active')) {
                    toggleSpan.innerHTML = '✕';
                } else {
                    toggleSpan.innerHTML = '☰';
                }
            }
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const toggleSpan = navToggle.querySelector('span');
                if (toggleSpan) {
                    toggleSpan.innerHTML = '☰';
                }
            });
        });
    }
    
    // ========================================
    // THEME SWITCHER DROPDOWN
    // ========================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeMenu = document.getElementById('themeMenu');
    
    if (themeToggleBtn && themeMenu) {
        themeToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            themeMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (themeToggleBtn && themeMenu && !themeToggleBtn.contains(e.target) && !themeMenu.contains(e.target)) {
                themeMenu.classList.remove('active');
            }
        });
    }
    
    // ========================================
    // PROJECT FILTERING
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ========================================
    // CONTACT FORM VALIDATION
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const subject = document.getElementById('subject')?.value.trim() || '';
            const message = document.getElementById('message')?.value.trim() || '';
            
            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showFormStatus('✅ Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
            
            setTimeout(() => {
                if (formStatus) formStatus.style.display = 'none';
            }, 5000);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.style.color = type === 'error' ? '#e74c3c' : '#2ecc71';
            formStatus.style.display = 'block';
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
    
    // ========================================
    // BACK TO TOP BUTTON (FIXED)
    // ========================================
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        // Initially hide button
        backToTop.style.display = 'none';
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================
    // COMING SOON POPUP (FIXED)
    // ========================================
    const comingSoonPopup = document.getElementById('comingSoonPopup');
    const popupClose = document.querySelector('.popup-close');
    
    // Fix: Use class selectors instead of IDs that may not exist
    const linkedinPlaceholders = document.querySelectorAll('.linkedin-placeholder');
    const instagramPlaceholders = document.querySelectorAll('.instagram-placeholder');
    const downloadResumeBtn = document.getElementById('downloadResumeBtn');
    
    function showComingSoon() {
        if (comingSoonPopup) {
            comingSoonPopup.classList.add('active');
        }
    }
    
    function closePopup() {
        if (comingSoonPopup) {
            comingSoonPopup.classList.remove('active');
        }
    }
    
    if (popupClose) {
        popupClose.addEventListener('click', closePopup);
    }
    
    // Add click handlers for placeholders
    linkedinPlaceholders.forEach(el => {
        if (el) {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                showComingSoon();
            });
        }
    });
    
    instagramPlaceholders.forEach(el => {
        if (el) {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                showComingSoon();
            });
        }
    });
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showComingSoon();
        });
    }
    
    // Close popup when clicking outside
    if (comingSoonPopup) {
        comingSoonPopup.addEventListener('click', function(e) {
            if (e.target === comingSoonPopup) {
                closePopup();
            }
        });
    }
    
    // ========================================
    // SMOOTH SCROLLING FOR NAV LINKS (FIXED)
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Skip if href is just "#" or empty or invalid
            if (!href || href === '#' || href === '#0' || href === '#home') {
                // Check if it's a placeholder link
                if (this.classList.contains('linkedin-placeholder') || 
                    this.classList.contains('instagram-placeholder') ||
                    this.id === 'downloadResumeBtn') {
                    return;
                }
            }
            
            const targetId = href;
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========================================
    // SCROLL REVEAL INITIALIZATION
    // ========================================
    // This is handled in animations.js
    console.log('Portfolio website loaded successfully!');
});