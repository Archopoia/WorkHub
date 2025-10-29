// WorkHub - JavaScript for interactive features

// Initialize EmailJS with configuration from config.js
(function() {
    // Check if emailjs is loaded and available
    if (typeof emailjs !== 'undefined' && typeof WORKHUB_CONFIG !== 'undefined' && WORKHUB_CONFIG.emailjs) {
        try {
            emailjs.init(WORKHUB_CONFIG.emailjs.publicKey);
        } catch (error) {
            console.warn('EmailJS initialization failed:', error);
        }
    } else if (typeof emailjs === 'undefined') {
        console.warn('EmailJS library not loaded. Email functionality will be disabled.');
    } else {
        console.warn('WorkHub configuration not loaded. Please ensure config.js is loaded before script.js');
    }
})();


document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // ENTRANCE SCREEN LOGIC
    // Dark red background, vignette effect, logo animations
    // ============================================
    const staticLoader = document.getElementById('static-loader');
    const enterButton = document.getElementById('enter-portfolio-btn');

    // Lock body scrolling on entrance screen
    document.body.classList.add('entrance-active');

    // Add hover tracking for proper animation cycling
    if (enterButton) {
        enterButton.addEventListener('mouseenter', () => {
            enterButton.classList.add('was-hovered');
        });
    }

    // ============================================
    // VIDEO LOOP CROSS-FADE TRANSITION
    // Seamless cross-fade between two video elements for smooth looping
    // ============================================
    const entranceVideo1 = document.getElementById('entrance-video-1');
    const entranceVideo2 = document.getElementById('entrance-video-2');

    if (entranceVideo1 && entranceVideo2) {
        const fadeDuration = 3.0; // seconds - adjust this value to change fade duration
        let video1Active = true;
        let isCrossFading = false;
        let videoDuration = 0;

        // Set CSS transitions for smooth opacity changes
        entranceVideo1.style.transition = `opacity ${fadeDuration}s ease-in-out`;
        entranceVideo2.style.transition = `opacity ${fadeDuration}s ease-in-out`;

        // Initialize video 1
        entranceVideo1.addEventListener('loadedmetadata', function() {
            videoDuration = this.duration;
        });

        // Handle video 1 ending (manually loop)
        entranceVideo1.addEventListener('timeupdate', function() {
            if (!video1Active || isCrossFading) return;

            const currentTime = this.currentTime;
            const duration = this.duration;

            // Check if we're within fade duration of the end
            if (duration > 0 && currentTime >= duration - fadeDuration) {
                isCrossFading = true;

                // Preload and start video 2
                entranceVideo2.currentTime = 0;
                entranceVideo2.play().then(() => {
                    // Start cross-fade
                    entranceVideo1.style.opacity = '0';
                    entranceVideo2.style.opacity = '1';
                    video1Active = false;

                    // After fade completes, pause and reset video 1
                    setTimeout(() => {
                        entranceVideo1.pause();
                        entranceVideo1.currentTime = 0;
                        isCrossFading = false;
                    }, fadeDuration * 1000);
                }).catch(err => {
                    console.error('Error playing video 2:', err);
                    isCrossFading = false;
                });
            }
        });

        // Handle video 1 ended event as backup
        entranceVideo1.addEventListener('ended', function() {
            if (video1Active && !isCrossFading) {
                // Immediately start video 2 if we missed the timeupdate
                isCrossFading = true;
                entranceVideo2.currentTime = 0;
                entranceVideo2.play().then(() => {
                    entranceVideo1.style.opacity = '0';
                    entranceVideo2.style.opacity = '1';
                    video1Active = false;
                    setTimeout(() => {
                        entranceVideo1.currentTime = 0;
                        isCrossFading = false;
                    }, fadeDuration * 1000);
                });
            }
        });

        // Handle video 2 ending (manually loop back to video 1)
        entranceVideo2.addEventListener('timeupdate', function() {
            if (video1Active || isCrossFading) return;

            const currentTime = this.currentTime;
            const duration = this.duration;

            // Check if we're within fade duration of the end
            if (duration > 0 && currentTime >= duration - fadeDuration) {
                isCrossFading = true;

                // Preload and start video 1
                entranceVideo1.currentTime = 0;
                entranceVideo1.play().then(() => {
                    // Start cross-fade
                    entranceVideo2.style.opacity = '0';
                    entranceVideo1.style.opacity = '1';
                    video1Active = true;

                    // After fade completes, pause and reset video 2
                    setTimeout(() => {
                        entranceVideo2.pause();
                        entranceVideo2.currentTime = 0;
                        isCrossFading = false;
                    }, fadeDuration * 1000);
                }).catch(err => {
                    console.error('Error playing video 1:', err);
                    isCrossFading = false;
                });
            }
        });

        // Handle video 2 ended event as backup
        entranceVideo2.addEventListener('ended', function() {
            if (!video1Active && !isCrossFading) {
                // Immediately start video 1 if we missed the timeupdate
                isCrossFading = true;
                entranceVideo1.currentTime = 0;
                entranceVideo1.play().then(() => {
                    entranceVideo2.style.opacity = '0';
                    entranceVideo1.style.opacity = '1';
                    video1Active = true;
                    setTimeout(() => {
                        entranceVideo2.currentTime = 0;
                        isCrossFading = false;
                    }, fadeDuration * 1000);
                });
            }
        });
    }

    // Unlock audio on user interaction (simplified version without sound system)
    let entranceUnlocked = false;

    // Function to trigger golden flash animation and transition
    const triggerFlashAnimation = () => {
        if (entranceUnlocked || window.logoClickInProgress) return;
        entranceUnlocked = true;
        window.logoClickInProgress = true;

        // Unlock body scrolling immediately on click
        document.body.classList.remove('entrance-active');

        // Create a beautiful golden flash element that purges everything
        const flashElement = document.createElement('div');
        flashElement.id = 'golden-flash';
        flashElement.style.cssText = `
            position: fixed;
            top: 47%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle,
                rgba(255, 235, 198, 1) 0%,
                rgba(255, 235, 198, 0.8) 20%,
                rgba(255, 235, 198, 0.4) 35%,
                rgba(255, 235, 198, 0.1) 50%,
                transparent 70%);
            transform: translate(-50%, -50%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10001;
            opacity: 1;
        `;
        document.body.appendChild(flashElement);

        // Start the flash animation immediately - it purges everything
        flashElement.style.animation = 'goldenFlash 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';

        // Wait for the flash to completely cover the screen
        setTimeout(() => {
            // Flash is at maximum - hide the entrance background underneath
            // Pause both videos
            const video1 = document.getElementById('entrance-video-1');
            const video2 = document.getElementById('entrance-video-2');
            if (video1) video1.pause();
            if (video2) video2.pause();

            if (staticLoader) {
                staticLoader.style.display = 'none';
            }
            if (enterButton) {
                enterButton.style.display = 'none';
            }

            // Remove the goldenFlash animation first to release the animation-fill-mode
            flashElement.style.animation = 'none';
            // Force a reflow to ensure the animation change is registered
            void flashElement.offsetHeight;

            // Now set the final dimensions as inline styles
            flashElement.style.width = '3000px';
            flashElement.style.height = '3000px';

            // Apply fadeOut animation
            flashElement.style.animation = 'fadeOut 1.5s ease-in-out forwards';

            // After flash fades out, show the website content
            setTimeout(() => {
                // Remove the static loader from DOM
                if (staticLoader && staticLoader.parentNode) {
                    staticLoader.remove();
                }

                // Clean up flash element
                if (flashElement.parentNode) {
                    flashElement.parentNode.removeChild(flashElement);
                }
            }, 1500); // Wait for fadeOut animation to complete
        }, 1200); // Wait for the full flash animation to complete
    };

    const unlockEntrance = () => {
        if (entranceUnlocked) return;
        entranceUnlocked = true;

        // Hide button
        if (enterButton) {
            enterButton.style.display = 'none';
        }

        // Fade out the static loader
        if (staticLoader) {
            // Pause both videos
            const video1 = document.getElementById('entrance-video-1');
            const video2 = document.getElementById('entrance-video-2');
            if (video1) video1.pause();
            if (video2) video2.pause();

            staticLoader.style.animation = 'fadeOut 1.5s ease-in-out forwards';

            setTimeout(() => {
                // Remove the static loader from DOM
                if (staticLoader && staticLoader.parentNode) {
                    staticLoader.remove();
                }
                // Unlock body scrolling
                document.body.classList.remove('entrance-active');
            }, 1500);
        }
    };

    // Try to autoplay immediately (will work if user has high MEI or on some browsers)
    setTimeout(() => {
        // Check if user has interacted before showing button
        // For WorkHub, we'll always show the button after a short delay if no autoplay
        if (enterButton) {
            enterButton.style.display = 'block';
        }

        // Handle clicks ANYWHERE on the page while entrance screen is active
        // This will trigger the flash animation from anywhere
        const handleEntranceClick = (e) => {
            if (!entranceUnlocked && !window.logoClickInProgress) {
                // Any click anywhere triggers the flash
                e.preventDefault(); // Prevent any default behavior
                e.stopPropagation(); // Stop event bubbling
                triggerFlashAnimation();

                // Remove this listener after triggering flash
                document.removeEventListener('click', handleEntranceClick, true);
                if (staticLoader) {
                    staticLoader.removeEventListener('click', handleEntranceClick);
                }
            }
        };

        // Add click listener to document to catch ALL clicks
        // Use capture phase to intercept clicks before other handlers
        document.addEventListener('click', handleEntranceClick, true);

        // Also add click listener to static loader itself
        if (staticLoader) {
            staticLoader.addEventListener('click', handleEntranceClick);
        }
    }, 500);

    // ============================================
    // END OF ENTRANCE SCREEN LOGIC
    // ============================================

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(26, 77, 122, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(26, 77, 122, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add animation to cards on scroll
    const cards = document.querySelectorAll('.solution-card, .benefit-card, .team-card');

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger animation
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    const footer = document.querySelector('.footer p');
    if (footer) {
        footer.innerHTML = footer.innerHTML.replace('2025', currentYear);
    }

    // Add hover effect sound/haptic feedback simulation
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Log page load for analytics (only in debug mode)
    SecurityUtils.log('WorkHub website loaded successfully! 🚀');

    // Add a subtle animation to the scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // Mobile menu toggle (if needed in future)
    // This is a placeholder for future mobile menu functionality
    const createMobileMenu = () => {
        // Future implementation
    };

});

