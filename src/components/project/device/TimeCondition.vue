<template>
  <TimeConditionForm title="Time Condition" v-model="time_condition_trigger" />
  <button @click="create">Abrir time condition</button>
</template>
<script setup lang="ts">
import TimeConditionForm from '@/components/project/device/TimeConditionForm.vue'
import { ref } from 'vue'

const time_condition_trigger = ref<HTMLDialogElement>()

const create = () => {
  time_condition_trigger.value?.showModal()
}
</script>
