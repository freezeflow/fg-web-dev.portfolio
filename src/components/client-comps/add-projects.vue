<script lang="ts" setup>
    import { X } from 'lucide-vue-next';
    import { ref, computed } from 'vue';

    const projectId = ref<string | null>(null)
    const emits = defineEmits<{
        (e:'close'): void
        (e:'add', id: string): void
    }>()

    interface Project {
        _id: string
        title: string
    // add more fields if you have them, e.g. description, status, etc.
    }

    const props = defineProps<{
        clientId: string,
        updateClient: Function,
        projects: Project[],
        clientProjects: Project[]
    }>()

    const selectedProject = computed(() => {
        return props.projects.find(p => p._id === projectId.value) || null
    })

    const handleAddProject = async () => {
        if (!selectedProject.value) return

        // Create a new array with existing clientProjects + new project ID
        const updatedProjects = [...props.clientProjects.map(p => p._id), selectedProject.value._id]

        const form = { projects: updatedProjects }

        await props.updateClient(props.clientId, form)
    }
</script>

<template>
    <div class="container">
        <div class="content-container">
            <button @click="emits('close')"><X /></button>
            <div class="content">
                <h2>Add project</h2>
                <div v-for="(project, index) in props.projects">
                    <input type="radio" :value="project._id" name="project" v-model="projectId"><p>{{ `${index+1}.` }} {{ project.title }}</p>
                </div>
                <button v-if="selectedProject" class="add-btn" @click="handleAddProject">{{ "Add " + selectedProject.title }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container{
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.479);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-family: var(--paragraph-font);
    }

    .content-container{
        width: 50%;
        height: 90%;
        background-color: var(--off-color);
        border-radius: 10px;
    }

    .content-container button{
        background-color: transparent;
        border: 0;
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .content-container button svg{
        color: var(--secondary);
        width: 20px;
        height: auto;
    }

    h2{
        font-family: var(--header-font);
        margin-bottom: 10px;
    }

    .content{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content div{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    p{
        font-size: 1.2rem;
    }

    button.add-btn{
        color: white;
        padding: 10px 2rem;
        width: 40%;
        border: 1px solid white;
        border-radius: 5px;
    }

    @media screen and (max-width: 375px){
        .content-container{
            width: 90%;
        }

        button.add-btn{
            width: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    @media screen and (max-width: 780px) and (min-width: 375px){
        .content-container{
            width: 70%;
        }

        button.add-btn{
            width: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>