<template>
  <IoForm v-model="io_trigger" :props="send_props"/>
  <div class="">
    <div class="flex flex-col gap-2 w-96">
      <span class="font-bold text-lg">{{ $t('device.pin.title') }}</span>
      <button @click="create()" class="btn btn-primary btn-block" :disabled=" available_pins.length <= 0">
        {{ $t('device.pin.button') }}
      </button>
      <span class="label text-xs text-center inline-block" v-if="available_pins.length <= 0">{{ $t('device.modal.io.fields.pin.unavailable_pins') }}</span>
      <IoCard />
      <div class="flex-col-reverse flex gap-2">
        <PinItem :pin="pin" v-for="pin in pins" :key="pin._id!.$oid" @click="modify(pin)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import IoCard from '@/components/project/device/IoCard.vue'
import IoForm from '@/components/project/device/IoForm.vue'
import { inject, reactive, ref } from 'vue'
import type { IoValuesInterface, Pins, PinValuesInterface } from '@/interfaces'
import PinItem from '@/components/project/device/PinItem.vue'
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
  console.log(pin)
  send_props.id = pin._id!.$oid
  send_props.io_selected = {
    label: pin.name,
    type: pin.type,
    value: pin.value,
  }
  console.log(send_props.io_selected)
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
  pins: Pins[]
}>()
</script>
