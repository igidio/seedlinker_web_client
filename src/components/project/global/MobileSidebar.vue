<template>
  <UiDrawer v-model="checkbox_element!">
    <template #trigger>
      <button class="btn btn-ghost text-lg">
        <Icon icon="ph:list-bold" />
      </button>
    </template>
    <template #default>
      <div class="flex flex-row justify-between">
        <button class="btn btn-ghost mb-4 w-fit" @click="checkbox_element!.checked = false">
          <Icon icon="ph:sidebar-simple-duotone" />
        </button>
        <div>
        <ToggleDarkLight/>
        <ToggleLanguage/>
        </div>

      </div>
      <SidebarContent />
    </template>
  </UiDrawer>
</template>
<script setup lang="ts">
import UiDrawer from '@/components/ui/UiDrawer.vue'
import { Icon } from '@iconify/vue'
import SidebarContent from '@/components/project/global/SidebarContent.vue'
import { ref } from 'vue'
import ToggleDarkLight from '@/components/project/global/ToggleDarkLight.vue'
import ToggleLanguage from '@/components/project/global/ToggleLanguage.vue'

const checkbox_element = ref<HTMLInputElement>()
</script>
