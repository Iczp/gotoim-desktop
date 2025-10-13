<script setup lang="ts">
import { ref } from 'vue'
import Versions from '@/components/Versions.vue'
import { env } from '@/config'
import { isElectron } from './utils/platform'
import { useI18n } from 'vue-i18n'
import type { MessageSchema } from '@/i18n'

// const metaEnv = ref(import.meta.env)
// console.log('metaEnv', metaEnv)
console.log('env', env)
const appId = ref(env.VITE_APP_ID)
const appTitle = ref(env.VITE_APP_TITLE)

console.log('window.electron', window.electron)
const { locale } = useI18n<MessageSchema>()

function setLang(l: 'zh' | 'en') {
  // cast because the i18n instance may use a different inferred locale literal type
  locale.value = l as unknown as typeof locale.value
}
</script>

<template>
  <nav>
    <router-link to="/home">Home</router-link>
    <router-link to="/login">Login</router-link>
  </nav>

  <div class="lang-switch">
    <button @click="setLang('zh')">中文</button>
    <button @click="setLang('en')">English</button>
  </div>
  <h1>{{ $t('message.hello') }}</h1>

  <router-view />
  <div class="app-meta">
    <div>isElectron: {{ isElectron }}</div>
    <div>appId: {{ appId }}</div>
    <div>appTitle: {{ appTitle }}</div>
  </div>
  <Versions />
</template>
