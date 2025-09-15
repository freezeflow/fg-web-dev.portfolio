<script setup>
import { ref } from 'vue'
import step1 from '@/components/add-projects-comps/step-1.vue'
import { useProjectStore } from '@/stores/projects.store'

const projectStore = useProjectStore()
const emits = defineEmits(['close'])

const errorMessage = ref('')
const form = ref({
  title: '',
  description: '',
  summary: '',
  tech: [],
  type: '',
  selectedClientId: null,
})

function validateForm() {
  for (const key in form.value) {
    if (form.value.hasOwnProperty(key)) {
      const value = form.value[key]
      if (
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errorMessage.value = 'Please fill all fields'
        return false
      }
    }
  }
  errorMessage.value = ''
  return true
}

async function submitForm() {
  if (!validateForm()) return
  console.log('Submitting project:', form.value)
  try {
    await projectStore.createProject(form.value)
    emits('close')
  } catch (err) {
    errorMessage.value = 'Failed to submit project'
    console.error(err)
  }
}

const load = ref(false)

</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
        <button class="close-btn" @click="$emit('close')">x</button>
      <div class="modal-content">
        
        <!-- Step Content -->
        <div class="form-section">
          <step1 v-model:form="form" :error="errorMessage" :loading="load"/>

          <div class="footer">
            <div class="buttons">
                <button @click="submitForm()">
                {{ 'Submit' }}
                </button>
            </div>
          </div>
            
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  width: 100vw;
  height: 100vh;
}

.modal {
  width: 60vw;
  height: 90vh;
  background-color: var(--off-color);
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
  overflow-y: scroll;
  font-family: 'Inter', sans-serif;
}

.close-btn{
  height: 5%;
  width: 2%;
  position: fixed;
  text-align: center;
  background-color: transparent;
  font-weight: bold;
}

.modal-content {
  display: flex;
  width: 100%;
}

.footer{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: calc(93% - 2rem);
}

.form-section {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.buttons {
  width: 100%;
}

button {
  padding: 0.5rem 1.25rem;
  background-color: var(--secondary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
}

@media screen and (max-width: 780px){
  .modal-overlay{
    position: fixed;
  }

  .modal{
    width: 100vw;
    display: flex;
  }

  .form-section{
    padding: 0;
  }
  .footer{
    margin-bottom: 1rem;
  }
}

/* @media screen and (max-width: 500px){
  .modal{
    height: 100vh;
    display: flex;
  }
} */
</style>
