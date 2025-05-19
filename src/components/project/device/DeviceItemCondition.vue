<template>
  <div
    class="card bg-base-100 border border-dashed border-primary hover:bg-base-300 transition-all p-4 cursor-pointer"
  >
    <span class="font-bold text-lg mb-2" v-if="title">{{ title }}</span>

    <div class="grid grid-cols-2">
      <div class="flex flex-row gap-1 items-center" v-for="(item, index) in data" :key="index">
        <Icon :icon="item.icon" /> {{ item.label }}: {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  title?: string
  data: {
    label: string
    value: string | number
    icon: string
  }[]
}>()
</script>