// Add entrance animation to hero section
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// ============================================
// FORMULAIRE FUNCTIONS
// ============================================

function showForm(formType) {
    const formId = formType === 'contact' ? 'contactForm' : 'interviewForm';
    const form = document.getElementById(formId);

    if (form) {
        form.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        if (formType === 'contact') {
            const event = window.event || {};
            const buttonText = event.target ? event.target.textContent.toLowerCase() : '';
            const userTypeSelect = form.querySelector('select[name="userType"]');

            if (userTypeSelect) {
                if (buttonText.includes('candidat')) {
                    userTypeSelect.value = 'candidat';
                } else if (buttonText.includes('entreprise')) {
                    userTypeSelect.value = 'entreprise';
                } else if (buttonText.includes('investisseur')) {
                    userTypeSelect.value = 'investisseur';
                }
            }
        }
    }
}

function hideForm() {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        form.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}


function submitForm(event) {
    event.preventDefault();

    // Check rate limiting
    if (!RateLimiter.canSubmit()) {
        alert('Vous avez atteint la limite de soumissions. Veuillez réessayer dans une heure.');
        return;
    }

    const formData = new FormData(event.target);
    const rawData = Object.fromEntries(formData.entries());
    const data = SecurityUtils.sanitizeFormData(rawData);

    const sectorsSelect = event.target.querySelector('select[name="sectors"]');
    const positionsSelect = event.target.querySelector('select[name="positions"]');
    const timelineSelect = event.target.querySelector('select[name="timeline"]');

    const sectors = Array.from(sectorsSelect.selectedOptions).map(opt => SecurityUtils.sanitizeInput(opt.text));
    const positions = Array.from(positionsSelect.selectedOptions).map(opt => SecurityUtils.sanitizeInput(opt.text));
    const timeline = Array.from(timelineSelect.selectedOptions).map(opt => SecurityUtils.sanitizeInput(opt.text));

    const budgetSelect = event.target.querySelector('select[name="budget"]');
    const budgetText = budgetSelect.selectedOptions[0] ? budgetSelect.selectedOptions[0].text : 'Non précisé';

    const templateParams = {
        to_email: WORKHUB_CONFIG.contactEmail,
        from_name: 'Contact WorkHub',
        user_type: data.userType || 'Non spécifié',
        sectors: sectors.join(', ') || 'Non spécifié',
        positions: positions.join(', ') || 'Non spécifié',
        timeline: timeline.join(', ') || 'Non spécifié',
        budget: budgetText,
        interest: data.interest || 'Non spécifié',
        email: data.email || 'Non fourni',
        user_message: data.message || 'Aucun message',
        message: `Nouveau contact WorkHub !

Type: ${data.userType || 'Non spécifié'}
Secteur(s): ${sectors.join(', ') || 'Non spécifié'}
Poste(s) / Besoin(s): ${positions.join(', ') || 'Non spécifié'}
Échéance: ${timeline.join(', ') || 'Non spécifié'}
Budget: ${budgetText}
Niveau d'intérêt: ${data.interest || 'Non spécifié'}
Email: ${data.email || 'Non fourni'}

Message:
${data.message || 'Aucun message'}`
    };

    // Send email using EmailJS with config
    emailjs.send(
        WORKHUB_CONFIG.emailjs.serviceId,
        WORKHUB_CONFIG.emailjs.templates.contact,
        templateParams
    )
        .then(function(response) {
            SecurityUtils.log('Email sent successfully!', response.status);
            RateLimiter.recordSubmission();
            alert('Merci ! Nous vous contacterons bientôt pour l\'aventure WorkHub !');

            // Débloquer le badge contact
            if (typeof unlockContactBadge === 'function') {
                unlockContactBadge();
            }

            hideForm();
            event.target.reset();
        }, function(error) {
            SecurityUtils.log('Failed to send email:', error);
            alert('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
        });
}

function submitInterview(event) {
    event.preventDefault();

    // Check rate limiting
    if (!RateLimiter.canSubmit()) {
        alert('Vous avez atteint la limite de soumissions. Veuillez réessayer dans une heure.');
        return;
    }

    const formData = new FormData(event.target);
    const rawData = Object.fromEntries(formData.entries());

    // Sanitize all input data
    const data = SecurityUtils.sanitizeFormData(rawData);

    // Collect multiple select values (sanitize each)
    const questTypesSelect = document.querySelector('select[name="questTypes"]');
    const rewardsSelect = document.querySelector('select[name="rewards"]');

    const questTypes = Array.from(questTypesSelect.selectedOptions).map(option => SecurityUtils.sanitizeInput(option.value));
    const rewards = Array.from(rewardsSelect.selectedOptions).map(option => SecurityUtils.sanitizeInput(option.value));

    // Prepare email template parameters
    const templateParams = {
        to_email: WORKHUB_CONFIG.contactEmail,
        from_name: 'Utilisateur Interview WorkHub',
        quest_types: questTypes.join(', ') || 'Aucun sélectionné',
        duration: data.duration || 'Non spécifié',
        difficulty: data.difficulty || 'Non spécifié',
        rewards: rewards.join(', ') || 'Aucun sélectionné',
        quest_idea: data.questIdea || 'Aucune idée fournie',
        email: data.email || 'Non fourni',
        newsletter_subscribed: data.newsletter === 'yes' ? 'Oui' : 'Non',
        message: `Nouvelle idée de quête WorkHub !

Types de quêtes: ${questTypes.join(', ')}
Durée: ${data.duration}
Difficulté: ${data.difficulty}
Récompenses: ${rewards.join(', ')}
Idée: ${data.questIdea || 'Aucune'}
Email: ${data.email || 'Non fourni'}
Newsletter: ${data.newsletter === 'yes' ? 'Oui' : 'Non'}`
    };

    // Send email using EmailJS with config
    emailjs.send(
        WORKHUB_CONFIG.emailjs.serviceId,
        WORKHUB_CONFIG.emailjs.templates.interview,
        templateParams
    )
        .then(function(response) {
            SecurityUtils.log('Interview email sent successfully!', response.status);
            RateLimiter.recordSubmission();
            alert('Merci pour vos idées ! Elles nous aideront à créer les meilleures quêtes WorkHub !');

            // Débloquer le badge contact
            if (typeof unlockContactBadge === 'function') {
                unlockContactBadge();
            }

            hideForm();
            event.target.reset();
        }, function(error) {
            SecurityUtils.log('Failed to send interview email:', error);
            alert('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
        });
}

// Close form on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideForm();
    }
});


