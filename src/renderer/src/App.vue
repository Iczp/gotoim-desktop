<template>
  <Page class="absolute left-0 top-0 w-full h-full">
    <template #top>
      <header class="flex flex-row justify-between items-center">
        <h1>{{ t('message.hello') }}</h1>

        <nav class="flex flex-row gap-3">
          <router-link to="/home">Home</router-link>
          <router-link to="/login">Login</router-link>
        </nav>

        <ul class="lang-switch flex flex-row gap-12px">
          <li
            v-for="item in langs"
            :key="item.code"
            :class="{ 'text-red-500': item.code == locale }"
            @click="setLang(item.code)"
          >
            {{ item.text }}
          </li>
        </ul>
      </header>
      <div class="flex text-3xl">isLoading: {{ isLoading }}</div>
    </template>

    <router-view v-slot="{ Component }" @loading-status="updateLoading">
      <component :is="Component" @loading-status="updateLoading" />
    </router-view>

    <template #bottom>
      <footer class="flex flex-1 flex-center">
        <div class="app-meta">
          <div>isElectron: {{ isElectron }}</div>
          <div>appId: {{ appId }}</div>
          <div>appTitle: {{ appTitle }}</div>
        </div>
        <Versions />
      </footer>
    </template>
  </Page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Versions from '@/components/Versions.vue'
import { env } from '@/config'
import { isElectron } from './utils/platform'
import { useI18n } from 'vue-i18n'
import type { MessageSchema } from '@/i18n'
import { langs } from '@/i18n'
import Page from '@/components/Page.vue'
import { useRouter } from 'vue-router'

// const env = ref(import.meta.env)
// console.log('env', env)
// if (isElectron) {
//   console.log('electron', window.electron)
//
// const metaEnv = ref(import.meta.env)
// console.log('metaEnv', metaEnv)
console.log('env', env)
const appId = ref(env.VITE_APP_ID)
const appTitle = ref(env.VITE_APP_TITLE)

console.log('window.electron', window.electron)
const { t, locale } = useI18n<MessageSchema>()

function setLang(l: any) {
  // cast because the i18n instance may use a different inferred locale literal type
  locale.value = l as unknown as typeof locale.value
}

// #ifdef H5
const channel = new BroadcastChannel('chat-tabs')
channel.onmessage = (event) => {
  console.log('BroadcastChannel event:', event)
}
// 监听 localStorage 事件
window.addEventListener('storage', (event) => {
  console.log('Storage event:', event)
})
setTimeout(() => {
  channel.postMessage('im-active')
  localStorage.setItem('app-launch-timestamp', Date.now().toString())
  console.log('Set localStorage item "app-launch-timestamp"')
}, 5000)

channel.postMessage('im-active')
// #endif

const router = useRouter()
const isLoading = ref(false)
// 在路由导航开始时显示加载
router.beforeEach((to, from, next) => {
  isLoading.value = true
  setTimeout(() => {
    next()
  }, 3000)
})
router.afterEach(() => {
  isLoading.value = false // 路由跳转完成后隐藏加载
})
const updateLoading = (status) => {
  console.log('updateLoading', status)
  // isLoading.value = status
}
</script>
