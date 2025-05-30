<template>
  <UiCard
    ><h2 class="card-title">
      <Icon icon="ph:hand-tap-bold" />
      {{ $t('device.manual.title') }}
    </h2>

    <div
      class="grid md:grid-cols-1 xl:grid-cols-2 gap-2"
      v-if="props.output_pines.output.length > 0"
    >
      <button
        class="btn btn-primary btn-block"
        v-for="(pin, index) in props.output_pines.output"
        :key="index"
        @click="send(pin.pin, pin.value)"
      >
        {{ $t(`device.io.values.${pin.name}`) + ' ' + `(${pin.gpio})` }}
      </button>
    </div>
    <div v-else>
      <span class="text-xs text-center opacity-60">
        {{ $t('device.modal.condition.fields.output.empty') }}
      </span>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
import type { Pins } from '@/interfaces'
import { useDeviceStore } from '@/stores/device.store'
import { get_cookie } from '@/utils/cookie'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const { socket } = storeToRefs(useDeviceStore())

const route = useRoute()

const props = defineProps<{
  output_pines: {
    input: Pins[]
    output: Pins[]
  }
}>()

const send = (pin: number, value: number) => {
  const token = get_cookie('access_token')
  if (!token) {
    return
  }
  socket.value?.send(
    JSON.stringify({
      action: 'manual_client',
      uuid: route.params.uuid,
      token: token,
      data: {
        pin,
        value,
      },
      // Indica que este mensaje es solo para el servidor, no para broadcast
    }),
  )
}
</script>
