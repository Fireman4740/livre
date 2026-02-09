# Pour nous - Livre Minecraft

Livre interactif d'amour construit avec Svelte 5, Vite et GSAP.

## Installation

```bash
npm install
```

## Developpement

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Architecture

```text
/public
  /myvalentine
    index.html                 # Sous-page accessible via /livre/myvalentine
  saint-valentin.html          # Redirection legacy vers /myvalentine
  robots.txt

/src
  /assets
    /images                    # Images du livre
    /sprites                   # Sprites/animations
  /components
    /background
      ParticleBackground.svelte
    /book
      BookCover.svelte
      BookPages.svelte
    /legacy
      NavigationControls.svelte
      PageContent.svelte
  /data
    book-pages.js              # Contenu texte/images des pages du livre
  /styles
    app.css                    # Styles globaux
  App.svelte                   # Orchestration de l'experience
  main.js                      # Point d'entree
```

## URLs

- App principale: `/livre/`
- Sous-page Saint-Valentin: `/livre/myvalentine`

## Notes

- Le projet reste volontairement sans routeur SPA: la sous-page est statique (`public/myvalentine/index.html`).
- Les composants `src/components/legacy` sont conserves pour reference, mais non utilises dans l'application actuelle.
