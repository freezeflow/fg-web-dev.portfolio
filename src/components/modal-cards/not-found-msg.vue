<script setup>
    const props = defineProps({
        msg: String
    })
</script>

<template>
    <p>{{ msg }}</p>
</template>

<style scoped>
    p{
        font-size: 1.1rem;
        font-family: var(--paragraph-font);
        color: white;
    }
</style>