<script setup>
import editAdminProfile from './admin-comps/edit-admin-profile.vue';
import sidebar from './sidebar.vue'
import topbar from './topbar.vue';
import { ref } from 'vue';

const role = ref()

const storedRole = localStorage.getItem('role')
if(storedRole) role.value = JSON.parse(storedRole)

const edit = ref()
</script>

<template>
  <div class="nav-bars">
    <!-- Topbar -->
    <topbar class="topbar"
      v-if="role === 'admin'"
      @edit="edit = true"
    />

    <!-- Sidebar -->
    <sidebar />
  </div>
  

  <Teleport to="body">
    <editAdminProfile 
      v-if="edit"
      @close="edit = false"
    />
  </Teleport>
</template>

<style scoped>

  @media screen and (max-width:780px) {
    .topbar{
      display: none;
    }
  }

  @media screen and (min-width:780px) {
    .mobile-nav{
      display: none;
    }
  }
</style>