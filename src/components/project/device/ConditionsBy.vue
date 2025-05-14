<template>
  <UiCard>
    <h2 class="card-title">
      <Icon icon="ph:arrows-merge-bold" />
      {{ $t('device.conditions.title') }}
    </h2>
    <SensorCondition :conditions="conditions.by_sensor" />
    <TimeCondition :conditions="conditions.by_time" />
  </UiCard>
</template>
<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
import SensorCondition from '@/components/project/device/SensorCondition.vue'
import TimeCondition from '@/components/project/device/TimeCondition.vue'
import { Icon } from '@iconify/vue'
import type { ConditionsInterface } from '@/interfaces'

defineProps<{
  conditions: ConditionsInterface
}>()
</script>
