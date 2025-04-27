<template>
  <div class="flex flex-row items-center justify-center">
  <span class="font-bold">{{ current }} igid.io</span>
  </div>
</template>

<script setup lang="ts">
const current = new Date().getFullYear()
</script>
