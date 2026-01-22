<script>
  import ParticleBackground from "./components/ParticleBackground.svelte";
  import BookCover from "./components/BookCover.svelte";
  import BookPages from "./components/BookPages.svelte";
  import boutonImg from "./assets/images/bouton.png";
  import arrowLeft from "./assets/images/bouton-nav-left.png";
  import arrowRight from "./assets/images/bouton-nav-right.png";
  import pages from "./pagesData.js";

  let stage = $state("cover"); // cover | reading | final
  let isTransitioning = $state(false);
  let pagesVisible = $state(false);
  let isClosing = $state(false);
  
  // Références séparées pour chaque composant
  let bookCoverRef = $state(null);
  let bookPagesRef = $state(null);

  function startOpening() {
    isClosing = false;
    isTransitioning = true;
    pagesVisible = false;
  }

  function handleFlat() {
    // Déclenché exactement quand la couverture est à plat (fin de rotation)
    pagesVisible = true;
  }

  function handleOpened() {
    stage = "reading";
    isClosing = false;
    // Petite pause pour laisser le temps à la transition d'opacité de se faire
    setTimeout(() => {
      isTransitioning = false;
    }, 1600);
  }

  function handleFinal() {
    if (isClosing) return;
    isClosing = true;

    // Déclencher la fermeture : on lance le reverse tout de suite,
    // pendant que le livre sprite fade-out.
    pagesVisible = false;
    isTransitioning = true;

    // Laisser le fondu-out démarrer avant le reverse.
    setTimeout(() => {
      bookCoverRef?.closeBook?.(() => {
        stage = "cover";
        isTransitioning = false;
        isClosing = false;
        pagesVisible = false;
      });
    }, 250);
  }

  function handleChoice(action) {
    console.log("Choix effectué:", action);
    // On pourrait ajouter une animation de fin ici
    stage = "cover"; 
  }

  function closeLivre() {
    stage = "cover";
    isTransitioning = false;
    isClosing = false;
    pagesVisible = false;
  }

  // Navigation clavier globale
  function handleKeydown(event) {
    if (event.key === "Escape" && stage !== "cover") {
      closeLivre();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<main class="app">
  <ParticleBackground />
  <div class="center" >
  <div class="book-container">
    <div
      class="cover-wrapper"
      class:is-opening={isTransitioning}
      class:is-closing={isClosing}
      class:hidden={stage === "reading" && !isTransitioning && !isClosing}
    >
      <BookCover bind:this={bookCoverRef} onopen={handleOpened} onstart={startOpening} onflat={handleFlat} />
    </div>

    {#if stage === "reading" || (isTransitioning && stage === "cover")}
      <div class="pages-wrapper" class:visible={pagesVisible || (stage === "reading" && !isClosing)}>
        <BookPages 
          bind:this={bookPagesRef} 
          {pages} 
          onclose={closeLivre} 
          onfinal={handleFinal}
          isOpen={pagesVisible || stage === "reading"}
        />
      </div>
    {/if}

  </div>

  <!-- Boutons de navigation (séparés du livre) -->
  <div class="navigation-buttons">
    {#if stage === "cover" && !isTransitioning}
      <button 
        class="image-btn" 
        onclick={() => bookCoverRef?.openBook?.()}
        aria-label="Ouvrir le livre"
      >
        <img src={boutonImg} alt="Ouvrir le livre" />
        <span class="btn-text">Ouvrir le livre</span>
      </button>
    {/if}

    {#if stage === "reading" && !isTransitioning && !isClosing}
      <button 
        class="nav-btn prev"
        onclick={() => bookPagesRef?.prevPage?.()}
        aria-label="Page précédente"
        style="background-image: url({arrowLeft});"
      ></button>
      <button 
        class="nav-btn next"
        onclick={() => bookPagesRef?.nextPage?.()}
        aria-label="Page suivante"
        style="background-image: url({arrowRight});"
      ></button>
    {/if}
  </div>
  </div>
</main>

<style>
  .book-container {
    position: relative;
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 2000px;
  }

  .center {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    align-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .cover-wrapper {
    position: absolute;
    z-index: 10;
    transition: transform 1.5s ease-in-out, opacity 0.25s ease-in-out; /* Match cover flip duration */
    transform-origin: center center;
    transform: translateX(-147px); /* Initial state: shift left by half cover width (294/2) */
    opacity: 1;
  }

  /* Pendant la fermeture, on veut la cover déjà alignée sur la tranche (pas de slide) */
  .cover-wrapper.is-closing {
    transition: opacity 0.25s ease-in-out;
  }

  .cover-wrapper.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .cover-wrapper.is-opening {
    /* Shift back to 0 so the spine is at center */
    transform: translateX(0px); 
  }

  @media (max-width: 768px) {
    .cover-wrapper { transform: translateX(-130px); } /* Approx scale adjust */
    .cover-wrapper.is-opening { transform: translateX(0px); }
  }

  @media (max-width: 480px) {
    .cover-wrapper { transform: translateX(-110px); }
    .cover-wrapper.is-opening { transform: translateX(0px); }
  }

  @media (max-width: 375px) {
    .cover-wrapper { transform: translateX(-100px); } 
    .cover-wrapper.is-opening { transform: translateX(0px); }
  }

  .pages-wrapper {
    position: absolute;
    z-index: 5;
    opacity: 0;
    pointer-events: none;
    transition: opacity 1.0s ease-in-out;
  }

  .pages-wrapper.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .navigation-buttons {
    position: absolute;
    bottom: 40px;
    transform: translateX(3px);
    display: flex;
    gap: 3rem;
    align-items: center;
    z-index: 20;
    margin-bottom: 5%;
  }

  .image-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.2s ease, filter 0.2s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-btn img {
    height: 60px;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }
  
  .btn-text {
    position: absolute;
    color: white;
    font-family: var(--font-title, Arial, sans-serif);
    font-size: 1rem;
    font-weight: bold;
    text-shadow: 2px 2px 2px rgba(0,0,0,0.6);
    pointer-events: none;
    padding-bottom: 10px;
  }

  .image-btn:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  .nav-btn {
    width: 64px;
    height: 64px;
    border: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    color: transparent;
    font-size: 0;
    cursor: pointer;
    transition: transform 0.2s ease, filter 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    image-rendering: pixelated;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }

  .nav-btn:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 6px 8px rgba(0,0,0,0.4)) brightness(1.1);
  }
</style>