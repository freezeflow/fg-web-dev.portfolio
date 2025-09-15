<script setup>
    const emits = defineEmits(['close'])
    import { ref, reactive } from 'vue';
    import { useAdminStore } from '@/stores/admin';
    import errorMessage from '../error-message.vue';

    const adminStore = useAdminStore()
    const errorMsg = ref()

    adminStore.loadAdmin()

    const form = reactive({
        name: adminStore.admin.name,
        email: adminStore.admin.email
    })

    const validateForm = () =>{
        for (const key in form) {
            if (form.hasOwnProperty(key)) {
                const value = form[key]
                if (
                    value === '' ||
                    (Array.isArray(value) && value.length === 0)
                ) {
                    errorMsg.value = 'Please fill all fields'
                    return false
                }
            }
        }

        errorMsg.value = ''
        return true
    }

    function handleUpdate(){
        if(!validateForm()) {
            return
        }

        adminStore.updateAdmin(adminStore.admin_id, form)
    }
</script>

<template>
    <div class="overlay">
        <div class="container">
            <button type="button" class="close-btn" @click="emits('close')">x</button>
            <div class="form-section">
                <h2 v-if="!errorMsg">Edit admin</h2>
                <errorMessage v-else :msg="errorMsg" />
                <form @submit.prevent="handleUpdate">
                    <input type="text" placeholder="Email" v-model="form.email">
                    <input type="text" placeholder="Name" v-model="form.name">
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .overlay{
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10001;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .container{
        width: 50%;
        height: 60%;
        background-color: var(--off-color);
        border-radius: 10px;
    }

    .close-btn{
        height: 5%;
        width: 2%;
        position: fixed;
        text-align: center;
        background-color: transparent;
        font-weight: bold;
        border: 0;
        outline: 0;
        color: white;
        cursor: pointer;
    }

    .form-section{
        margin-top: 6%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: calc(100% - 24%);
    }

    h2{
        font-family: var(--header-font);
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 60%;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
    }

    input{
        padding: 10px 15px;
        background-color: transparent;
        border: 1px solid var(--secondary);
        border-radius: 5px;
        width: 70%;
        color: white;
        outline: 0;
    }

    .form-section button{
        padding: 5px 15px;
        width: 78%;
        background-color: var(--secondary);
        border: 0;
        color: white;
        border-radius: 5px;
    }
</style>