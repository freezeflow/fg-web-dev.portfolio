<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { handleClientLogout } from '@/utils/logout.client.js'
import { ref, watch, computed } from 'vue';
import { Briefcase, LayoutDashboard, Users, Settings, LogOut, User } from 'lucide-vue-next'

const props = defineProps({
  user: {type: Object, required: true}
})

const route = useRoute();
const prevActive = ref(null);
const currentActive = ref(route.path);
const projectsOpen = ref(false);
const projects = ref([])

// Mobile nav variables
const isOpen = ref(false);
const mobileOpenDropdown = ref(null); // track which dropdown is open

const storedProjects = localStorage.getItem('projects')
if (storedProjects) {
  const projectsArray = JSON.parse(storedProjects)
  projects.value = projectsArray.map(p => p.foundProject)
}

const setProject = (project) =>{
  localStorage.setItem('selectedProject', JSON.stringify(project))
}

watch(
  () => route.path,
  (newPath, oldPath) => {
    prevActive.value = oldPath;
    currentActive.value = newPath;
  }
);

const menuItems = computed(() => {
  if (props.user?.role === 'admin') {
    return [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
      {
        icon: Briefcase, label: 'Projects',
        dropdown: [
          { label: 'All', to: '/projects/all' },
          { label: 'Featured', to: '/projects/featured' }
        ]
      },
      { icon: Users, label: 'Clients', to: '/clients' },
    ]
  } else {
    return [
      { icon: User, label: 'Profile', to: '/clients/client' },
      {
        icon: Briefcase, label: 'Projects',
        dropdown: projects.value?.length
          ? projects.value.map(p => ({
              label: p.title,
              to: '/projects/project',
              action: () => setProject(p)
            }))
          : [{ label: 'No projects', to: '#' }]
      },
      { icon: LogOut, label: 'Logout', to: '/', action: handleClientLogout }
    ]
  }
})

// check if route matches for underline highlight
const isActive = (path) => currentActive.value === path;

const toggleMobileDropdown = (label) => {
  mobileOpenDropdown.value = mobileOpenDropdown.value === label ? null : label;
};
</script>

