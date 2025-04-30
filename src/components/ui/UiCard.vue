<template>
  <div class="card bg-base-100 card-border w-96 shadow-sm border-base-300 card-sm p-2">
    <slot name="top"/>
    <div class="card-body">
      <h2 class="card-title" v-if="title">Card Title</h2>
      <slot name="default"/>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
