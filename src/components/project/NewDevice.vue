<template>
  <div class="card w-96 bg-base-100 card-xs shadow-sm p-4" :key="device.uuid">
    <div class="card-body">
      <div class="flex flex-row justify-between">
        <h2 class="card-title font-semibold">{{ device.type }}</h2>
        <button class="btn btn-base btn-xs">
          <Icon icon="ph:plugs-connected-fill" />
          {{ $t('connect') }}
        </button>
      </div>
      <p>ID: {{ device.uuid }}</p>
      <div class="justify-end card-actions"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { device_interface } from '@/interfaces'

defineProps<{ device: device_interface }>()
</script>
