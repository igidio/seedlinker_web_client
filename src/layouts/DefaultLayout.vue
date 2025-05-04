<template>
  <div class="main">
    <div>
      <UiHeader />
      <div class="flex flex-row gap-4">
        <div class="hidden md:block w-72">
          <SidebarContent />
        </div>
        <div class="w-full">
            <Transition>
          <Suspense fallback="">
              <slot />
          </Suspense>
            </Transition>
        </div>
      </div>
    </div>

    <UiFooter :simple_view="false" />
  </div>
</template>
<script setup lang="ts">
import UiHeader from '@/components/ui/UiHeader.vue'
import UiFooter from '@/components/ui/UiFooter.vue'
import SidebarContent from '@/components/project/global/SidebarContent.vue'
</script>
