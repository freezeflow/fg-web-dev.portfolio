<script setup>
import { useClientStore } from '@/stores/client.store'
import { ref } from 'vue'

const clientStore = useClientStore()

const clients = clientStore.clients

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="step-two">
    <h2>Select client</h2>
    <div class="list-actions">
        <button class="create-client">Create new client</button>
        <input type="text" placeholder="Search client">
    </div>
    
    <div class="client-list">
        <div
            v-for="client in clients"
            :key="client.id"
            class="client-entry"
        >
        <div class="client-info">
            <div class="name">{{ client.name }}</div>
            <div class="company">{{ client.company }}</div>
        </div>
        <input
            type="checkbox"
            :value="client.id"
            v-model="form.selectedClientId"
            class="client-radio"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-two {
  background-color: var(--off-color);
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  color: white;
}

h2 {
  margin: 0;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: var(--header-font);
  text-align: center;
}

.list-actions{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.list-actions input{
    border-radius: 5px;
}

.create-client {
  margin-bottom: 1rem;
  align-self: flex-end;
  background: none;
  border: none;
  color: var(--secondary);
  font-weight: bold;
  cursor: pointer;
}

.create-client:hover{
    color: rgba(255, 255, 255, 0.534);
}

.client-list {
  flex: 1;
  overflow-y: auto;
  border-top: 1px solid #ccc;
  margin-bottom: 2rem;
}

.client-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid white;
}

.client-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: bold;
}

.company {
  font-size: 0.9rem;
  color: #666;
}

.client-radio {
  margin-left: 1rem;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-indicators {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px dashed var(--secondary);
}

.indicator.filled {
  background-color: var(--secondary);
  border: none;
}

.actions {
  display: flex;
  gap: 1rem;
}

.actions button {
  padding: 0.5rem 1rem;
  font-weight: bold;
  border: none;
  background-color: var(--secondary);
  color: white;
  cursor: pointer;
  border-radius: 6px;
}
</style>
