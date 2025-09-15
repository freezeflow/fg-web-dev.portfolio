<script setup>
import { ref } from 'vue'
import errorMessage from '../error-message.vue'

const emit = defineEmits(['close'])
const props = defineProps({
  clientId: String,
  validateSize: Function,
  uploadFile: Function
})

const file = ref(null)
const notes = ref('')
const formData = ref({})
const error = ref('')

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0]
  if (!selectedFile) return

  file.value = selectedFile

  if (!props.validateSize(file.value, 5)) {
    error.value = "File too large, must be under 5MB"
    return false
  }

  error.value = ''
  formData.value = {
    file: file.value,
    note: notes.value
  }
  return true
}

const handleSubmit = async () => {
  if (!file.value) {
    error.value = "Please select a file first"
    return
  }

  if (!props.validateSize(file.value, 5)) {
    error.value = "File too large, must be under 5MB"
    return
  }

  const formData = new FormData()
  formData.append('file', file.value)      // file expected in req.files.file
  formData.append('note', notes.value)     // note expected in req.body.note

  try {
    await props.uploadFile(props.clientId, formData)
    emit('close')
  } catch (e) {
    error.value = "Upload failed. Please try again."
    console.error(e)
  }
}

</script>


<template>
  <div class="modal">
    <form @submit.prevent="handleSubmit">
        <errorMessage 
        v-if="error"
        :msg="error"
        />
        <div class="file-input">
            <label for="file">Upload {{ file? file.name: 'File' }}:</label>
            <input type="file" id="file" @change="handleFileChange" />
        </div>

        <div class="notes-input">
            <input type="text" id="notes" v-model="notes" placeholder="Notes" />
        </div>

        <div class="form-controls">
            <button type="submit">Save</button>
            <button type="button" @click="emit('close')">Close</button>
        </div>
    </form>
  </div>
</template>

<style scoped>
    .modal{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-family: var(--paragraph-font);
    }

    form{
        background-color: var(--off-color);
        border-radius: 5px;
        padding: 2rem;
        width: 60%;
        height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    form .file-input{
        width: 60%;
        height: 40%;
        border: 1px dashed var(--secondary);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    form .file-input input{
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;

    }

    form .file-input label{
        position: absolute;
    }

    form .notes-input{
        width: 60%;
    }

    .notes-input input{
        width: calc(100% - 20px);
        padding: 5px 10px;
        border: 1px solid var(--secondary);
        border-radius: 5px;
        background-color: transparent;
        color: white;
        outline: 0;
    }

    .form-controls{
        width: 60%;
        display: flex;
        flex-direction: row;
        gap: 2rem;
    }

    .form-controls button{
        padding: 2px 25px;
        cursor: pointer;
        color: white;
        border: 0;
        outline: 0;
        border-radius: 3px;
        background-color: var(--secondary);
    }

    .form-controls button:hover{
        opacity: 0.8;
    }

    button[type="button"]{
        background-color: red;
    }
</style>