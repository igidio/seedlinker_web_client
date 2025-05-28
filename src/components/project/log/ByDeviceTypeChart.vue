<template>
  <UiCard :title="$t('logs.charts.by_device_type')">
    <ChartPie
      :elements="
        graph_data.by_device_type.map((e) => {
          return {
            label: e.device_type,
            value: e.total,
          }
        })
      "
      v-if="graph_data.by_device_type"
    />
  </UiCard>
</template>

<script setup lang="ts">
import ChartPie from '@/components/charts/ChartPie.vue'
import UiCard from '@/components/ui/UiCard.vue'
import type { GraphInterface } from '@/interfaces'
import { inject } from 'vue'

const graph_data = inject('graph_data') as GraphInterface
</script>