<template>
  <!-- Desktop Sidebar -->
  <nav class="desktop-nav">
    <div>
    </div>
    <ul class="desktop-nav-list">
      <li 
        v-for="item in menuItems" 
        :key="item.label" 
        @mouseenter="item.dropdown && (projectsOpen = true)" 
        @mouseleave="item.dropdown && (projectsOpen = false)"
      >
        <!-- Single link -->
        <RouterLink 
          v-if="!item.dropdown" 
          :to="item.to" 
          @click="item.action?.()" 
          :class="isActive(item.to) ? 'active-nav' : 'inactive-nav'"
          class="item-label"
        >
          <component :is="item.icon" class="icons"/> {{ item.label }}
        </RouterLink>

        <!-- Dropdown -->
        <div v-else>
          <span class="item-label" :class="route.path.startsWith('/project') ? 'active-nav' : 'inactive-nav'"><component :is="item.icon" class="icons" /> {{ item.label }}</span>
          <Transition name="dropdown-fade">
            <ul v-show="projectsOpen" class="dropdown">
              <li v-for="sub in item.dropdown" :key="sub.label">
                <RouterLink 
                  :to="sub.to" 
                  @click="sub.action?.()"
                  :class="isActive(sub.to) ? 'active-nav' : 'inactive-nav'"
                >
                  {{ sub.label }}
                </RouterLink>
              </li>
            </ul>
          </Transition>
        </div>
      </li>
    </ul>
  </nav>

  <!-- Mobile Nav -->
  <nav class="mobile-nav" :class="isOpen ? 'open' : 'closed'">
    <button class="burger-menu" @click="isOpen = !isOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <Transition name="drop">
      <ul v-show="isOpen">
        <li v-for="item in menuItems" :key="item.label">
          <!-- Single link -->
          <RouterLink 
            v-if="!item.dropdown" 
            :to="item.to" 
            @click="item.action?.()" 
            :class="isActive(item.to) ? 'active-nav' : 'inactive-nav'"
          >
            {{ item.label }}
          </RouterLink>

          <!-- Animated dropdown -->
          <div v-else>
            <span class="mobile-dropdown-toggle" @click="toggleMobileDropdown(item.label)">
              {{ item.label }}
            </span>
            <Transition name="drop">
              <ul v-show="mobileOpenDropdown === item.label" class="mobile-dropdown">
                <li v-for="sub in item.dropdown" :key="sub.label">
                  <RouterLink 
                    :to="sub.to"
                    @click="sub.action?.()" 
                    :class="isActive(sub.to) ? 'active-nav' : 'inactive-nav'"
                  >
                    {{ sub.label }}
                  </RouterLink>
                </li>
              </ul>
            </Transition>
          </div>
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<style scoped>
    .desktop-nav{
      background-color: var(--off-color);
      border-right: 1px solid #000146;
      color: white;
      padding: 10px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      height: 100vh;
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
    }

    .desktop-nav .desktop-nav-list{
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .icons{
      width: 20px;
      height: auto;
    }

    .item-label{
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }

    .desktop-nav .desktop-nav-list li{
      font-size: 1rem;
      font-family: var(--paragraph-font);
      font-weight: bold;
    }

    .desktop-nav .desktop-nav-list li a{
      color: white;
      text-decoration: none;
    }

    .desktop-nav .desktop-nav-list li .active-nav .icons{
      color: var(--secondary);
    }

    .mobile-nav .desktop-nav-list li .active-nav::after{
      content: '';
      position: relative;
      top: 0;
      left: 0;
      display: block;
      width: 0;
      height: 1px;
      background-color: white;
      margin-top: 5px;
      animation: underline 0.6s forwards;
    }

    li>span{
      cursor: pointer;
    }

    @keyframes underline {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }

    .mobile-nav .desktop-nav-list li .inactive-nav::after {
      content: '';
      position: relative;
      top: 0;
      left: 0;
      display: block;
      height: 1px;
      background-color: white;
      margin-top: 5px;
      animation: underline-reverse 0.6s forwards;
    }

    @keyframes underline-reverse {
      0% {
        width: 100%;
      }
      100% {
        width: 0;
      }
    }

    .desktop-nav .dropdown {
      display: flex;
      flex-direction: column;
      border-radius: 0.5rem;
    }

    .desktop-nav .dropdown li {
      font-size: 0.9rem;
    }

    .desktop-nav .dropdown a {
      color: white;
      text-decoration: none;
      padding: 0.25rem 0.5rem;
      display: block;
      border-radius: 4px;
    }

    .desktop-nav .dropdown a:hover {
      background-color: #444;
    }

    .dropdown-fade-enter-active,
    .dropdown-fade-leave-active {
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .dropdown-fade-enter-from,
    .dropdown-fade-leave-to {
      opacity: 0;
      transform: translateY(-10px);
      max-height: 0;
    }

    .dropdown-fade-enter-to,
    .dropdown-fade-leave-from {
      opacity: 1;
      transform: translateY(0);
      max-height: 200px;
    }

    .logo{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: fit-content;
      gap: 10px;
    }

    .logo-name {
      font-size: 10px;
      color: var(--secondary);
      font-weight: 600;
      letter-spacing: 1px;
      font-family: var(--header-font);
      max-width: 90px;
    }

    img {
      width: 40px;
      height: fit-content;
    }

/* Mobile nav */
  .mobile-nav{
    width: 100%;
    max-height: 6%;
    min-height: 6%;
    padding: 0.5rem;
    display: flex;
    position: fixed;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: var(--off-color);
    box-sizing: border-box;
    transition: max-height 0.4s ease-in-out;
  }

  .mobile-nav.open{
    max-height: 70%;
    transition: max-height 0.4s ease-in-out;
  }

  .burger-menu{
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    width: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background-color: transparent;
    border: 0;
    width: 45px;
  }

  .burger-menu span{
    width: 100%;
    height: 2px;
    background-color: white;
  }

  .mobile-nav ul{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 0;
    margin: 0;
    margin-top: 2rem;
    list-style: none;
    font-size: 20px;
    font-family: var(--paragraph-font);
    color: white;
  }

  .mobile-nav ul li a{
    color: white;
    text-decoration: none;
  }

  .mobile-dropdown-toggle {
    cursor: pointer;
    display: block;
    padding: 0.5rem;
    color: white;
  }

  .mobile-dropdown {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1rem;
  }

  .mobile-dropdown a{
    font-size: 17px;
  }

  .drop-enter-active,
  .drop-leave-active {
    transition: max-height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
  }

  .drop-enter-from,
  .drop-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .drop-enter-to,
  .drop-leave-from {
    max-height: 500px;
    opacity: 1;
  }

  @media screen and (max-width:780px) {
    .desktop-nav{
      display: none;
    }
  }

  @media screen and (min-width:780px) {
    .mobile-nav{
      display: none;
    }
  }
</style>