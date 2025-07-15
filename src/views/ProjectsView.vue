<template>
  <div class="projects-view">
    <h1 class="h2-white">Some of our best projects</h1>
    <div class="projects-container">
        <button class="carousel-controls" aria-label="Previous" @click="prevProject">&#8592;</button>
        
        <!-- Featured projects -->
        <div ref="container" class="carousel-scroll-container">
          <featuredProjects
            v-if="projects.length"
            v-for="(project, index) in projects"
            :key="index"
            ref="projectRef"
            :title="project.title"
            :description="project.description"
            :imageUrl="project.imageUrl"
            :link="project.link"
            :dateAdded="project.dateAdded"
            :summary="project.summary"
            :tech="project.tech"
          />
          <p v-if="!projects.length">Be the first to have a project developed by us.</p>
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
  const currentProjectIndex = ref(0);
  const container = ref(null);

  const projectRef = ref([]);

  // Carousel functionality
  
  onBeforeUnmount(() => {
    
  });

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRef.value.findIndex((comp) => comp.el === entry.target);
            if (index !== -1) {
              currentProjectIndex.value = index;
            }
          }
        });
      },
      {
        root: container.value,
        threshold: 0.6,
      }
    );

    projectRef.value.forEach((comp) => {
      if (comp?.el) observer.observe(comp.el);
    });
  });

  const scrollToProject = (index) => {
    const compInstance = projectRef.value[index];
    const targetEl = compInstance?.el;

    if (targetEl && targetEl.scrollIntoView) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };


  const nextProject = () => {
    const nextIndex = (currentProjectIndex.value + 1) % projects.value.length;
    scrollToProject(nextIndex);
  };

  const prevProject = () => {
    const prevIndex = (currentProjectIndex.value - 1 + projects.value.length) % projects.value.length;
    scrollToProject(prevIndex);
  };

  let observer;

  onBeforeUnmount(() => {
    if (observer && projectRef.value.length) {
      projectRef.value.forEach((el) => observer.unobserve(el));
    }
  });


</script>