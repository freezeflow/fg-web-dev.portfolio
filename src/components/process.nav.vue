<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps({
        icons: {
            type: Array,
        },
        activeIndex: {
            type: Number,
            default: 0
        }
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
    <div class="process-nav" aria-label="Process navigation">
        <div class="icon-wrapper" :class="{active: props.activeIndex === 0}">
            <component v-if="props.icons.length" :is="UserRoundSearch" class="info-card-icon" aria-hidden="true" @click="$emit('icon1')" />
        </div>
        <span></span>
        <div class="icon-wrapper" :class="{active: props.activeIndex === 1}">
            <component v-if="props.icons.length" :is="Palette" class="info-card-icon" aria-hidden="true" @click="$emit('icon2')"/>
        </div>
        <span></span>
        <div class="icon-wrapper" :class="{active: props.activeIndex === 2}">
            <component v-if="props.icons.length" :is="Code2" class="info-card-icon" aria-hidden="true" @click="$emit('icon3')"/>
        </div>
        <span></span>
        <div class="icon-wrapper" :class="{active: props.activeIndex === 3}">
            <component v-if="props.icons.length" :is="Rocket" class="info-card-icon" aria-hidden="true" @click="$emit('icon4')"/>
        </div>
    </div>
</template>

<style scoped>
    .info-card-icon {
        width: 1.5rem;
        height: 1.5rem;
        color: var(--secondary);
        border: 2px solid var(--secondary);
        padding: 10px;
        border-radius: 360px;
        background: transparent;
        z-index: 1;
        position: relative;
        overflow: visible;
    }

    @media screen and (max-width: 768px) {
        .info-card-icon {
            width: 1.5rem;
            height: 1.5rem;
            padding: 8px;
        }
    }

    .icon-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-wrapper.active::before {
        content: '';
        position: absolute;
        z-index: 0;
        top: 0;
        left: 50%;
        border-radius: 50%;
        background-color: var(--secondary);
        animation: fillIconBackground 0.5s ease-in-out forwards;
    }

    @keyframes fillIconBackground {
        from {
            width: 0;
            height: 0;
        }
        to {
            width: 100%;
            height: 100%;
            left: 0;
        }
    }

    .icon-wrapper.active .info-card-icon {
        color: var(--primary);
        border-color: var(--secondary);
    }

    .process-nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 450px;
    }

    span{
        width: 5px;
        height: 25%;
        background-color: var(--secondary);
    }
</style>