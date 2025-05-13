<template>
  <div class="flex flex-col gap-2">
    <UiBreadcrumb :elements="elements" />
    <span class="font-black text-3xl">{{ title }}</span>
    <hr class="opacity-20" />
  </div>
</template>

<script setup lang="ts">
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
