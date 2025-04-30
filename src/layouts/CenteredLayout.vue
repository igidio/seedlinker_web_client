<template>
  <div class="bg-white flex flex-col justify-between items-center h-screen p-4">
    <div class="flex flex-row justify-between w-full">
      <button class="btn btn-ghost"><Icon icon="ph:house-fill" />{{ $t('go_home') }}</button>
      <select class="select select-ghost select-xs w-48">
        <option disabled selected>{{ $t('select_language') }}</option>
        <option>English</option>
        <option>Español</option>
      </select>
    </div>
    <div>
      <slot />
    </div>
    <UiFooter />
  </div>
</template>
<script setup lang="ts">
import UiFooter from '@/components/ui/UiFooter.vue'
import { Icon } from '@iconify/vue'
</script>
