<template>
  <UiCard class="w-full" :class="is_loading && 'opacity-70 pointer-events-none'">
    <div class="flex flex-row items-center justify-between mb-2">
      <span class="font-bold text-lg">{{ $t('logs.general') }}</span>
      <div class="flex flex-row gap-2 items-center">
        <select class="select select-xs" @change="set_new_limit">
          <option selected :value="10">{{ $t('logs.table.last') }} 10</option>
          <option :value="25">{{ $t('logs.table.last') }} 25</option>
          <option :value="50">{{ $t('logs.table.last') }} 50</option>
          <option :value="100">{{ $t('logs.table.last') }} 100</option>
          <option :value="200">{{ $t('logs.table.last') }} 200</option>
        </select>
        <button class="btn btn-primary btn-xs" :disabled="offset <= 0" @click="get_previous_page">
          <Icon icon="ph:caret-left-bold" />
        </button>
        <button
          class="btn btn-primary btn-xs"
          :disabled="logs.length !== limit || logs.length == 0"
          @click="get_next_page"
        >
          <Icon icon="ph:caret-right-bold" />
        </button>
      </div>
    </div>

    <div class="overflow-hidden">
      <UiTable>
        <template #header>
          <tr class="table-header">
            <th>{{ $t('logs.table.headers.type') }}</th>
            <th>{{ $t('logs.table.headers.device_name') }}</th>
            <th>{{ $t('logs.table.headers.actuator') }}</th>
            <th>{{ $t('logs.table.headers.value') }}</th>
            <th>{{ $t('logs.table.headers.device_type') }}</th>
            <th>{{ $t('logs.table.headers.created_at') }}</th>
            <th>{{ $t('logs.table.headers.more_info') }}</th>
          </tr>
        </template>
        <template #body>
          <tr v-for="log in logs" :key="log.id">
            <td>
              {{ $t(`logs.table.type.${log.type}`) }}
            </td>
            <td>{{ log.device_name }}</td>
            <td>
              <div class="badge badge-xs badge-soft">GPIO{{ log.actuator }}</div>
            </td>
            <td>
              <div class="flex flex-row items-center gap-1">
                <div class="status mx-2" :class="log.value && 'status-primary'"></div>
                <span class="inline-block">{{ $t(`logs.table.value.${log.value}`) }}</span>
              </div>
            </td>
            <td class="flex flex-row items-center gap-1 font-bold">
              <Icon icon="ph:cpu-bold" />{{ log.device_type }}
            </td>
            <td>{{ format_datetime(log.created_at) }}</td>
            <td>
              <div v-if="log.dht">
                {{ log.dht[0].temperature }}°C /
                {{ ((log.dht[0].temperature * 9.0) / 5.0 + 32.0).toFixed(2) }}°F /
                {{ log.dht[0].humidity }}%
              </div>
              <div v-else-if="log.water">
                {{ log.water[0].value }}
                ({{ $t(`logs.table.mode.${log.water[0].mode}`) }})
              </div>

              <span v-else class="">---</span>
            </td>
          </tr>
        </template>
      </UiTable>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import UiTable from '@/components/ui/UiTable.vue'
import UiCard from '@/components/ui/UiCard.vue'
import type { LogInterface } from '../../../interfaces/log.interface'
import { format_datetime } from '../../../utils/format_date'
import { inject, ref, type Ref } from 'vue'
import { Icon } from '@iconify/vue'

const is_loading = ref(false)

defineProps<{
  logs: LogInterface[]
}>()

const set_limit = inject('set_limit') as (new_limit: number) => void
const set_offset = inject('set_offset') as (new_offset: number, rest?: boolean) => void
const get_content = inject('get_content') as () => Promise<void>
const offset = inject('offset') as Ref<number, number>
const limit = inject('limit') as Ref<number, number>

const set_new_limit = async (event: Event) => {
  is_loading.value = true
  const new_limit = (event.target as HTMLSelectElement).value
  set_limit(+new_limit)
  offset.value = 0
  await get_content().finally(() => {
    is_loading.value = false
  })
}

const get_next_page = async () => {
  is_loading.value = true
  set_offset(limit.value)
  await get_content().finally(() => {
    is_loading.value = false
  })
}

const get_previous_page = async () => {
  is_loading.value = true
  set_offset(limit.value, true)
  await get_content().finally(() => {
    is_loading.value = false
  })
}
</script>
