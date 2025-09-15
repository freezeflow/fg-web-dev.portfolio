<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  },

  loader:{
    type: Object,
  },

  loading: {
    type: Boolean
  },

  errorCard: {
    type: Object
  },

  error: {
    type: String
  }
})

const techInput = ref('')

function addTech() {
  if (techInput.value.trim()) {
    props.form.tech.push(techInput.value.trim())
    techInput.value = ''
  }
}

function removeTech(index) {
  props.form.tech.splice(index, 1)
}

const emit = defineEmits(['next'])
</script>

<template>
  <div class="step-one">
    <h2 v-if="!props.error && !props.loading">Edit project</h2>
    
    <div class="comps">
      <component :is="errorCard" v-if="props.error && !props.loading" :msg="error"/>
      <component :is="loader" v-if="!props.error && props.loading" />
    </div>

    <div class="form">
      <input v-model="form.title" type="text" placeholder="Title" />

      <textarea v-model="form.description" placeholder="Description"/>

      <input v-model="form.summary" type="text" placeholder="Summary"/>

      <input v-model="form.link" type="text" placeholder="Link"/>

      <input v-model="form.type" type="text" placeholder="Project type"/>

      <div class="tech-input">
        <input v-model="techInput" type="text" placeholder="Tech stack"/>
        <button type="button" @click="addTech">+</button>
      </div>

      <div class="tech-list">
        <span
          class="pill"
          v-for="(tech, index) in form.tech"
          :key="index"
        >
          {{ tech }}
          <button @click="removeTech(index)">✕</button>
        </span>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.step-one {
  background-color: var(--off-color);
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  font-family: inherit;
  box-sizing: border-box;
  color: white;
}

h2 {
  margin: 0;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: var(--header-font);
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

}

input[type="text"],
textarea {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid var(--secondary);
  border-radius: 6px;
  font-family: var(--paragraph-font);
  color: white;
  background-color: transparent;
}

textarea {
  resize: vertical;
  min-height: 60px;
}

.tech-input {
  display: flex;
  gap: 0.5rem;
}

.tech-input input {
  flex: 1;
}

.tech-input button {
  padding: 0.5rem 1rem;
  background-color: var(--secondary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill {
  background-color: var(--secondary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pill button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}


.comps{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
