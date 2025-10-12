// WorkHub Website Gamification System
// Transform the website navigation into a quest experience

class WorkHubGameSystem {
    constructor() {
        this.progress = 0;
        this.sectionsVisited = new Set();
        this.badges = [];
        this.totalSections = 6; // vision, probleme, solution, impact, equipe, contact
        this.init();
    }

    init() {
        // Initialiser le mapping AVANT tout
        this.navMapping = {
            'vision': 'a[href="#vision"]',
            'probleme': 'a[href="#probleme"]',
            'solution': 'a[href="#solution"]',
            'impact': 'a[href="#impact"]',
            'equipe': 'a[href="#equipe"]',
            'contact': 'a[href="#contact"]'
        };

        this.createProgressBar();
        this.createBadgeDisplay();
        this.loadProgress();
        this.setupSectionTracking();
        this.setupEasterEggs();

        console.log('Gamification system initialized'); // Debug
    }

    // Barre de progression avec badges intégrés
    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'quest-progress-bar';
        progressBar.innerHTML = `
            <div class="quest-progress-container">
                <div class="quest-progress-fill" id="questProgressFill"></div>
                <div class="quest-progress-text" id="questProgressText">
                    <span class="quest-icon">🎮</span>
                    <span>Exploration : 0%</span>
                </div>
                <div class="badge-container" id="badgeContainer"></div>
            </div>
        `;
        document.body.appendChild(progressBar);
        console.log('Progress bar créée, badge container créé');
    }

    // Affichage des badges (maintenant intégré dans la barre)
    createBadgeDisplay() {
        // Les badges sont créés directement dans createProgressBar
    }


    // Tracking des sections visitées
    setupSectionTracking() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
                    const sectionId = entry.target.id;
                    if (sectionId && !this.sectionsVisited.has(sectionId)) {
                        console.log('Section visitée:', sectionId, 'Ratio:', entry.intersectionRatio); // Debug
                        this.visitSection(sectionId);
                    }
                }
            });
        }, { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7] });

        // Observer toutes les sections principales (sauf contact qui nécessite une action)
        const sections = ['vision', 'probleme', 'solution', 'impact', 'equipe'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                observer.observe(section);
                console.log('Observing section:', id, 'Element:', section); // Debug
            } else {
                console.warn('Section not found:', id); // Debug
            }
        });

        // Fallback: détecter aussi au scroll (sauf contact)
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                sections.forEach(id => {
                    const section = document.getElementById(id);
                    if (section && this.isInViewport(section) && !this.sectionsVisited.has(id)) {
                        console.log('Section détectée au scroll:', id); // Debug
                        this.visitSection(id);
                    }
                });
            }, 200);
        });
    }

    // Vérifier si un élément est dans le viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return (vertInView && horInView);
    }

    // Marquer une section comme visitée
    visitSection(sectionId) {
        if (this.sectionsVisited.has(sectionId)) return;

        this.sectionsVisited.add(sectionId);
        this.progress = (this.sectionsVisited.size / this.totalSections) * 100;

        // Mettre à jour la barre de progression
        this.updateProgressBar();

        // Donner un badge
        this.awardBadge(sectionId);

        // Colorier le lien de navigation
        this.colorizeNavLink(sectionId);

        // Sauvegarder la progression
        this.saveProgress();

        // Animation spéciale si toutes les sections sont visitées
        if (this.sectionsVisited.size === this.totalSections) {
            this.celebrateCompletion();
        }
    }

    // Mettre à jour la barre de progression
    updateProgressBar() {
        const fill = document.getElementById('questProgressFill');
        const text = document.getElementById('questProgressText');

        if (fill) {
            fill.style.width = `${this.progress}%`;
        }

        if (text) {
            if (this.progress >= 100) {
                text.innerHTML = `
                    <span style="cursor: pointer;">Reset Progression</span>
                `;
                text.style.cursor = 'pointer';
                text.onclick = () => {
                    if (confirm('Voulez-vous réinitialiser votre progression et recommencer l\'aventure ?')) {
                        resetGameProgress();
                    }
                };
            } else {
                text.innerHTML = `
                    <span>Exploration : ${Math.round(this.progress)}%</span>
                `;
                text.style.cursor = 'default';
                text.onclick = null;
            }
        }
    }

    // Donner un badge
    awardBadge(sectionId) {
        const badges = {
            vision: { icon: '👤', name: ' ', color: '#000000' },
            probleme: { icon: '🔍', name: ' ', color: '#000000' },
            solution: { icon: '💡', name: ' ', color: '#000000' },
            impact: { icon: '📊', name: ' ', color: '#000000' },
            equipe: { icon: '🤝', name: ' ', color: '#000000' },
            contact: { icon: '⚡', name: ' ', color: '#000000' }
        };

        const badge = badges[sectionId];
        if (!badge) return;

        this.badges.push(badge);

        // Animation du badge
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge-earned';
        badgeElement.title = badge.name; // Tooltip
        badgeElement.innerHTML = `
            <div class="badge-icon" style="background: ${badge.color};">
                ${badge.icon}
            </div>
        `;

        const container = document.getElementById('badgeContainer');
        if (container) {
            container.appendChild(badgeElement);
            console.log('Badge ajouté:', badge.icon, 'Container enfants:', container.children.length);
        } else {
            console.error('Badge container not found!');
        }

        // Notification
        this.showNotification(`Étape accomplie : ${badge.icon}`);

        // Son de réussite (optionnel - simulé visuellement)
        this.playSuccessAnimation(badgeElement);
    }

    // Colorier le lien de navigation
    colorizeNavLink(sectionId) {
        const selector = this.navMapping[sectionId];
        if (selector) {
            const navLink = document.querySelector(selector);
            if (navLink) {
                navLink.classList.add('quest-completed');
                console.log('Nav link colorisé:', sectionId); // Debug
            } else {
                console.warn('Nav link not found for:', selector); // Debug
            }
        }
    }

    // Notification de succès
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'quest-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Animation de succès
    playSuccessAnimation(element) {
        element.style.animation = 'badgePop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
    }

    // Célébration de fin
    celebrateCompletion() {
        // Confettis
        this.createConfetti();

        // Message de félicitations
        const celebration = document.createElement('div');
        celebration.className = 'celebration-modal';
        celebration.innerHTML = `
            <div class="celebration-content">
                <h2>Vous avez exploré toute la proposition !</h2>
                <p>Merci de votre intérêt pour WorkHub</p>
                <div class="celebration-badges">
                    ${this.badges.map(b => `<span class="celebration-badge">${b.icon}</span>`).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(celebration);

        setTimeout(() => {
            celebration.classList.add('show');
        }, 500);

        // Fermer automatiquement après 3 secondes
        setTimeout(() => {
            celebration.classList.remove('show');
            setTimeout(() => celebration.remove(), 300);
        }, 3500);

        // Sauvegarder l'achievement
        localStorage.setItem('workhub_master_explorer', 'true');
    }

    // Effet confettis
    createConfetti() {
        const colors = ['#FFE692', '#C41E3A', '#FFFFFF', '#D4AF37'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }

    // Easter Eggs
    setupEasterEggs() {
        // Konami Code (↑↑↓↓←→←→BA)
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > 10) konamiCode.shift();

            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                this.activateKonamiCode();
            }
        });

        // Double-click sur le logo
        const logo = document.querySelector('.nav-brand');
        if (logo) {
            let clickCount = 0;
            logo.addEventListener('click', () => {
                clickCount++;
                if (clickCount === 5) {
                    this.activateSecretBadge();
                    clickCount = 0;
                }
                setTimeout(() => { clickCount = 0; }, 2000);
            });
        }
    }

    // Activation Konami Code
    activateKonamiCode() {
        this.showNotification('🎮 Konami Code activé ! Badge Secret débloqué !');
        const secretBadge = document.createElement('div');
        secretBadge.className = 'badge-earned secret-badge';
        secretBadge.title = 'Master Gamer';
        secretBadge.innerHTML = `
            <div class="badge-icon" style="background: #000000;">
                🏆
            </div>
        `;
        const container = document.getElementById('badgeContainer');
        if (container) {
            container.appendChild(secretBadge);
            console.log('Badge secret Konami ajouté');
        }
        this.playSuccessAnimation(secretBadge);
    }

    // Badge secret
    activateSecretBadge() {
        this.showNotification('🎯 Badge Secret : Chercheur de Secrets !');
        const secretBadge = document.createElement('div');
        secretBadge.className = 'badge-earned secret-badge';
        secretBadge.title = 'Détective';
        secretBadge.innerHTML = `
            <div class="badge-icon" style="background: #000000;">
                🕵️
            </div>
        `;
        const container = document.getElementById('badgeContainer');
        if (container) {
            container.appendChild(secretBadge);
            console.log('Badge secret Détective ajouté');
        }
        this.playSuccessAnimation(secretBadge);
    }

    // Sauvegarder la progression
    saveProgress() {
        localStorage.setItem('workhub_progress', JSON.stringify({
            sectionsVisited: Array.from(this.sectionsVisited),
            progress: this.progress,
            badges: this.badges
        }));
    }

    // Charger la progression
    loadProgress() {
        const saved = localStorage.getItem('workhub_progress');
        if (saved) {
            const data = JSON.parse(saved);
            this.sectionsVisited = new Set(data.sectionsVisited);
            this.progress = data.progress;
            this.badges = data.badges || [];

            this.updateProgressBar();

            // Restaurer les badges
            console.log('Restauration des badges:', data.badges?.length || 0);
            data.badges?.forEach((badge, index) => {
                const badgeElement = document.createElement('div');
                badgeElement.className = 'badge-earned badge-restored';
                badgeElement.title = badge.name;
                badgeElement.innerHTML = `
                    <div class="badge-icon" style="background: ${badge.color};">
                        ${badge.icon}
                    </div>
                `;
                const container = document.getElementById('badgeContainer');
                if (container) {
                    container.appendChild(badgeElement);
                    console.log(`Badge ${index + 1} restauré:`, badge.icon);
                }
            });

            // Restaurer les liens de navigation colorisés
            data.sectionsVisited.forEach(sectionId => {
                this.colorizeNavLink(sectionId);
            });
        }
    }
}

// Fonctions globales
function closeCelebration() {
    const celebration = document.querySelector('.celebration-modal');
    if (celebration) {
        celebration.classList.remove('show');
        setTimeout(() => celebration.remove(), 300);
    }
}

// Fonction publique pour débloquer le badge contact après envoi de formulaire
function unlockContactBadge() {
    if (window.workHubGame) {
        window.workHubGame.visitSection('contact');
        console.log('Badge contact débloqué via formulaire');
    }
}

// Fonction de reset pour développement/test
function resetGameProgress() {
    // Scroll to top of page first
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Wait for scroll animation to complete, then reset
    setTimeout(() => {
        localStorage.removeItem('workhub_progress');
        localStorage.removeItem('workhub_master_explorer');
        location.reload();
    }, 800); // 800ms delay to allow smooth scroll to complete
}

// Initialiser le système de gamification au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    window.workHubGame = new WorkHubGameSystem();
});

