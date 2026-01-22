<script>
  import { onMount } from "svelte";
  
  let container = $state(null);

  onMount(() => {
    if (!container) return;
    
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 12 + "s";
      particle.style.animationDuration = (8 + Math.random() * 8) + "s";
      container.appendChild(particle);
    }
  });
</script>

<div bind:this={container} class="particles-bg" aria-hidden="true"></div>

<style>
  .particles-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  :global(.particle) {
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--particle-gold, rgba(212, 175, 55, 0.35));
    border-radius: 50%;
    top: -10px;
    animation: fall 12s linear infinite;
    box-shadow: 0 0 6px 2px rgba(212, 175, 55, 0.2);
  }

  @keyframes fall {
    0% {
      transform: translateY(-50px) scale(0.8);
      opacity: 0.2;
    }
    10% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.6;
    }
    90% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(110vh) scale(1.3);
      opacity: 0;
    }
  }
</style>
