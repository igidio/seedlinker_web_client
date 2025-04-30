<template>
  <div class="main">
    <div>
      <UiHeader/>
      <Suspense fallback="">
        <slot/>
      </Suspense>
    </div>

    <UiFooter/>
  </div>
</template>
<script setup lang="ts">
import UiHeader from '@/components/ui/UiHeader.vue'
import UiFooter from '@/components/ui/UiFooter.vue'
</script>
