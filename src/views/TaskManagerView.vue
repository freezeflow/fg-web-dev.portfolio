<template>
    <adminNav 
        v-if="clientRole"
    />
    <main :class="clientRole? 'client-task-manager':'task-manager'">
        <taskBoard 
            v-if="project"
            :title="project.title"
            :projectId="project._id"
            :change-task-status="taskStore.changeStatus.bind(taskStore)"
            :delete-task="taskStore.deleteTask.bind(taskStore)"
            :todo="taskStore.tasksByStatus.todo"
            :busy="taskStore.tasksByStatus.busy"
            :complete="taskStore.tasksByStatus.complete"
            :overdue="taskStore.tasksByStatus.overdue"
            :isClient="clientRole"
        />

        <taskStage
            v-if="project && !clientRole"
            :project-id="project._id"
            :createTask="taskStore.createTask.bind(taskStore)"
            :delete-task="taskStore.deleteTask.bind(taskStore)"
            :stagedTasks="taskStore.tasksByStatus.staged"
            @send-staged="addStagedTask"
        />
    </main>
</template>

<script setup>
    import taskBoard from '@/components/task-manager-comps/task-board.vue';
    import taskStage from '@/components/task-manager-comps/task-stage.vue';
    import { useTaskStore } from '@/stores/task.store';
    import { useRouter } from 'vue-router';
    import { ref, onMounted, onUnmounted } from 'vue';
    import adminNav from '@/components/admin-nav.vue';

    const router = useRouter()
    const taskStore = useTaskStore()
    const project = ref(null)
    const clientRole = ref()

    onMounted(async () => {
        const storedRole = localStorage.getItem('role')
        if(storedRole){
            const user = JSON.parse(storedRole)
            clientRole.value = user === 'client'
        }
        const stored = localStorage.getItem('selectedProject');
        if (stored) {
            project.value = JSON.parse(stored);
            taskStore.loadTasks(project.value._id)
        } else {
            router.push('/projects/all');
            if(clientRole){
                router.push('/clients/client');
            }

            router.push('/projects/all');
        }
    })

    onUnmounted(() => {
        if(!clientRole){
            localStorage.removeItem('selectedProject');
        }
        
    })

    function addStagedTask(task) {
        stagedTasks.value.push(task)
    }
</script>