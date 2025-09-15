<script setup>
    import { Search } from 'lucide-vue-next';

    const props = defineProps({
        modelValue: String
    })

    const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <form>
        <input 
            type="text"
            :value="modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            placeholder="Search projects..."
        />
    </form>
</template>

<style scoped>
    form{
        width: 60%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    form input{
        width: 90%;
        height: 25px;
        border-radius: 5px;
        border: 0;
        background-color: white;
        padding: 0 5px;
        outline: none;
    }
</style>