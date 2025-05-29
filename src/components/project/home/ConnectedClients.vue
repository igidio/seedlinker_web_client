<template>
  <div class="pb-2">
    <span class="font-bold text-lg inline-block pb-2">{{
      $t('home.card_connected_client.title')
    }}</span>
    <p class="text-xs">{{ $t('home.card_connected_client.subtitle') }}</p>
  </div>

  <UiAlert color="success" size="md" class="mb-2" outline v-if="is_loading_connection">
    <Icon icon="ph:wifi-high-bold" height="30" class="animate-pulse" />
    <span class="text-xs">{{ $t('home.connection_state.is_loading') }}</span>
  </UiAlert>

  <UiAlert color="error" size="md" class="mb-2" outline v-if="!is_loading_connection && show_error">
    <Icon icon="ph:wifi-x-bold" height="30" />
    <span class="text-xs">{{ $t('home.connection_state.error') }}</span>
  </UiAlert>

  <div class="flex flex-col gap-4 overflow-y-auto" :style="`height: calc(100vh - ${height_to_subtract}px);`">
    <div
      class="flex flex-col gap-1 bg-base-100 rounded-xl border border-primary border-dashed text-xs p-2"
      v-for="(client, key) in clients_connected"
      :key="key"
    >
      <span>{{ client?.brand }}</span>
      <span class="font-bold">{{ client?.platform }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDeviceStore } from '@/stores/device.store.ts'
import { Icon } from '@iconify/vue/dist/iconify.js'
import UiAlert from '@/components/ui/UiAlert.vue'

const { is_loading_connection, show_error, clients_connected } =
  storeToRefs(useDeviceStore())

withDefaults(defineProps<{
  height_to_subtract?: number
}>(), {
  height_to_subtract: 0,
})
</script>
