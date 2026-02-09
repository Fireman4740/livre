<script>
  import { gsap } from "gsap";
  import coverImg from "../../assets/images/coverbok.png";
  import leftPageImg from "../../assets/images/left-page.png";
  import rightPageImg from "../../assets/images/right-page.png";

  let { onopen, onstart, onflat } = $props();
  
  let cover = $state(null);
  let assembly = $state(null);
  let isOpening = $state(false);

  export function openBook() {
    if (isOpening) return;
    isOpening = true;
    if (onstart) onstart();
    
    const tl = gsap.timeline({
      onComplete: () => {
        if (onopen) onopen();
      }
    });

    // Center the book while opening (moves from centered cover to centered spine)
    // Handled by parent container transition
    /* tl.to(assembly, {
      x: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0); */

    // Flip cover
    tl.to(cover, {
      rotateY: -180,
      duration: 1.5,
      ease: "power2.inOut"
    });

    // Exactly when the cover is fully open (flat)
    tl.call(() => {
      if (onflat) onflat();
    });

    // Hide the cover assembly instantly after flat
    // tl.set(assembly, { display: "none" });
  }

  export function closeBook(onComplete) {
    const tl = gsap.timeline({
      onComplete: () => {
        isOpening = false;
        if (onComplete) onComplete();
      }
    });

    tl.to(cover, {
      rotateY: 0,
      duration: 1.5,
      ease: "power2.inOut"
    });
  }
</script>

<div class="cover-container">
  <div class="book-assembly" bind:this={assembly}>
    <!-- Page de droite (fixe, apparaît quand la couverture s'ouvre) -->
    <div class="right-page-under" style="background-image: url({rightPageImg});"></div>

    <!-- Couverture (mobile) -->
    <div 
      class="cover" 
      bind:this={cover}
      role="img"
      aria-label="Couverture du livre Pour nous"
    >
      <!-- Face Avant -->
      <div 
        class="cover-face front" 
        style="background-image: url({coverImg});"
      >
        <div class="cover-content">
          <h1 class="title">Pour Agathe</h1>
          <p class="subtitle">Un message d'amour</p>
        </div>
      </div>
      <!-- Face Arrière (intérieur gauche) -->
      <div class="cover-face back" style="background-image: url({leftPageImg});"></div>
    </div>
  </div>
</div>

<style>
  .cover-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    z-index: 1;
    perspective: 1500px;
  }

  .book-assembly {
    position: relative;
    width: 700px;
    height: 535px;
    /* This allows the children (cover, page) to stack properly */
    transform-style: preserve-3d;

  }

  .cover {
    width: 350px;
    height: 460px;
    transform-style: preserve-3d;
    transform-origin: left center;
    position: absolute; /* Changed to absolute to stack with right page */
    left: 50%; /* Start from the exact center (spine) */
    top: 0;
    z-index: 2;
  }

  .right-page-under {
    width: 346px;
    height: 485px;
    position: absolute;
    left: 50%; /* Position right page next to left page (at spine) */
    top: 0;
    z-index: 1;
    background-size: cover;
    background-position: center;
    box-shadow: 
      inset -10px 0 20px rgba(0,0,0,0.1); /* Spine shadow on right */
    border-radius: 4px 12px 12px 4px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cover-face {
    position: absolute;
    height: 489px;
    inset: 0;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 15px 25px rgba(0,0,0,0.5); /* Moved shadow here */
  }

  .front {
    background-size: cover;
    background-position: center;
    z-index: 2;
  }

  .back {
     /* Updated paper color */
    transform: rotateY(180deg);
    background-size: cover;
    background-position: center;
    /* Shadow for inner spine */
    box-shadow: 
      inset -10px 0 20px rgba(0,0,0,0.1); 
    border-radius: 12px 4px 4px 12px;
    border: none;
  }

  .cover::before {
    content: none;
    /* Removed CSS decoration
    position: absolute;
    left: 0;
    top: 10%;
    bottom: 10%;
    width: 3px;
    background: linear-gradient(to bottom, 
      transparent, 
      rgba(212, 175, 55, 0.3) 20%,
      rgba(212, 175, 55, 0.5) 50%,
      rgba(212, 175, 55, 0.3) 80%,
      transparent
    ); */
  }

  .cover-content {
    text-align: center;
    padding: 24px;
    margin-bottom: 50px;
  }

  .title {
    font-family: var(--font-title);
    font-size: 1.2rem;
    color: #2C1810;
    margin: 0 12px 0;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.4);
    letter-spacing: 2px;
    margin-left: 52px;
  }

  .subtitle {
    font-family: var(--font-body, Georgia, serif);
    font-size: 1.1rem;
    color: #4A3510; /* Lighter brown */
    margin: 0;
    font-style: italic;
    opacity: 1; /* Make it fully opaque */
    font-weight: 500;
    margin-left: 35px;
  }

  @media (max-width: 768px) {


    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .cover-container {
      gap: 16px;
    }

    .cover {
      width: 260px;
      height: 360px;
    }

    .title {
      font-size: 1.5rem;
      letter-spacing: 1px;
    }

    .subtitle {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 375px) {
    .cover-container {
      gap: 12px;
      padding: 0 8px;
    }

    .cover {
      width: 240px;
      height: 330px;
    }

    .cover-content {
      padding: 16px;
    }

    .title {
      font-size: 1.25rem;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 0.8rem;
    }
  }
</style>
