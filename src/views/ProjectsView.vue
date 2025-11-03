<template>
  <div class="w-screen px-20 flex flex-col justify-center gap-10 mt-32">
    <h1 class="text-4xl text-white font-semibold">Our work on the web</h1>
    <div class="projects-container flex items-center w-full relative">
      <div ref="container" class="grid grid-cols-2 w-full gap-5">
        <featuredProjects v-if="projects.length" v-for="(project, index) in projects" :key="index" :project="project" />
      </div>
      <notFound v-if="projects.length === 0" msg="Projects still in development, stay tuned" />
    </div>
  </div>
</template>

<script setup>
import featuredProjects from '@/components/featured-projects.vue';
import { useProjectStore } from '@/stores/projects.store';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import notFound from '@/components/notFound.vue';

const projectStore = useProjectStore()

// const projects = ref([])
const projects = ref([
  {
    id: 1,
    title: "TechHub.io",
    imgUrl: "",
    link: "/projects/techhub",
    dateAdded: "2023-10-01",
    tech: ['Vue.js', 'Node.js', 'Tailwind CSS']
  },
  {
    id: 2,
    title: "Greenline.com",
    imgUrl: "something.jpg",
    link: "/projects/greenline",
    dateAdded: "2023-10-01",
    tech: ['Vue.js', 'Node.js', 'Tailwind CSS']
  },
  {
    id: 3,
    title: "Optive.com",
    imgUrl: "something.jpg",
    link: "/projects/greenline",
    dateAdded: "2023-10-01",
    tech: ['Vue.js', 'Node.js', 'Tailwind CSS']
  },
  {
    id: 4,
    title: "Playboy.com",
    imgUrl: "something.jpg",
    link: "/projects/greenline",
    dateAdded: "2023-10-01",
    tech: ['Vue.js', 'Node.js', 'Tailwind CSS']
  },
  {
    id: 5,
    title: "Hairline.com",
    imgUrl: "something.jpg",
    link: "/projects/greenline",
    dateAdded: "2023-10-01",
    tech: ['Vue.js', 'Node.js', 'Tailwind CSS']
  },
  {
    id: 6,
    title: "Fans.com",
    imgUrl: "something.jpg",
    link: "/projects/greenline",
    dateAdded: "2023-10-01",
    tech: ['Vue.js', 'Node.js', 'Tailwind CSS']
  }
]);
</script>