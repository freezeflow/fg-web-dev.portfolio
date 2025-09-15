<script setup>
    import { ref, reactive } from 'vue';
    import { formUtility } from '@/utils/form.utils';
    import fetchApi from '@/utils/fetch.util.js';
    import { useAuthStore } from '@/stores/auth.store';

    const utils = new formUtility
    const auth = useAuthStore()
    const fetch = new fetchApi(true, auth.accessToken)
    
    const emits = defineEmits(['close'])
    const fileLabel = ref('Add file');

    const availableTechs = [
        'HTML',
        'CSS',
        'Javascript',
        'PHP',
        'Node.js',
        'Vue.js',
        'Tailwindcss'
    ];

    const form = reactive({
        title:'',
        summary:'',
        desc:'',
        link:'',
        tech:[],
        img:''
    });

    const formClasses = reactive({
        title:'',
        summary:'',
        desc:'',
        link:'',
        tech:'',
        img:''
    })

    function toggleTech(tech) {
        const idx = form.tech.indexOf(tech);
        if (idx === -1) {
            form.tech.push(tech);
        } else {
            form.tech.splice(idx, 1);
        }
    }

    function isTechSelected(tech) {
        return form.tech.includes(tech);
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            form.img = file;
            fileLabel.value = file.name;
            validateFile();
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            form.img = file;
            fileLabel.value = file.name;
            validateFile();
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function validateFile() {
        formClasses.img = '';
        if (!utils.isFileExtensionValid(form.img, ['jpeg', 'jpg', 'png'])) {
            formClasses.img = 'invalid';
            fileLabel.value = 'Invalid file'
            return false
        } else if (!utils.isFileSizeValid(form.img, 5)) {
            formClasses.img = 'invalid';
            fileLabel.value = 'File size too large'
            return false
        }
    }

    const validateForm = () => {
        Object.keys(formClasses).forEach(key => formClasses[key] = '');

        if (!form.title) formClasses.title = 'invalid';
        if (!form.summary) formClasses.summary = 'invalid';
        if (!form.desc) formClasses.desc = 'invalid';
        if (!form.tech.length) formClasses.tech = 'invalid';
        if (!form.img) formClasses.img = 'invalid';
        if (!form.link) formClasses.link = 'invalid';

        if (!utils.isFormComplete(form)) return false;

        // Only check file if present
        if (form.img) {
            validateFile()
        }

        // Return true if all formClasses are still empty (no invalids)
        return !Object.values(formClasses).includes('invalid');
    }

    async function handleFormSubmit() {
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('summary', form.summary);
        formData.append('desc', form.desc);
        formData.append('link', form.link);
        formData.append('img', form.img);
        formData.append('tech', JSON.stringify(form.tech)); // send as JSON array

        try {
            const response = await fetch.post('http://localhost:8080/api/projects/create', formData)
            console.log(response)
            emits('close');
        } catch (error) {
            console.error(error);
        }
    }
</script>

<template>
    <div class="edit-card">
        <form @submit.prevent>
            <section
                class="file-upload-section"
                @drop="handleDrop"
                @dragover="handleDragOver"
            >
                <input
                    type="file"
                    name="file"
                    id="file"
                    @change="handleFileChange"
                    accept=".jpeg,.jpg,.png"
                >
                <label :for="'file'">{{ fileLabel }}</label>
            </section>
            <section class="input-section">
                <div>
                    <input :class="formClasses.title" v-model="form.title" type="text" name="title" id="title" placeholder="">
                    <label for="title">Title</label>
                </div>
                <div>
                    <input :class="formClasses.summary" v-model="form.summary" type="text" name="summary" id="summary" placeholder="">
                    <label for="summary">Summary</label>
                </div>
                <div class="desc-div">
                    <textarea :class="formClasses.desc" v-model="form.desc" name="desc" id="desc" placeholder=""></textarea>
                    <label for="desc">Description</label>
                </div>
                <div>
                    <input :class="formClasses.link" v-model="form.link" type="text" name="link" id="link" placeholder="">
                    <label for="link">Link</label>
                </div>
                <div class="tech">
                    <span
                        v-for="tech in availableTechs"
                        :key="tech"
                        :class="['tech-span', isTechSelected(tech) ? 'selected' : '']"
                        @click="toggleTech(tech)"
                    >{{ tech }}</span>
                </div>
                <div class="form-btns">
                    <button @click="handleFormSubmit()">Save</button>
                    <button @click="emits('close')">Exit</button>
                </div>
            </section>
        </form>
    </div>
</template>

<style scoped>
    .edit-card {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    background-color: #00000091;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2vw;
    box-sizing: border-box;
}

.edit-card form {
    width: 100%;
    max-width: 700px;
    min-width: 320px;
    height: auto;
    max-height: 90vh;
    border-radius: 10px;
    background-color: var(--off-color);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
    box-sizing: border-box;
    overflow-y: auto;
}

.file-upload-section {
    border: 1px solid white;
    width: 40%;
    min-width: 200px;
    max-width: 300px;
    height: 75vh;
    min-height: 200px; 
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex: 1 1 200px;
}

.file-upload-section input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    cursor: pointer;
    opacity: 0;
    margin: 0;
    padding: 0;
}

