<template>
  <div class="card bg-base-100 card-xs shadow-sm p-4" :key="device.uuid">
    <div class="card-body">
      <div class="flex flex-row justify-between">
        <h2 class="card-title font-semibold">{{ device.type }}</h2>
        <button class="btn btn-base btn-xs" @click="is_authenticated ? show_modal_connect_device(false, device.uuid, device.type) : show_login_modal()">
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
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const { show_login_modal } = configStore
const { is_authenticated } = storeToRefs(configStore)

defineProps<{
  device: device_interface,
  show_modal_connect_device: (is_new: boolean, uuid: string, type: string) => void
}>()
</script>
