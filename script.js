// WorkHub - JavaScript for interactive features

// Initialize EmailJS
(function() {
    emailjs.init("Zx7ekz9X_dS5zlD58"); // Replace with your EmailJS public key
})();

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

    // Log page load for analytics (placeholder)
    console.log('WorkHub website loaded successfully! 🚀');

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
            // Reset investor fields first
            toggleInvestorFields(false);

            const event = window.event || {};
            const buttonText = event.target ? event.target.textContent : '';
            if (buttonText.includes('candidat')) {
                const candidatRadio = form.querySelector('input[value="candidat"]');
                if (candidatRadio) {
                    candidatRadio.checked = true;
                    toggleInvestorFields(false);
                }
            } else if (buttonText.includes('entreprise')) {
                const entrepriseRadio = form.querySelector('input[value="entreprise"]');
                if (entrepriseRadio) {
                    entrepriseRadio.checked = true;
                    toggleInvestorFields(false);
                }
            } else if (buttonText.includes('investisseur')) {
                const investisseurRadio = form.querySelector('input[value="investisseur"]');
                if (investisseurRadio) {
                    investisseurRadio.checked = true;
                    toggleInvestorFields(true);
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

    // Reset investor fields
    toggleInvestorFields(false);
}

function toggleInvestorFields(show) {
    const investorFields = document.getElementById('investorFields');
    const investorAmount = document.getElementById('investorAmount');

    if (investorFields && investorAmount) {
        if (show) {
            investorFields.style.display = 'block';
            investorAmount.style.display = 'block';
            // Make fields required
            const investmentTypeRadios = investorFields.querySelectorAll('input[name="investmentType"]');
            const amountRadios = investorAmount.querySelectorAll('input[name="amount"]');
            investmentTypeRadios.forEach(radio => radio.setAttribute('required', 'required'));
            amountRadios.forEach(radio => radio.setAttribute('required', 'required'));
        } else {
            investorFields.style.display = 'none';
            investorAmount.style.display = 'none';
            // Remove required attribute
            const investmentTypeRadios = investorFields.querySelectorAll('input[name="investmentType"]');
            const amountRadios = investorAmount.querySelectorAll('input[name="amount"]');
            investmentTypeRadios.forEach(radio => {
                radio.removeAttribute('required');
                radio.checked = false;
            });
            amountRadios.forEach(radio => {
                radio.removeAttribute('required');
                radio.checked = false;
            });
        }
    }
}

function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Prepare email template parameters
    const templateParams = {
        to_email: 'hugues.ii.w.b.depingon@gmail.com',
        from_name: data.userType || 'Utilisateur WorkHub',
        user_type: data.userType || 'Non spécifié',
        sector: data.sector || 'Non spécifié',
        experience: data.experience || 'Non spécifié',
        interested: data.interested || 'Non spécifié',
        email: data.email || 'Non fourni',
        details: data.details || 'Aucun détail fourni',
        investment_type: data.investmentType || 'Non spécifié',
        amount: data.amount || 'Non spécifié',
        message: `Nouveau lead WorkHub !

Type: ${data.userType}
Secteur: ${data.sector}
Expérience: ${data.experience}
Intéressé: ${data.interested}
Email: ${data.email}

${data.userType === 'investisseur' ? `Type d'investissement: ${data.investmentType || 'Non spécifié'}
Montant: ${data.amount || 'Non spécifié'}` : ''}

Détails: ${data.details || 'Aucun'}`
    };

    // Send email using EmailJS
    emailjs.send('service_95ikcg4', 'template_p5z847d', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            alert('Merci ! Nous vous contacterons bientôt pour l\'aventure WorkHub !');
            hideForm();
            event.target.reset();
        }, function(error) {
            console.log('Failed to send email:', error);
            alert('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
        });
}

function submitInterview(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Collect checkbox values
    const questTypes = formData.getAll('questTypes');
    const rewards = formData.getAll('rewards');

    // Prepare email template parameters
    const templateParams = {
        to_email: 'hugues.ii.w.b.depingon@gmail.com',
        from_name: 'Utilisateur Interview WorkHub',
        quest_types: questTypes.join(', ') || 'Aucun sélectionné',
        duration: data.duration || 'Non spécifié',
        difficulty: data.difficulty || 'Non spécifié',
        rewards: rewards.join(', ') || 'Aucun sélectionné',
        quest_idea: data.questIdea || 'Aucune idée fournie',
        email: data.email || 'Non fourni',
        message: `Nouvelle idée de quête WorkHub !

Types de quêtes: ${questTypes.join(', ')}
Durée: ${data.duration}
Difficulté: ${data.difficulty}
Récompenses: ${rewards.join(', ')}
Idée: ${data.questIdea || 'Aucune'}
Email: ${data.email || 'Non fourni'}`
    };

    // Send email using EmailJS
    emailjs.send('service_95ikcg4', 'template_ejlclnl', templateParams)
        .then(function(response) {
            console.log('Interview email sent successfully!', response.status, response.text);
            alert('Merci pour vos idées ! Elles nous aideront à créer les meilleures quêtes WorkHub !');
            hideForm();
            event.target.reset();
        }, function(error) {
            console.log('Failed to send interview email:', error);
            alert('Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
        });
}

// Close form on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideForm();
    }
});

// Toggle investor fields when user type changes
document.addEventListener('DOMContentLoaded', function() {
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'investisseur') {
                toggleInvestorFields(true);
            } else {
                toggleInvestorFields(false);
            }
        });
    });
});

