<template>
  <section
    class="flex flex-col gap-10 w-full max-sm:px-[20px] px-20"
    id="process"
    aria-labelledby="process-title"
  >
    <header>
      <h2 id="process-title" class="text-4xl max-sm:text-2xl text-white font-semibold">
        Our Process
      </h2>
      <p class="text-white/80 max-w-3xl mt-2">
        At Fynecode Development, we follow a structured approach to bring your vision to life, ensuring quality, scalability, and performance at every step.
      </p>
    </header>

    <div class="flex flex-row gap-10">
      <!-- Process Navigation -->
      <aside role="navigation" aria-label="Process steps navigation">
        <processNav
          :icons="icons"
          :activeIndex="activeIndex"
          @icon1="activeIndex = 0"
          @icon2="activeIndex = 1"
          @icon3="activeIndex = 2"
          @icon4="activeIndex = 3"
        />
      </aside>

      <!-- Process Steps -->
      <main class="flex flex-col gap-[5.5rem]" role="main">
        <processInfo
          :processes="processSteps"
          :activeIndex="activeIndex"
        />
      </main>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import processInfo from '@/components/process.info.vue'
import processNav from '@/components/process.nav.vue'
import { UserRoundSearch, Palette, Code2, Rocket } from 'lucide-vue-next'

// Add slightly more descriptive text for SEO
const processSteps = ref([
  {
    title: 'Discovery',
    description:
      'We analyze your business goals, audience, and requirements to define the project scope and strategy.',
  },
  {
    title: 'Design',
    description:
      'We create intuitive, modern interfaces with a focus on usability, branding, and user experience.',
  },
  {
    title: 'Development',
    description:
      'We build scalable, responsive, and performant web systems using modern technologies.',
  },
  {
    title: 'Delivery & Support',
    description:
      'We launch your project, monitor performance, and provide ongoing support to ensure success.',
  },
])

const icons = [UserRoundSearch, Palette, Code2, Rocket]
const activeIndex = ref(0)
</script>