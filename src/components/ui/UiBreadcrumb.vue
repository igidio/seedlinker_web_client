<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <li v-for="(element, key) in elements" :key="key">
        <RouterLink :to="{ name: element.path }" v-if="key !== elements.length - 1">
          <Icon v-if="element.icon" :icon="element.icon" /> {{ element.name }}
        </RouterLink>
        <span v-else> <Icon v-if="element.icon" :icon="element.icon" /> {{ element.name }} </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'

interface ElementInterface {
  name: string
  path: string
  icon?: string
}

defineProps<{
  elements: ElementInterface[]
}>()
</script>
