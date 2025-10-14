<template>
  <div>
    <h1 class="text-3xl">{{ title }} Home</h1>

    <div class="text-3xl">isElectron:{{ isElectron }}</div>
    appId:{{ appId }} appTitle:{{ appTitle }}
    <img alt="logo" class="logo" src="@/assets/electron.svg" />
    <div class="creator">Powered by electron-vite</div>
    <div class="i-ph-anchor-simple-thin" />
    <!-- An orange alarm from Material Design Icons -->
    <div class="i-mdi-alarm text-orange-400" />
    <!-- A large Vue logo -->
    <div class="i-logos-vue text-3xl" />
    <!-- Sun in light mode, Moon in dark mode, from Carbon -->
    <button class="i-carbon-sun dark:i-carbon-moon" />
    <div class="text">
      Build an Electron app with
      <span class="vue">Vue</span>
      and
      <span class="ts">TypeScript</span>
    </div>
    <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
    <div class="actions">
      <div class="action">
        <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
      </div>
      <div class="action">
        <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { env } from '@/config'
import { isElectron } from '@/utils/platform'

const props = defineProps({
  title: String,
  description: String,
})

const ipcHandle = () => window.electron?.ipcRenderer.send('ping')

const title = computed(() => props.title)

// const metaEnv = ref(import.meta.env)
// console.log('metaEnv', metaEnv)
console.log('env', env)
const appId = ref(env.VITE_APP_ID)
const appTitle = ref(env.VITE_APP_TITLE)
</script>

<style lang="scss" scoped></style>
