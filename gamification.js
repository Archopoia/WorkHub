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
        this.createProgressBar();
        this.createBadgeDisplay();
        this.createQuestLog();
        this.loadProgress();
        this.setupSectionTracking();
        this.setupEasterEggs();
        
        // Initialiser le compteur
        this.updateBadgeCounter();
        console.log('Gamification system initialized'); // Debug
    }

    // Barre de progression en haut du site
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
            </div>
        `;
        document.body.appendChild(progressBar);
    }

    // Affichage des badges collectés
    createBadgeDisplay() {
        const badgeContainer = document.createElement('div');
        badgeContainer.className = 'badge-container';
        badgeContainer.id = 'badgeContainer';
        document.body.appendChild(badgeContainer);
    }

    // Journal de quêtes
    createQuestLog() {
        const questLog = document.createElement('div');
        questLog.className = 'quest-log';
        questLog.id = 'questLog';
        questLog.innerHTML = `
            <div class="quest-log-header" onclick="toggleQuestLog()">
                <span class="quest-log-icon">📜</span>
                <span class="quest-log-title">Quêtes</span>
                <span class="quest-badge-count" id="questBadgeCount">0/${this.totalSections}</span>
            </div>
            <div class="quest-log-content" id="questLogContent">
                <div class="quest-item" data-section="vision">
                    <span class="quest-status">⬜</span>
                    <span class="quest-name">Découvrir le parcours</span>
                </div>
                <div class="quest-item" data-section="probleme">
                    <span class="quest-status">⬜</span>
                    <span class="quest-name">Comprendre le problème</span>
                </div>
                <div class="quest-item" data-section="solution">
                    <span class="quest-status">⬜</span>
                    <span class="quest-name">Explorer la solution</span>
                </div>
                <div class="quest-item" data-section="impact">
                    <span class="quest-status">⬜</span>
                    <span class="quest-name">Mesurer l'impact</span>
                </div>
                <div class="quest-item" data-section="equipe">
                    <span class="quest-status">⬜</span>
                    <span class="quest-name">Rencontrer l'équipe</span>
                </div>
                <div class="quest-item" data-section="contact">
                    <span class="quest-status">⬜</span>
                    <span class="quest-name">Rejoindre l'aventure</span>
                </div>
            </div>
        `;
        document.body.appendChild(questLog);
    }

    // Tracking des sections visitées
    setupSectionTracking() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const sectionId = entry.target.id;
                    if (sectionId && !this.sectionsVisited.has(sectionId)) {
                        console.log('Section visitée:', sectionId); // Debug
                        this.visitSection(sectionId);
                    }
                }
            });
        }, { threshold: [0, 0.3, 0.5, 0.7, 1.0] });

        // Observer toutes les sections principales
        const sections = ['vision', 'probleme', 'solution', 'impact', 'equipe', 'contact'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                observer.observe(section);
                console.log('Observing section:', id); // Debug
            } else {
                console.warn('Section not found:', id); // Debug
            }
        });
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

        // Marquer la quête comme complétée
        this.completeQuest(sectionId);

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
            text.innerHTML = `
                <span class="quest-icon">🎮</span>
                <span>Exploration : ${Math.round(this.progress)}%</span>
            `;
        }
    }

    // Donner un badge
    awardBadge(sectionId) {
        const badges = {
            vision: { icon: '👤', name: 'Explorateur', color: '#FFE692' },
            probleme: { icon: '🔍', name: 'Analyste', color: '#C41E3A' },
            solution: { icon: '💡', name: 'Visionnaire', color: '#FFE692' },
            impact: { icon: '📊', name: 'Stratège', color: '#FFE692' },
            equipe: { icon: '🤝', name: 'Connecteur', color: '#FFE692' },
            contact: { icon: '⚡', name: 'Pionnier', color: '#C41E3A' }
        };

        const badge = badges[sectionId];
        if (!badge) return;

        this.badges.push(badge);

        // Animation du badge
        const badgeElement = document.createElement('div');
        badgeElement.className = 'badge-earned';
        badgeElement.innerHTML = `
            <div class="badge-icon" style="background: ${badge.color};">
                ${badge.icon}
            </div>
            <div class="badge-name">${badge.name}</div>
        `;

        const container = document.getElementById('badgeContainer');
        container.appendChild(badgeElement);

        // Notification
        this.showNotification(`Badge débloqué : ${badge.icon} ${badge.name}!`);

        // Son de réussite (optionnel - simulé visuellement)
        this.playSuccessAnimation(badgeElement);
    }

    // Compléter une quête
    completeQuest(sectionId) {
        const questItem = document.querySelector(`.quest-item[data-section="${sectionId}"]`);
        if (questItem) {
            const status = questItem.querySelector('.quest-status');
            status.textContent = '✅';
            questItem.classList.add('completed');
            console.log('Quête complétée:', sectionId); // Debug
        } else {
            console.warn('Quest item not found for:', sectionId); // Debug
        }

        this.updateBadgeCounter();
    }

    // Mettre à jour le compteur de badges
    updateBadgeCounter() {
        const badgeCount = document.getElementById('questBadgeCount');
        if (badgeCount) {
            badgeCount.textContent = `${this.sectionsVisited.size}/${this.totalSections}`;
            console.log('Compteur mis à jour:', `${this.sectionsVisited.size}/${this.totalSections}`); // Debug
        } else {
            console.warn('Badge count element not found'); // Debug
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
        element.style.animation = 'badgePop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
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
                <h2>🎉 Quête Accomplie ! 🎉</h2>
                <p>Vous avez exploré toute l'aventure WorkHub !</p>
                <p class="celebration-subtitle">Vous êtes maintenant prêt à transformer votre recherche d'emploi en jeu.</p>
                <div class="celebration-badges">
                    ${this.badges.map(b => `<span class="celebration-badge">${b.icon}</span>`).join('')}
                </div>
                <button class="btn btn-primary" onclick="closeCelebration()">Rejoindre l'aventure</button>
            </div>
        `;
        document.body.appendChild(celebration);

        setTimeout(() => {
            celebration.classList.add('show');
        }, 500);

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
        secretBadge.innerHTML = `
            <div class="badge-icon" style="background: linear-gradient(135deg, #FFE692, #C41E3A);">
                🏆
            </div>
            <div class="badge-name">Master Gamer</div>
        `;
        document.getElementById('badgeContainer').appendChild(secretBadge);
        this.playSuccessAnimation(secretBadge);
    }

    // Badge secret
    activateSecretBadge() {
        this.showNotification('🎯 Badge Secret : Chercheur de Secrets !');
        const secretBadge = document.createElement('div');
        secretBadge.className = 'badge-earned secret-badge';
        secretBadge.innerHTML = `
            <div class="badge-icon" style="background: #000;">
                🕵️
            </div>
            <div class="badge-name">Détective</div>
        `;
        document.getElementById('badgeContainer').appendChild(secretBadge);
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
            data.badges?.forEach(badge => {
                const badgeElement = document.createElement('div');
                badgeElement.className = 'badge-earned';
                badgeElement.innerHTML = `
                    <div class="badge-icon" style="background: ${badge.color};">
                        ${badge.icon}
                    </div>
                    <div class="badge-name">${badge.name}</div>
                `;
                document.getElementById('badgeContainer').appendChild(badgeElement);
            });

            // Restaurer les quêtes
            data.sectionsVisited.forEach(sectionId => {
                this.completeQuest(sectionId);
            });
        }
    }
}

// Fonctions globales
function toggleQuestLog() {
    const questLog = document.getElementById('questLog');
    questLog.classList.toggle('open');
}

function closeCelebration() {
    const celebration = document.querySelector('.celebration-modal');
    if (celebration) {
        celebration.classList.remove('show');
        setTimeout(() => celebration.remove(), 300);
    }

    // Rediriger vers le formulaire de contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => showForm('contact'), 500);
    }
}

// Fonction de reset pour développement/test
function resetGameProgress() {
    localStorage.removeItem('workhub_progress');
    localStorage.removeItem('workhub_master_explorer');
    location.reload();
}

// Initialiser le système de gamification au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    window.workHubGame = new WorkHubGameSystem();
    
    // Ajout d'un bouton de reset en mode debug (double-click sur la barre de progression)
    setTimeout(() => {
        const progressBar = document.querySelector('.quest-progress-container');
        if (progressBar) {
            let clickCount = 0;
            progressBar.addEventListener('dblclick', () => {
                clickCount++;
                if (clickCount === 2) {
                    if (confirm('Voulez-vous réinitialiser votre progression ?')) {
                        resetGameProgress();
                    }
                    clickCount = 0;
                }
            });
        }
    }, 1000);
});

