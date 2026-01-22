<script>
  import arrowLeft from "../assets/images/bouton-nav-left.png";
  import arrowRight from "../assets/images/bouton-nav-right.png";

  let { activeIndex, total, onprev, onnext } = $props();

  function handleKeydown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (activeIndex > 0 && onprev) onprev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      if (onnext) onnext();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="controls" aria-label="Navigation du livre">
  <button 
    class="nav-btn prev"
    onclick={onprev}
    disabled={activeIndex === 0}
    aria-label="Page précédente"
    style="background-image: url({arrowLeft});"
  ></button>
  
  <span class="counter" aria-live="polite" aria-atomic="true">
    {activeIndex + 1} / {total}
  </span>
  
  <button 
    class="nav-btn next"
    onclick={onnext}
    aria-label="Page suivante"
    style="background-image: url({arrowRight});"
  ></button>
</nav>

<div class="progress-container" role="progressbar" aria-valuenow={activeIndex + 1} aria-valuemin="1" aria-valuemax={total}>
  <div class="progress-bar">
    <div 
      class="progress-fill" 
      style="width: {((activeIndex + 1) / total) * 100}%"
    ></div>
  </div>
</div>

<style>
  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 24px;
  }

  .nav-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid var(--paper, #F5EFE1);
    background: transparent;
    color: var(--paper, #F5EFE1);
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s ease, filter 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    image-rendering: pixelated;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }

  .nav-btn:hover:not(:disabled) {
    transform: scale(1.1);
    filter: drop-shadow(0 6px 8px rgba(0,0,0,0.4)) brightness(1.1);
  }

  .nav-btn:active:not(:disabled) {
    transform: scale(0.95);
  }

  .nav-btn:disabled {
    opacity: 0.5;
    filter: grayscale(1);
    cursor: not-allowed ;
    background: var(--paper, #F5EFE1);
    color: var(--text-dark, #1A1410);
  }

  .nav-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .counter {
    font-family: var(--font-title, Arial, sans-serif);
    font-size: 1.1rem;
    color: var(--paper, #F5EFE1);
    min-width: 60px;
    text-align: center;
  }

  .progress-container {
    margin-top: 16px;
    width: 100%;
    max-width: 300px;
  }

  .progress-bar {
    height: 4px;
    background: rgba(245, 239, 225, 0.2);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--accent-blue, #5B9BD5);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  @media (max-width: 768px) {
    .nav-btn {
      width: 56px;
      height: 56px;
      font-size: 1.75rem;
    }
  }

  @media (max-width: 480px) {
    .controls {
      gap: 16px;
      margin-top: 16px;
    }

    .nav-btn {
      width: 48px;
      height: 48px;
      font-size: 1.25rem;
    }

    .counter {
      font-size: 0.95rem;
    }

    .progress-container {
      max-width: 240px;
    }
  }

  @media (max-width: 375px) {
    .controls {
      gap: 12px;
      margin-top: 12px;
    }

    .nav-btn {
      width: 44px;
      height: 44px;
      font-size: 1.1rem;
      border-width: 1.5px;
    }

    .counter {
      font-size: 0.85rem;
      min-width: 50px;
    }

    .progress-container {
      max-width: 200px;
    }

    .progress-bar {
      height: 3px;
    }
  }
</style>
