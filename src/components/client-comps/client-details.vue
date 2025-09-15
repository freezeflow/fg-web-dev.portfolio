<script lang="ts" setup>
    import { Trash, XCircle } from 'lucide-vue-next';
    const emits = defineEmits<{
       (e: 'remove', project: {id: string, title: string}): void
       (e: 'add-project'): void
       (e: 'edit'): void
       (e: 'delete'): void
    }>()
    const props = defineProps({
        clientInfo: Object,
        projects: Array || Object,
        isClient: Boolean
    })
</script>

<template>
    <section>
        <div class="client-details">
            <div class="heading">
                <p> {{ props.isClient? 'Welcome': '' }} {{ props.clientInfo.name }}</p> <span :class="props.clientInfo.status">{{ props.clientInfo.status }}</span>
            </div>
            
            <div>
                <p><span>Emial:</span> {{ props.clientInfo.email }}</p>
                <p><span>Phone:</span> {{ props.clientInfo.phone }}</p>
                <p><span>Company:</span> {{ props.clientInfo.company }}</p>
                <p><span>Location:</span> {{ props.clientInfo.location }}</p>
                <p><span>Client since:</span> {{ props.clientInfo.createdAt.split("T")[0] }}</p>
                <div class="projects">
                    <span class="projects-list">Projects: <button v-if="!props.isClient"@click="emits('add-project')">Add project</button></span>
                    <p v-for="(project, index) in props.projects" :key="project._id">
                        {{ `${index+1}. ${project.title}` }}
                        <button class="remove" @click="emits('remove', {id: project._id, title: project.title})" v-if="!props.isClient"><XCircle /></button>
                    </p>
                </div>
            </div>
            
            <div class="client-control" v-if="!props.isClient">
                <button class="delete" @click="emits('delete')"><Trash /></button>
                <button class="edit" @click="emits('edit')">Edit client details</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
    *{
        color: white;
        font-family: var(--paragraph-font);
    }

    .client-details{
        width: 100%;
        min-height: calc(100vh - 6rem);
        border-radius: 5px;
        background-color: var(--off-color);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .client-details .heading{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }

    .heading p{
        font-family: var(--header-font);
        font-size: 1.2rem;
        border-bottom: 1px solid white;
    }

    .heading .active{
        background-color: rgb(0, 0, 58);
        font-size: 0.9rem;
        padding: 2px 1.5rem;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .heading .pending{
        border:1px solid rgb(0, 0, 100);
        font-size: 0.9rem;
        padding: 2px 1.5rem;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .client-details div{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .client-details div span{
        color: rgb(173, 173, 173);
    }

    .projects{
        display: flex;
        flex-direction: column;
    }

    .projects-list{
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    .projects-list button{
        background-color: var(--secondary);
        border: 0;
        border-radius: 3px;
        transition: all 0.3s ease-in-out;
    }

    .client-details .projects span{
        font-weight: bold;
        color: white;
    }

    .client-details .client-control{
        margin-top: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .delete{
        background-color: transparent;
        border: 0;
        outline: 0;
    }

    .delete svg{
        color: var(--secondary);
        transition: all 0.3s ease-in-out;
    }

    .delete svg:hover{
        color: white;
    }

    .delete:hover{
        opacity: 1;
    }

    .edit{
        background-color: var(--secondary);
        border: 0;
        outline: 0;
        border-radius: 5px;
        transition: all 0.3s ease-in-out;
    }

    .remove{
        background-color: transparent;
        border: 0;
    }

    .remove svg{
        color: var(--secondary);
        width: 20px;
        height: auto;
    }

    button:hover{
        cursor: pointer;
        opacity: 0.8;
    }

    @media screen and (max-width: 780px){
        .edit{
            display: none;
        }
    }

    @media screen and (max-width: 425px){
        *{
            font-size: 0.9rem;
        }

        .heading p{
            font-size: 1rem;
        }
    }
</style>