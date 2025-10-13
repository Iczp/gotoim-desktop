import './assets/main.css'
import 'uno.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router'
import { version } from '~/package.json'

console.log(`pkg:v${version}`)

import VueVirtualScroller from 'vue-virtual-scroller'

const app = createApp(App)

const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(pinia)
app.use(router)
app.use(VueVirtualScroller)

app.mount('#app')
