<template>
  <TimeConditionForm title="Time Condition" v-model="condition_trigger" />

  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-2 justify-between items-center">
    <span class="font-bold text-md">{{ $t('device.conditions.by_time') }}</span>
    <button class="btn btn-primary btn-xs" @click="open_condition_by_time">{{ $t('add') }}</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import TimeConditionForm from '@/components/project/device/TimeConditionForm.vue'
import { ref } from 'vue'

const condition_trigger = ref<HTMLDialogElement>()

const create = () => {
  condition_trigger.value?.showModal()
}

const open_condition_by_time = () => {
  condition_trigger.value?.showModal()
}
</script>
