<template>
  <div>
    <span class="font-bold text-lg mb-2 inline-block">{{ $t('home.my_devices.title') }}</span>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-2">
      <OwnedDeviceCard :device="device" v-for="device in devices" :key="device._id.$oid" />
    </div>

    <div
      class="w-full flex flex-row gap-2 items-center justify-center opacity-70 text-center"
      v-if="is_loading"
    >
      <Icon icon="ph:circle-notch-bold" height="32" class="animate-spin" />
    </div>

    <div
      class="w-full flex flex-row gap-2 items-center opacity-70 text-center"
      v-if="!is_loading && devices.length <= 0 && !show_error"
    >
      <Icon icon="ph:cpu-bold" height="32" />
      <p>{{ $t('home.connection_state.no_device') }}</p>
    </div>

    <div class="w-full flex flex-row gap-2 items-center text-error" v-if="show_error">
      <Icon icon="ph:wifi-x-bold" height="32" />
      <p class="inline-block w-72">
        {{ $t('home.connection_state.error') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api_client } from '@/utils/axios.ts'
import OwnedDeviceCard from '@/components/project/home/OwnedDeviceCard.vue'
import type { DeviceInterface } from '@/interfaces'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useDeviceStore } from '@/stores/device.store'
import { storeToRefs } from 'pinia'

const deviceStore = useDeviceStore()
const {} = deviceStore
const { devices } = storeToRefs(deviceStore)

const is_loading = ref(true)

api_client
  .get<DeviceInterface[]>('/devices')
  .then((response) => {
    devices.value = response.data
    console.log(response.data)
    is_loading.value = false
  })
  .catch((error) => {
    console.error('Error fetching devices:', error)
  })
</script>
