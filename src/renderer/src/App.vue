<script setup lang="ts">
import { ref, computed } from 'vue'
import Versions from '@/components/Versions.vue'
import { env } from '@/config'
import { isElectron } from './utils/platform'
import { useI18n } from 'vue-i18n'
import type { MessageSchema } from '@/i18n'
import { langs } from '@/i18n'

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

// typed computed value that updates when locale changes
const hello = computed(() => t('message.hello'))

function setLang(l: any) {
  // cast because the i18n instance may use a different inferred locale literal type
  locale.value = l as unknown as typeof locale.value
}
</script>

<template>
  <nav>
    <router-link to="/home">Home</router-link>
    <router-link to="/login">Login</router-link>
  </nav>

  <ul class="lang-switch">
    <li
      v-for="item in langs"
      :key="item.code"
      :class="{ 'text-red-500': item.code == locale }"
      @click="setLang(item.code)"
    >
      {{ item.text }}
    </li>
  </ul>

  <h1>{{ hello }} === {{ t('message.hello') }}</h1>

  <router-view />
  <div class="app-meta">
    <div>isElectron: {{ isElectron }}</div>
    <div>appId: {{ appId }}</div>
    <div>appTitle: {{ appTitle }}</div>
  </div>
  <Versions />
</template>
