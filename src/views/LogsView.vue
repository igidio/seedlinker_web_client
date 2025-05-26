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
    <div class="flex flex-col gap-2">
      <span class="font-bold">{{ $t('logs.general') }}</span>
      <LogsTable :logs="logs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentHeader from '@/components/project/global/ContentHeader.vue'
import LogsTable from '@/components/project/logs/LogsTable.vue'
import type { LogInterface } from '@/interfaces/log.interface'
import { api_client } from '@/utils/axios'
import { onMounted, ref } from 'vue'

const logs = ref<LogInterface[]>([])

const get_content = async () => {
  await api_client
    .get<LogInterface[]>('/service/logs')
    .then((response) => {
      console.log(response.data)
      logs.value = response.data
    })
    .catch((error) => {
      console.error('Error fetching logs:', error)
    })
}

onMounted(async () => {
  await get_content()
})
</script>
