<template>
    <div class="verify-email-view">
        <changePin 
            :is-form-complete="formUtil.isFormComplete.bind(formUtil)"
            :reset-pin="authStore.resetPin.bind(authStore)"
            :error="authStore.error"
            :loading="authStore.loading"
        />
    </div>
</template>

<script setup>
    import changePin from '@/components/client-login-comps/change-pin.vue';
    import { useAuthStore } from '@/stores/auth.store'; 
    import { formUtility } from '@/utils/form.utils.js';

    const formUtil = new formUtility()
    const authStore = useAuthStore()
</script>