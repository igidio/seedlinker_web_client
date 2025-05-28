<template>
  <UiCard :title="$t('logs.charts.by_action_type')">
    <ChartBar
      :elements="{
        label: graph_data.count_on_off_by_date.map((e) => String(e.date)),
        type: ['On'],
        value: [
          [...graph_data.value_changes_by_device_type.map((e) => e.total)],
        ],
      }"
      v-if="graph_data.value_changes_by_device_type"
    />
    {{ graph_data.value_changes_by_device_type }}
  </UiCard>
</template>

<script setup lang="ts">
import ChartBar from '@/components/charts/ChartBar.vue'
import UiCard from '@/components/ui/UiCard.vue'

import type { GraphInterface } from '@/interfaces'
import { inject } from 'vue'

const graph_data = inject('graph_data') as GraphInterface
</script>
