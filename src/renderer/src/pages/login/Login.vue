<template>
  <div>
    <h1 class="text-3xl">{{ title }} Login</h1>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  description: String,
})

const title = computed(() => props.title)
</script>

<style lang="scss" scoped></style>
