<template>
  <div class="grow">
    <UiCard>
      <h2 class="card-title">
        <Icon icon="ph:cloud-rain-bold" />
        {{ $t('device.conditions.title') }}
      </h2>
      <SensorCondition />
      <TimeCondition />
    </UiCard>
  </div>
</template>
<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
import SensorCondition from '@/components/project/device/SensorCondition.vue'
import TimeCondition from '@/components/project/device/TimeCondition.vue'
import { Icon } from '@iconify/vue'
</script>
