import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import { translations } from '@/translations.ts'


const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: translations,
  globalInjection: true,
  legacy: false
})
const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.mount('#app')
