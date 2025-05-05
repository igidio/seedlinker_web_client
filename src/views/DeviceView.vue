<template>

  <div class="flex flex-col gap-2">
    <div class="flex flex-row justify-between items-center">
      <span class="font-bold text-xl">{{ $t('device.title') }}</span>
      <UiLoading v-if="loading && !device" />
    </div>
    <span class="text-base-content" v-if="loading">{{ $t('device.loading') }}...</span>
    <div class="v-else">
      <NameInput :title="device?.name!" :save="update_data"  />

      <PinSection :pins="(device?.pins as Pins[])" v-if="device && device?.pins" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { api_client } from '@/utils/axios.ts'
import { useRoute, useRouter } from 'vue-router'
import { inject, onMounted, provide, ref } from 'vue'
import { useConfigStore } from '@/stores/config.store.ts'
import UiLoading from '@/components/ui/UiLoading.vue'
import type { DeviceInterface, Pins } from '@/interfaces'
import NameInput from '@/components/project/device/NameInput.vue'
import { useDeviceComposable } from '@/composables/device.composable.ts'
import PinSection from '@/components/project/device/PinSection.vue'

const { generate_toast } = useConfigStore()
const loading = ref(true)

const route = useRoute()
const router = useRouter()

const useDevice = useDeviceComposable()
const { device, set_device, update_data, add_pin, used_pins, available_pins } = useDevice

provide('add_pin', add_pin)
provide('used_pins', used_pins)
provide('available_pins', available_pins)

onMounted(async () => {
  await api_client
    .get<DeviceInterface>(`/devices/${route.params.uuid}`)
    .then((response) => {
      console.log("sadfasdsad")
      set_device(response.data)
    })
    .catch(() => {
      generate_toast({
        type: 'error',
        message: 'error.form.device_not_found',
      })
      router.replace('/')
    })
    .finally(() => {
      loading.value = false
    })
  })


</script>
