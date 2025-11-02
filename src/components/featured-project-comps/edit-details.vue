<script setup>
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const emits = defineEmits(['close'])

const props = defineProps({
    saveDetails: Function,
    projectId: String
})

const roleOptions = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Software Engineer',
  'Lead Developer',
  'Web Designer'
]

const form = reactive({
  role: '',
  link: '',
  testimonial: '',
  projectId: props.projectId
})

const isSubmitting = ref(false)

function isValidUrl(url) {
  const regex = /^https?:\/\/[^\s$.?#].[^\s]*$/gm
  return regex.test(url)
}

async function handleSubmit() {
  const { role, link, testimonial } = form

  if (!role) {
    toast.error('Please select a role.')
    return
  }

  if (!link || !isValidUrl(link)) {
    toast.error('Please enter a valid link (e.g. https://example.com).')
    return
  }

  if (!testimonial.trim()) {
    toast.error('Please enter a testimonial.')
    return
  }

  isSubmitting.value = true

  try {
    // Emit data to parent for saving
    props.saveDetails(form)
    toast.success('Featured item saved successfully!')
    emits('close')
  } catch (err) {
    toast.error('Something went wrong while saving.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
  >
    <div
      class="bg-navy text-white rounded-2xl shadow-xl p-6 w-[90%] md:w-[40%] relative"
    >
      <!-- Close Button -->
      <button
        @click="emits('close')"
        class="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
      >
        &times;
      </button>

      <h2 class="text-2xl font-semibold mb-6 text-center text-secondary">
        Add Details
      </h2>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
        <!-- Role Dropdown -->
        <div>
          <label class="block mb-1 text-sm font-medium">Role</label>
          <select
            v-model="form.role"
            class="w-full bg-navy text-white p-2 rounded-md border border-secondary/50 focus:outline-none focus:border-secondary"
          >
            <option value="" disabled>Select a role</option>
            <option
              v-for="(option, index) in roleOptions"
              :key="index"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Link Input -->
        <div>
          <label class="block mb-1 text-sm font-medium">Project Link</label>
          <input
            v-model="form.link"
            type="url"
            placeholder="https://example.com"
            class="w-full bg-transparent text-white p-2 rounded-md border border-secondary/50 focus:outline-none focus:border-secondary"
          />
        </div>

        <!-- Testimonial Textarea -->
        <div>
          <label class="block mb-1 text-sm font-medium">Testimonial</label>
          <textarea
            v-model="form.testimonial"
            rows="4"
            placeholder="Write the client's testimonial..."
            class="w-full bg-transparent text-white p-2 rounded-md border border-secondary/50 focus:outline-none focus:border-secondary resize-none"
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-3 mt-4">
          <button
            type="button"
            @click="emits('close')"
            class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-secondary hover:opacity-80 rounded-md text-white transition disabled:opacity-50"
          >
            {{ isSubmitting ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
