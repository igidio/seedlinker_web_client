<template>
  <div class="avatar">
    <div class=" ring-offset-base-100 w-8 rounded-full">
      <div class="silhouette bg-base-content" />
    </div>
  </div>
</template>

<style>
@reference "tailwindcss";
.silhouette {
  @apply h-full;
  -webkit-mask-size: cover;
  mask-size: cover;
  mask: url(/svg/silhouette.svg) no-repeat 25% 25%;
}
</style>
<script setup lang="ts">
</script>
