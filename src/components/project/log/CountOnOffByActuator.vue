<template>
  <UiCard :title="$t('logs.charts.by_action_type')">
    <ChartBar
      :elements="{
        label: graph_data.count_on_off_by_actuator.map((e) => `GPIO${e.actuator}`),
        type: ['On', 'Off'],
        value: [
          [...graph_data.count_on_off_by_actuator.map((e) => e.true)],
          [...graph_data.count_on_off_by_actuator.map((e) => e.false)],
        ],
      }"
      v-if="graph_data.count_on_off_by_actuator"
    />
  </UiCard>
</template>

<script setup lang="ts">
import ChartBar from '@/components/charts/ChartBar.vue'
import UiCard from '@/components/ui/UiCard.vue'

import type { GraphInterface } from '@/interfaces'
import { inject } from 'vue'

const graph_data = inject('graph_data') as GraphInterface
</script>
