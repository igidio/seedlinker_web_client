<template>
  <form @submit.prevent="submit">
    <UiModal v-model="trigger" :title="title" @close="on_close">
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

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ $t('device.modal.condition.fields.start_time.label') }}
        </legend>
        <div class="flex flex-row gap-2">
          <input
            class="input w-full"
            v-model="form.start_hour"
            type="number"
            min="0"
            max="23"
            :placeholder="$t('device.modal.condition.fields.start_time.placeholder.hour')"
            @input="validate_form"
          />
          <input
            class="input w-full"
            v-model="form.start_minute"
            type="number"
            min="0"
            max="60"
            :placeholder="$t('device.modal.condition.fields.start_time.placeholder.minute')"
            @input="validate_form"
          />
        </div>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ $t('device.modal.condition.fields.end_time.label') }}
        </legend>
        <div class="flex flex-row gap-2">
          <input
            class="input w-full"
            v-model="form.end_hour"
            type="number"
            min="0"
            max="23"
            :placeholder="$t('device.modal.condition.fields.end_time.placeholder.hour')"
            @input="validate_form"
          />
          <input
            class="input w-full"
            v-model="form.end_minute"
            type="number"
            min="0"
            max="60"
            :placeholder="$t('device.modal.condition.fields.end_time.placeholder.minute')"
            @input="validate_form"
          />
        </div>
      </fieldset>

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
              :disabled="!form.selected_output || is_loading || !!error_message"
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
import { inject, reactive, ref, watch } from 'vue'
import type { ConditionDtoInterface, Pins } from '@/interfaces'
import { capture_detail_error } from '@/utils/axios'
import { condition_time_schema } from '@/schemas'

const trigger = defineModel<HTMLDialogElement>()
const device_pins_by_type = inject<{ input: Pins[]; output: Pins[] }>('device_pins_by_type')!
const create_condition = inject<(data: ConditionDtoInterface) => Promise<void>>('create_condition')!
const update_condition =
  inject<(data: Partial<ConditionDtoInterface>, id: string) => Promise<void>>('update_condition')!
const delete_condition =
  inject<(id: string, mode: 'time' | 'sensor') => Promise<void>>('delete_condition')!
const is_loading = ref(false)
const error_message = ref<string | null>(null)

interface Props {
  is_new: boolean
  id: string | null
  output_pin: number | null
  start_hour: number | null
  start_minute: number | null
  end_hour: number | null
  end_minute: number | null
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
      output_pin: null,
      start_hour: null,
      start_minute: null,
      end_hour: null,
      end_minute: null,
    }),
  },
)
const form = reactive({
  selected_output: null as number | null,
  start_hour: null as number | string | null,
  start_minute: null as number | string | null,
  end_hour: null as number | string | null,
  end_minute: null as number | string | null,
})

const reset_data = () => {
  error_message.value = null
  if (props.data.is_new) {
    form.selected_output = null
    form.start_hour = null
    form.start_minute = null
    form.end_hour = null
    form.end_minute = null
    return
  }
  form.selected_output = props.data.output_pin ?? null
  form.start_hour = props.data.start_hour ?? null
  form.start_minute = props.data.start_minute ?? null
  form.end_hour = props.data.end_hour ?? null
  form.end_minute = props.data.end_minute ?? null
}

const submit = () => {
  is_loading.value = true
  const data: ConditionDtoInterface = {
    type: 'time',
    data: {
      output_pin: form.selected_output!,
      start_hour: +form.start_hour!,
      start_minute: +form.start_minute!,
      end_hour: +form.end_hour!,
      end_minute: +form.end_minute!,
    },
  }

  if (props.data.is_new) {
    create_condition(data)
      .then(() => {
        trigger.value?.close()
        reset_data()
      })
      .catch((e) => {
        console.error(e)
        error_message.value = e.message
      })
      .finally(() => {
        is_loading.value = false
      })
  } else {
    update_condition(data, props.data.id!)
      .then(() => {
        trigger.value?.close()
        reset_data()
      })
      .catch((e) => {
        console.error(e)
        error_message.value = e.message
      })
      .finally(() => {
        is_loading.value = false
      })
  }
}
const on_close = () => {
  trigger.value?.close()
  reset_data()
}
const validate_form = () => {
  if (form.start_hour === '') form.start_hour = null
  if (form.start_minute === '') form.start_minute = null
  if (form.end_hour === '') form.end_hour = null
  if (form.end_minute === '') form.end_minute = null

  const result = condition_time_schema.safeParse(form)
  if (!result.success) {
    error_message.value = result.error.errors[0].message
  } else {
    error_message.value = null
  }
}

const _delete = async () => {
  is_loading.value = true
  if (!props.data.id || props.data.is_new) return

  await delete_condition(props.data.id, 'time')
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

watch(
  () => props.data,
  () => {
    reset_data()
  },
  { deep: true },
)
</script>
