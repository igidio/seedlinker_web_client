<template>
  <ContentHeader
    :elements="[
      { name: `${$t('home.title')}`, path: 'home', icon: 'ph:house-bold' },
      {
        name: `${$t('device.title')}${device?.name ? ': ' + device?.name : ''}`,
        path: 'device',
      },
    ]"
    :title="$t('device.title')"
  />
  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-2 items-center self-center" v-if="loading && !device">
      <UiLoading class="opacity-65" />
      <span class="text-base-content opacity-65 text-sm">{{ $t('device.loading') }}...</span>
    </div>

    <div class="flex flex-col gap-4" v-else>
      <DeviceCardConfig v-if="device" :device="device" :update="update_data" />
      <UiAlert color="warning" soft icon="ph:warning-bold" v-if="!device?.status">{{
        $t('device.status_false')
      }}</UiAlert>

      <div
        class="flex md:flex-row flex-col gap-4"
        :class="loading || (!device?.status && 'pointer-events-none opacity-60')"
      >
        <div class="w-full md:w-1/2">
          <PinSection :pins="(device.pins as Pins[]) || []" v-if="device" />
        </div>
        <div class="grow md:w-1/2" v-if="device?.mode === 'auto'">
          <ConditionsBy :conditions="device?.conditions || { by_sensor: [], by_time: [] }" />
        </div>
        <div class="grow md:w-1/2" v-if="device?.mode === 'manual'">
          <DeviceManualMode :output_pines="useDevice.device_pins_by_type.value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, provide, ref } from 'vue'
import UiLoading from '@/components/ui/UiLoading.vue'
import type { Pins } from '@/interfaces'
import { useDeviceComposable } from '@/composables/device.composable.ts'
import PinSection from '@/components/project/device/PinSection.vue'
import ConditionsBy from '@/components/project/device/ConditionsBy.vue'

import ContentHeader from '@/components/project/global/ContentHeader.vue'
import DeviceCardConfig from '@/components/project/device/DeviceCardConfig.vue'
import DeviceManualMode from '@/components/project/device/DeviceManualMode.vue'
import UiAlert from '@/components/ui/UiAlert.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const loading = ref(true)

const route = useRoute()
const router = useRouter()

const useDevice = useDeviceComposable()
const { device, get_device, update_data } = useDevice

provide('device', device)
provide('get_device', useDevice.get_device)
provide('add_pin', useDevice.add_pin)
provide('update_pin', useDevice.update_pin)
provide('delete_pin', useDevice.delete_pin)
provide('used_pins', useDevice.used_pins)
provide('available_pins', useDevice.available_pins)
provide('device_pins_by_type', useDevice.device_pins_by_type)
provide('delete_data', useDevice.delete_data)
provide('update_data', useDevice.update_data)
provide('update_condition', useDevice.update_condition)
provide('create_condition', useDevice.create_condition)
provide('delete_condition', useDevice.delete_condition)

onMounted(async () => {
  document.title = t('device.title')
  loading.value = true

  await get_device(route.params.uuid as string)
    .catch(() => {
      router.replace('/')
    })
    .finally(() => {
      loading.value = false
    })
})
</script>
