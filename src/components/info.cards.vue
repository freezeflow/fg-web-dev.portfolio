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
                cardRef.value.classList.add('card-fade-in');
                observer.disconnect();
            }
            },
            { threshold: 0.1 }
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
        transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .card-fade-in {
        opacity: 0;
        transform: translateY(40px);
        animation: fade-in 1s ease-in-out forwards;
        animation-delay: 0.1s;
    }

    @keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
    }
</style>

<!--
SEO & accessibility improvements:
- Used <section> for semantic meaning.
- Added aria-labelledby and unique id for the card title.
- Removed unnecessary wrapper div and extra section.
- Ensured semantic and accessible structure.
-->