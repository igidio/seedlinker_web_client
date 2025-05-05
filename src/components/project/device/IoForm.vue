<template>
  <form @submit.prevent="submit">
    <UiModal
      v-model="trigger"
      :title="is_new ? $t('device.modal.io.title.create') : $t('device.modal.io.title.edit')"
    >
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ $t('device.modal.io.fields.pin.legend') }}</legend>
        <select class="select w-full" v-model="pin_selected">
          <option disabled selected :value="null">{{$t('device.modal.io.fields.pin.placeholder')}}</option>
          <option :value="pin" v-for="(pin, index) in pin_values.esp8266" :key="index">{{ pin.label }}</option>
        </select>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ $t('device.modal.io.fields.io_type.legend') }}</legend>
        <select class="select w-full" v-model="io_selected">

          <option disabled selected :value="null">{{$t('device.modal.io.fields.io_type.placeholder')}}</option>
          <option :value="io" v-for="(io, index) in io_values" :key="index">{{ $t(io.label) }}</option>
        </select>
        <p class="label" v-if="io_selected && io_selected.type">{{ io_selected.type === 'input' ? $t('device.modal.io.fields.io_type.type.sensor') : $t('device.modal.io.fields.io_type.type.actuator') }}</p>

      </fieldset>
      <template #footer>
        <button class="btn btn-ghost">{{ $t('close') }}</button>
        <button class="btn btn-neutral">{{ $t('save') }}</button>
      </template>
    </UiModal>
  </form>
</template>

<script setup lang="ts">
import { api_client } from '@/utils/axios.ts'
import { ref } from 'vue'
import { io_values, pin_values } from '@/data/device.data.ts'
import type { IoValuesInterface, Pins, PinValuesInterface } from '@/interfaces'
import UiModal from '@/components/ui/UiModal.vue'
import { useRoute } from 'vue-router'
import type { AxiosError } from 'axios'
import { io_form_schema } from '@/schemas'
const route = useRoute()
const trigger = defineModel<HTMLDialogElement>()

interface Props {
  is_new?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  is_new: false,
})

const io_selected = ref<IoValuesInterface|null>(null)
const pin_selected = ref<PinValuesInterface|null>(null)

const validateInputs = () => {
  const result = io_form_schema.safeParse({ pin_selected: pin_selected.value, io_selected: io_selected.value })
  if (!result.success) {
    console.error(result.error.errors)
    return false
  }
  return true
}

const submit = async () => {
  validateInputs()
  if (!pin_selected.value || !io_selected.value) return

  const data:Pins = {
    pin: pin_selected.value.value,
    gpio: pin_selected.value.label,
    type: io_selected.value.type,
    name: io_selected.value.label,
    status: true
  }

  console.log(data)

  await api_client
    .patch(`/devices/${route.params.uuid}`, data)
    .then((response) => {
      trigger.value?.close()
      console.log(response)
    })
    .catch((e: AxiosError) => {
      //error_message.value = (e.response?.data as { detail?: string })?.detail || null
    })
    // .finally(() => {
    //   is_loading.value = false
    // })
}
</script>
