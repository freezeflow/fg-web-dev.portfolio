<template>
    <div class="admin-view">
        <adminDetails
            v-if="adminStore.admin"
            :admin="adminStore.admin"
            :projectNum="projectStore.projects.length"
            :completedProjects="completedProjects.length"
            :clientsNum="clientStore.clients.length"
            :activeClients="activeClients.length"
        />
    </div>
</template>

<script setup>
    import adminDetails from '@/components/admin-comps/admin-details.vue';
    import { useAdminStore } from '@/stores/admin';
    import { useProjectStore } from '@/stores/projects.store';
    import { useClientStore } from '@/stores/client.store';
    import { onMounted, computed } from 'vue';

    const adminStore = useAdminStore()
    const projectStore = useProjectStore()
    const clientStore = useClientStore()
    const completedProjects = computed(() => {
        return projectStore.projects.filter(project => project.isCompleted)
    })

    const activeClients = computed(() => {
        return clientStore.clients.filter(client => client.status === 'active')
    })
    onMounted(async () => {
        adminStore.loadAdmin()
        await projectStore.getAllProjects()
        await clientStore.getAllClients()
    })
</script>