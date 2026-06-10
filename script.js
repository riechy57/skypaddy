document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('#nav ul li a');

    // --- Email Obfuscation (Security) ---
    // Email: monaco@m4.dion.ne.jp
    const u = 'monaco';
    const d = 'm4.dion.ne.jp';
    const fullEmail = u + '@' + d;
    
    // Display the email normally on the screen
    const emailPlaceholder = document.getElementById('email-placeholder');
    if (emailPlaceholder) {
        // Just show the plain email text, but wrap in a link that handles the click
        emailPlaceholder.innerHTML = `<a href="#" class="text-link js-email-link">${fullEmail}</a>`;
    }

    // Handle all email links dynamically
    const emailLinks = document.querySelectorAll('.js-email-link');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'mailto:' + fullEmail;
        });
        link.setAttribute('title', 'メールソフトを起動します');
    });


    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- Mobile Menu Toggle ---
    mobileMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close Mobile Menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });


    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to elements
    const revealElements = [
        '.section-title', 
        '.catch-box', 
        '.service-card', 
        '.strength-item', 
        '.strength-image', 
        '.company-info-box',
        '.cta-box'
    ];

    revealElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('reveal-init');
            if (el.classList.contains('service-card')) {
                el.style.transitionDelay = `${index * 0.1}s`;
            }
            observer.observe(el);
        });
    });

    // CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .reveal-init {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Back to Top Button Logic
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
