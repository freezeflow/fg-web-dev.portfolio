<script setup>
    import { ref } from 'vue';
    import { ArrowRightIcon } from 'lucide-vue-next';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        project: {
          type: Object,
          required: true
        }
    });

    const isActiveItem = ref('')
</script>

<template>
  <div class="bg-[#020320] w-full p-10 rounded-lg flex flex-col gap-5">
    <img src="../assets/background2.png" alt="" draggable="false" class="border-gradient" @mouseover="isActiveItem = 'active-item'" @mouseleave="isActiveItem = ''" :class="isActiveItem">

    <RouterLink :to="{name: 'project', params: {id: props.project.id}}" class="flex flex-row items-center gap-5">
      <p class="text-xl text-white cursor-pointer">{{ props.project.title }}</p>
      <ArrowRightIcon class="text-white hover:text-secondary transition-all ease-in-out cursor-pointer"/>
    </RouterLink>
  </div>
</template>