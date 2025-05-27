<template>
  <div class="w-32">
  <Pie id="pie-chart" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  type ChartOptions,
} from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,


}
const chartData = {
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10],
    },
  ],
}
</script>
