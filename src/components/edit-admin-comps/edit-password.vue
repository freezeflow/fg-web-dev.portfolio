<script setup>
import { ref, reactive } from 'vue'
import { useAdminStore } from '@/stores/admin'
import errorMessage from '../error-message.vue'
import { Eye, EyeOff } from 'lucide-vue-next'

const adminStore = useAdminStore()
const errorMsg = ref()

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Toggles for visibility
const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

// Regex for validation
const passwordRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{12,}$/

const validateForm = () => {
    errorMsg.value = ''
  if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
    errorMsg.value = 'Please fill all fields'
    return false
  }

  if (!passwordRegex.test(form.newPassword)) {
    errorMsg.value = 'Password must be at least 12 characters long, contain one number and one symbol'
    return false
  }

  if (form.newPassword !== form.confirmPassword) {
    errorMsg.value = 'Passwords do not match'
    return false
  }

  errorMsg.value = ''
  return true
}

async function handleUpdatePassword() {
    console.log("Handle upload", validateForm())
  if (!validateForm()) return

  await adminStore.changePassword(adminStore.admin_id, form)

  if(adminStore.error){
    errorMsg.value = adminStore.error
    return
  }
}
</script>

<template>
  <div class="form-section">
    <h2 v-if="!errorMsg">Change Password</h2>
    <errorMessage v-else :msg="errorMsg" />
    <form @submit.prevent="handleUpdatePassword">
      <!-- Current Password -->
      <div class="input-wrapper">
        <input
          :type="showCurrent ? 'text' : 'password'"
          placeholder="Current Password"
          v-model="form.currentPassword"
        />
        <button type="button" class="toggle-btn" @click="showCurrent = !showCurrent">
          <component :is="showCurrent ? EyeOff : Eye" />
        </button>
      </div>

      <!-- New Password -->
      <div class="input-wrapper">
        <input
          :type="showNew ? 'text' : 'password'"
          placeholder="New Password"
          v-model="form.newPassword"
        />
        <button type="button" class="toggle-btn" @click="showNew = !showNew">
          <component :is="showNew ? EyeOff : Eye" />
        </button>
      </div>

      <!-- Confirm Password -->
      <div class="input-wrapper">
        <input
          :type="showConfirm ? 'text' : 'password'"
          placeholder="Confirm Password"
          v-model="form.confirmPassword"
        />
        <button type="button" class="toggle-btn" @click="showConfirm = !showConfirm">
          <component :is="showConfirm ? EyeOff : Eye" />
        </button>
      </div>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style scoped>
    .form-section{
        margin-top: 10%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: calc(100% - 24%);
    }

    h2{
        font-family: var(--header-font);
        text-align: center;
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

    .form-section button[type="submit"]{
        padding: 5px 15px;
        width: 70%;
        background-color: var(--secondary);
        border: 0;
        color: white;
        border-radius: 5px;
    }

    .input-wrapper {
        position: relative;
        width: 70%;
    }

    button:focus {
        outline: none;
        box-shadow: none;
    }

    .input-wrapper input {
        padding: 10px 15px;
        background-color: transparent;
        border: 1px solid var(--secondary);
        border-radius: 5px;
        width: 100%;
        color: white;
        outline: 0;
    }

    .toggle-btn {
        position: absolute;
        width: 10vw;
        right: 10px;
        left: 80%;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        cursor: pointer;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .toggle-btn svg {
        width: 18px;
        height: auto;
    }
</style>