<template>
  <main class="admin-login" aria-label="Admin Login Page">
    <form @submit="handleSubmit" class="form-container" aria-label="Admin Login Form">
      <div class="form-header">
        <div v-if="auth.loading">
          <loader />
        </div>
        <h2 v-else class="h2-white">Admin Login</h2>
      </div>
      <div>
        <div class="floating-label">
          <input ref="emailInput" v-model="form.email" type="text" id="email" name="email" placeholder=""  aria-label="Email address"/>
          <label for="email">Email</label>
        </div>
        <div class="floating-label">
          <input ref="passwordInput" v-model="form.password" :type="passType" id="password" name="password" placeholder=""  aria-label="Password"/>
          <label for="password">Password</label>
          <component :is="passType === 'password'? Eye : EyeOff" class="icon" @click="togglePassType" />
        </div>
        <button type="submit" class="btn-primary" aria-label="Submit login form">Login</button>
      </div>
    </form>
  </main>

</template>

<script setup>
  import { ref, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { formUtility } from '@/utils/form.utils.js';
  import { useAuthStore } from '@/stores/auth.store.js';
  import { useAdminStore } from '@/stores/user';
  import { Eye, EyeOff } from 'lucide-vue-next';
  import loader from '@/components/loader.vue'
  import { useToast } from 'vue-toastification';

  const formUtil = new formUtility();
  const toast = useToast();
  const router = useRouter();
  const auth = useAuthStore()
  const form = ref({
    email: '',
    password: ''
  })

  const admin = useAdminStore()

  const emailInput = ref(null)
  const passwordInput = ref(null)
  const passType = ref("password")

  const togglePassType = () =>{
    if(passType.value === "password"){
      passType.value = "text"
      return
    }else{
      passType.value = "password"
      return
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the form is complete
    if (!formUtil.isFormComplete(form.value)) {
      toast.error('All fields required');
      await nextTick()
      if (!form.value.email) emailInput.value && emailInput.value.focus()
      else if (!form.value.password) passwordInput.value && passwordInput.value.focus()
      return
    }

    // Check if email is valid
    if (!formUtil.isEmailValid(form.value.email)) {
      toast.error('Invalid email');
      await nextTick()
      emailInput.value && emailInput.value.focus()
      return;
    }

    // Send data to backend
    try {
      const res = await auth.adminLogin(form.value)
      admin.user = res.admin
      if(res.success === true) toast.success('Welcome back')
      if(auth.error){
        toast.error(auth.error);
        return
      }

      router.push('/dashboard');
    } catch (error) {
        toast.error(error.message)
        throw error
    }
  }
</script>