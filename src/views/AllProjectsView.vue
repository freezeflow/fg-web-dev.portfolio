<template>
    <admin-nav />
    <div class="all-projects-view">
        <header>
            <h1 class="h2-white">All Projects</h1>
            <search-projects v-model="search" v-if="projects.length !== 0" />
        </header>
        <div class="all-projects-controlls">
            <button class="new-project-btn" @click="newProject = true">Add new project</button>
        </div>
        <div class="projects-list">
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
import { ref, computed, onMounted } from 'vue';

import adminNav from '@/components/admin-nav.vue';
import allProjects from '@/components/projects-comps/all-projects.vue';
import searchProjects from '@/components/projects-comps/search-projects.vue';
import addProject from '@/components/modal-cards/add-project.vue';
import notFoundMsg from '@/components/modal-cards/not-found-msg.vue';

import { useProjectStore } from '@/stores/projects.store';
import { useTaskStore } from '@/stores/task.store';
import { useClientStore } from '@/stores/client.store';

const clientStore = useClientStore()
const taskStore = useTaskStore()
const projectsStore = useProjectStore()

const search = ref('')
const tasksByProject = ref({})
const clients = computed(() => clientStore.clients)
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

// onUnmounted(() => {
//     taskStore.clearTaskStorage()
// })
</script>
