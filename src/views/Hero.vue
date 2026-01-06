<template>
  <section
    class="w-screen min-h-screen px-[20px] sm:px-20 flex flex-col-reverse justify-center max-sm:items-center gap-3"
    aria-labelledby="hero-heading"
  >
    <!-- Hero Content -->
    <div class="flex flex-col items-center gap-4">
      <h1
        id="hero-heading"
        class="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white flex flex-col gap-2"
      >
        Web Development for Startups & Businesses
        <span class="sr-only">by Fynecode Development</span>
      </h1>

      <p
        class="text-center sm:text-xl text-white md:w-4/5 font-display"
      >
        Fast, responsive, and scalable websites and
        web tools designed to help startups and growing businesses succeed
        online.
      </p>

      <div class="flex items-center justify-center w-full mt-10 text-white">
        <a
          href="#projects"
          class="flex max-sm:w-full w-3/5 items-center justify-center py-2 rounded bg-secondary hover:bg-secondary/50 transition-all ease-in-out"
          aria-label="View web development projects by Fynecode"
        >
          View Projects
        </a>
      </div>
    </div>

    <!-- Hero Visual (SVG) -->
    <div aria-hidden="true">
      <stage1 />
    </div>
  </section>
</template>

<script setup>
import stage1 from '../components/hero-comps/stage-1.vue'
</script>