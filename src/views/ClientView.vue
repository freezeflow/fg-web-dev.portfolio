<template>
    <admin-nav />
    <div class="client-view">
        <div class="client-controls">
            <input type="search" placeholder="Search client..." v-model="search">
            <button @click="add = !add">Create client</button>
        </div>
        <div class="client-list" v-if="clientsList">
            <clients
                v-if="clientsList"
                v-for="(client, index) in clientsList"
                :key="index"
                :clientInfo="client"
                :getClient="clientStore.getClient.bind(clientStore)"
            />
        </div>
        <div v-else>
            <h2>No clients, please add some</h2>
        </div>
    </div>

    <teleport to="body">
        <add-client 
            v-if="add"
            @close="add = false"
            :createClient="clientStore.createClient.bind(clientStore)"
        />
    </teleport>
</template>

<script setup>
    import adminNav from '@/components/admin-nav.vue';
    import clients from '@/components/client-comps/clients.vue';
    import addClient from '@/components/client-comps/add-client.vue';
    import { useClientStore } from '@/stores/client.store';
    import { computed, onMounted, ref } from 'vue';

    const clientStore = useClientStore()
    const search = ref('')
    const add = ref(false)
    const clientsList = computed(()=> {
        if(!search.value) return clientStore.clients

        return clientStore.clients.filter(c => {
            const matchesClient = 
            c.name.includes(search.value) || 
            c.company.includes(search.value) ||
            c.email.includes(search.value)

            return matchesClient
        })
    })

    onMounted(async () =>{
        await clientStore.getAllClients()
    })
</script>