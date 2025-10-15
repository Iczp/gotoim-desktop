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

    <LoadingSpinner v-if="isLoading" />

    <router-view v-slot="{ Component, route }">
      <transition :name="getTransitionName(route)" mode="out-in">
        <component :is="Component" />
      </transition>
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
import { ref, watch } from 'vue'
import Versions from '@/components/Versions.vue'
import { env } from '@/config'
import { isElectron } from './utils/platform'
import { useI18n } from 'vue-i18n'
import type { MessageSchema } from '@/i18n'
import { langs } from '@/i18n'
import Page from '@/components/Page.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useRoute, useRouter } from 'vue-router'

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
router.beforeEach((_, __, next) => {
  isLoading.value = true
  next()
})
router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false // 路由跳转完成后隐藏加载
  }, 500)
})

const route = useRoute()

const getTransitionName = (toRoute) => {
  const defaultTransition = 'fade' // 没有指定过渡时的默认值

  // 1. 获取当前路由配置的过渡名称 (如果指定了)
  let specificTransition = toRoute.meta.transition || defaultTransition

  // 2. 考虑导航方向 (如果路由有深度 meta 属性)
  const fromRoute = useRoute() // 获取之前的路由对象 (这里有局限性，更好的方法是在 watch 中处理)

  if (toRoute.meta.depth !== undefined && fromRoute.meta.depth !== undefined) {
    const toDepth = toRoute.meta.depth
    const fromDepth = fromRoute.meta.depth || 0 // 默认深度为 0 (如果没有指定)

    if (toDepth > fromDepth) {
      // 深度增加，例如从 Home 到 About，可以认为是前进，向左滑
      return specificTransition.includes('slide') ? 'slide-left' : specificTransition
    } else if (toDepth < fromDepth) {
      // 深度减少，例如从 About 到 Home，可以认为是后退，向右滑
      return specificTransition.includes('slide') ? 'slide-right' : specificTransition
    }
  }

  // 默认返回路由 meta 中指定的过渡名称
  return specificTransition
}

// 使用 ref 存储动态过渡名称
const currentTransitionName = ref('fade') // 默认过渡

// 更好的方法是使用 watch 来更新 transitionName，这样可以在路由变化时精确控制
watch(
  route,
  (to, from) => {
    const defaultTransition = 'fade'
    let specificTransition = (to.meta.transition || defaultTransition) as string

    const toDepth = to.meta.depth || 0
    const fromDepth = from?.meta.depth || 0

    if (toDepth > fromDepth) {
      // 深度增加，例如从 Home 到 About，前进
      if (specificTransition.startsWith('slide')) {
        currentTransitionName.value = 'slide-left'
      } else {
        currentTransitionName.value = specificTransition
      }
    } else if (toDepth < fromDepth) {
      // 深度减少，例如从 About 到 Home，后退
      if (specificTransition.startsWith('slide')) {
        currentTransitionName.value = 'slide-right'
      } else {
        currentTransitionName.value = specificTransition
      }
    } else {
      // 同级页面或没有深度信息，使用页面定义的过渡
      currentTransitionName.value = specificTransition
    }
  },
  { deep: true, immediate: true },
) // immediate: true 确保初始加载时也能设置过渡名称
</script>

<style lang="scss" scoped></style>
