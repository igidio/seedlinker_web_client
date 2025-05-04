<template>
  <UiCard>
    <div class="flex flex-col gap-2">
      <div
        class="flex flex-row justify-between items-center border-b border-base-300 border-dashed pb-2"
      >
        <span class="text-lg font-bold">{{ device.name }}</span>
        <UiBadge :message="device.type" color="primary" size="sm" />
      </div>
      <div class="flex flex-col gap-2">
        <span class="">{{ $t('device.uuid') }}: {{ device.uuid }}</span>
        <span class=""
          >{{ $t('device.status') }}: {{ device.status ? $t('device.on') : $t('device.off') }}</span
        >
        <span class="">{{ $t('device.io') }}: {{ device.pins.length }}</span>
      </div>
      <div class="flex flex-row justify-end gap-2">
        <RouterLink :to="{name: 'device', params: {uuid: device.uuid}}">
          <button class="btn btn-neutral btn-sm">{{ $t('configure') }}</button>
        </RouterLink>
      </div>
    </div>
  </UiCard>
</template>
<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
import type { DeviceInterface } from '@/interfaces'
import UiBadge from '@/components/ui/UiBadge.vue'

defineProps<{ device: DeviceInterface }>()
</script>
