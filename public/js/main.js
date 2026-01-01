// ============================================
// EmailJS Configuration
// ============================================

const EMAILJS_PUBLIC_KEY = '5tW71Ud_ccsOYf_7T';
const EMAILJS_SERVICE_ID = 'service_wlm172g';
const EMAILJS_TEMPLATE_ID = 'template_ywsmld6';

emailjs.init(EMAILJS_PUBLIC_KEY);

// ============================================
// Theme Management
// ============================================

const ThemeManager = {
    init() {
        const savedTheme = sessionStorage.getItem('theme') || 'light';
        const blahajEnabled = sessionStorage.getItem('blahajThemeEnabled') === 'true';

        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('darkModeToggle').classList.add('active');
        }

        if (blahajEnabled) {
            document.documentElement.setAttribute('data-blahaj', 'true');
            const blahajToggle = document.getElementById('blahajToggle');
            if (blahajToggle) {
                blahajToggle.classList.add('active');
                this.revealBlahajToggle();
            }
        }

        document.getElementById('darkModeToggle').addEventListener('click', () => this.toggleDarkMode());
        document.getElementById('blahajToggle').addEventListener('click', () => this.toggleBlahajTheme());
    },

    toggleDarkMode() {
        const html = document.documentElement;
        const toggle = document.getElementById('darkModeToggle');
        const currentTheme = html.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            html.removeAttribute('data-theme');
            toggle.classList.remove('active');
            sessionStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            toggle.classList.add('active');
            sessionStorage.setItem('theme', 'dark');
        }
    },

    revealBlahajToggle() {
        const toggle = document.getElementById('blahajToggle');
        toggle.style.display = 'flex';
        setTimeout(() => {
            toggle.classList.add('revealed');
        }, 10);
    },

    enableBlahajTheme() {
        const html = document.documentElement;
        const toggle = document.getElementById('blahajToggle');
        
        html.setAttribute('data-blahaj', 'true');
        toggle.classList.add('active');
        sessionStorage.setItem('blahajThemeEnabled', 'true');
    },

    toggleBlahajTheme() {
        const html = document.documentElement;
        const toggle = document.getElementById('blahajToggle');
        const currentBlahaj = html.getAttribute('data-blahaj');

        if (currentBlahaj === 'true') {
            html.removeAttribute('data-blahaj');
            toggle.classList.remove('active');
            sessionStorage.setItem('blahajThemeEnabled', 'false');
        } else {
            html.setAttribute('data-blahaj', 'true');
            toggle.classList.add('active');
            sessionStorage.setItem('blahajThemeEnabled', 'true');
        }
    }
};

// ============================================
// Blahaj Easter Egg
// ============================================

const BlahajEasterEgg = {
    typedSequence: '',
    targetWord: 'blahaj',
    isDiscovered: false,
    
    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
                this.typedSequence += e.key.toLowerCase();
                
                if (this.typedSequence.length > this.targetWord.length) {
                    this.typedSequence = this.typedSequence.slice(-this.targetWord.length);
                }

                if (this.typedSequence === this.targetWord && !this.isDiscovered) {
                    this.trigger();
                }
            }
        });
    },

    trigger() {
        this.isDiscovered = true;
        ThemeManager.enableBlahajTheme();
        ThemeManager.revealBlahajToggle();
        this.showModal();
    },

    showModal() {
        const modal = document.getElementById('blahajModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
};

const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Scroll Animations
// ============================================

const ScrollAnimations = {
    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            this.showAllElements();
        }
    },

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('skill-item')) {
                        this.animateSkillBar(entry.target);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        document.querySelectorAll('.skill-item').forEach(el => {
            observer.observe(el);
        });
    },

    animateSkillBar(skillItem) {
        const skillBar = skillItem.querySelector('.skill-bar');
        const skillBarFill = skillItem.querySelector('.skill-bar-fill');
        const percentage = skillBar.getAttribute('data-percentage');
        
        setTimeout(() => {
            skillBar.classList.add('animated');
            skillBarFill.style.width = `${percentage}%`;
        }, 100);
    },

    showAllElements() {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }
};

// ============================================
// Smooth Scroll for Navigation
// ============================================

