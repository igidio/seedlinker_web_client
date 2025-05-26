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
      <span class="font-bold">{{ $t('logs.general') }}</span>
      <LogsTable :logs="logs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentHeader from '@/components/project/global/ContentHeader.vue'
import LogsTable from '@/components/project/logs/LogsTable.vue'
import { useLogComposable } from '@/composables/log.composable'
import { onMounted, provide} from 'vue'

const logComposable = useLogComposable();
const { logs } = logComposable

provide('get_content', logComposable.get_content)
provide('set_limit', logComposable.set_limit)
provide('set_offset', logComposable.set_offset)

onMounted(async () => {
  await logComposable.get_content()
})
</script>
