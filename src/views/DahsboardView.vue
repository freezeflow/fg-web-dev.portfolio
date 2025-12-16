<template>
  <adminNav />
  <div class="dashboard-view w-full h-screen flex flex-col items-center max-sm:px-4 p-12 pt-20 text-white gap-10" aria-label="Dashboard">
    <header class="w-full flex flex-col items-center justify-center gap-10">
      <h1 class="text-4xl max-sm:text-xl">Welcome back {{ user?.name }}</h1>
    </header>
    <div class="pr-0.5 w-[60%] max-sm:w-[90%] max-md:w-[80%] flex flex-col gap-5 items-center" aria-label="Dashboard Content">
      
      <div class="projects w-full flex flex-col gap-5 items-center overflow-y-auto">
        <projects
          v-if="featuredStore.featuredProjects.length > 0"
          v-for="project in featuredStore.featuredProjects"
          :key="project._id"
          :project="project"
        />
      </div>
      

      <notFoundMsg v-if="featuredStore.featuredProjects.length === 0" msg="No projects found, please add some" />
      <button class="max-sm:hidden bg-navy/60 hover:bg-navy/75 transition-all w-full text-white rounded text-center p-2 flex flex-row justify-center items-center gap-2 border border-navy cursor-pointer" @click="newProject = true"><Plus /> New project</button>
    </div>
    <Teleport to="body">
      <createProject 
        v-if="newProject"
        :create-project="featuredStore.createFeaturedProject.bind(featuredStore)"
        :loading="featuredStore.loading"
        @close="newProject = false"
      />
    </Teleport>
  </div>
</template>

<script setup>
  import adminNav from '@/components/admin-nav.vue';
  import notFoundMsg from '@/components/modal-cards/not-found-msg.vue';
  import createProject from '@/components/projects-comps/create-project.vue';
  import projects from '@/components/projects-comps/projects.vue';
  import { useAdminStore } from '@/stores/user';
  import { onMounted, ref, computed } from 'vue';

  import { useFeaturedProjectsStore } from '@/stores/featured.store';

  import { Plus } from 'lucide-vue-next';

  const featuredStore = useFeaturedProjectsStore()
  const adminStore = useAdminStore()
 
  const user = adminStore.user

  const newProject = ref(false)

  onMounted(async () => {
      await featuredStore.getAllFeaturedProjects()
  })
</script>