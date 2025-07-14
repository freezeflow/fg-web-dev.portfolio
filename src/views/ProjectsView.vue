<template>
  <div class="projects-view">
    <h1 class="h2-white">Some of our best projects</h1>
    <div class="projects-container">
        <button class="carousel-controls" aria-label="Previous" @click="prevProject">&#8592;</button>
        
        <!-- Featured projects -->
        <div>
          <featuredProjects
            ref="projectRef"
            v-if="projects.length"
            :title="projects[currentProjectIndex].title"
            :description="projects[currentProjectIndex].description"
            :imageUrl="projects[currentProjectIndex].imageUrl"
            :link="projects[currentProjectIndex].link"
            :dateAdded="projects[currentProjectIndex].dateAdded"
            :summary="projects[currentProjectIndex].summary"
            :tech="projects[currentProjectIndex].tech"
            @edit="isEditing = true"
            @delete="isDeleting = true"
          />
          <p v-if="!projects.length">No projects available. Please add some projects.</p>
        </div>
        <button class="carousel-controls" aria-label="Next" @click="nextProject">&#8594;</button>
    </div>

    <!-- Projects indicators -->
    <div class="project-indicators">
      <span v-for="(project, index) in projects"
        :key="index"
        :class="{ active: currentProjectIndex === index }">
      </span>
    </div>
  </div>
</template>

<script setup> 
  import featuredProjects from '@/components/featured-projects.vue';
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  const projects = ref([
    {
      title: "TechHub.io",
      description: "TechHub.io is a cutting-edge platform that connects tech enthusiasts with the latest trends in technology. It features articles, tutorials, and community discussions.",
      imageUrl: "/src/assets/Desktop dashboard.jpg",
      link: "/projects/techhub",
      dateAdded: "2023-10-01",
      summary: "A platform for tech enthusiasts to explore the latest trends and technologies.",
      tech: ['Vue.js', 'Node.js', 'Tailwind CSS']
    },
    {
      title: "Greenline.com",
      description: "Greenline.com is a project management tool designed to help teams collaborate effectively and track their progress in real-time. It offers features like task management, team collaboration, and progress tracking.",
      imageUrl: "something.jpg",
      link: "/projects/greenline",
      dateAdded: "2023-10-01",
      summary: "A project management tool for teams to collaborate and track progress.",
      tech: ['Vue.js', 'Node.js', 'Tailwind CSS']
    }
  ]);

  const isEditing = ref(false)
  const isDeleting = ref(false)
  const projectRef = ref(null);

  let touchStartX = 0;
  let touchEndX = 0;

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }
  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }
  function handleSwipe() {
    const minSwipeDistance = 50; // px
    if (touchEndX < touchStartX - minSwipeDistance) {
      nextProject(); // swipe left
    } else if (touchEndX > touchStartX + minSwipeDistance) {
      prevProject(); // swipe right
    }
  }

  // Carousel functionality
  onMounted(() => {
    if (projectRef.value && projectRef.value.$el) {
      const el = projectRef.value.$el;
      el.addEventListener('touchstart', handleTouchStart);
      el.addEventListener('touchend', handleTouchEnd);
      el.addEventListener('wheel', handleWheel);
    } else if (projectRef.value && projectRef.value instanceof HTMLElement) {
      projectRef.value.addEventListener('touchstart', handleTouchStart);
      projectRef.value.addEventListener('touchend', handleTouchEnd);
      projectRef.value.addEventListener('wheel', handleWheel);
    }
  });
  onBeforeUnmount(() => {
    if (projectRef.value && projectRef.value.$el) {
      const el = projectRef.value.$el;
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('wheel', handleWheel);
    } else if (projectRef.value && projectRef.value instanceof HTMLElement) {
      projectRef.value.removeEventListener('touchstart', handleTouchStart);
      projectRef.value.removeEventListener('touchend', handleTouchEnd);
      projectRef.value.removeEventListener('wheel', handleWheel);
    }
  });

  function handleWheel(e) {
    e.preventDefault(); // Prevent default scrolling
    if (e.deltaX > 0) {
      nextProject();
    } else {
      prevProject();
    }
  }

  const currentProjectIndex = ref(0);
  const nextProject = () => {
    currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.value.length;
  };
  const prevProject = () => {
    currentProjectIndex.value = (currentProjectIndex.value - 1 + projects.value.length) % projects.value.length;
  };

</script>