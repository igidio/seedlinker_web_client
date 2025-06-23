<template>
  <ModalConnectDevice
    v-model="modal_connect_device_is_open"
    :show_modal="show_modal_connect_device"
    :data="modal_connect_device_data"
  />

  <div class="flex flex-col gap-2">
    <div class="flex flex-row justify-between">
      <span>{{ $t('home.available_devices') }}:</span>
      <div class="flex flex-row gap-2">
        <button
          class="btn btn-base btn-xs"
          @click="is_authenticated ? show_modal_connect_device() : show_login_modal()"
        >
          <Icon icon="ph:plug-fill" />
          {{ $t('connect_manually') }}
        </button>
        <button
          class="btn btn-base btn-xs"
          @click="get_current_devices"
          :disabled="is_loading_connection"
          :class="is_loading_connection && 'animate-spin'"
        >
          <Icon icon="ph:arrow-clockwise-bold" />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-2">
      <NewDevice
        :device="device.device!"
        v-for="device in connected_by_types.devices"
        :key="device.device?.uuid"
        :show_modal_connect_device="show_modal_connect_device"
      />
    </div>

    <div
      v-if="connected_by_types.devices.length <= 0 && !is_loading_connection && !show_error"
      class="w-full flex flex-col gap-2 items-center opacity-50 text-center"
    >
      <Icon icon="ph:wifi-high-bold" height="48" class="animate-pulse" />
      <p>{{ $t('home.connection_state.is_idling') }}</p>
    </div>

    <div
      class="w-full flex flex-col gap-2 items-center opacity-70 text-center"
      v-if="is_loading_connection"
    >
      <Icon icon="ph:circle-notch-bold" height="48" class="animate-spin" />
      <p>{{ $t('home.connection_state.is_loading') }}</p>
    </div>

    <div class="w-full flex flex-col gap-2 items-center text-error text-center" v-if="show_error">
      <Icon icon="ph:wifi-x-bold" height="48" />
      <p>
        {{ $t('home.connection_state.error') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDeviceStore } from '@/stores/device.store.ts'
import { Icon } from '@iconify/vue'
import { reactive, ref } from 'vue'
import { useConfigStore } from '@/stores/config.store.ts'
import NewDevice from '@/components/project/NewDevice.vue'
import ModalConnectDevice from '@/components/project/home/ModalConnectDevice.vue'

const deviceStore = useDeviceStore()
const { get_current_devices } = deviceStore
const { connected_by_types, show_error, is_loading_connection } = storeToRefs(deviceStore)

const configStore = useConfigStore()
const { show_login_modal } = configStore
const { is_authenticated } = storeToRefs(configStore)

const modal_connect_device_is_open = ref<HTMLDialogElement>()
const show_modal_connect_device = (
  is_new: boolean = true,
  uuid: string | null = null,
  type: string | null = null,
) => {
  modal_connect_device_data.is_new = is_new
  modal_connect_device_data.uuid = uuid || ''
  modal_connect_device_data.type = type || null
  if (modal_connect_device_is_open.value) {
    modal_connect_device_is_open.value.showModal()
  }
}
const modal_connect_device_data = reactive({
  uuid: '',
  is_new: true,
  type: '' as string | null,
})
</script>
