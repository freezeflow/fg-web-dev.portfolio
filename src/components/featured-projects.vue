<script setup>
import { ref } from 'vue'
import { ArrowRightIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const isActiveItem = ref('')
const videoRef = ref(null)

function playVideo() {
  if (videoRef.value) {
    videoRef.value.play()
    isActiveItem.value = 'active-item'
  }
}

function pauseVideo() {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
    isActiveItem.value = ''
  }
}
</script>

<template>
  <article
    class="bg-[#020320] w-full max-sm:p-5 p-10 rounded-lg flex flex-col gap-5"
    :aria-labelledby="`project-${project._id}-title`"
  >
    <!-- Project Preview Video -->
    <video
      ref="videoRef"
      :src="project.file.filePath"
      draggable="false"
      class="border-gradient"
      :class="isActiveItem"
      preload="metadata"
      muted
      playsinline
      :aria-label="`Preview of ${project.title} web project`"
      @mouseover="playVideo"
      @mouseleave="pauseVideo"
    >
      Your browser does not support the video tag.
    </video>

    <!-- Project Title & Link -->
    <RouterLink
      :to="{ name: 'project', params: { id: project._id } }"
      class="flex flex-row items-center gap-2 group"
      :aria-describedby="`project-${project._id}-desc`"
    >
      <h3
        :id="`project-${project._id}-title`"
        class="text-xl max-sm:text-lg text-white font-semibold group-hover:text-secondary transition-colors"
      >
        {{ project.title }}
      </h3>

      <ArrowRightIcon
        class="text-white group-hover:text-secondary transition-all ease-in-out"
        aria-hidden="true"
      />
    </RouterLink>
  </article>
</template>