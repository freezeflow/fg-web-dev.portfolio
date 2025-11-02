<script setup>
    import { Search } from 'lucide-vue-next';

    const props = defineProps({
        modelValue: String
    })

    const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <form class="w-1/2">
        <input 
            class="w-full rounded border border-secondary p-1 outline-0"
            type="text"
            :value="modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            placeholder="Search projects..."
        />
    </form>
</template>

<style scoped>

    /* form input{
        width: 90%;
        height: 25px;
        border-radius: 5px;
        border: 0;
        background-color: white;
        padding: 0 5px;
        outline: none;
    } */
</style>