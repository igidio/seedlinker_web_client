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
      v-if="graph_data.by_device_type && graph_data.by_device_type.length > 0"
    />
    <div class="p-4 text-sm text-center opacity-80" v-else>
      {{ $t('logs.no_items_to_show') }}
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import ChartPie from '@/components/charts/ChartPie.vue'
import UiCard from '@/components/ui/UiCard.vue'
import type { GraphInterface } from '@/interfaces'
import { inject } from 'vue'

const graph_data = inject('graph_data') as GraphInterface
</script>
