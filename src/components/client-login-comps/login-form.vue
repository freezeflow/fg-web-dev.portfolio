<script setup>
    import { ref, reactive } from 'vue'
    import router from '@/router';
    import ErrorMessage from '../error-message.vue';
    import Loader from '../loader.vue';
    import { nextTick } from 'vue';
    const props = defineProps({
        isFormComplete: Function,
        isEmailValid: Function,
        clientLogin: Function,
        setClient: Function,
        error: String,
        loading: Boolean
    })

    const errorMessage = ref()
    const emailInput = ref(null)
    const pinInput = ref(null)
    const form = reactive({
        email: '',
        pin: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        errorMessage.value = '';

        // Check if the form is complete
        if (!props.isFormComplete(form)) {
            errorMessage.value = 'Please fill in all fields.';
            await nextTick()
            if (!form.email) emailInput.value && emailInput.value.focus()
            else if (!form.pin) pinInput.value && pinInput.value.focus()
            return
        }

        // Check if email is valid
        if (!props.isEmailValid(form.email)) {
            errorMessage.value = 'Invalid email.';
            await nextTick()
            emailInput.value && emailInput.value.focus()
            return;
        }

        // Send data to backend
        try {
            const response = await props.clientLogin(form)
            if(props.error){
                errorMessage.value = props.error.message || 'Login failed.';
                return
            }

            // Store client data
            props.setClient(response.client._id, response.client, response.client.role);

            router.push('/clients/client');
        } catch (error) {
            errorMessage.value = error || 'An unexpected error occurred.'
            throw error
        }
    }
</script>

<template>
    <form @submit="handleSubmit" class="form-container" aria-label="Client Login Form">
      <div class="form-header">
        <h2 v-if="!errorMessage && !props.loading" class="h2-white">Client Login</h2>
        <div v-if="errorMessage && !props.loading">
          <ErrorMessage :msg="errorMessage" />
        </div>
        <div v-if="props.loading && !errorMessage">
            <Loader />
        </div>
      </div>
      <div>
        <div class="floating-label">
          <input ref="emailInput" v-model="form.email" type="text" id="email" name="email" placeholder=""  aria-label="Email address"/>
          <label for="email">Email</label>
        </div>
        <div class="floating-label">
          <input ref="pinInput" v-model="form.pin" type="password" id="password" name="password" placeholder=""  aria-label="Password"/>
          <label for="password">Pin</label>
        </div>
        <button type="submit" class="btn-primary" aria-label="Submit login form">Login</button>
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