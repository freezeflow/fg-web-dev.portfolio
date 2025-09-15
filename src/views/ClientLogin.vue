<template>
    <main class="client-login-view">
        <loginForm 
            :is-email-valid="formUtil.isEmailValid.bind(formUtil)"
            :is-form-complete="formUtil.isFormComplete.bind(formUtil)"
            :client-login="authStore.clientLogin.bind(authStore)"
            :error="authStore.error"
            :loading="authStore.loading"
            :set-client="clientStore.setClient.bind(clientStore)"
        />
        <RouterLink to="/verify/email" class="password-reset-link">Forgot pin <ArrowRight /></RouterLink>
    </main>
</template>

<script setup>
    import loginForm from '@/components/client-login-comps/login-form.vue'
    import { formUtility } from '@/utils/form.utils.js';
    import { useAuthStore } from '@/stores/auth.store';
    import { useLoggedClientStore } from '@/stores/logged.client.store.js'
    import { RouterLink } from 'vue-router';
    import { ArrowRight } from 'lucide-vue-next';

    const clientStore = useLoggedClientStore()
    const authStore = useAuthStore()
    const formUtil = new formUtility();
</script>