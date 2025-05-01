<template>
  <div class="main">
    <div>
      <UiHeader/>
      <div class="flex flex-row gap-4">
      <SidebarContent class="hidden md:block"/>
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
import SidebarContent from '@/components/project/global/SidebarContent.vue'
</script>
