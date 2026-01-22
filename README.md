# Pour nous – Livre Minecraft

Un livre interactif d'amour inspiré de Minecraft, créé avec Svelte 5 et GSAP.

## 🚀 Installation

```bash
npm install
```

## 💻 Développement

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📁 Structure du projet

```
/src
  /assets
    /images        # Illustrations pixel art (page-1.png à page-8.png)
    /sprites       # Sprites animés (heart-sprite.png)
  /components
    ParticleBackground.svelte  # Fond animé avec particules dorées
    BookCover.svelte           # Couverture du livre avec animation d'ouverture
    BookPages.svelte           # Container des pages avec navigation
    PageContent.svelte         # Contenu d'une page (illustration + texte)
    NavigationControls.svelte  # Boutons prev/next + compteur + barre de progression
    FinalChoice.svelte         # Dernière page avec choix "Ce soir / Demain"
  App.svelte                   # Composant principal avec gestion des états
  main.js                      # Point d'entrée
  app.css                      # Styles globaux et variables CSS
  pagesData.js                 # Données des 8 pages du livre
```

## 🎨 Assets à ajouter

Place tes images pixel art dans `/src/assets/images/` :
- `page-1.png` à `page-8.png` (180×180 pixels recommandé)

## ✨ Fonctionnalités

- ✅ Animation d'ouverture de couverture (GSAP)
- ✅ Navigation entre les pages (boutons + flèches clavier)
- ✅ Swipe tactile sur mobile
- ✅ Particules dorées animées
- ✅ Animations de transition entre pages
- ✅ Barre de progression
- ✅ Page finale avec choix interactif
- ✅ Accessibilité (aria-labels, navigation clavier)
- ✅ Responsive (mobile, tablette, desktop)
