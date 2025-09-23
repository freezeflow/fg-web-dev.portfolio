<template>
    <admin-nav 
        v-if="clientRole"
    />

    <div class="project-details-container">
        <div class="project-details-container">
            <projectDetails
                v-if="selectedProject"
                :project="selectedProject"
                :complete-tasks="completeCount"
                :todo-tasks-and-busy="todoCount + busyCount"
                :client="client"
                :role="clientRole"
                @delete="!clientRole && (isDeleting = true)"
                @edit="!clientRole && (isEditing = true)"
                @get-client="!clientRole && (getClientById)"
            />
            <p v-else>Loading project...</p>
        </div>
    </div>
    <Teleport to="body">
        <!-- Edit project modal -->
        <editProject v-if="isEditing && !clientRole"
        @close="isEditing = false"
            :project="selectedProject"
            :client="client[0]"
        />

        <!-- Delete modal -->
        <deleteCard v-if="isDeleting && !clientRole" 
        @close="isDeleting = false"
        :title="selectedProject.title"/>
    </Teleport>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { ref, onMounted, onUnmounted } from 'vue';
    import { useTaskStore } from '@/stores/task.store';
    import { useClientStore } from '@/stores/client.store';
    import { useLoggedClientStore } from '@/stores/logged.client.store';

    import projectDetails from '@/components/projects-comps/project-details.vue';
    import editProject from '@/components/modal-cards/edit-project.vue';
    import deleteCard from '@/components/modal-cards/delete-card.vue';
    import adminNav from '@/components/admin-nav.vue';

    const clientStore = useClientStore()
    const selectedProject = ref(null)
    const isDeleting = ref(false)
    const isEditing = ref(false)
    const completeCount = ref()
    const todoCount = ref()
    const busyCount = ref()
    const client = ref([])
    const clientRole = ref()
    const loggedClientStore = useLoggedClientStore()

    const router = useRouter()
    const taskStore = useTaskStore()

    onMounted(async () => {
        const storedRole = localStorage.getItem('role')
        if(storedRole){
            const user = JSON.parse(storedRole)
            clientRole.value = user === 'client'
        }

        const stored = localStorage.getItem('selectedProject')
        if (stored && !clientRole.value) {
            selectedProject.value = JSON.parse(stored)
            await taskStore.fetchAllTasks(selectedProject.value._id)
            const complete = localStorage.getItem(selectedProject.value._id+'completeTasks');
            const todo = localStorage.getItem(selectedProject.value._id+'todoTasks');
            const busy = localStorage.getItem(selectedProject.value._id+'busyTasks');

            const completeTasks = complete ? JSON.parse(complete) : [];
            const todoTasks = todo ? JSON.parse(todo) : [];
            const busyTasks = busy ? JSON.parse(busy) : [];

            // Get counts
            completeCount.value = Array.isArray(completeTasks) ? completeTasks.length : Object.keys(completeTasks).length;
            todoCount.value = Array.isArray(todoTasks) ? todoTasks.length : Object.keys(todoTasks).length;
            busyCount.value = Array.isArray(busyTasks) ? busyTasks.length : Object.keys(busyTasks).length;

            // Get client details
            await clientStore.getClientsByProjectIds(selectedProject.value._id, 'name company phone email')
            client.value = clientStore.clients
        } else if(stored && clientRole.value){
            selectedProject.value = JSON.parse(stored)
            loggedClientStore.fetchAllTasks(selectedProject.value._id)

            const complete = localStorage.getItem(`${selectedProject.value._id}completeTasks`);
            const todo = localStorage.getItem(selectedProject.value._id+'todoTasks');
            const busy = localStorage.getItem(selectedProject.value._id+'busyTasks');

            const completeTasks = complete ? JSON.parse(complete) : [];
            const todoTasks = todo ? JSON.parse(todo) : [];
            const busyTasks = busy ? JSON.parse(busy) : [];

            // Get counts
            completeCount.value = Array.isArray(completeTasks) ? completeTasks.length : Object.keys(completeTasks).length;
            todoCount.value = Array.isArray(todoTasks) ? todoTasks.length : Object.keys(todoTasks).length;
            busyCount.value = Array.isArray(busyTasks) ? busyTasks.length : Object.keys(busyTasks).length;
        } else {
            router.push('/projects/all')
        }
    })

    function getClientById(){
        clientStore.getClient(client.value[0]._id)
        router.push('/clients/client')
    }

    onUnmounted(() => {
        if(!clientRole){
            localStorage.removeItem('selectedProject')
            taskStore.clearTaskStorage()
        }
        
    })

    
</script>