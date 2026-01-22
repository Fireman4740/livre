<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let { pages, onclose, onfinal, isOpen } = $props();
  
  let bookEl = $state(null);
  let carouselEl = $state(null);
  let currentPage = $state(0);

  function getParagraphs(page) {
    if (!page) return [];
    if (Array.isArray(page.paragraphs)) return page.paragraphs.filter(Boolean);
    return [page.text, page.text2].filter(Boolean);
  }

  function splitWords(text) {
    return (text ?? "").split(/(\s+)/);
  }

  function getMediaPlacement(page) {
    const value = (page?.mediaPlacement || page?.mediaPosition || "above").toLowerCase();
    if (value === "below" || value === "bottom") return "below";
    if (value === "left") return "left";
    if (value === "right") return "right";
    return "above";
  }

  let textTween = $state(null);

  // Animation d'apparition du texte mot par mot au chargement
  $effect(() => {
    if (isOpen && currentPage === 0) {
      if (!carouselEl) return;

      // Sélectionne uniquement les mots de la première double-page (slide 0)
      const words = carouselEl.querySelectorAll(
        '.carousel-item:first-child .first-page-word'
      );
      if (words.length > 0) {
        textTween?.kill?.();
        textTween = gsap.fromTo(words, 
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.05, 
            ease: "power2.out",
            delay: 0.01 // Petit délai pour laisser le livre apparaître un peu avant
          }
        );
      }
    }
  });

  // Group pages into pairs for the double-page layout
  let doublePages = $derived(pages.reduce((result, value, index, array) => {
    if (index % 2 === 0)
      result.push(array.slice(index, index + 2));
    return result;
  }, []));

  // Determine total slides based on double pages
  let totalSlides = $derived(doublePages.length);

  export function prevPage() {
    if (currentPage > 0 && carouselEl) {
      currentPage--;
      const width = carouselEl.clientWidth;
      carouselEl.scrollTo({ left: currentPage * width, behavior: 'smooth' });
    }
  }

  export function nextPage() {
    if (currentPage < totalSlides - 1 && carouselEl) {
      currentPage++;
      const width = carouselEl.clientWidth;
      carouselEl.scrollTo({ left: currentPage * width, behavior: 'smooth' });
    } else if (currentPage === totalSlides - 1) {
      if (onfinal) onfinal();
    }
  }
</script>

<div class="sprite-wrapper">
  <!-- Book container -->
  <div class="book-container">
    <div class="container">
      <div class="book">
        <!-- Carousel container for scrolling pages -->
        <div class="carousel" bind:this={carouselEl} style="--slides: {totalSlides};">
          <!-- Sprite book background -->
          <div class="sprite"></div>
          
          {#each doublePages as pair, i}
            <div class="carousel-item">
              <div class="page-container">
                <!-- Left Page -->
                <div class="page left-page">
                  <div>
                    {#if pair[0]}
                      {#if pair[0].title}<h2 class="page-title">{pair[0].title}</h2>{/if}

                      {@const placement0 = getMediaPlacement(pair[0])}

                      <div class="page-layout" class:media-above={placement0 === "above"} class:media-below={placement0 === "below"} class:media-left={placement0 === "left"} class:media-right={placement0 === "right"}>
                        {#if pair[0].image}
                          <div class="media-block">
                            <img
                              src={pair[0].image}
                              alt={pair[0].title || ""}
                              class="page-media"
                              loading="lazy"
                            />
                          </div>
                        {/if}

                        <div class="text-block">
                      
                      <!-- Texte animé pour la première double-page, statique pour les autres -->
                      {#if i === 0 && getParagraphs(pair[0]).length}
                        <p class="page-text animated-container">
                          {#each getParagraphs(pair[0]) as para, pIndex}
                            {#each splitWords(para) as word}
                              <span class="first-page-word">{word}</span>
                            {/each}
                            {#if pIndex < getParagraphs(pair[0]).length - 1}
                              <br /><br />
                            {/if}
                          {/each}
                        </p>
                      {:else}
                        {#each getParagraphs(pair[0]) as para}
                          <p class="page-text">{para}</p>
                        {/each}
                      {/if}

                        {#if pair[0].hasHeart}
                          <div class="heart-animation">❤️</div>
                        {/if}
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>

                <!-- Right Page -->
                <div class="page right-page">
                  <div>
                    {#if pair[1]}
                      {#if pair[1].title}<h2 class="page-title">{pair[1].title}</h2>{/if}

                      {@const placement1 = getMediaPlacement(pair[1])}

                      <div class="page-layout" class:media-above={placement1 === "above"} class:media-below={placement1 === "below"} class:media-left={placement1 === "left"} class:media-right={placement1 === "right"}>
                        {#if pair[1].image}
                          <div class="media-block">
                            <img
                              src={pair[1].image}
                              alt={pair[1].title || ""}
                              class="page-media"
                              loading="lazy"
                            />
                          </div>
                        {/if}

                        <div class="text-block">
                      
                       <!-- Texte animé pour la première double-page, statique pour les autres -->
                      {#if i === 0 && getParagraphs(pair[1]).length}
                        <p class="page-text animated-container">
                          {#each getParagraphs(pair[1]) as para, pIndex}
                            {#each splitWords(para) as word}
                              <span class="first-page-word">{word}</span>
                            {/each}
                            {#if pIndex < getParagraphs(pair[1]).length - 1}
                              <br /><br />
                            {/if}
                          {/each}
                        </p>
                      {:else}
                        {#each getParagraphs(pair[1]) as para}
                          <p class="page-text">{para}</p>
                        {/each}
                      {/if}

                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Navigation buttons container -->
  <div class="navigation-controls">
    <!-- Scroll buttons will be added here via CSS pseudo-elements -->
  </div>
</div>

<style>
  .page-layout {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  /* Default: media above text */
  .page-layout.media-above {
    flex-direction: column;
  }

  .page-layout.media-below {
    flex-direction: column;
  }

  .page-layout.media-below .media-block {
    order: 2;
  }

  .page-layout.media-below .text-block {
    order: 1;
  }

  .page-layout.media-left,
  .page-layout.media-right {
    flex-direction: row;
    align-items: flex-start;
  }

  .page-layout.media-right .media-block {
    order: 2;
  }

  .page-layout.media-right .text-block {
    order: 1;
  }

  .media-block {
    flex: 0 0 auto;
  }

  .text-block {
    flex: 1 1 auto;
    min-width: 0;
  }

  .page-media,
  .page-image {
    width: 100%;
    max-height: 160px;
    object-fit: contain;
    image-rendering: pixelated;
    display: block;
    margin: 0 auto 1rem;
  }

  /* When media is left/right, constrain its width so text has room */
  .page-layout.media-left .media-block,
  .page-layout.media-right .media-block {
    width: 42%;
    max-width: 180px;
  }

  .page-layout.media-left .page-media,
  .page-layout.media-right .page-media {
    margin: 0;
    max-height: 140px;
  }
  
  .page-title {
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    color: #1A1410;
    text-align: center;
  }

  .page-text {
    margin: 0;
    white-space: pre-wrap;
    text-align: justify;
  }

  .heart-animation {
    font-size: 2rem;
    animation: pulse 1s infinite;
    text-align: center;
    margin-top: 1rem;
  }

  .btn-close {
    margin-top: 1rem;
    background: var(--accent-blue);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: inherit;
    border-radius: 4px;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
</style>
