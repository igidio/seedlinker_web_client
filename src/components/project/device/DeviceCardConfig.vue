<template>
  <DeviceModalDelete v-model="device_modal_delete_trigger"></DeviceModalDelete>
  <UiCard>
    <div class="flex flex-col gap-4">
      <NameInput :title="device?.name!" :save="update" />
      <div class="flex flex-row justify-between items-center">
        <div>
          <label class="label">
            <input type="checkbox" checked="checked" class="toggle" />
            {{ $t('device.config.auto') }}
          </label>
        </div>

        <div class="flex flex-row gap-2">
          <button class="btn btn-sm">{{ $t('device.config.disable') }}</button>
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
import { ref } from 'vue'

const device_modal_delete_trigger = ref<HTMLDialogElement>()

defineProps<{
  device: DeviceInterface
  update: (data: Partial<DeviceInterface>) => void
}>()
</script>
