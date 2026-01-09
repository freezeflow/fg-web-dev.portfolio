<template>
  <div class="min-h-screen w-full text-white p-4 lg:p-10">

    <!-- Top Controls -->
    <div class="flex justify-between items-center mb-6">
      <button
        @click="router.back()"
        class="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition"
      >
        ← Back
      </button>

      <button
        @click="deleteProject"
        class="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>

    <!-- Layout Wrapper -->
    <div class="flex flex-col lg:gap-8">

      <!-- VIDEO UPLOAD OR PLAYER -->
      <div
        class="w-full md:w-3/5 lg:w-2/5 rounded-xl overflow-hidden shadow-xl border border-white/10 aspect-video flex items-center justify-center"
      >
        <!-- Video -->
        <video
          v-if="form.file?.filePath"
          :src="form.file?.filePath"
          controls
          class="w-full h-full object-cover"
        ></video>

        <!-- Upload Input -->
        <div v-else class="w-full p-4">
          <label class="text-sm text-white/50">Upload Project Video</label>
          <input
            type="file"
            accept="video/*"
            @change="onVideoUpload"
            class="w-full mt-2 text-white border"
          />
        </div>
      </div>

      <!-- DETAILS -->
      <div class="flex-1 mt-6 lg:mt-0 space-y-10">

        <!-- Main Project Fields -->
        <section class="space-y-6">

          <!-- Title -->
          <div>
            <label class="text-sm text-white/50" @dblclick="enableEdit('title')">Title</label>
            <div
              v-if="!isEditing.title"
              @dblclick="enableEdit('title')"
              class="text-2xl font-semibold cursor-pointer"
            >
              {{ form.title }}
            </div>
            <input
              v-else
              v-model="form.title"
              type="text"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="text-sm text-white/50" @dblclick="enableEdit('description')">Description</label>
            <div
              v-if="!isEditing.description"
              @dblclick="enableEdit('description')"
              class="text-lg cursor-pointer"
            >
              {{ form.description }}
            </div>
            <textarea
              v-else
              v-model="form.description"
              rows="3"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            ></textarea>
          </div>

          <div>
            <label class="text-sm text-white/50" @dblclick="enableEdit('link')">Link</label>
            <div
              v-if="!isEditing.link"
              @dblclick="enableEdit('link')"
              class="text-lg cursor-pointer"
            >
              {{ form.link }}
            </div>
            <input
              v-else
              v-model="form.link"
              type="text"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            />
          </div>

          <!-- Company -->
          <div>
            <label class="text-sm text-white/50" @dblclick="enableEdit('company')">Company</label>
            <div
              v-if="!isEditing.company"
              @dblclick="enableEdit('company')"
              class="text-lg cursor-pointer"
            >
              {{ form.company }}
            </div>
            <input
              v-else
              v-model="form.company"
              type="text"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            />
          </div>

          <!-- Scope (ARRAY) -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Scope
              <button
                @click="addToArray('scope')"
                class="px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition text-sm"
              >
                +
              </button>
            </label>

            <div class="flex flex-wrap gap-2 mt-2">
              <div
                v-for="(item, index) in form.scope"
                :key="'scope-' + index"
                class="flex items-center bg-white/10 px-3 py-1 rounded"
              >
                <span
                  v-if="!isEditing.scope[index]"
                  @dblclick="enableArrayEdit('scope', index)"
                  class="cursor-pointer"
                >
                  {{ item }}
                </span>

                <input
                  v-else
                  v-model="form.scope[index]"
                  @blur="stopArrayEdit('scope', index)"
                  class="bg-transparent outline-none text-white w-24"
                />

                <button
                  @click="removeFromArray('scope', index)"
                  class="ml-2 text-red-400 hover:text-red-500"
                >
                  ✖
                </button>
              </div>
            </div>
          </div>

          <!-- Tags ARRAY -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Tags
              <button
                @click="addToArray('tags')"
                class="px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition text-sm"
              >
                +
              </button>
            </label>

            <div class="flex flex-wrap gap-2 mt-2">
              <div
                v-for="(item, index) in form.tags"
                :key="'tag-' + index"
                class="flex items-center bg-white/10 px-3 py-1 rounded"
              >
                <span
                  v-if="!isEditing.tags[index]"
                  @dblclick="enableArrayEdit('tags', index)"
                >
                  {{ item }}
                </span>

                <input
                  v-else
                  v-model="form.tags[index]"
                  @blur="stopArrayEdit('tags', index)"
                  class="bg-transparent outline-none text-white w-24"
                />

                <button
                  @click="removeFromArray('tags', index)"
                  class="ml-2 text-red-400 hover:text-red-500"
                >
                  ✖
                </button>
              </div>
            </div>
          </div>

          <!-- DeliveredFeats ARRAY -->
          <div>
            <label class="text-sm text-white/50 flex items-center gap-2">
              Delivered Features
              <button
                @click="addToArray('deliveredFeats')"
                class="px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition text-sm"
              >
                +
              </button>
            </label>

            <div class="flex flex-wrap gap-2 mt-2">
              <div
                v-for="(item, index) in form.deliveredFeats"
                :key="'feat-' + index"
                class="flex items-center bg-white/10 px-3 py-1 rounded"
              >
                <span
                  v-if="!isEditing.deliveredFeats[index]"
                  @dblclick="enableArrayEdit('deliveredFeats', index)"
                >
                  {{ item }}
                </span>

                <input
                  v-else
                  v-model="form.deliveredFeats[index]"
                  @blur="stopArrayEdit('deliveredFeats', index)"
                  class="bg-transparent outline-none text-white w-24"
                />

                <button
                  @click="removeFromArray('deliveredFeats', index)"
                  class="ml-2 text-red-400 hover:text-red-500"
                >
                  ✖
                </button>
              </div>
            </div>
          </div>

          <!-- Challenges -->
          <div>
            <label class="text-sm text-white/50">Challenges</label>
            <div
              v-if="!isEditing.challenges"
              @dblclick="enableEdit('challenges')"
              class="cursor-pointer whitespace-pre-line"
            >
              {{ form.challenges || "Double-click to add challenges..." }}
            </div>
            <textarea
              v-else
              v-model="form.challenges"
              rows="3"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            ></textarea>
          </div>

          <!-- Solution -->
          <div>
            <label class="text-sm text-white/50">Solution</label>
            <div
              v-if="!isEditing.solution"
              @dblclick="enableEdit('solution')"
              class="cursor-pointer whitespace-pre-line"
            >
              {{ form.solution || "Double-click to add solution..." }}
            </div>
            <textarea
              v-else
              v-model="form.solution"
              rows="3"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            ></textarea>
          </div>

          <!-- Status -->
          <div>
            <label class="text-sm text-white/50">Status</label>

            <div
              v-if="!isEditing.status"
              @dblclick="enableEdit('status')"
              class="cursor-pointer"
            >
              {{ form.status }}
            </div>

            <select
              v-else
              v-model="form.status"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

        </section>

        <!-- TESTIMONIAL -->
        <section class="mt-20 border-t border-white/20 pt-10 space-y-4">
          <h2 class="text-xl font-semibold">Testimonial</h2>

          <!-- Picture -->
          <div class="flex flex-col">
            <label class="text-sm text-white/50">Client Picture</label>

            <img
              v-if="form.testimonial?.pictureUrl"
              :src="form.testimonial.pictureUrl"
              class="w-24 h-24 rounded-full object-cover mb-3"
            />

            <input
              v-if="!form.testimonial?.pictureUrl"
              type="file"
              accept="image/*"
              @change="onPictureUpload"
              class="w-32 mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            />
          </div>

          <!-- Feedback -->
          <div>
            <label class="text-sm text-white/50">Feedback</label>
            <p
            v-if="!isEditing.testimonialFeedback"
            @dblclick="enableEdit('testimonialFeedback')"
            >
              {{form.testimonial.feedback || "Double click to add feedback"}}
            </p>
            <textarea
              v-else
              v-model="form.testimonial.feedback"
              rows="4"
              class="w-full mt-1 px-3 py-2 rounded bg-white/10 text-white outline-none"
            ></textarea>
            
          </div>

        </section>

        <div v-if="isDirty" class="mt-10 flex">
          <button
            @click="saveChanges"
            class="px-6 py-3 bg-[#0584d8] hover:bg-[#0a66a5] rounded-lg text-white font-semibold flex flex-row gap-2"
          >
            <Loader2 v-if="featuredStore.loading" class="animate-spin" /> Save Changes
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFeaturedProjectsStore } from "@/stores/featured.store";
import { Loader2 } from "lucide-vue-next";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const id = ref(route.params.id);
const featuredStore = useFeaturedProjectsStore();

