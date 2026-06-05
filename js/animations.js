// ========================================
// ANIMATIONS - TYPING, COUNTERS, SCROLL REVEAL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // TYPING ANIMATION
    // ========================================
    const typingTextElement = document.querySelector('.typing-text');
    
    if (typingTextElement) {
        const words = [
            'Full Stack Developer',
            'AI Enthusiast',
            'BCA Student',
            'Web Developer'
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                currentText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typingTextElement.textContent = currentText;
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 500);
                return;
            }
            
            const speed = isDeleting ? 100 : 150;
            setTimeout(typeEffect, speed);
        }
        
        typeEffect();
    }
    
    // ========================================
    // COUNTER ANIMATION
    // ========================================
    const counters = document.querySelectorAll('.counter-number');
    let animated = false;
    
    function animateCounters() {
        if (animated) return;
        
        const triggerPoint = window.innerHeight * 0.8;
        const countersSection = document.querySelector('.counters');
        
        if (countersSection) {
            const sectionTop = countersSection.getBoundingClientRect().top;
            
            if (sectionTop < triggerPoint) {
                animated = true;
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 50;
                    const duration = 2000;
                    const stepTime = duration / 50;
                    
                    const updateCounter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(updateCounter);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, stepTime);
                });
            }
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters();
    
    // ========================================
    // SKILL PROGRESS BAR ANIMATION
    // ========================================
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        const triggerPoint = window.innerHeight * 0.8;
        const skillsSection = document.querySelector('#skills');
        
        if (skillsSection) {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            
            if (sectionTop < triggerPoint) {
                skillsAnimated = true;
                
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
            }
        }
    }
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();
    
    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    const revealElements = document.querySelectorAll('.skill-item, .project-card, .ai-card, .counter-card, .contact-card, .timeline-item');
    
    function checkReveal() {
        const triggerPoint = window.innerHeight * 0.85;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
    
    // ========================================
    // SECTION FADE IN ON SCROLL
    // ========================================
    const sectionsForFade = document.querySelectorAll('section');
    
    function checkSectionFade() {
        const triggerPoint = window.innerHeight * 0.8;
        
        sectionsForFade.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerPoint) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    sectionsForFade.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
    });
    
    window.addEventListener('scroll', checkSectionFade);
    checkSectionFade();
    
    // ========================================
    // HOVER ANIMATIONS FOR CARDS
    // ========================================
    const cards = document.querySelectorAll('.project-card, .ai-card, .counter-card, .skills-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});