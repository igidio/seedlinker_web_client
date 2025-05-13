<template>
  <div class="flex flex-col gap-2 mb-4">
    <UiBreadcrumb :elements="elements" />
    <span class="font-black text-3xl">{{ title }}</span>
    <hr class="opacity-20" />
  </div>
</template>

<script setup lang="ts">
import UiBreadcrumb from '@/components/ui/UiBreadcrumb.vue'

interface ElementInterface {
  name: string
  path: string
  icon?: string
}

defineProps<{
  elements: ElementInterface[]
  title: string
}>()
</script>
