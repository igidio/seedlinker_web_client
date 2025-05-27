<template>
  <ContentHeader
    :elements="[
      { name: `${$t('home.title')}`, path: 'home', icon: 'ph:house-bold' },
      {
        name: `${$t('logs.title')}`,
        path: 'device',
      },
    ]"
    :title="$t('logs.title')"
  />
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-2 flex-1">
      <LogsTable :logs="logs" />
    </div>
  </div>

  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import ContentHeader from '@/components/project/global/ContentHeader.vue'
import LogsTable from '@/components/project/logs/LogsTable.vue'
import { useLogComposable } from '@/composables/log.composable'
import { onMounted, provide } from 'vue'
import { Bar } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const logComposable = useLogComposable()
const { logs } = logComposable

provide('get_content', logComposable.get_content)
provide('set_limit', logComposable.set_limit)
provide('set_offset', logComposable.set_offset)
provide('offset', logComposable.offset)
provide('limit', logComposable.limit)

onMounted(async () => {
  await logComposable.get_content()
})

const chartOptions = {
  responsive: true,
}
const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }],
}
</script>
