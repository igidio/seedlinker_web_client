<template>
  <DeviceModalDelete v-model="device_modal_delete_trigger"></DeviceModalDelete>
  <UiCard :class="is_loading && 'pointer-events-none opacity-70'">
    <div class="flex flex-col gap-4">
      <NameInput :title="device?.name!" :save="update" />

      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row items-center gap-2">
          <button class="btn btn-xs" @click="reload()">
            <Icon icon="ph:arrow-clockwise-bold" />
          </button>
          <div class="flex flex-row items-center gap-1">
            <div class="status" :class="device?.status ? 'status-success' : 'status-error'" />
            <span>{{
              device?.status
                ? $t('device.status_values.active')
                : $t('device.status_values.inactive')
            }}</span>
          </div>
        </div>
        <div class="flex flex-row items-center gap-2">
          <UiBadge :message="device.type" color="secondary" />
        </div>
      </div>

      <div class="flex flex-row justify-between items-center">
        <div>
          <label class="label">
            <input type="checkbox" :checked="mode_check" class="toggle" @change="toggle_mode" />
            {{ mode_check ? $t('device.config.auto') : $t('device.config.manual') }}
          </label>
        </div>

        <div class="flex flex-row gap-2">
          <button class="btn btn-sm" @click="toggle_device_status">
            {{ device?.status ? $t('device.config.disable') : $t('device.config.enable') }}
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
import { inject, onMounted, ref } from 'vue'
import NameInput from '@/components/project/device/NameInput.vue'
import UiCard from '@/components/ui/UiCard.vue'
import type { DeviceInterface } from '@/interfaces'
import DeviceModalDelete from './DeviceModalDelete.vue'
import UiBadge from '@/components/ui/UiBadge.vue'
import { useDeviceStore } from '@/stores/device.store'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  device: DeviceInterface
  update: (data: Partial<DeviceInterface>) => void
}>()

const deviceStore = useDeviceStore()
const { socket_update_device } = deviceStore

const device_modal_delete_trigger = ref<HTMLDialogElement>()
const get_device = inject<(uuid: string) => Promise<DeviceInterface>>('get_device')!
const update_data = inject<(new_data: Partial<DeviceInterface>) => Promise<void>>('update_data')!
const mode_check = ref(false)
const is_loading = ref(false)

onMounted(() => {
  mode_check.value = props.device.mode === 'auto'
})

const toggle_mode = async () => {
  is_loading.value = true
  mode_check.value = !mode_check.value
  const new_data = {
    mode: mode_check.value ? 'auto' : ('manual' as 'auto' | 'manual'),
  }

  try {
    await update_data(new_data)
    await socket_update_device(props.device.uuid, new_data)
  } catch (error) {
    console.error('Error updating device mode:', error)
  } finally {
    is_loading.value = false
  }
}

const toggle_device_status = async () => {
  is_loading.value = true
  const new_data = {
    status: !props.device.status,
  }
  try {
    await update_data(new_data)
  } catch (error) {
    console.error('Error updating device status:', error)
  } finally {
    is_loading.value = false
  }
}

const reload = async () => {
  is_loading.value = true
  await get_device(props.device.uuid)
    .then(() => {
      mode_check.value = props.device.mode === 'auto'
    })
    .finally(() => {
      is_loading.value = false
    })
}
</script>
