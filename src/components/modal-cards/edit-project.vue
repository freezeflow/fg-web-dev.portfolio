<script setup>
import { ref } from 'vue'
import { useProjectStore } from '@/stores/projects.store'

import step1 from '@/components/edit-projects-comps/step-1.vue'
import step2 from '../edit-projects-comps/step-2.vue';
import errorMessage from '../error-message.vue';
import loader from '../loader.vue';

const emits = defineEmits(['close'])
const props = defineProps({
  project:{
    type: Object,
    required: true
  },

  client: Object
})

const errorMsg = ref('')
const projectStore = useProjectStore()
const step = ref(1)
const form = ref({
  title: props.project.title,
  description: props.project.description,
  summary: props.project.summary,
  tech: props.project.tech,
  link: props.project.link || null,
  type: props.project.type,
  featured: props.project.featured,
  complete: props.project.isCompleted,
  dateCompleted: props.project.dateCompleted,
})

function validateForm() {
  for (const key in form.value) {
    if (form.value.hasOwnProperty(key)) {
      const value = form.value[key]
      if (
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errorMsg.value = 'Please fill all fields'
        return false
      }
    }
  }

  if(!form.value.complete && !form.value.dateCompleted && form.value.featured){
    errorMsg.value = 'Project must be complete to be featured'
    return false 
  }

  if(form.value.complete && !form.value.dateCompleted){
    errorMsg.value = 'Please enter date completed or uncheck the "complete" checkbox'
    return
  }

  errorMsg.value = ''
  return true
}

function nextStep() {
  if (step.value === 1) step.value = 2
  else if (step.value === 2) step.value = 3
}

function prevStep() {
  if (step.value === 3) step.value = 2
  else if (step.value === 2) step.value = 1
}

function submitForm() {
  if(!validateForm()) return

  if(!form.value.complete && form.value.dateCompleted){
    form.value.dateCompleted = null
  }

  if(form.value.complete && form.value.dateCompleted && props.client){
    const emailForm = {
      title: form.value.title,
      email: props.client.email,
      name: props.client.name
    }

    projectStore.sendEmail(emailForm)
  }

  projectStore.updateProject(props.project._id, form.value)
  emits('close')
}

</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
        <button class="close-btn" @click="$emit('close')">&times;</button>
      <div class="modal-content">
        <!-- Step Content -->
        <div class="form-section">
          <step1 v-if="step === 1" v-model:form="form" :loader="loader" :loading="projectStore.loading" :error-card="errorMessage" :error="errorMsg"/>
          <step2 v-if="step === 2" v-model:form="form" :error="errorMsg" :error-card="errorMessage" :loader="loader" :loading="projectStore.loading"/>

            <div class="footer">
              <div class="indicators">
                  <div :class="['indicator', step === 1 ? 'active' : 'inactive']"></div>
                  <div :class="['indicator', step === 2 ? 'active' : 'inactive']"></div>
              </div>
              <div class="buttons">
                  <button v-if="step === 2" @click="prevStep">&#8592; Back</button>
                  <button @click="form.isClientProject && step === 2 || step === 1 ? nextStep() : submitForm()">
                  {{ form.isClientProject && step === 2 || step === 1 ? 'Next →' : 'Submit' }}
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
}

.modal {
  width: 70vw;
  height: 95vh;
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
  width: calc(100% - 2rem);
}

.indicators {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.indicator {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px dashed var(--secondary);
}

.indicator.active {
  border-style: solid;
  background-color: var(--secondary);
}

.indicator.inactive {
  border: 2px solid var(--secondary);
}

.form-section {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
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
</style>
