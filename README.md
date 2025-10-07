# WorkHub - Startup Pitch Website

Une page web de présentation pour WorkHub, la plateforme qui transforme la recherche d'emploi en aventure engageante.

## 📁 Structure des fichiers

```
WorkHub/
├── index.html          # Page HTML principale
├── styles.css          # Styles CSS
├── script.js           # JavaScript pour les interactions
└── README.md          # Ce fichier
```

## 🚀 Comment mettre en ligne sur GitHub Pages

### Étape 1 : Créer un compte GitHub (si vous n'en avez pas)
1. Allez sur [github.com](https://github.com)
2. Cliquez sur "Sign up"
3. Suivez les instructions pour créer votre compte

### Étape 2 : Créer un nouveau repository
1. Une fois connecté, cliquez sur le bouton **"+"** en haut à droite
2. Sélectionnez **"New repository"**
3. Nommez votre repository : `workhub` (ou le nom de votre choix)
4. Laissez-le en **Public**
5. **NE PAS** cocher "Add a README file" (on a déjà les fichiers)
6. Cliquez sur **"Create repository"**

### Étape 3 : Uploader vos fichiers
Vous avez deux options :

#### Option A : Via l'interface web (plus facile pour les débutants)
1. Sur la page du repository que vous venez de créer
2. Cliquez sur **"uploading an existing file"**
3. Glissez-déposez tous les fichiers :
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
4. Cliquez sur **"Commit changes"**

#### Option B : Via Git (ligne de commande)
```bash
# Naviguez vers votre dossier WorkHub
cd /home/hullivan/WorkHub

# Initialisez Git
git init

# Ajoutez tous les fichiers
git add .

# Créez votre premier commit
git commit -m "Initial commit - WorkHub website"

# Ajoutez le repository distant (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/workhub.git

# Poussez vos fichiers
git branch -M main
git push -u origin main
```

### Étape 4 : Activer GitHub Pages
1. Dans votre repository, cliquez sur **"Settings"** (en haut)
2. Dans le menu de gauche, cliquez sur **"Pages"**
3. Sous "Source", sélectionnez **"main"** dans le menu déroulant
4. Cliquez sur **"Save"**

### Étape 5 : Accéder à votre site
Après quelques minutes, votre site sera disponible à l'adresse :
```
https://USERNAME.github.io/workhub/
```
(Remplacez USERNAME par votre nom d'utilisateur GitHub)

## 🎨 Personnalisation

### Ajouter vos images
Les images sont actuellement des placeholders. Pour ajouter vos vraies images :

1. Créez un dossier `images/` dans votre repository
2. Uploadez vos images (formats recommandés : JPG, PNG, WebP)
3. Remplacez les placeholders dans `index.html` :

```html
<!-- Avant -->
<div class="placeholder-image">
    <span>📚 Parcours académique</span>
</div>

<!-- Après -->
<img src="images/votre-image.jpg" alt="Description" style="width: 100%; border-radius: 16px;">
```

### Modifier les couleurs
Dans `styles.css`, modifiez les variables CSS (lignes 7-13) :

```css
:root {
    --color-primary: #1a4d7a;      /* Bleu principal */
    --color-accent: #d4af37;        /* Or/accent */
    --color-background: #fafaf8;    /* Fond */
}
```

### Modifier le texte
Éditez simplement le fichier `index.html` et changez le contenu entre les balises.

### Changer l'email de contact
Ligne 335 de `index.html`, remplacez :
```html
<a href="mailto:contact@workhub.com" class="btn btn-primary btn-large">
```
Par votre vraie adresse email.

## 📱 Fonctionnalités

- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Navigation fluide avec défilement doux
- ✅ Animations au scroll
- ✅ Effets de parallaxe
- ✅ Palette de couleurs professionnelle
- ✅ Typographie moderne (Google Fonts - Inter)
- ✅ Optimisé pour le référencement (SEO)

## 🔧 Support des navigateurs

- Chrome/Edge (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)
- Navigateurs mobiles (iOS Safari, Chrome Android)

## 📝 Notes importantes

1. **Images** : Pensez à ajouter vos vraies images pour un rendu professionnel
2. **Email** : Changez l'adresse email de contact
3. **Analytics** : Vous pouvez ajouter Google Analytics si besoin
4. **Domaine personnalisé** : GitHub Pages permet d'utiliser votre propre nom de domaine

## 🎯 Prochaines étapes

1. ✅ Upload des fichiers sur GitHub
2. ⬜ Activer GitHub Pages
3. ⬜ Ajouter les vraies images
4. ⬜ Tester sur différents appareils
5. ⬜ Partager le lien avec GENILEM

## 🆘 Besoin d'aide ?

- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Guide Git pour débutants](https://guides.github.com/introduction/git-handbook/)

---

**WorkHub** - Transformons la recherche d'emploi en aventure ! 🚀

