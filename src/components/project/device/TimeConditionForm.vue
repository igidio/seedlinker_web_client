<template>
  <form @submit.prevent="submit">
    <UiModal v-model="trigger" :title="title" @close="on_close">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Actuador / Dispositivo de salida<span class="text-red-500">*</span>
        </legend>
        <select class="select w-full" v-model="form.selected_output" @change="validate_form">
          <option disabled :value="null" :selected="data.is_new">
            {{ $t('device.modal.io.fields.pin.placeholder') }}
          </option>
          <option :value="pin.pin" v-for="pin in device_pins_by_type?.output" :key="pin._id?.$oid">
            {{ $t(pin.name) }}
          </option>
        </select>
        <p
          class="label text-wrap"
          v-if="device_pins_by_type.output && device_pins_by_type?.output.length <= 0"
        >
          No hay ningún actuador registrado, debes registrar uno para continuar.
        </p>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Hora y minuto de inicio (24h)</legend>
        <div class="flex flex-row gap-2">
          <input
            class="input w-full"
            v-model="form.start_hour"
            type="number"
            min="0"
            max="23"
            placeholder="Hora"
          />
          <input
            class="input w-full"
            v-model="form.start_minute"
            type="number"
            min="0"
            max="60"
            placeholder="Minuto"
          />
        </div>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Hora y minuto de finalización (24h)</legend>
        <div class="flex flex-row gap-2">
          <input
            class="input w-full"
            v-model="form.end_hour"
            type="number"
            min="0"
            max="23"
            placeholder="Hora"
          />
          <input
            class="input w-full"
            v-model="form.end_minute"
            type="number"
            min="0"
            max="60"
            placeholder="Minuto"
          />
        </div>
      </fieldset>
    </UiModal>
  </form>
</template>
<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'
import { inject, reactive } from 'vue'
import type { Pins } from '@/interfaces'

const trigger = defineModel<HTMLDialogElement>()
const device_pins_by_type = inject<{ input: Pins[]; output: Pins[] }>('device_pins_by_type')!

const props = withDefaults(
  defineProps<{
    title: string
    data: {
      is_new: boolean
    }
  }>(),
  {
    data: () => ({
      is_new: true,
    }),
  },
)

const form = reactive({
  selected_output: null as string | null,
  start_hour: null,
  start_minute: null,
  end_hour: null,
  end_minute: null,
})

const submit = () => {}
const on_close = () => {
  trigger.value?.close()
}
const validate_form = () => {}
</script>
