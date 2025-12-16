<script setup>
    import { ref } from "vue";
    import { useToast } from "vue-toastification";
    import { Loader2 } from "lucide-vue-next";

    const toast = useToast()

    const title = ref("");

    const emit = defineEmits(["close"]);
    const props = defineProps({createProject: Function, loading: Boolean})

    async function handleSubmit() {
        try {
            if (!title.value) {
                toast.error("All required fields must be filled.");
                return;
            }

            const formData = new FormData();
            formData.append("title", title.value);

            await props.createProject(formData)

            emit("close");

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to create featured project");
        }
    }
</script>

<template>
  <div class="fixed overflow-y-auto z-50 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
    <form
      @submit.prevent="handleSubmit()" class="w-[60%] max-sm:hidden bg-[#020320] text-white rounded-2xl p-8 shadow-2xl border border-white/10 flex flex-col gap-6"
    >
      <h2 class="text-xl font-semibold text-center text-[#0584d8]">
        Add Featured Project
      </h2>

      <!-- TITLE -->
      <div class="flex flex-col gap-2">
        <label for="title" class="text-sm text-gray-300">Title</label>
        <input
            v-model="title"
            type="text"
            id="title"
            placeholder="Project title..."
            class="bg-white/10 border border-white/10 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:border-[#0584d8] transition"
        />
      </div>

      <!-- ACTIONS -->
      <div class="flex justify-between pt-2">
        <button
            @click="emit('close')"
            type="button"
            class="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition"
        >
            Cancel
        </button>

        <button
            type="submit"
            class="flex flex-row gap-1 justify-center items-center px-4 py-2 rounded-lg bg-[#0584d8] text-white hover:bg-[#0584d8]/80 transition"
        >
            <loader2 :class="props.loading? 'animate-spin':'hidden'"/> Create
        </button>
      </div>
    </form>
  </div>
</template>