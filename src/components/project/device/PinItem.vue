<template>
  <div
    class="card bg-base-100 border border-dashed border-primary hover:bg-base-300 transition-all p-4 cursor-pointer gap-1"
  >
    <div class="flex flex-row justify-between items-center">
      <div class="items-center flex flex-row gap-2">
        <div aria-label="status" class="status" :class="pin.status && 'status-primary'" />
        <span class="inline-block text-sm opacity-80">{{
          pin.status ? $t('device.pin.status.active') : $t('device.pin.status.inactive')
        }}</span>
      </div>
      <span class="text-xs opacity-70">{{
        pin.type === 'input'
          ? $t('device.modal.io.fields.io_type.type.sensor')
          : $t('device.modal.io.fields.io_type.type.actuator')
      }}</span>
    </div>

    <div class="flex flex-row justify-between">
      <span class="font-bold">{{ pin.gpio }}</span>
      <span class="badge badge-outline">pin {{ pin.pin }}</span>
    </div>
    <span>{{ $t(pin.name) }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Pins } from '@/interfaces'

defineProps<{
  pin: Pins
}>()
</script>
