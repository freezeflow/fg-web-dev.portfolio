<template>
  <adminNav />
  <div class="dashboard-view" aria-label="Dashboard">
    <div class="dashboard-content" aria-label="Dashboard Content">
      <div class="activities-container" aria-label="Activities Container">
        <activities :lastDeployment="3" :totalProjects="projectStore.projects.length" :totalClients="clientStore.clients.length" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import adminNav from '@/components/admin-nav.vue';
  import activities from '@/components/dashboard-comps/activities.vue';
  import { useAdminStore } from '@/stores/user';
  import { useProjectStore } from '@/stores/projects.store';
  import { useClientStore } from '@/stores/client.store';
  import { onMounted } from 'vue';

  const projectStore = useProjectStore()
  const clientStore = useClientStore()
  // const completedProjects = computed(() => {
  //     return projectStore.projects.filter(project => project.isCompleted)
  // })

  // const activeClients = computed(() => {
  //     return clientStore.clients.filter(client => client.status === 'active')
  // })

  onMounted(async () => {
      await projectStore.getAllProjects()
      await clientStore.getAllClients()
  })
</script>