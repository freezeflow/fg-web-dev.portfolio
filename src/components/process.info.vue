<script setup>
    const props = defineProps({
        processes: {
            type: Array,
            default: () => []
        },
    });
</script>

<template v-if="props.processes">
    <section v-for="(process, index) in props.processes" :key="index" class="flex flex-col text-white">
        <article class="" aria-label="Process information for {{ process.title }}">
            <header class="text-2xl font-display">
                <h3>{{ process.title }}</h3>
            </header>
            <p class="">{{ process.description }}</p>
        </article>
    </section>
</template>