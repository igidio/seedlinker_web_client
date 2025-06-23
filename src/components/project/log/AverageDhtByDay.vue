<template>
  <div class="flex flex-col gap-2">
    <h2 class="font-bold">{{ $t('logs.charts.average_dht_by_day') }}</h2>

    <div
      class="rounded-box border-3 border-box border-base-300 overflow-y-scroll h-64 drop-shadow-xs"
      v-if="graph_data.average_dht_by_day && graph_data.average_dht_by_day.length > 0"
    >
      <UiPinnedTable
        :elements="graph_data.average_dht_by_day.map((e) => ({
            label: format_date(String(e.date)),
            items: [
              `${$t('logs.charts.avg_temperature')}: ${e.avg_humidity}`,
              `${$t('logs.charts.avg_temperature')}: ${e.avg_temperature}`,
            ],
          }))
        "

      />
    </div>
    <div class="p-4 text-sm text-center opacity-80" v-else>{{ $t('logs.no_items_to_show') }}</div>
  </div>
</template>

<script setup lang="ts">
import UiPinnedTable from '@/components/ui/UiPinnedTable.vue'
import type { GraphInterface } from '@/interfaces'
import { inject } from 'vue'
import { format_date } from '@/utils/format_date'

const graph_data = inject('graph_data') as GraphInterface
</script>
