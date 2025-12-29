<template>
  <article class="w-full p-5 flex flex-col gap-10">
    <!-- Project Video -->
    <div class="w-full md:w-1/2 rounded">
      <video
        :src="project.file.filePath"
        controls
        preload="metadata"
        playsinline
        muted
        class="rounded"
        :aria-label="`Preview video for ${project.title} project`"
      >
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="text-white w-full md:w-1/2 flex flex-col gap-12">
      <!-- Project Title -->
      <h1 class="text-3xl underline">{{ project.title }}</h1>

      <!-- Description -->
      <section>
        <h2 class="flex flex-row text-lg gap-2 w-fit items-center" aria-hidden="true">
          Description <Briefcase size="20" class="text-secondary" aria-hidden="true"/>
        </h2>
        <p>{{ project.description }}</p>
      </section>

      <!-- Deliverables -->
      <section v-if="project.deliveredFeats?.length">
        <h2 class="flex flex-row text-lg gap-2 w-fit items-center" aria-hidden="true">
          Deliverables <Hammer size="20" class="text-secondary" aria-hidden="true"/>
        </h2>
        <ol class="flex flex-col gap-1 list-disc ml-8">
          <li v-for="(feat, index) in project.deliveredFeats" :key="index">{{ feat }}</li>
        </ol>
      </section>

      <!-- Tags -->
      <section v-if="project.tags?.length">
        <h2 class="flex flex-row text-lg gap-2 w-fit items-center" aria-hidden="true">
          Tags <Hash size="20" class="text-secondary" aria-hidden="true"/>
        </h2>
        <div class="flex flex-row gap-3 flex-wrap">
          <span class="bg-secondary rounded-full px-4" v-for="(tag, idx) in project.tags" :key="idx">{{ tag }}</span>
        </div>
      </section>

      <!-- Client -->
      <section v-if="project.company">
        <h2 class="flex flex-row text-lg gap-2 w-fit items-center" aria-hidden="true">
          Client <User size="20" class="text-secondary" aria-hidden="true"/>
        </h2>
        <p>{{ project.company }}</p>
      </section>

      <!-- Live Demo -->
      <section v-if="project.link">
        <a
          class="underline flex items-center gap-2"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Link size="20" class="text-secondary" aria-hidden="true"/>
          Live demo
        </a>
      </section>

      <!-- Testimonial -->
      <section v-if="project.testimonial.feedback">
        <h2 class="text-xl">Testimonial</h2>
        <div class="flex flex-row gap-3 items-center">
          <img
            class="size-10 object-cover border-2 bg-white border-secondary rounded-full"
            :src="project.testimonial.pictureUrl"
            alt="Picture of client"
          />
          <div class="flex flex-col gap-2">
            <Quote class="w-10 text-secondary" aria-hidden="true"/>
            <p>{{ project.testimonial.feedback }}</p>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Briefcase, User, Quote, Hash, Hammer, Link } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const projects = ref([])

const id = route.params.id
const raw = localStorage.getItem('featured')

if (raw) {
  projects.value = JSON.parse(raw)
} else {
  router.push('/')
}

const project = computed(() => projects.value.find(p => p._id === id))

// JSON-LD schema setup
const schemaJson = ref('')

onMounted(() => {
  if (!project.value) return

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.value.title,
    "description": project.value.description,
    "url": window.location.href,
    "keywords": project.value.tags || [],
    "image": project.value.file?.filePath || undefined,
    "author": project.value.company
      ? {
          "@type": "Organization",
          "name": project.value.company
        }
      : undefined,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    },
    "potentialAction": project.value.link
      ? {
          "@type": "ViewAction",
          "target": project.value.link,
          "name": "Live demo"
        }
      : undefined,
    "review": project.value.testimonial
      ? {
          "@type": "Review",
          "author": project.value.testimonial.name || "Client",
          "reviewBody": project.value.testimonial.feedback
        }
      : undefined
  }

  // Remove undefined fields
  Object.keys(schema).forEach(
    key => schema[key] === undefined && delete schema[key]
  )

  schemaJson.value = JSON.stringify(schema, null, 2)
})
</script>