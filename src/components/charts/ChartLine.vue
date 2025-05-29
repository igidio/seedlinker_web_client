<template>
  <div class="w-full">
    <Line
      id="doughnut-chart"
      :options="{ ...chart_options, ...chart_option_border }"
      :data="chartData"
    />
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { useConfigStore } from '@/stores/config.store.ts'
const configStore = useConfigStore()

const { chart_options, chart_option_border, color_base } = storeToRefs(configStore)

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js'
import { storeToRefs } from 'pinia'
import type { ChartInterface } from '@/interfaces'
import { computed } from 'vue'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const props = defineProps<ChartInterface & { label: string }>()

const chartData = computed(() => ({
  labels: props.elements.map((element) => element.label),
  datasets: [
    {
      backgroundColor: color_base.value,
      label: props.label,
      data: props.elements.map((element) => element.value),
      borderWidth: 2,
      borderColor: color_base.value,
      pointBackgroundColor: color_base.value,
      scales: {
        y: {
          title: {
            display: true,
            text: props.label,
          },
        },
        x: {
          title: {
            display: true,
            text: 'Date',
          },
        },
      }
    },
  ],
}))
</script>
