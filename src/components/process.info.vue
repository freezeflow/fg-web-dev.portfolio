<script setup>
const props = defineProps({
  processes: {
    type: Array,
    default: () => []
  },
})
</script>

<template v-if="props.processes && props.processes.length">
  <section aria-label="Process steps" class="flex flex-col gap-8">
    <article
      v-for="(process, index) in props.processes"
      :key="index"
      class="flex flex-col text-white"
      :aria-labelledby="`process-step-${index}-title`"
    >
      <header>
        <h3
          :id="`process-step-${index}-title`"
          class="text-2xl max-sm:text-xl font-display"
        >
          {{ process.title }}
        </h3>
      </header>
      <p class="ml-2">
        {{ process.description }}
      </p>
    </article>
  </section>
</template>
