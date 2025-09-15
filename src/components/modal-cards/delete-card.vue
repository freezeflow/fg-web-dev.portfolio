<script setup>
import { ref } from 'vue';
import { formUtility } from '@/utils/form.utils';
import authClass from '@/utils/auth.util';

const props = defineProps(['title'])
const emits = defineEmits(['close', 'validation-result'])  // <-- Added event

const utils = new formUtility()
const authUtil = new authClass()

const password = ref()
const deleteFormLabel = ref(`Delete ${props.title} ?`)

const handleDelete = async () => {
    if (!utils.isFormComplete(password)) {
        deleteFormLabel.value = 'Please enter your password';
        return;
    }

    deleteFormLabel.value = 'Validating...';

    const result = await authUtil.validatePassword(password.value);

    if (!result.success) {
        deleteFormLabel.value = result.message || 'Invalid password';
        return;
    }

    // ✅ Emit success back to parent
    emits('validation-result', result);

    // Optional: close the modal
    emits('close');
}
</script>

<template>
    <div class="delete-form">
        <form @submit.prevent>
            <h3>{{ deleteFormLabel }}</h3>
            <button @click="emits('close')" class="close">&times;</button>
            <div>
                <input v-model="password" type="password" placeholder="Password" />
                <button type="button" @click="handleDelete">Delete</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
    .delete-form{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1001;
        background-color: #00000091;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .delete-form form{
        width: 50%;
        height: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        background-color: var(--off-color);
        position: relative;
        border-radius: 5px;
        color: white;
    }

    .delete-form form div{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .delete-form form div input{
        width: 50%;
        padding: 3px 0.5rem;
        border: 1px solid var(--secondary);
        background-color: transparent;
        border-radius: 3px;
        outline: none;
        color: white;
    }

    .delete-form form div button{
        padding: 2px 1rem;
        width: calc(50% + 1rem);
        background-color: red;
        border: 0;
        border-radius: 3px;
        color: white;
        cursor: pointer;
    }

    .delete-form form div button:hover{
        opacity: 0.7;
    }

    .delete-form form h3{
        font-family: var(--header-font);
        font-weight: 400;
    }

    .close{
        width: 25px;
        height: 25px;
        position: absolute;
        left: 0;
        top: 0;
        background-color: transparent;
        border: 0;
        font-size: 1.5rem;
        color: #b8b8b8;
        cursor: pointer;
    }

    @media screen and (max-width: 425px){
        .delete-form form{
            width: 90%;
            min-height: 25%;
        }
    }

    @media screen and (max-width: 780px) and (min-width: 426px){
        .delete-form form{
            width: 70%;
            min-height: 25%;
        }
    }
</style>