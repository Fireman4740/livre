<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let { pages, onclose, onfinal, isOpen } = $props();
  
  let bookEl = $state(null);
  let carouselEl = $state(null);
  let currentPage = $state(0);

  // Animation d'apparition du texte mot par mot au chargement
  $effect(() => {
    if (isOpen && currentPage === 0) {
      // Sélectionne tous les mots de la première double page
      const words = document.querySelectorAll('.first-page-word');
      if (words.length > 0) {
        gsap.fromTo(words, 
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
                      {#if pair[0].image}<img src={pair[0].image} alt={pair[0].title || ""} class="page-image" />{/if}
                      
                      <!-- Texte animé pour la première page, statique pour les autres -->
                      {#if i === 0 && pair[0].text}
                        <p class="page-text animated-container">
                          {#each pair[0].text.split(/(\s+)/) as word}
                             <span class="first-page-word">{word}</span>
                          {/each}
                          {#each pair[0].text2.split(/(\s+)/) as word}
                             <span class="first-page-word">{word}</span>
                          {/each}
                        </p>
                      {:else}
                        <p class="page-text">{pair[0].text}</p>
                        <p class="page-text">{pair[0].text2}</p>
                      {/if}

                      {#if pair[0].hasHeart}
                        <div class="heart-animation">❤️</div>
                      {/if}
                    {/if}
                  </div>
                </div>

                <!-- Right Page -->
                <div class="page right-page">
                  <div>
                    {#if pair[1]}
                      {#if pair[1].title}<h2 class="page-title">{pair[1].title}</h2>{/if}
                      {#if pair[1].image}<img src={pair[1].image} alt={pair[1].title || ""} class="page-image" />{/if}
                      
                       <!-- Texte animé pour la première page, statique pour les autres -->
                      {#if i === 0 && pair[1].text}
                        <p class="page-text animated-container">
                          {#each pair[1].text.split(/(\s+)/) as word}
                             <span class="first-page-word">{word}</span>
                          {/each}
                          {#each pair[1].text2.split(/(\s+)/) as word}
                             <span class="first-page-word">{word}</span>
                          {/each}
                        </p>
                      {:else}
                        <p class="page-text">{pair[1].text}</p>
                        <p class="page-text">{pair[1].text2}</p>
                      {/if}

                     
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
  .page-image {
    width: 100%;
    max-height: 150px;
    object-fit: contain;
    image-rendering: pixelated;
    display: block;
    margin-bottom: 1rem;
  }
  
  .page-title {
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    color: #1A1410;
  }

  .page-text {
    margin: 0;
    white-space: pre-wrap;
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
