<script setup>
import { User, UserPen } from 'lucide-vue-next';
import { ref } from 'vue';

const emits = defineEmits(['edit'])

const user = ref()

const stored = localStorage.getItem('admin')
const storedClient = localStorage.getItem('client')
if(stored){
    user.value = JSON.parse(stored)
}else if(storedClient){
    user.value = JSON.parse(storedClient)
}
</script>

<template>
    <div class="topbar">
        <div class="logo">
            <img src="../assets/Asset-3100.svg" alt="Logo" />
            <p class="logo-name">FG WEB DEVELOPMENT</p>
        </div>
        <div class="route">
            <ul>
                <li @click="emits('edit')">
                    <User-pen />
                    <p v-if="user">{{user.name}}</p>
                </li>
            </ul>
        </div>
    </div>
    

    
</template>

<style scoped>
    .topbar{
        background-color: var(--off-color);
        width: 97vw;
        height: 20px;
        padding: 20px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10001;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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

    .route{
        justify-self: end;
    }

    ul{
        list-style: none;
    }

    ul li{
        display: flex;
        flex-direction: row;
        gap: 10px;
        color: white;
        align-items: center;
        font-size: 16px;
        font-family: var(--paragraph-font);
        text-decoration: underline;
        text-decoration-color: var(--secondary);
        cursor: pointer;
    }

    svg{
        color: var(--secondary);
        transition: all 0.3s ;
    }

    svg:hover{
        color: white;
    }
</style>