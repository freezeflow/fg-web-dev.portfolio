<template>
  <main class="admin-login" aria-label="Admin Login Page">
    <form @submit="handleSubmit" class="form-container" aria-label="Admin Login Form">
      <div class="form-header">
        <h2 v-if="!errorMessage && !adminStore.loading" class="h2-white">Admin Login</h2>
        <div v-else-if="errorMessage && !adminStore.loading">
          <ErrorMessage :msg="errorMessage" />
        </div>
        <div v-if="adminStore.loading">
          <loader />
        </div>
      </div>
      <div>
        <div class="floating-label">
          <input ref="emailInput" v-model="form.email" type="text" id="email" name="email" placeholder=""  aria-label="Email address"/>
          <label for="email">Email</label>
        </div>
        <div class="floating-label">
          <input ref="passwordInput" v-model="form.password" type="password" id="password" name="password" placeholder=""  aria-label="Password"/>
          <label for="password">Password</label>
        </div>
        <button type="submit" class="btn-primary" aria-label="Submit login form">Login</button>
      </div>
    </form>
  </main>

</template>

<script setup>
  import { ref, nextTick, defineAsyncComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { formUtility } from '@/utils/form.utils.js';
  import { useAdminStore } from '@/stores/admin.js';
  import { useAuthStore } from '@/stores/auth.store.js';

  import loader from '@/components/loader.vue'
  const ErrorMessage = defineAsyncComponent(() => import('@/components/error-message.vue'));

  // Move these outside the component scope
  const formUtil = new formUtility();

  const router = useRouter();
  const adminStore = useAdminStore()
  const auth = useAuthStore()
  const form = ref({
    email: '',
    password: ''
  })

  console.log(adminStore.loading)
  const errorMessage = ref(null);
  const emailInput = ref(null)
  const passwordInput = ref(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    errorMessage.value = '';

    // Check if the form is complete
    if (!formUtil.isFormComplete(form.value)) {
      errorMessage.value = 'Please fill in all fields.';
      await nextTick()
      if (!form.value.email) emailInput.value && emailInput.value.focus()
      else if (!form.value.password) passwordInput.value && passwordInput.value.focus()
      return
    }

    // Check if email is valid
    if (!formUtil.isEmailValid(form.value.email)) {
      errorMessage.value = 'Invalid email.';
      await nextTick()
      emailInput.value && emailInput.value.focus()
      return;
    }

    // Send data to backend
    try {
      const response = await auth.adminLogin(form.value)

      if(auth.error){
        errorMessage.value = auth.error.message || 'Login failed.';
        return
      }

      // // Store admin data
      adminStore.setAdmin(response.admin, response.admin._id, response.admin.role);

      router.push('/dashboard');
    } catch (error) {
        errorMessage.value = error || 'An unexpected error occurred.'
        throw error
    }
  }
</script>