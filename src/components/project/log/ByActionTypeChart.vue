<template>
  <UiCard :title="$t('logs.charts.by_action_type')">
    <ChartDoughnut :elements="graph_data.by_action_type.map((e) => {
      return {
        label: $t(`logs.table.type.${e.action_type}`),
        value: e.total,
      }
    })" v-if="graph_data.by_action_type"/>
  </UiCard>
</template>

<script setup lang="ts">
import ChartDoughnut from '@/components/charts/ChartDoughnut.vue'
import type { GraphInterface } from '@/interfaces';
import { inject } from 'vue';
import UiCard from '@/components/ui/UiCard.vue';
const graph_data = inject('graph_data') as GraphInterface

</script>
