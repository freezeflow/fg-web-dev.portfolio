<script setup>

    import { Link } from 'lucide-vue-next';

    const props = defineProps({
        imgUrl: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
    });

    import { ref } from 'vue';

    const el = ref(null);
    defineExpose({ el })
</script>

<template>
  <div class="project-container" ref="el">
    <img src="../assets/logo.svg" alt="" draggable="false">

    <!-- Button overlays on image -->
    <button class="overlay-btn">
      <Link />
    </button>
  </div>
</template>

<style scoped>
.project-container {
  position: relative; /* enables absolute positioning inside */
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 300px;
  box-sizing: border-box;
  flex-shrink: 0;
  scroll-snap-align: center;
  border: 1px solid white;
  overflow: hidden; /* ensures button/image don't spill out */
}

img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

/* Overlay button */
.overlay-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: white;
  border: 0;
  outline: 0;
  position: absolute;
  top: 10px;   /* distance from top */
  right: 10px; /* distance from right */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.overlay-btn:hover {
  opacity: 0.8;
}
</style>
