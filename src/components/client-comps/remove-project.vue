<script lang="ts" setup>

    const emits = defineEmits<{
        (e: 'close'): void
        (e: 'remove'): void
    }>()
    
    const props = defineProps({
        projectName: String,
        projectId: String,
        clientInfo: Object,
        updateClient: Function
    })
</script>

<template>
    <div class="container">
        <div class="content-container">
            <h2>Do you want to remove {{ props.projectName }}?</h2>
            <div class="controls">
                <button class="remove-btn" @click="emits('remove')">Remove</button>
                <button @click="emits('close')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container{
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.479);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .content-container{
        width: 50%;
        height: 40%;
        background-color: var(--off-color);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    h2{
        font-family: var(--header-font);
    }

    .controls{
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    button{
        border: 0;
        outline: 0;
        padding: 10px 2rem;
        cursor: pointer;
        border-radius: 5px;
        background-color: red;
        color: white;
    }

    .remove-btn{
        background-color: var(--secondary);
    }

    button:hover{
        opacity: 0.8;
    }
</style>