<template>
  <UiDrawer>
    <template #trigger>
      <button class="btn btn-ghost">
        <Icon icon="ph:list-bold" />
      </button>
    </template>
    <template #default>
      <div class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <SidebarContent/>
      </div>
    </template>
  </UiDrawer>
</template>
<script setup lang="ts">
import UiDrawer from '@/components/ui/UiDrawer.vue'
import { Icon } from '@iconify/vue'
import SidebarContent from '@/components/project/global/SidebarContent.vue'
</script>
