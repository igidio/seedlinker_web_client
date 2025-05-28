<template>
  <UiCard :title="$t('logs.charts.by_action_type')">
    <div class="h-full w-full overflow-x-auto">
      <UiPinnedTable
        :elements="
          graph_data.average_dht_by_device.map((e) => ({
            label: e.device_name,
            items: [
              `${$t('logs.charts.avg_temperature')}: ${e.avg_humidity}`,
              `${$t('logs.charts.avg_temperature')}: ${e.avg_temperature}`,
            ],
          }))
        "
        v-if="graph_data.average_dht_by_day"
      />
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
import UiPinnedTable from '@/components/ui/UiPinnedTable.vue'
import type { GraphInterface } from '@/interfaces'
import { inject } from 'vue'

const graph_data = inject('graph_data') as GraphInterface
</script>
