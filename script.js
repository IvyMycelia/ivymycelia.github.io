const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

updateThemeIcon();

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}

function toggleTransTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'trans' ? 'light' : 'trans';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

themeToggle.addEventListener('click', toggleTheme);

const transToggle = document.getElementById('transToggle');
transToggle.addEventListener('click', toggleTransTheme);

const titleName = document.querySelector('.title-name');
let tapCount = 0;
let tapTimer = null;

titleName.addEventListener('click', () => {
    tapCount++;
    
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => {
        if (tapCount >= 3) {
            toggleTransTheme();            
            titleName.style.transform = 'scale(1.1)';
            titleName.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                titleName.style.transform = 'scale(1)';
            }, 300);
        }
        tapCount = 0;
    }, 1000);
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        ...document.querySelectorAll('.about-content'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.contact-content'),
        ...document.querySelectorAll('.skill-tag'),
        ...document.querySelectorAll('.social-link')
    ];

    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const yPos = -(scrolled * speed / 10);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Initialize EmailJS
emailjs.init("5tW71Ud_ccsOYf_7T");

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Send email using EmailJS
        emailjs.sendForm('service_wlm172g', 'template_ywsmld6', this)
            .then(() => {
                alert('Message sent successfully! I\'ll get back to you soon.');
                this.reset();
            })
            .catch(() => {
                alert('Failed to send message. Please try again.');
            })
            .finally(() => {
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            });
    });
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const titleName = document.querySelector('.title-name');
    if (titleName) {
        titleName.textContent = 'Ivy Mycelia';
        setTimeout(() => {
            typeWriter(titleName, 'Ivy Mycelia', 150);
        }, 1000);
    }
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-gold));
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--accent-purple);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
    `;
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(particle);
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = -10;
        const duration = 3000 + Math.random() * 2000;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        particle.animate([
            { transform: 'translate(0, 0)', opacity: 0.6 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

setInterval(createParticle, 500);

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 't' && e.ctrlKey) {
        e.preventDefault();
        toggleTheme();
    }
    
    if (e.key.toLowerCase() === 't' && !e.ctrlKey) {
        if (!window.transKeyCount) window.transKeyCount = 0;
        if (!window.transKeyTimer) window.transKeyTimer = null;
        
        window.transKeyCount++;
        
        clearTimeout(window.transKeyTimer);
        window.transKeyTimer = setTimeout(() => {
            if (window.transKeyCount >= 3) {
                toggleTransTheme();
            }
            window.transKeyCount = 0;
        }, 1000);
    }
    

    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = getPreviousSection(currentSection);
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    const sections = ['#home', '#about', '#projects', '#contact'];
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let section of sections) {
        const element = document.querySelector(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                return section;
            }
        }
    }
    return '#home';
}

function getNextSection(currentSection) {
    const sections = ['#home', '#about', '#projects', '#contact'];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    return document.querySelector(sections[nextIndex]);
}

function getPreviousSection(currentSection) {
    const sections = ['#home', '#about', '#projects', '#contact'];
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    return document.querySelector(sections[prevIndex]);
}

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

 