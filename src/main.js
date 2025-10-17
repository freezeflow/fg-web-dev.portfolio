import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAdminStore } from '@/stores/user'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './assets/toast.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia())
app.use(router)

app.use(Toast, {
  position: 'top-center',
  timeout: 3000,
  hideProgressBar: false,
  transition: 'Vue-Toastification__fade',
  maxToasts: 4,
  newestOnTop: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
});

const adminStore = useAdminStore()
adminStore.initAdmin()

app.mount('#app')