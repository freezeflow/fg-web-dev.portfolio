<script setup>
    const props = defineProps({
        msg: String
    })
</script>

<template>
    <div>
        <h2>404</h2>
        <p>{{ msg }}</p>
    </div>
</template>

<style scoped>
    div{
        flex: auto;
        margin-top: 20%;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h2{
        color: var(--secondary);
        font-size: var(--md-headers);
        border: 1px dashed var(--secondary);
        border-radius: 100%;
        padding: 2rem;
        position: absolute;
        z-index: -1;
        font-family: var(--paragraph-font);
    }

    p{
        color: white;
        backdrop-filter: blur(1px);
        font-size: var(--sm-headers);
        font-family: var(--paragraph-font);
        padding: 1rem;
        text-align: center;
    }


</style>