<template>
  <div class="h-auto w-auto relative items-center">
    <div :style="`height: ${size}px; width: ${size}px;`">
      <div class="logo bg-base-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: number
}
withDefaults(defineProps<Props>(), { size: 36 })
</script>

<style>
@reference "tailwindcss";
.logo {
  @apply h-full;
  -webkit-mask-size: cover;
  mask-size: cover;
  mask: url(/svg/logo.svg) no-repeat 25% 25%;
}
</style>
