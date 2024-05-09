import { createApp } from 'vue'

import './style.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'css-device-frames/dist/device-frames.min.css'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')
