import '@fontsource-variable/roboto-flex/wdth.css'
import '@fontsource/noto-sans-mono/greek-400.css'
import '@fontsource/noto-sans-mono/latin-400.css'
import '@fontsource/noto-sans-mono/greek-600.css'
import '@fontsource/noto-sans-mono/latin-600.css'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './style.css'

createApp(App).use(router).mount('#app')