const project = ref(null);

// Editing states
const isEditing = reactive({
  title: false,
  description: false,
  link: false,
  company: false,
  status: false,
  scope: [],
  tags: [],
  deliveredFeats: [],
  challenges: false,
  solution: false,
  testimonialFeedback: false,
  testimonialPicture: false,
});

// Main form (mirroring schema)
const form = reactive({
  title: "",
  description: "",
  company: "",
  scope: [],
  tags: [],
  deliveredFeats: [],
  challenges: "",
  solution: "",
  status: "draft",
  link: "",
  file: null,
  testimonial: {
    pictureUrl: null,
    feedback: "",
  }
  
});

// Detect changes
const isDirty = computed(() => {
  if (!project.value) return false;
  return JSON.stringify(form) !== JSON.stringify(project.value);
});

// Editing helpers
function enableEdit(field) {
  isEditing[field] = true;
}

function enableArrayEdit(field, index) {
  isEditing[field][index] = true;
}

function stopArrayEdit(field, index) {
  isEditing[field][index] = false;
}

function addToArray(field) {
  form[field].push("");
  isEditing[field].push(true);
}

function removeFromArray(field, index) {
  form[field].splice(index, 1);
  isEditing[field].splice(index, 1);
}

// File uploads
function onVideoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  form.file = file;
}

function onPictureUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  form.testimonial.pictureUrl = file;
}

// Save project updates
async function saveChanges() {
  try {
    const fd = new FormData();

    fd.append("title", form.title)
    fd.append("description", form.description)
    fd.append("company", form.company)
    fd.append("scope", form.scope)
    fd.append("tags", form.tags)
    fd.append("deliveredFeats", form.deliveredFeats)
    fd.append("challenges", form.challenges)
    fd.append("solution", form.solution)
    fd.append("status", form.status)
    fd.append("link", form.link)
    fd.append("file", form.file)
    fd.append("picture", form.testimonial.pictureUrl)
    fd.append("feedback", form.testimonial.feedback)

    await featuredStore.updateFeaturedProject(id.value, fd);

    Object.keys(isEditing).forEach((k) => {
      if (Array.isArray(isEditing[k])) isEditing[k] = [];
      else isEditing[k] = false;
    });

  } catch (err) {
    toast.error("Failed to save changes");
  }
}

async function deleteProject() {
  if (!confirm("Delete this featured project?")) return;
  try {
    await featuredStore.deleteFeaturedProject(id.value);
    toast.success("Project deleted");
    router.push("/dashboard");
  } catch (err) {
    toast.error("Failed to delete project");
  }
}

onMounted(async () => {
  if (!id.value) return router.push("/dashboard");

  await featuredStore.getFeaturedProject(id.value);
  project.value = featuredStore.selectedProject;

  if (!project.value) return;

  // Copy project into editable form
  Object.assign(form, JSON.parse(JSON.stringify(project.value)));
  // Testimonial fields
  if (project.value.testimonial) {
    form.testimonial.feedback = project.value.testimonial.feedback || "";
    form.testimonial.pictureUrl = project.value.testimonial.pictureUrl || "";
  }
});
</script>