<script setup>
    import { watch, ref } from 'vue';

    import { 
        PenSquare, 
        Trash, 
        AlignLeft, 
        FileText, 
        CpuIcon, 
        Tags, 
        Phone, 
        CalendarCheck, 
        CheckCircle, 
        CircleDashed, 
        CheckSquare,
        Mail,
        User,
        ListTodo } from 'lucide-vue-next';
        import router from '@/router';

    const emits = defineEmits(['delete', 'edit','get-client'])

    const props = defineProps({
        project: {
            required: true
        },

        completeTasks:{
            type: Number
        },

        todoTasksAndBusy: {
            type: Number
        },

        client: {
            type: Array,
            default: () => []
        },

        role: Boolean
    })

    watch(() => props.client, (newVal) => {
        if (newVal) {
            
        }
    })
</script>

<template>
    <div :class="props.role? 'client-project-container':'project-container'">
        <div class="project-details">
            <header>
                <h2>{{ props.project.title }}</h2>
                <div class="editor-actions">
                    <button v-if="!props.role" @click="emits('edit')"><PenSquare /></button>
                    <button v-if="!props.role" @click="emits('delete')"><Trash /></button>
                </div>
            </header>
            <section class="details-container">
                <div class="details">
                    <AlignLeft width="40px" height="40px"/>
                    <p>{{ props.project.description }}</p>
                </div>

                <div class="details">
                    <FileText />
                    <p>{{ props.project.summary }}</p>
                </div>

                <div class="details">
                    <CpuIcon />
                    <div class="tech-container">
                        <p v-for="tech in props.project.tech" class="">{{ tech }}</p>
                    </div>
                </div>
                <div class="details">
                    <Tags />
                    <p>{{ props.project.type }}</p>
                </div>  
            </section>
            <section class="progress-details">
                <div>
                    <CircleDashed v-if="!props.project.isCompleted"/>
                    <CheckCircle v-else />

                    <p>{{ props.project.isCompleted? 'Completed':'In Progress' }}</p>
                </div>
                <div v-if="props.project.isCompleted">
                    <CalendarCheck />
                    <p>{{ props.project.dateCompleted }}</p>
                </div>
                <div v-if="!props.project.isCompleted" class="progress complete">
                    <CheckSquare />
                    <p>{{ props.completeTasks }} Tasks Completed</p>
                </div>
                <div v-if="!props.project.isCompleted" class="progress incomplete">
                    <ListTodo />
                    <p>{{ props.todoTasksAndBusy }} Tasks in progress</p>
                </div>
                <button v-if="!props.project.isCompleted" @click="router.push('/projects/tasks')">{{props.role? 'Check task progress' : 'Manage tasks'}}</button> 
            </section>
        </div>
        <div class="client-details" v-if="!props.role && props.client.length !== 0">
            <div class="details-container">
                <h3>{{ props.client[0].company }}</h3>
                <div class="client">
                    <User />
                    <p>{{ props.client[0].name }}</p>
                </div>
                <div class="client">
                    <Phone />
                    <p>{{ props.client[0].phone }}</p>
                </div>
                <div class="client">
                    <Mail />
                    <p>{{ props.client[0].email }}</p>
                </div>
                <button @click="emits('get-client')">Manage client</button>
            </div>
            
        </div>
    </div>
</template>

<style scoped>
    .project-container{
        width: 80%;
        height: 80%;
        border-radius: 10px;
        padding: 2rem;
        background-color: var(--off-color);
        color: white;
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
    }

    .client-project-container{
        width: 60%;
        height: 80%;
        border-radius: 10px;
        padding: 2rem;
        background-color: var(--off-color);
        color: white;
        display: flex;
        flex-direction: row;
        gap: 1.5rem;
    }

    .project-details{
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .details-container{
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    header{
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid white;
        font-family: var(--header-font);
    }

    header> div{
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    header> div button{
        background-color: transparent;
        border: 0;
        color: var(--secondary);
        cursor: pointer;
    }

    header> div button:hover{
        color: white;
    }

    .details{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        font-family: var(--paragraph-font);
        align-items: center;
        font-size: 1rem;
    }

    .details svg{
        min-width: 20px !important;
        min-height: 20px !important;
        color: var(--secondary);
    }

    .tech-container{
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .tech-container p{
        background-color: var(--secondary);
        padding: 0 15px;
        border-radius: 5px;
        text-align: center
    }

    .progress-details{
        display: flex;
        flex-direction: column;
        gap: 1.3rem;
    }

    .progress-details div{
        font-family: var(--paragraph-font);
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    div svg{
        color: var(--secondary);
        min-width: 20px;
        min-height: 20px;
    }

    div .progress.complete svg{
        color: rgb(4, 185, 4);
    }

    div .progress.incomplete svg{
        color: orange;
    }

    .progress-details button{
        width: 30%;
        border: 1px solid var(--secondary);
        color: var(--secondary);
        background-color: transparent;
        border-radius: 3px;
        padding: 2px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    .progress-details button:hover{
        color: white;
        border-color: white;
    }

    .client-details{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .client-details h3{
        font-family: var(--header-font);
        text-decoration: underline;
    }

    .client{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        font-family: var(--paragraph-font);
    }

    .client-details button{
        border: 1px solid var(--secondary);
        transition: all 0.2s ease-in-out;
        background-color: transparent;
        color: var(--secondary);
        border-radius: 3px;
        cursor: pointer;
        padding: 2px;
    }

    .client-details button:hover{
        border-color: white;
        color: white;
    }

    @media screen and (max-width: 780px){
        .project-container{
            flex-direction: column;
            min-height: 100vh;
        }

        .project-details{
            width: 100%;
        }

        .client-details{
            width: 100%;
            justify-content: start;
            align-items: start;
        }

        .editor-actions{
            display: none;
        }
    }

    @media screen and (max-width: 660px){
        .client-project-container{
            width: 90%;
            padding: 1rem;
        }

        header{
            width: 100%;
        }

        header button{
            width: 30px;
            height: 30px;
        }

        header button svg{
            min-width: 15px !important;
            min-height: 15px !important;
        }

        .details{
            font-size: 0.9rem;
        }

        .details svg{
            min-width: 15px !important;
            min-height: 15px !important;
        }

        .progress-details{
            font-size: 0.9rem;
        }

        .tech-container{
            flex-direction: unset;
            flex-wrap: wrap;
        }

        .tech-container p{
            flex: 1 1;
            padding: 0 5px;
            display: flex;
            justify-content: center;
            align-content: center;
        }

        div svg{
            min-width: 15px !important;
            min-height: 15px !important;
        }

        .progress-details button{
            width: 100%;
        }

        .client-details{
            font-size: 0.9rem;
        }

        .client-details svg{
            min-width: 10px !important;
            min-height: 10px !important;
        }

        .client-details button{
            width: 100%;
        }

        .details-container{
            width: 100%;
        }
    }
</style>