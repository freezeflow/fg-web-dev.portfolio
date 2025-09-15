import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ClientLogin.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DahsboardView.vue'),
    },
    {
      path: '/projects/all',
      name: 'projects/all',
      component: () => import('../views/AllProjectsView.vue'),
    },
    {
      path: '/projects/featured',
      name: 'projects/featured',
      component: () => import('../views/FeaturedProjectsView.vue'),
    },
    {
      path: '/projects/project',
      name: 'projects/project',
      component: () => import('../views/details/Project-details.vue'),
    },
    {
      path: '/projects/tasks',
      name: 'projects/tasks',
      component: () => import('../views/TaskManagerView.vue'),
    },
    {
      path: '/admin/login',
      name: 'admin/login',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/ClientView.vue'),
    },
    {
      path: '/clients/client',
      name: 'clients/client',
      component: () => import('../views/details/Client-details.vue'),
    },
    {
      path: '/verify/email',
      name: 'verify/email',
      component: () => import('../views/forgot-password/VerifyEmailView.vue'),
    },
    {
      path: '/forgot/reset-password/:token',
      name: 'forgot/reset-password/:token',
      component: () => import('../views/forgot-password/ChangePinView.vue'),
    },
  ],
})

export default router
