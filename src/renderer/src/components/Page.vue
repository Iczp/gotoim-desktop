<template>
  <div class="page flex flex-col">
    <slot name="top"></slot>
    <main class="flex flex-row flex-1">
      <slot name="left"></slot>
      <slot></slot>
      <slot name="right"></slot>
    </main>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  p1: {
    type: String,
    default: '',
    required: false,
  },
})
const p1 = ref(props.p1)
console.log('p1', p1)
</script>

<style lang="scss" scoped>
//
</style>
