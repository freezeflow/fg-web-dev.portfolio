<template>
    <navbar class="navbar" 
      :isNavVisible="isNavVisible"
      :activeSection="activeSection"
      hero="hero"
      projects="projects"
      process="process"
      contact="contact"
    />
  
  <main class="home w-full flex flex-col justify-center items-center gap-32">
    <section class="home-section" aria-label="Hero section" id="hero">
      <Hero class="hero" />
    </section>
    <section class="why-us-section" aria-label="Why Choose FG Web Development" id="services" v-fade-in>
      <Services />
    </section>
    <section class="projects-section " aria-label="Featured projects" id="projects" v-fade-in>
      <ProjectsView />
    </section>
    <section class="process-section" aria-label="Our process" id="process" v-fade-in>
      <Process />
    </section>
    <section class="footer-section" aria-label="Footer" id="contact">
      <Footer />
    </section>
  </main>
</template>

<script setup>
  import Hero from '@/views/Hero.vue';
  import Process from './Process.vue';
  import ProjectsView from './ProjectsView.vue';
  import Footer from './Footer.vue';
  import navbar from '@/components/navbar.vue';
  import Services from '@/views/Services.vue';
  import { ref, onMounted, onUnmounted } from 'vue';

  const isNavVisible = ref(false);
  const activeSection = ref('hero');

  const handleScroll = () => {
    isNavVisible.value = window.scrollY > 0;
  };

  let observer;
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    const sections = [
      document.getElementById('hero'),
      document.getElementById('whyUs'),
      document.getElementById('projects'),
      document.getElementById('process'),
      document.getElementById('contact')
    ];
    observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    if (observer) observer.disconnect();
  });
</script>