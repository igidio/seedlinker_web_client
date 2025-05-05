<template>
  <form @submit.prevent="submit">
    <UiModal v-model="trigger" :title="title" @close="on_close">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Sensor / Dispositivo de entrada<span class="text-red-500">*</span>
        </legend>
        <select class="select w-full" v-model="form.selected_input" @change="validate_form">
          <option disabled :value="null" :selected="data.is_new">
            {{ $t('device.modal.io.fields.pin.placeholder') }}
          </option>
          <option :value="pin.pin" v-for="pin in device_pins_by_type?.input" :key="pin._id?.$oid">
            {{ $t(pin.name) }}
          </option>
        </select>
        <p
          class="label text-wrap"
          v-if="device_pins_by_type.input && device_pins_by_type?.input.length <= 0"
        >
          No hay ningún sensor registrado, debes registrar uno para continuar.
        </p>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Actuador / Dispositivo de salida<span class="text-red-500">*</span>
        </legend>
        <select class="select w-full" v-model="form.selected_output"  @change="validate_form">
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

      <div class="flex flex-row gap-2">
        <fieldset class="fieldset w-full">
          <legend class="fieldset-legend">Valor mínimo</legend>
          <input class="input" v-model="form.min_value" type="number" @input="validate_form" />
        </fieldset>

        <fieldset class="fieldset w-full">
          <legend class="fieldset-legend">Valor máximo</legend>
          <input class="input" v-model="form.max_value" type="number" @input="validate_form" />
        </fieldset>
      </div>

      <p v-if="error_message" class="text-error text-xs">{{ $t(error_message) }}</p>
    </UiModal>

    {{ device_pins_by_type }}
  </form>
</template>
<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'
import type { Pins } from '@/interfaces'
import { inject, reactive, ref } from 'vue'
import { condition_sensor_schema } from '@/schemas'

interface Props {
  is_new: boolean
}

const props = withDefaults(
  defineProps<{
    title: string
    data: Props
  }>(),
  {
    data: () => ({
      is_new: true,
    }),
  },
)
const trigger = defineModel<HTMLDialogElement>()
const error_message = ref<string | null>(null)
const device_pins_by_type = inject<{ input: Pins[]; output: Pins[] }>('device_pins_by_type')!

const form = reactive({
  selected_input: null as Pins | null,
  selected_output: null as Pins | null,
  min_value: null as number | null,
  max_value: null as number | null,
})

const submit = () => {}

const on_close = () => {
  trigger.value?.close()
}

const validate_form = () => {
  if (form.min_value === '') {
    form.min_value = null
  }
  if (form.max_value === '') {
    form.max_value = null
  }
  const result = condition_sensor_schema.safeParse(form)
  if (!result.success) {
    error_message.value = result.error.errors[0].message
  } else {
    error_message.value = null
  }
}
</script>