const SmoothScroll = {
    init() {
        if (window.innerWidth > 900) return;

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// ============================================
// Contact Form with EmailJS
// ============================================

const ContactForm = {
    init() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(form);
        });
    },

    async handleSubmit(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const messageDiv = document.getElementById('formMessage');
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        messageDiv.classList.remove('show', 'success', 'error');

        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const message = form.querySelector('#message').value;
        
        const now = new Date();
        const time = now.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        });

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    name: name,
                    email: email,
                    time: time,
                    message: message
                }
            );

            this.showMessage(messageDiv, 'Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            this.showMessage(messageDiv, 'Failed to send message. Please try again later.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    },

    showMessage(messageDiv, text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type} show`;
        
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 5000);
    }
};

// ============================================
// Modal Management
// ============================================

const ModalManager = {
    init() {
        const modal = document.getElementById('blahajModal');
        const closeBtn = document.getElementById('modalClose');
        
        if (!modal || !closeBtn) return;

        closeBtn.addEventListener('click', () => this.closeModal());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    },

    closeModal() {
        const modal = document.getElementById('blahajModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
};

// ============================================
// Textarea Resizer - Form Width Adaptation
// ============================================

const TextareaResizer = {
    isResizing: false,
    startWidth: 0,
    startX: 0,

    init() {
        const textarea = document.getElementById('message');
        const resizeHandle = document.getElementById('resizeHandle');
        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        
        if (!textarea || !resizeHandle || !form || !nameInput || !emailInput) return;

        textarea.style.resize = 'both';
        
        const minWidth = Math.max(nameInput.offsetWidth, emailInput.offsetWidth);
        
        const formStyles = window.getComputedStyle(form);
        const formPaddingLeft = parseFloat(formStyles.paddingLeft);
        const formPaddingRight = parseFloat(formStyles.paddingRight);
        const formPadding = formPaddingLeft + formPaddingRight;
        
        this.minFormWidth = minWidth + formPadding;
        textarea.style.minWidth = `${minWidth}px`;
        
        const updateMaxWidth = () => {
            const formWidth = form.offsetWidth;
            const maxTextareaWidth = formWidth - formPadding;
            textarea.style.maxWidth = `${maxTextareaWidth}px`;
            this.maxTextareaWidth = maxTextareaWidth;
        };
        
        form.style.minWidth = `${this.minFormWidth}px`;
        updateMaxWidth();
        
        let formResizeObserver;
        if (window.ResizeObserver) {
            formResizeObserver = new ResizeObserver(() => {
                updateMaxWidth();
            });
            formResizeObserver.observe(form);
        }
        
        let resizeObserver;
        if (window.ResizeObserver) {
            resizeObserver = new ResizeObserver(() => {
                if (!this.isResizing) {
                    this.handleResize(textarea);
                }
            });
            resizeObserver.observe(textarea);
        }

        this.form = form;
        this.minInputWidth = minWidth;
        this.formPadding = formPadding;
        this.updateMaxWidth = updateMaxWidth;
        
        resizeHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.startResize(e, textarea);
        });

        textarea.addEventListener('mouseup', () => {
            if (this.isResizing) {
                this.endResize(textarea);
            }
        });
    },

    startResize(e, textarea) {
        this.isResizing = true;
        this.startX = e.clientX;
        this.startWidth = textarea.offsetWidth;
        
        document.addEventListener('mousemove', this.handleMouseMove = (e) => {
            this.onMouseMove(e, textarea);
        });
        
        document.addEventListener('mouseup', this.handleMouseUp = () => {
            this.endResize(textarea);
        });
    },

    onMouseMove(e, textarea) {
        const deltaX = e.clientX - this.startX;
        const newWidth = Math.max(
            this.minInputWidth, 
            Math.min(this.maxTextareaWidth || Infinity, this.startWidth + deltaX)
        );
        textarea.style.width = `${newWidth}px`;
    },

    endResize(textarea) {
        this.isResizing = false;
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        this.updateFormWidth(textarea);
    },

    handleResize(textarea) {
        setTimeout(() => {
            if (!this.isResizing) {
                this.updateFormWidth(textarea);
            }
        }, 100);
    },

    updateFormWidth(textarea) {
        if (!this.form) return;
        
        const textareaWidth = textarea.offsetWidth;
        
        if (this.updateMaxWidth) {
            this.updateMaxWidth();
        }
        
        if (textareaWidth > this.minInputWidth) {
            const formMaxWidth = textareaWidth + this.formPadding;
            this.form.style.maxWidth = `${formMaxWidth}px`;
            
            setTimeout(() => {
                if (this.updateMaxWidth) {
                    this.updateMaxWidth();
                }
            }, 10);
        } else {
            this.form.style.maxWidth = `${this.minFormWidth}px`;
            
            if (this.updateMaxWidth) {
                this.updateMaxWidth();
            }
        }
        
        if (textareaWidth > this.maxTextareaWidth) {
            textarea.style.width = `${this.maxTextareaWidth}px`;
        }
    }
};

// ============================================
// Section-Based Scrolling
// ============================================

const SectionScroller = {
    sections: null,
    currentIndex: 0,
    isTransitioning: false,
    wheelCooldownUntil: 0,
    lastDirection: 0,
    isDesktop: window.innerWidth > 900,
    wheelHandler: null,
    keyboardHandler: null,
    resizeHandler: null,

    init() {
        this.wheelHandler = this.handleWheel.bind(this);
        this.keyboardHandler = this.handleKeyboard.bind(this);
        this.resizeHandler = this.handleResize.bind(this);

        if (!this.isDesktop) return;

        this.sections = document.querySelectorAll('.section');
        if (this.sections.length === 0) return;

        document.body.classList.add('scroll-locked');
        
        setTimeout(() => {
            this.detectCurrentSection();
        }, 100);

        window.addEventListener('wheel', this.wheelHandler, { passive: false, capture: true });
        window.addEventListener('scroll', (e) => {
            if (this.isDesktop) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, { passive: false, capture: true });
        window.addEventListener('keydown', this.keyboardHandler);
        
        const arrowUp = document.getElementById('scrollArrowUp');
        const arrowDown = document.getElementById('scrollArrowDown');
        if (arrowUp) arrowUp.addEventListener('click', () => this.goToSection(this.currentIndex - 1));
        if (arrowDown) arrowDown.addEventListener('click', () => this.goToSection(this.currentIndex + 1));

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetIndex = Array.from(this.sections).findIndex(s => s.id === targetId);
                if (targetIndex !== -1) {
                    this.goToSection(targetIndex);
                }
            });
        });

        this.updateUI();
        window.addEventListener('resize', this.resizeHandler);
    },

    handleResize() {
        const wasDesktop = this.isDesktop;
        this.isDesktop = window.innerWidth > 900;

        if (wasDesktop && !this.isDesktop) {
            document.body.classList.remove('scroll-locked');
            window.removeEventListener('wheel', this.wheelHandler);
            window.removeEventListener('keydown', this.keyboardHandler);
            if (this.sections) {
                this.sections.forEach(s => s.classList.remove('active'));
            }
        } else if (!wasDesktop && this.isDesktop) {
            if (!this.sections) {
                this.sections = document.querySelectorAll('.section');
            }
            if (this.sections.length === 0) return;
            
            document.body.classList.add('scroll-locked');
            window.addEventListener('wheel', this.wheelHandler, { passive: false, capture: true });
            window.addEventListener('keydown', this.keyboardHandler);
            this.goToSection(0, false);
        }
    },

    handleWheel(e) {
        if (!this.isDesktop) return;

        e.preventDefault();
        e.stopPropagation();

        const now = Date.now();
        const delta = e.deltaY;
        
        if (Math.abs(delta) < 5) return;

        const direction = delta > 0 ? 1 : -1;

        if (now < this.wheelCooldownUntil) {
            if (direction === this.lastDirection) {
                return;
            }
            this.wheelCooldownUntil = 0;
        }

        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.wheelCooldownUntil = now + 1100;
        this.lastDirection = direction;

        if (direction > 0) {
            this.goToSection(this.currentIndex + 1);
        } else {
            this.goToSection(this.currentIndex - 1);
        }
    },

    handleKeyboard(e) {
        if (!this.isDesktop || this.isTransitioning) return;

        let targetIndex = this.currentIndex;

        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                targetIndex = this.currentIndex + 1;
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                targetIndex = this.currentIndex - 1;
                break;
            case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                targetIndex = this.sections.length - 1;
                break;
            default:
                return;
        }

        this.goToSection(targetIndex);
    },

    detectCurrentSection() {
        if (!this.isDesktop || !this.sections) return;

        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        let closestIndex = 0;
        let maxVisibleArea = 0;

        this.sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            
            const visibleTop = Math.max(0, -sectionTop);
            const visibleBottom = Math.min(rect.height, viewportHeight - sectionTop);
            const visibleArea = Math.max(0, visibleBottom - visibleTop);

            if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                closestIndex = index;
            }
        });

        this.currentIndex = closestIndex;
        this.sections.forEach(s => s.classList.remove('active'));
        this.sections[closestIndex].classList.add('active');
        this.updateUI();
    },

    goToSection(index, smooth = true) {
        if (!this.isDesktop) return;

        index = Math.max(0, Math.min(index, this.sections.length - 1));
        
        if (index === this.currentIndex) {
            this.isTransitioning = false;
            return;
        }

        this.currentIndex = index;
        const targetSection = this.sections[index];
        
        this.sections.forEach(s => s.classList.remove('active'));
        targetSection.classList.add('active');

        if (smooth) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            targetSection.scrollIntoView({ behavior: 'auto', block: 'start' });
        }

        this.updateUI();

        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    },

    updateUI() {
        if (!this.isDesktop) return;

        const arrowUp = document.getElementById('scrollArrowUp');
        const arrowDown = document.getElementById('scrollArrowDown');
        const progressBar = document.getElementById('scrollProgressBar');

        if (arrowUp) {
            if (this.currentIndex === 0) {
                arrowUp.classList.add('hidden');
            } else {
                arrowUp.classList.remove('hidden');
            }
        }

        if (arrowDown) {
            if (this.currentIndex === this.sections.length - 1) {
                arrowDown.classList.add('hidden');
            } else {
                arrowDown.classList.remove('hidden');
            }
        }

        if (progressBar) {
            const progress = ((this.currentIndex + 1) / this.sections.length) * 100;
            progressBar.style.height = `${progress}%`;
        }
    }
};

// ============================================
// Initialize Everything
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    BlahajEasterEgg.init();
    ScrollAnimations.init();
    SmoothScroll.init();
    ContactForm.init();
    ModalManager.init();
    TextareaResizer.init();
    SectionScroller.init();
});

