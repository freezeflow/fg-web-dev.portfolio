<script setup>
    import { User, Mail, Briefcase, Clock, Users, UserCheck } from 'lucide-vue-next';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const props = defineProps({
        admin: Object,
        projectNum: '',
        completedProjects: '',
        clientsNum: '',
        activeClients: ''
    })
</script>

<template>
    <div class="container">
        <section>
            <h1>Details</h1>
            <div>
                <p><span><User/></span>{{ props.admin.name }}</p>
                <p><span><Mail/></span>{{ props.admin.email }}</p>
            </div>
            <div>
                <button>Edit</button>
            </div>

        </section>
        <section>
            <h2>Projects</h2>
            <div>
                <p><span><Briefcase /></span>Total projects: <strong>{{ props.projectNum }}</strong></p>
                <p><span><Clock /></span>Total completed projects: <strong>{{ props.completedProjects }}</strong></p>
            </div>
            <div>
                <button @click="router.push('projects/all')">Go to projects</button>
            </div>
        </section>
        <section>
            <h2>Clients</h2>
            <div>
                <p><span><Users /></span>Total clients: <strong>{{ props.clientsNum }}</strong></p>
                <p><span><UserCheck /></span>Active clients: <strong>{{ props.activeClients }}</strong></p>
            </div>
            <div>
                <button @click="router.push('clients')">Check clients</button>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .container{
        width: 85vw;
        height: 85vh;
        display: flex;
        padding: 2rem;
        color: white;
        border-radius: 10px;
        flex-direction: column;
        justify-content: space-between;
        background-color: var(--off-color);
        font-family: var(--paragraph-font);
    }

    h1, h2, h3{
        font-family: var(--header-font);
        text-decoration: underline;
    }

    section{
        width: 50%;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    section div{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    span svg{
        color: var(--secondary);
        width: 20px;
        height: auto;
    }

    p{
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    button{
        width: 50%;
        padding: 5px 0;
        border: 1px solid var(--secondary);
        border-radius: 3px;
        background-color: transparent;
        color: var(--secondary);
        cursor: pointer;
        transition: all 0.5s ease-in-out;
    }

    button:hover{
        color: white;
        border-color: white;
    }
</style>