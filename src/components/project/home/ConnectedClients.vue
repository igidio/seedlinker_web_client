<template>
  <div class="pb-2">
    <span class="font-bold text-lg inline-block pb-2">{{ $t('home.card_connected_client.title') }}</span>
    <p class="text-xs">{{ $t('home.card_connected_client.subtitle') }}</p>
  </div>

  <div
    class="flex flex-col gap-1 bg-base-100 rounded-xl border border-primary border-dashed text-xs p-2"
    v-for="(client, key) in clients_connected"
    :key="key"
  >
    <span>{{ client?.brand }}</span>
    <span class="font-bold">{{ client?.platform }}</span>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDeviceStore } from '@/stores/device.store.ts'
import { computed } from 'vue'

const { connected_by_types } = storeToRefs(useDeviceStore())

const clients_connected = computed(() => {
  return connected_by_types.value.clients.map((e) => e.client?.info)
})
</script>
