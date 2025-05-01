<template>
  <UiDrawer>
    <template #trigger>
      <button class="btn btn-ghost  text-lg">
        <Icon icon="ph:list-bold" />
      </button>
    </template>
    <template #default>
      <SidebarContent/>
    </template>
  </UiDrawer>
</template>
<script setup lang="ts">
import UiDrawer from '@/components/ui/UiDrawer.vue'
import { Icon } from '@iconify/vue'
import SidebarContent from '@/components/project/global/SidebarContent.vue'
</script>
