<script setup>
    import { ref, reactive } from 'vue'
    import { useRoute } from 'vue-router';
    import ErrorMessage from '../error-message.vue';
    import { nextTick } from 'vue';

    const props = defineProps({
        isFormComplete: Function,
        resetPin: Function,
        error: String,
        loading: Boolean
    })

    const route = useRoute();
    const errorMessage = ref()
    const isSuccess = ref(false)
    const pinInput = ref(null)
    const form = reactive({
        token:  route.params.token,
        pin: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        errorMessage.value = '';

        // Check if the form is complete
        if (!props.isFormComplete(form)) {
            errorMessage.value = 'Please fill in all fields.';
            await nextTick()
            if (!form.pin) pinInput.value && pinInput.value.focus()
            return
        }

        // Check if pin is valid
        if (form.pin.length !== 6) {
            errorMessage.value = 'Pin must be 6 digits.';
            await nextTick()
            pinInput.value && pinInput.value.focus()
            return;
        }

        if(!Number(form.pin)){
            errorMessage.value = 'Pin must be 6 digits.';
            await nextTick()
            pinInput.value && pinInput.value.focus()
            return;
        }

        // Send data to backend
        try {
            const response = await props.resetPin(form)
            console.log(response)
            if(props.error){
                errorMessage.value = props.error.message || 'Failed to reset pin.';
                return
            }

            isSuccess.value = true
        } catch (error) {
            errorMessage.value = error || 'An unexpected error occurred.'
            throw error
        }
    }
</script>

<template>
    <form @submit="handleSubmit" class="form-container" aria-label="Client Login Form">
      <div class="form-header">
        <h2 v-if="!errorMessage && !isSuccess" class="h2-white">Change pin</h2>
        <div v-else>
          <ErrorMessage :msg="errorMessage" v-if="errorMessage"/>
          <h2 class="h2-white" v-if="isSuccess">Pin successfully changed</h2>
        </div>
      </div>
      <div>
        <div class="floating-label">
          <input ref="pinInput" v-model="form.pin" type="text" id="pin" name="pin" placeholder=""  aria-label="Pin"/>
          <label for="pin">Pin</label>
        </div>
        <button type="submit" class="btn-primary" aria-label="Submit login form">Change pin</button>
      </div>
    </form>
</template>

<style scoped>
    form {
        width: 40%;
        border: 2px solid var(--secondary);
        padding: 2rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background-color: var(--off-color);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        gap: 1rem;
    }

    form h2{
        text-align: center;
        font-size: 1.7rem;
    }

    form .form-header{
        margin-bottom: 2rem;
    }

    form div{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    form div div {
        width: 60%;
        display: flex;
        flex-direction: column;
        position: relative;
        gap: 0.5rem;
    }

    form div div label {
        color: var(--primary-text-color);
        font-family: var(--paragraph-font);
        font-size: var(--sm-paragraph);
        position: absolute;
        left: 0.5rem;
        transition: all 0.3s ease-in-out;
    }

    form div div input {
        width: 100%;
        padding: 1rem 0.5rem 0.5rem 0.5rem;
        font-size: 1rem;
        background: transparent;
        border: 1px solid white;
        color: var(--primary-text-color);
        border-radius: 4px;
        outline: none;
    }

    .floating-label input:focus + label,
    .floating-label input:not(:placeholder-shown):not(:focus) + label{
        top: -0.6rem;
        left: 0.4rem;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.445);
        background: var(--off-color);
        transition: all 0.3s ease-in-out;
    }

    form button {
        width: 64%;
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        background-color: white;
        color: var(--off-color);
        font-family: var(--paragraph-font);
        font-size: var(--sm-paragraph);
        cursor: pointer;
    }

    form button:hover {
        background-color: rgba(255, 255, 255, 0.9);
        color: var(--off-color);
        transition: all 0.3s ease-in-out;
    }

    @media screen and (max-width: 425px){
        form{
            width: 80%;
        }

        form h2{
            font-size: 1.3rem;
        }

        form div div{
            width: 80%;
        }

        form button{
            width: calc(80% + 1rem);
        }
    }

    @media screen and (max-width: 780px) and (min-width: 426px){
        form{
            width: 70%;
        }
    }

    @media screen and (max-width: 1024px) and (min-width: 781px){
        form{
            width: 60%;
        }
    }
</style>