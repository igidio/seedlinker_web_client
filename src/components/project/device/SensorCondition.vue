<template>
  <ConditionForm
    :title="$t('device.modal.condition.title.sensor.create')"
    v-model="condition_trigger"
    :data="{
      is_new: true,
    }"
  />
  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-2 justify-between items-center">
      <span class="font-bold text-md">{{ $t('device.conditions.by_sensor') }}</span>
      <button class="btn btn-primary btn-xs" @click="open_condition_by_sensor">
        <Icon icon="ph:plus-bold" />{{ $t('add') }}
      </button>
    </div>

    <span class="opacity-60">{{ $t('device.modal.condition.empty') }}</span>

    <DeviceItemCondition
      v-for="condition in conditions"
      :key="condition._id?.$oid"
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
import { ref } from 'vue'
import type { SensorConditionInterface } from '@/interfaces'
import DeviceItemCondition from './DeviceItemCondition.vue'
const condition_trigger = ref<HTMLDialogElement>()

const open_condition_by_sensor = () => {
  condition_trigger.value?.showModal()
}

defineProps<{
  conditions: SensorConditionInterface[]
}>()
</script>
