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

        whyUs: {
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
    <nav class="navbar" :class="[{ 'navOpen': isMenuOpen} , isNavVisible? 'showNav':'hideNav']">
        <div class="navbar-header">
            <div class="logo">
                <img src="../assets/logo.svg" alt="Logo" />
                <p class="logo-name">FG WEB DEVELOPMENT</p>
            </div>
            <div class="hamburger-container" :class="{ 'cross': isMenuOpen }"  aria-label="Toggle navigation menu" @click="isMenuOpen = !isMenuOpen">
                <span class="lOne"></span>
                <span class="lTwo"></span>
                <span class="lThree"></span>
            </div>
        </div>
        
        <ul class="nav-links" :class="{ 'open': showLinks}">
            <li><a :href="`#${props.hero}`" @click="isMenuOpen = false" :class="{ active: props.activeSection === props.hero }">Home</a></li>
            <li><a :href="`#${props.whyUs}`" @click="isMenuOpen = false" :class="{ active: props.activeSection === props.whyUs }">About us</a></li>
            <li><a :href="`#${props.projects}`" @click="isMenuOpen = false" :class="{ active: props.activeSection === props.projects }">Projects</a></li>
            <li><a :href="`#${props.process}`" @click="isMenuOpen = false" :class="{ active: props.activeSection === props.process }">Our Process</a></li>
            <li><a :href="`#${props.contact}`" @click="isMenuOpen = false" :class="{ active: props.activeSection === props.contact }">Contact Us</a></li>
        </ul>
    </nav>
</template>

<style scoped>
.navbar.showNav {
    transform: translateY(0);
}

.navbar.hideNav {
    transform: translateY(-100%);
}

.navbar {
    background-color: var(--off-color);
    color: var(--secondary);
    padding: 1rem 2%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;
}

.navbar-header {
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 0;
    left: 0;
}

.navbar.navOpen {
   min-height: 60%;
}

.navbar .hamburger-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    cursor: pointer;
}

.navbar span {
    width: 40px;
    height: 2px;
    background-color: var(--secondary);
    border: 1px solid var(--secondary);
}

@media screen and (max-width: 767px) {
    .navbar span {
        width: 35px;
    }

    .cross span.lOne {
        transform: rotate(45deg) translate(10px, 4px);
    }
}

.navbar .nav-links {
    display: none;
}

.navbar .nav-links.open {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    justify-self: center;
    align-self: center;

    position: relative;
    top: 20px;
    width: 100%;
    padding: 1rem;
    list-style: none;
    gap: 1.5rem;
}

.navbar .nav-links li {
    font-size: 1.5rem;
    font-family: var(--paragraph-font);
}

.navbar .nav-links li a {
    text-decoration: none;
    color: white;
}

.navbar .nav-links li a.active {
    border-bottom: 2px solid var(--secondary);
}

.logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.7rem;
    font-family: var(--header-font);
}

.logo-name {
    font-size: 0.9rem;
    color: white;
    font-weight: 600;
    letter-spacing: 1px;
    width: 100px;
}

img {
    width: 30px;
}

.lOne,
.lTwo,
.lThree{
    transition: all 0.3s ease-in-out;
}

.cross .lOne {
    transform: rotate(45deg) translate(10px, 6px);
}

.cross .lTwo {
    width: 0;
    height: 0;
    opacity: 0;
}

.cross .lThree {
    transform: rotate(-45deg) translate(10px, -6px);
}

@media screen and (max-width: 1024px){
    .navbar .nav-links li {
        font-size: 1.2rem;
    }

    .navbar span{
        height: 1px;
    }
}
</style>