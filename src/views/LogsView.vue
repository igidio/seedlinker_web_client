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

  <div v-if="!is_loading_graphs" class="grid grid-cols-2 gap-4">
    <ByDeviceTypeChart />
    <ByActionTypeChart />
    <ByDayChart />
    <AverageDhtByDay />
  </div>
  <!-- <div class="grid grid-cols-2 gap-4"> -->

  <!-- </div> -->
</template>

<script setup lang="ts">
import ContentHeader from '@/components/project/global/ContentHeader.vue'
import AverageDhtByDay from '@/components/project/logs/AverageDhtByDay.vue'
import ByActionTypeChart from '@/components/project/logs/ByActionTypeChart.vue'
import ByDayChart from '@/components/project/logs/ByDayChart.vue'
import ByDeviceTypeChart from '@/components/project/logs/ByDeviceTypeChart.vue'
import LogsTable from '@/components/project/logs/LogsTable.vue'
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
