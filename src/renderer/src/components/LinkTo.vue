<template>
  <LinkTo :to="to" :target="target">
    <slot></slot>
  </LinkTo>
</template>

<script setup lang="ts">
const props = defineProps({
  to: String,
  window: String,
  target: {
    type: String,
    // default: '_self',
  },
})

const to = props.to
</script>
