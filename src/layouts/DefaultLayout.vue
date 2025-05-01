<template>
  <div class="main">
    <div>
      <UiHeader/>
      <div class="flex flex-row gap-4">
      <DefaultSidebar/>
        <div class="w-full">
      <Suspense fallback="">
        <slot/>
      </Suspense>
        </div>
      </div>
    </div>

    <UiFooter/>
  </div>
</template>
<script setup lang="ts">
import UiHeader from '@/components/ui/UiHeader.vue'
import UiFooter from '@/components/ui/UiFooter.vue'
import DefaultSidebar from '@/components/project/global/DefaultSidebar.vue'
</script>
