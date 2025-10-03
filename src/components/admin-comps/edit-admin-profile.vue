<script setup>
import { ref } from 'vue'
import { UserPen, Lock, X } from 'lucide-vue-next'
import editProfile from '../edit-admin-comps/edit-profile.vue';
import editPassword from '../edit-admin-comps/edit-password.vue';

const emits = defineEmits(['close'])
const activeTab = ref('details') // default

const setTab = (tab) => {
  activeTab.value = tab
}
</script>

<template>
  <div class="overlay">
    <div class="container">
      <div class="controls">
        <button
          type="button"
          class="close-btn"
          :class="{ active: activeTab === 'details' }"
          @click="setTab('details')"
        >
          <UserPen />
        </button>
        <button
          type="button"
          class="close-btn"
          :class="{ active: activeTab === 'password' }"
          @click="setTab('password')"
        >
          <Lock />
        </button>
        <button type="button" class="close-btn" @click="emits('close')">
          <X />
        </button>
      </div>

      <!-- Conditional rendering of child components -->
      <editProfile v-if="activeTab === 'details'" />
      <editPassword v-else />
    </div>
  </div>
</template>

<style scoped>
.overlay {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10001;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.container {
  width: 50%;
  height: 70%;
  background-color: var(--off-color);
  border-radius: 10px;
  position: relative;
}

.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}

.controls svg {
  width: 15px;
  height: auto;
}

.close-btn {
  height: 28px;
  width: 28px;
  text-align: center;
  background-color: transparent;
  border: 0;
  outline: 0;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn.active {
  color: var(--secondary);
}
</style>