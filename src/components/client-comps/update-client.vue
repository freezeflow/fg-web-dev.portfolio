<script setup>
    import { ref } from 'vue'
    const emits = defineEmits(['close'])
    const props = defineProps({
        updateClient: Function,
        clientInfo: Object
    });

    const errorMessage = ref('Create client')

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    function validateForm() {
        if (!props.clientInfo.name || !props.clientInfo.email || !props.clientInfo.phone || !props.clientInfo.company || !props.clientInfo.location) {
            errorMessage.value = 'All fields are required'
            return
        }

        if (!validateEmail(props.clientInfo.email)) {
            errorMessage.value = 'Invalid email format'
            return
        }

        // Passed validation
        errorMessage.value = 'Create client'
        saveForm()
    }

    function saveForm() {
        const form = {
            name: props.clientInfo.name,
            email: props.clientInfo.email,
            phone: props.clientInfo.phone,
            company: props.clientInfo.company,
            location: props.clientInfo.location,
            status: props.clientInfo.status,
        }
        
        // console.log('Form submitted:', form)
        // Add logic here to submit data to your API or store
        props.updateClient(props.clientInfo._id , form)
    }
</script>

<template>
    <div class="edit-client-container">
        <div class="content">
            <header><button @click="emits('close')">x</button> <p>{{ errorMessage }}</p></header>
            <form @submit.prevent="validateForm">
                <div>
                    <input v-model="props.clientInfo.name" type="text" placeholder="Name" />
                </div>
                <div>
                    <input v-model="props.clientInfo.email" type="text" placeholder="Email" />
                </div>
                <div>
                    <input v-model="props.clientInfo.phone" type="text" placeholder="Phone" />
                </div>
                <div>
                    <input v-model="props.clientInfo.company" type="text" placeholder="Company" />
                </div>
                <div>
                    <input v-model="props.clientInfo.location" type="text" placeholder="Location" />
                </div>

                <div class="checkboxes">
                    <div v-if="props.clientInfo.status !== 'active'">
                        <label>Active</label>
                        <input type="checkbox" @change="props.clientInfo.status = 'active'" />
                    </div>
                    <div v-else>
                        <label>Pending</label>
                        <input type="checkbox" @change="props.clientInfo.status = 'pending'" />
                    </div>
                </div>

                <div class="control">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
    *{
        color: white;
        font-family: var(--paragraph-font);
    }
    .edit-client-container{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.596);
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content{
        background-color: var(--off-color);
        padding: 1rem;
        width: 45%;
        height: 60vh;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: center;
        align-items: center;
    }

    .content header{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }

    .content header p{
        margin: auto;
        font-family: var(--header-font);
        font-size: 1.2rem;
    }

    .content header button{
        color: var(--secondary);
        background-color: transparent;
        border: 0;
        font-weight: bolder;
    }

    form{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    form div{
        width: 80%;
    }

    form input{
        width: 100%;
        padding: 0.5rem;
        background-color: transparent;
        border: 1px solid var(--secondary);
        border-radius: 5px;
    }

    .checkboxes{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .checkboxes div{
        width: fit-content;
        display: flex;
        flex-direction: row;
        gap: 5px;
    }

    .control button{
        padding: 3px 1.5rem;
        border: 0;
        border-radius: 3px;
        background-color: var(--secondary);
    }

    @media screen and (max-width: 425px){
        .content{
            width: 80%;
            height: 70vh;
        }

        .control button{
            width: calc(100% + 1rem);
        }
    }

    @media screen and (min-width: 426px) and (max-width: 780px){
        .content{
            width: 70%;
            height: 70vh;
        }
    }
</style>