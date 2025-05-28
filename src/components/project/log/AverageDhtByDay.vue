<template>
  <UiCard :title="$t('logs.charts.by_action_type')">
    <div class="h-64 w-full overflow-x-auto">
      <UiPinnedTable
        :elements="
          graph_data.average_dht_by_day.map((e) => ({
            label: format_date(String(e.date)),
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
import { format_date } from '@/utils/format_date'

const graph_data = inject('graph_data') as GraphInterface
</script>
