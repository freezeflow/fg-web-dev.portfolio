<template>
  <adminNav />
  <div class="projects-view">
    <header class="flex flex-row items-center gap-10">
      <h1 class="text-4xl max-md:text-2xl">Add/Edit Featured Projects</h1>

      <!-- Slider Toggle -->
      <div class="flex items-center gap-2">
        <span :class="!showStaged ? 'text-white font-semibold' : 'text-gray-400'">Featured</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="showStaged" class="sr-only peer" />
          <div
            class="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800
                   rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full 
                   peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                   after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                   after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-500">
          </div>
        </label>
        <span :class="showStaged ? 'text-white font-semibold' : 'text-gray-400'">Staged</span>
      </div>
    </header>
    
    <div class="projects-container mt-8">
      <!-- Projects List -->
      <featuredProjects
        v-if="stagedProjects.length && showStaged"
        v-for="(project, index) in stagedProjects"
        :key="index"
        :project="project"
        :upload-img="fileStore.uploadFile.bind(fileStore)"
        :fetch-img="fileStore.fetchFilePath.bind(fileStore)"
        :delete-img="fileStore.deleteFile.bind(fileStore)"
        @view-project="projectsStore.getProject"
        @edit="isEditing = true, editingProjectId = project._id"
      />

      <featured
        v-if="projects.length && !showStaged"
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
        :fetch-img="fileStore.fetchFilePath.bind(fileStore)"
      />
      
      <notFoundMsg
        v-if="!displayedProjects.length"
        :msg="showStaged ? 'No staged projects found' : 'No featured projects found'"
      />
    </div>

    <!-- Edit modal -->
    <Teleport to="body">
      <editDetails
        v-if="isEditing"
        :projectId="editingProjectId"
        :save-details="featuredProjectStore.saveDetails.bind(featuredProjectStore)"
        @close="isEditing = false"
      />
    </Teleport>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import adminNav from '@/components/admin-nav.vue';
import featuredProjects from '@/components/featured-project-comps/featured-projects.vue';
import featured from '@/components/featured-project-comps/featured.vue';
import notFoundMsg from '@/components/modal-cards/not-found-msg.vue';
import editDetails from '@/components/featured-project-comps/edit-details.vue';

import { useProjectStore } from '@/stores/projects.store';
import { useProjectFileStore } from '@/stores/file.store';
import { useFeaturedProjectsStore } from '@/stores/featured.store';

const projectsStore = useProjectStore();
const fileStore = useProjectFileStore();
const featuredProjectStore = useFeaturedProjectsStore();

const isEditing = ref(false);
const editingProjectId = ref();
const showStaged = ref(false);

// Computed sets
const stagedProjects = computed(() => projectsStore.projects);
const projects = computed(() => featuredProjectStore.featuredProjects || []);

// Toggle displayed list based on slider
const displayedProjects = computed(() =>
  showStaged.value ? stagedProjects.value : projects.value
);


onMounted(() => {
  projectsStore.getFeaturedProjects();
  featuredProjectStore.getAllFeaturedProjects();
});
</script>
