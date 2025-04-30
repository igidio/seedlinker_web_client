<template>
  <component :is="route.meta.layout">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
