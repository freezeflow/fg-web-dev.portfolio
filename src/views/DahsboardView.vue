<template>
  <adminNav />
  <div class="dashboard-view" aria-label="Dashboard">
    <h1 class="h2-white">Welcome back</h1>
    <div class="dashboard-content" aria-label="Dashboard Content">
      <div class="activities-container" aria-label="Activities Container">
        <activities :lastDeployment="3" :totalProjects="projectStore.projects.length" :totalClients="clientStore.clients.length" />
      </div>
      <div class="metrics-container">
        <header>
          <span><ChartBar/></span><h2 class="h3-white">Site Metrics</h2>
        </header>
        <div class="metrics-charts">
          <averageUptime
            v-if="metricsStore.uptime"
            :uptime="metricsStore.uptime"
          />
          <averageLighthouseScore 
            v-if="metricsStore.lighthouse"
            :score="metricsStore.lighthouse"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import adminNav from '@/components/admin-nav.vue';
  import activities from '@/components/dashboard-comps/activities.vue';
  import averageUptime from '@/components/charts/average-uptime.vue';
  import averageLighthouseScore from '@/components/charts/average-lighthouse-score.vue';
  import { ChartBar } from 'lucide-vue-next';
  import { useAdminStore } from '@/stores/admin';
  import { useProjectStore } from '@/stores/projects.store';
  import { useClientStore } from '@/stores/client.store';
  import { useMetricsStore } from '@/stores/metrics.store';
  import { onMounted } from 'vue';

  const adminStore = useAdminStore()
  const projectStore = useProjectStore()
  const clientStore = useClientStore()
  const metricsStore = useMetricsStore()
  // const completedProjects = computed(() => {
  //     return projectStore.projects.filter(project => project.isCompleted)
  // })

  // const activeClients = computed(() => {
  //     return clientStore.clients.filter(client => client.status === 'active')
  // })

  onMounted(async () => {
      await projectStore.getAllProjects()
      await clientStore.getAllClients()
      await metricsStore.getMetrics()
  })

  adminStore.loadAdmin()
</script>