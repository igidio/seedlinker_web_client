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
          <option :value="pin" v-for="pin in device_pins_by_type?.input" :key="pin.id">
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
          <option disabled :value="null" :selected="data.is_new">
            {{ $t('device.modal.condition.fields.mode.placeholder') }}
          </option>
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
          <option :value="pin.pin" v-for="pin in device_pins_by_type?.output" :key="pin.id">
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
        <div class="flex flex-row justify-between w-full">
          <div>
            <button
              class="btn btn-error btn-soft"
              @click="_delete"
              :disabled="is_loading"
              type="button"
              v-if="!data.is_new"
            >
              {{ $t('delete') }}
            </button>
          </div>
          <div class="flex flex-row gap-2">
            <button class="btn btn-ghost" type="button" @click="trigger?.close()">
              {{ $t('close') }}
            </button>
            <button
              class="btn btn-primary"
              type="submit"
              :disabled="
                !form.selected_input || !form.selected_output || is_loading || !!error_message
              "
            >
              {{ $t('save') }}
            </button>
          </div>
        </div>
      </template>
    </UiModal>
  </form>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'
import type { ConditionDtoInterface, Pins } from '@/interfaces'
import { computed, inject, reactive, ref, watch, type ComputedRef } from 'vue'
import { condition_sensor_schema } from '@/schemas'
import { io_values } from '@/data/device.data.ts'
import { capture_detail_error } from '@/utils/axios'

interface Props {
  input_pin?: number | null
  output_pin?: number | null
  min_value?: number | string | null
  max_value?: number | string | null
  input_mode?: number | null
  is_new?: boolean
  id: string | null
}

const props = withDefaults(
  defineProps<{
    title: string
    data: Props
  }>(),
  {
    data: () => ({
      is_new: true,
      id: null,
      input_pin: null,
      output_pin: null,
      input_mode: null,
      min_value: null,
      max_value: null,
    }),
  },
)
const trigger = defineModel<HTMLDialogElement>()
const error_message = ref<string | null>(null)
const device_pins_by_type =
  inject<ComputedRef<{ input: Pins[]; output: Pins[] }>>('device_pins_by_type')!
const create_condition = inject<(data: ConditionDtoInterface) => Promise<void>>('create_condition')!
const update_condition =
  inject<(data: Partial<ConditionDtoInterface>, id: string) => Promise<void>>('update_condition')!
const delete_condition =
  inject<(id: string, mode: 'time' | 'sensor') => Promise<void>>('delete_condition')!
const is_loading = ref(false)

const form = reactive({
  selected_input: null as Pins | null,
  selected_output: null as number | null,
  min_value: null as number | null | string,
  max_value: null as number | null | string,
  mode: 0 as number | null,
})

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

const reset_data = () => {
  error_message.value = null
  if (props.data.is_new) {
    form.selected_input = null
    form.selected_output = null
    form.min_value = null
    form.max_value = null
    error_message.value = null
    return
  }
  form.selected_input = device_pins_by_type.value.input.find(
    (selected_pin) => selected_pin.pin == props.data.input_pin,
  ) as Pins | null
  form.selected_output = props.data.output_pin || null
  form.min_value = props.data.min_value || null
  form.max_value = props.data.max_value || null
  form.mode = props.data.input_mode || null
}

const on_close = () => {
  trigger.value?.close()
  reset_data()
}

const mode_options = computed(() => {
  if (!form.selected_input) return []
  return io_values.filter((io) => form.selected_input?.value == io.value)[0].mode
})

watch(
  () => props.data,
  () => {
    reset_data()
  },
  { deep: true },
)

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

  if (props.data.is_new) {
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
    return
  }
  await update_condition(data, props.data.id!)
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

const _delete = async () => {
  is_loading.value = true
  if (!props.data.id || props.data.is_new) return

  await delete_condition(props.data.id, 'sensor')
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
</script>
