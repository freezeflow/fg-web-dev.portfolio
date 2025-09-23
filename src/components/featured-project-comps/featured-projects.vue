<script setup>
    import { ref, watch } from 'vue';
    import { formUtility } from '@/utils/form.utils';
    import { Trash } from 'lucide-vue-next';

    const fileUtil = new formUtility()
    const errorMsg = ref('')
    const fileImgPath = ref('')
    const imgData = ref()
    const emits = defineEmits(['viewProject'])
    const props = defineProps({
        project: {
            required: true
        },

        uploadImg: {
            type: Function
        },

        fetchImg: {
            type: Function
        },

        deleteImg: {
            type: Function
        }
    });
    
    async function handleFileChange(event, projectId){
        const file = event.target.files[0]
        if(!fileUtil.isFileExtensionValid(file, ['jpg','png','jpeg'])){
            errorMsg.value = 'Invalid file format'
            return
        }

        if(!fileUtil.isFileSizeValid(file, 10)){
            errorMsg.value = 'File size too large, must be 10mb or less'
            return
        }

        const res = await props.uploadImg(projectId, file)
    }
    
    async function getPath() {
        if (!props.project?._id || !props.fetchImg) {
            // console.warn('Missing project ID or fetchImg function')
            return
        }

        imgData.value = await props.fetchImg(props.project._id)

        if (imgData.value?.filePath) {
            fileImgPath.value = imgData.value.filePath
        }
    }

    // Safe trigger (wait for project to be defined)
    watch(
        () => props.project?._id,
        (newVal) => {
            if (newVal) getPath()
        },
        { immediate: true }
    )

    async function handleImgDelete() {
        await props.deleteImg(props.project._id)
    }
</script>

<template>
    <div class="project-container">
        <button v-if="fileImgPath" @click="handleImgDelete"><Trash/></button>
        <img :src="`${fileImgPath}`" alt="Project image" v-if="fileImgPath">
        <div v-if="!fileImgPath" class="image-input">
            <label for="">Add pic</label>
            <input type="file" src="" alt="" @change="(e) => handleFileChange(e, props.project._id)">
        </div>
        <div class="project-info">
            <div class="project-title">
                <p class="">{{ props.project.title }}</p>
            </div>
            <div class="summary">
                {{ props.project.summary }}
            </div>
            <div class="project-controls">
                <button @click="emits('viewProject', props.project._id, '/projects/project')">Manage project</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .project-container{
        border-radius: 10px;
        width: 60%;
        height: 60vh;
        background-color: var(--off-color);
    }

    .project-container > button{
        position: fixed;
        z-index: 100;
        color: var(--off-color);
        background-color: transparent;
        cursor: pointer;
        margin-left: 10px;
        margin-top: 10px;
        border: 0;
        border-radius: 5px;
        backdrop-filter: blur(15px);
        color: var(--secondary);
        padding: 2px;
    }

    .project-container > button:hover{
        opacity: 0.8;
    }

    .project-container > button svg{
        width: 20px;
        height: auto;
    }

    .project-container img{
        width: 100%;
        height: 60%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .image-input{
        position: relative;
        width: 100%;
        height: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image-input input{
        z-index: 10;
        width: 100%;
        height: 100%;
        /* border: 2px dashed var(--secondary); */
        border-bottom: 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        opacity: 0;
        cursor: pointer;
    }

    .image-input label{
        position: absolute;
        color: var(--secondary);
    }

    .project-info{
        width: calc(100% - 2rem);
        height: calc(50% - 2rem);
        background-color: white;
        color: black;
        padding: 1rem;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        font-family: var(--paragraph-font);
        transition: all 0.5s ease-in-out;
    }

    .project-title{
        font-family: var(--header-font);
        text-decoration: underline;
    }

    .summary {
        font-size: 0.9rem;
        max-height: 50%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .project-controls{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        align-self: flex-end;
    }

    .project-controls button{
        width: 60%;
        padding: 5px 1rem;
        background-color: var(--secondary);
        border: 0;
        border-radius: 5px;
        color: white;
        outline: 0;
        cursor: pointer;
    }

    .project-controls button:hover{
        opacity: 0.8;
    }

    .project-info.more-info{
        height: 100%;
    }

    @media screen and (max-width: 780px){
        .project-container{
            width: 80%;
        }
    }
</style>