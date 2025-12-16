<template>
  <section
    class="w-screen max-sm:px-[20px] px-20 flex flex-col justify-center gap-10"
    aria-labelledby="projects-title"
    id="projects"
  >
    <!-- Section Header -->
    <header class="max-sm:text-center">
      <h2
        id="projects-title"
        class="text-4xl max-sm:text-2xl text-white font-semibold"
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
        class="grid grid-cols-2 max-sm:grid-cols-1 w-full gap-5"
        role="list"
      >
        <FeaturedProjects
          v-if="projects.length"
          v-for="project in projects"
          :key="project.id"
          :project="project"
          role="listitem"
        />
      </div>

      <NotFound
        v-if="projects.length === 0"
        msg="Projects are currently in development. Check back soon."
      />
    </div>
  </section>
</template>

<script setup>
import FeaturedProjects from '@/components/featured-projects.vue'
import NotFound from '@/components/notFound.vue'
import { useProjectStore } from '@/stores/projects.store'
import { ref, onMounted } from 'vue'

const projectStore = useProjectStore()
const projects = ref([])

onMounted(async () => {
  await projectStore.getProjects()
  projects.value = projectStore.projects
})
</script>