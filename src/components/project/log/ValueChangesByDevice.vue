<template>
  <UiCard :title="$t('logs.charts.changes_by_device_type')">
    <ChartBar
      :elements="{
        label: graph_data.value_changes_by_device_type.map((e) => e.device_name),
        type: [$t('logs.charts.state_change')],
        value: [
          [...graph_data.value_changes_by_device_type.map((e) => e.total)],
        ],
      }"
      :additional_options="{
        indexAxis: 'y',
        maintainAspectRatio: false,
      }"
      v-if="graph_data.value_changes_by_device_type"
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
