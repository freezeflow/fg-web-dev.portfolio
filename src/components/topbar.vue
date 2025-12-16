<script setup>
import { User, Pen, LogOut, Settings } from 'lucide-vue-next';
import { handleAdminLogout } from '@/utils/admin.logout.util';
import { ref } from 'vue';

const emits = defineEmits(['edit'])

const dropdownOpen = ref(false)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}
</script>

<template>
    <div class="topbar fixed top-0 left-0 flex flex-row justify-between items-center w-screen min-h-5 px-2 pt-2 z-40">
        <div class="logo">
            <img src="/logo.svg" alt="Logo" />
        </div>
        <div class="route">
            <ul>
                <li @click="toggleDropdown" class="user-menu">
                    <User />
                    <span class="arrow" :class="{ open: dropdownOpen }">▼</span>

                    <!-- Dropdown Card -->
                    <div v-if="dropdownOpen" class="dropdown-card">
                        <p class="dropdown-item" @click="$emit('edit')"><Pen /> Edit Profile</p>
                        <p class="dropdown-item"><Settings /> Settings</p>
                        <RouterLink class="dropdown-item" @click="handleAdminLogout" to="/admin/login"><LogOut id="logout"/> Logout</RouterLink>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .logo{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: fit-content;
      gap: 10px;
    }

    .logo-name {
      font-size: 12px;
      color: white;
      font-weight: 600;
      letter-spacing: 1px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      display: flex;
      flex-direction: column;
    }

    img {
      width: 25px;
      height: fit-content;
    }

    .route{
        justify-self: end;
    }

    ul{
        list-style: none;
    }

    .user-menu {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: white;
        font-size: 10px;
    }

    svg{
        color: var(--secondary);
        transition: all 0.3s ;
    }

    svg:hover{
        color: white;
    }

    a{
        text-decoration: none;
        color: white;
    }

    #logout{
        color: rgb(250, 25, 25);
    }

    svg#logout:hover{
        color: red;
    }

    /* Dropdown card */
    .dropdown-card {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 10px;
        background: var(--off-color);
        border-radius: 0.5rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        padding: 0.5rem 0;
        min-width: 160px;
        z-index: 100;
        color: white;
        font-size: 0.9rem;
        font-family: var(--header-font);
    }

    .dropdown-item {
        padding: 0.5rem 1rem;
        cursor: pointer;
        display: flex;
        gap: 0.5rem;
    }

    .dropdown-item svg{
        width: 15px;
        height: auto;
        color: white;
    }

    .dropdown-item:hover {
        background: var(--bg-color);
    }

    /* Arrow rotation */
    .arrow {
        display: inline-block;
        transition: transform 0.2s ease;
    }
    .arrow.open {
        transform: rotate(180deg);
    }
</style>