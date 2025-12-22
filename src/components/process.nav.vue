<script setup>
    const props = defineProps({
        icons: {
            type: Array,
        },
    });

    const [
        UserRoundSearch,
        Palette,
        Code2,
        Rocket
    ] = [...props.icons];
</script>

<template>
    <div class="flex flex-col w-full h-full" aria-label="Process navigation">
        <div class="flex items-center justify-center p-2 border-2 border-blue-500 rounded-full">
            <component v-if="props.icons.length" :is="UserRoundSearch" class="size-7 text-blue-500" aria-hidden="true" />
        </div>
        <span class="w-1 h-[30%] bg-blue-500 mx-auto"></span>
        <div class="flex items-center justify-center p-2 border-2 border-blue-500 rounded-full" >
            <component v-if="props.icons.length" :is="Palette" class="size-7 text-blue-500" aria-hidden="true"/>
        </div>
        <span class="w-1 h-[30%] bg-blue-500 mx-auto"></span>
        <div class="flex items-center justify-center p-2 border-2 border-blue-500 rounded-full" >
            <component v-if="props.icons.length" :is="Code2" class="size-7 text-blue-500" aria-hidden="true"/>
        </div>
        <span class="w-1 h-[30%] bg-blue-500 mx-auto"></span>
        <div class="flex items-center justify-center p-2 border-2 border-blue-500 rounded-full">
            <component v-if="props.icons.length" :is="Rocket" class="size-7 text-blue-500" aria-hidden="true"/>
        </div>
    </div>
</template>

<style scoped>
</style>