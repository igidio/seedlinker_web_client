<template>
  <TimeConditionForm
    :title="
      send_props.is_new
        ? $t('device.modal.condition.title.time.create')
        : $t('device.modal.condition.title.time.update')
    "
    v-model="condition_trigger"
    :data="send_props"
  />

  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-2 justify-between items-center mb-2">
      <span class="font-bold text-md">{{ $t('device.conditions.by_time') }}</span>
      <button class="btn btn-primary btn-xs" @click="create">
        <Icon icon="ph:plus-bold" />
        {{ $t('add') }}
      </button>
    </div>
  </div>
  <span class="opacity-60" v-if="!conditions || conditions.length <= 0">{{
    $t('device.modal.condition.empty')
  }}</span>

  <DeviceItemCondition
    v-for="condition in conditions"
    :key="condition.id"
    @click="modify(condition)"
    :data="[
      {
        label: $t('device.conditions.label.output'),
        value: condition.output_pin,
        icon: 'ph:arrow-square-out-bold',
      },
      {
        label: $t('device.conditions.label.start_time'),
        value: `${condition.start_hour}:${condition.start_minute}`,
        icon: 'ph:clock-countdown-bold',
      },
      {
        label: $t('device.conditions.label.end_time'),
        value: `${condition.end_hour}:${condition.end_minute}`,
        icon: 'ph:clock-bold',
      },
    ]"
  />
</template>
<script setup lang="ts">
import TimeConditionForm from '@/components/project/device/TimeConditionForm.vue'
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import DeviceItemCondition from './DeviceItemCondition.vue'
import type { TimeConditionInterface } from '@/interfaces'

defineProps<{
  conditions: TimeConditionInterface[]
}>()

const condition_trigger = ref<HTMLDialogElement>()

const send_props = reactive({
  is_new: true,
  id: null as string | null,
  output_pin: null as number | null,
  start_hour: null as number | null,
  start_minute: null as number | null,
  end_hour: null as number | null,
  end_minute: null as number | null,
})

const create = () => {
  send_props.id = null
  send_props.output_pin = null
  send_props.start_hour = null
  send_props.start_minute = null
  send_props.end_hour = null
  send_props.end_minute = null
  send_props.is_new = true
  if (condition_trigger.value) {
    condition_trigger.value.showModal()
  }
}

const modify = (condition: TimeConditionInterface) => {
  send_props.id = condition.id
  send_props.output_pin = condition.output_pin
  send_props.start_hour = condition.start_hour
  send_props.start_minute = condition.start_minute
  send_props.end_hour = condition.end_hour
  send_props.end_minute = condition.end_minute
  send_props.is_new = false
  if (condition_trigger.value) {
    condition_trigger.value.showModal()
  }
}
</script>
