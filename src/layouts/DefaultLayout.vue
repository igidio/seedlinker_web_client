<template>
  <div class="flex flex-col justify-between min-h-screen bg-base-200">
    <div class="flex flex-col flex-1 ">
      <UiHeader />
      <div class="flex flex-row gap-4 px-4 justify-center">
        <div class="hidden md:block w-60">
          <SidebarContent />
        </div>

        <div class="flex-1 max-w-[2000px]">
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
