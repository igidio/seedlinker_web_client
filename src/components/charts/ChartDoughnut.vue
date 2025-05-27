<template>
<div class="w-full">
  <Doughnut id="doughnut-chart" :options="chart_options" :data="chartData" />
</div>
</template>


<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { useConfigStore } from '@/stores/config.store.ts'
const configStore = useConfigStore()

const { chart_options } = storeToRefs(configStore)

import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'
import { storeToRefs } from 'pinia'
import { generate_color_palette } from '@/utils/generate_color_palette'
import type { ChartInterface } from '@/interfaces'
import { computed } from 'vue'
ChartJS.register(ArcElement, Tooltip, Legend)


const props = defineProps<ChartInterface>()

const chartData = computed(() => ({
  labels: props.elements.map((element) => element.label),
  datasets: [
    {
      backgroundColor: generate_color_palette('#3498db', props.elements.length),
      data: props.elements.map((element) => element.value),
      borderWidth: 1,
    },
  ],
}))
</script>
