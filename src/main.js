import './assets/main.css'
import vFadeIn from './directives/v-fade-in'
import { createApp as hmlApp } from 'vue'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter } from './router'
import App from './App.vue'

// Client-only mode
const app = hmlApp(App)
const router = createRouter()
app.use(createPinia())
app.use(router)
app.directive('fade-in', vFadeIn)
router.isReady().then(() => {
  app.mount('#app')
})

// SSR export for future use
export function createApp(url = '/') {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(createPinia())
  app.directive('fade-in', vFadeIn)
  app.use(router)
  return { app, router }
}