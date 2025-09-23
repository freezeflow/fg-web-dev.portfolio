<script setup>
    import { reactive, ref } from 'vue'

    const emits = defineEmits(['close'])
    const props = defineProps({
        createClient: Function
    })
    const form = reactive({
        name: '',
        email: '',
        phone: '',
        company: '',
        location: '',
        status: '',
    })

    const errorMessage = ref('Create client')

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    function validateForm() {
    if (!form.name || !form.email || !form.phone || !form.company || !form.location) {
        errorMessage.value = 'All fields are required'
        return
    }

    if (!validateEmail(form.email)) {
        errorMessage.value = 'Invalid email format'
        return
    }

    // Passed validation
    errorMessage.value = 'Create client'
    saveForm()
    }

    function saveForm() {
    // console.log('Form submitted:', form)
    // Add logic here to submit data to your API or store
    props.createClient(form)
    }
</script>

<template>
    <div class="add-client-container">
        <div class="content">
            <header><button @click="emits('close')">x</button> <p>{{ errorMessage }}</p></header>
            <form @submit.prevent="validateForm">
                <div>
                    <input v-model="form.name" type="text" placeholder="Name" />
                </div>
                <div>
                    <input v-model="form.email" type="text" placeholder="Email" />
                </div>
                <div>
                    <input v-model="form.phone" type="text" placeholder="Phone" />
                </div>
                <div>
                    <input v-model="form.company" type="text" placeholder="Company" />
                </div>
                <div>
                    <input v-model="form.location" type="text" placeholder="Location" />
                </div>

                <div class="checkboxes">
                    <div>
                        <label>Active</label>
                        <input type="checkbox" @change="form.status = 'active'" />
                    </div>
                    <div>
                        <label>Pending</label>
                        <input type="checkbox" @change="form.status = 'pending'" />
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
    .add-client-container{
        position: absolute;
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
        width: 55%;
        height: 65vh;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .content header{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }

    .content header p{
        margin-left: 40%;
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
</style>