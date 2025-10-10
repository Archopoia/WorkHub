// WorkHub - JavaScript for interactive features

// Initialize EmailJS with configuration from config.js
(function() {
    if (typeof WORKHUB_CONFIG !== 'undefined' && WORKHUB_CONFIG.emailjs) {
        emailjs.init(WORKHUB_CONFIG.emailjs.publicKey);
    } else {
        console.error('Configuration not loaded. Please ensure config.js is loaded before script.js');
    }
})();

// Initialize user type button functionality
document.addEventListener('DOMContentLoaded', function() {
    const userTypeButtons = document.querySelectorAll('.user-type-btn');
    const userTypeInput = document.getElementById('userTypeInput');

    userTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            userTypeButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Set the hidden input value
            const userType = this.getAttribute('data-value');
            userTypeInput.value = userType;

            // Show relevant fields
            toggleUserTypeFields(userType);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {

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
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Pre-fill user type based on button clicked
        if (formType === 'contact') {
            // Reset all fields first
            toggleUserTypeFields(null);

            const event = window.event || {};
            const buttonText = event.target ? event.target.textContent : '';
            if (buttonText.includes('candidat')) {
                const candidatRadio = form.querySelector('input[value="candidat"]');
                if (candidatRadio) {
                    candidatRadio.checked = true;
                    toggleUserTypeFields('candidat');
                }
            } else if (buttonText.includes('entreprise')) {
                const entrepriseRadio = form.querySelector('input[value="entreprise"]');
                if (entrepriseRadio) {
                    entrepriseRadio.checked = true;
                    toggleUserTypeFields('entreprise');
                }
            } else if (buttonText.includes('investisseur')) {
                const investisseurRadio = form.querySelector('input[value="investisseur"]');
                if (investisseurRadio) {
                    investisseurRadio.checked = true;
                    toggleUserTypeFields('investisseur');
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
    document.body.style.overflow = 'auto'; // Restore scrolling

    // Reset all user type fields
    toggleUserTypeFields(null);
}

function toggleUserTypeFields(userType) {
    // Hide all specific fields first
    const allFieldGroups = [
        'candidatFields', 'candidatSector', 'candidatExperience', 'candidatAvailability',
        'companyFields', 'companySector', 'companyNeeds', 'companyUrgency',
        'investorFields', 'investorAmount', 'investorSector', 'investorTimeline'
    ];

    allFieldGroups.forEach(groupId => {
        const group = document.getElementById(groupId);
        if (group) {
            group.style.display = 'none';
            // Remove required and clear selections for dropdowns
            const dropdowns = group.querySelectorAll('select');
            dropdowns.forEach(dropdown => {
                dropdown.removeAttribute('required');
                dropdown.selectedIndex = 0; // Reset to first option
            });
        }
    });

    // Show and require fields based on user type
    if (userType === 'candidat') {
        const candidatGroups = ['candidatFields', 'candidatSector', 'candidatExperience', 'candidatAvailability'];
        candidatGroups.forEach(groupId => {
            const group = document.getElementById(groupId);
            if (group) {
                group.style.display = 'block';
                const dropdowns = group.querySelectorAll('select');
                dropdowns.forEach(dropdown => dropdown.setAttribute('required', 'required'));
            }
        });
    } else if (userType === 'entreprise') {
        const companyGroups = ['companyFields', 'companySector', 'companyNeeds', 'companyUrgency'];
        companyGroups.forEach(groupId => {
            const group = document.getElementById(groupId);
            if (group) {
                group.style.display = 'block';
                const dropdowns = group.querySelectorAll('select');
                dropdowns.forEach(dropdown => dropdown.setAttribute('required', 'required'));
            }
        });
    } else if (userType === 'investisseur') {
        const investorGroups = ['investorFields', 'investorAmount', 'investorSector', 'investorTimeline'];
        investorGroups.forEach(groupId => {
            const group = document.getElementById(groupId);
            if (group) {
                group.style.display = 'block';
                const dropdowns = group.querySelectorAll('select');
                dropdowns.forEach(dropdown => dropdown.setAttribute('required', 'required'));
            }
        });
    }
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

    // Sanitize all input data
    const data = SecurityUtils.sanitizeFormData(rawData);

    // Check if user type is selected, if not, allow general submission
    const userType = data.userType || 'general';

    // Prepare email template parameters with specific fields per user type
    let specificFields = '';

    if (userType === 'candidat') {
        specificFields = `Type de poste: ${data.candidatJobType || 'Non spécifié'}
Secteur: ${data.sector || 'Non spécifié'}
Expérience: ${data.experience || 'Non spécifié'}
Disponibilité: ${data.availability || 'Non spécifié'}`;
    } else if (userType === 'entreprise') {
        specificFields = `Taille entreprise: ${data.companySize || 'Non spécifié'}
Secteur: ${data.sector || 'Non spécifié'}
Besoins de recrutement: ${data.hiringNeeds || 'Non spécifié'}
Urgence: ${data.urgency || 'Non spécifié'}`;
    } else if (userType === 'investisseur') {
        specificFields = `Type d'investissement: ${data.investmentType || 'Non spécifié'}
Montant: ${data.amount || 'Non spécifié'}
Secteur d'intérêt: ${data.sector || 'Non spécifié'}
Horizon: ${data.timeline || 'Non spécifié'}`;
    } else {
        // General submission - no specific fields
        specificFields = 'Type d\'utilisateur: Non spécifié';
    }

    const templateParams = {
        to_email: WORKHUB_CONFIG.contactEmail,
        from_name: userType || 'Utilisateur WorkHub',
        user_type: userType || 'Non spécifié',
        sector: data.sector || 'Non spécifié',
        experience: data.experience || 'Non spécifié',
        investment_type: data.investmentType || '',
        amount: data.amount || '',
        interested: data.interested || 'Non spécifié',
        email: data.email || 'Non fourni',
        details: data.details || 'Aucun détail fourni',
        // Additional fields for comprehensive template
        candidat_job_type: data.candidatJobType || '',
        availability: data.availability || '',
        company_size: data.companySize || '',
        hiring_needs: data.hiringNeeds || '',
        urgency: data.urgency || '',
        timeline: data.timeline || '',
        message: `Nouveau lead WorkHub !

Type: ${userType}

${specificFields}

Intéressé: ${data.interested}
Email: ${data.email}

Détails: ${data.details || 'Aucun'}`
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

// Toggle user type fields when user type changes
document.addEventListener('DOMContentLoaded', function() {
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            toggleUserTypeFields(this.value);
        });
    });
});

