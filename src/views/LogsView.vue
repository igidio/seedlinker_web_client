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
  <div class="flex flex-col gap-2 mb-4">
    <div class="flex flex-col gap-2 flex-1">
      <LogsTable :logs="logs" />
    </div>
  </div>

  <div class="flex flex-col md:flex-row w-full gap-4" v-if="!is_loading_graphs">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:w-[80%]">
      <ByDeviceTypeChart />
      <ByActionTypeChart />
      <ByDayChart class="lg:col-span-2 xl:col-span-1" />
      <ValueChangesByDevice  class="lg:col-span-2 xl:col-span-1" />
      <CountOnOffByDate  class="lg:col-span-2"/>
    </div>
    <div class="flex flex-col grow gap-8">
      <AverageDhtByDay />
      <AverageDhtByDevice />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentHeader from '@/components/project/global/ContentHeader.vue'
import AverageDhtByDay from '@/components/project/log/AverageDhtByDay.vue'
import AverageDhtByDevice from '@/components/project/log/AverageDhtByDevice.vue'
import ByActionTypeChart from '@/components/project/log/ByActionTypeChart.vue'
import ByDayChart from '@/components/project/log/ByDayChart.vue'
import ByDeviceTypeChart from '@/components/project/log/ByDeviceTypeChart.vue'
import CountOnOffByDate from '@/components/project/log/CountOnOffByDate.vue'
import LogsTable from '@/components/project/log/LogsTable.vue'
import ValueChangesByDevice from '@/components/project/log/ValueChangesByDevice.vue'
import { useLogComposable } from '@/composables/log.composable'
import { onMounted, provide, ref } from 'vue'

const logComposable = useLogComposable()
const { logs } = logComposable
const is_loading_graphs = ref(false)

provide('get_content', logComposable.get_content)
provide('set_limit', logComposable.set_limit)
provide('set_offset', logComposable.set_offset)
provide('offset', logComposable.offset)
provide('limit', logComposable.limit)
provide('graph_data', logComposable.graph_data)

const load_graphs = async () => {
  is_loading_graphs.value = true
  await logComposable.get_graph_data()
  is_loading_graphs.value = false
}

onMounted(async () => {
  await logComposable.get_content()
  await load_graphs()
})
</script>