.file-upload-section label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-family: var(--paragraph-font);
    font-size: 1rem;
    z-index: 1;
    pointer-events: none;
    text-align: center;
    width: 90%;
    white-space: pre-line;
}

.input-section {
    flex: 1 1 300px;
    min-width: 250px;
    height: 75svh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.input-section input,
.input-section textarea {
    width: 100%;
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    font-size: 1rem;
    background: transparent;
    border: 1px solid white;
    color: var(--primary-text-color);
    border-radius: 4px;
    outline: none;
    font-family: var(--paragraph-font);
    resize: none;
    box-sizing: border-box;
}

.input-section input.invalid,
.input-section textarea.invalid {
    border: 1px solid red !important;
}

.input-section div {
    position: relative;
}

.input-section label {
    color: var(--primary-text-color);
    font-family: var(--paragraph-font);
    font-size: var(--sm-paragraph);
    position: absolute;
    top: 0.7rem;
    left: 0.5rem;
    padding: 0 0.25rem;
    transition: all 0.3s ease-in-out;
}

.input-section textarea + label {
    color: var(--primary-text-color);
    font-family: var(--paragraph-font);
    font-size: var(--sm-paragraph);
    position: absolute;
    top: 0.7rem;
    left: 0.5rem;
    padding: 0 0.25rem;
    transition: all 0.3s ease-in-out;
}

.input-section input:focus + label,
.input-section input:not(:placeholder-shown):not(:focus) + label{
    top: -0.5rem;
    left: 0.4rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.445);
    background: var(--off-color);
    transition: all 0.3s ease-in-out;
}

.input-section textarea:focus + label,
.input-section textarea:not(:placeholder-shown):not(:focus) + label {
    top: -0.6rem;
    left: 0.4rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.445);
    background: var(--off-color);
    transition: all 0.3s ease-in-out;
}

.input-section textarea {
    min-height: 80px;
    max-height: 200px;
}

.desc-div label {
    position: relative;
    top: -4rem;
}

.tech {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 0.75rem;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.tech span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    padding: 5px 2px;
    color: white;
    background-color: var(--secondary);
    font-size: 12px;
    font-family: var(--paragraph-font);
    border-radius: 3px;
    cursor: pointer;
    transition: background 0.2s, opacity 0.2s;
}

.tech span.selected {
    opacity: 0.8;
}

.form-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 1rem;
}

.form-btns button {
    flex: 1 1 0;
    padding: 5px 2rem;
    background-color: white;
    border: 0;
    border-radius: 2px;
    margin: 0 0.25rem;
}

.form-btns button:hover {
    opacity: 0.8;
    cursor: pointer;
}

/* Responsive adjustment for small screens */
@media (max-width: 700px) {
    .edit-card form {
        flex-direction: column;
        align-items: stretch;
        padding: 1rem;
        gap: 1rem;
    }
    .file-upload-section {
        width: 100%;
        max-width: none;
        min-width: 0;
        margin-bottom: 0.5rem;
    }
    .input-section {
        min-width: 0;
    }
}
</style>