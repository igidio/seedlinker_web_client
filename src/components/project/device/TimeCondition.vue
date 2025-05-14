<template>
  <TimeConditionForm
    :title="
      send_props.is_new
        ? $t('device.modal.condition.title.sensor.create')
        : $t('device.modal.condition.title.sensor.update')
    "
    v-model="condition_trigger"
  />

  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-2 justify-between items-center">
      <span class="font-bold text-md">{{ $t('device.conditions.by_time') }}</span>
      <button class="btn btn-primary btn-xs" @click="open_condition_by_time">
        <Icon icon="ph:plus-bold" />
        {{ $t('add') }}
      </button>
    </div>
  </div>
  <span class="opacity-60">{{ $t('device.modal.condition.empty') }}</span>
</template>
<script setup lang="ts">
import TimeConditionForm from '@/components/project/device/TimeConditionForm.vue'
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'

const condition_trigger = ref<HTMLDialogElement>()

const create = () => {
  condition_trigger.value?.showModal()
}

const open_condition_by_time = () => {
  condition_trigger.value?.showModal()
}

const send_props = reactive({
  is_new: true,
  id: null as string | null,
  output_pin: null as number | null,
  start_hour: null as number | null,
  start_minute: null as number | null,
  end_hour: null as number | null,
  end_minute: null as number | null,
})
</script>
