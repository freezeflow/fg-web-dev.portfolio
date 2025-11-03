<script setup>
    import { ref, watch } from 'vue';

    const isMenuOpen = ref(false);
    const showLinks = ref(false);

    const props = defineProps({
        isNavVisible: {
            type: Boolean,
            default: false
        },
        activeSection: {
            type: String,
            default: ''
        },
        hero: {
            type: String
        },

        projects: {
            type: String
        },

        process: {
            type: String
        },

        contact: {
            type: String
        },
    });

    watch(isMenuOpen, (val) => {
        if (val) {
            setTimeout(() => {
            showLinks.value = true;
            }, 300);
        } else {
            showLinks.value = false;
        }
    });

    // Watch for changes in isNavVisible prop to close the menu
    watch(props.isNavVisible, (newValue) => {
        if (!newValue) {
            isMenuOpen.value = false;
        }
    });

    // Close the menu when the user scrolls
    document.addEventListener('scroll', () => {
        if (isMenuOpen.value) {
            isMenuOpen.value = false;
        }
    });

    // Close the menu when the Escape key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isMenuOpen.value) {
            isMenuOpen.value = false;
        }
    });

    // Close the menu when clicking outside
    document.addEventListener('click', (event) => {
        const navbar = document.querySelector('.navbar');
        if (navbar && !navbar.contains(event.target) && isMenuOpen.value) {
            isMenuOpen.value = false;
        }
    });
</script>

<template>
    <nav
        class="flex flex-row w-full justify-between px-20 bg-[#010214]/30 backdrop-blur-xl fixed z-50"
        :class="[{ 'navOpen': isMenuOpen}, isNavVisible ? 'showNav' : 'hideNav']"
    >
        <div class="logo flex flex-row gap-4 font-sans text-white font-bold justify-center items-center">
            <img src="../assets/logo.svg" alt="Logo" class="size-6" />
            <p class="logo-name">FG WEB DEVELOPMENT</p>
        </div>

        <ul class="nav-links flex flex-row gap-10 text-white" :class="{ 'open': showLinks }">
            <li><a :href="`#${props.hero}`" @click="isMenuOpen = false" :class="{ active: props.activeSection === props.hero }">Home</a></li>
            <li><a :href="`#${props.projects}`" @click="isMenuOpen = false" :class="{ active: props.activeSection === props.projects }">Projects</a></li>
            <li><a :href="`#${props.process}`" @click="isMenuOpen = false" :class="{ active: props.activeSection === props.process }">Our Process</a></li>
            <li><a :href="`#${props.contact}`" @click="isMenuOpen = false" :class="{ active: props.activeSection === props.contact }">Contact Us</a></li>
        </ul>
    </nav>
</template>