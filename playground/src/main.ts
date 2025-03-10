import { createApp } from 'vue'
import './style.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'css-device-frames/dist/device-frames.min.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { highlighterPlugin } from './plugins/highlighter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('./pages/index.vue'),
    },
  ],
})

const app = createApp(App)
app.use(router)
app.use(highlighterPlugin)
app.mount('#app')
