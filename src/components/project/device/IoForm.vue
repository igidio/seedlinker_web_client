<template>
  <form @submit.prevent="submit">
    <UiModal
      v-model="trigger"
      :title="props.is_new ? $t('device.modal.io.title.create') : $t('device.modal.io.title.edit')"
      @close="on_close"
    >
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ $t('device.modal.io.fields.pin.legend') }}</legend>
        <select class="select w-full" v-model="pin_selected">
          <option disabled :value="null" :selected="props.is_new">
            {{ $t('device.modal.io.fields.pin.placeholder') }}
          </option>
          <option :value="pin" v-for="(pin, index) in available_pins" :key="index">
            {{ pin.label }}
          </option>
          <option :value="props.pin_selected" v-if="!props.is_new">
            {{ props.pin_selected?.label }}
          </option>
        </select>
        <p class="label" v-if="available_pins.length <= 0">
          {{ $t('device.modal.io.fields.pin.unavailable_pins') }}
        </p>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ $t('device.modal.io.fields.io_type.legend') }}</legend>
        <select class="select w-full" v-model="io_selected">
          <option disabled selected :value="null">
            {{ $t('device.modal.io.fields.io_type.placeholder') }}
          </option>
          <option :value="io" v-for="(io, index) in io_values.map(({ mode, ...rest }) => rest )" :key="index">
            {{ $t(io.label) }}
          </option>
        </select>
        <p class="label" v-if="io_selected && io_selected.type">
          {{
            io_selected.type === 'input'
              ? $t('device.modal.io.fields.io_type.type.sensor')
              : $t('device.modal.io.fields.io_type.type.actuator')
          }}
        </p>
      </fieldset>
      <template #footer>
        <div class="flex flex-row justify-between w-full">
          <div>
            <button class="btn btn-error btn-ghost" v-if="!props.is_new" type="button" @click="on_delete" :disabled="is_loading">Eliminar</button>
          </div>
          <div class="flex flex-row gap-2">
            <button class="btn btn-ghost" @click="on_close">{{ $t('close') }}</button>
            <button class="btn btn-neutral" :disabled="is_disabled">{{ $t('save') }}</button>
          </div>
        </div>
      </template>
    </UiModal>
  </form>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { io_values } from '@/data/device.data.ts'
import type { IoValuesInterface, Pins, PinValuesInterface } from '@/interfaces'
import UiModal from '@/components/ui/UiModal.vue'
import { io_form_schema } from '@/schemas'


const trigger = defineModel<HTMLDialogElement>()
const is_loading = ref(false)

interface Props {
  io_selected: IoValuesInterface | null
  pin_selected: PinValuesInterface | null
  is_new: boolean
  id: string | null
}

const add_pin = inject<(pin: Pins) => Promise<void>>('add_pin')!
const update_pin = inject<(pin: Pins, id: string) => Promise<void>>('update_pin')!
const delete_pin = inject<(id: string) => Promise<void>>('delete_pin')!

const define_props = withDefaults(defineProps<{ props: Props }>(), {
  props: () => ({
    io_selected: null,
    pin_selected: null,
    is_new: true,
    id: null,
  }),
})

const io_selected = ref<IoValuesInterface | null>(null)
const pin_selected = ref<PinValuesInterface | null>(null)
const available_pins = inject<PinValuesInterface[]>('available_pins')!

const validateInputs = () => {
  const result = io_form_schema.safeParse({
    pin_selected: pin_selected.value,
    io_selected: io_selected.value,
  })
  if (!result.success) {
    console.error(result.error.errors)
    return false
  }
  return true
}

const submit = async () => {
  validateInputs()
  if (!pin_selected.value || !io_selected.value) return
  is_loading.value = true
  const data: Pins = {
    pin: pin_selected.value.value,
    gpio: pin_selected.value.label,
    type: io_selected.value.type,
    name: io_selected.value.label,
    value: io_selected.value.value,
    status: true,
  }
  try {
    define_props.props.is_new ? await add_pin(data) : await update_pin(data, define_props.props.id!)
    on_close()
    is_loading.value = false
  } catch (e) {
    console.log(e)
  } finally {
  }
}

const is_disabled = computed(() => {
  return !pin_selected.value || !io_selected.value || is_loading.value
})

const on_close = async () => {
  trigger.value?.close()
  pin_selected.value = null
  io_selected.value = null
}

const on_delete = async () => {
  is_loading.value = true
  if (!define_props.props.id || define_props.props.is_new) return
  try {
    await delete_pin(define_props.props.id)
    on_close()
    is_loading.value = false
  } catch (e) {
    console.log(e)
  }
}

watch(
  () => define_props.props.pin_selected,
  () => {
    io_selected.value = define_props.props.io_selected
    pin_selected.value = define_props.props.pin_selected
  },
)
</script>
