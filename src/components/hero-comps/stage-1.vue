<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl.fromTo("#wireframe", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
    .to("#wireframe", { opacity: 0, y: -30, duration: 0.6 }, "+=0.4")

    .fromTo("#lofi", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "<")
    .to("#lofi", { opacity: 0, y: -30, duration: 0.6 }, "+=0.4")

    .fromTo("#hifi", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "<")

    .fromTo("#feedback", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 });

  // Parallax hover effect
  const preview = document.querySelector(".preview");

  preview.addEventListener("mousemove", (e) => {
    const rect = preview.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(".stage", {
      x: x * 20,
      y: y * 20,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to("#feedback", {
      x: x * 15,
      y: y * 15,
      duration: 0.4,
    });
  });

  preview.addEventListener("mouseleave", () => {
    gsap.to(".stage", { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
    gsap.to("#feedback", { x: 0, y: 0, duration: 0.6 });
  });
});
</script>

<template>
  <div class="w-full flex justify-center py-16 md:py-24">
    <div class="preview relative w-[90vw] md:w-[40vw] max-w-[900px] aspect-[1200/700] neon-container">

      <!-- Stage 1: Wireframe -->
      <div id="wireframe" class="stage">
        <svg width="100%" viewBox="0 0 1200 700" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer Screen Frame -->
          <rect x="20" y="20" width="1160" height="660" rx="14" stroke="#0ff" stroke-width="2" />

          <!-- Nav Bar -->
          <rect x="40" y="50" width="1120" height="60" rx="8" stroke="#0ff" stroke-width="1.5" />

          <!-- Hero Block -->
          <rect x="40" y="140" width="700" height="260" rx="10" stroke="#0ff" stroke-width="1.5" />

          <!-- Sidebar -->
          <rect x="760" y="140" width="400" height="520" rx="10" stroke="#0ff" stroke-width="1.5" />

          <!-- Three Cards (under hero block) -->
          <rect x="40" y="430" width="340" height="230" rx="10" stroke="#0ff" stroke-width="1.5" />
          <rect x="400" y="430" width="340" height="230" rx="10" stroke="#0ff" stroke-width="1.5" />

          <!-- Footer block at bottom -->
          <rect x="40" y="670" width="1120" height="0.1" stroke="#0ff" stroke-width="1" />

        </svg>

      </div>

      <!-- Stage 2: LoFi -->
      <div id="lofi" class="stage">
        <svg width="100%" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer Frame (static, non-animated) -->
          <rect x="20" y="20" width="1160" height="660" rx="14" fill="#111" />

          <!-- Nav Bar -->
          <rect x="40" y="50" width="1120" height="60" rx="8" fill="#2b2b2b" />

          <!-- Hero Block -->
          <rect x="40" y="140" width="700" height="260" rx="10" fill="#2a2a2a" />
          <rect x="60" y="160" width="300" height="25" rx="4" fill="#3a3a3a" />
          <rect x="60" y="200" width="260" height="18" rx="4" fill="#333" />

          <!-- Sidebar -->
          <rect x="760" y="140" width="400" height="520" rx="10" fill="#222" />
          <rect x="780" y="160" width="360" height="40" rx="6" fill="#333" />
          <rect x="780" y="220" width="360" height="40" rx="6" fill="#333" />
          <rect x="780" y="280" width="360" height="40" rx="6" fill="#333" />

          <!-- Three Cards -->
          <rect x="40" y="430" width="340" height="230" rx="10" fill="#222" />
          <rect x="400" y="430" width="340" height="230" rx="10" fill="#222" />
        </svg>
      </div>

      <!-- Stage 3: HiFi -->
      <div id="hifi" class="stage">
        <svg width="100%" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer Frame -->
          <rect x="20" y="20" width="1160" height="660" rx="14" fill="#0b0b0b" />

          <!-- Navbar -->
          <rect x="40" y="50" width="1120" height="60" rx="8" fill="#111" />
          <rect x="60" y="70" width="140" height="24" rx="6" fill="#0ff" />
          <rect x="960" y="70" width="80" height="24" rx="6" fill="#0ff33" />

          <!-- Hero Section -->
          <rect x="40" y="140" width="700" height="260" rx="14" fill="#101010" />
          <rect x="60" y="160" width="380" height="36" rx="8" fill="#0ff" />
          <rect x="60" y="210" width="340" height="22" rx="6" fill="#555" />
          <rect x="60" y="245" width="270" height="22" rx="6" fill="#444" />

          <!-- CTA Buttons -->
          <rect x="60" y="305" width="160" height="45" rx="10" fill="#0ff" />
          <rect x="240" y="305" width="160" height="45" rx="10" fill="none" stroke="#0ff" stroke-width="2" />

          <!-- Sidebar -->
          <rect x="760" y="140" width="400" height="520" rx="14" fill="#111" />
          <rect x="780" y="160" width="360" height="40" rx="8" fill="#0ff11" />
          <rect x="780" y="220" width="360" height="40" rx="8" fill="#0ff11" />
          <rect x="780" y="280" width="360" height="40" rx="8" fill="#0ff11" />
          <rect x="780" y="340" width="360" height="40" rx="8" fill="#0ff11" />

          <!-- Cards -->
          <rect x="40" y="430" width="340" height="230" rx="12" fill="#111" />
          <rect x="400" y="430" width="340" height="230" rx="12" fill="#111" />

          <rect x="60" y="450" width="160" height="25" rx="6" fill="#0ff" />
          <rect x="420" y="450" width="160" height="25" rx="6" fill="#0ff" />

        </svg>

      </div>

      <!-- Feedback bubble -->
      <div id="feedback" class="absolute bottom-0 right-0 text-cyan-300 text-xs px-3 py-2 rounded-lg border border-cyan-400/40 bg-cyan-400/10 backdrop-blur-md neon-glow-small opacity-0">
        Feedback applied ✔
      </div>
    </div>
  </div>
</template>

<style scoped>
.neon-container {
  filter: drop-shadow(0 0 20px #0ff4) drop-shadow(0 0 40px #0ff2);
}

.neon-glow-small {
  filter: drop-shadow(0 0 6px #0ff8);
}

.stage {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: filter 0.3s ease;
}

/* #feedback {
  position: absolute;
  bottom: -30px;
  right: 0;
  background: rgba(0, 255, 255, 0.15);
  border: 1px solid rgba(0, 255, 255, 0.6);
  padding: 6px 14px;
  border-radius: 10px;
  color: #0ff;
  font-size: 0.85rem;
  opacity: 0;
  backdrop-filter: blur(6px);
} */

@media (min-width: 768px) {
  .preview:hover .stage {
    filter: drop-shadow(0 0 12px #0ff5);
  }
}
</style>
