<template>
  <div class="w-full">
    <Bar id="pie-chart" :options="{ ...chart_options, ...chart_option_border, ...additional_options }" :data="chartData" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { useConfigStore } from '@/stores/config.store.ts'
const configStore = useConfigStore()

const { chart_option_border, chart_options, color_base } = storeToRefs(configStore)

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { storeToRefs } from 'pinia'
import { generate_color_palette } from '@/utils/generate_color_palette'
import type { BarChartInterface } from '@/interfaces'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<BarChartInterface & { additional_options?: object }>()
const color_palette = generate_color_palette(color_base.value, props.elements.type.length)

const chartData = {
  labels: props.elements.label.map((e) => e),
  datasets: props.elements.value.map((value, index) => ({
    label: props.elements.type[index],
    backgroundColor: color_palette[index],
    data: value,
    borderWidth: 0,
  })),
}
</script>
