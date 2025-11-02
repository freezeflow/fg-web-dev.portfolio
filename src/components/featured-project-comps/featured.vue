<script setup>
import { ArrowRight } from 'lucide-vue-next';
import { ref, watch } from 'vue';

const fileVideoPath = ref('')
const videoData = ref()

const props = defineProps({
  project: Object,
  fileVideoPath: String,
  fetchImg: Function,
});
defineEmits(['view-featured', 'edit']);

async function getPath() {
  if (!props.project?.projectId || !props.fetchImg) return

  videoData.value = await props.fetchImg(props.project.projectId)
  if (videoData.value?.filePath) {
    fileVideoPath.value = videoData.value.filePath
  }
}

watch(
  () => props.project?.projectId,
  (newVal) => {
    if (newVal) getPath()
  },
  { immediate: true }
)
</script>

<template>
  <div class="w-[60%] bg-navy rounded-lg p-5 flex flex-col md:flex-row justify-between items-start text-white mx-auto">
    <div class="relative w-full md:w-1/2 rounded-lg overflow-hidden">

      <video
        v-if="fileVideoPath"
        :src="fileVideoPath"
        controls
        class="w-full h-64 object-cover rounded-lg"
      ></video>

      <div
        v-else
        class="relative flex flex-col justify-center items-center border border-dashed border-secondary h-64 rounded-lg cursor-pointer"
      >
        <p class="text-secondary"> No video added </p>
      </div>
    </div>

    <div class="mt-3 flex flex-col gap-10 h-64">
      <h2 class="text-lg font-semibold text-white">{{ project.projectInfo.title }}</h2>

      <div class="flex flex-col gap-3">
        <div class="flex flex-row gap-3">
            <button
                class="bg-secondary hover:bg-secondary text-white px-4 py-2 rounded-lg transition"
                @click="$emit('view-featured', project)"
            >
                <arrow-right />
            </button>

            <button
                class="border border-secondary hover:border-secondary text-white px-4 py-2 rounded-lg transition"
                @click="$emit('edit', project)"
            >
                Edit
            </button>
        </div>
        

        <button class="bg-red-600 hover:bg-secondary w-full py-2 rounded-lg transition">
            Delete
        </button>
      </div>
    </div>
  </div>
</template>