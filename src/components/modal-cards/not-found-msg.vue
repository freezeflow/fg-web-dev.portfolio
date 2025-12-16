<script setup>
    const props = defineProps({
        msg: String
    })
</script>

<template>
    <p class="max-sm:text-center">{{ msg }}</p>
</template>

<style scoped>
    p{
        font-family: var(--paragraph-font);
        color: white;
    }
</style>