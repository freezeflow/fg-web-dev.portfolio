<script setup>
    import { RocketIcon, Users, Package } from 'lucide-vue-next';

    const props = defineProps({
        lastDeployment: {
            type: Number,
            required: true,
        },
        totalProjects: {
            type: Number,
            required: true,
        },
        totalClients: {
            type: Number,
            required: true,
        }
    });
</script>

<template>
    <section class="activities">
        <div>
            <p><span><RocketIcon/></span>Last Deployment: {{ props.lastDeployment }} month/s ago</p>
        </div>

        <div>
            <p><span><Package/></span>Total Projects: {{ props.totalProjects }}</p>
        </div>

        <div>
            <p><span><Users/></span>Total Clients: {{ props.totalClients }}</p>
        </div>
    </section>
</template>

<style scoped>
    .activities{
        background-color: var(--off-color);
        padding: 2rem;
        width: calc(60% - 4rem);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        border-radius: 15px;
    }

    .activities p{
        font-family: var(--paragraph-font);
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .activities p span{
        color: var(--secondary);
        font-size: 1.2rem;
    }

    .activities div{
        border-bottom: 2px solid var(--secondary);
    }

    @media screen and (max-width: 425px){
        .activities{
            width: calc(80% - 4rem);
        }

        .activities p{
            font-size: 12px;
        }
    }

    @media screen and (max-width: 780px) and (min-width: 426px){
        .activities{
            width: calc(80% - 4rem);
        }

        .activities p{
            font-size: 14px;
        }
    }
</style>