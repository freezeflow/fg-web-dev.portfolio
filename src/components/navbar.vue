<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const emits = defineEmits(['openContact'])

const props = defineProps({
  isNavVisible: Boolean,
  activeSection: String,
  hero: String,
  projects: String,
  process: String,
  contact: String,
  services: String
});

const isMenuOpen = ref(false);

watch(props.isNavVisible, (val) => {
  if (!val) isMenuOpen.value = false;
});

function closeMenu() {
  isMenuOpen.value = false;
}

onMounted(() => {
  window.addEventListener('scroll', closeMenu);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', closeMenu);
});

console.log(isMenuOpen.value)
</script>

<template>
  <nav
    id="fynecode-nav"
    class="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-[#010214]/40 border-b border-white/10 transition-all duration-300"
    :class="props.isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'"
  >
    <div class="flex items-center justify-between px-6 py-4">

      <!-- Logo -->
      <div class="flex items-center gap-3 text-white font-bold">
        <img src="/logo.svg" class="h-6 w-6" />
        <span>FYNECODE</span>
      </div>

      <!-- Mobile Toggle Button -->
      <div class="md:hidden flex flex-row gap-2 justify-center">
        <button
          @click="isMenuOpen = !isMenuOpen"
          class=" text-white focus:outline-none"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button class="contact-btn text-xs text-white px-3 rounded cursor-pointer hover:animate-pulse" @click="emits('openContact')">
          Contact us
        </button>
      </div>
      
      

      <!-- Desktop Links -->
      <ul class="hidden md:flex gap-10 text-white">
        <li><a :href="'#' + props.hero" :class="{'text-cyan-400': props.activeSection === props.hero}">Home</a></li>
        <li><a :href="'#' + props.services" :class="{'text-cyan-400': props.activeSection === props.services}">Services</a></li>
        <li><a :href="'#' + props.projects" :class="{'text-cyan-400': props.activeSection === props.projects}">Projects</a></li>
        <li><a :href="'#' + props.process" :class="{'text-cyan-400': props.activeSection === props.process}">Our Process</a></li>
        <li><button class="contact-btn px-3 rounded cursor-pointer hover:animate-pulse" @click="emits('openContact')">Contact us</button></li>
      </ul>
    </div>

    <!-- Mobile Menu -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="md:hidden px-6 pb-6 flex flex-col gap-5 text-white bg-[#010214]/60 backdrop-blur-xl border-t border-white/10"
      >
        <a @click="closeMenu" :href="'#' + props.hero" class="py-2" :class="{'text-cyan-400': props.activeSection === props.hero}">Home</a>
        <a @click="closeMenu" :href="'#' + props.services" class="py-2" :class="{'text-cyan-400': props.activeSection === props.services}">Services</a>
        <a @click="closeMenu" :href="'#' + props.projects" class="py-2" :class="{'text-cyan-400': props.activeSection === props.projects}">Projects</a>
        <a @click="closeMenu" :href="'#' + props.process" class="py-2" :class="{'text-cyan-400': props.activeSection === props.process}">Our Process</a>
      </div>
    </transition>
  </nav>
</template>