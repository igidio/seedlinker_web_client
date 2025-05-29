<template>
  <UiCard :title="$t('logs.charts.by_day')">
    <ChartLine
      :elements="
        graph_data.by_day.map((e) => {
          return {
            label: format_date(String(e.date)),
            value: e.total,
          }
        })
      "
      :label="$t('logs.title')"

      v-if="graph_data.by_action_type"
    />
  </UiCard>

</template>


<script setup lang="ts">
import type { GraphInterface } from '@/interfaces';
import { inject } from 'vue';
import UiCard from '@/components/ui/UiCard.vue';
import ChartLine from '@/components/charts/ChartLine.vue';
import { format_date } from '@/utils/format_date';
const graph_data = inject('graph_data') as GraphInterface

</script>
