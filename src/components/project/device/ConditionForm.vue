<template>
  <form @submit.prevent="submit">
    <UiModal v-model="trigger" :title="title" @close="on_close">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ $t('device.modal.condition.fields.input.label') }}<span class="text-red-500">*</span>
        </legend>
        <select class="select w-full" v-model="form.selected_input" @change="validate_form">
          <option disabled :value="null" :selected="data.is_new">
            {{ $t('device.modal.io.fields.pin.placeholder') }}
          </option>
          <option :value="pin" v-for="pin in device_pins_by_type?.input" :key="pin._id?.$oid">
            {{ $t(`device.io.values.${pin.name}`) }} ({{ pin.gpio }})
          </option>
        </select>
        <p
          class="label text-wrap"
          v-if="device_pins_by_type.input && device_pins_by_type?.input.length <= 0"
        >
          {{ $t('device.modal.condition.fields.input.empty') }}
        </p>
      </fieldset>

      <fieldset class="fieldset" v-if="mode_options && mode_options.length > 0">
        <legend class="fieldset-legend">
          {{ $t('device.modal.condition.fields.mode.label') }}<span class="text-red-500">*</span>
        </legend>
        <select class="select w-full" v-model="form.mode">
          <otion disabled :value="null" :selected="data.is_new">
            {{ $t('device.modal.condition.fields.mode.placeholder') }}
          </otion>
          <option
            :value="option.value"
            :selected="data.is_new"
            v-for="option in mode_options"
            :key="option.value"
          >
            {{ $t(option.type) }}
          </option>
        </select>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ $t('device.modal.condition.fields.output.label') }}<span class="text-red-500">*</span>
        </legend>
        <select class="select w-full" v-model="form.selected_output" @change="validate_form">
          <option disabled :value="null" :selected="data.is_new">
            {{ $t('device.modal.io.fields.pin.placeholder') }}
          </option>
          <option :value="pin.pin" v-for="pin in device_pins_by_type?.output" :key="pin._id?.$oid">
            {{ $t(`device.io.values.${pin.name}`) }} ({{ pin.gpio }})
          </option>
        </select>
        <p
          class="label text-wrap"
          v-if="device_pins_by_type.output && device_pins_by_type?.output.length <= 0"
        >
          {{ $t('device.modal.condition.fields.output.empty') }}
        </p>
      </fieldset>

      <div class="flex flex-row gap-2">
        <fieldset class="fieldset w-full">
          <legend class="fieldset-legend">
            {{ $t('device.modal.condition.fields.min_value') }}
          </legend>
          <input class="input" v-model="form.min_value" type="number" @input="validate_form" />
        </fieldset>

        <fieldset class="fieldset w-full">
          <legend class="fieldset-legend">
            {{ $t('device.modal.condition.fields.max_value') }}
          </legend>
          <input class="input" v-model="form.max_value" type="number" @input="validate_form" />
        </fieldset>
      </div>

      <p v-if="error_message" class="text-error text-xs text-end mt-2">{{ $t(error_message) }}</p>

      <template #footer>
        <button class="btn btn-ghost" type="button" @click="trigger?.close()">
          {{ $t('close') }}
        </button>
        <button
          class="btn btn-primary"
          type="submit"
          :disabled="!form.selected_input || !form.selected_output || is_loading || !!error_message"
        >
          {{ $t('save') }}
        </button>
      </template>
    </UiModal>
  </form>
</template>
<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'
import type { ConditionDtoInterface, Pins } from '@/interfaces'
import { computed, inject, reactive, ref } from 'vue'
import { condition_sensor_schema } from '@/schemas'
import { io_values } from '@/data/device.data.ts'
import { capture_detail_error } from '@/utils/axios'

interface Props {
  selected_input?: Pins | null
  selected_output?: Pins | null
  min_value?: number | string | null
  max_value?: number | string | null
  mode?: number | null
  is_new?: boolean
}

withDefaults(
  defineProps<{
    title: string
    data: Props
  }>(),
  {
    data: () => ({
      is_new: true,
      selected_input: null,
      selected_output: null,
      mode: null,
      min_value: null,
      max_value: null,
    }),
  },
)
const trigger = defineModel<HTMLDialogElement>()
const error_message = ref<string | null>(null)
const device_pins_by_type = inject<{ input: Pins[]; output: Pins[] }>('device_pins_by_type')!
const create_condition = inject<(data: ConditionDtoInterface) => Promise<void>>('create_condition')!
const is_loading = ref(false)

const form = reactive({
  selected_input: null as Pins | null,
  selected_output: null as number | null,
  min_value: null as number | null | string,
  max_value: null as number | null | string,
  mode: 0 as number | null,
})

const submit = async () => {
  is_loading.value = true
  const data: ConditionDtoInterface = {
    type: 'sensor',
    data: {
      input_pin: form.selected_input?.pin!,
      output_pin: form.selected_output!,
      input_mode: form.mode!,
      min_value: form.min_value != null ? +form.min_value : -1,
      max_value: form.max_value != null ? +form.max_value : -1,
    },
  }
  console.log(data)

  await create_condition(data)
    .then(() => {
      trigger.value?.close()
    })
    .catch((e) => {
      error_message.value = capture_detail_error(e)
    })
    .finally(() => {
      is_loading.value = false
    })
}

const on_close = () => {
  trigger.value?.close()
  form.selected_input = null
  form.selected_output = null
  form.min_value = null
  form.max_value = null
  error_message.value = null
}

const validate_form = () => {
  if (form.max_value === '') {
    form.max_value = null
  }
  if (form.min_value === '') {
    form.min_value = null
  }
  const result = condition_sensor_schema.safeParse(form)
  if (!result.success) {
    error_message.value = result.error.errors[0].message
  } else {
    error_message.value = null
  }
}

const mode_options = computed(() => {
  if (!form.selected_input) return []
  return io_values.filter((io) => form.selected_input?.value == io.value)[0].mode
})
</script>
