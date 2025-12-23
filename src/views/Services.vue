<template>
  <section
    class="w-screen min-h-screen max-sm:px-[20px] max-md:px-[60px] px-20 flex flex-col justify-center max-sm:items-center gap-10"
    aria-labelledby="services-title"
  >
    <!-- Section Heading -->
    <header>
      <h2
        id="services-title"
        class="md:text-4xl sm:text-3xl text-2xl max-sm:text-center text-white font-semibold"
      >
        Web Development Services We Specialize In
      </h2>

      <p class="max-sm:text-center text-white/80 mt-2 max-w-3xl">
        Fynecode Development builds modern, high-performance websites and web
        applications tailored for startups and businesses in Namibia.
      </p>
    </header>

    <div class="flex flex-row gap-3 text-white">
      <button class="px-2 py-1 rounded-full cursor-pointer transition-all max-sm:text-sm" :class="projectType === 1? 'bg-secondary':'hover:text-secondary'" @click="projectType = 1">Small businesses</button>
      <button class="px-2 py-1 rounded-full cursor-pointer transition-all max-sm:text-sm" :class="projectType === 2? 'bg-secondary':'hover:text-secondary'" @click="projectType = 2">E-commerce & E-learning/LMS</button>
    </div>

    <!-- Services Grid -->
    <div
      class="w-full"
      role="list"
    >
      <div class="w-full grid gap-4 max-sm:grid-cols-1 grid-cols-2" :class="projectType === 1? '':'hidden'">
        <InfoCards
          role="listitem"
          :icon="MonitorSmartphone"
          title="Business Website Development"
          description="For businesses that need to look credible and professional online"
          :points="[
            'Custom website built for clarity',
            'Ideal if your business has no site or an outdated one',
            'Helps customers understand your services and contact you easily'
          ]"
          price="4000"
        />

        <InfoCards
          role="listitem"
          :icon="MonitorSmartphone"
          title="CMS Website Development"
          description="For growing businesses that need control over their content"
          :points="[
            'Website with a content management system',
            'Update pages, services, or content without calling a developer',
            'Built to scale as your business grows'
          ]"
          price="6500"
        />
      </div>
      
      <div class="w-full grid gap-4 max-sm:grid-cols-1 grid-cols-2" :class="projectType === 2? '':'hidden'">
        <InfoCards
          role="listitem"
          :icon="ShoppingCart"
          title="E-commerce Website Development"
          description="For businesses that want to sell products online"
          :points="[
            'Online store with product and store management',
            'Secure checkout and mobile friendly design',
            'Designed for reliability'
          ]"
          price="8500"
        />

        <InfoCards
          role="listitem"
          :icon="GraduationCap"
          title="E-learning/LMS Development"
          description="For schools, trainers, and organizations delivering online learning"
          :points="[
            'Structured course systems with user accounts',
            'Designed for clarity, progress, and long-term use',
            'Suitable for training programs and institusions'
          ]"
          price="10000"
        />
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import InfoCards from '@/components/info.cards.vue'
import { MonitorSmartphone, ShoppingCart, GraduationCap } from 'lucide-vue-next'

const projectType = ref(1)
</script>
