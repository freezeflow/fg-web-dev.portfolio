<template>
  <adminNav />
  <div class="projects-view">
    <header>
      <h1 class="h2-white">Add/Edit Featured Projects</h1>
    </header>
    
    <div class="projects-container">
      <!-- Featured projects -->
        <featuredProjects
        v-if="projects.length"
        v-for="project in projects"
        :project="project"
        :upload-img="fileStore.uploadFile.bind(fileStore)"
        :fetch-img="fileStore.fetchFilePath.bind(fileStore)"
        :delete-img="fileStore.deleteFile.bind(fileStore)"
        @view-project="projectsStore.getProject"
      />
      
      <notFoundMsg v-if="!projects.length" msg="No featured projects found" />
    </div>
  </div>
</template>

<script setup> 
  import adminNav from '@/components/admin-nav.vue';
  import featuredProjects from '@/components/featured-project-comps/featured-projects.vue';
  import notFoundMsg from '@/components/modal-cards/not-found-msg.vue';

  import { useProjectStore } from '@/stores/projects.store';
  import { useProjectFileStore } from '@/stores/file.store';
  import { computed, onMounted } from 'vue';

  const projectsStore = useProjectStore()
  const fileStore = useProjectFileStore()
  const projects = computed(() => projectsStore.projects);

  onMounted(() => {
    projectsStore.getFeaturedProjects();
  });
</script>