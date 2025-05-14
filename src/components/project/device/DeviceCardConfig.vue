<template>
  <DeviceModalDelete v-model="device_modal_delete_trigger"></DeviceModalDelete>
  <UiCard>
    <div class="flex flex-col gap-4">
      <NameInput :title="device?.name!" :save="update" />
      <div class="flex flex-row items-center gap-1">
        <div class="status" :class="device?.status ? 'status-success' : 'status-error'" />
        <span>{{
          device?.status ? $t('device.status_values.active') : $t('device.status_values.inactive')
        }}</span>
      </div>
      <div class="flex flex-row justify-between items-center">
        <div>
          <label class="label">
            <input type="checkbox" checked="checked" class="toggle" />
            {{ $t('device.config.auto') }}
          </label>
        </div>

        <div class="flex flex-row gap-2">
          <button class="btn btn-sm" @click="toggle_device_status">
            {{ $t('device.config.disable') }}
          </button>
          <button class="btn btn-error btn-sm" @click="device_modal_delete_trigger?.showModal()">
            {{ $t('device.config.delete.trigger') }}
          </button>
        </div>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import NameInput from '@/components/project/device/NameInput.vue'
import UiCard from '@/components/ui/UiCard.vue'
import type { DeviceInterface } from '@/interfaces'
import DeviceModalDelete from './DeviceModalDelete.vue'
import { inject, ref } from 'vue'

const props = defineProps<{
  device: DeviceInterface
  update: (data: Partial<DeviceInterface>) => void
}>()

const device_modal_delete_trigger = ref<HTMLDialogElement>()

const update_data = inject<(new_data: Partial<DeviceInterface>) => Promise<void>>('update_data')!

const toggle_device_status = async () => {
  const new_data = {
    status: !props.device.status,
  }

  try {
    await update_data(new_data)
  } catch (error) {
    console.error('Error updating device status:', error)
  }
}
</script>
