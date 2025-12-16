<script setup>
    import router from '@/router';
    const props = defineProps({
        project: Object
    })
</script>

<template>
    <div @click="router.push(`/projects/featured/${project._id}`)" class="bg-navy/40 hover:bg-navy/80 transition-all border border-navy w-full p-2 rounded text-white flex flex-col gap-3">
        <div class="flex flex-col gap-2">
            <h1 class="text-3xl max-sm:text-2xl">{{ project.title }}</h1>
        </div>
    </div>
</template>