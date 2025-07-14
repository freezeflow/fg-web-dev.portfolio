<script setup>
    const props = defineProps({
        processes: {
            type: Array,
            default: () => []
        },
        activeIndex: {
            type: Number,
            default: 0
        }
    });
</script>

<template v-if="props.processes" >
    <section v-for="(process, index) in props.processes" 
    :key="index"
    :class="[{ 'active': index === props.activeIndex }, 'process-info-section']"
    >
        <article class="process-info" aria-label="Process information for {{ process.title }}" >
            <header class="process-info-header">
                <h3>{{ process.title }}</h3>
            </header>
            <p class="process-info-description">{{ process.description }}</p>
        </article>
    </section>
    
</template>

<style scoped>
.process-info-section {
    display: none;

}

.process-info-section.active {
    display: flex;
    position: relative;
    left: 20%;
    width: 70%;
    opacity: 0;
    animation: showNav 0.5s ease-in-out forwards;
}

@keyframes showNav {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
    
}

.process-info {
    color: white;
    font-family: var(--paragraph-font);
    border: 0;
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    gap: 3rem;
}

.process-info .process-info-header {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: unset;
    font-size: 1.5rem;
}

.process-info p{
    font-size: 1.2rem;
}

@media screen and (max-width: 768px) {
    .process-info .process-info-header {
        font-size: 1.1rem;
    }

    .process-info p {
        font-size: 1rem;
    }

    .process-info{
        width: 100%;
    }
}


</style>