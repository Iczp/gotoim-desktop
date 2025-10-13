<script setup lang="ts">
import { ref } from 'vue'
import Versions from '@/components/Versions.vue'
import { env } from '@/config'
import { isElectron } from './utils/platform'

// const metaEnv = ref(import.meta.env)
// console.log('metaEnv', metaEnv)
console.log('env', env)
const appId = ref(env.VITE_APP_ID)
const appTitle = ref(env.VITE_APP_TITLE)

console.log('window.electron', window.electron)
</script>

<template>
  <nav>
    <router-link to="/home">Home</router-link>
    <router-link to="/login">Login</router-link>
  </nav>

  <router-view />
</template>
