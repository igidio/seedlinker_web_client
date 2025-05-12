<template>
  <ConditionForm title="Condición" v-model="condition_trigger" :data="{
    is_new: true
  }" />
  <div class="flex flex-col gap-2">
    <div class="flex flex-row gap-2 justify-between items-center">
      <span class="font-bold text-md">{{ $t('device.conditions.by_sensor') }}</span>
      <button class="btn btn-primary btn-xs" @click="open_condition_by_sensor">{{ $t('add') }}</button>
    </div>



  </div>
</template>

<script setup lang="ts">

import ConditionForm from '@/components/project/device/ConditionForm.vue'
import { ref } from 'vue'
const condition_trigger = ref<HTMLDialogElement>()

const open_condition_by_sensor = () => {
  condition_trigger.value?.showModal()
}
</script>
