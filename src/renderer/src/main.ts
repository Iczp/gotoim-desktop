import './assets/main.css'
import 'uno.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router'
import i18n from '@/i18n'

// package version logging removed to avoid alias resolution issues in the renderer

import VueVirtualScroller from 'vue-virtual-scroller'

const app = createApp(App)

const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(VueVirtualScroller)

app.mount('#app')
