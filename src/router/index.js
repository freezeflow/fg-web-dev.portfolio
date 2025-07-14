import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/more-info',
        name: 'more-info',
        component: () => import('../views/MoreInfo.vue'),
      },
    ],
  })
}