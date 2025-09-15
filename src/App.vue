<script setup>
  import { RouterView } from 'vue-router'
  import { useAuthStore } from './stores/auth.store.js';
  import { onMounted } from 'vue'

  const authStore = useAuthStore()

  onMounted(() => {
    const storedUserRole = localStorage.getItem('role')
    if(storedUserRole){
      const role = JSON.parse(storedUserRole)

      if(role === 'admin') {
        authStore.refreshAccessToken()
      }
    }
    
  })
</script>

<template>
  <header>
    
  </header>

  <RouterView />
</template>