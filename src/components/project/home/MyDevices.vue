<template>
  <div>
    <span class="font-bold text-lg mb-2 inline-block">{{ $t('home.my_devices.title') }}</span>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-2">
    <OwnedDeviceCard :device="device" v-for="device in devices" :key="device._id.$oid" />
    </div>
    {{ devices }}

  </div>
</template>

<script setup lang="ts">
import { api_client } from '@/utils/axios.ts'
import OwnedDeviceCard from '@/components/project/home/OwnedDeviceCard.vue'
import type { DeviceInterface } from '@/interfaces'
import { ref } from 'vue'

const devices = ref<DeviceInterface[]>([])


api_client
  .get<DeviceInterface[]>('/devices')
  .then((response) => {
    devices.value = response.data
    console.log(response.data)
  })
  .catch((error) => {
    console.error('Error fetching devices:', error)
  })
</script>
