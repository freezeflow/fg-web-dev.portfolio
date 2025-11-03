<script setup>
    const props = defineProps({
        icons: {
            type: Array,
        },
    });

    defineEmits([
        'icon1',
        'icon2',
        'icon3',
        'icon4'
    ]);

    const [
        UserRoundSearch,
        Palette,
        Code2,
        Rocket
    ] = [...props.icons];
</script>

<template>
    <div class="flex flex-col w-full" aria-label="Process navigation">
        <div class="flex items-center justify-center p-2 border-2 border-blue-500 rounded-full">
            <component v-if="props.icons.length" :is="UserRoundSearch" class="size-7 text-blue-500" aria-hidden="true" @click="$emit('icon1')" />
        </div>
        <span class="w-1 h-24 bg-blue-500 mx-auto"></span>
        <div class="flex items-center justify-center p-2 border-2 border-blue-500 rounded-full" >
            <component v-if="props.icons.length" :is="Palette" class="size-7 text-blue-500" aria-hidden="true" @click="$emit('icon2')"/>
        </div>
        <span class="w-1 h-24 bg-blue-500 mx-auto"></span>
        <div class="flex items-center justify-center p-2 border-2 border-blue-500 rounded-full" >
            <component v-if="props.icons.length" :is="Code2" class="size-7 text-blue-500" aria-hidden="true" @click="$emit('icon3')"/>
        </div>
        <span class="w-1 h-24 bg-blue-500 mx-auto"></span>
        <div class="flex items-center justify-center p-2 border-2 border-blue-500 rounded-full">
            <component v-if="props.icons.length" :is="Rocket" class="size-7 text-blue-500" aria-hidden="true" @click="$emit('icon4')"/>
        </div>
    </div>
</template>

<style scoped>
</style>