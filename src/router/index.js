import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/AdminLogin.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DahsboardView.vue'),
    },
    {
      path: '/projects/featured/:id',
      name: 'projects/featured/:id',
      component: () => import('../views/FeaturedProjectsView.vue'),
    },
  ],
})

export default router
