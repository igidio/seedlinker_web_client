<template>

  <div class="flex flex-col gap-2">
    <div class="flex flex-row justify-between">
      <span>{{ $t('home.available_devices') }}:</span>
      <button
        class="btn btn-base btn-xs"
        @click="is_authenticated ? show_modal_connect_device() : show_login_modal()"
      >
        <Icon icon="ph:plug-fill" />
        {{ $t('connect_manually') }}
      </button>
    </div>

    <NewDevice
      :device="device.device!"
      v-for="device in connected_by_types.devices"
      :key="device.device?.uuid"
      :show_modal_connect_device="show_modal_connect_device"
    />

    <ModalConnectDevice
      v-model="modal_connect_device_is_open"
      :show_modal="show_modal_connect_device"
      :data="modal_connect_device_data"
    />

    {{ connected_by_types.devices }}
    {{ connected_by_types.clients }}
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

const { show_login_modal } = useConfigStore();
const { connected_by_types } = storeToRefs(useDeviceStore())
const configStore = useConfigStore();
const { is_authenticated } = storeToRefs(configStore)

const modal_connect_device_is_open = ref<HTMLDialogElement>()
const show_modal_connect_device = (is_new: boolean = true, uuid: string|null = null, type: string|null = null) => {
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
  type: '' as string|null
})
</script>
