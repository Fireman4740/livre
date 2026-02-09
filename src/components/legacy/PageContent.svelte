<script>
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  let { page, onclose, isLastPage } = $props();
  
  let pageEl = $state(null);

  onMount(() => {
    if (pageEl) {
      gsap.set(pageEl, { opacity: 0, x: 30 });
    }
  });

  // Réagir aux changements de page
  $effect(() => {
    if (page && pageEl) {
      gsap.to(pageEl, 
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  });
</script>

<article class="page-wrap" bind:this={pageEl}>
  <div class="illustration-container">
    {#if page.image}
      <img 
        class="illustration" 
        src={page.image} 
        alt={page.title}
        loading="lazy"
      />
    {:else}
      <div class="illustration-placeholder" aria-hidden="true">
        <span>📖</span>
      </div>
    {/if}
  </div>
  
  <div class="text-content">
    <h2 class="page-title">{page.title}</h2>
    <p class="page-text">{page.text}</p>
  </div>

  {#if page.hasHeart}
    <div class="heart-animation" aria-label="Cœur animé">
      ❤️
    </div>
  {/if}

  
</article>

<style>
  .page-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    max-width: 420px;
    width: 100%;
    background: var(--paper, #F5EFE1);
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    color: var(--text-dark, #1A1410);
    min-height: 480px;
  }

  .illustration-container {
    width: 180px;
    height: 180px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow: hidden;
  }

  .illustration {
    width: 100%;
    height: 100%;
    object-fit: contain;
    image-rendering: pixelated;
  }

  .illustration-placeholder {
    font-size: 4rem;
    opacity: 0.5;
  }

  .text-content {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .page-title {
    font-family: var(--font-title, Arial, sans-serif);
    font-size: 1.5rem;
    margin: 0 0 16px 0;
    color: var(--text-dark, #1A1410);
  }

  .page-text {
    font-family: var(--font-body, Georgia, serif);
    font-size: 1rem;
    line-height: 1.7;
    margin: 0;
    color: var(--text-dark, #1A1410);
  }

  .heart-animation {
    font-size: 2.5rem;
    margin-top: 16px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .btn-close {
    margin-top: 20px;
    background: var(--accent-blue);
    color: white;
    border: none;
    padding: var(--btn-padding);
    border-radius: var(--btn-radius);
    font-family: var(--font-title);
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-close:hover {
    background: var(--accent-blue-hover);
    transform: scale(1.05);
  }

  .btn-close:active {
    transform: scale(0.98);
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  @media (max-width: 768px) {
    .page-wrap {
      padding: 16px;
      min-height: 400px;
      max-width: 320px;
    }

    .illustration-container {
      width: 140px;
      height: 140px;
    }

    .page-title {
      font-size: 1.25rem;
    }

    .page-text {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .page-wrap {
      padding: 12px;
      min-height: 350px;
      max-width: 100%;
      margin: 0 8px;
      border-radius: 6px;
    }

    .illustration-container {
      width: 120px;
      height: 120px;
      margin-bottom: 12px;
    }

    .page-title {
      font-size: 1.1rem;
      margin-bottom: 8px;
    }

    .page-text {
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .heart-animation {
      font-size: 2rem;
      margin-top: 12px;
    }
  }

  @media (max-width: 375px) {
    .page-wrap {
      padding: 10px;
      min-height: 300px;
      max-width: calc(100% - 16px);
      margin: 0 8px;
    }

    .illustration-container {
      width: 100px;
      height: 100px;
      margin-bottom: 10px;
    }

    .page-title {
      font-size: 1rem;
      margin-bottom: 6px;
    }

    .page-text {
      font-size: 0.8rem;
      line-height: 1.5;
    }

    .heart-animation {
      font-size: 1.75rem;
      margin-top: 8px;
    }
  }
</style>
