<template>
  <IoForm v-model="io_trigger" :props="send_props" />
  <UiCard>
    <div class="flex flex-row justify-between">
      <h2 class="card-title">
        <Icon icon="ph:cpu-bold" />
        {{ $t('device.pin.title') }}
      </h2>

      <button
        @click="create()"
        class="btn btn-primary btn-xs items-center flex flex-row"
        :disabled="available_pins.length <= 0"
      >
        <Icon icon="ph:plus-bold" />
        {{ $t('device.pin.button') }}
      </button>
    </div>

    <div class="mt-2">
      <div class="flex flex-col gap-2">
        <p class="text-xs opacity-60" v-if="pins.length <= 0">{{
          $t('device.io.empty')
        }}</p>
        <span class="text-xs text-center inline-block opacity-60" v-if="available_pins.length <= 0">{{
          $t('device.modal.io.fields.pin.unavailable_pins')
        }}</span>
        <IoCard />
        <div class="flex-col-reverse flex gap-2">
          <PinItem :pin="pin" v-for="pin in pins" :key="pin.id" @click="modify(pin)" />
        </div>
      </div>
    </div>
  </UiCard>
</template>
<script setup lang="ts">
import IoCard from '@/components/project/device/IoCard.vue'
import IoForm from '@/components/project/device/IoForm.vue'
import { inject, reactive, ref } from 'vue'
import type { IoValuesInterface, Pins, PinValuesInterface } from '@/interfaces'
import PinItem from '@/components/project/device/PinItem.vue'
import UiCard from '@/components/ui/UiCard.vue'
import { Icon } from '@iconify/vue'
// IO
const io_trigger = ref<HTMLDialogElement>()

const send_props = reactive({
  io_selected: null as IoValuesInterface | null,
  pin_selected: null as PinValuesInterface | null,
  is_new: true,
  id: null as string | null,
})

const create = () => {
  send_props.id = null
  send_props.io_selected = null
  send_props.pin_selected = null
  send_props.is_new = true
  if (io_trigger.value) {
    io_trigger.value.showModal()
  }
}

const modify = (pin: Pins) => {
  send_props.id = pin.id!
  send_props.io_selected = {
    label: pin.name,
    type: pin.type,
    value: pin.value,
  }
  send_props.pin_selected = {
    value: pin.pin,
    label: pin.gpio,
  }
  send_props.is_new = false
  if (io_trigger.value) {
    io_trigger.value.showModal()
  }
}

const available_pins = inject<PinValuesInterface[]>('available_pins')!

defineProps<{
  pins: Pins[] | []
}>()
</script>
