<script setup>
import { ref, watch } from 'vue'
import { formUtility } from '@/utils/form.utils'
import { Trash, ArrowRight, Pen } from 'lucide-vue-next'

const fileUtil = new formUtility()
const errorMsg = ref('')
const fileVideoPath = ref('')
const videoData = ref()
const emits = defineEmits(['viewProject', 'edit', 'save'])
const props = defineProps({
  project: { required: true },
  uploadImg: Function,
  fetchImg: Function,
  deleteImg: Function,
})

async function handleFileChange(event, projectId) {
  const file = event.target.files[0]
  if (!fileUtil.isFileExtensionValid(file, ['mp4', 'mov', 'webm'])) {
    errorMsg.value = 'Invalid video format'
    return
  }

  if (!fileUtil.isFileSizeValid(file, 50)) {
    errorMsg.value = 'File size too large, must be 50mb or less'
    return
  }

  await props.uploadImg(projectId, file)
}

async function getPath() {
  if (!props.project?._id || !props.fetchImg) return

  videoData.value = await props.fetchImg(props.project._id)
  if (videoData.value?.filePath) {
    fileVideoPath.value = videoData.value.filePath
  }
}

watch(
  () => props.project?._id,
  (newVal) => {
    if (newVal) getPath()
  },
  { immediate: true }
)

async function handleImgDelete() {
  await props.deleteImg(props.project._id)
}
</script>

<template>
  <div
    class="w-[60%] bg-navy rounded-lg p-5 flex flex-col md:flex-row justify-between items-start text-white mx-auto"
  >
    <!-- Video Section -->
    <div class="relative w-full md:w-1/2 rounded-lg overflow-hidden">
      <button
        v-if="fileVideoPath"
        @click="handleImgDelete"
        class="absolute top-2 left-2 z-10 p-1 rounded-md bg-black/50 hover:bg-black/70 text-secondary transition"
      >
        <Trash class="w-5 h-5" />
      </button>

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
        <label class="text-secondary mb-2 font-semibold z-10">Add video</label>
        <input
          type="file"
          accept="video/*"
          class="opacity-0 absolute inset-0 cursor-pointer"
          @change="(e) => handleFileChange(e, props.project._id)"
        />
      </div>

      <p v-if="errorMsg" class="text-red-400 text-sm mt-2">{{ errorMsg }}</p>
    </div>

    <!-- Project Info Section -->
    <div
      class="mt-3 flex flex-col gap-10 h-64"
    >
      <div>
        <p class="text-lg font-semibold text-white">
          {{ props.project.title }}
        </p>
      </div>

      <div class="flex flex-row justify-center gap-3">
        <button
          @click="emits('viewProject', props.project._id, '/projects/project')"
          class="cursor-pointer bg-secondary text-white rounded-md px-4 py-2 hover:opacity-80 transition"
        >
          <ArrowRight />
        </button>

        <button
          @click="emits('edit', props.project._id)"
          class="cursor-pointer bg-gray-800 text-white rounded-md px-4 py-2 hover:bg-gray-700 transition w-3/4"
        >
            <Pen />
        </button>
      </div>
    </div>
  </div>
</template>
