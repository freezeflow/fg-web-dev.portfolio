<script setup>
    import { Trash, FileText, ExternalLink } from 'lucide-vue-next'
    import deleteCard from '../modal-cards/delete-card.vue';
    import { ref } from 'vue';

    const selectedIndex = ref()
    const isDeleting = ref(false)

    const emits = defineEmits(['viewProject', 'projectTask'])

    const props = defineProps({
        projects: {
            type: Array,
            required: true
        },

        deleteProject: Function,
        tasksByProject: Object,
        clients: Object
    });

    const openDeleteModal = (index) =>{
        if(isDeleting.value === false) isDeleting.value = true
        selectedIndex.value = index
    }
    
    const handleDelete = (result) => {
        // Continue to delete or trigger next action
        if(result.success) props.deleteProject(props.projects[selectedIndex.value]._id)

    }

    function getClientNameByProjectId(projectId) {
        const client = props.clients.find(c => 
            Array.isArray(c.projects) && 
            c.projects.some(p => 
                typeof p === 'string' 
                    ? p === projectId 
                    : p._id?.toString() === projectId
            )
        )
        return client ? client.name : 'Personal'
    }
</script>

<template>
    <div class="project-div" v-for="(project, index) in props.projects">
        <header>{{ project.title }}</header>
        <div class="content">
            <p><strong>Project Type: </strong>{{ project.type }}</p>
            <p><strong>Client: </strong>{{ getClientNameByProjectId(project._id) }}</p>
            <div class="tasks">
                <strong>Completed/Busy Tasks: </strong>
                <p class="tasks-count" @click="emits('projectTask', project._id, '/projects/tasks')">
                    <span class="green">
                        {{ Object.keys(props.tasksByProject[project._id]?.complete || {}).length }}
                    </span> : 
                    <span class="orange">
                        {{
                            Object.keys(props.tasksByProject[project._id]?.todo || {}).length +
                            Object.keys(props.tasksByProject[project._id]?.busy || {}).length
                        }}
                    </span>
                </p>
            </div>
            <div class="footer">
                <small>
                    <strong>Started: </strong>{{ new Date(project.createdAt).toLocaleDateString() }}
                </small>
                <div class="actions">
                    <button @click="emits('viewProject', project._id, '/projects/project')"><FileText/></button>
                    <button @click="openDeleteModal(index)"><Trash/></button>
            </div>
            </div>
        </div>
    </div>

    <Teleport to="body">
        <!-- Delete modal -->
        <deleteCard v-if="isDeleting"
        @close="isDeleting = false"
        :title="props.projects[selectedIndex].title"
        @validation-result="handleDelete"
        />
    </Teleport>
    
</template>

<style scoped>

    *{
        font-family: var(--paragraph-font);
    }

    .project-div{
        width: 100%;
        padding: 1rem;
        background-color: var(--off-color);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .project-div header{
        font-size: 1.3rem;
        font-family: var(--header-font);
        text-align: center;
        width: 100%;
    }

    .content{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .green{
        color: #00ce1b;
    }

    .orange{
        color: #e4c200;
    }

    .tasks{
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

     button svg{
        width: 20px;
        height: 20px;
        color: var(--secondary);
        transition: all 0.3s ease-in-out;
    }

     button{
        border: 0;
        outline: none;
        border-radius: 3px;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
    }

     button:hover svg{
        color: white;
    }

    .tasks-count{
        cursor: pointer;
    }

    .tasks-count:hover{
        opacity: 0.8;
    }

    .footer{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .actions{
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    small{
        color: rgb(126, 126, 126);
    }

    @media screen and (max-width: 780px){
        .project-div{
            width: 90%;
        }

        header{
            font-size: 1.1rem;
        }

        .content{
            gap: 1rem;
        }
    }
</style>