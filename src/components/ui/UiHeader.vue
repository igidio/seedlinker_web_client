<template>
  <div class="flex flex-row justify-between items-center">
    <div class="flex flex-row items-center gap-2">
    <UiLogo/>
    <span class="font-bold text-3xl">Seedlinker</span>
    </div>

    <UiDropdown>
      <UiAvatar/>
    </UiDropdown>
  </div>
</template>
<script setup lang="ts">
import UiLogo from '@/components/ui/UiLogo.vue'
import UiAvatar from '@/components/ui/UiAvatar.vue'
import UiDropdown from '@/components/ui/UiDropdown.vue'
</script>
