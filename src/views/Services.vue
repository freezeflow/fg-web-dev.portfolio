<template>
  <section
    class="w-screen h-screen max-sm:px-[20px] max-md:px-[60px] px-20 flex flex-col justify-center max-sm:items-center gap-10"
    aria-labelledby="services-title"
  >
    <!-- Section Heading -->
    <header>
      <h2
        id="services-title"
        class="text-4xl max-sm:text-2xl max-sm:text-center text-white font-semibold"
      >
        Web Development Services We Specialize In
      </h2>

      <p class="max-sm:text-center text-white/80 mt-2 max-w-3xl">
        Fynecode Development builds modern, high-performance websites and web
        applications tailored for startups and businesses in Namibia.
      </p>
    </header>

    <!-- Services Grid -->
    <div
      class="w-full grid gap-4 max-sm:grid-cols-1 grid-cols-3"
      role="list"
    >
      <InfoCards
        role="listitem"
        :icon="MonitorSmartphone"
        title="Portfolio & Business Websites"
        description="Professional portfolio and business websites designed for speed, clarity, and credibility."
      />

      <InfoCards
        role="listitem"
        :icon="ShoppingCart"
        title="E-commerce Website Development"
        description="Simple, secure, and scalable e-commerce websites that help businesses sell online effectively."
      />

      <InfoCards
        role="listitem"
        :icon="ToolCase"
        title="Custom Web Tools & Applications"
        description="Custom-built web tools that automate processes, improve efficiency, and support business growth."
      />
    </div>
  </section>
</template>

<script setup>
import InfoCards from '@/components/info.cards.vue'
import { MonitorSmartphone, ShoppingCart, ToolCase } from 'lucide-vue-next'
</script>
