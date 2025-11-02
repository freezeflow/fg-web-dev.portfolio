<template>
  <adminNav />
  <div class="dashboard-view w-full h-screen flex flex-col items-center p-12 pt-20 text-white gap-10" aria-label="Dashboard">
    <header class="w-full flex flex-col items-center justify-center gap-10">
      <h1 class="text-4xl max-sm:text-2xl">Welcome back {{ user.name }}</h1>
      <div class="w-full flex flex-row gap-2 items-center justify-center">
        <search-projects v-model="search" v-if="projectsStore.projects.length !== 0" />
        <button class="bg-secondary rounded p-1 cursor-pointer hover:bg-secondary/80" @click="newProject = true"><Plus class=""/></button>
      </div>
    </header>
    <div class="projects pr-0.5 w-[60%] max-sm:w-[90%] max-md:w-[80%] flex flex-col gap-5 items-center overflow-y-auto " aria-label="Dashboard Content">
      <all-projects
        v-if="projects.length !== 0"
        :projects="projects"
        @viewProject="projectsStore.getProject"
        @projectTask="projectsStore.getProject"
        :deleteProject="projectsStore.deleteProject"
        :tasksByProject="tasksByProject"
        :clients="clients"
      />
      <notFoundMsg v-else msg="No projects found, please add some" />
    </div>
    <Teleport to="body">
      <!-- Edit modal -->
      <add-project v-if="newProject"
        @close="newProject = false"
      />
    </Teleport>
  </div>
</template>

<script setup>
  import adminNav from '@/components/admin-nav.vue';
  import searchProjects from '@/components/projects-comps/search-projects.vue';
  import allProjects from '@/components/projects-comps/all-projects.vue';
  import notFoundMsg from '@/components/modal-cards/not-found-msg.vue';
  import addProject from '@/components/modal-cards/add-project.vue';
  import { useAdminStore } from '@/stores/user';
  import { onMounted, ref, computed } from 'vue';

  import { useProjectStore } from '@/stores/projects.store';
  import { useTaskStore } from '@/stores/task.store';
  import { useClientStore } from '@/stores/client.store';

  import { Plus } from 'lucide-vue-next';

  const clientStore = useClientStore()
  const taskStore = useTaskStore()
  const projectsStore = useProjectStore()
  const adminStore = useAdminStore()
 
  const search = ref('')
  const tasksByProject = ref({})
  const clients = computed(() => clientStore.clients)
  const user = adminStore.user

  const projects = computed(() => {
    const term = search.value.trim().toLowerCase()
    if (!term) return projectsStore.projects

    return projectsStore.projects.filter(project => {
        const matchesProject =
        project.title?.toLowerCase().includes(term) ||
        project.type?.toLowerCase().includes(term)

        const matchesClient = clientStore.clients.some(client =>
        client.name.toLowerCase().includes(term) &&
        client.projects.some(p => p._id === project._id)
        )

        return matchesProject || matchesClient
    })
  })

  const newProject = ref(false)

  onMounted(async () => {
      await projectsStore.getAllProjects()
    
      // 1. Get all tasks per project
      for (const project of projects.value) {
        const tasks = await taskStore.fetchAllTasks(project._id)
        tasksByProject.value[project._id] = tasks
      }

      // 2. Fetch clients by project IDs (with only certain fields)
      const projectIds = projects.value.map(p => p._id)
      await clientStore.getClientsByProjectIds(projectIds, 'name')
  })
</script>