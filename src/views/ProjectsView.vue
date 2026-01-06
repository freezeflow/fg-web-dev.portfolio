<template>
  <section
    class="w-screen max-sm:px-[20px] px-20 flex flex-col justify-center gap-10"
    aria-labelledby="projects-title"
    id="projects"
  >
    <!-- Section Header -->
    <header class="">
      <h2
        id="projects-title"
        class="md:text-4xl sm:text-3xl text-2xl text-white font-semibold"
      >
        Web Development Projects & Case Studies
      </h2>

      <p class="text-white/80 mt-2 max-w-3xl mx-auto">
        A selection of websites and web tools built by Fynecode Development for
        startups and businesses, focused on performance, clarity, and scalability.
      </p>
    </header>

    <!-- Projects Grid -->
    <div class="projects-container flex items-center w-full relative">
      <div
        ref="container"
        class="w-full"
        :class="publicStore.loading || projects.length === 0 ? 'flex justify-center': 'grid md:grid-cols-2 grid-cols-1 gap-5'"
        role="list"
      >
        <FeaturedProjects
          v-if="projects.length && !publicStore.loading"
          v-for="project in projects"
          :key="project.id"
          :project="project"
          role="listitem"
        />

        <Loader2
          v-if="publicStore.loading"
          class="text-secondary animate-spin"
          size="108"
        />

        <NotFound
          v-if="projects.length === 0 && !publicStore.loading"
          msg="Projects are currently in development. Check back soon."
        />
      </div>
      
    </div>
  </section>
</template>

<script setup>
import FeaturedProjects from '@/components/featured.projects.vue'
import { Loader2 } from 'lucide-vue-next'
import NotFound from '@/components/not.found.vue'
import { usePublicStore } from '@/stores/public.store'
import { ref, onMounted } from 'vue'

const publicStore = usePublicStore()
const projects = ref([])

onMounted(async () => {
  await publicStore.getProjects()
  projects.value = publicStore.projects
})
</script>