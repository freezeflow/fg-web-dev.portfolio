<template>
    <div class="verify-email-view">
        <verifyEmail 
            :is-form-complete="formUtil.isFormComplete.bind(formUtil)"
            :is-email-valid="formUtil.isEmailValid.bind(formUtil)"
            :verify-email="authStore.verifyClientEmail.bind(authStore)"
            :loading="authStore.loading"
            :error="authStore.error"
        />
    </div>
</template>

<script setup>
    import verifyEmail from '@/components/client-login-comps/verify-email.vue';
    import { useAuthStore } from '@/stores/auth.store';
    import { formUtility } from '@/utils/form.utils.js';

    const formUtil = new formUtility()
    const authStore = useAuthStore()
</script>