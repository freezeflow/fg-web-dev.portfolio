<script setup>
    import { ArrowRight } from 'lucide-vue-next';
    import router from '@/router';
    const props = defineProps({
        clientInfo: Object,
        getClient: Function
    })

    const getClientById = (id) =>{
        props.getClient(id)
        router.push('/clients/client')
    }
</script>

<template>
    <div class="client-info">
        <div class="heading"><p>{{ props.clientInfo.name }}</p> <span :class="props.clientInfo.status">{{ props.clientInfo.status }}</span></div>
        <p class="company">{{ props.clientInfo.company }}</p>
        <p>{{ props.clientInfo.email }}</p>
        <button @click="getClientById(props.clientInfo._id)"><ArrowRight /> Show more info</button>
    </div>
</template>

<style scoped>
    *{
        color: white;
        font-family: var(--paragraph-font);
    }

    .client-info{
        background-color: var(--off-color);
        border-radius: 5px;
        width: 50%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .heading{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .heading .active{
        background-color: rgb(0, 0, 58);
        font-size: 0.9rem;
        padding: 2px 1.5rem;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .heading .pending{
        border:1px solid rgb(0, 0, 100);
        font-size: 0.9rem;
        padding: 2px 1.5rem;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .heading p{
        font-family: var(--header-font);
        font-size: 1.5rem;
    }

    .company{
        color: rgb(109, 109, 109);
    }

    button{
        background-color: transparent;
        width: fit-content;
        color: var(--secondary);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: 10px;
        cursor: pointer;
        border: 0;
        outline: 0;
        padding: 0;
        transition: all 0.5s ease-in-out;
    }

    button svg{
        width: 15px;
        height: auto;
        color: var(--secondary);
    }

    button:hover{
        color: white;
    }

    @media screen and (max-width: 780px) {
        .client-info{
            width: 60%;
        }
    }

    @media screen and (max-width: 500px){
        .client-info{
            width: 80%;
        }

        .heading p{
            font-size: 1.2rem;
        }
    }
</style>