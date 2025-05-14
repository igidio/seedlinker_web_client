<template>
  <ConditionForm
    v-model="condition_trigger"
    :data="send_props"
    :title="
      send_props.is_new
        ? $t('device.modal.condition.title.sensor.create')
        : $t('device.modal.condition.title.sensor.update')
    "
  />

  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-2 justify-between items-center">
      <span class="font-bold text-md">{{ $t('device.conditions.by_sensor') }}</span>
      <button class="btn btn-primary btn-xs" @click="create">
        <Icon icon="ph:plus-bold" />{{ $t('add') }}
      </button>
    </div>

    <span class="opacity-60" v-if="!conditions || conditions.length <= 0">{{
      $t('device.modal.condition.empty')
    }}</span>

    <DeviceItemCondition
      v-for="condition in conditions"
      :key="condition._id?.$oid"
      @click="modify(condition)"
      :data="[
        {
          label: $t('device.conditions.label.input'),
          value: condition.input_pin,
          icon: 'ph:arrow-square-in-bold',
        },
        {
          label: $t('device.conditions.label.output'),
          value: condition.output_pin,
          icon: 'ph:arrow-square-out-bold',
        },
        {
          label: $t('device.conditions.label.input_mode'),
          value: condition.input_mode,
          icon: 'ph:wrench-bold',
        },
        ...(condition.min_value > -1
          ? [
              {
                label: $t('device.conditions.label.min_value'),
                value: condition.min_value,
                icon: 'ph:greater-than-or-equal-bold',
              },
            ]
          : []),

        ...(condition.max_value > -1
          ? [
              {
                label: $t('device.conditions.label.max_value'),
                value: condition.max_value,
                icon: 'ph:less-than-or-equal-bold',
              },
            ]
          : []),
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import ConditionForm from '@/components/project/device/ConditionForm.vue'
import { reactive, ref } from 'vue'
import type { SensorConditionInterface } from '@/interfaces'
import DeviceItemCondition from './DeviceItemCondition.vue'
import { Icon } from '@iconify/vue'
const condition_trigger = ref<HTMLDialogElement>()

defineProps<{
  conditions: SensorConditionInterface[]
}>()

const send_props = reactive({
  is_new: true,
  id: null as string | null,
  input_pin: null as number | null,
  output_pin: null as number | null,
  input_mode: null as number | null,
  min_value: null as number | null,
  max_value: null as number | null,
})

const create = () => {
  send_props.is_new = true
  send_props.id = null
  send_props.input_pin = null
  send_props.output_pin = null
  send_props.input_mode = null
  send_props.min_value = null
  send_props.max_value = null
  if (condition_trigger.value) {
    condition_trigger.value.showModal()
  }
}

const modify = (condition: SensorConditionInterface) => {
  send_props.is_new = false
  send_props.id = condition._id!.$oid
  send_props.input_pin = condition.input_pin
  send_props.output_pin = condition.output_pin
  send_props.input_mode = condition.input_mode
  send_props.min_value = condition.min_value > -1 ? condition.min_value : null
  send_props.max_value = condition.max_value > -1 ? condition.max_value : null
  if (condition_trigger.value) {
    condition_trigger.value.showModal()
  }
}
</script>
