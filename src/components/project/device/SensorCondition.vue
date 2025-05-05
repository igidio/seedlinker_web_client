<template>
  <ConditionForm title="Condición" v-model="condition_trigger" />
  <div class="flex flex-col gap-2">
    <span class="font-bold text-lg">{{ $t('device.conditions.title') }}</span>
    <button class="btn btn-primary" @click="open_condition_by_sensor">Crear</button>
    <span class="font-bold text-md">{{ $t('device.conditions.by_sensor') }}</span>
    <span class="font-bold text-md">{{ $t('device.conditions.by_time') }}</span>
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
