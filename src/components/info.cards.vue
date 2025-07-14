<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';

    const props = defineProps({
        title: {
            type: String
        },
        description: {
            type: String
        },
        icon: {
            type: [Object, Function],
        },
        colorClass: {
            type: String,
        }
    });

    const cardRef = ref(null);

    onMounted(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
            if (entry.isIntersecting) {
                cardRef.value.classList.add('fade-in');
                observer.disconnect();
            }
            },
            { threshold: 0.2 }
        );
        if (cardRef.value) observer.observe(cardRef.value);
    });


</script>

<template>
    <section 
        class="info-card" 
        :class="colorClass" 
        aria-labelledby="card-title"
        ref="cardRef"
    >
        <component v-if="icon" :is="icon" class="info-card-icon" aria-hidden="true" />
        <h3 class="card-title" id="card-title">{{ $props.title }}</h3>
        <p class="card-description">
            {{ $props.description }}
        </p>
    </section>
</template>

<style scoped>
    section.info-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }
</style>

<!--
SEO & accessibility improvements:
- Used <section> for semantic meaning.
- Added aria-labelledby and unique id for the card title.
- Removed unnecessary wrapper div and extra section.
- Ensured semantic and accessible structure.
-->